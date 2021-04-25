package com.shield.pilipili;

import com.shield.pilipili.pojo.PCollect;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PCollectService {

    List<PCollect> getPCollectList(Integer userId,String title);

    boolean addCollect(@Param("collect") PCollect collect);
}