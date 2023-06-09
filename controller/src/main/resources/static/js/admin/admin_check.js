$(function () {
    changeCurr = obj => {
        $("#currPage").val($(obj).find("a").html())
    }

    //获取视频分类
    getTypeData = () => {
        $.ajax({
            url: "admin/creative/typedata",
            type: "get",
            dataType: "json",
            data: {
                uid: 0,
                videoState: 0
            },
            success: function (data) {
                var tbody = $("#videoType");
                tbody.empty();
                for (var i = 0; i < data.length; i++) {
                    tbody.append("<option value='" + data[i].id + "'>" + data[i].categoryName + "(" + data[i].count + ")</option>")
                }
            }
        });
    }

    getVideoDataDontChange = () => {
        var videoTitle = $(".bcc-search-input").val();
        var videoState = $(".current").attr("state");
        var orderBy = $("#orderBy").val();
        var videoType = $("#videoType").val();
        var currPage = $("#currPage").val();

        $.ajax({
            url: "admin/check/data",
            type: "get",
            dataType: "json",
            data: {
                videoTitle,
                videoState,
                orderBy,
                currPage,
                videoType,
                videoStateCode: 1
            },
            success: function (data) {
                var tbody = $(".article-list_wrap");
                tbody.empty();
                loadAjaxPage(data.dataList, tbody)
                var pageUtil = {
                    index: data.index,
                    totalPageCount: data.totalPageCount,
                    totalCount: data.totalCount
                };
                flashPage(pageUtil);
            },
        });
    }

    loadAjaxPage = (dataList, tbody) => {
        for (var i = 0; i < dataList.length; i++) {
            var obj=dataList[i]
            //显示产品数据
            tbody.append(`<div data-v-70ed43e6=""><div data-v-70ed43e6=""><div class="article-card clearfix v2"><a target="_blank" href="/pv${obj.videoPv}" class="cover-wrp"><img src="${obj.videoImage}" alt="${obj.videoTitle}" class=""> <div class="duration">${obj.videoTime}</div> <div class="tag-wrapper"></div> </a> <div class="meta-wrp"> <div class="meta-title"><!----><a target="_blank" href="/pv${obj.videoPv}" class="nameellipsis">${obj.videoTitle}</a> </div> <div class="meta-status"> <div><span class="pubdate">${obj.videoUpdatetime}</span></div> <div data-hint="" class="status hint--rounded hint--bottom v2 is-error is-pubdate"> <div class="icon-wrap"><i class="bcc-iconfont bcc-icon-bianjigaojian"></i> </div> <div><span class="icon-text" style="color: #666">审核中</span><span class="icon-text" style="color: black"> 该视频正在审核中哦   </span></div> </div> </div> <div class="meta-view"><a onclick="toCheck('${obj.videoPv}')" class="bili-btn"><i class="bcc-iconfont bcc-icon-Mediumx1" style="font-size:16px;color:rgb(80,80,80);"></i> 审核 </a><a onclick="addDelModel(${obj.videoPv})" class="bili-btn"><i class="bcc-iconfont bcc-icon-icon_tasklist_delete_" style="font-size:16px;color:rgb(80,80,80);"></i> 删除 </a><a class="more-btn disabled"><iclass='bcc-iconfont bcc-icon-icon_list_more_x'="" style="font-size:16px;color:rgb(80,80,80);"></iclass='bcc-iconfont></a> </div> <div class="meta-footer clearfix"> <div title="播放" class="click view-stat"><i class="bcc-iconfont bcc-icon-ic_Playbackx" style="font-size:16px;color:rgb(153,153,153);"></i><span class="icon-text click-text">${obj.videoPlayChar}</span></div> <div title="弹幕" class="danmu view-stat"><i class="bcc-iconfont bcc-icon-ic_Barragex" style="font-size:16px;color:rgb(153,153,153);"></i><span class="icon-text">${obj.videoBarrage}</span></div> <div title="评论" class="comment view-stat"><i class="bcc-iconfont bcc-icon-icon_commentx" style="font-size:16px;color:rgb(153,153,153);"></i><span class="icon-text">${obj.videoComment}</span></div> <div title="收藏" class="favorite view-stat"><i class="bcc-iconfont bcc-icon-icon_action_collection_n_x" style="font-size:16px;color:rgb(153,153,153);"></i><span class="icon-text">${obj.videoCollect}</span></div> <div title="点赞" class="like view-stat"><i class="bcc-iconfont bcc-icon-icon_action_recommend_p_" style="font-size:16px;color:rgb(153,153,153);"></i><span class="icon-text">${obj.videoLike}</span></div> </div> </div></div></div> </div>`);
        }
    }
    toCheck = pv => {
        ajaxUtil.pagetopage('checkDetail?pid=' + pv);
        $(".menu_li").removeClass("menu_li_select")
    }


    getVideoTypeData = flag => {
        var videoTitle = $(".bcc-search-input").val();
        var videoState = $(".current").attr("state");
        var orderBy = $("#orderBy").val();
        var videoType = $("#videoType").val();
        var currPage = 1;

        $.ajax({
            url: "admin/check/data",
            type: "get",
            dataType: "json",
            data: {
                videoTitle,
                videoState,
                orderBy,
                currPage,
                videoType
            },
            success: function (data) {
                var tbody = $(".article-list_wrap");
                tbody.empty();
                loadAjaxPage(data.dataList, tbody)
                $("#videosCount").html(data.totalCount);
                var totalCountsz = [];
                var totalCount;
                if (videoState != -1) {
                    totalCountsz = [uncheckvideos, checkvideos, warnvideos]
                    totalCount = totalCountsz[videoState]
                } else {
                    totalCount = data.totalCount
                }
                var pageSize = data.pageSize;
                var totalPageCount = totalCount % pageSize == 0 ? (totalCount / pageSize) : (totalCount / pageSize + 1)
                var index = data.index
                if (totalPageCount < data.totalPageCount) {
                    index = 1
                }
                if (flag) {
                    var pageUtil = {
                        index: index,
                        totalPageCount: Math.floor(totalPageCount),
                        totalCount: Math.floor(totalCount)
                    };
                    flashPage(pageUtil);
                }
            }
        });
    }

    getVideoData = flag => {
        var videoTitle = $(".bcc-search-input").val();
        var videoState = $(".current").attr("state");
        var orderBy = $("#orderBy").val();
        var videoType = $("#videoType").val();
        var currPage = $("#currPage").val();

        $.ajax({
            url: "admin/check/data",
            type: "get",
            dataType: "json",
            data: {
                videoTitle,
                videoState,
                orderBy,
                currPage,
                videoType
            },
            success: function (data) {
                var tbody = $(".article-list_wrap");
                tbody.empty();
                loadAjaxPage(data.dataList, tbody)
                $("#videosCount").html(data.totalCount);
                if (flag) {
                    var pageUtil = {
                        index: data.index,
                        totalPageCount: data.totalPageCount,
                        totalCount: data.totalCount
                    };
                    flashPage(pageUtil);
                }
            }
        });
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

    $(".bcc-pagination-item").click(function () {
        changeCurr(this);
        getVideoData(true);

    })
    changeInput = function () {
        $("#currPage").val($("#changeInput").val())
        getVideoData(true)
    }

    addDelModel = (pid) => {
        piliModel("删除提醒", "删除后无法恢复，确认删除该视频吗？", "article-v2-wrap", delVideo, pid)
    }

    delVideo = (pid) => {
        $.ajax({
            url: "/video/del",
            type: "get",
            dataType: "text",
            data: {
                "pid": pid
            },
            success: function (data) {
                if (data == "ok") {
                    getVideoData(false);
                    getTypeData()
                }
            },
            error: function (data) {
                piliModel("错误信息", "删除失败，请之后再试", "article-v2-wrap", function (e) {
                    console.log(e)
                }, data)
            }
        })
    }

    getVideoData(true);

    getTypeData();
})

goto = curr => {
    if (curr <= 0) return;
    $("#currPage").val(curr)
    getVideoDataDontChange()
}
