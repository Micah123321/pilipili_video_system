$(function () {
    $(".icon.search-btn").click(function () {
        ajaxVideoList()
    })
    $(".be-tab-inner li").click(function () {
        $(".be-tab-inner li").removeClass("is-active")
        $(this).addClass("is-active")
        var emcount = 0;
        if (($(".is-active").val() * 2) < 3) {
            if ($(".is-active").val() != 0) {
                emcount = 76;
            } else {
                emcount = "0";
            }
        }else{
            emcount=152
        }
        $("#videotab>.be-tab-cursor").css("transform", "translateX(" + emcount + "px)")
        ajaxVideoList()
    })

    getTypeData = function () {
        var uid=$("#uid").val()
        $.ajax({
            url: "/admin/creative/typedata",
            type: "get",
            dataType: "json",
            data: {
                "uid":uid,
                "videoState":1
            },
            success: function (data) {
                var tbody = $("#submit-video-type-filter");
                tbody.empty();
                for (var i = 0; i < data.length; i++) {
                    if (i==0){
                        tbody.append("<a value='"+data[i].id+"' class=\"active\">\n" +
                            "            "+data[i].categoryName+"<span class=\"count\">" + data[i].count + "</span></a>")
                    }else{
                        tbody.append("<a value='"+data[i].id+"' class=\"\">\n" +
                            "            "+data[i].categoryName+"<span class=\"count\">" + data[i].count + "</span></a>")
                    }
                }
                $(".num").text(data[0].count)
                tbody.append("<script>\n" +
                    "                $(function () {\n" +
                    "                    $(\"#submit-video-type-filter a\").click(function () {\n" +
                    "                        $(\"#submit-video-type-filter a\").removeClass(\"active\")\n" +
                    "                        $(this).addClass(\"active\")\n" +
                    "                        ajaxVideoList()\n" +
                    "                    })\n" +
                    "                })\n" +
                    "            </script>")

            }
        });
    }
    ajaxVideoList = function () {
        var videoTitle = $(".search-container>.space_input").val();
        var videoState = 1;
        var orderBy = $(".be-tab-item.is-active").val();
        var videoType = $("#submit-video-type-filter a.active").attr("value");
        var currPage = $("#currPage").val();
        $.ajax({
            url: "/admin/creative/data",
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
                var tbody = $(".cube-list");
                tbody.empty();

                for (var i=0;i<data.dataList.length;i++){
                    tbody.append("<li data-aid=\"BV1hy4y1Y7Qs\" class=\"small-item fakeDanmu-item\"><a href=\"/pv"+data.dataList[i].videoPv+"\" target=\"_blank\" class=\"cover\"><img src=\""+data.dataList[i].videoImage+"\" alt=\"小伙子试图交新朋友失败\"><span class=\"length\">"+data.dataList[i].videoTime+"</span><span class=\"i-watchlater\"></span><!----><div class=\"preview-bg\" style=\"background-position: -480px 0px; background-size: 1600px; background-image: url(&quot;//i0.hdslb.com/bfs/videoshot/295697843.jpg&quot;); opacity: 1; display: none;\"></div><div class=\"preview-wrapper\" style=\"opacity: 1; display: none;\"><div class=\"preview-loading\"></div><div class=\"preview-progress\"><div class=\"preview-progress-bar\" style=\"width: 67%;\"></div></div></div><div class=\"fake-danmu-mask\" style=\"opacity: 1; display: none;\"></div><div class=\"fake-danmu\" style=\"display: none;\"><div class=\"fake-danmu-item\">小碧崽子</div><div class=\"fake-danmu-item\">小碧崽子​</div><div class=\"fake-danmu-item\">B站继承人</div><div class=\"fake-danmu-item\">玉音放送</div><div class=\"fake-danmu-item\">小壁崽子</div><div class=\"fake-danmu-item\">小碧崽子</div><div class=\"fake-danmu-item\">小碧崽子</div><div class=\"fake-danmu-item\">大碧生小碧</div><div class=\"fake-danmu-item\">大碧崽子（doge）</div><div class=\"fake-danmu-item\">小碧崽子</div><div class=\"fake-danmu-item\">弹幕里有一堆封号的</div><div class=\"fake-danmu-item\">我的站长父亲</div><div class=\"fake-danmu-item\">小碧崽子</div><div class=\"fake-danmu-item\">小碧崽子</div><div class=\"fake-danmu-item\">小碧崽子</div><div class=\"fake-danmu-item\">以上弹幕均已封号</div><div class=\"fake-danmu-item\">哈哈哈</div><div class=\"fake-danmu-item\">小碧崽子可爱死我了！！</div><div class=\"fake-danmu-item\">小碧崽子</div><div class=\"fake-danmu-item\">小碧崽子</div></div></a><a href=\"/pv"+data.dataList[i].videoPv+"\" target=\"_blank\" title=\"小伙子试图交新朋友失败\" class=\"title\">"+data.dataList[i].videoTitle+"</a><div class=\"meta\"><span class=\"play\"><i class=\"icon\"></i>"+data.dataList[i].videoPlay+"\n" +
                        "                    </span><span class=\"time\"><i class=\"icon\"></i>"+data.dataList[i].videoReleasetime+"\n" +
                        "                    </span></div></li>")
                }
                var pageUtil = {
                    index: data.index,
                    totalPageCount: data.totalPageCount,
                    totalCount: data.totalCount
                };
                flashPage(pageUtil,ajaxVideoList);

                if (videoTitle!=""){
                    $(".v-search-result").show()
                    $(".v-search-kw").text(videoTitle)
                    $(".v-search-count").text(data.totalCount)
                }else{
                    $(".v-search-result").hide()
                }
            }
        });
    }
    getTypeData()
    ajaxVideoList()
})