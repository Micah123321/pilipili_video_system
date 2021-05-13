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

    ajaxComment = () => {
        var currPage = $("#currPage").val();
        var videoId = $("#videoId").attr("title");
        var content = $("#context").val();
        var orderBy = 0;
        var selectDay = 0;
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

                    var content=`<div data-v-76b62926="" class="comment-list-item">
                    <div class="check-box"><i class="bcc-iconfont bcc-icon-ic_MenuButton-tick"></i></div> 
                    <a href="/user/space/${obj.userId}" mid="527603216" target="_blank" card="GTnb233" class="user-avatar" data-reporter-id="171">
                    <img src="${obj.userPic}"></a> 
                    <div class="article-wrap"><a href="/pv${obj.videoId}" target="_blank" class="pic" data-reporter-id="172">
                    <img src="${obj.videoImage}"></a> 
                    <!----> <!----> <a href="/pv${obj.videoId}" class="title ellipsis">
                    <span class="name">${obj.videoTitle}</span><span class="show-all">该视频全部评论</span></a> <!----> <!----></div> <div class="ci-title"><span class="relation-label" style="display: none;">已充电</span>
                     <span `
                    if (!obj.isfans){
                        content+=`style="display: none;"`
                    }
                    content+=`class="relation-label">粉丝</span>
                      <a href="/user/space/${obj.userId}" mid="527603216" card="GTnb233" target="_blank">${obj.nickName}</a>
                      <!----> <!----> <!----> <!----></div>
                     <!----> <a href="/pv${obj.videoId}" target="_blank"><div class="ci-content">${obj.content}</div></a> 
                     <!----> <!----> <div class="ci-action"><span class="date">${obj.createTime}</span> 
                     <span class="like action"><a data-reporter-id="173"`
                        if(obj.isthumbsup>0){
                            content+=`style="color: rgb(0, 161, 214);"`
                        }
                        content+=`><i class="bcc-iconfont bcc-icon-icon_action_recommend_line_n_"></i><span class="num"></span></a></span> <span class="reply action"><a data-reporter-id="174">回复</a></span>
                      <span class="report action"><a data-reporter-id="175">举报</a></span> <span class="delete action"><a data-reporter-id="176">删除</a></span></div> <!----> <!----></div>`

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

    goto=curr=> {
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