$(function () {
    initCollectVideos(0,"","");
    initCollectLevel();
    // $("#orderBy").click(function () {
    //     var onOrderBy = $("#onOrderBy");
    //     // if (onOrderBy.is(":visible")) {
    //     //     onOrderBy.slideUp();//隐藏
    //     // }else{
    //     //     onOrderBy.slideDown();//显示
    //     // }
    //     onOrderBy.slideToggle();
    //     if ($("#onZoneBy").is(":visible")) {
    //         document.getElementById("onZoneBy").style.display = 'none'
    //     }
    // })
    //
    // $("#zoneBy").click(function () {
    //     var onZoneBy = $("#onZoneBy");
    //     // if (onZoneBy.is(":visible")) {
    //     //     onZoneBy.slideUp();//隐藏
    //     // }else{
    //     //     onZoneBy.slideDown();//显示
    //     //     byCategory();
    //     // }
    //     onZoneBy.slideToggle();
    //     byCategory();
    //     if ($("#onOrderBy").is(":visible")) {
    //         document.getElementById("onOrderBy").style.display = 'none'
    //     }
    // })
    $(".nav-title.nav-add").click(function () {
        $(".edit-mask").css("display", "block");
    })
    $(".icon-close").click(function () {
        $(".edit-mask").css("display", "none");
    })

    $(".be-dropdown.collect-edit").hover(function () {
        alert("1111")
        $(".collect-menu").css("display","block");
    },function () {
        $(".collect-menu").css("display","block");
    })
})

function initHeaderLevel() {
    var title = $("#headerLevel").val();
    var url = "/collect/collectLevel?title=" + title;
    $.getJSON(url, function (headerList) {
        var div = "";
        for (var i = 0; i < headerList.length; i++) {
            var head = headerList[i];
            div += "<div class='favInfo-box'><a href='//www.bilibili.com/medialist/detail/ml142897163?type=1' target='_blank' class='favInfo-cover'><!---->" +
                "<img src='//i1.hdslb.com/bfs/archive/6f091d4119c87aec894f54b40587bc8b45b49754.jpg@380w_240h_100Q_1c.webp' alt=''>" +
                "<i class='icon icon-favlist-info'></i><!----><!----></a><div class='favInfo-details'>" +
                "<a href='//www.bilibili.com/medialist/detail/ml142897163?type=1' target='_blank' class='fav-name'>" + head.title + "</a>" +
                "<div class='fav-meta'><span class='fav-up-name'>创建者：" + head.pUser.userName + "</span></div>" +
                "<div class='fav-meta'><span>" + head.videoCount + "个内容</span><span class='dot'>·</span><span>公开</span></div>" +
                "<div class='fav-options defaultFav'><a href='//www.bilibili.com/medialist/play/ml142897163' target='_blank' class='fav-play'><i class='iconfont icon-bofang'></i>播放全部视频" +
                "</a><div class='meta'><i class='iconfont icon-dianzan'></i><span>点赞</span><!----></div><!----><div class='meta'><i class='iconfont icon-fenxiang'></i><span>分享</span><!----></div></div></div></div>";
        }
        $(".favList-info").html(div);
    })
}

function initCollectLevel() {
    var url = "/collect/collectLevel";
    $.getJSON(url, function (colloectLevelList) {
        $(".fav-list").empty();
        $(".fav-item.cur").remove();
        var ul = "";
        for (var i = 0; i < colloectLevelList.length; i++) {
            var collect = colloectLevelList[i];
            if (collect.title == "默认收藏夹") {
                ul = "";
                ul += "<div fid='" + collect.id + "' class='fav-item cur'><span class='iconfont icon-bodan'></span>" +
                    "<a href='javascript:;' onclick='byCollect(&apos;" + collect.title + "&apos;," + collect.videoCount + ")' class='text router-link-exact-active router-link-active' title='" + collect.title + "'>" + collect.title + "</a>" +
                    "<span class='num'>" + collect.videoCount + "</span>" +
                    "<div class='be-dropdown collect-edit'>" +
                    "<div class='be-dropdown-trigger'><i title='更多操作' class='iconfont icon-ic_more'></i></div>" +
                    "<ul class='be-dropdown-menu menu-align- collect-menu' style='left: 79px; top: 418px; transform-origin: center top; display: none;'>" +
                    "<li class='be-dropdown-item'>编辑信息</li>" +
                    "</ul></div></div>";
                $(".nav-title").after(ul);
                $("#count").val(collect.videoCount);
            } else {
                ul = "";
                ul += "<li fid='" + collect.id + "' class='fav-item' draggable='false'><span title='拖动排序'class='icon icon-cursor'></span>" +
                    "<span class='iconfont icon-bodan'></span>" +
                    "<a href='javascript:;' onclick='byCollect(&apos;" + String(collect.title) + "&apos;," + collect.videoCount + ")' class='text' title='" + collect.title + "' draggable='false'>" + collect.title + "</a>" +
                    "<span class='num'>" + collect.videoCount + "</span>" +
                    "<div class='be-dropdown collect-edit'>" +
                    "<div class='be-dropdown-trigger'><i title='更多操作' class='iconfont icon-ic_more'></i></div>" +
                    "<ul class='be-dropdown-menu menu-align- collect-menu' style='left: 79px; top: 462px; transform-origin: center top; display: none;'>" +
                    "<li class='be-dropdown-item be-dropdown-item-delimiter'>编辑信息</li>" +
                    "<li class='be-dropdown-item'>删除</li></ul></div></li>";
                $(".fav-list").append(ul);
                $("#count").val(collect.videoCount);
            }
        }
    })
    initHeaderLevel();
}

function byCollect(title, count) {
    backTo();
    $("#byOrderId").val("1");
    var orderId = $("#byOrderId").val();
    var byOrderName = "";
    if (orderId == "1") {
        byOrderName = "最近收藏";
    } else if (orderId == "2") {
        byOrderName = "最多播放";
    } else if (orderId == "3") {
        byOrderName = "最新投稿";
    }
    $("#orderBy").html(byOrderName + "<i class='icon icon-arrow'></i>");
    $("#count").val(count);
    $("#headerLevel").val(title);
    initCollectVideos(0, "", "");
    var categoryId = $("#categoryId").val();
    var categoryName = $("#categoryName").val();
    var duration = $("#fav-createdList-container .fav-item");
    duration.each(function () {
        $(this).click(function () {
            duration.removeClass("cur");
            $(this).addClass("cur");
        })
    })
    if ($("#onOrderBy").is(":visible")) {
        document.getElementById("onOrderBy").style.display = 'none';
    }
    if ($("#onZoneBy").is(":visible")) {
        document.getElementById("onZoneBy").style.display = 'none';
    }
    initHeaderLevel();
    if (categoryId == 0) {
        initCollectVideos(0, "","");
    } else {
        initCollectVideos(categoryId, categoryName);
    }
}


function initCollectVideos(categoryId, categoryName, keyword) {
    $("#orderBy").click(function () {
        var onOrderBy = $("#onOrderBy");
        if (onOrderBy.is(":visible")) {
            onOrderBy.slideUp();//隐藏
        } else {
            onOrderBy.slideDown();//显示
        }
        // onOrderBy.slideToggle();
        document.getElementById("onZoneBy").style.display = 'none'
    })

    $("#zoneBy").click(function () {
        var onZoneBy = $("#onZoneBy");
        if (onZoneBy.is(":visible")) {
            onZoneBy.slideUp();//隐藏
        } else {
            onZoneBy.slideDown();//显示
            byCategory();
        }
        // onZoneBy.slideToggle();
        document.getElementById("onOrderBy").style.display = 'none'
    })
    var title = $("#headerLevel").val();
    var orderId = $("#byOrderId").val();
    var currPage = $("#currPage").val();
    var url = "/collect/collectList?title=" + title + "&currPage=" + currPage;
    if (orderId != null && orderId != '') {
        url += "&orderId=" + orderId;
    }
    if (categoryId != null && categoryId != '') {
        url += "&categoryId=" + categoryId;
    }
    if (keyword != null && keyword != '') {
        url += "&keyword=" + keyword;
    }
    $("#categoryId").val(categoryId);
    $("#categoryName").val(categoryName);
    var cateId = $("#categoryId").val();
    var cateName = $("#categoryName").val();
    if (cateId == 0) {
        $("#zoneBy").html("全部分区" + "<i class='icon icon-arrow'></i>");
    } else {
        $("#zoneBy").html(cateName + "区" + "<i class='icon icon-arrow'></i>");
    }
    $.getJSON(url, function (r) {
        var ul = "";
        var collectList = r.list;
        var play = "";
        for (var i = 0; i < collectList.length; i++) {
            var collect = collectList[i];
            for (var j = 0; j < collect.pVideosList.length; j++) {
                var video = collect.pVideosList[j];
                play = (video.videoPlay * 1) > (9999 * 1) ? ((video.videoPlay - video.videoPlay % 1000) / 10000 + '万') : (video.videoPlay);
                ul += "<li data-aid='" + video.videoPv + "' class='small-item'><a data-v-53490a4f='' href='' target='_blank' class='cover cover-normal'><!---->" +
                    "<img data-v-53490a4f='' src='" + video.videoImage + "' alt='" + video.videoTitle + "' class='cover-img'>" +
                    "<span data-v-53490a4f='' class='length'>" + video.videoTime + "</span><span data-v-53490a4f='' class='i-watchlater'></span>" +
                    "<div data-v-53490a4f='' class='meta-mask'><div data-v-53490a4f='' class='meta-info'><p data-v-53490a4f='' class='view'>播放：" + play + "</p>" +
                    "<p data-v-53490a4f='' class='favorite'>收藏：" + video.videoCollect + "</p><p data-v-53490a4f='' class='author'>UP主：" + collect.pUser.userName + "</p>" +
                    "<p data-v-53490a4f='' class='pubdate'>投稿：" + video.videoUpdatetime + "</p></div></div><div data-v-53490a4f='' class='disabled-cover'>" +
                    "<div data-v-53490a4f='' class='candle'></div><p data-v-53490a4f=''>视频已失效</p><!----></div></a>" +
                    "<a target='_blank' href='' title='" + video.videoTitle + "' class='title'>" + video.videoTitle + "</a>" +
                    "<div class='meta pubdate'>收藏于：" + collect.addTime + "</div>" +
                    "<div class='be-dropdown video-edit'><div class='be-dropdown-trigger'><i title='更多操作' class='iconfont icon-ic_more'></i></div>" +
                    "<ul class='be-dropdown-menu menu-align-' style='left: 0px; top: 0px; transform-origin: center top 0px; display: none;' onclick='operationVideos()'>" +
                    "<li class='be-dropdown-item be-dropdown-item-delimiter'>取消收藏</li>" +
                    "<li class='be-dropdown-item'>移动到</li>" +
                    "<li class='be-dropdown-item'>复制到</li>" +
                    "</ul></div><div class='video-check-container' style='display: none;'><div class='video-check icon'></div></div></li>";

            }
        }
        flashPage(currPage, r.pages);
        $(".fav-video-list").html(ul);
    })
}

function operationVideos() {
    
}

function byOrder(orderId) {
    $("#byOrderId").val(orderId);
    var categoryId = $("#categoryId").val();
    var categoryName = $("#categoryName").val();
    var byOrderName = "";
    if (orderId == "1") {
        byOrderName = "最近收藏";
    } else if (orderId == "2") {
        byOrderName = "最多播放";
    } else if (orderId == "3") {
        byOrderName = "最新投稿";
    }
    $("#orderBy").html(byOrderName + "<i class='icon icon-arrow'></i>");
    if (categoryId == 0) {
        initCollectVideos(categoryId, categoryName);
    } else {
        initCollectVideos(categoryId, categoryName);
    }

}

function byCategory() {
    var title = $("#headerLevel").val();
    var url = "/collect/categoryBy?title=" + title;
    var count = $(".fav-item.cur .num").html();
    $.getJSON(url, function (categoryList) {
        $("#onZoneBy").empty();
        var ul = "<li class='be-dropdown-item' onclick='initCollectVideos(0)'><span>全部分区</span><i>" + count + "</i></li>";
        for (var i = 0; i < categoryList.length; i++) {
            var category = categoryList[i];
            ul += "<li class='be-dropdown-item' onclick='initCollectVideos(" + category.pCategory.id + ",&apos;" + category.categoryName + "&apos;)'><span>" + category.categoryName + "区</span><i>" + category.categoryCount + "</i></li>";
        }
        $("#onZoneBy").append(ul);
    })
}

function flashPage(index, totalPageCount) {
    $(".be-pager").empty();
    var pageDiv = $(".be-pager");
    var pageContent = "<li onclick='goto(" + (index - 1) + ")'class='be-pager-prev'>上一页</li> ";
    for (var i = 1; i <= totalPageCount; i++) {
        if (i - index >= -5 && i - index <= 5) {
            if (i == index) {
                pageContent = pageContent + "<li class='be-pager-item be-pager-item-active'>" + i + "</li>"
            } else {
                pageContent = pageContent + "<li onclick='goto(" + (i) + ")' class='be-pager-item'>" + i + "</li>";
            }
        }
    }
    pageContent = pageContent + "<li onclick='goto(" + ((index * 1) + 1) + ")' class='be-pager-next'>下一页</li><span class='be-pager-total'> 共 <span id='totalPageCount'>" + totalPageCount + "</span> 页，</span><span class='be-pager-options-elevator'> 跳至 <input type='text' class='space_input' onchange='changeInput()' id='changeInput'> 页</span>";
    pageDiv.html(pageContent);
    if (index <= 1) {
        $(".be-pager-prev").addClass("be-pager-disabled").children("a").attr("onclick", null);
    }
    if (index >= totalPageCount) {
        $(".be-pager-next").addClass("be-pager-disabled").children("a").attr("onclick", null);
    }

    changeInput = function () {
        $("#currPage").val($("#changeInput").val())
        var categoryId = $("#categoryId").val();
        var categoryName = $("#categoryName").val();
        initCollectVideos(categoryId, categoryName)
    }
}

function goto(curr) {
    if (curr <= 0) return;
    $("#currPage").val(curr);
    var categoryId = $("#categoryId").val();
    var categoryName = $("#categoryName").val();
    initCollectVideos(categoryId, categoryName)
}

search = function () {
    if (keyword == "") return;
    searchToContent();
}

//搜索框键盘响应
function onKeyDown(event) {

    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 27) { // 按 Esc
//要做的事情
    }
    if (e && e.keyCode == 113) { // 按 F2
//要做的事情
    }
    if (e && e.keyCode == 13) { // enter 键
        searchToContent()
    }
}

function searchToContent() {
    var keyword = $("#search").val();
    var title = $("#headerLevel").val();
    var currPage = $("#currPage").val();
    var videoCount = "";
    var url = "/collect/collectList?title=" + title + "&currPage=" + currPage;
    if (keyword != null && keyword != '') {
        url += "&keyword=" + keyword;
    }
    $.getJSON(url, function (r) {
        $(".fav-header.fav-header-info").remove();
        $(".fav-header.fav-header-action").remove();
        $(".fav-content.section.empty.search-page").remove();
        var ul = "";
        var collectList = r.list;
        var play = "";
        for (var i = 0; i < collectList.length; i++) {
            var collect = collectList[i];
            for (var j = 0; j < collect.pVideosList.length; j++) {
                var video = collect.pVideosList[j];
                play = (video.videoPlay * 1) > (9999 * 1) ? ((video.videoPlay - video.videoPlay % 1000) / 10000 + '万') : (video.videoPlay);
                ul += "<li data-aid='" + video.videoPv + "' class='small-item'><a data-v-53490a4f='' href='' target='_blank' class='cover cover-normal'><!---->" +
                    "<img data-v-53490a4f='' src='" + video.videoImage + "' alt='" + video.videoTitle + "' class='cover-img'>" +
                    "<span data-v-53490a4f='' class='length'>" + video.videoTime + "</span><span data-v-53490a4f='' class='i-watchlater'></span>" +
                    "<div data-v-53490a4f='' class='meta-mask'><div data-v-53490a4f='' class='meta-info'><p data-v-53490a4f='' class='view'>播放：" + play + "</p>" +
                    "<p data-v-53490a4f='' class='favorite'>收藏：" + video.videoCollect + "</p><p data-v-53490a4f='' class='author'>UP主：" + collect.pUser.userName + "</p>" +
                    "<p data-v-53490a4f='' class='pubdate'>投稿：" + video.videoUpdatetime + "</p></div></div><div data-v-53490a4f='' class='disabled-cover'>" +
                    "<div data-v-53490a4f='' class='candle'></div><p data-v-53490a4f=''>视频已失效</p><!----></div></a>" +
                    "<a target='_blank' href='' title='" + video.videoTitle + "' class='title'>" + video.videoTitle + "</a>" +
                    "<div class='meta pubdate'>收藏于：" + collect.addTime + "</div>" +
                    "<div class='be-dropdown video-edit'><div class='be-dropdown-trigger'><i title='更多操作' class='iconfont icon-ic_more'></i></div>" +
                    "<ul class='be-dropdown-menu menu-align-' style='left: 0px; top: 0px; transform-origin: center top 0px; display: none;'>" +
                    "<li class='be-dropdown-item be-dropdown-item-delimiter'>取消收藏</li>" +
                    "<li class='be-dropdown-item'>移动到</li>" +
                    "<li class='be-dropdown-item'>复制到</li>" +
                    "</ul></div><div class='video-check-container' style='display: none;'><div class='video-check icon'></div></div></li>";
            }
            videoCount = collect.totalCount;
        }
        flashPage(currPage, r.pages);
        $(".fav-video-list").html(ul);
        if (videoCount == "") {
            $(".fav-header.fav-header-info").remove();
            searchPage(title, videoCount);
            $(".fav-action-bottom").css("display", "none");
            $(".be-pager").css("display", "none");
            $(".fav-header.fav-header-action").after("<div class='fav-content section empty search-page'><div class='search-empty-hint'><p>没有在 舞蹈 里找到你要的视频</p><div data-v-1ea3cefa='' class='btn-container btn-center'><a data-v-7b0ffc38='' class='btn primary' data-v-1ea3cefa=''><!----><span data-v-7b0ffc38='' class='btn-content'>" +
                "搜索全部收藏夹</span></a></div></div><ul class='fav-video-list clearfix content is-search'></ul></div>");
        } else {
            // $(".fav-content.section.empty.search-page").remove();
            $(".fav-header.fav-header-info").remove();
            $(".be-pager").css("display", "block");
            searchPage(title, videoCount);
        }
    })
}

function searchPage(title, videoCount) {
    $(".favList-info").after("<div class='fav-header fav-header-action'><div class='fav-action-top'><div class='back-to-info icon' onclick='backTo()'>返回</div><div class='back-to-info clear-invalid-video' style='display: none;'>清除失效内容</div><div class='clearing-invalid-video &amp;&amp; _bili_space_state === 'owner' &amp;&amp; !isSearch' style='display: none;'>正在删除失效视频…请过段时间再来访问</div><div class='filter-item search'>" +
        "<div class='search-input search-container'>" +
        "<input type='text' placeholder='输入关键词' class='search-fav-input space_input' id='search' onkeydown='onKeyDown(event)'>" +
        "<span title='点击搜索' class='icon icon-search' onclick='search()'></span></div></div></div><div class='fav-action-bottom'><div class='fav-action-fixtop clearfix' style='display: none;'><ul class='clearfix filter-disable'><li><i class='icon icon-selece-all'></i>全选" +
        "</li><li><i class='icon icon-unstar'></i>取消收藏" +
        "</li><li><i class='icon icon-copy'></i>复制到" +
        "</li><li><i class='icon icon-move'></i>移动到" +
        "</li></ul><div class='edit-detail'><span class='select-counter'>" +
        "已选择<i>0</i>个视频" +
        "</span><span class='select-cancel' style='display: none;'>取消选择</span></div></div><div class='search-results-num'>在" +
        "<span>“" + title + "”</span> 里找到" +
        "<i>" + videoCount + "</i> 个视频" +
        "</div></div></div>");
}

function backTo() {
    $(".be-pager").css("display", "block");
    $(".fav-header.fav-header-action").remove();
    $(".fav-header.fav-header-info").remove();
    $(".fav-content.section.empty.search-page").remove();
    $(".favList-info").after("<div class='fav-header fav-header-info'>" +
        "<div class='fav-info clearfix'>" +
        "<div class='fav-filters clearfix'>" +
        "<div class='filter-item do-batch'><span class='text'>批量操作</span></div>" +
        "<div class='be-dropdown filter-item'><span id='zoneBy'>全部分区<i" +
        "class='icon icon-arrow'></i></span>" +
        "<ul class='be-dropdown-menu filter-type menu-align-' id='onZoneBy'" +
        "style='transform-origin: center top; display: none;'>" +
        "" +
        "</ul><!----></div>" +
        "<div class='be-dropdown filter-item'><span id='orderBy'>" +
        "最近收藏<i class='icon icon-arrow'></i></span>" +
        "" +
        "<ul class='be-dropdown-menu menu-align-' id='onOrderBy'" +
        "style='transform-origin: center top; display: none;'>" +
        "<li class='be-dropdown-item' onclick='byOrder(&apos;1&apos;)'>最近收藏</li>" +
        "<li class='be-dropdown-item' onclick='byOrder(&apos;2&apos;)'>最多播放</li>" +
        "<li class='be-dropdown-item' onclick='byOrder(&apos;3&apos;)'>最新投稿</li>" +
        "</ul><!----></div>" +
        "<div class='filter-item search'>" +
        "<div class='search-input search-container'><input type='text' placeholder='输入关键词'" +
        "class='search-fav-input space_input' id='search' onkeydown='onKeyDown(event)'><span" +
        "title='点击搜索' class='icon icon-search' onclick='search()'></span></div>" +
        "</div></div></div></div>");
    initCollectVideos(0, null);
}

function createCollect() {
    var title = $("#media-list-name").val();
    var intro = $("#media-list-intro").val();
    var url = "/collect/addCollect?title=" + title;
    if (intro != null && intro != "") {
        url += "&intro=" + intro;
    }
    $.post(url, function (data) {
        if (data.addResult == "true") {
            $(".edit-mask").css("display", "none");
            $(".toast_wrapper.fade").css("display", "block");
            initCollectLevel();
            setTimeout(function(){$(".toast_wrapper.fade").hide();},1000);
        }
    })
}









