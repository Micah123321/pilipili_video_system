$(function () {
    $(".be-textarea_inner").change( ()=> {
        var uid = $("#uid").val()
        var notice = $(".be-textarea_inner").val()
        $.ajax({
            url: "/user/changeNotice",
            type: "get",
            dataType: "json",
            data: {
                uid,
                notice
            },
            success: function (data) {
                if (data == "ok") {
                } else {
                    alert("修改公告失败")
                }
            }
        })
    })
    ajaxDesc = function () {
        var uid = $("#uid").val()
        var desc = $("#h-sign").val()
        $.ajax({
            url: "/user/changeDesc/",
            type: "get",
            dataType: "json",
            data: {
                uid,
                desc
            },
            success: function (data) {
                if (data == "ok") {

                } else {
                    alert("修改简介失败")
                }
            }
        })
    }

    $(".n-btn").mouseenter(function () {
        if ($(this).hasClass("n-video")) {
            $(".n-cursor").css({"width": "60px", "left": "90px"})
        } else if ($(this).hasClass("n-favlist")) {
            $(".n-cursor").css({"width": "60px", "left": "170px"})
        } else if ($(this).hasClass("n-subs")) {
            $(".n-cursor").css({"width": "50px", "left": "250px"})
        } else {
            $(".n-cursor").css({"width": "50px", "left": "22px"})
        }
    })
    $(".n-btn").mouseleave(function () {
        if ($(".active").hasClass("n-video")) {
            $(".n-cursor").css({"width": "60px", "left": "90px"})
        } else if ($(".active").hasClass("n-favlist")) {
            $(".n-cursor").css({"width": "60px", "left": "170px"})
        } else if ($(".active").hasClass("n-subs")) {
            $(".n-cursor").css({"width": "50px", "left": "250px"})
        } else {
            $(".n-cursor").css({"width": "50px", "left": "22px"})
        }
    })

    $(".be-tab-inner li").click(function () {
        $(".be-tab-inner li").removeClass("is-active")
        $(this).addClass("is-active")
        var emcount = 0;
        if (($(".is-active").val() * 2) < 3) {
            if ($(".is-active").val() != 0) {
                emcount = 63;
            } else {
                emcount = "0";
            }
        } else {
            emcount = 126
        }
        $("#spacetab>.be-tab-cursor").css("transform", "translateX(" + emcount + "px)")
        getVideoInfo()
    })
    ajaxIsSub = () => {
        var subId = $("#uid").val();
        $.ajax({
            url: "/sub/isSub",
            type: "get",
            data: {
                subId
            },
            dataType: "json",
            success: function (data) {
                $(".h-action").empty()
                if (data.code == 1) {
                    $(".h-action").append(`<div onmouseenter="showdrop(this)" onmouseleave="hidedrop(this)" class="be-dropdown h-f-btn h-unfollow"><div><i class="h-f-icon"></i>已关注
            <span class="icon icon-arrow"></span></div><ul class="be-dropdown-menu menu-align-" style=" transform-origin: center top; display: none;"><li onclick="ajaxDelSub()" class="be-dropdown-item">取消关注</li></ul><!----></div>`)
                } else if (data.code == 0) {
                    $(".h-action").append(`<span onclick="ajaxSub()" class="h-f-btn h-follow"><i class=""></i>关注
        </span>`)
                }
            }
        })
    }

    ajaxSub = () => {
        var subId = $("#uid").val()
        $.ajax({
            url: "/sub/sub",
            type: "get",
            data: {
                subId
            },
            dataType: "json",
            success: function (data) {
                if (data.code==0)ajaxIsSub()
                else alert(data.message)
            }
        })
    }
    ajaxDelSub = () => {
        var subId = $("#uid").val()
        $.ajax({
            url: "/sub/del",
            type: "get",
            data: {
                subId
            },
            dataType: "json",
            success: function (data) {
                if (data.code==0)ajaxIsSub()
                else alert(data.message)
            }
        })
    }



    getVideoInfo = function () {
        var uid = $("#uid").val()
        var orderBy = $(".is-active").val()
        $.ajax({
            url: "/user/space/myvideoinfo/",
            type: "get",
            dataType: "json",
            data: {
                videoUserid: uid,
                orderBy: orderBy,
                videoState: 1
            },
            success: function (data) {
                var tbody = $(".video>.content");
                tbody.empty();
                for (var i = 0; i < data.length; i++) {
                    tbody.append("<div data-aid=\"" + data[i].videoPv + "\" class=\"small-item fakeDanmu-item\"><a href=\"/pv" + data[i].videoPv + "\" target=\"_blank\" class=\"cover\"><img src=\"" + data[i].videoImage + "\" alt=\"" + data[i].videoTitle + "\"><span class=\"length\">" + data[i].videoTime + "</span><span class=\"i-watchlater\"></span><!----></a><a href=\"//www.bilibili.com/video/BV1ZW41197Hf\" target=\"_blank\" title=\"这是迷你世界做不到的操作，我的世界vape蒙太奇 ① 超热血！！\" class=\"title\">" + data[i].videoTitle + "\n" +
                        "                            </a>\n" +
                        "                            <div class=\"meta\"><span class=\"play\"><i class=\"icon\"></i>" + data[i].videoPlayChar + "\n" +
                        "        </span><span class=\"time\"><i class=\"icon\"></i>" + data[i].videoReleasetime + "\n" +
                        "        </span></div>\n" +
                        "                        </div>")
                    $(".video.full-rows.host .count").text(data.length);
                    $(".n-video>.n-num").text(data.length);
                }
                //显示产品数据
            },
            beforeSend: function () {
            },
            error: function (data) {
            }
        });
    }
    getUserInfo();
    getVideoInfo();
    ajaxIsSub()
})
showdrop=(obj)=>{
    $(obj).find("ul").slideDown()
}
hidedrop=(obj)=>{
    $(obj).find("ul").hide()
}