package com.shield.pilipili.pojo.page;

import com.shield.pilipili.pojo.PAppeals;
import com.shield.pilipili.pojo.PVideos;
import lombok.Data;

@Data
public class PAppealsPage extends PAppeals {
    private Integer count =0;
    private Integer index =0;
    private PVideos pVideos;
}
