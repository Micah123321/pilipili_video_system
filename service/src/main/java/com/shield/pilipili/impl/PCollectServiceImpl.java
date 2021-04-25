package com.shield.pilipili.impl;

import com.shield.pilipili.PCollectService;
import com.shield.pilipili.dao.PCollectDao;
import com.shield.pilipili.pojo.PCollect;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
public class PCollectServiceImpl implements PCollectService {

    @Resource
    private PCollectDao pCollectDao;

    @Override
    public List<PCollect> getPCollectList(Integer userId,String title) {
        return pCollectDao.getPCollectList(userId,title);
    }

    @Override
    public boolean addCollect(PCollect collect) {
        collect.setCreateTime(new Date());
        boolean flag = false;
        if (pCollectDao.addCollect(collect)>0){
            flag = true;
        }
        return flag;
    }
}