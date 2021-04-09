package com.shield.pilipili;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * p_collect
 * @author 
 */
@Data
public class PCollect implements Serializable {
    /**
     * 主键ID
     */
    private Long id;

    /**
     * 拥有者（来源于pili_user用户表的用户id）
     */
    private Integer userId;

    /**
     * 收藏夹标题
     */
    private String title;

    /**
     * 创建时间
     */
    private Date createTime;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
}