package com.shield.pilipili.admin;

import com.shield.pilipili.PAppealsReplyService;
import com.shield.pilipili.PAppealsService;
import com.shield.pilipili.pojo.PAppeals;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.Pagen;
import com.shield.pilipili.pojo.page.PAppealsPage;
import com.shield.pilipili.pojo.vo.MessageVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
public class PAppealsController {
    @Resource
    private PAppealsService pAppealsService;

    @Resource
    private PAppealsReplyService pAppealsReplyService;

    @RequestMapping("/admin/appeal/{id}")
    public String toAppeal(@PathVariable Integer id){
        return "page/admin/appealDetail";
    }

    @ResponseBody
    @RequestMapping(value = "/admin/appeal/add", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public Object addAppeal(HttpSession session, PAppeals appeals) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        appeals.setUserId(pUserInfo.getUserId());
        PAppeals insert = pAppealsService.insert(appeals);
        if (insert.getId()>0){
            pAppealsReplyService.addKefuMessage(insert.getId());
            return new MessageVo(true);
        }else {
            return new MessageVo(false);
        }
    }

    @ResponseBody
    @RequestMapping(value = "/admin/appeal/update", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public Object updateAppeal(@RequestParam Integer id) {
        PAppeals appeals=new PAppeals();
        appeals.setState(1);
        appeals.setId(id);
        PAppeals insert = pAppealsService.update(appeals);
        if (insert.getId()>0){
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
