package com.shield.pilipili.user;

import com.alibaba.fastjson.JSONObject;
import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PCategory;
import com.shield.pilipili.pojo.Pagen;
import com.shield.pilipili.pojo.page.PVideosPage;
import com.shield.pilipili.pojo.vo.PVideoListVo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
        if (cateId<=1){
            return "redirect:/";
        }
        model.addAttribute("cateId",cateId);
        return "page/user/category";
    }
    @RequestMapping(value = "/categoryinfo/{cateParentId}/{cateId}")
    public String toCategoryDetailInfo(@PathVariable Integer cateParentId,@PathVariable Integer cateId, Model model){
        if (cateId<=1){
            return "redirect:/";
        }
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
    public JSONObject categoryInfo(PVideosPage pVideosPage, Integer pageSize){
        JSONObject jsonObject = new JSONObject();
        pVideosPage.setCount(6);
        pVideosPage.setIndex(0);
        pVideosPage.setOrderBy(pVideosPage.getOrderBy());
        List<PVideosPage> top4Video = pVideosService.getVideosListByType(pVideosPage);
        jsonObject.put("top4",top4Video);

        List<PCategory> pCategoryList = pCategoryService.getPCategoryBy((pVideosPage.getVideoType()).intValue());


        pVideosPage.setCount(pageSize);
        pVideosPage.setIndex(0);
        pVideosPage.setOrderBy(pVideosPage.getOrderBy());
        List<PVideoListVo> videoList=new ArrayList<>();
        for (PCategory p:pCategoryList) {
            pVideosPage.setType((p.getId()).intValue());
            List<PVideosPage> videosListByType = pVideosService.getVideosListByType(pVideosPage);
            PVideoListVo pVideoListVo=new PVideoListVo(videosListByType,p.getCategoryName(),p.getId());
            pVideoListVo.setVideoParentType(p.getParentId());
            pVideoListVo.setParentTypeName(p.getParentTypeName());
            videoList.add(pVideoListVo);
        }
        jsonObject.put("videoList",videoList);
        return jsonObject;
    }

    @ResponseBody
    @RequestMapping(value = "/category/getTypeInfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getTypeInfo(@RequestParam Integer pid){
        List<PCategory> categoryList = pCategoryService.getPCategoryBy(pid);
        return categoryList;
    }

    @ResponseBody
    @RequestMapping(value = "/category/getDetailList", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public JSONObject categoryDetailInfo(PVideosPage pVideosPage, Integer pageSize,@RequestParam(defaultValue = "1")Integer currPage){
        JSONObject jsonObject = new JSONObject();
        Pagen<PVideosPage> page = new Pagen<>();
        page.setPageSize(pageSize);
        page.setTotalCount(pVideosService.getVideosListByType(pVideosPage).size());
        page.setAllDataList(pVideosService.getVideosListByType(pVideosPage));
        if (currPage>page.getTotalPageCount())currPage=page.getTotalPageCount();
        page.setIndex(currPage);
        pVideosPage.setIndex((currPage - 1) * page.getPageSize());
        pVideosPage.setCount( page.getPageSize());
        page.setCurrPageNo(currPage);
        page.setDataList(pVideosService.getVideosListByType(pVideosPage));
        jsonObject.put("videoListPage",page);

        pVideosPage.setCount(4);
        pVideosPage.setIndex(0);
        pVideosPage.setOrderBy(0);
        List<PVideosPage> top4Video = pVideosService.getVideosListByType(pVideosPage);
        jsonObject.put("top4",top4Video);

        return jsonObject;
    }
}
