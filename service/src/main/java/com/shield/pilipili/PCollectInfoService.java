package com.shield.pilipili;

import com.github.pagehelper.PageInfo;
import com.shield.pilipili.pojo.PCollectInfo;


import java.util.List;


public interface PCollectInfoService {


    PageInfo<PCollectInfo> getCollectInfoAll(Integer userId, String title,  OrderUtil order,Integer categoryId, String keyword,Integer currPage, Integer pageSize);

    List<PCollectInfo> getCollectCategory(Integer userId,String title);

    boolean delCollectInfo(Integer id);

    boolean delCollectInfoByVideoPv(Integer videoPv,Integer collectId);

    boolean insertCollectByVideoPv(PCollectInfo pCollectInfo);

    boolean getRepetition(Integer videoPv,Long collectId);
}