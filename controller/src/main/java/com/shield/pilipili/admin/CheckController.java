package com.shield.pilipili.admin;

import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.Pagen;
import com.shield.pilipili.pojo.page.PVideosPage;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class CheckController {
    @Resource
    private PVideosService pVideosService;

    @ResponseBody
    @RequestMapping(value = "admin/check/data", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getVideoData(PVideosPage pVideosPage, @RequestParam(defaultValue = "1")Integer currPage){
        Pagen<PVideos> page = new Pagen<>();
        page.setPageSize(10);
        pVideosPage.setVideoState(0);
        pVideosPage.setVideoUserid(0);
        page.setTotalCount(pVideosService.selectVideosListByUp(pVideosPage).size());
        if (currPage>page.getTotalPageCount())currPage=page.getTotalPageCount();
        page.setIndex(currPage);
        pVideosPage.setIndex((currPage - 1) * page.getPageSize());
        pVideosPage.setCount( page.getPageSize());
        page.setCurrPageNo(currPage);
        page.setDataList(pVideosService.selectVideosListByUp(pVideosPage));
        return page;
    }

    @RequestMapping("/admin/check")
    public String toCheck(){
        return "page/admin/check";
    }

    @RequestMapping("/admin/checkDetail")
    public String toCheckDetail(Model model,Integer pid){
        model.addAttribute("pid",pid);
        return "page/admin/checkDetail";
    }
    @RequestMapping("/videoPlay")
    public String toPlay(Model model,String url){
        model.addAttribute("url",url);
        return "page/admin/videoPlay";
    }
}
