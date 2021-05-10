package com.shield.pilipili.impl;

import com.shield.pilipili.PSearchHotService;
import com.shield.pilipili.dao.PSearchHotDao;
import com.shield.pilipili.pojo.PSearchHot;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class PSearchHotServiceImpl implements PSearchHotService {
    @Resource
    private PSearchHotDao pSearchHotDao;

    @Override
    public int insert(PSearchHot record) {
        return pSearchHotDao.insert(record);
    }

    @Override
    public List<PSearchHot> selectHotKeyWordByDate() {
        return pSearchHotDao.selectHotKeyWordByDate();
    }
}
