package com.shield.pilipili.impl;

import com.shield.pilipili.PHistoryService;
import com.shield.pilipili.dao.PHistoryDao;
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
}