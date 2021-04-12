package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PCollect;

public interface PCollectDao {
    int deleteByPrimaryKey(Long id);

    int insert(PCollect record);

    int insertSelective(PCollect record);

    PCollect selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PCollect record);

    int updateByPrimaryKey(PCollect record);
}