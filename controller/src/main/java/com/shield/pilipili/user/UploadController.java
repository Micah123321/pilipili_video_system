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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
public class UploadController {

    @Resource
    private PCategoryService pCategoryService;

    public final static String UPLOAD_PATH_PREFIX = "static/uploads/";

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
        //构建文件上传所要保存的"文件夹路径"--这里是相对路径，保存到项目根路径的文件夹下
        String realPath = new String("controller/src/main/resources/" + UPLOAD_PATH_PREFIX);
        //存放上传文件的文件夹
        File file = new File(realPath);
        if(!file.isDirectory()){
            //递归生成文件夹
            file.mkdirs();
        }
        //获取原始的名字  original:最初的，起始的  方法是得到原来的文件名在客户机的文件系统名称
        String oldName = videoFileAddress.getOriginalFilename();
        String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."),oldName.length());
        System.out.println(newName);
        if (videoFileAddress != null &&paFileName != null && paFileName.length() > 0) {
            System.out.println(file.getAbsolutePath());
            File newFile = new File(file.getAbsolutePath() + "\\" + newName);
            //newFile。
            // 将内存中的数据写入磁盘
            try {
                videoFileAddress.transferTo(newFile);
            } catch (Exception e) {
                e.printStackTrace();
            }
            // 将新图片名称返回到前端
            //Map<String, Object> map = new HashMap<String, Object>();
            map.put("success", "成功啦");
            map.put("url", newName);
        } else {
            System.out.println("上传失败！");
        }
        return map;
    }

}
