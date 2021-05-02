package com.shield.pilipili;

import com.shield.pilipili.pojo.PSubscribe;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.page.PUserInfoPage;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PSubscribeService {

    List<PUserInfoPage> getFansById(PUserInfoPage userInfoPage);
    List<PSubscribe> getFansByDate(Date beginDate, Date endDate,int userId);
    List<PUserInfoPage> getSubById(PUserInfoPage userInfoPage);
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