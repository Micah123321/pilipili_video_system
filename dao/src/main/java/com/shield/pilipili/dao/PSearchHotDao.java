package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PSearchHot;

import java.util.List;

public interface PSearchHotDao {
    int insert(PSearchHot record);

    List<PSearchHot> selectHotKeyWordByDate();

    int deleteByPrimaryKey(Integer id);

    int insertSelective(PSearchHot record);

    PSearchHot selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PSearchHot record);

    int updateByPrimaryKey(PSearchHot record);
}