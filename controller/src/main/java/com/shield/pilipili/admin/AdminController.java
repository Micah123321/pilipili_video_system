package com.shield.pilipili.admin;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.PBarrageService;
import com.shield.pilipili.PCommentService;
import com.shield.pilipili.PSubscribeService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
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

    @GetMapping("/admin")
    public String goHome(Model model) throws ParseException {
        model.addAttribute("fansCount",pSubscribeService.getFansById(1).size());
        model.addAttribute("playCount",pVideosService.getPlayCountById(1));
        model.addAttribute("comCount",pCommentService.getComCountByUserId(1));
        model.addAttribute("likeCount",pVideosService.getLikeCountById(1));
        model.addAttribute("collectCount",pVideosService.getCollectCountById(1));
        model.addAttribute("barrCount",pBarrageService.getBarrCountByUserId(1));
        model.addAttribute("jsonObject", getChartData(null,null));
        return "page/admin/homePage";
    }
    @GetMapping("admin/home")
    public String toAdmin(Model model) throws ParseException {
        model.addAttribute("fansCount",pSubscribeService.getFansById(1).size());
        model.addAttribute("playCount",pVideosService.getPlayCountById(1));
        model.addAttribute("comCount",pCommentService.getComCountByUserId(1));
        model.addAttribute("likeCount",pVideosService.getLikeCountById(1));
        model.addAttribute("collectCount",pVideosService.getCollectCountById(1));
        model.addAttribute("barrCount",pBarrageService.getBarrCountByUserId(1));
        model.addAttribute("jsonObject", getChartData(null,null));
        return "page/admin/homeManagePage";
    }
    @ResponseBody
    @RequestMapping(value = "admin/home/charts", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public String getChartDataByDate(@RequestParam(required = false) String beginDate, @RequestParam(required = false) String endDate) throws ParseException {
        if (beginDate != null && endDate != null) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            return getChartData(simpleDateFormat.parse(beginDate), simpleDateFormat.parse(endDate)).toJSONString();
        } else {
            return getChartData(null, null).toJSONString();
        }
    }

    //获取图表的JSON数据
    private JSONObject getChartData(Date beginDate, Date endDate) throws ParseException {
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
        List<PSubscribe> fansList = pSubscribeService.getFansByDate(beginDate, endDate, 1);
        List<PCollectInfo> collectList = pVideosService.getCollectByDate(beginDate, endDate, 1);
        List<PComment> commentList = pCommentService.getCommentCountByDate(beginDate, endDate, 1);
        List<PVideosThumbsup> likeList = pVideosService.getLikeByDate(beginDate, endDate, 1);
        List<PBarrage> barrList = pBarrageService.getBarrCountByDate(beginDate, endDate, 1);
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

}
