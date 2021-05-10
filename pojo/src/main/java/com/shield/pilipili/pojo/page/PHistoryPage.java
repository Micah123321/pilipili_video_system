package com.shield.pilipili.pojo.page;

import com.shield.pilipili.pojo.vo.PHistoryVo;
import lombok.Data;

@Data
public class PHistoryPage extends PHistoryVo {
    private Integer count =0;
    private Integer index =0;
}
