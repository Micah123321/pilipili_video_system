package com.shield.pilipili.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shield.pilipili.OrderUtil;
import com.shield.pilipili.PCollectInfoService;
import com.shield.pilipili.dao.PCollectInfoDao;
import com.shield.pilipili.pojo.PCollect;
import com.shield.pilipili.pojo.PCollectInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
public class PCollectInfoServiceImpl implements PCollectInfoService {

    @Resource
    private PCollectInfoDao pCollectInfoDao;

    @Override
    public PageInfo<PCollectInfo> getCollectInfoAll(Integer userId, String title, OrderUtil order,Integer categoryId,String keyword, Integer currPage, Integer pageSize) {
        PageHelper.startPage(currPage,pageSize);
        List<PCollectInfo> collectList = pCollectInfoDao.getCollectInfoAll(userId,title,order,categoryId,keyword);
        PageInfo<PCollectInfo> pageInfo = new PageInfo<>(collectList);
        return pageInfo;
    }

    @Override
    public  List<PCollectInfo> getCollectCategory(Integer userId,String title) {
        return pCollectInfoDao.getCollectCategory(userId,title);
    }

    @Override
    public boolean delCollectInfo(Integer id) {
        boolean flag = false;
        if (pCollectInfoDao.delCollectInfo(id)>=0){
            flag = true;
        }
        return flag;
    }

    @Override
    public boolean delCollectInfoByVideoPv(Integer videoPv,Integer collectId) {
        boolean flag = false;
        if (pCollectInfoDao.delCollectInfoByVideoPv(videoPv,collectId)>0){
            flag = true;
        }
        return flag;
    }

    @Override
    public boolean insertCollectByVideoPv(PCollectInfo pCollectInfo) {
        pCollectInfo.setAddTime(new Date());
        boolean flag = false;
        if (pCollectInfoDao.insertCollectByVideoPv(pCollectInfo)>0){
            flag = true;
        }
        return flag;
    }

    @Override
    public boolean getRepetition(Integer videoPv, Long collectId) {
        boolean flag = false;
        if (pCollectInfoDao.getRepetition(videoPv,collectId)==0){
            flag = true;
        }
        return flag;
    }
}