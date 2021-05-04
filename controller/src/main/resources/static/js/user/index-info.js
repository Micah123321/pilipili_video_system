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

    ajaxVideoInfo = function () {
        $.ajax({
            url: "/index/videoInfo",
            type: "get",
            dataType: "json",
            data: {},
            success: function (data) {
                var tbody = $(".videoBody");
                tbody.empty();
                for (var i = 0; i < data.length; i++) {
                    tbody.append("<div class=\"videoList\">\n" +
                        "            <div class=\"col-md-8\">\n" +
                        "                <h3 id=\"t"+data[i].typeName+"\" class=\"agileits-title\">\n" +
                        "                    <svg style=\"color: #03a9f4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\"\n" +
                        "                         fill=\"currentColor\"\n" +
                        "                         class=\"bi bi-easel\" viewBox=\"0 0 16 16\">\n" +
                        "                        <path d=\"M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0zM2 3v7h12V3H2z\"/>\n" +
                        "                    </svg>&nbsp;" + data[i].typeName + "\n" +
                        "\n" +
                        "                    <button onclick='toCategory("+data[i].videoParentType+","+data[i].videoType+")' type=\"button\" style=\"font-family: 宋体;float:right;margin-right: 5px\" class=\"btn btn-primary\"\n" +
                        "                            data-toggle=\"button\"> 更多\n" +
                        "                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n" +
                        "                             class=\"bi bi-forward\"\n" +
                        "                             viewBox=\"0 0 16 16\">\n" +
                        "                            <path d=\"M9.502 5.513a.144.144 0 0 0-.202.134V6.65a.5.5 0 0 1-.5.5H2.5v2.9h6.3a.5.5 0 0 1 .5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 0 1 .042-.028.147.147 0 0 0 0-.252.51.51 0 0 1-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.503H2a.5.5 0 0 1-.5-.5v-3.9a.5.5 0 0 1 .5-.5h6.3v-.503z\"/>\n" +
                        "                        </svg>\n" +
                        "                    </button>\n" +
                        "\n" +
                        "                    <button type=\"button\" style=\"font-family: 宋体;float:right;margin-right: 5px\" class=\"btn btn-primary\"\n" +
                        "                            onclick='changeVideo("+data[i].typeName+","+data[i].videoType+")' data-toggle=\"button\"> 换一组\n" +
                        "                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n" +
                        "                             class=\"bi bi-shuffle\"\n" +
                        "                             viewBox=\"0 0 16 16\">\n" +
                        "                            <path fill-rule=\"evenodd\"\n" +
                        "                                  d=\"M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z\"/>\n" +
                        "                            <path d=\"M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z\"/>\n" +
                        "                        </svg>\n" +
                        "                    </button>\n" +
                        "                </h3>\n" +
                        "<div id='"+data[i].typeName+"' class=\"news-agileinfo\">\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "            <div class=\"col-md-4\">\n" +
                        "                <div id='ph"+data[i].typeName+"' class=\"rank-list\" >\n" +
                        "                    <header class=\"rank-header\"><span class=\"name\">排行榜</span>\n" +
                        "                        <button type=\"button\" style=\"font-family: 宋体;float:right;margin-right: 5px\"\n" +
                        "                                class=\"btn btn-primary\" onclick='toCategory("+data[i].videoParentType+","+data[i].videoType+")'\n" +
                        "                                data-toggle=\"button\"> 更多\n" +
                        "                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n" +
                        "                                 class=\"bi bi-forward\"\n" +
                        "                                 viewBox=\"0 0 16 16\">\n" +
                        "                                <path d=\"M9.502 5.513a.144.144 0 0 0-.202.134V6.65a.5.5 0 0 1-.5.5H2.5v2.9h6.3a.5.5 0 0 1 .5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 0 1 .042-.028.147.147 0 0 0 0-.252.51.51 0 0 1-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.503H2a.5.5 0 0 1-.5-.5v-3.9a.5.5 0 0 1 .5-.5h6.3v-.503z\"/>\n" +
                        "                            </svg>\n" +
                        "                        </button>\n" +
                        "                    </header>\n" +
                        "</div>\n" +
                        "            </div>\n" +
                        "        </div>"
                    )
                }
                var videoContent="";
                var phContent="";

                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].dataList.length; j++){
                        var tx="";
                        if (data[i].dataList[j].videoPlay>=10000){
                            tx="silvery"
                        }
                        if (data[i].dataList[j].videoPlay>=20000){
                            tx="golden"
                        }
                        videoContent=videoContent+`<div class="spread-module col-md-3 col-sm-6 col-xs-12"><a href="/pv${data[i].dataList[j].videoPv}" target="_blank"><div class="pic"><div class="lazy-img"><img alt="${data[i].dataList[j].videoTitle}" src="${data[i].dataList[j].videoImage}"></div><i class="icon medal ${tx}"></i><div class="cover-preview-module"><!----><div class="progress-bar"><span style="width: 0%;"></span></div></div><div class="mask-video"></div><div class="danmu-module"></div><span class="dur">${data[i].dataList[j].videoTime}</span><!----><!----><div class="watch-later-trigger w-later"></div></div><p title="${data[i].dataList[j].videoTitle}" class="t">${data[i].dataList[j].videoTitle}</p><p class="num"><span class="play"><i class="icon"></i>${data[i].dataList[j].videoPlay}</span><span class="danmu"><i class="icon"></i>${data[i].dataList[j].videoBarrage}</span></p></a></div>`
                        var array=""
                        if ((j+1)<4){
                            array="on";
                        }
                        phContent=phContent+"<div class=\"rank-wrap\"><span class=\"number "+array+"\">"+(j+1)+"</span><a href=\"/pv"+data[i].dataList[j].videoPv+"\" target=\"_blank\" class=\"link\"><p title=\""+data[i].dataList[j].videoTitle+" ~\" class=\"title\">"+data[i].dataList[j].videoTitle+"</p></a>\n" +
                            "                        <div class=\"popover-video-card pvc\" style=\"display: none;\">\n" +
                            "                            <div class=\"content\"><img src=\""+data[i].dataList[j].videoImage+"\" alt=\"\">\n" +
                            "                                <div class=\"info\"><p class=\"f-title\">"+data[i].dataList[j].videoTitle+"</p>\n" +
                            "                                    <p class=\"subtitle\"><span class=\"name\">"+data[i].dataList[j].videoUserid+"</span><span class=\"point\">·</span><span class=\"time\">"+data[i].dataList[j].videoReleasetime+"</span></p></div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"count\">\n" +
                            "                                <ul>\n" +
                            "                                    <li><i class=\"bilifont bili-icon_shipin_bofangshu\"></i><span>149.9万</span></li>\n" +
                            "                                    <li><i class=\"bilifont bili-icon_shipin_danmushu\"></i><span>1142</span></li>\n" +
                            "                                    <li><i class=\"bilifont bili-icon_shipin_shoucangshu\"></i><span>1.9万</span></li>\n" +
                            "                                    <li><i class=\"bilifont bili-icon_shipin_yingbishu\"></i><span>1.3万</span></li>\n" +
                            "                                </ul>\n" +
                            "                            </div>\n" +
                            "                        </div>\n" +
                            "                    </div>"
                    }
                    $("#ph"+data[i].typeName).append(phContent)
                    $("#"+data[i].typeName).append(videoContent+"<div class=\"clearfix\"></div>\n" )
                    videoContent="";
                    phContent="";
                    $(".flex-column").append("<li class=\"nav-item\">\n" +
                        "                <a class=\"nav-link\" href=\"#t"+data[i].typeName+"\">"+data[i].typeName+"</a>\n" +
                        "            </li>")
                }
            },
        });
    }
    goDetail=function (pv) {
        location.href="/pv"+pv;
    }

    changeVideo=function (divName,type) {
        $.ajax({
            url: "/index/randVideoInfo",
            type: "get",
            dataType: "json",
            data: {
                videoType:type
            },
            success: function (data) {
                var tbody=$(divName)
                tbody.empty()
                for (var i = 0; i < data.length; i++) {
                    var tx="";
                    if (data[i].videoPlay>=10000){
                        tx="silvery"
                    }
                    if (data[i].videoPlay>=20000){
                        tx="golden"
                    }
                    tbody.append(`<div class="spread-module col-md-3 col-sm-6 col-xs-12"><a href="/pv${data[i].videoPv}" target="_blank"><div class="pic"><div class="lazy-img"><img alt="${data[i].videoTitle}" src="${data[i].videoImage}"></div><i class="icon medal ${tx}"></i><div class="cover-preview-module"><!----><div class="progress-bar"><span style="width: 0%;"></span></div></div><div class="mask-video"></div><div class="danmu-module"></div><span class="dur">${data[i].videoTime}</span><!----><!----><div class="watch-later-trigger w-later"></div></div><p title="${data[i].videoTitle}" class="t">${data[i].videoTitle}</p><p class="num"><span class="play"><i class="icon"></i>${data[i].videoPlay}</span><span class="danmu"><i class="icon"></i>${data[i].videoBarrage}</span></p></a></div>`)
                }
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
            },
        });
    }
    ajaxUserInfo();
    ajaxVideoInfo();
    $("#van-popover-9985").hide();
})
$('#myScrollspy').on('activate.bs.scrollspy', function () {
    var top=$(this).offset().top;//获取body滚动距离
    if(top>=850){                 //如果达到某个值
        //将元素的position属性置为absolute
        $("ul.nav-pills").css("transform","translateY(10%)")
    }else {
        $("ul.nav-pills").css("transform","translateY(60%)")
    }
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
function toCategory(pid,id) {
    if (pid==1){
        location.href="/categoryinfo/"+id;
    }else{
        location.href="/categoryinfo/"+pid+"/"+id;
    }

}