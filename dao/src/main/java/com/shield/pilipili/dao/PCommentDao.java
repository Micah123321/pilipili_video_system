package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PComment;
import com.shield.pilipili.pojo.PSubscribe;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PCommentDao {
    /**
     * 根据用户id查询该用户下视频的评论
     * @param userId
     * @return
     */
    int getComCountByUserId(int userId);

    List<PComment> getCommentCountByDate(@Param("beginDate") Date beginDate, @Param("endDate") Date endDate, @Param("userId")int userId);

    /**
     *
     * @param id
     * @return
     */
    int deleteByPrimaryKey(Long id);

    int insert(PComment record);

    int insertSelective(PComment record);

    PComment selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PComment record);

    int updateByPrimaryKey(PComment record);
}