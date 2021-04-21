package com.shield.pilipili.impl;

import com.shield.pilipili.PVideosThumbsupService;
import com.shield.pilipili.dao.PVideosThumbsupDao;
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
}