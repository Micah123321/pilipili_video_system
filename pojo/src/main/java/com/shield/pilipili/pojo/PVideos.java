package com.shield.pilipili.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

/**
 * p_videos
 * @author 
 */
@Data
public class PVideos implements Serializable {
    /**
     * 视频pv号
     */
    private Integer videoPv;

    /**
     * 上传者id
     */
    private Integer videoUserid=0;

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
    private Date videoUpdatetime;

    /**
     * 视频审核人
     */
    private Integer videoCheckuid;

    /**
     * 视频审核时间
     */
    private Date videoChecktime;

    private Time videoTime;
    /**
     * 视频发布时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date videoReleasetime;

    /**
     * 视频分类（来源于p_category分类表的类型id）
     */
    private Long videoType;

    private Long videoParentType;

    private Integer videoComment;

    private Integer videoBarrage;

    private static final long serialVersionUID = 1L;

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
}