package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PCollect;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PCollectDao {

    List<PCollect> getPCollectList(@Param("userId") Integer userId,@Param("title") String title);

    int addCollect(@Param("collect") PCollect collect);

    int updateCollect(@Param("collect") PCollect collect);

    int delCollect(@Param("id") Integer id);
}