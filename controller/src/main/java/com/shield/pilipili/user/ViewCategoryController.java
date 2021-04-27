package com.shield.pilipili.user;

import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PCategory;
import com.shield.pilipili.pojo.page.PVideosPage;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import com.shield.pilipili.pojo.vo.PVideoListVo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ViewCategoryController {
    @Resource
    private PCategoryService pCategoryService;
    @Resource
    private PVideosService pVideosService;

    @RequestMapping(value = "/categoryinfo/{cateId}")
    public String toCategoryInfo(@PathVariable Integer cateId, Model model){
        model.addAttribute("cateId",cateId);
        return "page/user/category";
    }
    @RequestMapping(value = "/categoryinfo/{cateParentId}/{cateId}")
    public String toCategoryDetailInfo(@PathVariable Integer cateParentId,@PathVariable Integer cateId, Model model){
        model.addAttribute("cateId",cateId);
        model.addAttribute("cateParentId",cateParentId);
        return "page/user/categorydetail";
    }
    @ResponseBody
    @RequestMapping(value = "/category/videoInfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object videoInfo(PVideosPage pVideosPage){
        pVideosPage.setCount(8);
        pVideosPage.setIndex(0);
        pVideosPage.setOrderBy(1);
        List<PVideosPage> listByType = pVideosService.getVideosListByType(pVideosPage);
        return listByType;
    }

    @ResponseBody
    @RequestMapping(value = "/category/get", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public JSONObject categoryInfo(PVideosPage pVideosPage){
        JSONObject jsonObject = new JSONObject();
        pVideosPage.setCount(4);
        pVideosPage.setIndex(0);
        pVideosPage.setOrderBy(1);
        List<PVideosPage> top4Video = pVideosService.getVideosListByType(pVideosPage);
        jsonObject.put("top4",top4Video);

        List<PCategory> pCategoryList = pCategoryService.getPCategoryBy((pVideosPage.getVideoType()).intValue());

        pVideosPage.setCount(12);
        pVideosPage.setIndex(0);
        List<PVideoListVo> videoList=new ArrayList<>();
        for (PCategory p:pCategoryList) {
            pVideosPage.setType((p.getId()).intValue());
            List<PVideosPage> videosListByType = pVideosService.getVideosListByType(pVideosPage);
            videoList.add(new PVideoListVo(videosListByType,p.getCategoryName(),p.getId()));
        }
        jsonObject.put("videoList",videoList);
        return jsonObject;
    }
}
