package com.shield.pilipili.user;

import com.shield.pilipili.PUserService;
import com.shield.pilipili.pojo.PUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
public class UserController {

    @Resource
    private PUserService pUserService;

    @GetMapping("/login")
    public String toLogin(){
        return "page/user/userlogin";
    }

    @GetMapping("/index")
    public String index(){
        return "page/user/index";
    }

    @ResponseBody
    @PostMapping("/log")
    public PUser login(@RequestParam String userName,@RequestParam String upwd, HttpSession session){
        PUser pUser=pUserService.login(userName,upwd);
        if (pUser!=null){
            session.setAttribute("userSession",pUser);
        }else {
            return new PUser();
        }
        return pUser;

    }

}
