package com.shield.pilipili.user;

import com.shield.pilipili.PUserInfoService;
import com.shield.pilipili.PUserService;
import com.shield.pilipili.pojo.PUser;
import com.shield.pilipili.pojo.PUserInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
public class UserController {

    @Resource
    private PUserService pUserService;

    @Resource
    private PUserInfoService pUserInfoService;

        @GetMapping("/admin")
        public String toAdmin() {
            return "page/admin/homePage";
        }

        @GetMapping("/login")
        public String toLogin () {
            return "page/user/userlogin";
        }

        @GetMapping("/index")
        public String index () {
            return "page/user/index";
        }

        @ResponseBody
        @RequestMapping("/log")
        public PUser login (@RequestParam String userName, @RequestParam String upwd, HttpSession session){
            PUser pUser = pUserService.login(userName, upwd);
            PUserInfo pUserInfo = pUserInfoService.selectByUserId(pUser.getUid());
            if (pUser != null) {
                session.setAttribute("userSession", pUserInfo);
            } else {
                return new PUser();
            }
            return pUser;
        }

        @RequestMapping("reg")
        public String reg () {
            return "page/user/userregister";
        }

        @ResponseBody
        @RequestMapping("/register")
        public Object register (PUser pUser){
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




