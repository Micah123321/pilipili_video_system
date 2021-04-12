package com.shield.pilipili.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * p_comment_thumbsup
 * @author 
 */
@Data
public class PCommentThumbsup implements Serializable {
    /**
     * 主键ID
     */
    private Integer id;

    /**
     * 点赞人（来源于pili_user用户表的用户id）
     */
    private Integer userId;

    /**
     * 评论id（来源于p_comment评论表的id）
     */
    private Long commentId;

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

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
}