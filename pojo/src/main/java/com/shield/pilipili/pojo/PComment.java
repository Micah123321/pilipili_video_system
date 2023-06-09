package com.shield.pilipili.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * p_comment
 * @author 
 */
@Data
public class PComment implements Serializable {
    /**
     * 主键ID
     */
    private Long id;

    /**
     * 视频id（来源于p_video视频表的视频id）
     */
    private Integer videoId;

    /**
     * 评论人id（来源于pili_user用户表的用户id）
     */
    private Integer userId;

    /**
     * 父评论id，默认为0
     */
    private Long parentId;

    /**
     * 点赞量，默认为0
     */
    private Integer thumbsUpNum;

    /**
     * 评论内容
     */
    private String content;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    /**
     * 评论等级
     */
    private Integer level;
    /**
     * 回复id
     */
    private Integer replyId;
    /**
     * 分组id
     */
    private Integer groupBy;

    private Integer commentCount;

    private Integer[] commentArr;

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

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Integer getThumbsUpNum() {
        return thumbsUpNum;
    }

    public void setThumbsUpNum(Integer thumbsUpNum) {
        this.thumbsUpNum = thumbsUpNum;
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

    public Integer getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }
}