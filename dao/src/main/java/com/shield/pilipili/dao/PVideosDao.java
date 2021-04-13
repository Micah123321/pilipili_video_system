package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.*;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PVideosDao {
    /**
     * 根据用户id查询播放数
     * @param id
     * @return
     */
    int getPlayCountById(int id);

    /**
     * 根据用户id查询点赞数
     * @param id
     * @return
     */
    int getLikeCountById(int id);
    /**
     * 根据用户id查询收藏数
     * @param id
     * @return 收藏数
     */
    int getCollectCountById(int id);

    List<PCollectInfo> getCollectByDate(@Param("beginDate") Date beginDate, @Param("endDate") Date endDate, @Param("userId")int userId);
    List<PVideosThumbsup> getLikeByDate(@Param("beginDate") Date beginDate, @Param("endDate") Date endDate, @Param("userId")int userId);
    /**
     *
     * @param videoPv
     * @return
     */
    int deleteByPrimaryKey(Integer videoPv);

    int insert(PVideos record);

    int insertSelective(PVideos record);

    PVideos selectByPrimaryKey(Integer videoPv);

    int updateByPrimaryKeySelective(PVideos record);

    int updateByPrimaryKey(PVideos record);
}