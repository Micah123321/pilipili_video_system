package com.shield.pilipili.admin;

import com.shield.pilipili.PBarrageService;

import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.Pagen;
import com.shield.pilipili.pojo.page.PBarragePage;
import com.shield.pilipili.pojo.vo.MessageVo;
import com.shield.pilipili.pojo.vo.PBarrageVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
public class BarrageAdminController {
    @Resource
    private PBarrageService pBarrageService;

    @ResponseBody
    @RequestMapping(value = "/admin/barrage/get", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object categoryInfo(HttpSession session, PBarragePage pBarragePage, @RequestParam(defaultValue = "1")Integer currPage) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        pBarragePage.setUserId(pUserInfo.getUserId());
        Pagen<PBarragePage> page = new Pagen<>();
        page.setPageSize(8);
        page.setTotalCount(pBarrageService.getBarrByUserId(pBarragePage).size());
        if (currPage>page.getTotalPageCount())currPage=page.getTotalPageCount();
        pBarragePage.setIndex((currPage - 1) * page.getPageSize());
        pBarragePage.setCount( page.getPageSize());
        page.setCurrPageNo(currPage);
        page.setDataList(pBarrageService.getBarrByUserId(pBarragePage));
        return page;
    }

    @ResponseBody
    @RequestMapping(value = "/admin/barrage/del", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object delBarrage(HttpSession session, PBarrageVo pBarrageVo) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        pBarrageVo.setUserId(pUserInfo.getUserId());
        if (pBarrageVo.getBarrageArr().length==pBarrageService.deleteByPBarrage(pBarrageVo)){
            return new MessageVo(true);
        }else{
            return new MessageVo(false);
        }
    }

}
