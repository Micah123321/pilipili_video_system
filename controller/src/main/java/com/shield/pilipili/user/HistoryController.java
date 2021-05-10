package com.shield.pilipili.user;

import com.shield.pilipili.PHistoryService;
import com.shield.pilipili.pojo.Pagen;
import com.shield.pilipili.pojo.page.PHistoryPage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
public class HistoryController {
    @Resource
    private PHistoryService pHistoryService;

    @ResponseBody
    @RequestMapping(value = "/history/get", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getHistoryByUid(PHistoryPage pHistoryPage, @RequestParam(defaultValue = "1")Integer currPage){
        Pagen<PHistoryPage> page = new Pagen<>();
        page.setPageSize(6);
        page.setTotalCount(pHistoryService.selectHistoryByUid(pHistoryPage).size());
        if (currPage>page.getTotalPageCount())currPage=page.getTotalPageCount();
        pHistoryPage.setIndex((currPage - 1) * page.getPageSize());
        pHistoryPage.setCount( page.getPageSize());
        page.setCurrPageNo(currPage);
        page.setDataList(pHistoryService.selectHistoryByUid(pHistoryPage));
        return page;
    }
    @RequestMapping("/history")
    public String toHistory(){
        return "/page/user/history";
    }
}
