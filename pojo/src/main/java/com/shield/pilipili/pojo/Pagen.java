package com.shield.pilipili.pojo;

import lombok.Data;

import java.util.List;

@Data
public class Pagen<T> {
    private int totalPageCount;//总共有多少页
    private int pageSize;//每页有多少条数据
    private int totalCount;//总共有多少条数据
    private int currPageNo = 1;//当前页数
    private int index;
    private List<T> dataList;//存放的数据
    private List<T> allDataList;//存放的数据

    public void setTotalPageCount(int totalPageCount) {
        this.totalPageCount = totalPageCount;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public List<T> getDataList() {
        return dataList;
    }

    public void setDataList(List<T> dataList) {
        this.dataList = dataList;
    }

    public List<T> getAllDataList() {
        return allDataList;
    }

    public void setAllDataList(List<T> allDataList) {
        this.allDataList = allDataList;
    }

    public int getTotalPageCount() {
        return totalPageCount;
    }

    public void setTotalPageCount() {
        totalPageCount = totalCount % pageSize == 0 ? (totalCount / pageSize) : (totalCount / pageSize + 1);
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        if (totalCount > 0) {
            this.totalCount = totalCount;
            setTotalPageCount();
        }

    }

    public int getCurrPageNo() {
        return currPageNo;
    }

    public void setCurrPageNo(int currPageNo) {
        if (currPageNo <= 0) {
            this.currPageNo = 1;
        } else if (currPageNo >= totalPageCount) {
            this.currPageNo = totalPageCount;
        } else {
            this.currPageNo = currPageNo;
        }
    }


}
