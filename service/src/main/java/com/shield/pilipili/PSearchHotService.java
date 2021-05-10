package com.shield.pilipili;

import com.shield.pilipili.pojo.PSearchHot;

import java.util.List;

public interface PSearchHotService {
    int insert(PSearchHot record);
    List<PSearchHot> selectHotKeyWordByDate();
}
