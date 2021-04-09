package com.shield.pilipili;

import com.shield.pilipili.PBarrage;

public interface PBarrageDao {
    int deleteByPrimaryKey(Long id);

    int insert(PBarrage record);

    int insertSelective(PBarrage record);

    PBarrage selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PBarrage record);

    int updateByPrimaryKey(PBarrage record);
}