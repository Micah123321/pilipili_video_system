package com.shield.pilipili.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shield.pilipili.OrderUtil;
import com.shield.pilipili.PVideosService;
import com.shield.pilipili.dao.PVideosDao;
import com.shield.pilipili.pojo.PCollectInfo;
import com.shield.pilipili.pojo.PSubscribe;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.PVideosThumbsup;
import com.shield.pilipili.pojo.page.PVideosPage;
import org.springframework.stereotype.Service;
import com.shield.pilipili.dao.PVideosDao;
import com.shield.pilipili.pojo.PVideos;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;


@Service
public class PVideosServiceImpl implements PVideosService {
    @Resource
    private PVideosDao pVideosDao;

    @Override
    public int getPlayCountById(int id) {
        return pVideosDao.getPlayCountById(id);
    }

    @Override
    public int getLikeCountById(int id) {
        return pVideosDao.getLikeCountById(id);
    }

    @Override
    public int getCollectCountById(int id) {
        return pVideosDao.getCollectCountById(id);
    }

    @Override
    public List<PCollectInfo> getCollectByDate(Date beginDate, Date endDate, int userId) {
        return pVideosDao.getCollectByDate(beginDate, endDate, userId);
    }

    @Override
    public List<PVideosThumbsup> getLikeByDate(Date beginDate, Date endDate, int userId) {
        return pVideosDao.getLikeByDate(beginDate, endDate, userId);
    }

    @Override
    public List<PVideosPage> getVideosListByType(PVideosPage pVideosPage) {
        return pVideosDao.getVideosListByType(pVideosPage);
    }

    @Override
    public List<PVideos> selectVideosListByUp(PVideosPage pVideosPage) {
        return pVideosDao.selectVideosListByUp(pVideosPage);
    }

    @Override
    public List<PVideos> getPVideosPageList(String videoTitle, String videoTime,String videoTimeEnd,Integer type, Integer categoryId, Integer pid,OrderUtil order) {
        List<PVideos> pVideosPageList = pVideosDao.getPVideosPageList(videoTitle, videoTime,videoTimeEnd ,type,categoryId,pid, order);
        return pVideosPageList;
    }
}