$(function () {
    function changeCurr(obj) {
        $("#currPage").val($(obj).find("a").html())
    }

    //获取视频列表方法
    getTypeData = function () {
        $.ajax({
            url: "admin/creative/typedata",
            type: "get",
            dataType: "json",
            success: function (data) {
                var tbody = $("#videoType");
                tbody.empty();
                for (var i = 0; i < data.length; i++) {
                        tbody.append("<option value='" + data[i].id + "'>" + data[i].categoryName + "(" + data[i].count + ")</option>")
                }
            }
        });
    }

    getVideoDataDontChange = function () {
        var videoTitle = $(".bcc-search-input").val();
        var videoState = $(".current").attr("state");
        var orderBy = $("#orderBy").val();
        var videoType = $("#videoType").val();
        var currPage = $("#currPage").val();

        $.ajax({
            url: "admin/creative/data",
            type: "get",
            dataType: "json",
            data: {
                "videoTitle": videoTitle,
                "videoState": videoState,
                "orderBy": orderBy,
                "currPage": currPage,
                "videoType": videoType,
                "videoStateCode":1
            },
            success: function (data) {
                var tbody = $(".article-list_wrap");
                tbody.empty();
                loadAjaxPage(data.dataList,tbody)
                var pageUtil = {
                    index: data.index,
                    totalPageCount: data.totalPageCount,
                    totalCount: data.totalCount
                };
                flashPage(pageUtil);
            },
        });
    }

    loadAjaxPage=function (dataList,tbody) {
        for (var i = 0; i < dataList.length; i++) {
            //显示产品数据
            if (dataList[i].videoState == 1) {
                tbody.append("<div data-v-70ed43e6=''><div data-v-70ed43e6=''><div class='article-card clearfix v2'><a target='_blank'href='//www.bilibili.com/video/BV1cs411J7jN/'class='cover-wrp'><img src='" + dataList[i].videoImage + "' alt='" + dataList[i].videoTitle + "'class=''> <div class='duration'>" + dataList[i].videoTime + "</div> <div class='tag-wrapper'></div> </a> <div class='meta-wrp'> <div class='meta-title'><!----><a target='_blank' href='//www.bilibili.com/video/BV1cs411J7jN/' class='nameellipsis'>" + dataList[i].videoTitle + "</a> </div> <div class='meta-status'> <div><span class='pubdate'>" + dataList[i].videoReleasetime + "</span></div> <div data-hint='' class='status hint--rounded hint--bottom v2 is-error is-pubdate'> <div class='icon-wrap'> </div>  </div> </div> <div class='meta-view'><a onclick=\"toEdit('"+dataList[i].videoPv+"')\" class='bili-btn'><i class='bcc-iconfont bcc-icon-icon_list_ranking_x1' style='font-size:16px;color:rgb(80,80,80);'></i> 编辑 </a><a onclick='delVideo("+dataList[i].videoPv+")' class='bili-btn'><i class='bcc-iconfont bcc-icon-icon_tasklist_delete_' style='font-size:16px;color:rgb(80,80,80);'></i> 删除 </a><a class='more-btn disabled'><iclass='bcc-iconfont bcc-icon-icon_list_more_x' style='font-size:16px;color:rgb(80,80,80);'></i></a> </div> <div class='meta-footer clearfix'> <div title='播放'class='click view-stat'><i class='bcc-iconfont bcc-icon-ic_Playbackx' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text click-text'>" + dataList[i].videoPlay + "</span></div> <div title='弹幕'class='danmu view-stat'><i class='bcc-iconfont bcc-icon-ic_Barragex' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoBarrage + "</span></div> <div title='评论'class='comment view-stat'><i class='bcc-iconfont bcc-icon-icon_commentx' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoComment + "</span></div> <div title='收藏'class='favorite view-stat'><i class='bcc-iconfont bcc-icon-icon_action_collection_n_x' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoCollect + "</span></div> <div title='点赞'class='like view-stat'><i class='bcc-iconfont bcc-icon-icon_action_recommend_p_' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoLike + "</span></div> </div> </div></div></div> </div>");
            } else if (dataList[i].videoState >= 2) {
                tbody.append("<div data-v-70ed43e6=''><div data-v-70ed43e6=''><div class='article-card clearfix v2'><a target='_blank'href='//www.bilibili.com/video/BV1cs411J7jN/'class='cover-wrp'><img src='" + dataList[i].videoImage + "' alt='" + dataList[i].videoTitle + "'class=''> <div class='duration'>" + dataList[i].videoTime + "</div> <div class='tag-wrapper'></div> </a> <div class='meta-wrp'> <div class='meta-title'><!----><a target='_blank' href='//www.bilibili.com/video/BV1cs411J7jN/' class='nameellipsis'>" + dataList[i].videoTitle + "</a> </div> <div class='meta-status'> <div><span class='pubdate'>" + dataList[i].videoReleasetime + "</span></div> <div data-hint='' class='status hint--rounded hint--bottom v2 is-error is-pubdate'> <div class='icon-wrap'><i class='bcc-iconfont bcc-icon-ic_warning'></i> </div> <div><span class='icon-text'>已锁定</span><span class='icon-text' >该视频违反运营规则，不予审核通过。 </span><span class='treaty'> 查阅<a href='//member.bilibili.com/studio/creative-treaty'target='_blank'>哔哩哔哩创作公约</a>了解更多 </span><!----></div> </div> </div> <div class='meta-view'><a class='bili-btn'><i class='bcc-iconfont bcc-icon-Mediumx1' style='font-size:16px;color:rgb(80,80,80);'></i> 申诉 </a><a onclick='delVideo("+dataList[i].videoPv+")' class='bili-btn'><i class='bcc-iconfont bcc-icon-icon_tasklist_delete_' style='font-size:16px;color:rgb(80,80,80);'></i> 删除 </a><a class='more-btn disabled'><i class='bcc-iconfont bcc-icon-icon_list_more_x' style='font-size:16px;color:rgb(80,80,80);'></i></a> </div> <div class='meta-footer clearfix'> <div title='播放'class='click view-stat'><i class='bcc-iconfont bcc-icon-ic_Playbackx' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text click-text'>" + dataList[i].videoPlay + "</span></div> <div title='弹幕'class='danmu view-stat'><i class='bcc-iconfont bcc-icon-ic_Barragex' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoBarrage + "</span></div> <div title='评论'class='comment view-stat'><i class='bcc-iconfont bcc-icon-icon_commentx' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoComment + "</span></div> <div title='收藏'class='favorite view-stat'><i class='bcc-iconfont bcc-icon-icon_action_collection_n_x' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoCollect + "</span></div> <div title='点赞'class='like view-stat'><i class='bcc-iconfont bcc-icon-icon_action_recommend_p_' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoLike + "</span></div> </div> </div></div></div> </div>");
            } else if(dataList[i].videoState == 0){
                tbody.append("<div data-v-70ed43e6=''><div data-v-70ed43e6=''><div class='article-card clearfix v2'><a target='_blank'href='//www.bilibili.com/video/BV1cs411J7jN/'class='cover-wrp'><img src='" + dataList[i].videoImage + "' alt='" + dataList[i].videoTitle + "'class=''> <div class='duration'>" + dataList[i].videoTime + "</div> <div class='tag-wrapper'></div> </a> <div class='meta-wrp'> <div class='meta-title'><!----><a target='_blank' href='//www.bilibili.com/video/BV1cs411J7jN/' class='nameellipsis'>" + dataList[i].videoTitle + "</a> </div> <div class='meta-status'> <div><span class='pubdate'>" + dataList[i].videoReleasetime + "</span></div> <div data-hint='' class='status hint--rounded hint--bottom v2 is-error is-pubdate'> <div class='icon-wrap'><i class='bcc-iconfont bcc-icon-bianjigaojian'></i> </div> <div><span class='icon-text' style='color: #666'>审核中</span><span class='icon-text' style='color: black'> 该视频正在审核中哦   </span></div> </div> </div> <div class='meta-view'><a onclick=\"toEdit('"+dataList[i].videoPv+"')\" class='bili-btn'><i class='bcc-iconfont bcc-icon-Mediumx1' style='font-size:16px;color:rgb(80,80,80);'></i> 修改 </a><a onclick='delVideo("+dataList[i].videoPv+")' class='bili-btn'><i class='bcc-iconfont bcc-icon-icon_tasklist_delete_' style='font-size:16px;color:rgb(80,80,80);'></i> 删除 </a><a class='more-btn disabled'><iclass='bcc-iconfont bcc-icon-icon_list_more_x' style='font-size:16px;color:rgb(80,80,80);'></i></a> </div> <div class='meta-footer clearfix'> <div title='播放'class='click view-stat'><i class='bcc-iconfont bcc-icon-ic_Playbackx' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text click-text'>" + dataList[i].videoPlay + "</span></div> <div title='弹幕'class='danmu view-stat'><i class='bcc-iconfont bcc-icon-ic_Barragex' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" +dataList[i].videoBarrage + "</span></div> <div title='评论'class='comment view-stat'><i class='bcc-iconfont bcc-icon-icon_commentx' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoComment + "</span></div> <div title='收藏'class='favorite view-stat'><i class='bcc-iconfont bcc-icon-icon_action_collection_n_x' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoCollect + "</span></div> <div title='点赞'class='like view-stat'><i class='bcc-iconfont bcc-icon-icon_action_recommend_p_' style='font-size:16px;color:rgb(153,153,153);'></i><span class='icon-text'>" + dataList[i].videoLike + "</span></div> </div> </div></div></div> </div>");
            }
        }
    }
    toEdit=function (pv) {
        ajaxUtil.pagetopage('uploadInfo/'+pv);
        $(".menu_li").removeClass("menu_li_select")
    }

    getVideoTypeData = function (flag) {
        var videoTitle = $(".bcc-search-input").val();
        var videoState = $(".current").attr("state");
        var orderBy = $("#orderBy").val();
        var videoType = $("#videoType").val();
        var currPage = 1;

        $.ajax({
            url: "admin/creative/data",
            type: "get",
            dataType: "json",
            data: {
                "videoTitle": videoTitle,
                "videoState": videoState,
                "orderBy": orderBy,
                "currPage": currPage,
                "videoType": videoType
            },
            success: function (data) {
                var tbody = $(".article-list_wrap");
                tbody.empty();
                var warnvideos = 0;
                var checkvideos = 0;
                var uncheckvideos = 0;
                for (var i = 0; i < data.allDataList.length; i++) {
                    if (data.allDataList[i].videoState == 1) {
                        checkvideos++;
                    } else if (data.allDataList[i].videoState >= 2) {
                        warnvideos++;
                    } else {
                        uncheckvideos++;
                    }
                }
                loadAjaxPage(data.dataList,tbody)
                $("#videosCount").html(data.totalCount);
                $("#warnvideos").html(warnvideos);
                $("#checkvideos").html(checkvideos);
                $("#uncheckvideos").html(uncheckvideos);
                var totalCountsz=[];
                var totalCount=0;
                if (videoState!=-1){
                     totalCountsz=[uncheckvideos,checkvideos,warnvideos]
                     totalCount=totalCountsz[videoState]
                }else{
                    totalCount=data.totalCount
                }
                var pageSize=data.pageSize;
                var totalPageCount = totalCount % pageSize == 0 ? (totalCount / pageSize) : (totalCount / pageSize + 1)
                var index=data.index
                if (totalPageCount<data.totalPageCount){
                    index=1
                }
                if (flag){
                    var pageUtil = {
                        index: index,
                        totalPageCount: Math.floor(totalPageCount),
                        totalCount: Math.floor(totalCount)
                    };
                    flashPage(pageUtil);
                }
            },
            beforeSend: function () {
                $("#btn_login").val("获取中...");
            },
            error: function (data) {

            }
        });
    }

    getVideoData = function (flag) {
        var videoTitle = $(".bcc-search-input").val();
        var videoState = $(".current").attr("state");
        var orderBy = $("#orderBy").val();
        var videoType = $("#videoType").val();
        var currPage = $("#currPage").val();

        $.ajax({
            url: "admin/creative/data",
            type: "get",
            dataType: "json",
            data: {
                "videoTitle": videoTitle,
                "videoState": videoState,
                "orderBy": orderBy,
                "currPage": currPage,
                "videoType": videoType
            },
            success: function (data) {
                var tbody = $(".article-list_wrap");
                tbody.empty();
                var warnvideos = 0;
                var checkvideos = 0;
                var uncheckvideos = 0;
                for (var i = 0; i < data.allDataList.length; i++) {
                    if (data.allDataList[i].videoState == 1) {
                        checkvideos++;
                    } else if (data.allDataList[i].videoState >= 2) {
                        warnvideos++;
                    } else {
                        uncheckvideos++;
                    }
                }
                loadAjaxPage(data.dataList,tbody)
                $("#videosCount").html(data.totalCount);
                $("#warnvideos").html(warnvideos);
                $("#checkvideos").html(checkvideos);
                $("#uncheckvideos").html(uncheckvideos);
                if (flag){
                    var pageUtil = {
                        index: data.index,
                        totalPageCount: data.totalPageCount,
                        totalCount: data.totalCount
                    };
                    flashPage(pageUtil);
                }
            },
            beforeSend: function () {
                $("#btn_login").val("获取中...");
            },
            error: function (data) {

            }
        });
    }

    function flashPage(pageUtil) {
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
        pageContent = pageContent + "<li  onclick='goto(" + (pageUtil.index + 1) + ")' class=\"bcc-pagination-item bcc-pagination-next\">下一页</li><li class=\"bcc-pagination-extra\"><div class=\"bcc-pagination-total\"> 共 <span id=\"totalPageCount\">" + pageUtil.totalPageCount + "</span> 页 / <span id=\"totalCount\">"+pageUtil.totalCount+"</span>个，</div><div class=\"bcc-pagination-elevator\"> 跳转至 <input onchange='changeInput()' id='changeInput' type=\"text\" autocomplete=\"off\"spellcheck=\"false\"> 页</div></li></ul> ";
        pageDiv.html(pageContent);

        if (pageUtil.index <= 1) {
            $(".bcc-pagination-previous").addClass("disabled").children("a").attr("onclick", null);
        }
        if (pageUtil.index >= pageUtil.totalPageCount) {
            $(".bcc-pagination-next").addClass("disabled").children("a").attr("onclick", null);
        }
    }

    $(".txt-item").click(function (){
        $(".txt-item").removeClass("current");
        $(this).addClass("current");
        getVideoDataDontChange();
    })

    $(".bcc-pagination-item").click(function () {
        changeCurr(this);
        getVideoData(true);

    })
    changeInput = function () {
        $("#currPage").val($("#changeInput").val())
        getVideoData(true)
    }

    delVideo=function (pid) {
        if(confirm("确定删除该视频吗")){
        $.ajax({
            url:  "/video/del",
            type: "get",
            dataType: "text",
            data: {
                "pid":pid
            },
            success: function (data) {
                    if (data=="ok"){
                        alert("删除成功")
                        getVideoData(false);
                        getTypeData()
                    }else{
                        alert("删除失败")
                    }
            }
        });}
    }

    getVideoData(true);

    getTypeData();
})

function goto(curr) {
    if (curr <= 0) return;
    $("#currPage").val(curr)
    getVideoDataDontChange()
}
