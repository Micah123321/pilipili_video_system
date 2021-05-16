package com.shield.pilipili.pojo.page;

import com.shield.pilipili.pojo.PComment;
import com.shield.pilipili.pojo.PUserInfo;
import lombok.Data;

@Data
public class PCommentPage extends PComment {
    private Integer count =0;
    private Integer index =0;
    private String nickName;
    private String userPic;
    private String videoImage;
    private String videoTitle;
    private Integer isthumbsup;
    private Integer isfans;
    private Integer selectDay=0;
    private Integer orderBy=0;
    private PUserInfo pUserInfo;
    private PComment pComment;
}
