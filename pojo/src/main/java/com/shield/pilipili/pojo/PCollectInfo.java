package com.shield.pilipili.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

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
    @DateTimeFormat(pattern = "MM-dd")
    @JsonFormat(pattern = "MM-dd")
    private Date addTime;

    private Integer collectCount;

    private PCollect pCollect;

    private PUser pUser;

    private List<PCategory> pCategoryList;

    private PCategory pCategory;

    private List<PVideos> pVideosList;



    private Integer totalCount;

    private String categoryName;

    private Integer categoryCount;

    private static final long serialVersionUID = 1L;

    public PCategory getpCategory() {
        return pCategory;
    }

    public void setpCategory(PCategory pCategory) {
        this.pCategory = pCategory;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }

    public Integer getCategoryCount() {
        return categoryCount;
    }

    public void setCategoryCount(Integer categoryCount) {
        this.categoryCount = categoryCount;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<PCategory> getpCategoryList() {
        return pCategoryList;
    }

    public void setpCategoryList(List<PCategory> pCategoryList) {
        this.pCategoryList = pCategoryList;
    }

    public List<PVideos> getpVideosList() {
        return pVideosList;
    }

    public void setpVideosList(List<PVideos> pVideosList) {
        this.pVideosList = pVideosList;
    }

    public PCollect getpCollect() {
        return pCollect;
    }

    public void setpCollect(PCollect pCollect) {
        this.pCollect = pCollect;
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

    public Integer getCollectCount() {
        return collectCount;
    }

    public void setCollectCount(Integer collectCount) {
        this.collectCount = collectCount;
    }
}