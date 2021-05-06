package com.shield.pilipili.pojo.vo;

import com.shield.pilipili.pojo.PBarrage;
import lombok.Data;

@Data
public class PBarrageVo extends PBarrage {
    private String nickName;
    private String videoTitle;
    private String barrageTime;
    private String barrageCreateTime;
    private int code;
    private Object[] danmaku;

    public PBarrageVo(int code, Object[] danmaku) {
        this.code = code;
        this.danmaku = danmaku;
    }

    public PBarrageVo() {
    }
}
