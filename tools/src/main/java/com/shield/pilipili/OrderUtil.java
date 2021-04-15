package com.shield.pilipili;

public class OrderUtil {

    //排序字段
    private Integer orderBy;
    //倒序排序
    private boolean isDesc;

    public OrderUtil(Integer orderBy){
        this.orderBy = orderBy;
        this.isDesc = false;
    }

    public OrderUtil(Integer orderBy,boolean isDesc) {
        this.orderBy = orderBy;
        this.isDesc = isDesc;
    }

    public Integer getOrderBy() {
        return orderBy;
    }

    public boolean getIsDesc() {
        return isDesc;
    }
}
