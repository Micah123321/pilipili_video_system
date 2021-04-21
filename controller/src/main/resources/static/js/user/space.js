$(function () {
    $(".be-textarea_inner").change(function () {
        var uid = $("#uid").val()
        var notice=$(".be-textarea_inner").val()
        $.ajax({
            url: "/user/changeNotice",
            type: "get",
            dataType: "json",
            data: {
                uid: uid,
                notice: notice
            },
            success: function (data) {
                if (data=="ok"){

                }else{
                    alert("修改公告失败")
                }
            }})
    })
    ajaxDesc=function () {
        var uid = $("#uid").val()
        var desc=$("#h-sign").val()
        $.ajax({
            url: "/user/changeDesc/",
            type: "get",
            dataType: "json",
            data: {
                uid: uid,
                desc: desc
            },
            success: function (data) {
                if (data=="ok"){

                }else{
                    alert("修改简介失败")
                }
            }})}


    $(".be-tab-inner li").click(function () {
        $(".be-tab-inner li").removeClass("is-active")
        $(this).addClass("is-active")
        var emcount=($(".is-active").val()*2)+"em";
        if (($(".is-active").val()*2)<3){
            if ($(".is-active").val()!=0){
                emcount="3em";
            }else{
                emcount="0";
            }
        }
        $(".be-tab-cursor").css("left",emcount)
        getVideoInfo()
    })
    getVideoInfo = function () {
        var uid = $("#uid").val()
        var orderBy = $(".is-active").val()
        $.ajax({
            url: "/user/space/myvideoinfo/",
            type: "get",
            dataType: "json",
            data: {
                videoUserid: uid,
                orderBy: orderBy
            },
            success: function (data) {
                var tbody = $(".video>.content");
                tbody.empty();
                for (var i=0;i<data.length;i++){
                    tbody.append("<div data-aid=\""+data[i].videoPv+"\" class=\"small-item fakeDanmu-item\"><a href=\"//www.bilibili.com/video/BV1ZW41197Hf\" target=\"_blank\" class=\"cover\"><img src=\""+data[i].videoImage+"\" alt=\""+data[i].videoTitle+"\"><span class=\"length\">"+data[i].videoTime+"</span><span class=\"i-watchlater\"></span><!----></a><a href=\"//www.bilibili.com/video/BV1ZW41197Hf\" target=\"_blank\" title=\"这是迷你世界做不到的操作，我的世界vape蒙太奇 ① 超热血！！\" class=\"title\">"+data[i].videoTitle+"\n" +
                        "                            </a>\n" +
                        "                            <div class=\"meta\"><span class=\"play\"><i class=\"icon\"></i>"+data[i].videoPlay+"\n" +
                        "        </span><span class=\"time\"><i class=\"icon\"></i>"+data[i].videoReleasetime+"\n" +
                        "        </span></div>\n" +
                        "                        </div>")
                    $(".count").text(data.length);
                    $(".n-num").text(data.length);
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
})