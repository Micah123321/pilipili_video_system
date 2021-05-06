package com.shield.pilipili.impl;

import com.shield.pilipili.PSubscribeService;
import com.shield.pilipili.dao.PSubscribeDao;
import com.shield.pilipili.pojo.PSubscribe;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.page.PUserInfoPage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
@Service
public class PSubscribeServiceImpl implements PSubscribeService {
    @Resource
    private PSubscribeDao pSubscribeDao;

    @Override
    public List<PUserInfoPage> getLiveFansById(PUserInfoPage userInfoPage) {
        return pSubscribeDao.getLiveFansById(userInfoPage);
    }

    @Override
    public List<PUserInfoPage> getFansById(PUserInfoPage userInfoPage) {
        return pSubscribeDao.getFansById(userInfoPage);
    }

    @Override
    public List<PSubscribe> getFansByDate(Date beginDate, Date endDate, int userId) {
        return pSubscribeDao.getFansByDate(beginDate, endDate, userId);
    }

    @Override
    public List<PUserInfoPage> getSubById(PUserInfoPage userInfoPage) {
        return pSubscribeDao.getSubById(userInfoPage);
    }

    @Override
    public int deleteById(PSubscribe subscribe) {
        return pSubscribeDao.deleteById(subscribe);
    }

    @Override
    public int insert(PSubscribe record) {
        return pSubscribeDao.insert(record);
    }

    @Override
    public int updateById(PSubscribe subscribe) {
        return pSubscribeDao.updateById(subscribe);
    }

    @Override
    public int checkSub(PSubscribe subscribe) {
        return pSubscribeDao.checkSub(subscribe);
    }
}