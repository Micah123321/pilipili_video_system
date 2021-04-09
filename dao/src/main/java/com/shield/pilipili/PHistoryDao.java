package com.shield.pilipili;

import com.shield.pilipili.PHistory;

public interface PHistoryDao {
    int deleteByPrimaryKey(Long id);

    int insert(PHistory record);

    int insertSelective(PHistory record);

    PHistory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PHistory record);

    int updateByPrimaryKey(PHistory record);
}