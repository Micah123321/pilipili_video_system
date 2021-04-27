package com.shield.pilipili.user;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.PBarrageService;
import com.shield.pilipili.pojo.PBarrage;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.vo.PBarrageVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@Controller
public class BarrageController {
    @Resource
    private PBarrageService pBarrageService;

    @ResponseBody
    @RequestMapping(value = "/barrage/get", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object categoryInfo(@RequestParam Integer id){
        List<PBarrage> barrageList = pBarrageService.getBarrByPv(id);
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        PBarrageVo pBarrageVo=new PBarrageVo();
        pBarrageVo.setCode(0);
        Object[] objects=new Object[barrageList.size()];
        for (int i=0;i<barrageList.size();i++){
            Object[] obj=new Object[6];
            obj[0]=barrageList.get(i).getVideoTimeSecond();
            obj[1]=barrageList.get(i).getType();
            obj[2]=barrageList.get(i).getColor();
            obj[3]=barrageList.get(i).getUserId();
            obj[4]=barrageList.get(i).getContent();
            obj[5]=sdf.format(barrageList.get(i).getCreateTime());
            objects[i]=obj;
        }
        pBarrageVo.setDanmaku(objects);
        return pBarrageVo;
    }

    @ResponseBody
    @RequestMapping(value = "/barrage/get", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public Object addBarrage(HttpSession session,PBarrage pBarrage,String videoTimeSeconds) throws ParseException {
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return new PBarrageVo();
        }
        if (videoTimeSeconds==null){
            PBarrageVo pBarrageVo=new PBarrageVo();
            pBarrageVo.setCode(0);
            Object[] obj={true};
            pBarrageVo.setDanmaku(obj);
            return pBarrageVo;
        }


        pBarrage.setUpdateSecond("00:"+videoTimeSeconds);

        pBarrage.setUserId(userSession.getUserId());

        int insert = pBarrageService.insert(pBarrage);

        if (insert>0){
            PBarrageVo pBarrageVo=new PBarrageVo();
            pBarrageVo.setCode(0);
            Object[] obj={true};
            pBarrageVo.setDanmaku(obj);
            return pBarrageVo;
        }
        return false;
    }


}
