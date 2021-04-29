package com.shield.pilipili.admin;

import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.pojo.PCategory;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.vo.MessageVo;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class CategoryController {
    @Resource
    private PCategoryService pCategoryService;

    @ResponseBody
    @RequestMapping(value = "admin/categoryinfo", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object categoryInfo(){
        List<PCategoryVo> voList = pCategoryService.selectAllLevel1Category();
        return voList;
    }

    @ResponseBody
    @RequestMapping(value = "admin/categoryLv1info", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object categoryLv1Info(){
        List<PCategory> pCategoryList = pCategoryService.getPCategoryBy(1);
        return pCategoryList;
    }

    @ResponseBody
    @RequestMapping(value = "admin/categoryinfo/{pid}", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object categoryInfo(@PathVariable Integer pid){
        PCategory cateById = pCategoryService.getCateById(pid);
        return cateById;
    }
    @ResponseBody
    @RequestMapping(value = "admin/categoryinfo/edit", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public Object categoryInfo(PCategory pCategory, HttpSession session){
        PUserInfo userSession=(PUserInfo)session.getAttribute("userSession");
        int count=0;
        pCategory.setCreatedBy(userSession.getUserId());
        pCategory.setModifyBy(userSession.getUserId());
        if (pCategory.getParentId()!=null){
            count = pCategoryService.insert(pCategory);
        }else{
            count=pCategoryService.updateById(pCategory);
        }
        if (count>0){
            return new MessageVo(0,"ok");
        }else{
            return new MessageVo(-1,"error");
        }
    }
}
