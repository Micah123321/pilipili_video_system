package com.shield.pilipili.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

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

    private String intro;

    /**
     * 创建时间
     */
    private Date createTime;

    private PUser pUser;

    private PCollectInfo pCollectInfo;

    private List<PVideos> pVideosList;

    private Integer videoCount;

    private static final long serialVersionUID = 1L;

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public List<PVideos> getpVideosList() {
        return pVideosList;
    }

    public void setpVideosList(List<PVideos> pVideosList) {
        this.pVideosList = pVideosList;
    }

    public PCollectInfo getpCollectInfo() {
        return pCollectInfo;
    }

    public void setpCollectInfo(PCollectInfo pCollectInfo) {
        this.pCollectInfo = pCollectInfo;
    }

    public Integer getVideoCount() {
        return videoCount;
    }

    public void setVideoCount(Integer videoCount) {
        this.videoCount = videoCount;
    }

    public PUser getpUser() {
        return pUser;
    }

    public void setpUser(PUser pUser) {
        this.pUser = pUser;
    }

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