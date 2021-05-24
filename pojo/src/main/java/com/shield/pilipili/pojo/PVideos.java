package com.shield.pilipili.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;
import java.util.List;

/**
 * p_videos
 * @author 
 */
@Data
public class PVideos implements Serializable {
    public PVideos(Long videoType) {
        this.videoType = videoType;
    }
    public PVideos(){

    }

    /**
     * 视频pv号
     */
    private Integer videoPv;

    /**
     * 上传者id
     */
    private Integer videoUserid=0;

    private String appealState;

    /**
     * 视频标题
     */
    private String videoTitle;

    /**
     * 视频播放路径
     */
    private String videoUrl;

    /**
     * 视频播放量
     */
    private Long videoPlay;

    private String videoPlayChar;

    /**
     * 视频点赞数量
     */
    private Integer videoLike;

    /**
     * 视频收藏数量
     */
    private Integer videoCollect;

    /**
     * 视频简介
     */
    private String videoDesc;

    /**
     * 视频状态 0-待审核 1-已审核 2-审核失败 3-违规
     */
    private Integer videoState;

    /**
     * 视频上传时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date videoUpdatetime;

    /**
     * 视频审核人
     */
    private Integer videoCheckuid;

    /**
     * 视频审核时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date videoChecktime;

    /**
     * 视频时长
     */
    @DateTimeFormat(pattern = "HH:mm:ss")
    @JsonFormat(pattern = "HH:mm:ss",timezone = "GMT+8")
    private Date videoTime;

    /**
     * 视频图片
     */
    private String videoImage;

    /**
     * 视频发布时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date videoReleasetime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date videoReleasetimeSecound;

    /**
     * 视频分类（来源于p_category分类表的类型id）
     */
    private Long videoType;

    private PCategory pCategory;

    private List<PCategory> categoryList;

    private PUser pUser;

    private Integer videoComment;

    private Integer videoBarrage;

    private Long videoParentType;

    private String typeName;

    private String videoUserName;


    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
    private static final long serialVersionUID = 1L;

    public Integer getVideoComment() {
        return videoComment;
    }

    public void setVideoComment(Integer videoComment) {
        this.videoComment = videoComment;
    }

    public Integer getVideoBarrage() {
        return videoBarrage;
    }

    public void setVideoBarrage(Integer videoBarrage) {
        this.videoBarrage = videoBarrage;
    }

    public PUser getpUser() {
        return pUser;
    }

    public void setpUser(PUser pUser) {
        this.pUser = pUser;
    }

    public PCategory getpCategory() {
        return pCategory;
    }

    public void setpCategory(PCategory pCategory) {
        this.pCategory = pCategory;
    }

    public String getVideoImage() {
        return videoImage;
    }

    public void setVideoImage(String videoImage) {
        this.videoImage = videoImage;
    }

    public List<PCategory> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(List<PCategory> categoryList) {
        this.categoryList = categoryList;
    }

    public Date getVideoTime() {
        return videoTime;
    }

    public void setVideoTime(Date videoTime) {
        this.videoTime = videoTime;
    }

    public Integer getVideoPv() {
        return videoPv;
    }

    public void setVideoPv(Integer videoPv) {
        this.videoPv = videoPv;
    }

    public Integer getVideoUserid() {
        return videoUserid;
    }

    public void setVideoUserid(Integer videoUserid) {
        this.videoUserid = videoUserid;
    }

    public String getVideoTitle() {
        return videoTitle;
    }

    public void setVideoTitle(String videoTitle) {
        this.videoTitle = videoTitle;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public Long getVideoPlay() {

        return videoPlay;
    }

    public void setVideoPlay(Long videoPlay) {
        if (videoPlay>=10000){
            double result = videoPlay*1.0/10000;
            setVideoPlayChar(String.format("%.1f",result-0.05)+"万");
        }else{
            setVideoPlayChar(String.valueOf(videoPlay.intValue()));
        }
        this.videoPlay = videoPlay;
    }

    public Integer getVideoLike() {
        return videoLike;
    }

    public void setVideoLike(Integer videoLike) {
        this.videoLike = videoLike;
    }

    public Integer getVideoCollect() {
        return videoCollect;
    }

    public void setVideoCollect(Integer videoCollect) {
        this.videoCollect = videoCollect;
    }

    public String getVideoDesc() {
        return videoDesc;
    }

    public void setVideoDesc(String videoDesc) {
        this.videoDesc = videoDesc;
    }

    public Integer getVideoState() {
        return videoState;
    }

    public void setVideoState(Integer videoState) {
        this.videoState = videoState;
    }

    public Date getVideoUpdatetime() {
        return videoUpdatetime;
    }

    public void setVideoUpdatetime(Date videoUpdatetime) {
        this.videoUpdatetime = videoUpdatetime;
    }

    public Integer getVideoCheckuid() {
        return videoCheckuid;
    }

    public void setVideoCheckuid(Integer videoCheckuid) {
        this.videoCheckuid = videoCheckuid;
    }

    public Date getVideoChecktime() {
        return videoChecktime;
    }

    public void setVideoChecktime(Date videoChecktime) {
        this.videoChecktime = videoChecktime;
    }

    public Date getVideoReleasetime() {
        return videoReleasetime;
    }

    public void setVideoReleasetime(Date videoReleasetime) {
        setVideoReleasetimeSecound(videoReleasetime);
        this.videoReleasetime = videoReleasetime;
    }

    public Long getVideoType() {
        return videoType;
    }

    public void setVideoType(Long videoType) {
        this.videoType = videoType;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Date getVideoReleasetimeSecound() {
        return videoReleasetimeSecound;
    }

    public void setVideoReleasetimeSecound(Date videoReleasetimeSecound) {
        this.videoReleasetimeSecound = videoReleasetimeSecound;
    }

    public Long getVideoParentType() {
        return videoParentType;
    }

    public void setVideoParentType(Long videoParentType) {
        this.videoParentType = videoParentType;
    }

    public String getVideoPlayChar() {
        return videoPlayChar;
    }

    public void setVideoPlayChar(String videoPlayChar) {
        this.videoPlayChar = videoPlayChar;
    }

    public String getVideoUserName() {
        return videoUserName;
    }

    public void setVideoUserName(String videoUserName) {
        this.videoUserName = videoUserName;
    }
}