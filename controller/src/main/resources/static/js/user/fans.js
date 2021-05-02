$(function () {
    $(".follow-item").click(function () {
        $(".follow-item").removeClass("cur")
        $(this).addClass("cur")
        var text=$(this).find(".text").text()
        $(".item.cur").text(text)
        if (text=="我的粉丝"){
            ajaxFansList()
        }else{
            ajaxSubList()
        }
    })
    ajaxFansList = function () {
        var uid = $("#uid").val()
        var currPage = $("#currPage").val()
        $.ajax({
            url: "/user/fansList/fansdata",
            type: "get",
            dataType: "json",
            data: {
                userId: uid,
                currPage: currPage
            },
            success: function (data) {
                var tbody = $(".relation-list");
                tbody.empty();
                for (var i = 0; i < data.dataList.length; i++) {
                    if (data.dataList[i].subYou){
                        tbody.append("<li class=\"list-item clearfix\"><div class=\"follow-select\" style=\"display: none;\"><div class=\"icon icon-follow-watched\"></div></div><a href=\"//space.bilibili.com/431644534/\" target=\"_blank\" class=\"cover\"><img src=\"" + data.dataList[i].userPic + "\" alt=\"幽独CQB\"><!----><!----></a><div class=\"content\"><a href=\"/user/space/" + data.dataList[i].userId + "\" target=\"_blank\" class=\"title\"><!----><span class=\"fans-name\">" + data.dataList[i].nickName + "</span></a><p title=\"这个人没有填简介啊~~~\" class=\"desc\">\n" +
                            "                "+ data.dataList[i].upDesc + "\n" +
                            "              </p><div class=\"fans-action\"><div uid='"+data.dataList[i].userId+"' onmouseenter='ulMouseenter(this)' onmouseleave='ulMouseleave(this)' class=\"be-dropdown fans-action-btn fans-action-follow\"><!----><span class=\"fans-action-text\">已互粉</span><!----><span class=\"icon icon-arrow\"></span><ul uid='"+data.dataList[i].userId+"' onmouseenter='ulMouseenter(this)' onmouseleave='ulMouseleave(this)' class=\"be-dropdown-menu menu-align- zoom-enter-active zoom-enter-to\" style=\" transform-origin: center top;display: none\"><li onclick='ajaxDelSub(\"fans,"+data.dataList[i].userId+"\")' class=\"be-dropdown-item\">\n" +
                            "                        取消关注\n" +
                            "                      </li><!----></ul><!----></div><div class=\"be-dropdown\"><div class=\"be-dropdown-trigger\"><i title=\"更多操作\" class=\"iconfont icon-ic_more\"></i></div><ul class=\"be-dropdown-menu menu-align-\" style=\"left: 1108px; top: 277px; transform-origin: center top; display: none;\"><li class=\"be-dropdown-item\"><a target=\"_blank\" href=\"//message.bilibili.com/#whisper/mid431644534\">发消息</a></li><li class=\"be-dropdown-item\">移除粉丝</li><!----><!----></ul></div></div></div></li>")
                    }else{
                        tbody.append("<li class=\"list-item clearfix\"><div class=\"follow-select\" style=\"display: none;\"><div class=\"icon icon-follow-watched\"></div></div><a href=\"//user/space/" + data.dataList[i].userId + "\" target=\"_blank\" class=\"cover\"><img src=\"" + data.dataList[i].userPic + "\" alt=\"bili_49902748598\"><!----><!----></a><div class=\"content\"><a href=\"/user/space/" + data.dataList[i].userId + "\" target=\"_blank\" class=\"title\"><!----><span class=\"fans-name\">" + data.dataList[i].nickName + "</span></a><p title=\"这个人没有填简介啊~~~\" class=\"desc\">\n" +
                            "                " + data.dataList[i].upDesc + "\n" +
                            "            </p><div class=\"fans-action\"><div onclick='ajaxSub(\"fans,"+data.dataList[i].userId+"\")' class=\"fans-action-btn follow\"><i class=\"icon-back-follow grey\"></i><span class=\"fans-action-text\">关注</span></div><div class=\"be-dropdown\"><div class=\"be-dropdown-trigger\"><i title=\"更多操作\" class=\"iconfont icon-ic_more\"></i></div><ul class=\"be-dropdown-menu menu-align-\" style=\"left: 0px; top: 0px; transform-origin: center top; display: none;\"><li class=\"be-dropdown-item\"><a target=\"_blank\" href=\"//message.bilibili.com/#whisper/mid474836510\">发消息</a></li><li class=\"be-dropdown-item\">移除粉丝</li><!----><!----></ul></div></div></div></li>")
                    }
                }
                var pageUtil = {
                    index: data.index,
                    totalPageCount: data.totalPageCount,
                    totalCount: data.totalCount
                };
                flashPage(pageUtil, ajaxFansList);
                $("#fansli .num").text(data.allDataList.length)
                ajaxCount()
            }
        })
    }

    ajaxSub = (text) => {
        var textarr=text.split(",")
        var subId = textarr[1]
        $.ajax({
            url: "/sub/sub",
            type: "get",
            data: {
                subId
            },
            dataType: "json",
            success: function (data) {
                if (data.code==0){
                    if (textarr[0]=="fans"){
                        ajaxFansList()
                    }else{
                        ajaxSubList()
                    }
                }
                else {
                    alert(data.message)
                }
            }
        })
    }
    ajaxDelSub = (text) => {
        var textarr=text.split(",")
        var subId = textarr[1]
        $.ajax({
            url: "/sub/del",
            type: "get",
            data: {
                subId
            },
            dataType: "json",
            success: function (data) {
                if (data.code==0){
                    if (textarr[0]=="fans"){
                        ajaxFansList()
                    }else{
                        ajaxSubList()
                    }
                }
                else {
                    alert(data.message)
                }
            }
        })
    }

    ajaxSubList = function () {
        var uid = $("#uid").val()
        var currPage = $("#currPage").val()
        $.ajax({
            url: "/user/fansList/subsdata",
            type: "get",
            dataType: "json",
            data: {
                userId: uid,
                currPage: currPage
            },
            success: function (data) {
                var tbody = $(".relation-list");
                tbody.empty();
                for (var i = 0; i < data.dataList.length; i++) {
                    if (data.dataList[i].subYou){
                        tbody.append("<li class=\"list-item clearfix\"><div class=\"follow-select\" style=\"display: none;\"><div class=\"icon icon-follow-watched\"></div></div><a href=\"//space.bilibili.com/431644534/\" target=\"_blank\" class=\"cover\"><img src=\"" + data.dataList[i].userPic + "\" alt=\"幽独CQB\"><!----><!----></a><div class=\"content\"><a href=\"/user/space/" + data.dataList[i].userId + "\" target=\"_blank\" class=\"title\"><!----><span class=\"fans-name\">" + data.dataList[i].nickName + "</span></a><p title=\"这个人没有填简介啊~~~\" class=\"desc\">\n" +
                            "                "+ data.dataList[i].upDesc + "\n" +
                            "              </p><div class=\"fans-action\"><div uid='"+data.dataList[i].userId+"' onmouseenter='ulMouseenter(this)' onmouseleave='ulMouseleave(this)' class=\"be-dropdown fans-action-btn fans-action-follow\"><!----><span class=\"fans-action-text\">已互粉</span><!----><span class=\"icon icon-arrow\"></span><ul uid='"+data.dataList[i].userId+"' onmouseenter='ulMouseenter(this)' onmouseleave='ulMouseleave(this)' class=\"be-dropdown-menu menu-align- zoom-enter-active zoom-enter-to\" style=\" transform-origin: center top;display: none\"><li onclick='ajaxDelSub(\"subs,"+data.dataList[i].userId+"\")' class=\"be-dropdown-item\">\n" +
                            "                        取消关注\n" +
                            "                      </li><!----></ul><!----></div><div class=\"be-dropdown\"><div class=\"be-dropdown-trigger\"><i title=\"更多操作\" class=\"iconfont icon-ic_more\"></i></div><ul class=\"be-dropdown-menu menu-align-\" style=\"left: 1108px; top: 277px; transform-origin: center top; display: none;\"><li class=\"be-dropdown-item\"><a target=\"_blank\" href=\"//message.bilibili.com/#whisper/mid431644534\">发消息</a></li><li class=\"be-dropdown-item\">移除粉丝</li><!----><!----></ul></div></div></div></li>")
                    }else{
                        tbody.append("<li class=\"list-item clearfix\"><div class=\"follow-select\" style=\"display: none;\"><div class=\"icon icon-follow-watched\"></div></div><a href=\"//space.bilibili.com/431644534/\" target=\"_blank\" class=\"cover\"><img src=\"" + data.dataList[i].userPic + "\" alt=\"幽独CQB\"><!----><!----></a><div class=\"content\"><a href=\"/user/space/" + data.dataList[i].userId + "\" target=\"_blank\" class=\"title\"><!----><span class=\"fans-name\">" + data.dataList[i].nickName + "</span></a><p title=\"这个人没有填简介啊~~~\" class=\"desc\">\n" +
                            "                "+ data.dataList[i].upDesc + "\n" +
                            "              </p><div class=\"fans-action\"><div uid='"+data.dataList[i].userId+"' onmouseenter='ulMouseenter(this)' onmouseleave='ulMouseleave(this)' class=\"be-dropdown fans-action-btn fans-action-follow\"><!----><span class=\"fans-action-text\">已关注</span><!----><span class=\"icon icon-arrow\"></span><ul uid='"+data.dataList[i].userId+"' onmouseenter='ulMouseenter(this)' onmouseleave='ulMouseleave(this)' class=\"be-dropdown-menu menu-align- zoom-enter-active zoom-enter-to\" style=\" transform-origin: center top;display: none\"><li onclick='ajaxDelSub(\"subs,"+data.dataList[i].userId+"\")' class=\"be-dropdown-item\">\n" +
                            "                        取消关注\n" +
                            "                      </li><!----></ul><!----></div><div class=\"be-dropdown\"><div class=\"be-dropdown-trigger\"><i title=\"更多操作\" class=\"iconfont icon-ic_more\"></i></div><ul class=\"be-dropdown-menu menu-align-\" style=\"left: 1108px; top: 277px; transform-origin: center top; display: none;\"><li class=\"be-dropdown-item\"><a target=\"_blank\" href=\"//message.bilibili.com/#whisper/mid431644534\">发消息</a></li><li class=\"be-dropdown-item\">移除粉丝</li><!----><!----></ul></div></div></div></li>")
                    }
                }
                var pageUtil = {
                    index: data.index,
                    totalPageCount: data.totalPageCount,
                    totalCount: data.totalCount
                };
                flashPage(pageUtil, ajaxSubList);
                $("#subsli .num").text(data.allDataList.length)
                ajaxCount()
            }
        })
    }

    var bt=$(".flex-c-s .item").text()
    $(".follow-item").removeClass("cur")
    if (bt=="我的粉丝"){
        ajaxFansList()
        $("#fansli").addClass("cur")
    }else{
        ajaxSubList()
        $("#subsli").addClass("cur")
    }
    ajaxCount=()=>{
        $.ajax({
            url: "/user/subscribeList",
            type: "get",
            dataType: "json",
            data: {
                userId: $("#uid").val()
            },
            success: function (data) {
                $("#subsli .num").text(data.subsCount)
                $("#fansli .num").text(data.fansCount)
            }
        })
    }
    ajaxCount()

    ulMouseenter=function (obj) {
        var uid=$(obj).attr("uid");
        $(".zoom-enter-active[uid='"+uid+"']").css({position:"absolute",left:"-10px",top:"24px",'z-index':2});
        $(".zoom-enter-active[uid='"+uid+"']").slideDown()
    }
    ulMouseleave=function (obj) {
        var uid=$(obj).attr("uid");
        $(".zoom-enter-active[uid='"+uid+"']").hide()
    }

})