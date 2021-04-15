package com.shield.pilipili;

import com.shield.pilipili.pojo.PCollectInfo;
import com.shield.pilipili.pojo.PVideos;
import com.shield.pilipili.pojo.PVideosThumbsup;
import com.shield.pilipili.pojo.page.PVideosPage;

import java.util.Date;
import java.util.List;

public interface PVideosService {
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
    List<PCollectInfo> getCollectByDate(Date beginDate, Date endDate, int userId);
    List<PVideosThumbsup> getLikeByDate(Date beginDate,  Date endDate, int userId);

    List<PVideos> selectVideosListByUp(PVideosPage pVideosPage);
}