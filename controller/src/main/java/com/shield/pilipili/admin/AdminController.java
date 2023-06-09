package com.shield.pilipili.admin;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.*;
import com.shield.pilipili.pojo.*;
import com.shield.pilipili.pojo.page.PUserInfoPage;
import com.shield.pilipili.pojo.page.PVideosPage;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Controller
public class AdminController {
    @Resource
    private PBarrageService pBarrageService;
    @Resource
    private PCommentService pCommentService;
    @Resource
    private PSubscribeService pSubscribeService;
    @Resource
    private PVideosService pVideosService;
    @Resource
    private PCategoryService pCategoryService;
    @Resource
    private PVideosThumbsupService pVideosThumbsupService;

    @GetMapping("/admin")
    public String goHome(String url,Model model, HttpSession session) throws ParseException {
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return "redirect:/user/login";
        }
        Integer uid = userSession.getUserId();
        PUserInfoPage page=new PUserInfoPage();
        page.setUserId(uid);
        model.addAttribute("fansCount",pSubscribeService.getFansById(page).size());
        model.addAttribute("playCount",pVideosService.getPlayCountById(uid));
        model.addAttribute("comCount",pCommentService.getComCountByUserId(uid));
        model.addAttribute("likeCount",pVideosThumbsupService.getAllLikeCountByUid(uid));
        model.addAttribute("collectCount",pVideosService.getCollectCountById(uid));
        model.addAttribute("barrCount",pBarrageService.getBarrCountByUserId(uid));
        model.addAttribute("jsonObject", getChartData(null,null,uid));
        if (url!=null&&url!=""){
            model.addAttribute("url",url);
        }
        return "page/admin/homePage";
    }
    @GetMapping("admin/home")
    public String toAdmin(Model model,HttpSession session) throws ParseException {
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return "redirect:/user/login";
        }
        Integer userId = userSession.getUserId();
        PUserInfoPage page=new PUserInfoPage();
        page.setUserId(userId);
        model.addAttribute("fansCount",pSubscribeService.getFansById(page).size());
        model.addAttribute("playCount",pVideosService.getPlayCountById(userId));
        model.addAttribute("comCount",pCommentService.getComCountByUserId(userId));
        model.addAttribute("likeCount",pVideosThumbsupService.getAllLikeCountByUid(userId));
        model.addAttribute("collectCount",pVideosService.getCollectCountById(userId));
        model.addAttribute("barrCount",pBarrageService.getBarrCountByUserId(userId));
        model.addAttribute("jsonObject", getChartData(null,null,userId));
        return "page/admin/homeManagePage";
    }
    @ResponseBody
    @RequestMapping(value = "admin/home/charts", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public String getChartDataByDate(@RequestParam(required = false) String beginDate, @RequestParam(required = false) String endDate,HttpSession session) throws ParseException {
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return getChartData(null, null,0).toJSONString();
        }
        Integer uid = userSession.getUserId();
        if (beginDate != null && endDate != null) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            return getChartData(simpleDateFormat.parse(beginDate), simpleDateFormat.parse(endDate),uid).toJSONString();
        } else {
            return getChartData(null, null,0).toJSONString();
        }
    }

    @ResponseBody
    @RequestMapping(value = "admin/creative/data", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getVideoData(HttpSession session,PVideosPage pVideosPage,@RequestParam(defaultValue = "1")Integer currPage,@RequestParam(required = false,defaultValue = "0") Integer videoStateCode){
        Pagen<PVideos> page = new Pagen<>();
        page.setPageSize(10);
        Integer videoState = pVideosPage.getVideoState();
        if (videoStateCode<1){
            pVideosPage.setVideoState(-1);
        }
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (pVideosPage.getVideoUserid()==null||pVideosPage.getVideoUserid()==0)pVideosPage.setVideoUserid(userSession.getUserId());
        page.setTotalCount(pVideosService.selectVideosListByUp(pVideosPage).size());
        page.setAllDataList( pVideosService.selectVideosListByUp(pVideosPage));
        if (currPage>page.getTotalPageCount())currPage=page.getTotalPageCount();
        page.setIndex(currPage);
        pVideosPage.setIndex((currPage - 1) * page.getPageSize());
        pVideosPage.setCount( page.getPageSize());
        page.setCurrPageNo(currPage);
        if (videoStateCode<1)pVideosPage.setVideoState(videoState);
        page.setDataList(pVideosService.selectVideosListByUp(pVideosPage));
        return page;
    }

    @ResponseBody
    @RequestMapping(value = "admin/creative/typedata", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getTypeData(Integer uid,Integer videoState,HttpSession session){
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (uid==null){
            uid=userSession.getUserId();
        }
        if (videoState==null){
            videoState=-1;
        }
        List<PCategoryVo> categoryVos = pCategoryService.getLv1CountByUid(uid,videoState);
        Integer allCount=0;
        for (PCategoryVo p:categoryVos) {
            allCount+=p.getCount();
        }
        PCategoryVo categoryVo = new PCategoryVo();
        categoryVo.setCount(allCount);
        categoryVo.setCategoryName("全部");
        categoryVo.setId(0L);
        categoryVos.add(0,categoryVo);
        return categoryVos;
    }

    //获取图表的JSON数据
    private JSONObject getChartData(Date beginDate, Date endDate,Integer userId) throws ParseException {
        JSONObject jsonObject = new JSONObject();
        SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd", Locale.UK);
        SimpleDateFormat timeSpecial = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.UK);
        if (beginDate == null || endDate == null) {
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DATE, -7);
            beginDate = time.parse(time.format(cal.getTime()));
            cal = Calendar.getInstance();
            cal.add(Calendar.DATE, -1);
            endDate = timeSpecial.parse(time.format(cal.getTime()) + " 23:59:59");
        } else {
            beginDate = time.parse(time.format(beginDate));
            endDate = timeSpecial.parse(time.format(endDate) + " 23:59:59");
        }
        String[] dateStr = new String[7];
        SimpleDateFormat time2 = new SimpleDateFormat("MM/dd", Locale.UK);
        //logger.info("获取时间段数组");
        for (int i = 0; i < dateStr.length; i++) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(beginDate);
            cal.add(Calendar.DATE, i);
            dateStr[i] = time2.format(cal.getTime());
        }
        //logger.info("获取总交易额订单列表");
        //logger.info("根据订单状态分类");
        int[] orderTotalArray = new int[7];//粉丝数数组
        int[] orderUnpaidArray = new int[7];//弹幕数组
        int[] orderNotShippedArray = new int[7];//点赞叔祖
        int[] orderUnconfirmedArray = new int[7];//评论数组
        int[] orderSuccessArray = new int[7];//收藏数组
        List<PSubscribe> fansList = pSubscribeService.getFansByDate(beginDate, endDate, userId);
        List<PCollectInfo> collectList = pVideosService.getCollectByDate(beginDate, endDate, userId);
        List<PComment> commentList = pCommentService.getCommentCountByDate(beginDate, endDate, userId);
        List<PVideosThumbsup> likeList = pVideosService.getLikeByDate(beginDate, endDate, userId);
        List<PBarrage> barrList = pBarrageService.getBarrCountByDate(beginDate, endDate, userId);
        for (PSubscribe pSubscribe : fansList) {
            int index = 0;
            for (int j = 0; j < dateStr.length; j++) {
                if (dateStr[j].equals(time2.format(pSubscribe.getCreateTime()))) {
                    index = j;
                }
            }
            orderTotalArray[index] = pSubscribe.getFansCount();
        }
        for (PCollectInfo pSubscribe : collectList) {
            int index = 0;
            for (int j = 0; j < dateStr.length; j++) {
                if (dateStr[j].equals(time2.format(pSubscribe.getAddTime()))) {
                    index = j;
                }
            }
            orderSuccessArray[index] = pSubscribe.getCollectCount();
        }
        for (PComment pSubscribe : commentList) {
            int index = 0;
            for (int j = 0; j < dateStr.length; j++) {
                if (dateStr[j].equals(time2.format(pSubscribe.getCreateTime()))) {
                    index = j;
                }
            }
            orderUnconfirmedArray[index] = pSubscribe.getCommentCount();
        }
        for (PVideosThumbsup pSubscribe : likeList) {
            int index = 0;
            for (int j = 0; j < dateStr.length; j++) {
                if (dateStr[j].equals(time2.format(pSubscribe.getCreateTime()))) {
                    index = j;
                }
            }
            orderNotShippedArray[index] = pSubscribe.getLikeCount();
        }
        for (PBarrage pSubscribe : barrList) {
            int index = 0;
            for (int j = 0; j < dateStr.length; j++) {
                if (dateStr[j].equals(time2.format(pSubscribe.getCreateTime()))) {
                    index = j;
                }
            }
            orderUnpaidArray[index] = pSubscribe.getBarrCount();
        }
        //logger.info("返回结果集map");
        jsonObject.put("orderTotalArray", JSONArray.parseArray(JSON.toJSONString(orderTotalArray)));
        jsonObject.put("orderUnpaidArray", JSONArray.parseArray(JSON.toJSONString(orderUnpaidArray)));
        jsonObject.put("orderNotShippedArray", JSONArray.parseArray(JSON.toJSONString(orderNotShippedArray)));
        jsonObject.put("orderUnconfirmedArray", JSONArray.parseArray(JSON.toJSONString(orderUnconfirmedArray)));
        jsonObject.put("orderSuccessArray", JSONArray.parseArray(JSON.toJSONString(orderSuccessArray)));
        jsonObject.put("dateStr",JSONArray.parseArray(JSON.toJSONString(dateStr)));
        return jsonObject;
    }

    @GetMapping("/admin/upload")
    public String toUpload(){
        return "page/admin/upload";
    }

    @GetMapping("/admin/barrage")
    public String toBarrage(){
        return "page/admin/barrage";
    }

    @GetMapping("/admin/fansData")
    public String toFans(){
        return "page/admin/fansData";
    }

    @GetMapping("/admin/appeal")
    public String toAppeal(){
        return "page/admin/appeal";
    }

    @GetMapping("/admin/category")
    public String toCate(){
        return "page/admin/category";
    }

    @GetMapping("/admin/comment")
    public String toComment(){
        return "page/admin/comment";
    }

    @GetMapping("/video/uploadDetail")
    public String toUploadDetail(){
        return "page/admin/uploadDetail";
    }

    @RequestMapping("/video/uploadDetail/{pid}")
    public String toDetail(@PathVariable Integer pid, Model model){
        model.addAttribute("pid",pid);
        return "page/admin/uploadDetail";
    }

    @GetMapping("/admin/uploadInfo/{pid}")
    public String toUploadInfo(@PathVariable Integer pid, Model model){
        model.addAttribute("pid",pid);
        return "page/admin/uploadInfo";
    }

    @GetMapping("/admin/uploadInfo")
    public String toUploadInfo(Model model){
        model.addAttribute("pid",0);
        return "page/admin/uploadInfo";
    }
    @GetMapping("/admin/account/logout")
    public String logout(HttpSession session){
        session.invalidate();
        return "redirect:/user/login";
    }
    @GetMapping("admin/creative")
    public String toCreative(){
        return "page/admin/creative";
    }
}
