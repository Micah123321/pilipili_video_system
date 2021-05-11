package com.shield.pilipili;

import com.shield.pilipili.pojo.PHistory;
import com.shield.pilipili.pojo.page.PHistoryPage;

import java.util.List;

public interface PHistoryService {
    List<PHistoryPage> selectHistoryByUid(PHistoryPage pHistoryPage);

    int deleteByPHistory(PHistory record);

    int insert(PHistory record);

    int updateByPHistory(PHistory record);

    PHistory selectByPHistory(PHistory record);
}