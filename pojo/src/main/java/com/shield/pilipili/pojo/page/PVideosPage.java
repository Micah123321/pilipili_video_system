package com.shield.pilipili.pojo.page;

import com.shield.pilipili.OrderUtil;
import com.shield.pilipili.pojo.PVideos;

public class PVideosPage extends PVideos {
    public PVideosPage(Long videoType) {
        super(videoType);
    }

    public PVideosPage() {

    }

    private Integer count = 0;
    private Integer index = 0;
    /**
     * 0      video_releasetime 发布时间
     * 1     video_play 播放
     * 2      video_comment 评论
     * 3      video_collect 收藏
     * 4      video_barrage 弹幕
     */
    private Integer orderBy = 0;
    private OrderUtil order;
    private String videoTimeEnd;
    private Integer type;
    private Integer pid;


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

    public Integer getOrderBy() {
        return orderBy;
    }

    public String getVideoTimeEnd() {
        return videoTimeEnd;
    }

    public void setVideoTimeEnd(String videoTimeEnd) {
        this.videoTimeEnd = videoTimeEnd;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public void setOrderBy(Integer orderBy) {
        this.orderBy = orderBy;
    }
}
