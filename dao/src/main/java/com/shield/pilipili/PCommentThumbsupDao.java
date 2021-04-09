package com.shield.pilipili;

import com.shield.pilipili.PCommentThumbsup;

public interface PCommentThumbsupDao {
    int deleteByPrimaryKey(Integer id);

    int insert(PCommentThumbsup record);

    int insertSelective(PCommentThumbsup record);

    PCommentThumbsup selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PCommentThumbsup record);

    int updateByPrimaryKey(PCommentThumbsup record);
}