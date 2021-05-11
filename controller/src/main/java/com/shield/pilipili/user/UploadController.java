package com.shield.pilipili.user;

import com.shield.pilipili.DateUtil;
import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.ClassUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class UploadController {

    @Resource
    private PCategoryService pCategoryService;

    @Resource
    private PVideosService pVideosService;

    public final static String UPLOAD_PATH_PREFIX = "static/uploads/";

    @ResponseBody
    @GetMapping(value = "/typeinfo", produces = "application/json;charset=utf-8")
    public Object getTypeInfo() {
        List<PCategoryVo> voList = pCategoryService.selectAllLevel1Category();
        return voList;
    }


    @ResponseBody
    @GetMapping(value = "/video/del", produces = "application/json;charset=utf-8")
    public Object delVideo(Integer pid) {
        if (pVideosService.deleteByPrimaryKey(pid) > 0) {
            return "ok";
        }
        return "error";
    }

    @ResponseBody
    @GetMapping(value = "/video/videodata", produces = "application/json;charset=utf-8")
    public Object getVideoData(Integer pid) {
        PVideos video = pVideosService.getVideoByPv(pid);
        List<PCategoryVo> voList = pCategoryService.selectAllLevel1Category();
        StringBuffer stringBuffer = new StringBuffer("");
        Long parentId = 0L;
        for (PCategoryVo p : voList) {
            if (video.getVideoType().equals(p.getId())) {
                parentId = p.getParentId();
                stringBuffer.append(p.getParentId() + "<--");
                stringBuffer.append(p.getCategoryName());
            }
        }
        for (PCategoryVo p : voList) {
            if (parentId.equals(p.getId())) {
                stringBuffer.replace(0, stringBuffer.indexOf("<"), p.getCategoryName());
            }
        }
        if (video != null) {
            video.setTypeName(stringBuffer.toString());
            return video;
        } else {
            return new PVideos();
        }

    }

    @PostMapping(value = "/video/change", produces = "application/json;charset=utf-8")
    @ResponseBody
    public Object insertVideo(PVideos pVideos, String videoReleasetimeSecond, String videoTimeSecond, HttpSession session) throws ParseException {

        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession == null) {
            return "error";
        }
        SimpleDateFormat ftb = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Long b = new Double(Double.parseDouble(videoTimeSecond)).longValue();
        Date date =DateUtil.dayAddAndSub(Calendar.HOUR,-8, DateUtil.toDate(DateUtil.secondToDate(b, "HH:mm:ss"),"HH:mm:ss")) ;

        Integer userId = userSession.getUserId();
        pVideos.setVideoUserid(userId);
        pVideos.setVideoTime(date);
        if (!videoReleasetimeSecond.equals("0")) {
            pVideos.setVideoReleasetime(ftb.parse(videoReleasetimeSecond));
        }
        if (pVideos.getVideoPv() != null) {
            int video = pVideosService.updateByPrimaryKeySelective(pVideos);
            if (video > 0) {
                PVideos rVideo = new PVideos();
                rVideo.setVideoPv(video);
                rVideo.setVideoTitle(pVideos.getVideoTitle());
                return rVideo;
            } else {
                return "error";
            }
        } else {
            int video = pVideosService.insertVideo(pVideos);
            if (video > 0) {
                PVideos rVideo = new PVideos();
                rVideo.setVideoPv(video);
                rVideo.setVideoTitle(pVideos.getVideoTitle());
                return rVideo;
            } else {
                return "error";
            }
        }
    }

    /**
     * @author zyy
     */
    @PostMapping("/video/videoUpload")
    @ResponseBody
    public ModelMap saveVideoAddress(MultipartFile videoFileAddress) throws IOException {
        ModelMap map = new ModelMap();
        String paFileName = videoFileAddress.getOriginalFilename();
        //构建文件上传所要保存的"文件夹路径"--这里是相对路径，保存到项目根路径的文件夹下
        String realPath = "controller/src/main/resources/" + UPLOAD_PATH_PREFIX;
        String localPath = ClassUtils.getDefaultClassLoader().getResource("").getPath() + UPLOAD_PATH_PREFIX;

        //存放上传文件的文件夹
        File file = new File(realPath);
        File file2 = new File(localPath);

        if (!file.isDirectory()) file.mkdirs();
        if (!file2.isDirectory()) file2.mkdirs();

        //获取原始的名字  original:最初的，起始的  方法是得到原来的文件名在客户机的文件系统名称
        String oldName = videoFileAddress.getOriginalFilename();
        String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."));
        System.out.println(newName);
        if (videoFileAddress != null && paFileName != null && paFileName.length() > 0) {
            File newFile = new File(file.getAbsolutePath() + File.separator + newName);
            File newFile2 = new File(file2.getAbsolutePath() + File.separator + newName);
            System.out.println("本地上传地址：" + newFile.getAbsolutePath() + "---服务器端上传地址：" + newFile2.getAbsolutePath());
            try {
                FileCopyUtils.copy(videoFileAddress.getBytes(), newFile2);
                videoFileAddress.transferTo(newFile);
            } catch (Exception e) {
                e.printStackTrace();
            }
            map.put("success", "成功啦");
            map.put("url", "/uploads/" + newName);
        } else {
            System.out.println("上传失败！");
        }
        return map;
    }

}
