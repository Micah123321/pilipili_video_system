package com.shield.pilipili.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {
    @GetMapping("/admin")
    public String toAdmin(){
        return "page/admin/homePage";
    }
    @GetMapping("/login")
    public String toLogin(){
        return "page/user/index";
    }
}
