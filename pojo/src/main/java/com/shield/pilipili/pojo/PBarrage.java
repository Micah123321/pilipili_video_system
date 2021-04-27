package com.shield.pilipili.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * p_barrage
 * @author 
 */
@Data
public class PBarrage implements Serializable {
    /**
     * 主键ID
     */
    private Long id;

    /**
     * 发表人（来源于pili_user用户表的用户id）
     */
    private Integer userId;

    /**
     * 视频id（来源于p_video视频表的视频id）
     */
    private Integer videoId;

    /**
     * 弹幕内容
     */
    private String content;


    private Integer videoTimeSecond;
    private Date videoTime;

    private String updateSecond;

    /**
     * 添加时间
     */
    @DateTimeFormat(pattern = "HH:mm:ss")
    @JsonFormat(pattern = "HH:mm:ss")
    private Date createTime;

    private Integer barrCount;

    private String color;

    private String size;

    private String postId;

    private String type;

    private static final long serialVersionUID = 1L;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getVideoId() {
        return videoId;
    }

    public void setVideoId(Integer videoId) {
        this.videoId = videoId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getBarrCount() {
        return barrCount;
    }

    public void setBarrCount(Integer barrCount) {
        this.barrCount = barrCount;
    }
}