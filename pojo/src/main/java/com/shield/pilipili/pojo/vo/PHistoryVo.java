package com.shield.pilipili.pojo.vo;

import com.shield.pilipili.pojo.PHistory;
import lombok.Data;

@Data
public class PHistoryVo extends PHistory {
    private Integer videoUserId;
    private String videoUserName;
    private String videoImage;
    private String videoTitle;
    private String videoTime;
    private String categoryName;
    private String videoUserImage;

    private Double loadBar;

    public String getVideoTime() {
        return videoTime;
    }

    public void setVideoTime(String videoTime) {
        this.videoTime = videoTime;
        setLoadBar();
    }

    public Double getLoadBar() {
        return loadBar;
    }

    public void setLoadBar() {

        String[] videoTimeArr = getVideoTime().split(":");
        String[] viewSecondArr = getViewSecond().split(":");
        double integer = mathArrString(viewSecondArr);
        double integer1 = mathArrString(videoTimeArr);
        double d=integer/integer1*100;
        this.loadBar = d;
    }

    private double mathArrString(String[] arr){
        double integer=0;
        int i = Integer.parseInt(arr[2]);
        int i1 = Integer.parseInt(arr[1]) * 60;
        int i2 = Integer.parseInt(arr[0]) * 3600;
        integer=i+i1+i2;
        return integer;
    }
}
