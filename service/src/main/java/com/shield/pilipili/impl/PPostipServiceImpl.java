package com.shield.pilipili.impl;

import com.shield.pilipili.PPostipService;
import com.shield.pilipili.dao.PPostipDao;
import com.shield.pilipili.pojo.PPostip;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class PPostipServiceImpl implements PPostipService {
    @Resource
    private PPostipDao pPostipDao;
    @Override
    public int insertPostIp(PPostip pPostip) {
        return pPostipDao.insertPostIp(pPostip);
    }

    @Override
    public int selectPostCount(PPostip pPostip) {
        return pPostipDao.selectPostCount(pPostip);
    }
}
