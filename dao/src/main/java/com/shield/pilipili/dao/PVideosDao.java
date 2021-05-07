package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.*;
import com.shield.pilipili.pojo.page.PVideosPage;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import com.shield.pilipili.OrderUtil;
import com.shield.pilipili.pojo.PVideos;
import org.apache.ibatis.annotations.Param;
import org.springframework.core.annotation.OrderUtils;

import java.util.Date;
import java.util.List;

public interface PVideosDao {
    /**
     * 随机获得标题
     * @return
     */
    String getRandTitle();
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
     * 根据pv获得视频信息
     * @param pid
     * @return
     */
    PVideos getVideoByPv(int pid);
    List<PVideos> selectVideosListByUp(PVideosPage pVideosPage);
    /**
     *删除功能
     * @param videoPv
     * @return
     */
    int deleteByPrimaryKey(Integer videoPv);

    int insertVideo(PVideos record);

    List<PVideosPage> getVideosListByType(PVideosPage pVideosPage);

    /**
     * 视频模糊查询
     * @param videoTitle 视频标题
     * @param videoTime 视频时长
     * @param categoryId 视频分类
     * @param order 综合排序
     * @return
     */
    List<PVideos> getPVideosPageList(@Param("videoTitle") String videoTitle,@Param("videoTime") String videoTime,@Param("videoTimeEnd") String videoTimeEnd,@Param("type") Integer type,@Param("categoryId") Integer categoryId,@Param("pid") Integer pid,@Param("order") OrderUtil order);

    /**
     * 视频个数查询
     * @param videoTitle
     * @param videoTime
     * @param videoTimeEnd
     * @param type
     * @param categoryId
     * @param pid
     * @return
     */
    int getPVideosPageListCount(@Param("videoTitle") String videoTitle,@Param("videoTime") String videoTime,@Param("videoTimeEnd") String videoTimeEnd,@Param("type") Integer type,@Param("categoryId") Integer categoryId,@Param("pid") Integer pid);

    int updateByPrimaryKeySelective(PVideos record);

    int updatePlayCount(Integer pv);

    int updateVideoData(Integer pv);
}