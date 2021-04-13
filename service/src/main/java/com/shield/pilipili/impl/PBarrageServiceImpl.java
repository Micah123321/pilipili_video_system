package com.shield.pilipili.impl;

import com.shield.pilipili.PBarrageService;
import com.shield.pilipili.dao.PBarrageDao;
import com.shield.pilipili.pojo.PBarrage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
public class PBarrageServiceImpl implements PBarrageService {

    @Resource
    private PBarrageDao pBarrageDao;
    @Override
    public int getBarrCountByUserId(int id) {
        return pBarrageDao.getBarrCountByUserId(id);
    }

    @Override
    public List<PBarrage> getBarrCountByDate(Date beginDate, Date endDate, int userId) {
        return pBarrageDao.getBarrCountByDate(beginDate, endDate, userId);
    }
}