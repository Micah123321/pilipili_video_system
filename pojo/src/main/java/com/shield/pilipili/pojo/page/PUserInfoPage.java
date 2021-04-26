package com.shield.pilipili.pojo.page;

import com.shield.pilipili.pojo.PUserInfo;

public class PUserInfoPage extends PUserInfo {
    private Integer count =0;
    private Integer index=0;
    private Boolean isSubYou=false;

    public Boolean getSubYou() {
        return isSubYou;
    }

    public void setSubYou(Boolean subYou) {
        isSubYou = subYou;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}
