package com.shield.pilipili;

import com.shield.pilipili.pojo.vo.PCategoryVo;

import java.util.List;

import com.shield.pilipili.pojo.PCategory;

import java.util.List;

public interface PCategoryService {
    List<PCategoryVo> selectAllLevel1Category();
    List<PCategoryVo> getLv1CountByUid(int uid,int videoState);

    /**
     * 分类分级查询
     * @param parentId 父级id
     * @return
     */
    List<PCategory> getPCategoryBy(Integer parentId);

    PCategory getPCategoryById(Integer id);

    PCategory getCateById(int id);

    int updateById(PCategory record);
    int insert(PCategory record);
}