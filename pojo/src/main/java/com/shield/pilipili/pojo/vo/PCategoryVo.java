package com.shield.pilipili.pojo.vo;

import com.shield.pilipili.pojo.PCategory;
import lombok.Data;

@Data
public class PCategoryVo extends PCategory {
    private Integer count=0;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
