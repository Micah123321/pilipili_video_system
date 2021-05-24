package com.shield.pilipili.admin;

import com.shield.pilipili.PAppealsService;
import com.shield.pilipili.pojo.PAppeals;
import com.shield.pilipili.pojo.PComment;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.Pagen;
import com.shield.pilipili.pojo.page.PAppealsPage;
import com.shield.pilipili.pojo.page.PCommentPage;
import com.shield.pilipili.pojo.vo.MessageVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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

    @ResponseBody
    @RequestMapping(value = "/admin/appeal/get", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getAppeal(PAppealsPage appeals,HttpSession session) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        appeals.setUserId(pUserInfo.getUserId());
        return pAppealsService.getAppealsById(appeals);
    }

    @ResponseBody
    @RequestMapping(value = "/admin/appeal/list", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getAppeals(HttpSession session, PAppealsPage appeals, @RequestParam(defaultValue = "1")Integer currPage) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        appeals.setUserId(pUserInfo.getUserId());
        Pagen<PAppealsPage> page = new Pagen<>();
        page.setPageSize(9);
        page.setTotalCount(pAppealsService.getAppealsByPage(appeals).size());
        if (currPage>page.getTotalPageCount())currPage=page.getTotalPageCount();
        appeals.setIndex((currPage - 1) * page.getPageSize());
        appeals.setCount( page.getPageSize());
        page.setCurrPageNo(currPage);
        page.setDataList(pAppealsService.getAppealsByPage(appeals));
        return page;
    }


}
