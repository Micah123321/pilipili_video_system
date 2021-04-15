package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PCategory;
import com.shield.pilipili.pojo.vo.PCategoryVo;

import java.util.List;

public interface PCategoryDao {

    List<PCategoryVo> selectAllCategory();

    int deleteByPrimaryKey(Long id);

    int insert(PCategory record);

    int insertSelective(PCategory record);

    PCategory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PCategory record);

    int updateByPrimaryKey(PCategory record);
}