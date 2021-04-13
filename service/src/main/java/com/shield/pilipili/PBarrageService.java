package com.shield.pilipili;

import com.shield.pilipili.pojo.PBarrage;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PBarrageService {
    /**
     * 根据用户id获得该用户名下视频的所有弹幕数
     * @param id
     * @return
     */
    int getBarrCountByUserId(int id);
    List<PBarrage> getBarrCountByDate( Date beginDate, Date endDate,int userId);

}