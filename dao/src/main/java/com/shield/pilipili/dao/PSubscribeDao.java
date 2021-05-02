package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PSubscribe;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.page.PUserInfoPage;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PSubscribeDao {
    /**
     * 根据用户信息查询粉丝信息
     * @param userInfoPage 用户数据信息
     * @return 粉丝集合
     */
    List<PUserInfoPage> getFansById(PUserInfoPage userInfoPage);

    /**
     * 根据用户信息查询订阅信息
     * @param userInfoPage 用户id
     * @return 订阅集合
     */
    List<PUserInfoPage> getSubById(PUserInfoPage userInfoPage);

    /**
     * 查询一段时间的关注数据
     * @param beginDate 开始数据
     * @param endDate 结束时间
     * @param userId 用户id
     * @return
     */

    List<PSubscribe> getFansByDate(@Param("beginDate") Date beginDate, @Param("endDate") Date endDate,@Param("userId")int userId);

    /**
     *删除功能
     * @param id
     * @return
     */
    int deleteById(PSubscribe subscribe);

    /**
     * 插入功能
     * @param record
     * @return
     */

    int insert(PSubscribe record);

    /**
     * 更新功能
     * @param id
     * @return
     */

    int updateById(PSubscribe subscribe);

    /**
     * 查询是否已关注
     * @param subscribe
     * @return
     */
    int checkSub(PSubscribe subscribe);
}