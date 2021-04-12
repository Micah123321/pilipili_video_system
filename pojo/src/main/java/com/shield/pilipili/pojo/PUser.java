package com.shield.pilipili.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * p_user
 * @author 
 */
@Data
public class PUser implements Serializable {
    /**
     * 主键id
     */
    private Integer uid;

    /**
     * 用户名
     */
    private String userName;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 密码
     */
    private String upwd;

    /**
     * 用户类型 1-用户 2-up主 3-管理员
     */
    private Integer utype;

    private static final long serialVersionUID = 1L;

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUpwd() {
        return upwd;
    }

    public void setUpwd(String upwd) {
        this.upwd = upwd;
    }

    public Integer getUtype() {
        return utype;
    }

    public void setUtype(Integer utype) {
        this.utype = utype;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
}