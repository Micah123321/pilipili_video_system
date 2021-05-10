package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PHistory;
import com.shield.pilipili.pojo.page.PHistoryPage;

import java.util.List;

public interface PHistoryDao {
    List<PHistoryPage> selectHistoryByUid(PHistoryPage pHistoryPage);

    int deleteByPrimaryKey(Long id);

    int insert(PHistory record);

    int insertSelective(PHistory record);

    PHistory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PHistory record);

    int updateByPrimaryKey(PHistory record);
}