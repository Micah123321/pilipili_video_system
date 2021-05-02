package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PUser;
import org.apache.ibatis.annotations.Param;

public interface PUserDao {

    /**
     * 登录
     * @param
     * @param
     * @return
     */
    PUser login(@Param("userName") String userName, @Param("upwd") String upwd);


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


    int deleteByPrimaryKey(Integer uid);

    int insert(PUser record);

    int insertSelective(PUser record);



    int updateByPrimaryKeySelective(PUser record);

    int updateByPrimaryKey(PUser record);
}