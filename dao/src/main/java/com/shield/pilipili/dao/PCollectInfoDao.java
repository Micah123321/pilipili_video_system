package com.shield.pilipili.dao;

import com.shield.pilipili.OrderUtil;
import com.shield.pilipili.pojo.PCollect;
import com.shield.pilipili.pojo.PCollectInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PCollectInfoDao {

    List<PCollectInfo> getCollectInfoAll(@Param("userId") Integer userId,@Param("title") String title,@Param("order") OrderUtil order,@Param("categoryId") Integer categoryId,@Param("keyword") String keyword);

    List<PCollectInfo> getCollectCategory(@Param("userId") Integer userId,@Param("title") String title);

}