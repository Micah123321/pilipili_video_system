package com.shield.pilipili.pojo.page;

import com.shield.pilipili.pojo.PVideos;

public class PVideosPage extends PVideos {
    private Integer count =0;
    private Integer index=0;
    /**
     *           0      video_releasetime 发布时间
     *           1     video_play 播放
     *           2      video_comment 评论
     *           3      video_collect 收藏
     *           4      video_barrage 弹幕
     */
    private Integer orderBy=0;


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

    public void setOrderBy(Integer orderBy) {
        this.orderBy = orderBy;
    }
}
