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
}