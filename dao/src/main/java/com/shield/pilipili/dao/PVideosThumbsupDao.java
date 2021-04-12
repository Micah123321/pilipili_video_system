package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PVideosThumbsup;

public interface PVideosThumbsupDao {
    int deleteByPrimaryKey(Integer id);

    int insert(PVideosThumbsup record);

    int insertSelective(PVideosThumbsup record);

    PVideosThumbsup selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PVideosThumbsup record);

    int updateByPrimaryKey(PVideosThumbsup record);
}