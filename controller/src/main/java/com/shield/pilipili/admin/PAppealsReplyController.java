package com.shield.pilipili.admin;

import com.shield.pilipili.pojo.PAppealsReply;
import com.shield.pilipili.PAppealsReplyService;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.page.PAppealsPage;
import com.shield.pilipili.pojo.vo.MessageVo;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

/**
 * 申诉回复表(PAppealsReply)表控制层
 *
 * @author makejava
 * @since 2021-05-25 00:11:07
 */
@RestController
public class PAppealsReplyController {
    /**
     * 服务对象
     */
    @Resource
    private PAppealsReplyService pAppealsReplyService;

    @ResponseBody
    @RequestMapping(value = "/admin/appealReply/list", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getAppealsReply(Integer appealsId) {
        List<PAppealsReply> pAppealsReplyByAppealsId = pAppealsReplyService.getPAppealsReplyByAppealsId(appealsId);
        return pAppealsReplyByAppealsId;
    }

    @ResponseBody
    @RequestMapping(value = "/admin/appealReply/add", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public Object addAppealsReply(PAppealsReply appealsReply,HttpSession session) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        appealsReply.setUserId(pUserInfo.getUserId());
        appealsReply.setCreatetime(new Date());
        if (pAppealsReplyService.insert(appealsReply).getId()>0){
            return new MessageVo(true);
        }else {
            return new MessageVo(false);
        }
    }
}