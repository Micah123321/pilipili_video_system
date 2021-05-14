package com.shield.pilipili.pojo.vo;

import lombok.Data;

@Data
public class PCommentThumbsupVo {
    private Integer num;
    private Boolean isThumbsup;

    public PCommentThumbsupVo(Integer num, Boolean isThumbsup) {
        this.num = num;
        this.isThumbsup = isThumbsup;
    }
}
