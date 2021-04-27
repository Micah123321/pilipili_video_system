package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PBarrage;
import com.shield.pilipili.pojo.PComment;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PBarrageDao {
    /**
     * 根据用户id获得该用户名下视频的所有弹幕数
     * @param id
     * @return
     */
    int getBarrCountByUserId(int id);

    List<PBarrage> getBarrCountByDate(@Param("beginDate") Date beginDate, @Param("endDate") Date endDate, @Param("userId")int userId);

    List<PBarrage> getBarrByPv(int pv);

    /**
     *
     * @param id
     * @return
     */
    int deleteByPrimaryKey(Long id);

    int insert(PBarrage record);

    int insertSelective(PBarrage record);

    PBarrage selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PBarrage record);

    int updateByPrimaryKey(PBarrage record);
}