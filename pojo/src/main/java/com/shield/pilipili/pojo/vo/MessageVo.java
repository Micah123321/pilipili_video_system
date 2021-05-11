package com.shield.pilipili.pojo.vo;

import lombok.Data;

@Data
public class MessageVo {
    private Integer code;
    private String message;

    public MessageVo() {
    }

    public MessageVo(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
    public MessageVo(boolean flag) {
        if (flag){
            this.code = 0;
            this.message = "ok";
        }else {
            this.code = -1;
            this.message = "error";
        }
    }


}
