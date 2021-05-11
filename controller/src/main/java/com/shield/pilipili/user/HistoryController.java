package com.shield.pilipili.user;

import com.shield.pilipili.PHistoryService;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.Pagen;
import com.shield.pilipili.pojo.page.PHistoryPage;
import com.shield.pilipili.pojo.vo.MessageVo;
import com.shield.pilipili.pojo.vo.PBarrageVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

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

    @ResponseBody
    @GetMapping("/history/del")
    public Object delHistoryByUid(HttpSession session,PHistoryPage pHistoryPage,Integer isDelAll){
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return new MessageVo(false);
        }
        pHistoryPage.setUserId(userSession.getUserId());
        if (isDelAll>0){
            if(pHistoryService.deleteByUserId(pHistoryPage.getUserId())>0)return new MessageVo(true);
        }else if (pHistoryService.selectByPHistory(pHistoryPage)!=null){
            if(pHistoryService.deleteByPHistory(pHistoryPage)>0)return new MessageVo(true);
        }
        return new MessageVo(false);
    }

    @ResponseBody
    @RequestMapping(value = "/history/post", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public Object setHistoryByUid(PHistoryPage pHistoryPage, HttpSession session){
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return new MessageVo(false);
        }
        pHistoryPage.setUserId(userSession.getUserId());
        if (pHistoryService.selectByPHistory(pHistoryPage)!=null){
            pHistoryService.updateByPHistory(pHistoryPage);
            return new MessageVo(true);
        }else{
            if(pHistoryService.insert(pHistoryPage)>0){
                return new MessageVo(true);
            }else{
                return new MessageVo(false);
            }
        }
    }
}
