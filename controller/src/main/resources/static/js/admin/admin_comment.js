$(function () {
    ajaxVideoTitle = () => {
        var videoTitle = $("#titleSearch").val()
        var orderBy = 0
        var currPage = $("#titleCurrPage").val();
        $.ajax({
            url: "admin/creative/data",
            type: "get",
            dataType: "json",
            data: {
                videoTitle,
                orderBy,
                currPage
            },
            success: function (data) {
                $("#titleCurrPage").val(data.currPageNo)
                $("#titleTotalPageCount").val(data.totalPageCount)
                for (var i = 0; i < data.dataList.length; i++) {
                    var obj = data.dataList[i]
                    var selected = ""
                    if ($("#videoId").attr("title") == obj.videoPv) {
                        selected = "selected"
                    }
                    $(".simplebar-content").append(`<li onclick="changeTitle(this)" data-v-6c40e918="" class="bcc-option ${selected}" value="${obj.videoPv}">
                                        <span>${obj.videoTitle}</span><i class="bcc-iconfont bcc-icon-ic_MenuButton-tick"></i></li>`)
                }
            }
        })
    }
    $(".bcc-iconfont.bcc-icon-ic_search_.search").click(function () {
        ajaxComment()
    })

    $(".bcc-checkbox-checkbox input").click(function () {
        if ($(this).parent().parent().hasClass("bcc-checkbox-checked")) {
            $(this).parent().parent().removeClass("bcc-checkbox-checked");
            $(".check-box").each(function () {
                $(this).removeClass("checked")
            });
        } else {
            $(this).parent().parent().addClass("bcc-checkbox-checked");
            $(".check-box").each(function () {
                $(this).addClass("checked")
            });
        }
        pdcheck()
    })
    addDelModel = (delArr) => {
        piliModel("删除提醒", "删除后无法恢复，确认删除评论吗？", "comment_content", ajaxDelBarrage, delArr)
    }

    $(".bcc-button.del").click(function () {
        var delArr = []
        $(".check-box.checked").each(function () {
            delArr.push($(this).attr("comId"))
        });
        piliModel("删除提醒", "删除后无法恢复，确认删除选中的评论吗？", "comment_content", ajaxDelBarrage, delArr)
    })

    ajaxDelBarrage = (delArr) => {
        $.ajax({
            url: "/admin/comment/del",
            type: "get",
            dataType: "json",
            data: {
                commentArr: delArr
            },
            success: function (data) {
                if (data.code == 0) {
                    ajaxComment()
                }
            }
        })
    }

    checkbox = (obj) => {
        if ($(obj).hasClass("checked")) {
            $(obj).removeClass("checked")
        } else {
            $(obj).addClass("checked")
        }
        var count = 0
        var checkcount = 0
        $(".check-box").each(function () {
            count++
            if ($(this).hasClass("checked")) {
                checkcount++
            }
        });
        if (checkcount == count) {
            $("#allCheck").addClass("bcc-checkbox-checked")
        } else {
            $("#allCheck").removeClass("bcc-checkbox-checked")
        }
        pdcheck()
    }
    pdcheck = () => {
        var checkcount = 0
        $(".check-box").each(function () {
            if ($(this).hasClass("checked")) {
                checkcount++
            }
        })
        if (checkcount > 0) {
            $(".bcc-button.bcc-button--default").removeClass("is-disabled")
            $(".bcc-button.bcc-button--default").removeAttr("disabled")
        } else {
            $(".bcc-button.bcc-button--default").addClass("is-disabled")
            $(".bcc-button.bcc-button--default").attr("disabled", "disabled")
        }
    }
    $(".operate-txt").click(function () {
        $(".operate-txt").removeClass("active")
        $(this).addClass("active")
        ajaxComment()
    })

    $("#day").click(function () {
        $("#dayList").slideToggle()
    })
    $("#dayList .bcc-option").click(function () {
        $("#dayList .bcc-option").removeClass("selected")
        $(this).addClass("selected")
        $("#day").attr("title", $(this).val())
        $("#day").val($(this).find("span").text())
        ajaxComment()
        $("#dayList").slideToggle()
    })
    ajaxThumbsup = (obj, commentId) => {
        $.ajax({
            url: "/admin/comment/thumbs",
            type: "get",
            dataType: "json",
            data: {
                commentId
            },
            success: function (data) {
                if (data.isThumbsup) {
                    $(obj).css("color", "rgb(0, 161, 214)")
                } else {
                    $(obj).css("color", "#999")
                }
                $(obj).find(".num").text(data.num)
            }
        })
    }

    addReplyContent = (obj,json) => {
        var com=json
        if ($(obj).parent().parent().parent().find(".reply-wrap").length > 0) {
            $(obj).parent().parent().parent().find(".reply-wrap").remove()
        } else {
            $(obj).parent().parent().parent().append(`<div class="reply-wrap clearfix"><!----> <textarea placeholder="回复 @${com.nickName}: "></textarea> <div class="emoji-wrap left"><a class="trigger">・ω・颜文字</a> <ul class="emoji-box" style="display: none;"><a>(⌒▽⌒)</a><a>（￣▽￣）</a><a>(=・ω・=)</a><a>(｀・ω・´)</a><a>(〜￣△￣)〜</a><a>(･∀･)</a><a>(°∀°)ﾉ</a><a>(￣3￣)</a> <a>╮(￣▽￣)╭</a><a>( ´_ゝ｀)</a><a>←_←</a><a>→_→</a><a>(&lt;_&lt;)</a><a>(&gt;_&gt;)</a><a>(;¬_¬)</a><a>("▔□▔)/</a><a>(ﾟДﾟ≡ﾟдﾟ)!?</a> <a>Σ(ﾟдﾟ;)</a><a>Σ( ￣□￣||)</a><a>(´；ω；\`)</a><a>（/TДT)/</a><a>(^・ω・^ )</a><a>(｡･ω･｡)</a><a>(●￣(ｴ)￣●)</a> <a>ε=ε=(ノ≧∇≦)ノ</a><a>(´･_･\`)</a><a>(-_-#)</a><a>（￣へ￣）</a><a>(￣ε(#￣) Σ</a><a>ヽ(\`Д´)ﾉ</a><a>(╯°口°)╯(┴—┴</a><a>（#-_-)┯━┯</a><a>_(:3」∠)_</a> <a>(笑)</a><a>(汗)</a><a>(泣)</a><a>(苦笑)</a></ul></div> <!----> <button onclick="ajaxReply(this,${com.videoId},${com.id},${com.userId})" class="bcc-button right bcc-button--primary large"><!----><span>发表回复</span></button></div>`)
        }
    }

    ajaxReply=(obj,videoId,parentId,replyId)=>{
        $.ajax({
            url: "/admin/comment/add",
            type: "post",
            dataType: "json",
            data: {
                parentId,
                replyId,
                level:3,
                videoId,
                content:$(obj).parent().find("textarea").val()
            },
            success: function (data) {
                if (data.code==0)ajaxComment()
            }
        })
    }

    $(".section-list_wrap").on('click', '.trigger', function () {
        $(this).parent().find(".emoji-box").toggle()
        $("a").off("click");
        $(".emoji-box a").click(function () {
            var obj = $(this).parent().parent().parent().find("textarea");
            var content = obj.val()
            obj.val(content + $(this).text())
            return false;
        })
    })
    addDetailContent=(obj)=>{
        var dx = $(obj).parent().parent().parent().find(".ci-parent-reply");
        if (dx.toggle())$(obj).text("查看评论");else $(obj).text("收起评论");
    }
    ajaxComment = () => {
        var currPage = $("#currPage").val();
        var videoId = $("#videoId").attr("title");
        var content = $("#context").val();
        var orderBy = $(".operate-txt.active").attr("value");
        var selectDay = $("#day").attr("title");
        $.ajax({
            url: "/admin/comment/getList",
            type: "get",
            dataType: "json",
            data: {
                orderBy,
                currPage,
                videoId,
                content,
                selectDay,
                pageSize: 5
            },
            success: function (data) {
                $(".title_wrap .num").text(`(${data.totalCount})`)
                $(".section-list_wrap").empty()
                for (var i = 0; i < data.dataList.length; i++) {
                    var obj = data.dataList[i];
                    var content;
                    var jsonString=JSON.stringify(obj);
                    if (obj.pcomment == null && obj.puserInfo == null) {
                        content = `<div data-v-76b62926="" class="comment-list-item">
                    <div onclick="checkbox(this)" comId="${obj.id}" class="check-box"><i class="bcc-iconfont bcc-icon-ic_MenuButton-tick"></i></div> 
                    <a href="/user/space/${obj.userId}" mid="527603216" target="_blank" card="GTnb233" class="user-avatar" data-reporter-id="171">
                    <img src="${obj.userPic}"></a> 
                    <div class="article-wrap"><a href="/pv${obj.videoId}" target="_blank" class="pic" data-reporter-id="172">
                    <img src="${obj.videoImage}"></a> 
                    <!----> <!----> <a href="/pv${obj.videoId}" class="title ellipsis">
                    <span class="name">${obj.videoTitle}</span><span class="show-all">该视频全部评论</span></a> <!----> <!----></div> <div class="ci-title"><span class="relation-label" style="display: none;">已充电</span>
                     <span `
                        if (!obj.isfans) {
                            content += `style="display: none;"`
                        }
                        content += `class="relation-label">粉丝</span>
                      <a href="/user/space/${obj.userId}" mid="527603216" card="GTnb233" target="_blank">${obj.nickName}</a>
                      <!----> <!----> <!----> <!----></div>
                     <!----> <a href="/pv${obj.videoId}" target="_blank"><div class="ci-content">${obj.content}</div></a> 
                     <!----> <!----> <div class="ci-action"><span class="date">${obj.createTime}</span> 
                     <span class="like action"><a onclick="ajaxThumbsup(this,${obj.id})" data-reporter-id="173"`
                        if (obj.isthumbsup > 0) {
                            content += `style="color: rgb(0, 161, 214);"`
                        }
                        content += `><i class="bcc-iconfont bcc-icon-icon_action_recommend_line_n_"></i><span class="num">${obj.thumbsUpNum}</span></a></span> <span class="reply action"><a onclick='addReplyContent(this,${jsonString})' data-reporter-id="174">回复</a></span>
                      <span class="report action"><a data-reporter-id="175">举报</a></span> <span class="delete action"><a onclick="addDelModel(${obj.id})" data-reporter-id="176">删除</a></span></div> <!----> <!----></div>`
                    }else{
                        content = `<div data-v-76b62926="" class="comment-list-item">
                    <div onclick="checkbox(this)" comId="${obj.id}" class="check-box"><i class="bcc-iconfont bcc-icon-ic_MenuButton-tick"></i></div> 
                    <a href="/user/space/${obj.userId}" mid="527603216" target="_blank" card="GTnb233" class="user-avatar" data-reporter-id="171">
                    <img src="${obj.userPic}"></a> 
                    <div class="article-wrap"><a href="/pv${obj.videoId}" target="_blank" class="pic" data-reporter-id="172">
                    <img src="${obj.videoImage}"></a> 
                    <!----> <!----> <a href="/pv${obj.videoId}" class="title ellipsis">
                    <span class="name">${obj.videoTitle}</span><span class="show-all">该视频全部评论</span></a> <!----> <!----></div> <div class="ci-title"><span class="relation-label" style="display: none;">已充电</span>
                     <span `
                        if (!obj.isfans) {
                            content += `style="display: none;"`
                        }
                        content += `class="relation-label">粉丝</span>
                      <a href="/user/space/${obj.userId}" mid="527603216" card="GTnb233" target="_blank">${obj.nickName}</a>
                      <span class="ci-title-split">回复</span> <a href="/user/space/${obj.puserInfo.userId}" target="_blank" card="${obj.puserInfo.nickName}" mid="299125409" class="parent-user">@${obj.puserInfo.nickName}</a> <span class="show-parent"><span style="" onclick="addDetailContent(this)">查看评论</span><span style="display: none;">收起评论</span></span></div>
                      <div class="ci-parent-reply" style="display: none"><a href="/user/space/${obj.puserInfo.userId}" target="_blank" card="${obj.puserInfo.nickName}" mid="299125409" class="cipr-avatar"><img src="${obj.puserInfo.userPic}"></a> <div class="cipr-head"><a href="/user/space/${obj.puserInfo.userId}" target="_blank" card="梦沉于海" mid="299125409">${obj.puserInfo.nickName}</a></div> <div class="cipr-content">${obj.pcomment.content}</div> <div class="cipr-footer">${obj.pcomment.createTime}</div></div>
                     <!----> <a href="/pv${obj.videoId}" target="_blank"><div class="ci-content">${obj.content}</div></a> 
                     <!----> <!----> <div class="ci-action"><span class="date">${obj.createTime}</span> 
                     <span class="like action"><a onclick="ajaxThumbsup(this,${obj.id})" data-reporter-id="173"`
                        if (obj.isthumbsup > 0) {
                            content += `style="color: rgb(0, 161, 214);"`
                        }
                        content += `><i class="bcc-iconfont bcc-icon-icon_action_recommend_line_n_"></i><span class="num">${obj.thumbsUpNum}</span></a></span> <span class="reply action"><a onclick='addReplyContent(this,${jsonString})' data-reporter-id="174">回复</a></span>
                      <span class="report action"><a data-reporter-id="175">举报</a></span> <span class="delete action"><a onclick="addDelModel(${obj.id})" data-reporter-id="176">删除</a></span></div> <!----> <!----></div>`
                    }

                    $(".section-list_wrap").append(content)
                }
                var pageUtil = {
                    index: data.currPageNo,
                    totalPageCount: data.totalPageCount,
                    totalCount: data.totalCount
                };
                flashPage(pageUtil);
            }
        })
    }

    $("#videoId").click(function () {
        $("#videoTitleList").slideToggle()
        flushTitle()
    })
    flushTitle = () => {
        $(".simplebar-content").empty()
        var selected = ""
        if ($("#videoId").attr("title") == 0) {
            selected = "selected"
        }
        $(".simplebar-content").append(`<li onclick="changeTitle(this)" data-v-6c40e918="" class="bcc-option ${selected}" value="0">
                                        <span>全部视频</span><i class="bcc-iconfont bcc-icon-ic_MenuButton-tick"></i></li>`)
        ajaxVideoTitle()
    }
    $("#titleSearchIcon").click(function () {
        flushTitle()
    })
    changeTitle = (obj) => {
        $("#videoId").val($(obj).find("span").text())
        $("#videoId").attr("title", $(obj).val())
        $("#videoTitleList").slideUp()
        $("#titleCurrPage").val("1")
        flushTitle()
        $(".bcc-table__align-left tbody").empty()
        $("#currPage").val(1)
        ajaxComment()
    }

    changeInput = function () {
        $("#currPage").val($("#changeInput").val())
        ajaxComment()
    }

    goto = curr => {
        if (curr <= 0) return;
        $("#currPage").val(curr)
        ajaxComment()
    }

    flashPage = pageUtil => {
        $(".bcc-pagination-container").empty();
        var pageDiv = $(".bcc-pagination-container");
        var pageContent = "<ul class=\"bcc-pagination\"><li onclick='goto(" + (pageUtil.index - 1) + ")'class=\"bcc-pagination-item bcc-pagination-previous\">上一页</li> ";
        for (var i = 1; i <= pageUtil.totalPageCount; i++) {
            if (i - pageUtil.index >= -5 && i - pageUtil.index <= 5) {
                if (i == pageUtil.index) {
                    pageContent = pageContent + "<li class='bcc-pagination-item selected'><a href='javascript:void(0)'>" + i + "</a></li>"
                } else {
                    pageContent = pageContent + "<li onclick='goto(" + (i) + ")' class='bcc-pagination-item'><a href='javascript:void(0)' >" + i + "</a></li>";
                }
            }
        }
        pageContent = pageContent + "<li  onclick='goto(" + (pageUtil.index + 1) + ")' class=\"bcc-pagination-item bcc-pagination-next\">下一页</li><li class=\"bcc-pagination-extra\"><div class=\"bcc-pagination-total\"> 共 <span id=\"totalPageCount\">" + pageUtil.totalPageCount + "</span> 页 / <span id=\"totalCount\">" + pageUtil.totalCount + "</span>个，</div><div class=\"bcc-pagination-elevator\"> 跳转至 <input onchange='changeInput()' id='changeInput' type=\"text\" autocomplete=\"off\"spellcheck=\"false\"> 页</div></li></ul> ";
        pageDiv.html(pageContent);

        if (pageUtil.index <= 1) {
            $(".bcc-pagination-previous").addClass("disabled").children("a").attr("onclick", null);
        }
        if (pageUtil.index >= pageUtil.totalPageCount) {
            $(".bcc-pagination-next").addClass("disabled").children("a").attr("onclick", null);
        }
    }

    changeTitleInContent = (obj) => {
        $("#videoId").val($(obj).attr("videoTitle"))
        $("#videoId").attr("title", $(obj).attr("videoId"))
        $("#titleCurrPage").val("1")
        flushTitle()
        $(".bcc-table__align-left tbody").empty()
        $("#currPage").val(1)
        ajaxComment()
    }
    ajaxComment()
})
$(document).bind('click', function (e) {
    var e = e || window.event; //浏览器兼容性
    var elem = e.target || e.srcElement;
    while (elem) { //循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id == 'videoTitleList' || elem.id == 'videoId') {
            return;
        }
        elem = elem.parentNode;
    }
    $("#videoTitleList").slideUp()
});
$(".search-list").scroll(function () {
    var scrollT = this.scrollTop;
    var scrollH = this.scrollHeight;
    var clientH = this.clientHeight;
    if (scrollT == scrollH - clientH) {
        if ($("#titleCurrPage").val() < $("#titleTotalPageCount").val()) {
            $("#titleCurrPage").val(Number($("#titleCurrPage").val()) + 1)
            ajaxVideoTitle()
        }
    } else if (scrollT == 0) {
        console.log("到顶部了");
    }
})