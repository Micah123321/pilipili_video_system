package com.shield.pilipili.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.shield.pilipili.DateUtil;

import java.util.Date;
import java.io.Serializable;

/**
 * 申诉表(PAppeals)实体类
 *
 * @author makejava
 * @since 2021-05-24 11:04:14
 */
public class PAppeals implements Serializable {
    private static final long serialVersionUID = 281784521896299217L;
    
    private Integer id;
    /**
    * 发表人（来源于pili_user用户表的用户id）
    */
    private Integer userId;
    /**
    * 视频id（来源于p_video视频表的视频id）
    */
    private Integer videoId;
    /**
    * 创建时间
    */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createtime;
    /**
    * 申诉内容
    */
    private String content;
    /**
    * 电话
    */
    private String phone;
    /**
    * 邮箱
    */
    private String email;
    /**
    * 素材资源
    */
    private String sourceMaterial;
    /**
    * 审核人（来源于pili_user用户表的用户id）
    */
    private Integer checkUid;
    /**
    * 状态
    */
    private Integer state;
    /**
    * 处理时间时间
    */
    private Date edittime;

    private String stateString;

    public String getStateString() {
        return stateString;
    }

    public void setStateString() {
        StringBuffer stringBuffer=new StringBuffer();
        if (getState()==0){
            stringBuffer.append("处理中"+ DateUtil.pAppeal(getCreatetime()));
        }else{
            stringBuffer.append("申诉完成");
        }
        this.stateString = stringBuffer.toString();
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

    public Integer getVideoId() {
        return videoId;
    }

    public void setVideoId(Integer videoId) {
        this.videoId = videoId;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;

    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSourceMaterial() {
        return sourceMaterial;
    }

    public void setSourceMaterial(String sourceMaterial) {
        this.sourceMaterial = sourceMaterial;
    }

    public Integer getCheckUid() {
        return checkUid;
    }

    public void setCheckUid(Integer checkUid) {
        this.checkUid = checkUid;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
        setStateString();
    }

    public Date getEdittime() {
        return edittime;
    }

    public void setEdittime(Date edittime) {
        this.edittime = edittime;
    }

}