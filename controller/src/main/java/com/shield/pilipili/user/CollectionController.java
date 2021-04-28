package com.shield.pilipili.user;

import com.github.pagehelper.PageInfo;
import com.shield.pilipili.OrderUtil;
import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PCollectInfoService;
import com.shield.pilipili.PCollectService;
import com.shield.pilipili.pojo.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/collect")
public class CollectionController {

    @Resource
    private PCollectService pCollectService;

    @Resource
    private PCollectInfoService pCollectInfoService;

    @Resource
    private PCategoryService pCategoryService;

    @RequestMapping("/goCollect")
    public String goCollection(Model model, HttpSession session) {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        model.addAttribute("userId", pUserInfo.getUserId());
        return "page/user/collection";
    }

    @ResponseBody
    @GetMapping("/collectLevel")
    public Object getPCollectList(HttpSession session, String title) {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        List<PCollect> pCollectList = pCollectService.getPCollectList(pUserInfo.getUserId(), title);
        return pCollectList;
    }

    @ResponseBody
    @GetMapping("/collectList")
    public Object getCollectInfoList(String title, @RequestParam(defaultValue = "1") Integer orderId, Integer categoryId, String keyword, HttpSession session, @RequestParam(defaultValue = "1") Integer currPage, @RequestParam(defaultValue = "2") Integer pageSize) {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        PageInfo<PCollectInfo> collectInfoAll = pCollectInfoService.getCollectInfoAll(pUserInfo.getUserId(), title, new OrderUtil(orderId, true), categoryId, keyword, currPage, pageSize);
        return collectInfoAll;
    }

    @ResponseBody
    @GetMapping("/categoryBy")
    public Object getCollectCategory(String title, HttpSession session) {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        List<PCollectInfo> categoryList = pCollectInfoService.getCollectCategory(pUserInfo.getUserId(), title);
        for (PCollectInfo collectInfo : categoryList) {
            if (collectInfo.getpCategory().getParentId() == 1) {
                collectInfo.setCategoryName(collectInfo.getpCategory().getCategoryName());
            } else {
                int parentId = Math.toIntExact(collectInfo.getpCategory().getParentId());
                PCategory pCategory = pCategoryService.getPCategoryById(parentId);
                collectInfo.setCategoryName(pCategory.getCategoryName());
            }
        }
        return categoryList;
    }

    @ResponseBody
    @PostMapping("/addCollect")
    public Object addCollect(PCollect pCollect, HttpSession session) {
        Map<String, Object> resultMap = new HashMap<>();
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        pCollect.setUserId(pUserInfo.getUserId());
        if (pCollectService.addCollect(pCollect)) {
            resultMap.put("addResult", "true");
        } else {
            resultMap.put("addResult", "false");
        }
        return resultMap;
    }

    @ResponseBody
    @PostMapping("/updateCollect")
    public Object updateCollect(PCollect pCollect) {
        Map<String, Object> resultMap = new HashMap<>();
        if (pCollectService.updateCollect(pCollect)) {
            resultMap.put("updateResult", "true");
        } else {
            resultMap.put("updateResult", "false");
        }
        return resultMap;
    }

    @ResponseBody
    @PostMapping("/delCollect")
    public Object delCollect(Integer id) {
        Map<String, Object> resultMap = new HashMap<>();
        if (pCollectInfoService.delCollectInfo(id)) {
            if (pCollectService.delCollect(id)) {
                resultMap.put("delResult", "true");
            } else {
                resultMap.put("delResult", "false");
            }
        }
        return resultMap;
    }

    @ResponseBody
    @PostMapping("/delCollectVideo")
    public Object delCollectByVideoPv(Integer videoPv,Integer collectId) {
        Map<String, Object> resultMap = new HashMap<>();
        if (pCollectInfoService.delCollectInfoByVideoPv(videoPv,collectId)) {
            resultMap.put("delResult", "true");
        } else {
            resultMap.put("delResult", "false");
        }
        return resultMap;
    }

    @ResponseBody
    @PostMapping("/moveCollectVideo")
    public Object moveCollect(PCollectInfo pCollectInfo,Integer oldCollectId){
        Map<String, Object> resultMap = new HashMap<>();
        if (pCollectInfoService.getRepetition(pCollectInfo.getVideoId(),pCollectInfo.getCollectId())){
            if (pCollectInfoService.insertCollectByVideoPv(pCollectInfo)) {
                pCollectInfoService.delCollectInfoByVideoPv(pCollectInfo.getVideoId(),oldCollectId);
                resultMap.put("moveResult", "true");
            } else {
                resultMap.put("moveResult", "false");
            }
        }else{
            pCollectInfoService.delCollectInfoByVideoPv(pCollectInfo.getVideoId(),oldCollectId);
            resultMap.put("moveResult", "true");
            resultMap.put("numResult","true");
        }
        return resultMap;
    }

    @ResponseBody
    @PostMapping("/copyCollectVideo")
    public Object copyCollect(PCollectInfo pCollectInfo){
        Map<String, Object> resultMap = new HashMap<>();
        if (pCollectInfoService.getRepetition(pCollectInfo.getVideoId(),pCollectInfo.getCollectId())){
            if (pCollectInfoService.insertCollectByVideoPv(pCollectInfo)) {
                resultMap.put("copyResult", "true");
            } else {
                resultMap.put("copyResult", "false");
            }
        }else{
            resultMap.put("copyResult", "true");
            resultMap.put("numResult","true");
        }
        return resultMap;
    }
}
