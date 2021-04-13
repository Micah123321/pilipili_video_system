package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PSubscribe;
import com.shield.pilipili.pojo.PUserInfo;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PSubscribeDao {
    /**
     * 根据用户id查询粉丝信息
     * @param id 用户id
     * @return 粉丝集合
     */
    List<PUserInfo> getFansById(int id);

    List<PSubscribe> getFansByDate(@Param("beginDate") Date beginDate, @Param("endDate") Date endDate,@Param("userId")int userId);

    /**
     *
     * @param id
     * @return
     */
    int deleteByPrimaryKey(Long id);

    int insert(PSubscribe record);

    int insertSelective(PSubscribe record);

    PSubscribe selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PSubscribe record);

    int updateByPrimaryKey(PSubscribe record);
}