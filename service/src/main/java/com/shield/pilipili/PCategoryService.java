package com.shield.pilipili;

import com.shield.pilipili.pojo.vo.PCategoryVo;

import java.util.List;

public interface PCategoryService {
    List<PCategoryVo> selectAllLevel1Category();

}