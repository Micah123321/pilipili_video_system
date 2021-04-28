package com.shield.pilipili;

import com.shield.pilipili.pojo.PCollect;


import java.util.List;

public interface PCollectService {

    List<PCollect> getPCollectList(Integer userId,String title);

    boolean addCollect(PCollect collect);

    boolean updateCollect(PCollect collect);

    boolean delCollect(Integer id);

}