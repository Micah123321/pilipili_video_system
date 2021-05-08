package com.shield.pilipili.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

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

    /**
     * 用户名称
     */
    private String nickName;

    private Integer upPlay;
    private Integer upLike;
    /**
     * 用户公告
     */
    private String upSpaceNotice;
    /**
     * 创建时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    /**
     * 用户生日
     */
    @DateTimeFormat(pattern = "MM-dd")
    @JsonFormat(pattern = "MM-dd")
    private Date birthday;

    /**
     * 登录日期
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date loginDate;

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getUpSpaceNotice() {
        return upSpaceNotice;
    }

    public void setUpSpaceNotice(String upSpaceNotice) {
        this.upSpaceNotice = upSpaceNotice;
    }

    public Integer getUpLike() {
        return upLike;
    }

    public void setUpLike(Integer upLike) {
        this.upLike = upLike;
    }

    public PUserInfo(Integer userId, String nickName) {
        this.userId = userId;
        this.nickName = nickName;
    }

    public PUserInfo() {
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }


    private static final long serialVersionUID = 1L;

    public Integer getUpPlay() {
        return upPlay;
    }

    public void setUpPlay(Integer upPlay) {
        this.upPlay = upPlay;
    }

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