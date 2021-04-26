package com.shield.pilipili.user;

import com.shield.pilipili.PCategoryService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class ViewCategoryController {
    @Resource
    private PCategoryService pCategoryService;

    @RequestMapping(value = "/categoryinfo/{cateId}")
    public String toCategoryInfo(@PathVariable Integer cateId, Model model){
        model.addAttribute("cateId",cateId);
        return "page/user/category";
    }
}
