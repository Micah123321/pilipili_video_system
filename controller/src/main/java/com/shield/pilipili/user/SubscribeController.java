package com.shield.pilipili.user;

import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.PSubscribeService;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.Pagen;
import com.shield.pilipili.pojo.page.PUserInfoPage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class SubscribeController {
    @Resource
    private PSubscribeService pSubscribeService;

    @ResponseBody
    @RequestMapping(value = "/user/fansList/fansdata", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getFansByUid(PUserInfoPage userInfoPage,@RequestParam(defaultValue = "1")Integer currPage){
        Pagen<PUserInfoPage> page = new Pagen<>();
        page.setPageSize(5);
        page.setTotalCount(pSubscribeService.getFansById(userInfoPage).size());
        page.setAllDataList(pSubscribeService.getFansById(userInfoPage));
        if (currPage>page.getTotalPageCount())currPage=page.getTotalPageCount();
        page.setIndex(currPage);
        userInfoPage.setIndex((currPage - 1) * page.getPageSize());
        userInfoPage.setCount( page.getPageSize());
        page.setCurrPageNo(currPage);
        page.setDataList(pSubscribeService.getFansById(userInfoPage));
        return page;
    }

    @ResponseBody
    @RequestMapping(value = "/user/subscribeList", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public JSONObject getSubscribeList(PUserInfoPage userInfoPage){
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("fansCount",pSubscribeService.getFansById(userInfoPage).size());
        jsonObject.put("subsCount",pSubscribeService.getSubById(userInfoPage).size());
        return jsonObject;
    }

    @ResponseBody
    @RequestMapping(value = "/user/fansList/subsdata", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getSubByUid(PUserInfoPage userInfoPage,@RequestParam(defaultValue = "1")Integer currPage){
        Pagen<PUserInfoPage> page = new Pagen<>();
        page.setPageSize(5);
        page.setTotalCount(pSubscribeService.getSubById(userInfoPage).size());
        page.setAllDataList(pSubscribeService.getSubById(userInfoPage));
        if (currPage>page.getTotalPageCount())currPage=page.getTotalPageCount();
        page.setIndex(currPage);
        userInfoPage.setIndex((currPage - 1) * page.getPageSize());
        userInfoPage.setCount( page.getPageSize());
        page.setCurrPageNo(currPage);
        page.setDataList(pSubscribeService.getSubById(userInfoPage));
        return page;
    }

    @RequestMapping("/user/fans/list")
    public String getFansList(HttpSession session) {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        return "redirect:/user/fans/list/"+pUserInfo.getUserId();
    }

    @RequestMapping("/user/fans/list/{id}")
    public String getFansListById(@PathVariable Integer id, Model model) {
        model.addAttribute("userId",id);
        model.addAttribute("title","我的粉丝");
        return "page/user/fanslist";
    }

    @RequestMapping("/user/subs/list")
    public String getSubsList(HttpSession session) {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        return "redirect:/user/subs/list/"+pUserInfo.getUserId();
    }

    @RequestMapping("/user/subs/list/{id}")
    public String getSubsListById(@PathVariable Integer id, Model model) {
        model.addAttribute("userId",id);
        model.addAttribute("title","全部关注");
        return "page/user/fanslist";
    }
}
