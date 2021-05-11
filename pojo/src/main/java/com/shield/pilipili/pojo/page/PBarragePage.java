package com.shield.pilipili.pojo.page;

import com.shield.pilipili.pojo.vo.PBarrageVo;
import lombok.Data;

@Data
public class PBarragePage extends PBarrageVo {
    private Integer count =0;
    private Integer index =0;
}
