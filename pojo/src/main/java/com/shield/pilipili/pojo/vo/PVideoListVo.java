package com.shield.pilipili.pojo.vo;

import com.shield.pilipili.pojo.page.PVideosPage;
import lombok.Data;

import java.util.List;
@Data
public class PVideoListVo extends PVideosPage {
    private List<PVideosPage> dataList;
    private String typeName;
    private String parentTypeName;

    public PVideoListVo(List<PVideosPage> dataList, String typeName) {
        this.dataList = dataList;
        this.typeName = typeName;
    }
    public PVideoListVo(List<PVideosPage> dataList, String typeName,Long videoType) {
        super(videoType);
        this.dataList = dataList;
        this.typeName = typeName;
    }
    public PVideoListVo(){

    }

    public List<PVideosPage> getDataList() {
        return dataList;
    }

    public void setDataList(List<PVideosPage> dataList) {
        this.dataList = dataList;
    }

    @Override
    public String getTypeName() {
        return typeName;
    }

    @Override
    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
}
