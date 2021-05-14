package com.shield.pilipili.impl;

import com.shield.pilipili.PCommentThumbsupService;
import com.shield.pilipili.dao.PCommentThumbsupDao;
import com.shield.pilipili.pojo.PCommentThumbsup;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
@Service
public class PCommentThumbsupServiceImpl implements PCommentThumbsupService {
    @Resource
    private PCommentThumbsupDao pCommentThumbsupDao;

    @Override
    public int insert(PCommentThumbsup record) {
        return pCommentThumbsupDao.insert(record);
    }

    @Override
    public int deleteByPCommentThumsup(PCommentThumbsup pCommentThumbsup) {
        return pCommentThumbsupDao.deleteByPCommentThumsup(pCommentThumbsup);
    }
}