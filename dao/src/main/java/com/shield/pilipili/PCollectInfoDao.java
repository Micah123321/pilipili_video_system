package com.shield.pilipili;

import com.shield.pilipili.PCollectInfo;

public interface PCollectInfoDao {
    int deleteByPrimaryKey(Long id);

    int insert(PCollectInfo record);

    int insertSelective(PCollectInfo record);

    PCollectInfo selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PCollectInfo record);

    int updateByPrimaryKey(PCollectInfo record);
}