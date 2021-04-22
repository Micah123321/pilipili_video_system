package com.shield.pilipili;

import com.shield.pilipili.pojo.PCollectInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.PVideosThumbsup;
import com.shield.pilipili.pojo.page.PVideosPage;

import java.util.Date;
import java.util.List;

import com.github.pagehelper.PageInfo;
import com.shield.pilipili.pojo.PVideos;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PVideosService {
    int getPlayCountById(int id);
    /**
     * 根据用户id查询点赞数
     * @param id
     * @return
     */
    PVideos getVideoByPv(int pid);
    int getLikeCountById(int id);
    /**
     * 根据用户id查询收藏数
     * @param id
     * @return 收藏数
     */
    int getCollectCountById(int id);
    List<PCollectInfo> getCollectByDate(Date beginDate, Date endDate, int userId);
    List<PVideosThumbsup> getLikeByDate(Date beginDate,  Date endDate, int userId);

    List<PVideosPage> getVideosListByType(PVideosPage pVideosPage);

    List<PVideos> selectVideosListByUp(PVideosPage pVideosPage);
    /**
     * 视频模糊查询
     * @param videoTitle 视频标题
     * @param videoTime 视频时长
     * @param categoryId 视频分类
     * @param order 综合排序
     * @return
     */
    PageInfo<PVideos> getPVideosPageList(String videoTitle, String videoTime,String videoTimeEnd,Integer type, Integer categoryId,Integer pid, OrderUtil order,Integer currPage,Integer pageSize);

    /**
     * 根据主键删除
     * @param videoPv
     * @return
     */
    int deleteByPrimaryKey(Integer videoPv);
    /**
     * 插入视频
     * @param record
     * @return
     */
    int insertVideo(PVideos record);
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
    int getPVideosPageListCount(String videoTitle, String videoTime, String videoTimeEnd, Integer type, Integer categoryId,Integer pid);
}