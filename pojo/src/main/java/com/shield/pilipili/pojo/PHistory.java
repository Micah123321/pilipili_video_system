package com.shield.pilipili.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * p_history
 * @author 
 */
@Data
public class PHistory implements Serializable {
    /**
     * 主键ID
     */
    private Long id;

    /**
     * 视频（来源于p_video视频表的视频id）
     */
    private Integer videoId;

    /**
     * 观看者（来源于pili_user用户表的用户id）
     */
    private Integer userId;

    /**
     * 观看时间
     */
    private Date viewTime;

    private static final long serialVersionUID = 1L;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVideoId() {
        return videoId;
    }

    public void setVideoId(Integer videoId) {
        this.videoId = videoId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Date getViewTime() {
        return viewTime;
    }

    public void setViewTime(Date viewTime) {
        this.viewTime = viewTime;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
}