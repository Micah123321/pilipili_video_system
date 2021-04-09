package com.shield.pilipili;

import com.shield.pilipili.PUser;

public interface PUserDao {
    int deleteByPrimaryKey(Integer uid);

    int insert(PUser record);

    int insertSelective(PUser record);

    PUser selectByPrimaryKey(Integer uid);

    int updateByPrimaryKeySelective(PUser record);

    int updateByPrimaryKey(PUser record);
}