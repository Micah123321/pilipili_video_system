package com.shield.pilipili.user;

import com.github.pagehelper.PageInfo;
import com.shield.pilipili.DateUtil;
import com.shield.pilipili.OrderUtil;
import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PCategory;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.vo.MessageVo;
import com.shield.pilipili.pojo.vo.SearchVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/search")
public class SearchController {
    @Resource
    private PCategoryService pCategoryService;
    @Resource
    private PVideosService pVideosService;
    @Autowired
    private RedisTemplate redisTemplate;

    @RequestMapping("/goSearch")
    public String goSearch(@RequestParam(defaultValue = "",required = false) String videoTitle, Model model){
        model.addAttribute("videoTitle",videoTitle);
        return "page/user/search";
    }

    @ResponseBody
    @GetMapping("/category/{parentId}")
    public Object getPCategoryBy(@PathVariable Integer parentId){
        List<PCategory> pCategoryBy = pCategoryService.getPCategoryBy(parentId);
        return pCategoryBy;
    }

    @ResponseBody
    @GetMapping("/common")
    public Object getPCategoryByCommon(String videoTitle,@RequestParam(defaultValue = "0") Integer order, String videoTime,String videoTimeEnd,Integer type,Integer category,Integer pid,@RequestParam(defaultValue = "1") Integer currPage,@RequestParam(defaultValue = "15")Integer pageSize){
        PageInfo<PVideos> pVideosPageList = pVideosService.getPVideosPageList(videoTitle, videoTime, videoTimeEnd,type,category,pid, new OrderUtil(order, true),currPage,pageSize);
        return pVideosPageList;
    }

    @ResponseBody
    @GetMapping("/searchHistory")
    public Object getSearchHistory(HttpSession session) {
        List<SearchVo> list=new ArrayList<>();
        PUserInfo pUserInfo=(PUserInfo)session.getAttribute("userSession");
        String key = pUserInfo.getUserId().toString();
        long start = 1;
        long size  = 10;
        Set<ZSetOperations.TypedTuple> scoreWithScores = redisTemplate.opsForZSet().reverseRangeWithScores(key, start - 1, size - 1 );
        Iterator<ZSetOperations.TypedTuple> iterator = scoreWithScores.iterator();
        BigDecimal bigDecimal = null;
        while (iterator.hasNext()){
            ZSetOperations.TypedTuple next = iterator.next();
            bigDecimal = BigDecimal.valueOf(next.getScore());
            list.add(new SearchVo(DateUtil.StringToDate(DateUtil.secondToTime(bigDecimal.toPlainString())),next.getValue().toString(),pUserInfo.getUserId()));
        }

        return list;
    }
    @ResponseBody
    @PostMapping("/searchHistory")
    public Object setSearchHistory(@RequestParam(defaultValue = "0",required = false) String userId,@RequestParam String title,HttpSession session){
        boolean flag=false;
        String key="";
        PUserInfo pUserInfo=(PUserInfo)session.getAttribute("userSession");
        if (pUserInfo==null)key=userId;
        else key= pUserInfo.getUserId().toString();
        //阈值
        long top  = 10;
        //新访问记录ID
        String value  = title;
        Double score = redisTemplate.opsForZSet().score(key, value);
        //检索是否有旧记录  1.无则插入记录值  2.有则删除 再次插入
        if(null != score){
            //删除旧的
            redisTemplate.opsForZSet().remove(key,value);
        }
        //加入新的记录，设置当前时间戳为分数score
        if (redisTemplate.opsForZSet().add(key,value,System.currentTimeMillis()))flag=true;
        //获取总记录数
        Long aLong = redisTemplate.opsForZSet().zCard(key);
        if(aLong > top){
            //获取阈值200之后的记录  (0,1] 并移除
            redisTemplate.opsForZSet().removeRange(key,0,aLong-top-1);
        }
        return new MessageVo(0,""+flag);
    }
    @ResponseBody
    @PostMapping("/delHistory")
    public Object delSearchHistory(@RequestParam(defaultValue = "0",required = false) String userId,@RequestParam String title,HttpSession session){
        boolean flag=false;
        String key="";
        PUserInfo pUserInfo=(PUserInfo)session.getAttribute("userSession");
        if (pUserInfo==null)key=userId;
        else key= pUserInfo.getUserId().toString();
        //阈值
        //新访问记录ID
        String value  = title;
        Double score = redisTemplate.opsForZSet().score(key, value);
        //检索是否有旧记录  1.无则插入记录值  2.有则删除 再次插入
        if(null != score){
            //删除旧的
            redisTemplate.opsForZSet().remove(key,value);
            flag=true;
        }
        return new MessageVo(0,""+flag);
    }

    @ResponseBody
    @GetMapping ("/getKeyWord")
    public Object getKeyWord(@RequestParam String title){
        return pVideosService.getTitleByWord(title);
    }
}
