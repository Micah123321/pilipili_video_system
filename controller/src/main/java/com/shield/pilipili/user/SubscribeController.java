package com.shield.pilipili.user;

import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.PSubscribeService;
import com.shield.pilipili.PUserInfoService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PSubscribe;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.Pagen;
import com.shield.pilipili.pojo.page.PUserInfoPage;
import com.shield.pilipili.pojo.vo.MessageVo;
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

    @Resource
    private PUserInfoService pUserInfoService;

    /**
     * 关注
     * @param subId
     * @param session
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/sub/sub", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object subUp(@RequestParam Integer subId,HttpSession session){
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        MessageVo messageVo = new MessageVo();
        if (pUserInfo==null){
            messageVo.setMessage("请登录账号");
            messageVo.setCode(-1);
            return messageVo;
        }
        if (pUserInfo.getUserId().equals(subId)){
            messageVo.setMessage("不能订阅你自己");
            messageVo.setCode(-1);
            return messageVo;
        }
        PSubscribe pSubscribe=new PSubscribe();
        pSubscribe.setSubscribeId(pUserInfo.getUserId());
        pSubscribe.setSubscribedId(subId);
        if (pSubscribeService.checkSub(pSubscribe)>0){
            messageVo.setMessage("不能重复订阅");
            messageVo.setCode(-1);
            return messageVo;
        }else{
            if (pSubscribeService.insert(pSubscribe)>0){
                messageVo.setMessage("ok");
                messageVo.setCode(0);
                pUserInfoService.updateFansData(pSubscribe.getSubscribedId());
                pUserInfoService.updateFansData(pSubscribe.getSubscribeId());
            }
        }
        return messageVo;
    }

    /**
     * 取关
     * @param subId
     * @param session
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/sub/del", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object delUp(@RequestParam Integer subId,HttpSession session){
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        MessageVo messageVo = new MessageVo();
        if (pUserInfo==null){
            messageVo.setMessage("请登录账号");
            messageVo.setCode(-1);
            return messageVo;
        }
        PSubscribe pSubscribe=new PSubscribe();
        pSubscribe.setSubscribeId(pUserInfo.getUserId());
        pSubscribe.setSubscribedId(subId);
        if (pSubscribeService.checkSub(pSubscribe)<1){
            messageVo.setMessage("数据错误");
            messageVo.setCode(-1);
            return messageVo;
        }else{
            if (pSubscribeService.deleteById(pSubscribe)>0){
                messageVo.setMessage("ok");
                messageVo.setCode(0);
                pUserInfoService.updateFansData(pSubscribe.getSubscribedId());
                pUserInfoService.updateFansData(pSubscribe.getSubscribeId());
            }
        }
        return messageVo;
    }

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
    @RequestMapping(value = "/sub/isSub", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object checkIsSub(@RequestParam Integer subId,HttpSession session){
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        MessageVo messageVo = new MessageVo();
        if (pUserInfo==null){
            messageVo.setMessage("请登录账号");
            messageVo.setCode(-1);
            return messageVo;
        }
        if (pUserInfo.getUserId().equals(subId)){
            messageVo.setMessage("不能订阅你自己");
            messageVo.setCode(-1);
            return messageVo;
        }
        PSubscribe pSubscribe=new PSubscribe();
        pSubscribe.setSubscribeId(pUserInfo.getUserId());
        pSubscribe.setSubscribedId(subId);
        if (pSubscribeService.checkSub(pSubscribe)<1){
            messageVo.setMessage("未订阅");
            messageVo.setCode(0);
            return messageVo;
        }else{
            messageVo.setMessage("已订阅");
            messageVo.setCode(1);
            return messageVo;
        }
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
