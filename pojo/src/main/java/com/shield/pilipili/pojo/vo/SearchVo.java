package com.shield.pilipili.pojo.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
@Data
public class SearchVo {
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date time;

    private String title;
    private Integer userId;

    public SearchVo(Date time, String title, Integer userId) {
        this.time = time;
        this.title = title;
        this.userId = userId;
    }
}
