package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PPostip;

public interface PPostipDao {
    int insertPostIp(PPostip pPostip);
    int selectPostCount(PPostip pPostip);
}
