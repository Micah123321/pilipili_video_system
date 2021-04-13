package com.shield.pilipili.impl;

import com.shield.pilipili.PUserService;
import com.shield.pilipili.dao.PUserDao;
import com.shield.pilipili.pojo.PUser;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
public class PUserServiceImpl implements PUserService {

    @Resource
    private PUserDao pUserDao;
    @Override
    public PUser login(String userName, String upwd) {
        return pUserDao.login(userName,upwd);
    }
}