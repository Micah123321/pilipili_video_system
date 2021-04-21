package com.shield.pilipili.user;

import com.github.pagehelper.PageInfo;
import com.shield.pilipili.OrderUtil;
import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PCategory;
import com.shield.pilipili.pojo.PVideos;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/search")
public class SearchController {
    @Resource
    private PCategoryService pCategoryService;
    @Resource
    private PVideosService pVideosService;

    @RequestMapping("/goSearch")
    public String goSearch(@RequestParam(defaultValue = "",required = false) String videoTitle, Model model){
        model.addAttribute("videoTitle",videoTitle);
        return "page/user/search";
    }

    @ResponseBody
    @GetMapping("/category/{parentId}")
    public Object getPCategoryBy(@PathVariable Integer parentId){
        List<PCategory> pCategoryBy = pCategoryService.getPCategoryBy(parentId);
        return pCategoryBy;
    }

    @ResponseBody
    @GetMapping("/common")
    public Object getPCategoryByCommon(String videoTitle,@RequestParam(defaultValue = "0") Integer order, String videoTime,String videoTimeEnd,Integer type,Integer category,Integer pid,@RequestParam(defaultValue = "1") Integer currPage,@RequestParam(defaultValue = "15")Integer pageSize){
        PageInfo<PVideos> pVideosPageList = pVideosService.getPVideosPageList(videoTitle, videoTime, videoTimeEnd,type,category,pid, new OrderUtil(order, true),currPage,pageSize);
        return pVideosPageList;
    }
}
