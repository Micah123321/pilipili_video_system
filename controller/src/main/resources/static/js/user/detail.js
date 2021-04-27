$(function () {
    ajaxGetVideoInfo=function(){
        $.ajax({
            url: "/detail/getinfo",
            type: "get",
            data:{
                "pv":$("#pv").val()
            },
            dataType: "json",
            success: function (data) {
                $(".video-title span").text(data.video.videoTitle)
                $('title').text(data.video.videoTitle+"_霹雳霹雳 (゜-゜)つロ 干杯~-pilipili")
                $(".video-data>.view").text(data.video.videoPlay+"播放")
                $(".video-data>.dm").text(data.video.videoBarrage+"弹幕")
                $(".video-data>.videoTime").text(data.video.videoReleasetime)
                $(".video-data>.rank").text("")
                $(".u-face>.fa").attr("ref","/space/"+data.userInfo.userId)
                $(".u-face  .bili-avatar-img-radius").attr("src",data.userInfo.userPic)
                $(".up-info_right  .username.is_vip").attr("href","/space/"+data.userInfo.userId)
                $(".up-info_right  .username.is_vip").text(data.userInfo.nickName)
                $(".up-info_right  .desc").text(data.userInfo.upDesc)
                $(".has-charge>span").text(data.userInfo.fansNum)
                $("#v_desc .info").text(data.video.videoDesc)
                $("#url").text(data.video.videoUrl)
                $("#type").text(data.video.videoType)
                var type=data.video.typeName
                var typeList=type.split("<--")
                $(".tag-area.clearfix").html("<li class=\"tag\">\n" +
                    "                        <div><a href=\"//www.bilibili.com/v/channel/68?tab=featured\" target=\"_blank\" class=\"tag-link\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAP5JREFUOBGllD0OwjAMhV9yGcTOisRFegwWJJgQS4/RiyCxdkdcJiFuGtX9ceJAJtf5/OQkfjUore5zhHfngB1GtIexLZrdK1dqcpvo3hd43OH9gjMOFlc0+4dUvyhgGHXq3BPwlmVZSOL2JHUuFIX64fiSKOmHvXhF9LFasvB0p6silkj3zlIxzAmv4JpETrhXCImMLEwjhfBA4gp7A7MNyMI0p8bctsXTuMmzLI9bauRvg9QKFPjYca3DFLxBrcOU/OieCocpHUlTIbonvd+CUfHyuDHVX0ISFt3DBDnDY4bMwt5G91Q4TOlIO/xPaxymdOTkvMLAzw5KHwX+Czr/jXvbTvs/AAAAAElFTkSuQmCC\" width=\"32\" height=\"32\" class=\"channel-icon\"><span class=\"channel-name\">"+typeList[0]+"</span></a>\n" +
                    "                            <!----></div>\n" +
                    "                    </li>"+"<li class=\"tag\">\n" +
                    "                        <div><a href=\"//www.bilibili.com/v/channel/1833?tab=featured\" target=\"_blank\" class=\"tag-link\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAP5JREFUOBGllD0OwjAMhV9yGcTOisRFegwWJJgQS4/RiyCxdkdcJiFuGtX9ceJAJtf5/OQkfjUore5zhHfngB1GtIexLZrdK1dqcpvo3hd43OH9gjMOFlc0+4dUvyhgGHXq3BPwlmVZSOL2JHUuFIX64fiSKOmHvXhF9LFasvB0p6silkj3zlIxzAmv4JpETrhXCImMLEwjhfBA4gp7A7MNyMI0p8bctsXTuMmzLI9bauRvg9QKFPjYca3DFLxBrcOU/OieCocpHUlTIbonvd+CUfHyuDHVX0ISFt3DBDnDY4bMwt5G91Q4TOlIO/xPaxymdOTkvMLAzw5KHwX+Czr/jXvbTvs/AAAAAElFTkSuQmCC\" width=\"32\" height=\"32\" class=\"channel-icon\"><span class=\"channel-name\">"+typeList[1]+"</span></a>\n" +
                    "                            <!----></div>\n" +
                    "                    </li>")
                $(".ops").html("<span title=\"点赞数"+data.video.videoLike+"\" class=\"like\"><!----><!----><!----><!----><i class=\"van-icon-videodetails_like\" style=\"color:;\"></i>"+data.video.videoLike+"\n" +
                    "    </span>"+"<span title=\"收藏人数\" class=\"collect\"><canvas width=\"34\" height=\"34\" class=\"ring-progress\" style=\"width:34px;height:34px;left:-3px;top:-3px;\"></canvas>\n" +
                    "                    <!----><i class=\"van-icon-videodetails_collec\" style=\"color:;\"></i>"+data.video.videoCollect+"\n" +
                    "    </span>")

            }
        })
    }
    ajaxVideoInfo = function () {
        $.ajax({
            url: "/category/videoInfo",
            type: "get",
            dataType: "json",
            data: {
                videoType:$("#type").val()
            },
            success: function (data) {
                var tbody=$(".rec-list");
                tbody.empty()
                for (var i = 0; i < data.length; i++) {
                    tbody.append("<div class=\"video-page-card\">\n" +
                        "                        <div class=\"card-box\">\n" +
                        "                            <div class=\"pic-box\">\n" +
                        "                                <div class=\"pic\"><a href=\"/pv"+data[i].videoPv+"\" class=\"\"><img src=\""+data[i].videoImage+"\" alt=\""+data[i].videoTitle+"\" width=\"168\" height=\"95\"></a><span class=\"mask-video\"></span><span class=\"duration\">"+data[i].videoTime+"</span></div>\n" +
                        "                                <div class=\"watch-later-video van-watchlater\"><span class=\"wl-tips\" style=\"display: none;\"></span></div>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"info\"><a href=\"pv"+data[i].videoPv+"\" class=\"\"><span title=\""+data[i].videoTitle+"\" class=\"title\">"+data[i].videoTitle+"</span></a>\n" +
                        "                                <div class=\"count up\"><a href=\"/user/space/"+data[i].videoUserid+"\" target=\"_blank\" style=\"display:;\">"+data[i].videoUserName+"</a></div>\n" +
                        "                                <div class=\"count\">\n" +
                        "                                    "+data[i].videoPlay+" 播放&nbsp;·&nbsp;"+data[i].videoBarrage+" 弹幕\n" +
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
})