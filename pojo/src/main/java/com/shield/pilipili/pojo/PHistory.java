package com.shield.pilipili.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.shield.pilipili.DateUtil;
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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date viewTime;

    private String viewSecond;

    private String viewTimeString;

    public String getViewTimeString() {
        return viewTimeString;
    }

    public void setViewTimeString() {
        String str=DateUtil.format(getViewTime());
        this.viewTimeString = str;
    }

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
        setViewTimeString();
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

}