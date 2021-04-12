package com.shield.pilipili.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * p_videos_thumbsup
 * @author 
 */
@Data
public class PVideosThumbsup implements Serializable {
    /**
     * 主键ID
     */
    private Integer id;

    /**
     * 点赞人（来源于pili_user用户表的用户id）
     */
    private Integer userId;

    /**
     * 视频id（来源于p_video视频表的视频id）
     */
    private Integer videoId;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
}