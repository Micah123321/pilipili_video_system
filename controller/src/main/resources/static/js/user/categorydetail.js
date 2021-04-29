$(function () {
    $.ajax({
        url: "/search/category/1",
        type: "get",
        dataType: "json",
        success: function (data) {
            var menu = $(".dropdown-menu")
            menu.empty();
            for (var i = 0; i < data.length; i++) {
                menu.append("<li><a href=\"/categoryinfo/" + data[i].id + "\">" + data[i].categoryName + "</a></li>")
            }
        }
    });



    ajaxVideoTop = function () {
        $.ajax({
            url: "/category/getDetailList",
            type: "get",
            dataType: "json",
            data: {
                videoType: $("#cateId").val(),
                orderBy: 1,
                pageSize: 10,
                currPage: 1
            },
            success: function (data) {
                $(".rank-list.hot-list").empty()
                for (var i = 0; i < data.videoListPage.dataList.length; i++) {
                    if (i < 3) {
                        $(".rank-list.hot-list").append("<li class=\"rank-item  show-detail first highlight\"><i class=\"ri-num\">" + (i + 1) + "</i><a href=\"/pv" + data.videoListPage.dataList[i].videoPv + "\" target=\"_blank\" title=\"" + data.videoListPage.dataList[i].videoTitle + "\" class=\"ri-info-wrap clearfix\">\n" +
                            "                                    <div class=\"lazy-img ri-preview\"><img alt=\"" + data.videoListPage.dataList[i].videoTitle + "\" src=\"" + data.videoListPage.dataList[i].videoImage + "\">\n" +
                            "                                    </div>\n" +
                            "                                    <div class=\"ri-detail\"><p class=\"ri-title\">" + data.videoListPage.dataList[i].videoTitle + "</p>\n" +
                            "                                        <p class=\"ri-point\">综合评分：" + (data.videoListPage.dataList[i].videoPlay * data.videoListPage.dataList[i].videoBarrage) + "</p></div>\n" +
                            "                                    <div class=\"watch-later-trigger w-later\"></div>\n" +
                            "                                </a></li>")
                    } else {
                        $(".rank-list.hot-list").append("<li class=\"rank-item  show-detail first\"><i class=\"ri-num\">" + (i + 1) + "</i><a href=\"/pv" + data.videoListPage.dataList[i].videoPv + "\" target=\"_blank\" title=\"" + data.videoListPage.dataList[i].videoTitle + "\" class=\"ri-info-wrap clearfix\">\n" +
                            "                                    <div class=\"lazy-img ri-preview\"><img alt=\"" + data.videoListPage.dataList[i].videoTitle + "\" src=\"" + data.videoListPage.dataList[i].videoImage + "\">\n" +
                            "                                    </div>\n" +
                            "                                    <div class=\"ri-detail\"><p class=\"ri-title\">" + data.videoListPage.dataList[i].videoTitle + "</p>\n" +
                            "                                        <p class=\"ri-point\">综合评分：" + (data.videoListPage.dataList[i].videoPlay * data.videoListPage.dataList[i].videoBarrage) + "</p></div>\n" +
                            "                                    <div class=\"watch-later-trigger w-later\"></div>\n" +
                            "                                </a></li>")
                    }
                }
            },
        });
    }
    $(".tab-list.order-tab li").click(function () {
        $(".tab-list.order-tab li").removeClass("on")
        $(this).addClass("on")
        ajaxVideoInfo(false)
    })

    ajaxVideoInfo = function (flag) {
        var orderBy=$(".tab-list.order-tab .on").attr("value");
        var currPage=$("#currPage").attr("value");
        $.ajax({
            url: "/category/getDetailList",
            type: "get",
            dataType: "json",
            data: {
                videoType: $("#cateId").val(),
                orderBy: orderBy,
                pageSize: 10,
                currPage: currPage
            },
            success: function (data) {
                var tbody = $(".vd-list.mod-2");
                tbody.empty()
                for (var i = 0; i < data.videoListPage.dataList.length; i++) {
                    tbody.append("<li>\n" +
                        "                                    <div class=\"l-item\">\n" +
                        "                                        <div class=\"l\">\n" +
                        "                                            <div class=\"spread-module\"><a href=\"/pv" + data.videoListPage.dataList[i].videoPv + "\" target=\"_blank\">\n" +
                        "                                                <div class=\"pic\">\n" +
                        "                                                    <div class=\"lazy-img\"><img alt=\"" + data.videoListPage.dataList[i].videoTitle + "\" src=\"" + data.videoListPage.dataList[i].videoImage + "\">\n" +
                        "                                                    </div>\n" +
                        "                                                    <i class=\"icon medal \"></i>\n" +
                        "                                                    <div class=\"cover-preview-module\"><!---->\n" +
                        "                                                        <div class=\"progress-bar\"><span style=\"width: 0%;\"></span></div>\n" +
                        "                                                    </div>\n" +
                        "                                                    <div class=\"mask-video\"></div>\n" +
                        "                                                    <div class=\"danmu-module\"></div>\n" +
                        "                                                    <span class=\"dur\">" + data.videoListPage.dataList[i].videoTime + "</span><!----><!---->\n" +
                        "                                                    <div class=\"watch-later-trigger w-later\"></div>\n" +
                        "                                                </div>\n" +
                        "                                                <p title=\"" + data.videoListPage.dataList[i].videoTitle + "\" class=\"t\">" + data.videoListPage.dataList[i].videoTitle + "</p>\n" +
                        "                                                <p class=\"num\"><span class=\"play\"><i class=\"icon\"></i>" + data.videoListPage.dataList[i].videoPlay + "</span><span class=\"danmu\"><i class=\"icon\"></i>+data.videoListPage.dataList[i].videoBarrage+</span></p></a></div>\n" +
                        "                                        </div>\n" +
                        "                                        <div class=\"r\"><a href=\"/pv" + data.videoListPage.dataList[i].videoPv + "\" target=\"_blank\" title=\"" + data.videoListPage.dataList[i].videoTitle + "\" class=\"title\">" + data.videoListPage.dataList[i].videoTitle + "</a>\n" +
                        "                                            <div class=\"v-desc\">" + data.videoListPage.dataList[i].videoDesc + "</div>\n" +
                        "                                            <div class=\"v-info\"><span class=\"v-info-i\"><i title=\"观看\" class=\"b-icon b-icon-v-play\"></i><span>" + data.videoListPage.dataList[i].videoPlay + "</span></span><span class=\"v-info-i\"><i title=\"弹幕\" class=\"b-icon b-icon-v-dm\"></i><span>" + data.videoListPage.dataList[i].videoBarrage + "</span></span>\n" +
                        "                                            </div>\n" +
                        "                                            <div class=\"up-info\"><a href=\"/user/spcae/" + data.videoListPage.dataList[i].videoUserid + "\" target=\"_blank\" title=\"" + data.videoListPage.dataList[i].videoUserName + "\" class=\"v-author\">\n" +
                        "                                                " + data.videoListPage.dataList[i].videoUserName + "\n" +
                        "                                            </a></div>\n" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                </li>")
                }
                if (flag){
                    $(".v-list").empty()
                    for (var i = 0; i < data.top4.length; i++) {
                        $(".v-list").append("<div class=\"spread-module\"><a href=\"/pv" + data.top4[i].videoPv + "\" target=\"_blank\">\n" +
                            "                                    <div class=\"pic\">\n" +
                            "                                        <div class=\"lazy-img\"><img alt=\"" + data.top4[i].videoTitle + "\" src=\"" + data.top4[i].videoImage + "\">\n" +
                            "                                        </div>\n" +
                            "                                        <i class=\"icon medal \"></i>\n" +
                            "                                        <div class=\"cover-preview-module\"><!---->\n" +
                            "                                            <div class=\"progress-bar\"><span style=\"width: 0%;\"></span></div>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"mask-video\"></div>\n" +
                            "                                        <div class=\"danmu-module\"></div>\n" +
                            "                                        <span class=\"dur\">" + data.top4[i].videoTime + "</span><!----><!---->\n" +
                            "                                        <div class=\"watch-later-trigger w-later\"></div>\n" +
                            "                                    </div>\n" +
                            "                                    <p title=\"" + data.top4[i].videoTitle + "\" class=\"t\">" + data.top4[i].videoTitle + "</p>\n" +
                            "                                    <p class=\"num\"><span class=\"play\"><i class=\"icon\"></i>" + data.top4[i].videoPlay + "</span><span class=\"danmu\"><i class=\"icon\"></i>" + data.top4[i].videoBarrage + "</span></p></a></div>")
                    }
                }
                var pageUtil = {
                    index: data.videoListPage.index,
                    totalPageCount: data.videoListPage.totalPageCount,
                    totalCount: data.videoListPage.totalCount
                };
                flashPage(pageUtil, ajaxVideoInfo);
            },
        });
    }
    goDetail = function (pv) {
        location.href = "/pv" + pv;
    }

    ajaxTypeInfo = function () {
        var parentId = $("#cateParentId").val();
        $.ajax({
            url: "/category/getTypeInfo",
            type: "get",
            dataType: "json",
            data: {
                pid: parentId
            },
            success: function (data) {

                for (var i = 0; i < data.length; i++) {
                    if ($("#cateId").val() == data[i].id) {
                        $("#subnav .clearfix").append("<li class=\"on\"><a href=\"" + "../" + parentId + "/" + data[i].id + "\">" + data[i].categoryName + "<!----></a></li>")
                        $('title').text(data[i].categoryName+"-"+data[i].parentTypeName+"区-pilipili视频网")
                    } else {
                        $("#subnav .clearfix").append("<li class=\"\"><a href=\"" + "../" + parentId + "/" + data[i].id + "\">" + data[i].categoryName + "<!----></a></li>")
                    }
                }
                $("a.goAll").attr("href", "../" + parentId)
            }
        })
    }

    ajaxUserInfo = function () {
        $.ajax({
            url: "/index/userinfo",
            type: "get",
            dataType: "json",
            data: {},
            success: function (data) {
                if (data.userId == null) {
                    $(".loginInfo").html("<div data-v-069d576e=\"\" class=\"lt-row\"><div data-v-069d576e=\"\" class=\"lt-col\"><div data-v-069d576e=\"\" class=\"login-tip\"><div data-v-069d576e=\"\" class=\"close\"><svg onclick=\"javascript:$('.lt-row').remove()\" data-v-069d576e=\"\" viewBox=\"0 0 100 100\"><path data-v-069d576e=\"\" d=\"M2 2 L98 98 M 98 2 L2 98Z\" stroke-width=\"10px\" stroke=\"#212121\" stroke-linecap=\"round\"></path></svg></div><div data-v-069d576e=\"\" class=\"title\">\n" +
                        "    登录pilipili，享受更多权益！\n" +
                        "</div><div data-v-38236bf2=\"\" data-v-069d576e=\"\" class=\"content\"><div data-v-38236bf2=\"\"><div data-v-38236bf2=\"\" class=\"lt-icon icon-hd\"></div><span data-v-38236bf2=\"\" class=\"lt-text\">免费看高清视频</span></div><div data-v-38236bf2=\"\"><div data-v-38236bf2=\"\" class=\"lt-icon icon-time\"></div><span data-v-38236bf2=\"\" class=\"lt-text\">多端同步播放记录</span></div><div data-v-38236bf2=\"\"><div data-v-38236bf2=\"\" class=\"lt-icon icon-danmaku\"></div><span data-v-38236bf2=\"\" class=\"lt-text\">发表弹幕/评论</span></div><div data-v-38236bf2=\"\"><div data-v-38236bf2=\"\" class=\"lt-icon icon-video\"></div><span data-v-38236bf2=\"\" class=\"lt-text\">热门番剧影视看不停</span></div></div><a data-v-069d576e=\"\" href=\"/user/login\" class=\"login-btn\">\n" +
                        "    立即登录\n" +
                        "</a></div></div></div>")
                    return;
                }
                $("#imgcircle").attr("src", data.userPic)
                var tbody = $("#van-popover-9985");
                tbody.empty();
                tbody.append("<a data-v-59fd5a91=''href='/user/space'target='_blank' class='avatar'><div class='bili-avatar'>   <img class='bili-avatar-img bili-avatar-face bili-avatar-img-radius'        data-src='" + data.userPic + "'        alt=''        src='" + data.userPic + "'>     <span class='bili-avatar-icon'></span>     </div> </a>")
                tbody.append("<p data-v-59fd5a91=\"\" class=\"nickname\" style=\"padding-top: 42px;\">" + data.nickName + "</p><!----><div data-v-59fd5a91=\"\" class=\"level-content\"><div data-v-59fd5a91=\"\" class=\"level-info\"><span data-v-59fd5a91=\"\"class=\"grade\">等级 " + data.level + "</span></div><a data-v-59fd5a91=\"\"href=\"https://account.bilibili.com/account/record?type=exp\"target=\"_blank\" class=\"level-link\"><div data-v-59fd5a91=\"\" class=\"level-bar\"><div data-v-59fd5a91=\"\" class=\"level-progress\"  style=\"width: 0%;\"></div></div></a><div data-v-59fd5a91=\"\" class=\"level-intro\"><p data-v-59fd5a91=\"\" class=\"level-intro__title\">作为LV0，你无法享受特权</p><div data-v-59fd5a91=\"\" class=\"level-intro__content\">成为正式会员,你可以：<br>1、发射个性弹幕<br>2、参与视频评论<br>3、登入获得硬币<br>4、投稿成为偶像</div><a data-v-59fd5a91=\"\"href=\"//www.bilibili.com/blackboard/help.html#%E4%BC%9A%E5%91%98%E7%AD%89%E7%BA%A7%E7%9B%B8%E5%85%B3?id=7251c4ab69d44a8ebbbd276dea46d790\"target=\"_blank\" class=\"level-intro__link\">会员等级相关说明<svg data-v-59fd5a91=\"\" aria-hidden=\"true\" class=\"svg-icon\"> <use data-v-59fd5a91=\"\"xlink:href=\"#bili-icon_caozuo_xiangyou\"></use></svg></a></div></div><div data-v-59fd5a91=\"\" class=\"counts\"><a data-v-59fd5a91=\"\"href=\"/user/subs/list/\"target=\"_blank\" class=\"count-item\"><div data-v-59fd5a91=\"\" class=\"item-key\">关注</div><div data-v-59fd5a91=\"\" class=\"item-value\"><span data-v-59fd5a91=\"\"class=\"item-num\">" + data.subscribeNum + "</span><spandata-v-59fd5a91=\"\" class=\"item-unit\"></span></div></a><a data-v-59fd5a91=\"\" href=\"/user/fans/list/"+ data.userId +"\"target=\"_blank\" class=\"count-item\"><div data-v-59fd5a91=\"\" class=\"item-key\">粉丝</div><div data-v-59fd5a91=\"\" class=\"item-value\"><span data-v-59fd5a91=\"\"class=\"item-num\">" + data.fansNum + "</span><spandata-v-59fd5a91=\"\" class=\"item-unit\"></span></div></a></div><div data-v-59fd5a91=\"\" class=\"links\"><a data-v-59fd5a91=\"\"href=\"/user/space\"target=\"_blank\" class=\"link-item\"><div data-v-59fd5a91=\"\" class=\"link-title\"><i data-v-59fd5a91=\"\"class=\"link-icon bilifont bili-icon_dingdao_gerenzhongxin\"></i>个人中心</div></a><a data-v-59fd5a91=\"\"href=\"/admin?url=creative\"target=\"_blank\" class=\"link-item\"><div data-v-59fd5a91=\"\" class=\"link-title\"><i data-v-59fd5a91=\"\"class=\"link-icon bilifont bili-icon_dingdao_tougaoguanli\"></i>投稿管理</div></a></div><div data-v-59fd5a91=\"\" onclick=\"javascript:location.href='/admin/account/logout'\" class=\"logout\"><span data-v-59fd5a91=\"\"><idata-v-59fd5a91=\"\"class=\"link-icon bilifont bili-icon_dingdao_dengchu\"></i>退出</span></div>  </div>")
            }
        });
    }
    ajaxUserInfo();
    ajaxVideoInfo(true);
    ajaxVideoTop();
    ajaxTypeInfo();
    $("#van-popover-9985").hide();
})
$(".img-circle").hover(function () {
    $("#van-popover-9985").show()
    ajaxUserInfo()
}, function () {
    $("#van-popover-9985").hide()
})
$("#van-popover-9985").hover(function () {
    $("#van-popover-9985").show()
}, function () {
    $("#van-popover-9985").hide()

})