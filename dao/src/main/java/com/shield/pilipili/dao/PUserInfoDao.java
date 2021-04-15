package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PUserInfo;

public interface PUserInfoDao {

    int insertPuserInfo(PUserInfo pUserInfo);

    PUserInfo selectByUserId(Integer userid);

}