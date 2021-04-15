package com.shield.pilipili.impl;

import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.dao.PCategoryDao;
import com.shield.pilipili.pojo.vo.PCategoryVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class PCategoryServiceImpl implements PCategoryService {
    @Resource
    private PCategoryDao pCategoryDao;

    @Override
    public List<PCategoryVo> selectAllLevel1Category() {
        List<PCategoryVo> pCategories = pCategoryDao.selectAllCategory();
        return pCategories;
    }
}