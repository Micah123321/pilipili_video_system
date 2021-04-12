package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PCommentThumbsup;

public interface PCommentThumbsupDao {
    int deleteByPrimaryKey(Integer id);

    int insert(PCommentThumbsup record);

    int insertSelective(PCommentThumbsup record);

    PCommentThumbsup selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PCommentThumbsup record);

    int updateByPrimaryKey(PCommentThumbsup record);
}