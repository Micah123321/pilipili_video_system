package com.shield.pilipili;

import com.shield.pilipili.pojo.PUser;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PUserService {

    /**
     * 登录
     * @param
     * @param
     * @return
     */
    PUser login(String userName, String upwd);


    /**
     * 用户注册
     * @param puser
     * @return
     */
    int insertUser(PUser puser);

    /**
     * 查询用户是否重复
     * @param userName
     * @return
     */
    PUser selePUser(String userName);


    /**
     * 根据userName得到id
     * @param userName
     * @return
     */
    PUser selectByUserName(String userName);
}