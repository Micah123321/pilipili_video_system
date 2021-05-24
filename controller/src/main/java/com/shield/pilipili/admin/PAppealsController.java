package com.shield.pilipili.admin;

import com.shield.pilipili.PAppealsService;
import com.shield.pilipili.pojo.PAppeals;
import com.shield.pilipili.pojo.PComment;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.vo.MessageVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
public class PAppealsController {
    @Resource
    private PAppealsService pAppealsService;

    @ResponseBody
    @RequestMapping(value = "/admin/appeal/add", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public Object addAppeal(HttpSession session, PAppeals appeals) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        appeals.setUserId(pUserInfo.getUserId());
        if (pAppealsService.insert(appeals).getId()>0){
            return new MessageVo(true);
        }else {
            return new MessageVo(false);
        }
    }
}
