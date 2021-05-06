package com.shield.pilipili.admin;

import com.shield.pilipili.InterUtil;
import com.shield.pilipili.PBarrageService;
import com.shield.pilipili.PPostipService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PBarrage;
import com.shield.pilipili.pojo.PPostip;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.vo.PBarrageVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@Controller
public class BarrageAdminController {
    @Resource
    private PBarrageService pBarrageService;

    @ResponseBody
    @RequestMapping(value = "/admin/barrage/get", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object categoryInfo(HttpSession session) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        List<PBarrageVo> barrList = pBarrageService.getBarrByUserId(pUserInfo.getUserId());
        return barrList;
    }


}
