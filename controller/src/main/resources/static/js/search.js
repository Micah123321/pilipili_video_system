$(function () {
    initZone();
    initVideo();
})

function onKeyDown(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 27) { // 按 Esc
        //要做的事情
    }
    if (e && e.keyCode == 113) { // 按 F2
        //要做的事情
    }
    if (e && e.keyCode == 13) { // enter 键
        var videoTitle = $("input[type=text]").val();
        location.href = "/search/goSearch/" + videoTitle;
    }
}

function initZone() {
    var parentId = $("#categoryBy li[class='filter-item active']").attr("value");
    $.ajax({
        type: "get",
        url: "/search/category/" + parentId,
        dataType: "json",
        success: function (categoryList) {
            var ul = "<li class='filter-item active' value='1'><a href='javascript:;' style='text-decoration: none;' onclick='getCategoryTwo(0,0,0)'>全部分区</a></li>";
            for (var i = 0; i < categoryList.length; i++) {
                var category = categoryList[i];
                ul += "<li class='filter-item' value='" + category.id + "'><a href='javascript:;' onclick='getCategoryTwo("+category.id+",1)' style='text-decoration: none;'>" + category.categoryName + "</a></li>";
            }
            $("#categoryBy").html(ul);
        }
    })
}


function getCategoryTwo(id,ids) {
    var liobj = $("#categoryBy li");
    liobj.each(function () {
        $(this).click(function () {
            liobj.removeClass("active")
            $(this).addClass("active");
            var parentId = $("#categoryBy li[class='filter-item active']").attr("value");
            if (parentId != 1) {
                $.ajax({
                    type: "get",
                    url: "/search/category/" + parentId,
                    dataType: "json",
                    success: function (categoryList) {
                        $("#categoryBy li[class='sub-filter']").remove();
                        $(".icon-tid2-arr").remove();
                        var li = "<li style='top: 9px; left: 153px;' class='sub-filter' >" +
                            "<ul class='clearfix' id='twoCategory'>";
                        for (var i = 0; i < categoryList.length; i++) {
                            var category = categoryList[i];
                            li += "<li class='filter-item' value='" + category.id + "'><a href='javascript:;' onclick='getCategoryActive("+category.id+",2)' style='text-decoration: none;'>" + category.categoryName + "</a></li>";
                        }
                        li += "</ul></li>";
                        $("#categoryBy").append(li);
                    }
                })
            } else {
                $("#categoryBy li[class='sub-filter']").remove();
            }
        })
    })
    var orderName = $("#orderByName").val();
    var videoTime = $("#videoTime").val();
    var videoTimeEnd = $("#videoTimeEnd").val();
    var type = $("#type").val();
    if (id == "0") {
        $("#id1").val("");
        $("#id2").val("");
        $("#video-list").html("");
        common(orderName, videoTime, videoTimeEnd, type, "","");
    } else {
        $("#id1").val(id);
        $("#id2").val(ids);
        common(orderName, videoTime, videoTimeEnd, type, id,ids);
    }
}

function getCategoryActive(id,ids) {
    var liobj = $("#twoCategory li");
    liobj.each(function () {
        $(this).click(function () {
            liobj.removeClass("active");
            $(this).addClass("active");
        })
    })
    var id1 = $("#id1").val();
    var orderName = $("#orderByName").val();
    var videoTime = $("#videoTime").val();
    var videoTimeEnd = $("#videoTimeEnd").val();
    var type = $("#type").val();
    if (id1 == "0") {
        $("#id1").val("");
        $("#id2").val("");
        $("#video-list").html("");
        common(orderName, videoTime, videoTimeEnd, type, "","");
    } else {
        $("#id1").val(id);
        $("#id2").val(ids);
        common(orderName, videoTime, videoTimeEnd, type, id,ids);
    }
}

function getOrderBy(orderName) {
    var order = $("#order li");
    order.each(function () {
        $(this).click(function () {
            order.removeClass("active");
            $(this).addClass("active");
        })
    })
    var id1 = $("#id1").val();
    var id2 = $("#id2").val();
    var videoTime = $("#videoTime").val();
    var videoTimeEnd = $("#videoTimeEnd").val();
    var type = $("#type").val();
    if (orderName == "0") {
        $("#orderByName").val("");
        $("#video-list").html("");
        common("", videoTime, videoTimeEnd, type, id1,id2);
    } else {
        $("#orderByName").val(orderName);
        common(orderName, videoTime, videoTimeEnd, type, id1,id2);
    }
}

function getDurationBy(videoTime, videoTimeEnd, type) {
    var duration = $("#duration li");
    duration.each(function () {
        $(this).click(function () {
            duration.removeClass("active");
            $(this).addClass("active");
        })
    })
    var id1 = $("#id1").val();
    var id2 = $("#id2").val();
    var orderName = $("#orderByName").val();
    if (videoTime == "allTime") {
        $("#videoTime").val("");
        $("#videoTimeEnd").val("");
        $("#type").val("");
        $("#video-list").html("");
        common(orderName, "", "", "", id1,id2);
    } else {
        $("#videoTime").val(videoTime);
        $("#videoTimeEnd").val(videoTimeEnd);
        $("#type").val(type);
        common(orderName, videoTime, videoTimeEnd, type, id1,id2);
    }
}

function common(order, videoTime, videoTimeEnd, type, id,pid) {
    var videoTitle = $("#videoTitle").val();
    var url = "/search/common?videoTitle=" + videoTitle;
    if (order != null && order != "") {
        url += "&order=" + order;
    }
    if (videoTime != null && videoTime != "") {
        url += "&videoTime=" + videoTime;
    }
    if (videoTimeEnd != null && videoTimeEnd != "") {
        url += "&videoTimeEnd=" + videoTimeEnd;
    }
    if (type != null && type != "") {
        url += "&type=" + type;
    }
    if (id != null && id != "") {
        url += "&category=" + id;
    }
    if (pid != null && pid != "") {
        url += "&pid=" + pid;
    }
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        success: function (videosList) {
            var ul = "";
            for (var i = 0; i < videosList.length; i++) {
                var videos = videosList[i];
                ul += " <li style='border-radius: 10px;border: 1px solid #727272;' class='video-item matrix'>" +
                    " <a href='' title='" + videos.videoTitle + "' target='_blank' class='img-anchor'>" +
                    " <div class='img'><div class='lazy-img'><img class='img-rounded img-responsive' style='width: 320px;height: 200px' alt='' src='" + videos.videoImage + "'></div>" +
                    " <span class='so-imgTag_rb'>" + videos.videoTime + "</span>" +
                    " <div class='watch-later-trigger watch-later'></div>" +
                    " <span class='mask-video'></span></div>" +
                    " <!----></a><div class='info'><div class='headline clearfix'><!----><!----><span class='type hide'>videos.pCategory.categoryName</span><a title='" + videos.videoTitle + "' href='//www.bilibili.com/video/BV1ko4y1d7Jx?from=search&amp;seid=4552862550272992768' target='_blank' class='title'>" + videos.videoTitle + "</a></div>" +
                    "<div class='tags'><span title='观看' class='so-icon watch-num'><i class='icon-playtime'></i>" +
                    videos.videoPlay +
                    "</span><span title='弹幕' class='so-icon hide'><i class='icon-subtitle'></i>" +
                    videos.videoBarrage +
                    "</span><span title='上传时间' class='so-icon time'><i class='icon-date'></i>" +
                    videos.videoReleasetime + "\n" +
                    "</span><span title='up主' class='so-icon'><i class='icon-uper'></i><a href='//space.bilibili.com/22601190?from=search&amp;seid=4552862550272992768' target='_blank' class='up-name'>" + videos.pUser.userName + "</a></span></div>\n" +
                    "</div></li>";
            }
            $("#video-list").html(ul);
        }, error: function (r) {
            alert("错误")
        }
    })
}

function initVideo() {
    var videoTitle = $("#videoTitle").val();
    $.ajax({
        type: "get",
        url: "../../search/list/" + videoTitle,
        dataType: "json",
        success: function (videosList) {
            var ul = "";
            for (var i = 0; i < videosList.length; i++) {
                var videos = videosList[i];
                ul += " <li style='border-radius: 10px;border: 1px solid #727272;' class='video-item matrix'>" +
                    " <a href='' title='" + videos.videoTitle + "' target='_blank' class='img-anchor'>" +
                    " <div class='img'><div class='lazy-img'><img class='img-rounded img-responsive' style='width: 320px;height: 200px' alt='' src='" + videos.videoImage + "'></div>" +
                    " <span class='so-imgTag_rb'>" + videos.videoTime + "</span>" +
                    " <div class='watch-later-trigger watch-later'></div>" +
                    " <span class='mask-video'></span></div>" +
                    " <!----></a><div class='info'><div class='headline clearfix'><!----><!----><span class='type hide'>videos.pCategory.categoryName</span><a title='" + videos.videoTitle + "' href='//www.bilibili.com/video/BV1ko4y1d7Jx?from=search&amp;seid=4552862550272992768' target='_blank' class='title'>" + videos.videoTitle + "</a></div>" +
                    "<div class='tags'><span title='观看' class='so-icon watch-num'><i class='icon-playtime'></i>" +
                    videos.videoPlay + "\n" +
                    "</span><span title='弹幕' class='so-icon hide'><i class='icon-subtitle'></i>" +
                    "263\n" +
                    "</span><span title='上传时间' class='so-icon time'><i class='icon-date'></i>" +
                    videos.videoReleasetime + "\n" +
                    "</span><span title='up主' class='so-icon'><i class='icon-uper'></i><a href='//space.bilibili.com/22601190?from=search&amp;seid=4552862550272992768' target='_blank' class='up-name'>" + videos.pUser.userName + "</a></span></div>\n" +
                    "</div></li>";
            }
            $("#video-list").append(ul);
        }, error: function (data) {
            alert("错误")
        }
    })
}


