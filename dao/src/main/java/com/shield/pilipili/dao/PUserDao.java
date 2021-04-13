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

    int deleteByPrimaryKey(Integer uid);

    int insert(PUser record);

    int insertSelective(PUser record);

    PUser selectByPrimaryKey(Integer uid);

    int updateByPrimaryKeySelective(PUser record);

    int updateByPrimaryKey(PUser record);
}