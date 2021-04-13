package com.shield.pilipili;

import com.shield.pilipili.pojo.PUser;

import java.util.List;

public interface PUserService {

    /**
     * 登录
     * @param
     * @param
     * @return
     */
    PUser login(String userName, String upwd);
}