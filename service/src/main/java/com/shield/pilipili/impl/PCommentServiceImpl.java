package com.shield.pilipili.impl;

import com.shield.pilipili.PCommentService;
import com.shield.pilipili.dao.PCommentDao;
import com.shield.pilipili.pojo.PComment;
import com.shield.pilipili.pojo.page.PCommentPage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
public class PCommentServiceImpl implements PCommentService {
    @Resource
    private PCommentDao pCommentDao;

    @Override
    public int getComCountByUserId(int userId) {
        return pCommentDao.getComCountByUserId(userId);
    }

    @Override
    public List<PComment> getCommentCountByDate(Date beginDate, Date endDate, int userId) {
        return pCommentDao.getCommentCountByDate(beginDate, endDate, userId);
    }

    @Override
    public List<PCommentPage> getCommentByPCommentPage(PCommentPage pCommentPage) {
        return pCommentDao.getCommentByPCommentPage(pCommentPage);
    }

    @Override
    public int deleteByPComment(PComment pComment) {
        return pCommentDao.deleteByPComment(pComment);
    }

    @Override
    public int updateThumb(Long comId) {
        return pCommentDao.updateThumb(comId);
    }

    @Override
    public PComment selectByPrimaryKey(Long id) {
        return pCommentDao.selectByPrimaryKey(id);
    }

    @Override
    public int insert(PComment record) {
        return pCommentDao.insert(record);
    }
}