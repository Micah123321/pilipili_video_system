package com.shield.pilipili.user;

import com.shield.pilipili.DateUtil;
import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
public class UploadController {

    @Resource
    private PCategoryService pCategoryService;

    @Resource
    private PVideosService pVideosService;

    public final static String UPLOAD_PATH_PREFIX = "static/uploads/";

    @ResponseBody
    @GetMapping(value = "/typeinfo",produces = "application/json;charset=utf-8")
    public Object getTypeInfo(){
        List<PCategoryVo> voList = pCategoryService.selectAllLevel1Category();
        return voList;
    }


    @ResponseBody
    @GetMapping(value = "/video/del",produces = "application/json;charset=utf-8")
    public Object delVideo(Integer pid){
        if (pVideosService.deleteByPrimaryKey(pid)>0){
            return "ok";
        }
        return "error";
    }
    @ResponseBody
    @GetMapping(value = "/video/videodata",produces = "application/json;charset=utf-8")
    public Object getVideoData(Integer pid){
        PVideos video = pVideosService.getVideoByPv(pid);
        List<PCategoryVo> voList = pCategoryService.selectAllLevel1Category();
        StringBuffer stringBuffer = new StringBuffer("");
        Long parentId=0L;
        for (PCategoryVo p:voList) {
            if (video.getVideoType().equals(p.getId())){
                parentId=p.getParentId();
                stringBuffer.append(p.getParentId()+"<--");
                stringBuffer.append(p.getCategoryName());
            }
        }
        for (PCategoryVo p:voList) {
            if (parentId.equals(p.getId())){
                stringBuffer.replace(0,stringBuffer.indexOf("<"),p.getCategoryName());
            }
        }
        if (video!=null){
            video.setTypeName(stringBuffer.toString());
            return video;
        }else{
            return new PVideos();
        }

    }

    @PostMapping(value = "/video/change",produces = "application/json;charset=utf-8")
    @ResponseBody
    public Object insertVideo(PVideos pVideos,String videoReleasetimeSecond,String videoTimeSecond, HttpSession session) throws ParseException {
        PUserInfo userSession = (PUserInfo) session.getAttribute("userSession");
        if (userSession==null){
            return "error";
        }
        SimpleDateFormat ft = new SimpleDateFormat("hh:mm:ss");
        SimpleDateFormat ftb = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Long b = new Double(Double.parseDouble(videoTimeSecond)).longValue();
        Date date = ft.parse(DateUtil.secondToDate(b,"hh:mm:ss"));

        Integer userId = userSession.getUserId();
        pVideos.setVideoUserid(userId);
        pVideos.setVideoTime(date);
        if (!videoReleasetimeSecond.equals("0")){
            pVideos.setVideoReleasetime(ftb.parse(videoReleasetimeSecond));
        }
        if (pVideos.getVideoPv()!=null){
            int video =pVideosService.updateByPrimaryKeySelective(pVideos);
            if (video>0){
                PVideos rVideo=new PVideos();
                rVideo.setVideoPv(video);
                rVideo.setVideoTitle(pVideos.getVideoTitle());
                return rVideo;
            }else{
                return "error";
            }
        }else{
            int video = pVideosService.insertVideo(pVideos);
            if (video>0){
                PVideos rVideo=new PVideos();
                rVideo.setVideoPv(video);
                rVideo.setVideoTitle(pVideos.getVideoTitle());
                return rVideo;
            }else{
                return "error";
            }
        }
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
            try {
                videoFileAddress.transferTo(newFile);
            } catch (Exception e) {
                e.printStackTrace();
            }
            map.put("success", "成功啦");
            map.put("url", "/uploads/"+newName);
        } else {
            System.out.println("上传失败！");
        }
        return map;
    }

}
