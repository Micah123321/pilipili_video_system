package com.shield.pilipili;

import lombok.Data;

import java.io.Serializable;

/**
 * p_user_info
 * @author 
 */
@Data
public class PUserInfo implements Serializable {
    /**
     * 主键id
     */
    private Integer id;

    /**
     * 外键，绑定user表的uid
     */
    private Integer userId;

    /**
     * 关注数
     */
    private Integer subscribeNum;

    /**
     * 粉丝数
     */
    private Integer fansNum;

    /**
     * 用户等级
     */
    private Integer level;

    /**
     * 用户经验
     */
    private Integer experience;

    /**
     * 用户头像地址
     */
    private String userPic;

    /**
     * 用户简介
     */
    private String upDesc;

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

    public Integer getSubscribeNum() {
        return subscribeNum;
    }

    public void setSubscribeNum(Integer subscribeNum) {
        this.subscribeNum = subscribeNum;
    }

    public Integer getFansNum() {
        return fansNum;
    }

    public void setFansNum(Integer fansNum) {
        this.fansNum = fansNum;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public String getUserPic() {
        return userPic;
    }

    public void setUserPic(String userPic) {
        this.userPic = userPic;
    }

    public String getUpDesc() {
        return upDesc;
    }

    public void setUpDesc(String upDesc) {
        this.upDesc = upDesc;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
}