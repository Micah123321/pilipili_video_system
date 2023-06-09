$(function () {
    ajaxSub = () => {
        var subId = $("#userId").val()
        $.ajax({
            url: "/sub/sub",
            type: "get",
            data: {
                subId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 0) ajaxIsSub()
                else alert(data.message)
            }
        })
    }
    ajaxDelSub = () => {
        var subId = $("#userId").val()
        $.ajax({
            url: "/sub/del",
            type: "get",
            data: {
                subId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 0) ajaxIsSub()
                else alert(data.message)
            }
        })
    }
    ajaxAddThumbsup = () => {
        var videoId = $("#pv").val()
        $.ajax({
            url: "/detail/addThumbsup",
            type: "get",
            data: {
                videoId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 0) ajaxThumbsup()
                else alert(data.message)
            },
            error:function () {
                alert("请先登录账号")
            }
        })
    }
    ajaxDelThumbsup = () => {
        var videoId = $("#pv").val()
        $.ajax({
            url: "/detail/delThumbsup",
            type: "get",
            data: {
                videoId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 0) ajaxThumbsup()
                else alert(data.message)
            }
        })
    }
    ajaxThumbsup = () => {
        var videoId = $("#pv").val()
        $.ajax({
            url: "/detail/thumbsup",
            type: "get",
            data: {
                videoId
            },
            dataType: "json",
            success: function (data) {
                if (data.isThumbsup) {
                    $(".ops .like").html(`<i class="van-icon-videodetails_like" style="color:;"></i>${data.num}</span>`)
                    $(".ops .like").addClass("on")
                    $(".ops .like").attr("onclick", "ajaxDelThumbsup()")
                } else {
                    $(".ops .like").html(`<i class="van-icon-videodetails_like" style="color:;"></i>${data.num}</span>`)
                    $(".ops .like").removeClass("on")
                    $(".ops .like").attr("onclick", "ajaxAddThumbsup()")
                }
            }
        })
    }
    ajaxIsSub = () => {
        $.ajax({
            url: "/detail/getinfo",
            type: "get",
            data: {
                "pv": $("#pv").val()
            },
            dataType: "json",
            success: function (data) {
                $(".btn-panel").empty()
                if (data.isSub) {
                    $(".btn-panel").append(`<div onclick="ajaxDelSub()" class="default-btn follow-btn btn-transition b-gz following" style=""><!----><span> <span class="already-btn van-popover__reference" aria-describedby="van-popover-7058" tabindex="0">
          已关注
          <span>${data.userInfo.fansNum}</span><i class="van-icon-general_pulldown_s"></i></span></span></div>`)
                } else {
                    $(".btn-panel").append(`<div onclick="ajaxSub()" class="default-btn follow-btn btn-transition b-gz not-follow" style=""><span class="has-charge"><i class="van-icon-general_addto_s"></i>
          关注
          <span>${data.userInfo.fansNum}</span></span><!----></div>`)
                }
            }
        })
    }
    ajaxSetHistory=()=>{
        var viewSecond=$(".yzmplayer-ptime").text()
        if (viewSecond==""||viewSecond==null){
            viewSecond="00:00:00"
        }
        $.ajax({
            url: "/history/post",
            type: "post",
            data: {
                videoId: $("#pv").val(),
                viewSecond
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 0)
                    console.log("记录历史")
            }
        })
    }

    ajaxUpdatePlay = () => {
        var second = $(".yzmplayer-dtime").text()
        var videoTimeSecond = time_to_sec(second)
        $.ajax({
            url: "/detail/updatePlay",
            type: "get",
            data: {
                "videoPv": $("#pv").val(),
                videoTimeSecond
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 0)
                    console.log("添加播放成功")
            }
        })
    }
    ajaxGetVideoInfo = () => {
        $.ajax({
            url: "/detail/getinfo",
            type: "get",
            data: {
                "pv": $("#pv").val()
            },
            dataType: "json",
            success: function (data) {
                $(".btn-panel").empty()
                if (data.isSub) {
                    $(".btn-panel").append(`<div onclick="ajaxDelSub()" class="default-btn follow-btn btn-transition b-gz following" style=""><!----><span> <span class="already-btn van-popover__reference" aria-describedby="van-popover-7058" tabindex="0">
          已关注
          <span>${data.userInfo.fansNum}</span><i class="van-icon-general_pulldown_s"></i></span></span></div>`)
                } else {
                    $(".btn-panel").append(`<div onclick="ajaxSub()" class="default-btn follow-btn btn-transition b-gz not-follow" style=""><span class="has-charge"><i class="van-icon-general_addto_s"></i>
          关注
          <span>${data.userInfo.fansNum}</span></span><!----></div>`)
                }

                $(".video-title span").text(data.video.videoTitle)
                $('title').text(data.video.videoTitle + "_霹雳霹雳 (゜-゜)つロ 干杯~-pilipili")
                $(".video-data>.view").text(data.video.videoPlayChar + "播放")
                $(".video-data>.dm").text(data.video.videoBarrage + "弹幕")
                $(".video-data>.videoTime").text(data.video.videoReleasetime)
                $(".video-data>.rank").text("")
                $(".u-face>.fa").attr("ref", "/space/" + data.userInfo.userId)
                $(".u-face  .bili-avatar-img-radius").attr("src", data.userInfo.userPic)
                $(".up-info_right  .username.is_vip").attr("href", "/space/" + data.userInfo.userId)
                $("#userId").val(data.userInfo.userId)
                $(".up-info_right  .username.is_vip").text(data.userInfo.nickName)
                $(".up-info_right  .desc").text(data.userInfo.upDesc)
                $(".has-charge>span").text(data.userInfo.fansNum)
                $("#v_desc .info").text(data.video.videoDesc)
                $("#url").text(data.video.videoUrl)
                $("#type").text(data.video.videoType)
                var type = data.video.typeName
                var typeList = type.split("<--")
                $(".tag-area.clearfix").html("<li class=\"tag\">\n" +
                    "                        <div><a href=\"/categoryinfo/" + data.video.videoParentType + "\" target=\"_blank\" class=\"tag-link\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAP5JREFUOBGllD0OwjAMhV9yGcTOisRFegwWJJgQS4/RiyCxdkdcJiFuGtX9ceJAJtf5/OQkfjUore5zhHfngB1GtIexLZrdK1dqcpvo3hd43OH9gjMOFlc0+4dUvyhgGHXq3BPwlmVZSOL2JHUuFIX64fiSKOmHvXhF9LFasvB0p6silkj3zlIxzAmv4JpETrhXCImMLEwjhfBA4gp7A7MNyMI0p8bctsXTuMmzLI9bauRvg9QKFPjYca3DFLxBrcOU/OieCocpHUlTIbonvd+CUfHyuDHVX0ISFt3DBDnDY4bMwt5G91Q4TOlIO/xPaxymdOTkvMLAzw5KHwX+Czr/jXvbTvs/AAAAAElFTkSuQmCC\" width=\"32\" height=\"32\" class=\"channel-icon\"><span class=\"channel-name\">" + typeList[0] + "</span></a>\n" +
                    "                            <!----></div>\n" +
                    "                    </li>" + "<li class=\"tag\">\n" +
                    "                        <div><a href=\"/categoryinfo/" + data.video.videoParentType + "/" + data.video.videoType + "\" target=\"_blank\" class=\"tag-link\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAP5JREFUOBGllD0OwjAMhV9yGcTOisRFegwWJJgQS4/RiyCxdkdcJiFuGtX9ceJAJtf5/OQkfjUore5zhHfngB1GtIexLZrdK1dqcpvo3hd43OH9gjMOFlc0+4dUvyhgGHXq3BPwlmVZSOL2JHUuFIX64fiSKOmHvXhF9LFasvB0p6silkj3zlIxzAmv4JpETrhXCImMLEwjhfBA4gp7A7MNyMI0p8bctsXTuMmzLI9bauRvg9QKFPjYca3DFLxBrcOU/OieCocpHUlTIbonvd+CUfHyuDHVX0ISFt3DBDnDY4bMwt5G91Q4TOlIO/xPaxymdOTkvMLAzw5KHwX+Czr/jXvbTvs/AAAAAElFTkSuQmCC\" width=\"32\" height=\"32\" class=\"channel-icon\"><span class=\"channel-name\">" + typeList[1] + "</span></a>\n" +
                    "                            <!----></div>\n" +
                    "                    </li>")
                $(".ops").html("<span title=\"点赞数" + data.video.videoLike + "\" class=\"like\"><!----><!----><!----><!----><i class=\"van-icon-videodetails_like\" style=\"color:;\"></i>" + data.video.videoLike + "\n" +
                    "    </span>" + "<span title=\"收藏人数\" class=\"collect\"><canvas width=\"34\" height=\"34\" class=\"ring-progress\" style=\"width:34px;height:34px;left:-3px;top:-3px;\"></canvas>\n" +
                    "                    <!----><i class=\"van-icon-videodetails_collec\" style=\"color:;\"></i>" + data.video.videoCollect + "\n" +
                    "    </span>")

            },
            error:function () {
                $.ajax({
                    url: "/pv404",
                    type: "get",
                    contentType: "text/html;charset=UTF-8",
                    success: function (data) {
                            $(".container").html(data)
                            $("body").css("background","#f4f5f7")
                    }
                })
            }
        })
    }
    ajaxVideoInfo = () => {
        $.ajax({
            url: "/category/videoInfo",
            type: "get",
            dataType: "json",
            data: {
                videoType: $("#type").val()
            },
            success: function (data) {
                var tbody = $(".rec-list");
                tbody.empty()
                for (var i = 0; i < data.length; i++) {
                    if (data[i].videoPv != $("#pv").val())
                        tbody.append("<div class=\"video-page-card\">\n" +
                            "                        <div class=\"card-box\">\n" +
                            "                            <div class=\"pic-box\">\n" +
                            "                                <div class=\"pic\"><a href=\"/pv" + data[i].videoPv + "\" class=\"\"><img src=\"" + data[i].videoImage + "\" alt=\"" + data[i].videoTitle + "\" width=\"168\" height=\"95\"></a><span class=\"mask-video\"></span><span class=\"duration\">" + data[i].videoTime + "</span></div>\n" +
                            "                                <div class=\"watch-later-video van-watchlater\"><span class=\"wl-tips\" style=\"display: none;\"></span></div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"info\"><a href=\"pv" + data[i].videoPv + "\" class=\"\"><span title=\"" + data[i].videoTitle + "\" class=\"title\">" + data[i].videoTitle + "</span></a>\n" +
                            "                                <div class=\"count up\"><a href=\"/user/space/" + data[i].videoUserid + "\" target=\"_blank\" style=\"display:;\">" + data[i].videoUserName + "</a></div>\n" +
                            "                                <div class=\"count\">\n" +
                            "                                    " + data[i].videoPlayChar + " 播放&nbsp;·&nbsp;" + data[i].videoBarrage + " 弹幕\n" +
                            "                                </div>\n" +
                            "                            </div>\n" +
                            "                        </div>\n" +
                            "                    </div>")
                }
            },
        });
    }
    ajaxGetVideoInfo()
    ajaxVideoInfo()
    ajaxThumbsup()
    $(".player-auxiliary-bscrollbar").mCustomScrollbar();
    setInterval("ajaxSetHistory()",30000)
})

var time_to_sec = function (time) {
    var s = '';
    var timearr = time.split(':');
    if (count(timearr) == 2) {
        var min = timearr[0];
        var sec = timearr[1];
        s = Number(min * 60) + Number(sec);
    } else {
        var hour = timearr[0];
        var min = timearr[1];
        var sec = timearr[2];
        s = Number(hour * 3600)+Number(min * 60) + Number(sec);
    }

    return s;
};
function count(o){
    var t = typeof o;
    if(t == 'string'){
        return o.length;
    }else if(t == 'object'){
        var n = 0;
        for(var i in o){
            n++;
        }
        return n;
    }
    return false;
}
