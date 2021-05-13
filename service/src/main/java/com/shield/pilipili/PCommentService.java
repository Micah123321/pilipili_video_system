package com.shield.pilipili;

import com.shield.pilipili.pojo.PComment;
import com.shield.pilipili.pojo.page.PCommentPage;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PCommentService {
    int getComCountByUserId(int userId);
    List<PComment> getCommentCountByDate(Date beginDate, Date endDate, int userId);
    List<PCommentPage> getCommentByPCommentPage(PCommentPage pCommentPage);
}