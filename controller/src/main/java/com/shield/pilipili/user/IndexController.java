package com.shield.pilipili.user;

import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PUserInfoService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.page.PVideosPage;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import com.shield.pilipili.pojo.vo.PVideoListVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/index")
public class IndexController {

    @Resource
    private PCategoryService pCategoryService;
    @Resource
    private PVideosService pVideosService;
    @Resource
    private PUserInfoService pUserInfoService;

    @ResponseBody
    @RequestMapping(value = "/userinfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object userinfo(HttpSession session){
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return new PUserInfo();
        }
        PUserInfo pUserInfo = pUserInfoService.selectByUserId(userSession.getUserId());
        return pUserInfo;
    }
    @ResponseBody
    @RequestMapping(value = "/videoInfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object videoInfo(PVideosPage pVideosPage){
        pVideosPage.setCount(8);
        pVideosPage.setIndex(0);
        pVideosPage.setOrderBy(1);
        List<PCategoryVo> categoryVoList = pCategoryService.selectAllLevel1Category();
        List<PVideoListVo> listVos=new ArrayList<>();
        for (PCategoryVo p:categoryVoList) {
            pVideosPage.setVideoType(p.getId());
            List<PVideosPage> listByType = pVideosService.getVideosListByType(pVideosPage);
            PVideoListVo pVideoListVo=new PVideoListVo(listByType,p.getCategoryName(),p.getId());
            pVideoListVo.setVideoParentType(p.getParentId());
            listVos.add(pVideoListVo);
        }
        return listVos;
    }
    @ResponseBody
    @RequestMapping(value = "/randTitle", method = RequestMethod.GET, produces = "text/html;charset=utf-8")
    public String getRandTitle(){
        return pVideosService.getRandTitle();
    }

    @ResponseBody
    @RequestMapping(value = "/typedata", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getTypeTitle(){
        List<PCategoryVo> categoryVos = pCategoryService.getLv1CountByUid(0,1);
        return categoryVos;
    }

    @ResponseBody
    @RequestMapping(value = "/randVideoInfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getRandVideo(PVideosPage pVideosPage){
        pVideosPage.setCount(8);
        pVideosPage.setIndex(0);
        pVideosPage.setOrderBy(5);
        List<PVideosPage> listByType = pVideosService.getVideosListByType(pVideosPage);
        return listByType;
    }

    @RequestMapping("/test")
    public String test(){
        return "page/user/videotest";
    }


}
