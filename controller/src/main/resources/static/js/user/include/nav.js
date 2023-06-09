$(function () {
    $(".btn-search").click(function () {
        goSearch()
    })
    $("input[type=text].form-control").focus(function () {
        if ($(this).val().length>0){
            ajaxSearchSuggest($(this).val())
        }else{
            ajaxSearchHistory()
        }
    }).bind('input propertychange', 'textarea', function () {
        $("#bilibili-search-history").hide()
        $("#bilibili-search-suggest").hide()
        if ($(this).val().length>0){
            ajaxSearchSuggest($(this).val())
        }else{
            ajaxSearchHistory()
        }
    });

    loadTitleVideo=()=>{
        var local1=document.getElementById('video');  //获取，函数执行完成后local内存释放
        local1.autoplay = true; // 自动播放
        local1.loop = true; // 循环播放
        local1.muted=true; // 关闭声音，如果为false,视频无法自动播放
        if(local1.paused){  //判断是否处于暂停状态
            local1.play();  //开启播放
        }
    }

    ajaxSearchSuggest=(title)=>{
        $.ajax({
            url: "/search/getKeyWord",
            type: "get",
            dataType: "json",
            data:{
                title
            },
            success: function (data) {
                $(".bilibili-search-suggest").empty()
                for (var i = 0; i < data.length; i++) {
                    $(".bilibili-search-suggest").append(`<li class="suggest-item"><a href="/search/goSearch?videoTitle=${data[i].videoTitle}" title="${data[i].videoTitle}" target="_blank">${data[i].videoTitle}</a></li>`)
                }
                $(".suggest-item a").each(function () {
                    $(this).html(setHighLight($(this).html(), title));
                });
                if (data.length>0){
                    $("#bilibili-search-suggest").fadeIn()
                }else{
                    $("#bilibili-search-suggest").fadeOut()
                }
            }
        })
    }

    ajaxSearchHistory=()=>{
        $.ajax({
            url: "/search/searchHistory",
            type: "get",
            dataType: "json",
            success: function (data) {
                $(".bilibili-search-history").empty()
                for (var i = 0; i < data.historyList.length; i++) {
                    $(".bilibili-search-history").append(`<li class="history-item"><a
                                                href="/search/goSearch?videoTitle=${data.historyList[i].title}"
                                                target="_blank">${data.historyList[i].title}</a><i onclick="delSearchHistory('${data.historyList[i].title}')"
                                                class="bilifont bili-icon_sousuo_yichu cancel-icon"></i></li>`)
                }
                if (data.historyList.length>0){
                    $("#bilibili-search-history").fadeIn()
                }else{
                    $("#bilibili-search-history").fadeOut()
                }
            }
        })
    }

    goSearch = function () {
        var videoTitle = $("input[type=text]").val();
        if (videoTitle == "") {
            videoTitle = $("input[type=text]").attr("placeholder");
        }
        $.ajax({
            url: "/search/searchHistory",
            type: "post",
            data: {
                title: videoTitle
            },
            dataType: "json",
            success: function (data) {
                console.log(data.message)
            }
        })
        location.href = "/search/goSearch?videoTitle=" + videoTitle;
    }
    ajaxRandTitle = () => {
        $.ajax({
            url: "/index/randTitle",
            type: "get",
            dataType: "text",
            success: function (data) {
                $("#bs-example-navbar-collapse-1 .text-center .input-group .form-control").attr("placeholder", data)
            }
        })
    }
    ajaxAddExperience = (obj) => {
        $.ajax({
            url: "/user/addExperience",
            type: "get",
            dataType: "json",
            success: function (data) {
                $(obj).parent().html(data.message)
                if (data.code == 0) {
                    ajaxUserInfo()
                }
            }
        })
    }
    ajaxUserInfo = function () {
        $.ajax({
            url: "/user/getLevel",
            type: "get",
            dataType: "json",
            success: function (data) {
                if (data.user == null) {
                    $(".loginInfo").html("<div data-v-069d576e=\"\" class=\"lt-row\"><div data-v-069d576e=\"\" class=\"lt-col\"><div data-v-069d576e=\"\" class=\"login-tip\"><div data-v-069d576e=\"\" class=\"close\"><svg onclick=\"javascript:$('.lt-row').remove()\" data-v-069d576e=\"\" viewBox=\"0 0 100 100\"><path data-v-069d576e=\"\" d=\"M2 2 L98 98 M 98 2 L2 98Z\" stroke-width=\"10px\" stroke=\"#212121\" stroke-linecap=\"round\"></path></svg></div><div data-v-069d576e=\"\" class=\"title\">\n" +
                        "    登录pilipili，享受更多权益！\n" +
                        "</div><div data-v-38236bf2=\"\" data-v-069d576e=\"\" class=\"content\"><div data-v-38236bf2=\"\"><div data-v-38236bf2=\"\" class=\"lt-icon icon-hd\"></div><span data-v-38236bf2=\"\" class=\"lt-text\">免费看高清视频</span></div><div data-v-38236bf2=\"\"><div data-v-38236bf2=\"\" class=\"lt-icon icon-time\"></div><span data-v-38236bf2=\"\" class=\"lt-text\">多端同步播放记录</span></div><div data-v-38236bf2=\"\"><div data-v-38236bf2=\"\" class=\"lt-icon icon-danmaku\"></div><span data-v-38236bf2=\"\" class=\"lt-text\">发表弹幕/评论</span></div><div data-v-38236bf2=\"\"><div data-v-38236bf2=\"\" class=\"lt-icon icon-video\"></div><span data-v-38236bf2=\"\" class=\"lt-text\">热门番剧影视看不停</span></div></div><a data-v-069d576e=\"\" href=\"/user/login\" class=\"login-btn\">\n" +
                        "    立即登录\n" +
                        "</a></div></div></div>")
                    return;
                }
                $("#imgcircle").attr("src", data.user.userPic)
                var tbody = $("#van-popover-9985");
                var qdbutton = ""
                if (data.user.loginDate != getNowFormatDate()) qdbutton = "<span style='float: right;font-size: 8px' id='qdmessage'><button onclick='ajaxAddExperience(this)'>签到</button></span>"
                tbody.empty();
                tbody.append("<a data-v-59fd5a91=''href='/user/space'target='_blank' class='avatar'><div class='bili-avatar'>   <img class='bili-avatar-img bili-avatar-face bili-avatar-img-radius'        data-src='" + data.user.userPic + "'        alt=''        src='" + data.user.userPic + "'>     <span class='bili-avatar-icon'></span>     </div> </a>")
                tbody.append("<p data-v-59fd5a91=\"\" class=\"nickname\" style=\"padding-top: 42px;\">" + data.user.nickName + "</p><!----><div data-v-59fd5a91=\"\" class=\"level-content\"><div data-v-59fd5a91=\"\" class=\"level-info\"><span data-v-59fd5a91=\"\"class=\"grade\">等级 " + data.user.level + "</span><span data-v-59fd5a91=\"\" class=\"\">\n" +
                    "            " + data.user.experience + " / " + data.nextExperience + "\n" +
                    "          </span>" +
                    qdbutton +
                    "</div><a data-v-59fd5a91=\"\"href=\"https://account.bilibili.com/account/record?type=exp\"target=\"_blank\" class=\"level-link\"><div data-v-59fd5a91=\"\" class=\"level-bar\"><div data-v-59fd5a91=\"\" class=\"level-progress\"  style=\"width: " + data.bar + "%;\"></div></div></a><div data-v-59fd5a91=\"\" class=\"level-intro\"><p data-v-59fd5a91=\"\" class=\"level-intro__title\">作为LV" + data.user.level + "，你获得以下特权</p><div data-v-59fd5a91=\"\" class=\"level-intro__content\">成为正式会员,你可以：<br>1、发射个性弹幕<br>2、参与视频评论<br>3、登入获得硬币<br>4、投稿成为偶像</div><a data-v-59fd5a91=\"\"href=\"//www.bilibili.com/blackboard/help.html#%E4%BC%9A%E5%91%98%E7%AD%89%E7%BA%A7%E7%9B%B8%E5%85%B3?id=7251c4ab69d44a8ebbbd276dea46d790\"target=\"_blank\" class=\"level-intro__link\">会员等级相关说明<svg data-v-59fd5a91=\"\" aria-hidden=\"true\" class=\"svg-icon\"> <use data-v-59fd5a91=\"\"xlink:href=\"#bili-icon_caozuo_xiangyou\"></use></svg></a></div></div><div data-v-59fd5a91=\"\" class=\"counts\"><a data-v-59fd5a91=\"\"href=\"/user/subs/list/\"target=\"_blank\" class=\"count-item\"><div data-v-59fd5a91=\"\" class=\"item-key\">关注</div><div data-v-59fd5a91=\"\" class=\"item-value\"><span data-v-59fd5a91=\"\"class=\"item-num\">" + data.user.subscribeNum + "</span><spandata-v-59fd5a91=\"\" class=\"item-unit\"></span></div></a><a data-v-59fd5a91=\"\" href=\"/user/fans/list/" + data.user.userId + "\"target=\"_blank\" class=\"count-item\"><div data-v-59fd5a91=\"\" class=\"item-key\">粉丝</div><div data-v-59fd5a91=\"\" class=\"item-value\"><span data-v-59fd5a91=\"\"class=\"item-num\">" + data.user.fansNum + "</span><spandata-v-59fd5a91=\"\" class=\"item-unit\"></span></div></a></div><div data-v-59fd5a91=\"\" class=\"links\"><a data-v-59fd5a91=\"\"href=\"/user/space\"target=\"_blank\" class=\"link-item\"><div data-v-59fd5a91=\"\" class=\"link-title\"><i data-v-59fd5a91=\"\"class=\"link-icon bilifont bili-icon_dingdao_gerenzhongxin\"></i>个人中心</div></a><a data-v-59fd5a91=\"\"href=\"/admin?url=creative\"target=\"_blank\" class=\"link-item\"><div data-v-59fd5a91=\"\" class=\"link-title\"><i data-v-59fd5a91=\"\"class=\"link-icon bilifont bili-icon_dingdao_tougaoguanli\"></i>投稿管理</div></a></div><div data-v-59fd5a91=\"\" onclick=\"javascript:location.href='/admin/account/logout'\" class=\"logout\"><span data-v-59fd5a91=\"\"><idata-v-59fd5a91=\"\"class=\"link-icon bilifont bili-icon_dingdao_dengchu\"></i>退出</span></div>  </div>")
            },
        });
    }
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

    $.ajax({
        url: "/index/typedata",
        type: "get",
        dataType: "json",
        success: function (data) {
            var menu = $("#primaryChannelMenu")
            menu.empty();
            var isOn=""
            for (var i = 0; i < data.length; i++) {
                if (data[i].id==$('#cateId').val()||data[i].id==$('#cateParentId').val())isOn="on"; else isOn="";
                menu.append(`<span> <div class="item van-popover__reference" aria-describedby="van-popover-4031" tabindex="0"><a href="/categoryinfo/${data[i].id}" class="name ${isOn}"><span>${data[i].categoryName}<em>${data[i].count}</em></span>
                        <!----></a></div></span>`)
            }
        }
    });

    ajaxUserInfo();
    ajaxRandTitle();
    $("#bilibili-search-history").hide()
    $("#bilibili-search-suggest").hide()
    $("#van-popover-9985").hide();
    loadTitleVideo();
    $(".img-circle").hover(function () {
        $("#van-popover-9985").fadeIn("slow")
        ajaxUserInfo()
    }, function () {
    })
    $("#van-popover-9985").hover(function () {
    }, function () {
        $("#van-popover-9985").stop()
        $("#van-popover-9985").fadeOut(100)
    })
    $(".layer video").on('mouseenter mousemove', function (e) {
        var w = $(this).width();
        var offsetX = 0.5 - e.pageX / w;

        var offset = parseInt($(this).data('offset'));
        var translate = "translateX(" + Math.round(offsetX * offset) + "px)";
        $(this).css({
            'transition': "transform 0.1s linear 0s",
            '-webkit-transform': translate,
            'transform': translate,
            'moz-transform': translate
        });

    }).on('mouseout', function () {
        $(this).css({
            'transition': "transform 0.2s linear 0s",
            '-webkit-transform': "translateX(0px)",
            'transform': "translateX(0px)",
            'moz-transform': "translateX(0px)"
        });
    });
     delSearchHistory=title=>{
        $.ajax({
            url: "/search/delHistory",
            type: "post",
            data: {
                title
            },
            dataType: "json",
            success: function (data) {
                if (data.message=="true"){
                    ajaxSearchHistory()
                }
            }
        })
    }
})

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate() - 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function onKeyDown(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 27) { // 按 Esc
        //要做的事情
    }
    if (e && e.keyCode == 113) { // 按 F2
        //要做的事情
    }
    if (e && e.keyCode == 13) { // enter 键
        goSearch()
    }
}
$(document).bind('click', function (e) {
    var e = e || window.event; //浏览器兼容性
    var elem = e.target || e.srcElement;
    while (elem) { //循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id == 'test') {
            return;
        }
        elem = elem.parentNode;
    }
    $("#bilibili-search-history").fadeOut()
    $("#bilibili-search-suggest").fadeOut()
});
function setHighLight(itemDOM, keyWord) {
    var regExp = new RegExp(keyWord, 'g');
    var newDOM = itemDOM.replace(regExp, '<em class="suggest_high_light" >' + keyWord + '</em>');
    return newDOM;
}