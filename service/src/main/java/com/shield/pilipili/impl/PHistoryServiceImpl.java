package com.shield.pilipili.impl;

import com.shield.pilipili.PHistoryService;
import com.shield.pilipili.dao.PHistoryDao;
import com.shield.pilipili.pojo.PHistory;
import com.shield.pilipili.pojo.page.PHistoryPage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class PHistoryServiceImpl implements PHistoryService{
    @Resource
    private PHistoryDao pHistoryDao;

    @Override
    public List<PHistoryPage> selectHistoryByUid(PHistoryPage pHistoryPage) {
        return pHistoryDao.selectHistoryByUid(pHistoryPage);
    }

    @Override
    public int deleteByUserId(Integer userId) {
        return pHistoryDao.deleteByUserId(userId);
    }

    @Override
    public int deleteByPHistory(PHistory record) {
        return pHistoryDao.deleteByPHistory(record);
    }

    @Override
    public int insert(PHistory record) {
        return pHistoryDao.insert(record);
    }

    @Override
    public int updateByPHistory(PHistory record) {
        return pHistoryDao.updateByPHistory(record);
    }

    @Override
    public PHistory selectByPHistory(PHistory record) {
        return pHistoryDao.selectByPHistory(record);
    }
}