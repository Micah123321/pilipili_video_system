package com.shield.pilipili.user;

import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PSubscribeService;
import com.shield.pilipili.PUserInfoService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PSubscribe;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class DetailController {
    @Resource
    private PCategoryService pCategoryService;
    @Resource
    private PVideosService pVideosService;
    @Resource
    private PUserInfoService pUserInfoService;
    @Resource
    private PSubscribeService pSubscribeService;

    @RequestMapping("/pv{pv}")
    public String toVideoDetail(@PathVariable Integer pv, Model model){
        model.addAttribute("pv",pv);
        PVideos video = pVideosService.getVideoByPv(pv);
        model.addAttribute("url","/file/video/?url="+video.getVideoUrl());
        return "/page/user/detail";
    }

    @ResponseBody
    @RequestMapping(value = "/detail/getinfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public JSONObject categoryInfo(@RequestParam Integer pv, HttpSession session){
        JSONObject jsonObject= new JSONObject();
        PVideos video = pVideosService.getVideoByPv(pv);
        PUserInfo userInfo = pUserInfoService.selectByUserId(video.getVideoUserid());
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        if (pUserInfo==null){
            jsonObject.put("isSub",false);
        }else{
            PSubscribe subscribe=new PSubscribe();
            subscribe.setSubscribeId(pUserInfo.getUserId());
            subscribe.setSubscribedId(video.getVideoUserid());
            jsonObject.put("isSub",pSubscribeService.checkSub(subscribe)>0);
        }
        List<PCategoryVo> voList = pCategoryService.selectAllLevel1Category();
        StringBuffer stringBuffer = new StringBuffer("");
        Long parentId=0L;
        for (PCategoryVo p:voList) {
            if (video.getVideoType().equals(p.getId())){
                parentId=p.getParentId();
                video.setVideoParentType(p.getParentId());
                stringBuffer.append(p.getParentId()+"<--");
                stringBuffer.append(p.getCategoryName());
            }
        }
        for (PCategoryVo p:voList) {
            if (parentId.equals(p.getId())){
                stringBuffer.replace(0,stringBuffer.indexOf("<"),p.getCategoryName());
            }
        }

        video.setTypeName(stringBuffer.toString());
        jsonObject.put("video",video);
        jsonObject.put("userInfo",userInfo);

        return jsonObject;
    }
}
