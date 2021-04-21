package com.shield.pilipili.user;

import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class UploadController {
    @Resource
    private PCategoryService pCategoryService;

    @ResponseBody
    @GetMapping(value = "/typeinfo",produces = "application/json;charset=utf-8")
    public Object getTypeInfo(){
        List<PCategoryVo> voList = pCategoryService.selectAllLevel1Category();
        return voList;
    }
}
