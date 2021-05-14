package com.shield.pilipili.admin;

import com.shield.pilipili.PCommentService;
import com.shield.pilipili.PCommentThumbsupService;
import com.shield.pilipili.pojo.PComment;
import com.shield.pilipili.pojo.PCommentThumbsup;
import com.shield.pilipili.pojo.PUserInfo;
import com.shield.pilipili.pojo.Pagen;

import com.shield.pilipili.pojo.page.PCommentPage;
import com.shield.pilipili.pojo.vo.MessageVo;
import com.shield.pilipili.pojo.vo.PBarrageVo;
import com.shield.pilipili.pojo.vo.PCommentThumbsupVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;


@Controller
public class CommentController {
    @Resource
    private PCommentService pCommentService;
    @Resource
    private PCommentThumbsupService pCommentThumbsupService;

    @ResponseBody
    @RequestMapping(value = "/admin/comment/getList", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object getCommentList(PCommentPage pCommentPage, Integer pageSize, @RequestParam(defaultValue = "1")Integer currPage, HttpSession session){
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        pCommentPage.setUserId(pUserInfo.getUserId());
        Pagen<PCommentPage> page = new Pagen<>();
        page.setPageSize(pageSize);
        page.setTotalCount(pCommentService.getCommentByPCommentPage(pCommentPage).size());
        if (currPage>page.getTotalPageCount())currPage=page.getTotalPageCount();
        pCommentPage.setIndex((currPage - 1) * page.getPageSize());
        pCommentPage.setCount( page.getPageSize());
        page.setCurrPageNo(currPage);
        page.setDataList(pCommentService.getCommentByPCommentPage(pCommentPage));
        return page;
    }
    @ResponseBody
    @RequestMapping(value = "/admin/comment/del", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object categoryInfo(HttpSession session, PComment pComment) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        pComment.setUserId(pUserInfo.getUserId());
        if (pCommentService.deleteByPComment(pComment)>0){
            return new MessageVo(true);
        }else{
            return new MessageVo(false);
        }
    }

    @ResponseBody
    @RequestMapping(value = "/admin/comment/thumbs", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    public Object thumbsComment(HttpSession session, PCommentThumbsup pCommentThumbsup) {
        PUserInfo pUserInfo= (PUserInfo) session.getAttribute("userSession");
        pCommentThumbsup.setUserId(pUserInfo.getUserId());
        if (pCommentThumbsupService.insert(pCommentThumbsup)>0){
            pCommentService.updateThumb(pCommentThumbsup.getCommentId());
            PComment pComment = pCommentService.selectByPrimaryKey(pCommentThumbsup.getCommentId());
            return new PCommentThumbsupVo(pComment.getThumbsUpNum(),true);
        }else{
            pCommentThumbsupService.deleteByPCommentThumsup(pCommentThumbsup);
            pCommentService.updateThumb(pCommentThumbsup.getCommentId());
            PComment pComment = pCommentService.selectByPrimaryKey(pCommentThumbsup.getCommentId());
            return new PCommentThumbsupVo(pComment.getThumbsUpNum(),false);
        }
    }
}
