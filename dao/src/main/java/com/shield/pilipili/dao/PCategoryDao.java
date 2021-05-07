package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PCategory;
import com.shield.pilipili.pojo.vo.CategoryChartsVo;
import com.shield.pilipili.pojo.vo.PCategoryVo;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PCategoryDao {
    List<CategoryChartsVo> getCateChartsByUid(Integer userId);

    List<PCategoryVo> selectAllCategory();

    List<PCategoryVo> getLv1CountByUid(@Param("uid") int uid,@Param("videoState") int videoState);

    PCategory getCateById(int id);

    /**
     * 分类分级查询
     * @param parentId 父级id
     * @return
     */
    List<PCategory> getPCategoryBy(@Param("parentId") Integer parentId);

    PCategory getPCategoryById(@Param("id") Integer id);

    int updateById(PCategory record);
    int insert(PCategory record);
}