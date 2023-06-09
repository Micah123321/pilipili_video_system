package com.shield.pilipili.impl;

import com.shield.pilipili.PCategoryService;
import com.shield.pilipili.dao.PCategoryDao;
import com.shield.pilipili.pojo.PCategory;
import com.shield.pilipili.pojo.vo.CategoryChartsVo;
import org.springframework.stereotype.Service;
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
    public List<PCategory> getPCategoryBy(Integer parentId) {
        return pCategoryDao.getPCategoryBy(parentId);
    }

    @Override
    public PCategory getCateById(int id) {
        return pCategoryDao.getCateById(id);
    }

    @Override
    public int updateById(PCategory record) {
        return pCategoryDao.updateById(record);
    }

    @Override
    public int insert(PCategory record) {
        return pCategoryDao.insert(record);
    }


    @Override
    public PCategory getPCategoryById(Integer id) {
        return pCategoryDao.getPCategoryById(id);
    }

    @Override
    public List<CategoryChartsVo> getCateChartsByUid(Integer userId) {
        return pCategoryDao.getCateChartsByUid(userId);
    }

    @Override
    public List<PCategoryVo> selectAllLevel1Category() {
        List<PCategoryVo> pCategories = pCategoryDao.selectAllCategory();
        return pCategories;
    }

    @Override
    public List<PCategoryVo> getLv1CountByUid(int uid,int videoState) {
        return pCategoryDao.getLv1CountByUid(uid,videoState);
    }
}