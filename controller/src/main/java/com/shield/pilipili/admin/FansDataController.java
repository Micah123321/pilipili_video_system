package com.shield.pilipili.admin;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PSubscribeService;
import com.shield.pilipili.pojo.*;
import com.shield.pilipili.pojo.page.PUserInfoPage;
import com.shield.pilipili.pojo.vo.FansVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Controller
public class FansDataController {
    @Resource
    private PSubscribeService pSubscribeService;
    @Resource
    private PCategoryService pCategoryService;

    @ResponseBody
    @RequestMapping(value = "/admin/fansData/get", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object fansInfo(HttpSession session) {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        FansVo fansVo = new FansVo();
        PUserInfoPage page = new PUserInfoPage();
        page.setUserId(pUserInfo.getUserId());
        fansVo.setFanCount(pSubscribeService.getFansById(page).size());
        fansVo.setLiveFanCount(pSubscribeService.getLiveFansById(page).size());

        return fansVo;
    }

    @ResponseBody
    @RequestMapping(value = "/admin/fansData/getCharts", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getFansUpCharts(@RequestParam(required = false) String beginDate, @RequestParam(required = false) String endDate, HttpSession session) throws ParseException {
        PUserInfo pUserInfo = (PUserInfo) session.getAttribute("userSession");
        return getChartData(null, null, pUserInfo.getUserId()).toJSONString();
    }


    private JSONObject getChartData(Date beginDate, Date endDate, Integer userId) throws ParseException {
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

        int[] fansUpArray = new int[7];//粉丝数数组

        List<PSubscribe> fansList = pSubscribeService.getFansByDate(beginDate, endDate, userId);
        for (PSubscribe pSubscribe : fansList) {
            int index = 0;
            for (int j = 0; j < dateStr.length; j++) {
                if (dateStr[j].equals(time2.format(pSubscribe.getCreateTime()))) {
                    index = j;
                }
            }
            fansUpArray[index] = pSubscribe.getFansCount();
        }

        //logger.info("返回结果集map");
        jsonObject.put("fansUpArray", JSONArray.parseArray(JSON.toJSONString(fansUpArray)));
        jsonObject.put("dateStr", JSONArray.parseArray(JSON.toJSONString(dateStr)));
        jsonObject.put("cateCharts", pCategoryService.getCateChartsByUid(userId));
        return jsonObject;
    }
}
