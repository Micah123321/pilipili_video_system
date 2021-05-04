$(function () {
    $.ajax({
        url: "/search/category/1",
        type: "get",
        dataType: "json",
        success: function (data) {
            var menu=$(".dropdown-menu")
            menu.empty();
            for (var i = 0; i < data.length; i++) {
                menu.append("<li><a href=\"/categoryinfo/"+data[i].id+"\">"+data[i].categoryName+"</a></li>")
            }
        }
    });

    ajaxVideoInfo =  ()=> {
        $.ajax({
            url: "/category/get",
            type: "get",
            dataType: "json",
            data: {
                videoType:$("#cateId").val(),
                orderBy:1,
                pageSize:12
            },
            success: function (data) {
                var tbody = $(".channel-m");

                for (var i = 0; i < data.videoList.length; i++) {
                    $('title').text(data.videoList[i].parentTypeName+"区-pilipili视频网")
                    $("#subnav .clearfix").append("<li class=\"\"><a href=\""+data.videoList[i].videoParentType+"/"+data.videoList[i].videoType+"\">"+data.videoList[i].typeName+"<!----></a></li>")
                    var context="<div id=\"douga_"+data.videoList[i].typeName+"\" class=\"sub-zone-m clearfix report-wrap-module report-scroll-module\" scrollshow=\"true\">\n" +
                        "                <div class=\"clearfix\">\n" +
                        "                    <div class=\"video-floor-m l-con\">\n" +
                        "                        <div class=\"zone-title\">\n" +
                        "                            <div class=\"headline clearfix\"><a href=\""+data.videoList[i].videoParentType+"/"+data.videoList[i].videoType+"\" class=\"name\">"+data.videoList[i].typeName+"</a>\n" +
                        "                                <div class=\"bili-tab bili-tab\">\n" +
                        "                                    <div class=\"bili-tab-item\">有新动态</div>\n" +
                        "                                    <div class=\"bili-tab-item\">最新投稿</div>\n" +
                        "                                </div><!----><a href=\""+data.videoList[i].videoParentType+"/"+data.videoList[i].videoType+"\" target=\"_blank\" class=\"link-more\">\n" +
                        "                                    更多\n" +
                        "                                    <i class=\"icon\"></i></a><!----></div>\n" +
                        "                        </div>\n" +
                        "                        <div class=\"storey-box clearfix\" style=\"height:504px;\"><!---->\n" +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                    <div class=\"r-con\">\n" +
                        "                        <section class=\"sec-rank\">\n" +
                        "                            <header class=\"rank-head\"><h3>热门</h3>\n" +
                        "                            </header>\n" +
                        "                            <div class=\"rank-list-wrap\">\n" +
                        "                                <ul class=\"rank-list hot-list\"><!---->\n" +
                        "                                </ul>\n" +
                        "                            </div>\n" +
                        "                            <a href=\""+data.videoList[i].videoParentType+"/"+data.videoList[i].videoType+"\" target=\"_blank\" class=\"more-link\">查看更多\n" +
                        "                                <i class=\"icon icon-arrow-r\"></i></a></section>\n" +
                        "                    </div>\n" +
                        "                </div><!----></div>"
                    tbody.append(context)
                }
                for (var i = 0; i < data.top4.length; i++){
                    $(".groom-box-m").append("<div class=\"groom-module\"><a href=\"/pv"+data.top4[i].videoPv+"\" target=\"_blank\" title=\""+data.top4[i].videoTitle+"\">\n" +
                        "                            <div class=\"lazy-img\"><img alt=\""+data.top4[i].videoTitle+"\" src=\""+data.top4[i].videoImage+"\">\n" +
                        "                            </div><!---->\n" +
                        "                            <div class=\"card-mark\"><p class=\"title\">"+data.top4[i].videoTitle+"</p>\n" +
                        "                                <p class=\"author\">up主："+data.top4[i].videoUserName+"</p>\n" +
                        "                                <p class=\"play\">播放："+data.top4[i].videoPlay+"</p></div>\n" +
                        "                        </a>\n" +
                        "                            <div class=\"watch-later-trigger w-later\"></div>\n" +
                        "                        </div>")
                }
                for (var i = 0; i < data.videoList.length; i++){
                    var catebody=$("#douga_"+data.videoList[i].typeName+" .storey-box.clearfix")
                    var cateTitlebody=$("#douga_"+data.videoList[i].typeName+" .rank-list.hot-list")
                    catebody.empty()
                    var Array = [];
                    for (var j = 0; j < data.videoList[i].dataList.length; j++){
                        if (data.videoList[i].dataList[j].videoType==data.videoList[i].videoType){
                            catebody.append("<div class=\"spread-module\"><a href=\"/pv"+data.videoList[i].dataList[j].videoPv+"\" target=\"_blank\"><div class=\"pic\"><div class=\"lazy-img\"><img alt=\""+data.videoList[i].dataList[j].videoTitle+"\" src=\""+data.videoList[i].dataList[j].videoImage+"\"></div><i class=\"icon medal golden\"></i><div class=\"cover-preview-module\"><!----><div class=\"progress-bar\"><span style=\"width: 0%;\"></span></div></div><div class=\"mask-video\"></div><div class=\"danmu-module\"></div><span class=\"dur\">"+data.videoList[i].dataList[j].videoTime+"</span><!----><!----><div class=\"watch-later-trigger w-later\"></div></div><p title=\""+data.videoList[i].dataList[j].videoTitle+"\" class=\"t\">"+data.videoList[i].dataList[j].videoTitle+"</p><p class=\"num\"><span class=\"play\"><i class=\"icon\"></i>"+data.videoList[i].dataList[j].videoPlay+"</span><span class=\"danmu\"><i class=\"icon\"></i>"+data.videoList[i].dataList[j].videoBarrage+"</span></p></a></div>")
                            Array.push(data.videoList[i].dataList[j])
                        }
                    }
                    for (var k = 0; k < Array.length; k++){
                        if (k>10){
                            return
                        }
                        if (k<3){
                            cateTitlebody.append("<li class=\"rank-item  show-detail first highlight\"><i class=\"ri-num\">"+(k+1)+"</i><a href=\"/pv"+Array[k].videoPv+"\" target=\"_blank\" title=\""+Array[k].videoTitle+"\" class=\"ri-info-wrap clearfix\"><div class=\"lazy-img ri-preview\"><img alt=\""+Array[k].videoTitle+"\" src=\""+Array[k].videoImage+"\"></div><div class=\"ri-detail\"><p class=\"ri-title\">"+Array[k].videoTitle+"</p><p class=\"ri-point\">综合评分："+((Array[k].videoPlay+1)*(Array[k].videoBarrage+1)*(Array[k].videoCollect+1))+"</p></div><div class=\"watch-later-trigger w-later\"></div></a></li>")
                        }else{
                            cateTitlebody.append("<li class=\"rank-item\"><i class=\"ri-num\">"+(k+1)+"</i><a href=\"/pv"+Array[k].videoPv+"\" target=\"_blank\" title=\""+Array[k].videoTitle+"\" class=\"ri-info-wrap clearfix\"><!----><div class=\"ri-detail\"><p class=\"ri-title\">"+Array[k].videoTitle+"</p><p class=\"ri-point\">综合评分："+((Array[k].videoPlay+1)*(Array[k].videoBarrage+1)*(Array[k].videoCollect+1))+"</p></div><!----></a></li>")
                        }
                    }
                }
            },
        });
    }
    goDetail= (pv)=> {
        location.href="/pv"+pv;
    }

    ajaxUserInfo =  ()=> {
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
            },
        });
    }
    ajaxUserInfo();
    ajaxVideoInfo();
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