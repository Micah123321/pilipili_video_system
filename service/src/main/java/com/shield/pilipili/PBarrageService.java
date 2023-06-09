package com.shield.pilipili;

import com.shield.pilipili.pojo.PBarrage;
import com.shield.pilipili.pojo.page.PBarragePage;
import com.shield.pilipili.pojo.vo.PBarrageVo;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PBarrageService {
    /**
     * 根据用户id获得该账号名下所有视频的弹幕
     * @param pBarragePage
     * @return
     */
    List<PBarragePage> getBarrByUserId(PBarragePage pBarragePage);
    /**
     * 根据用户id获得该用户名下视频的所有弹幕数
     * @param id
     * @return
     */
    int getBarrCountByUserId(int id);
    /**
     * 删除弹幕
     * @param pBarrage
     * @return
     */
    int deleteByPBarrage(PBarrageVo pBarrage);
    List<PBarrage> getBarrCountByDate( Date beginDate, Date endDate,int userId);
    List<PBarrage> getBarrByPv(int pv);
    int insert(PBarrage record);
}