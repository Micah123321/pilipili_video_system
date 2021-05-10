$(function () {
    frushSearch=()=>{
        $(".suggest-wrap").hide()
        $(".hotword-wrap").hide()
        $(".history-wrap").hide()
        $(".keyword-wrap").hide()
    }
    initZone();
    common(0, "", "", "", "", "");
    $("input[type=text].form-control").focus(function () {
        frushSearch()
        if ($(this).val().length>0){
            ajaxSearchSuggest($(this).val())
        }else{
            ajaxSearchHistory()
        }
    }).bind('input propertychange', 'textarea', function () {
        frushSearch()
        if ($(this).val().length>0){
            ajaxSearchSuggest($(this).val())
        }else{
            ajaxSearchHistory()
        }
    });
    ajaxSearchSuggest=(title)=>{
        $.ajax({
            url: "/search/getKeyWord",
            type: "get",
            dataType: "json",
            data:{
                title
            },
            success: function (data) {
                $(".keyword-wrap").empty()
                for (var i = 0; i < data.length; i++) {
                    $(".keyword-wrap").append(`<li><a href="/search/goSearch?videoTitle=${data[i].videoTitle}" class="vt-text keyword">${data[i].videoTitle}</a></li>`)
                }
                $(".vt-text.keyword").each(function () {
                    $(this).html(setHighLight($(this).html(), title,"suggest_high_light"));
                });
                if (data.length>0){
                    $(".suggest-wrap").fadeIn()
                    $(".keyword-wrap").fadeIn()
                }else{
                    $(".suggest-wrap").fadeOut()
                    $(".keyword-wrap").fadeOut()
                }
            }
        })
    }
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
    ajaxSearchHistory=()=>{
        $.ajax({
            url: "/search/searchHistory",
            type: "get",
            dataType: "json",
            success: function (data) {
                $(".hotword-wrap .horizontal").empty()
                $(".history-wrap").empty()
                var titleArr=[]
                $(".history-wrap").append(`<li class="title"><span>搜索历史</span></li>`)
                for (var i = 0; i < data.historyList.length; i++) {
                    $(".history-wrap").append(`<li class="history-li"><a  href="/search/goSearch?videoTitle=${data.historyList[i].title}" class="vt-text history">${data.historyList[i].title}</a><i onclick="delSearchHistory('${data.historyList[i].title}')" class="clear"></i></li></li>`)
                    titleArr[i]=data.historyList[i].title
                }
                $(".hotword-wrap .horizontal").append(`<li class="title"><span>热搜榜</span></li>`)
                for (var i = 0; i < data.hot.length; i++) {
                    var obj=data.hot[i]
                    $(".hotword-wrap .horizontal").append(`<li><a href="/search/goSearch?videoTitle=${obj.title}" class="hz-text">
          ${obj.title}
        </a></li>`)
                }

                $(".history-wrap").append(`<li onclick="delSearchHistory('${titleArr}')" class="clearall"><a>清空搜索历史</a></li>`)
                if (data.historyList.length>0){
                    $(".suggest-wrap").fadeIn()
                    $(".history-wrap").fadeIn()
                    $(".hotword-wrap").fadeIn()
                }else{
                    $(".history-wrap").fadeOut()
                    $(".hotword-wrap").fadeIn()
                    $(".suggest-wrap").fadeIn()
                }
            }
        })
    }
})
$(function () {
    $(".btn-search").click(() => {
        goSearch()
    })
    goSearch = () => {
        var videoTitle = $("input[type=text]").val();
        location.href = "/search/goSearch?videoTitle=" + videoTitle;
    }
})


onKeyDown = event => {
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
flashPage = (index, totalPageCount) => {
    $(".pager").empty();
    var pageDiv = $(".pager");
    var pageContent = "<ul class='pages'><li onclick='goto(" + (index - 1) + ")'class='page-item prev'><button class='nav-btn iconfont icon-arrowdown2'>上一页</button></li> ";
    for (var i = 1; i <= totalPageCount; i++) {
        if (i - index >= -5 && i - index <= 5) {
            if (i == index) {
                pageContent = pageContent + "<li class='page-item active'><button class='pagination-btn num-btn'>" + i + "</button></li>"
            } else {
                pageContent = pageContent + "<li onclick='goto(" + (i) + ")' class='page-item'><button class='pagination-btn num-btn'>" + i + "</button></li>";
            }
        }
    }
    pageContent = pageContent + "<li  onclick='goto(" + ((index * 1) + 1) + ")' class='page-item next'><button class='nav-btn iconfont icon-arrowdown3'>下一页</button></li></ul>";
    pageDiv.html(pageContent);
    if (index <= 1) {
        $(".icon-arrowdown2").addClass("hidden").children("a").attr("onclick", null);
    }
    if (index >= totalPageCount) {
        $(".icon-arrowdown3").addClass("hidden").children("a").attr("onclick", null);
    }
}


goto = curr => {
    if (curr <= 0) return;
    $("#currPage").val(curr);
    var orderName = $("#orderByName").val();
    var id1 = $("#id1").val();
    var id2 = $("#id2").val();
    var videoTime = $("#videoTime").val();
    var videoTimeEnd = $("#videoTimeEnd").val();
    var type = $("#type").val();
    common(orderName, videoTime, videoTimeEnd, type, id1, id2);
}


//搜索框键盘响应

//分区的一级分类
initZone = () => {
    var parentId = $("#categoryBy li[class='filter-item active']").attr("value");
    $.ajax({
        type: "get",
        url: "/search/category/" + parentId,
        dataType: "json",
        success: function (categoryList) {
            var ul = "<li class='filter-item active' value='1'><a href='javascript:;' style='text-decoration: none;' onclick='getCategoryTwo(0,0)'>全部分区</a></li>";
            for (var i = 0; i < categoryList.length; i++) {
                var category = categoryList[i];
                ul += "<li class='filter-item' value='" + category.id + "'><a href='javascript:;' onclick='getCategoryTwo(" + category.id + ",1)' style='text-decoration: none;'>" + category.categoryName + "</a></li>";
            }
            $("#categoryBy").html(ul);
        }
    })
}

//分区的二级分类
getCategoryTwo = (id, ids) => {
    $("#currPage").val("1");
    var liobj = $("#categoryBy li");
    liobj.each(function () {
        $(this).click(function () {
            liobj.removeClass("active")
            $(this).addClass("active");
            var parentId = $("#categoryBy li[class='filter-item active']").attr("value");
            if (parentId != 1) {
                $.ajax({
                    type: "get",
                    url: "/search/category/" + parentId,
                    dataType: "json",
                    success: function (categoryList) {
                        $("#categoryBy li[class='sub-filter']").remove();
                        $(".icon-tid2-arr").remove();
                        var li = "<li style='top: 9px; left: 153px;' class='sub-filter' >" +
                            "<ul class='clearfix' id='twoCategory'>";
                        for (var i = 0; i < categoryList.length; i++) {
                            var category = categoryList[i];
                            li += "<li class='filter-item' value='" + category.id + "'><a href='javascript:;' onclick='getCategoryActive(" + category.id + ",2)' style='text-decoration: none;'>" + category.categoryName + "</a></li>";
                        }
                        li += "</ul></li>";
                        $("#categoryBy").append(li);
                    }
                })
            } else {
                $("#categoryBy li[class='sub-filter']").remove();
            }
        })
    })
    var orderName = $("#orderByName").val();
    var videoTime = $("#videoTime").val();
    var videoTimeEnd = $("#videoTimeEnd").val();
    var type = $("#type").val();
    if (id == "0") {
        $("#id1").val("");
        $("#id2").val("");
        $("#video-list").html("");
        common(orderName, videoTime, videoTimeEnd, type, "", "");
    } else {
        $("#id1").val(id);
        $("#id2").val(ids);
        common(orderName, videoTime, videoTimeEnd, type, id, ids);
    }
}

//选中全部分区进行查询
getCategoryActive = (id, ids) => {
    var liobj = $("#twoCategory li");
    liobj.each(function () {
        $(this).click(function () {
            liobj.removeClass("active");
            $(this).addClass("active");
        })
    })

    var id1 = $("#id1").val();
    var orderName = $("#orderByName").val();
    var videoTime = $("#videoTime").val();
    var videoTimeEnd = $("#videoTimeEnd").val();
    var type = $("#type").val();
    if (id1 == "0") {
        $("#id1").val("");
        $("#id2").val("");
        $("#video-list").html("");
        common(orderName, videoTime, videoTimeEnd, type, "", "");
    } else {
        $("#id1").val(id);
        $("#id2").val(ids);
        common(orderName, videoTime, videoTimeEnd, type, id, ids);
    }
}

//选中综合排序进行查询
getOrderBy = orderName => {
    var order = $("#order li");
    order.each(function () {
        $(this).click(function () {
            order.removeClass("active");
            $(this).addClass("active");
        })
    })
    var id1 = $("#id1").val();
    var id2 = $("#id2").val();
    var videoTime = $("#videoTime").val();
    var videoTimeEnd = $("#videoTimeEnd").val();
    var type = $("#type").val();
    if (orderName == "0") {
        $("#orderByName").val("");
        $("#video-list").html("");
        common("", videoTime, videoTimeEnd, type, id1, id2);
    } else {
        $("#orderByName").val(orderName);
        common(orderName, videoTime, videoTimeEnd, type, id1, id2);
    }
}
//选中全部时长进行查询
getDurationBy = (videoTime, videoTimeEnd, type) => {
    var duration = $("#duration li");
    duration.each(function () {
        $(this).click(function () {
            duration.removeClass("active");
            $(this).addClass("active");
        })
    })
    var id1 = $("#id1").val();
    var id2 = $("#id2").val();
    var orderName = $("#orderByName").val();
    if (videoTime == "allTime") {
        $("#videoTime").val("");
        $("#videoTimeEnd").val("");
        $("#type").val("");
        $("#video-list").html("");
        common(orderName, "", "", "", id1, id2);
    } else {
        $("#videoTime").val(videoTime);
        $("#videoTimeEnd").val(videoTimeEnd);
        $("#type").val(type);
        common(orderName, videoTime, videoTimeEnd, type, id1, id2);
    }
}

//模糊查询
common = (order, videoTime, videoTimeEnd, type, id, pid) => {
    var videoTitle = $("#videoTitle").val();
    $('title').text(videoTitle + "--搜索结果")
    var currPage = $("#currPage").val();
    var url = "/search/common?videoTitle=" + videoTitle + "&currPage=" + currPage;
    if (order != null && order != "") {
        url += "&order=" + order;
    }
    if (videoTime != null && videoTime != "") {
        url += "&videoTime=" + videoTime;
    }
    if (videoTimeEnd != null && videoTimeEnd != "") {
        url += "&videoTimeEnd=" + videoTimeEnd;
    }
    if (type != null && type != "") {
        url += "&type=" + type;
    }
    if (id != null && id != "") {
        url += "&category=" + id;
    }
    if (pid != null && pid != "") {
        url += "&pid=" + pid;
    }
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        success: function (r) {
            var ul = "";
            var videosList = r.list;
            for (var i = 0; i < videosList.length; i++) {
                var videos = videosList[i];
                ul += " <li style='border-radius: 10px;border: 1px solid #727272;' class='video-item matrix'>" +
                    " <a href='/pv" + videos.videoPv + "' title='" + videos.videoTitle + "' target='_blank' class='img-anchor'>" +
                    " <div class='img'><div class='lazy-img'><img class='img-rounded img-responsive' style='width: 168px;height: 100px' alt='' src='" + videos.videoImage + "'></div>" +
                    " <span class='so-imgTag_rb'>" + videos.videoTime + "</span>" +
                    " <div class='watch-later-trigger watch-later'></div>" +
                    " <span class='mask-video'></span></div>" +
                    " <!----></a><div class='info'><div class='headline clearfix'><!----><!----><span class='type hide'>videos.pCategory.categoryName</span><a title='" + videos.videoTitle + "' href='/pv" + videos.videoPv + "' target='_blank' class='title'>" + videos.videoTitle + "</a></div>" +
                    "<div class='tags'><span title='观看' class='so-icon watch-num'><i class='icon-playtime'></i>" +
                    videos.videoPlay +
                    "</span><span title='弹幕' class='so-icon hide'><i class='icon-subtitle'></i>" +
                    videos.videoBarrage +
                    "</span><span title='上传时间' class='so-icon time'><i class='icon-date'></i>" +
                    videos.videoReleasetime + "\n" +
                    "</span><span title='up主' class='so-icon'><i class='icon-uper'></i><a href='/user/space/" + videos.videoUserid + "' target='_blank' class='up-name'>" + videos.pUser.userName + "</a></span></div>\n" +
                    "</div></li>";
            }
            flashPage(currPage, r.pages);
            $("#video-list").html(ul);
            if (videoTitle != null && videoTitle != "") {
                $(".headline .title").each(function () {
                    $(this).html(setHighLight($(this).html(), videoTitle,"keyword"));
                });
            }
        }, error: function (r) {
            alert("错误")
        }
    })
}
window.onscroll = function () {
    var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollT > 100) {
        $(".search.m-auto").addClass("fixed-top")
    } else {
        $(".search.m-auto").removeClass("fixed-top")
    }
}

function setHighLight(itemDOM, keyWord,css) {
    var regExp = new RegExp(keyWord, 'g');
    var newDOM = itemDOM.replace(regExp, '<em class="'+css+'" >' + keyWord + '</em>');
    return newDOM;
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
    $(".suggest-wrap").hide()
    $(".hotword-wrap").hide()
    $(".history-wrap").hide()
    $(".keyword-wrap").hide()
});


