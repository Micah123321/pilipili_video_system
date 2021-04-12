package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PCategory;

public interface PCategoryDao {
    int deleteByPrimaryKey(Long id);

    int insert(PCategory record);

    int insertSelective(PCategory record);

    PCategory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PCategory record);

    int updateByPrimaryKey(PCategory record);
}