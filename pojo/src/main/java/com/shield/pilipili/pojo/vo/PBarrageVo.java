package com.shield.pilipili.pojo.vo;

import lombok.Data;

@Data
public class PBarrageVo {
    private int code;
    private Object[] danmaku;

    public PBarrageVo(int code, Object[] danmaku) {
        this.code = code;
        this.danmaku = danmaku;
    }

    public PBarrageVo() {
    }
}
