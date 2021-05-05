package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PVideosThumbsup;
import com.shield.pilipili.pojo.vo.PVideosThumbsupVo;

public interface PVideosThumbsupDao {
    int deleteByThumbsup(PVideosThumbsup pVideosThumbsup);

    int insert(PVideosThumbsup record);

    int insertSelective(PVideosThumbsup record);

    PVideosThumbsup selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PVideosThumbsup record);

    int updateByPrimaryKey(PVideosThumbsup record);

    int getAllLikeCountByUid(int uid);

    PVideosThumbsupVo selectThumbsupByThumbsup(PVideosThumbsup record);
}