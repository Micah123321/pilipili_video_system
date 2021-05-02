package com.shield.pilipili.impl;

import com.shield.pilipili.PUserInfoService;
import com.shield.pilipili.dao.PUserInfoDao;
import com.shield.pilipili.pojo.PUserInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class PUserInfoServiceImpl implements PUserInfoService {
    @Resource
    private PUserInfoDao pUserInfoDao;


    @Override
    public int insertPuserInfo(PUserInfo pUserInfo) {
        return pUserInfoDao.insertPuserInfo(pUserInfo);
    }

    @Override
    public PUserInfo selectByUserId(Integer userid) {
        return pUserInfoDao.selectByUserId(userid);
    }

    @Override
    public int updateUserInfo(PUserInfo pUserInfo) {
        return pUserInfoDao.updateUserInfo(pUserInfo);
    }

    @Override
    public int updateFansData(Integer userId) {
        return pUserInfoDao.updateFansData(userId);
    }
}
