package com.shield.pilipili;

import com.shield.pilipili.pojo.vo.PCategoryVo;

import java.util.List;

import com.shield.pilipili.pojo.PCategory;

import java.util.List;

public interface PCategoryService {
    List<PCategoryVo> selectAllLevel1Category();

    /**
     * 分类分级查询
     * @param parentId 父级id
     * @return
     */
    List<PCategory> getPCategoryBy(Integer parentId);
}