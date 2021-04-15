package com.shield.pilipili.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * p_subscribe
 * @author 
 */
@Data
public class PSubscribe implements Serializable {
    /**
     * 主键ID
     */
    private Long id;

    /**
     * 关注人id（来源于pili_user用户表的用户id）
     */
    private Integer subscribeId;

    /**
     * 被关注人id（来源于pili_user用户表的用户id）
     */
    private Integer subscribedId;

    /**
     * 创建时间
     */
    private Date createTime;

    private Integer fansCount;

    private static final long serialVersionUID = 1L;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSubscribeId() {
        return subscribeId;
    }

    public void setSubscribeId(Integer subscribeId) {
        this.subscribeId = subscribeId;
    }

    public Integer getSubscribedId() {
        return subscribedId;
    }

    public void setSubscribedId(Integer subscribedId) {
        this.subscribedId = subscribedId;
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

    public Integer getFansCount() {
        return fansCount;
    }

    public void setFansCount(Integer fansCount) {
        this.fansCount = fansCount;
    }
}