package com.shield.pilipili.user;

import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.*;
import com.shield.pilipili.pojo.PUser;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.page.PVideosPage;
import com.shield.pilipili.pojo.vo.MessageVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Resource
    private PUserService pUserService;

    @Resource
    private PUserInfoService pUserInfoService;

    @Resource
    private PVideosService pVideosService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Resource
    private PVideosThumbsupService pVideosThumbsupService;

    @GetMapping("/admin")
    public String toAdmin() {
        return "page/admin/homePage";
    }

    @GetMapping("/login")
    public String toLogin() {
        return "page/user/userlogin";
    }

    @GetMapping("/index")
    public String index() {
        return "page/user/index";
    }



    @ResponseBody
    @RequestMapping("/log")
    public PUser login(@RequestParam String userName, @RequestParam String upwd, HttpSession session) {
        PUser pUser = pUserService.login(userName, upwd);
        if (pUser != null) {
            PUserInfo pUserInfo = pUserInfoService.selectByUserId(pUser.getUid());
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(userName, upwd);
            Authentication authentication = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            session.setAttribute("userSession", pUserInfo);
        } else {
            return new PUser();
        }
        return pUser;
    }

    @RequestMapping("/reg")
    public String reg() {
        return "page/user/userregister";
    }

    @RequestMapping("/space")
    public String goSpace(HttpSession session) {
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return "redirect:/user/login";
        }
        return "redirect:/user/space/"+userSession.getUserId();
    }

    @RequestMapping("/space/{uid}")
    public String goOtherSpace(@PathVariable Integer uid, Model model) {
        model.addAttribute("userId",uid);
        return "page/user/space";
    }

    @RequestMapping("/space/video")
    public String goVideoSpace(HttpSession session) {
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return "redirect:/user/login";
        }
        return "redirect:/user/space/"+userSession.getUserId()+"/video";
    }

    @RequestMapping("/space/{uid}/video")
    public String goVideoSpaceById(@PathVariable Integer uid, Model model) {
        model.addAttribute("userId",uid);
        return "page/user/videolist";
    }

    @ResponseBody
    @RequestMapping(value = "/space/myinfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getUserInfo(@RequestParam Integer uid){
        PUserInfo pUserInfo = pUserInfoService.selectByUserId(uid);
        if (pUserInfo==null){
            return new PUserInfo();
        }
        pUserInfo.setUpPlay(pVideosService.getPlayCountById(uid));
        pUserInfo.setUpLike(pVideosThumbsupService.getAllLikeCountByUid(uid));
        return pUserInfo;
    }

    @ResponseBody
    @RequestMapping(value = "/space/myvideoinfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getUserInfo(PVideosPage pVideosPage){
        pVideosPage.setIndex(0);
        pVideosPage.setCount(15);
        List<PVideos> videosList = pVideosService.selectVideosListByUp(pVideosPage);
        return videosList;
    }

    @ResponseBody
    @RequestMapping(value = "/getSessionUser", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getSessionUserInfo(HttpSession session){
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        return pUserInfo;
    }

    @ResponseBody
    @RequestMapping(value = "/changeDesc", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object changeDesc(@RequestParam String desc,@RequestParam Integer uid,HttpSession session){
        PUserInfo userInfo= new PUserInfo();
        userInfo.setUserId(uid);
        userInfo.setUpDesc(desc);
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null||!userSession.getUserId().equals(uid)){
            return "error";
        }
        if (pUserInfoService.updateUserInfo(userInfo)>0){
            return "ok";
        }else{
            return "error";
        }
    }

    @ResponseBody
    @RequestMapping(value = "/getLevel", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public JSONObject uploadLevel(HttpSession session){
        JSONObject jsonObject=new JSONObject();
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            jsonObject.put("user",null);
            return jsonObject;
        }
        PUserInfo pUserInfo = pUserInfoService.selectByUserId(userSession.getUserId());
        pUserInfo.setLevel(LevelUtil.getLevelByExperience(pUserInfo.getExperience()));
        if (!userSession.getLevel().equals(pUserInfo.getLevel())){
            pUserInfoService.updateUserInfo(pUserInfo);
            session.setAttribute("userSession",pUserInfo);
        }
        jsonObject.put("user",pUserInfo);
        jsonObject.put("bar",LevelUtil.getLevelBar(pUserInfo.getExperience()));
        jsonObject.put("nextExperience",LevelUtil.getNextExperience(pUserInfo.getExperience()));
        return jsonObject;
    }

    @ResponseBody
    @RequestMapping(value = "/addExperience", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object addExperience(HttpSession session){
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        PUserInfo pUserInfo = pUserInfoService.selectByUserId(userSession.getUserId());
        PUserInfo userInfo=new PUserInfo();
        userInfo.setExperience(pUserInfo.getExperience()+10);
        userInfo.setLevel(LevelUtil.getLevelByExperience(userInfo.getExperience()));
        if (!DateUtil.isNow(pUserInfo.getLoginDate())){
            userInfo.setLoginDate(new Date());
            userInfo.setUserId(pUserInfo.getUserId());
        if (pUserInfoService.updateUserInfo(userInfo)>0)return new MessageVo(0,"签到成功");
        else return new MessageVo(-1,"失败");
        }else{
            return new MessageVo(-1,"您今天已经签过到了");
        }
    }

    @ResponseBody
    @RequestMapping(value = "/changeNotice", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object changeNotice(@RequestParam String notice,@RequestParam Integer uid,HttpSession session){
        PUserInfo userInfo= new PUserInfo();
        userInfo.setUserId(uid);
        userInfo.setUpSpaceNotice(notice);
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null||!userSession.getUserId().equals(uid)){
            return "error";
        }
        if (pUserInfoService.updateUserInfo(userInfo)>0){
            return "ok";
        }else{
            return "error";
        }
    }

    @ResponseBody
    @RequestMapping("/register")
    public Object register(PUser pUser) {
        int pUser1 = pUserService.insertUser(pUser);
        PUser pUser2 = pUserService.selectByUserName(pUser.getUserName());
        PUserInfo info = new PUserInfo(pUser2.getUid(), pUser.getNickName());
        int pUserInfo = pUserInfoService.insertPuserInfo(info);

        if (pUser1 + pUserInfo > 1) {
            return new PUserInfo(pUser2.getUid(), pUser.getNickName());
        } else {
            return new PUserInfo();
        }
    }

}
