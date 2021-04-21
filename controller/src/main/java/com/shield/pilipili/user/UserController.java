package com.shield.pilipili.user;

import com.shield.pilipili.PUserInfoService;
import com.shield.pilipili.PUserService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.PVideosThumbsupService;
import com.shield.pilipili.pojo.PUser;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.page.PVideosPage;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

import javax.servlet.http.HttpSession;
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
        List<PVideos> videosList = pVideosService.selectVideosListByUp(pVideosPage);
        return videosList;
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
