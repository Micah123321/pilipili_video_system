package com.shield.pilipili.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * p_collect_info
 * @author 
 */
@Data
public class PCollectInfo implements Serializable {
    /**
     * 主键ID
     */
    private Long id;

    /**
     * 对应收藏夹（来源于p_collect用户表的id）
     */
    private Long collectId;

    /**
     * 视频id（来源于p_video视频表的视频id）
     */
    private Integer videoId;

    /**
     * 添加时间
     */
    private Date addTime;

    private static final long serialVersionUID = 1L;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCollectId() {
        return collectId;
    }

    public void setCollectId(Long collectId) {
        this.collectId = collectId;
    }

    public Integer getVideoId() {
        return videoId;
    }

    public void setVideoId(Integer videoId) {
        this.videoId = videoId;
    }

    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
}