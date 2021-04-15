package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PCategory;
import com.shield.pilipili.pojo.vo.PCategoryVo;

import java.util.List;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PCategoryDao {

    List<PCategoryVo> selectAllCategory();

    int deleteByPrimaryKey(Long id);

    int insert(PCategory record);

    /**
     * 分类分级查询
     * @param parentId 父级id
     * @return
     */
    List<PCategory> getPCategoryBy(@Param("parentId") Integer parentId);


    int updateByPrimaryKeySelective(PCategory record);

    int updateByPrimaryKey(PCategory record);
}