package com.shield.pilipili.admin;

import com.shield.pilipili.PSubscribeService;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.page.PUserInfoPage;
import com.shield.pilipili.pojo.vo.FansVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class FansDataController {
    @Resource
    private PSubscribeService pSubscribeService;

    @ResponseBody
    @RequestMapping(value = "/admin/fansData/get", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object fansInfo(HttpSession session) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        FansVo fansVo=new FansVo();
        PUserInfoPage page=new PUserInfoPage();
        page.setUserId(pUserInfo.getUserId());
        fansVo.setFanCount(pSubscribeService.getFansById(page).size());
        fansVo.setLiveFanCount(pSubscribeService.getLiveFansById(page).size());

        return fansVo;
    }
}
