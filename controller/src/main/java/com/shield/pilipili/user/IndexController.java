package com.shield.pilipili.user;

import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PUserInfoService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PUserInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/index")
public class IndexController {

    @Resource
    private PCategoryService pCategoryService;
    @Resource
    private PVideosService pVideosService;
    @Resource
    private PUserInfoService pUserInfoService;

    @ResponseBody
    @RequestMapping(value = "/userinfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object userinfo(HttpSession session){
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return new PUserInfo();
        }
        PUserInfo pUserInfo = pUserInfoService.selectByUserId(userSession.getUserId());
        return pUserInfo;
    }


}
