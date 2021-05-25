package com.shield.pilipili.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.io.Serializable;
@Data
/**
 * 申诉回复表(PAppealsReply)实体类
 *
 * @author makejava
 * @since 2021-05-25 00:11:05
 */
public class PAppealsReply implements Serializable {
    private static final long serialVersionUID = -96242181552274177L;
    
    private Integer id;
    /**
    * 发表人（来源于pili_user用户表的用户id）
    */
    private Integer userId;

    private PUserInfo pUserInfo;
    /**
    * 申诉id（来源于p_appeals视频表的申诉id）
    */
    private Integer appealsid;
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
    * 素材资源
    */
    private String sourceMaterial;

    private Integer isU;

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

    public Integer getAppealsid() {
        return appealsid;
    }

    public void setAppealsid(Integer appealsid) {
        this.appealsid = appealsid;
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

    public String getSourceMaterial() {
        return sourceMaterial;
    }

    public void setSourceMaterial(String sourceMaterial) {
        this.sourceMaterial = sourceMaterial;
    }

}