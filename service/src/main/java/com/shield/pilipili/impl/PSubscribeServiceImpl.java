package com.shield.pilipili.impl;

import com.shield.pilipili.PSubscribeService;
import com.shield.pilipili.dao.PSubscribeDao;
import com.shield.pilipili.pojo.PSubscribe;
import com.shield.pilipili.pojo.PUserInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
@Service
public class PSubscribeServiceImpl implements PSubscribeService {
    @Resource
    private PSubscribeDao pSubscribeDao;

    @Override
    public List<PUserInfo> getFansById(int id) {
        return pSubscribeDao.getFansById(id);
    }

    @Override
    public List<PSubscribe> getFansByDate(Date beginDate, Date endDate, int userId) {
        return pSubscribeDao.getFansByDate(beginDate, endDate, userId);
    }
}