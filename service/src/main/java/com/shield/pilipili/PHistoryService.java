package com.shield.pilipili;

import com.shield.pilipili.pojo.page.PHistoryPage;

import java.util.List;

public interface PHistoryService {
    List<PHistoryPage> selectHistoryByUid(PHistoryPage pHistoryPage);

}