package com.shield.pilipili;

import com.shield.pilipili.PVideos;

public interface PVideosDao {
    int deleteByPrimaryKey(Integer videoPv);

    int insert(PVideos record);

    int insertSelective(PVideos record);

    PVideos selectByPrimaryKey(Integer videoPv);

    int updateByPrimaryKeySelective(PVideos record);

    int updateByPrimaryKey(PVideos record);
}