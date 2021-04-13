package com.shield.pilipili;

import com.shield.pilipili.pojo.PSubscribe;
import com.shield.pilipili.pojo.PUserInfo;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PSubscribeService {

    List<PUserInfo> getFansById(int id);
    List<PSubscribe> getFansByDate(Date beginDate, Date endDate,int userId);
}