package com.shield.pilipili;

import com.shield.pilipili.PSubscribe;

public interface PSubscribeDao {

    int deleteByPrimaryKey(Long id);

    int insert(PSubscribe record);

    int insertSelective(PSubscribe record);

    PSubscribe selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PSubscribe record);

    int updateByPrimaryKey(PSubscribe record);
}