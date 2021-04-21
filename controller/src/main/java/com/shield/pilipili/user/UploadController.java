package com.shield.pilipili.user;

import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
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

    /**
     * @author zyy
     */
    @PostMapping("/video/videoUpload")
    @ResponseBody
    public ModelMap saveVideoAddress(MultipartFile videoFileAddress,
                                     HttpServletRequest request, HttpServletResponse response) {
        ModelMap map = new ModelMap();
        String paFileName = videoFileAddress.getOriginalFilename();

        String saveFilePath = "D:\\micah\\s3\\springboot\\pilipilis3\\controller\\src\\main\\resources\\static\\uploads";

        if (videoFileAddress != null &&paFileName != null && paFileName.length() > 0) {
            File newFile = new File(saveFilePath + "\\" + paFileName);
            //newFile。
            // 将内存中的数据写入磁盘
            try {
                videoFileAddress.transferTo(newFile);
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            // 将新图片名称返回到前端
            //Map<String, Object> map = new HashMap<String, Object>();
            map.put("success", "成功啦");
            map.put("url", paFileName);
            //return map;
        } else {
            System.out.println("上传失败！");
        }
        return map;
    }

}
