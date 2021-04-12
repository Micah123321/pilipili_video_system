package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PHistory;

public interface PHistoryDao {
    int deleteByPrimaryKey(Long id);

    int insert(PHistory record);

    int insertSelective(PHistory record);

    PHistory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PHistory record);

    int updateByPrimaryKey(PHistory record);
}