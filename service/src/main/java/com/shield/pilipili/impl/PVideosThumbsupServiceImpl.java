package com.shield.pilipili.impl;

import com.shield.pilipili.PVideosThumbsupService;
import com.shield.pilipili.dao.PVideosThumbsupDao;
import com.shield.pilipili.pojo.PVideosThumbsup;
import com.shield.pilipili.pojo.vo.PVideosThumbsupVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class PVideosThumbsupServiceImpl implements PVideosThumbsupService {
    @Resource
    private PVideosThumbsupDao pVideosThumbsupDao;

    @Override
    public int getAllLikeCountByUid(int uid) {
        return pVideosThumbsupDao.getAllLikeCountByUid(uid);
    }

    @Override
    public int insert(PVideosThumbsup record) {
        return pVideosThumbsupDao.insert(record);
    }

    @Override
    public int deleteByThumbsup(PVideosThumbsup pVideosThumbsup) {
        return pVideosThumbsupDao.deleteByThumbsup(pVideosThumbsup);
    }

    @Override
    public PVideosThumbsupVo selectThumbsupByThumbsup(PVideosThumbsup record) {
        return pVideosThumbsupDao.selectThumbsupByThumbsup(record);
    }
}