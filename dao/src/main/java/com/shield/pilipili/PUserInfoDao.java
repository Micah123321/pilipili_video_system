package com.shield.pilipili;

import com.shield.pilipili.PUserInfo;

public interface PUserInfoDao {
    int deleteByPrimaryKey(Integer id);

    int insert(PUserInfo record);

    int insertSelective(PUserInfo record);

    PUserInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PUserInfo record);

    int updateByPrimaryKey(PUserInfo record);
}