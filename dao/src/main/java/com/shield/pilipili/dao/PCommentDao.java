package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PComment;

public interface PCommentDao {
    int deleteByPrimaryKey(Long id);

    int insert(PComment record);

    int insertSelective(PComment record);

    PComment selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PComment record);

    int updateByPrimaryKey(PComment record);
}