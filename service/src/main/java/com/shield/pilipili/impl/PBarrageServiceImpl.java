package com.shield.pilipili.impl;

import com.shield.pilipili.PBarrageService;
import com.shield.pilipili.dao.PBarrageDao;
import com.shield.pilipili.pojo.PBarrage;
import com.shield.pilipili.pojo.page.PBarragePage;
import com.shield.pilipili.pojo.vo.PBarrageVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
public class PBarrageServiceImpl implements PBarrageService {

    @Resource
    private PBarrageDao pBarrageDao;

    @Override
    public List<PBarragePage> getBarrByUserId(PBarragePage pBarragePage) {
        return pBarrageDao.getBarrByUserId(pBarragePage);
    }

    @Override
    public int getBarrCountByUserId(int id) {
        return pBarrageDao.getBarrCountByUserId(id);
    }

    @Override
    public int deleteByPBarrage(PBarrageVo pBarrage) {
        return pBarrageDao.deleteByPBarrage(pBarrage);
    }

    @Override
    public List<PBarrage> getBarrCountByDate(Date beginDate, Date endDate, int userId) {
        return pBarrageDao.getBarrCountByDate(beginDate, endDate, userId);
    }

    @Override
    public List<PBarrage> getBarrByPv(int pv) {
        return pBarrageDao.getBarrByPv(pv);
    }

    @Override
    public int insert(PBarrage record) {
        return pBarrageDao.insert(record);
    }
}