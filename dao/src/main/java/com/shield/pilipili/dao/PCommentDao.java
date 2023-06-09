package com.shield.pilipili.dao;

import com.shield.pilipili.pojo.PComment;
import com.shield.pilipili.pojo.PSubscribe;
import com.shield.pilipili.pojo.page.PCommentPage;
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

    List<PCommentPage> getCommentByPCommentPage(PCommentPage pCommentPage);


    int deleteByPComment(PComment pComment);

    int insert(PComment record);

    int insertSelective(PComment record);

    PComment selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(PComment record);

    int updateThumb(Long comId);
}