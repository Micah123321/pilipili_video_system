package com.shield.pilipili.user;

import com.github.pagehelper.PageInfo;
import com.shield.pilipili.OrderUtil;
import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PVideos;
import org.springframework.core.annotation.OrderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Date;

@Controller
@RequestMapping("/index")
public class IndexController {

    @Resource
    private PCategoryService pCategoryService;
    @Resource
    private PVideosService pVideosService;

    @RequestMapping("/")
    public String goHome(){
        return "page/user/index";
    }


}
