package com.shield.pilipili;

import com.shield.pilipili.pojo.PUserInfo;

public interface PUserInfoService {
    int insertPuserInfo(PUserInfo pUserInfo);

    PUserInfo selectByUserId(Integer userid);

}