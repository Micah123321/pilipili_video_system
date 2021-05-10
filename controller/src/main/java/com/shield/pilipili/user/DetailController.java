package com.shield.pilipili.user;

import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.*;
import com.shield.pilipili.pojo.*;
import com.shield.pilipili.pojo.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
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
    @Resource
    private PVideosThumbsupService pVideosThumbsupService;
    @Resource
    private PPostipService pPostipService;

    @RequestMapping("/pv{pv}")
    public String toVideoDetail(@PathVariable Integer pv, Model model) {
        model.addAttribute("pv", pv);
        PVideos video = pVideosService.getVideoByPv(pv);
        model.addAttribute("url", "/file/video/?url=" + video.getVideoUrl());
        return "/page/user/detail";
    }

    @ResponseBody
    @RequestMapping(value = "/detail/getinfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public JSONObject categoryInfo(@RequestParam Integer pv, HttpSession session) {
        JSONObject jsonObject = new JSONObject();
        PVideos video = pVideosService.getVideoByPv(pv);
        PUserInfo userInfo = pUserInfoService.selectByUserId(video.getVideoUserid());
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        if (pUserInfo == null) {
            jsonObject.put("isSub", false);
        } else {
            PSubscribe subscribe = new PSubscribe();
            subscribe.setSubscribeId(pUserInfo.getUserId());
            subscribe.setSubscribedId(video.getVideoUserid());
            jsonObject.put("isSub", pSubscribeService.checkSub(subscribe) > 0);
        }
        List<PCategoryVo> voList = pCategoryService.selectAllLevel1Category();
        StringBuffer stringBuffer = new StringBuffer("");
        Long parentId = 0L;
        for (PCategoryVo p : voList) {
            if (video.getVideoType().equals(p.getId())) {
                parentId = p.getParentId();
                video.setVideoParentType(p.getParentId());
                stringBuffer.append(p.getParentId() + "<--");
                stringBuffer.append(p.getCategoryName());
            }
        }
        for (PCategoryVo p : voList) {
            if (parentId.equals(p.getId())) {
                stringBuffer.replace(0, stringBuffer.indexOf("<"), p.getCategoryName());
            }
        }

        video.setTypeName(stringBuffer.toString());
        jsonObject.put("video", video);
        jsonObject.put("userInfo", userInfo);

        return jsonObject;
    }

    @ResponseBody
    @RequestMapping(value = "/detail/thumbsup", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getThumbsup(PVideosThumbsup pVideosThumbsup, HttpSession session) {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        pVideosThumbsup.setUserId(pUserInfo.getUserId());
        PVideosThumbsupVo pVideosThumbsupVo = pVideosThumbsupService.selectThumbsupByThumbsup(pVideosThumbsup);
        return pVideosThumbsupVo;
    }

    @ResponseBody
    @RequestMapping(value = "/detail/addThumbsup", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object addThumbsup(PVideosThumbsup pVideosThumbsup, HttpSession session) {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        pVideosThumbsup.setUserId(pUserInfo.getUserId());
        PVideosThumbsupVo pVideosThumbsupVo = pVideosThumbsupService.selectThumbsupByThumbsup(pVideosThumbsup);
        if (pVideosThumbsupVo.getIsThumbsup()) {
            return new MessageVo(-1, "点赞失败");
        }
        if (pVideosThumbsupService.insert(pVideosThumbsup) > 0) {
            pVideosService.updateVideoData(pVideosThumbsup.getVideoId());
            return new MessageVo(0, "点赞成功");
        } else {
            return new MessageVo(-1, "点赞失败");
        }
    }

    @ResponseBody
    @RequestMapping(value = "/detail/delThumbsup", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object delThumbsup(PVideosThumbsup pVideosThumbsup, HttpSession session) {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        pVideosThumbsup.setUserId(pUserInfo.getUserId());
        PVideosThumbsupVo pVideosThumbsupVo = pVideosThumbsupService.selectThumbsupByThumbsup(pVideosThumbsup);
        if (!pVideosThumbsupVo.getIsThumbsup()) {
            return new MessageVo(-1, "取消失败");
        }
        if (pVideosThumbsupService.deleteByThumbsup(pVideosThumbsup) > 0) {
            pVideosService.updateVideoData(pVideosThumbsup.getVideoId());
            return new MessageVo(0, "取消成功");
        } else {
            return new MessageVo(-1, "取消失败");
        }
    }
    @ResponseBody
    @RequestMapping(value = "/getip", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getIp(HttpServletRequest request) {
        PPostip pPostip = new PPostip();
        pPostip.setIp(InterUtil.getIpAddr(request));
        return pPostip;
    }

    @ResponseBody
    @RequestMapping(value = "/detail/updatePlay", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object updatePlay(HttpServletRequest request, PVideoVo videos) {
        PPostip pPostip = new PPostip();
        pPostip.setIp(InterUtil.getIpAddr(request));
        pPostip.setType(0);
        pPostip.setVideoPv(videos.getVideoPv());
        pPostip.setMinusSecond(videos.getVideoTimeSecond());
        if (pPostipService.selectPostCount(pPostip)>0){
            return new MessageVo(-1,"添加失败");
        }else{
            pVideosService.updatePlayCount(videos.getVideoPv());
            pPostipService.insertPostIp(pPostip);
            return new MessageVo(0,"添加成功");
        }
    }

}
