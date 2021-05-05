package com.shield.pilipili;

import com.shield.pilipili.pojo.PVideosThumbsup;
import com.shield.pilipili.pojo.vo.PVideosThumbsupVo;

public interface PVideosThumbsupService {
    int getAllLikeCountByUid(int uid);
    int insert(PVideosThumbsup record);
    int deleteByThumbsup(PVideosThumbsup pVideosThumbsup);
    PVideosThumbsupVo selectThumbsupByThumbsup(PVideosThumbsup record);
}