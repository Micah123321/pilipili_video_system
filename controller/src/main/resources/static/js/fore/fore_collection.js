$(function () {
    initCollectVideos(0, "");
    initCollectLevel();
    $(".icon-close").click(function () {
        $(".edit-mask").css("display", "none");
    })

})

//新建收藏夹
function newCollect() {
    $(".edit-mask").css("display", "block");
    $("#media-list-name").val("");
    $("#media-list-intro").val("");
    $(".submit-btn").click(function () {
        var title = $("#media-list-name").val();
        var intro = $("#media-list-intro").val();
        var url = "/collect/addCollect?title=" + title;
        if (intro != null || intro != "") {
            url += "&intro=" + intro;
        }
        $.post(url, function (data) {
            if (data.addResult == "true") {
                $(".edit-mask").css("display", "none");
                $(".create").css("display", "block");
                initCollectLevel();
                setTimeout(function () {
                    $(".create").hide();
                }, 1000);
            }
        })
    })
}

function figureTitle() {
    $('#media-list-name').bind('input propertychange', 'textarea', function () {
        var curLength = $(this).val().trim().length;
        if (curLength > 20) {
            var num = $(this).val().trim().substr(0, 20);
            $(this).val(num);
        }
        $(".name-num-limit").text($(this).val().trim().length + "/20");
    });
}

function figureIntro() {
    $('#media-list-intro').bind('input propertychange', 'textarea', function () {
        var curLength = $(this).val().trim().length;
        if (curLength > 200) {
            var num = $(this).val().trim().substr(0, 200);
            $(this).val(num);
        }
        $(".intro-num-limit").text($(this).val().trim().length + "/200");
    });
}

function onZoneBy() {
    var onZoneBy = $("#onZoneBy");
    if (onZoneBy.is(":visible")) {
        onZoneBy.slideUp();//隐藏
    } else {
        onZoneBy.slideDown();//显示
        byCategory();
    }
    // onZoneBy.slideToggle();
    document.getElementById("onOrderBy").style.display = 'none'
}

function onOrderBy() {
    var onOrderBy = $("#onOrderBy");
    if (onOrderBy.is(":visible")) {
        onOrderBy.slideUp();//隐藏
    } else {
        onOrderBy.slideDown();//显示
    }
    // onOrderBy.slideToggle();
    document.getElementById("onZoneBy").style.display = 'none'
}

function mouseoutCollect() {
    $(".contentCollect").css("display", "none");
}

function mouseoverCollect(obj) {
    //offset()获取当前元素基于浏览的位置
    var left = $(obj).offset().left;//元素相当于窗口的左边的偏移量
    var top = $(obj).offset().top;//元素相对于窗口的上边的偏移量
    var fid = $(obj).attr("fid");
    //设置panel2的位置基于unamespan的坐标
    $(".contentCollect[fid=" + fid + "]").css({
        position: "fixed",
        'top': top - 202,
        'left': left + 110,
        'z-index': 2,
        'display': 'block'
    });

}

function mouseoutCollectD() {
    $(".defaultCollect").css("display", "none");
}

function mouseoverCollectD(obj) {
    //offset()获取当前元素基于浏览的位置
    var left = $(obj).offset().left;//元素相当于窗口的左边的偏移量
    var top = $(obj).offset().top;//元素相对于窗口的上边的偏移量

    //设置panel2的位置基于unamespan的坐标
    $(".defaultCollect").css({
        position: "fixed",
        'top': top - 202,
        'left': left + 110,
        'z-index': 2,
        'display': 'block'
    });
    // $(".defaultCollect").css("display", "block");
}

//初始化收藏夹详情
function initHeaderLevel() {
    var title = $("#headerLevel").val();
    var url = "/collect/collectLevel?title=" + title;
    $.getJSON(url, function (headerList) {
        var div = "";
        for (var i = 0; i < headerList.length; i++) {
            var head = headerList[i];
            div += "<div class='favInfo-box'><a href='' target='_blank' class='favInfo-cover'><!---->" +
                "<img src='' alt=''>" +
                "<i class='icon icon-favlist-info'></i><!----><!----></a><div class='favInfo-details'>" +
                "<a href='' target='_blank' class='fav-name'>" + head.title + "</a>" +
                "<div class='fav-meta'><span class='fav-up-name'>创建者：" + head.pUser.userName + "</span></div>" +
                "<div class='fav-meta'><span>" + head.videoCount + "个内容</span><span class='dot'>·</span><span>公开</span></div>" +
                "<div class='fav-options defaultFav'><a href='' target='_blank' class='fav-play'><i class='iconfont icon-bofang'></i>播放全部视频" +
                "</a><div class='meta'><i class='iconfont icon-dianzan'></i><span>点赞</span><!----></div><!----><div class='meta'><i class='iconfont icon-fenxiang'></i><span>分享</span><!----></div></div></div></div>";
        }
        $(".favList-info").html(div);
    })
}

//初始化收藏夹
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
                ul += "<div fid='" + collect.id + "' class='fav-item cur' onmouseout='mouseoutCollectD()'  onmouseover='mouseoverCollectD(this)'><span class='iconfont icon-bodan'></span>" +
                    "<a href='javascript:;' onclick='byCollect(&apos;" + collect.title + "&apos;," + collect.videoCount + ")' class='text router-link-exact-active router-link-active' title='" + collect.title + "'>" + collect.title + "</a>" +
                    "<span class='num collect-edit' fid='" + collect.id + "'>" + collect.videoCount + "</span>" +
                    "<div class='be-dropdown collect-edit'>" +
                    "<div class='be-dropdown-trigger'  ><i class='iconfont icon-ic_more' ></i></div>" +
                    "<ul class='be-dropdown-menu menu-align- collect-menu defaultCollect' style='left: 79px; top: 418px; transform-origin: center top; display: none;' onmouseout='mouseoutCollectD()'  onmouseover='mouseoverCollectD(this)'>" +
                    "<li class='be-dropdown-item' onclick='editCollect(&apos;" + collect.title + "&apos;,&apos;" + collect.intro + "&apos;,&apos;" + collect.id + "&apos;)'>编辑信息</li>" +
                    "</ul></div></div>";
                $(".nav-title").after(ul);
                $("#count").val(collect.videoCount);
            } else {
                ul = "";
                ul += "<li fid='" + collect.id + "' class='fav-item' draggable='false' onmouseover='mouseoverCollect(this)' onmouseout='mouseoutCollect()' ><span title='拖动排序'class='icon icon-cursor'></span>" +
                    "<span class='iconfont icon-bodan'></span>" +
                    "<a href='javascript:;' onclick='byCollect(&apos;" + String(collect.title) + "&apos;," + collect.videoCount + ")' class='text' title='" + collect.title + "' draggable='false'>" + collect.title + "</a>" +
                    "<span  fid='" + collect.id + "' class='num'>" + collect.videoCount + "</span>" +
                    "<div class='be-dropdown collect-edit'>" +
                    "<div class='be-dropdown-trigger'><i class='iconfont icon-ic_more' fid='" + collect.id + "'  ></i></div>" +
                    "<ul fid='" + collect.id + "' class='be-dropdown-menu menu-align- collect-menu contentCollect' style='left: 79px; top: 462px; transform-origin: center top; display: none;'  onmouseout='mouseoutCollect()'  onmouseover='mouseoverCollect(this)'>" +
                    "<li class='be-dropdown-item be-dropdown-item-delimiter' onclick='editCollect(&apos;" + collect.title + "&apos;,&apos;" + collect.intro + "&apos;,&apos;" + collect.id + "&apos;)'>编辑信息</li>" +
                    "<li class='be-dropdown-item' onclick='editDeleteCollect(&apos;" + collect.id + "&apos;)'>删除</li></ul></div></li>";
                $(".fav-list").append(ul);
                $("#count").val(collect.videoCount);
            }
        }
    })
    initHeaderLevel();
}

//编辑删除收藏夹
function editDeleteCollect(id) {
    $("body").append("<div class='modal-container lastDelete' style=''><div class='modal-mask'></div><div class='modal-wrapper' style='width: 400px;'>" +
        "<div class='modal'><div class='modal-header'><i class='modal-header-close iconfont icon-ic_close' onclick='removeDelete()'></i><div class='modal-title'><p>确认提示</p>" +
        "</div></div><div class='modal-body'>确定删除这个收藏夹吗？</div><div data-v-1ea3cefa='' class='btn-container modal-footer btn-center'>" +
        "<a data-v-7b0ffc38='' class='btn primary' data-v-1ea3cefa='' onclick='deleteCollect(&apos;" + id + "&apos;)'><!----><span data-v-7b0ffc38='' class='btn-content'>确定</span></a>" +
        "<a data-v-7b0ffc38='' class='btn default' data-v-1ea3cefa='' onclick='removeDelete()'><!----><span data-v-7b0ffc38='' class='btn-content'>取消</span></a>" +
        "</div></div></div></div>")
}

//删除收藏夹
function deleteCollect(id) {
    var url = "/collect/delCollect?id=" + id;
    $.post(url, function (data) {
        if (data.delResult == "true") {
            removeDelete();
            $(".del-msg").css("display", "block");
            $(".fav-item[fid=" + id + "]").remove();
            setTimeout(function () {
                $(".del-msg").hide();
            }, 1000);
        }
    })
}

function removeDelete() {
    $(".lastDelete").remove();
}

//编辑收藏夹
function editCollect(title, intro, id) {
    figureTitle();
    figureIntro();
    $(".edit-mask").css("display", "block");
    $("#media-list-name").val(title);
    initCollectVideos(0, "");
    if (intro == "" || intro == null || intro == "null") {
        $("#media-list-intro").val("");
    } else {
        $("#media-list-intro").val(intro);
    }
    $(".submit-btn").click(function () {
        var title = $("#media-list-name").val();
        var intro = $("#media-list-intro").val();
        var url = "/collect/updateCollect?title=" + title + "&id=" + id;
        if (intro != null || intro != "" || intro == "null") {
            url += "&intro=" + intro;
        }
        $.post(url, function (data) {
            if (data.updateResult == "true") {
                $(".edit-mask").css("display", "none");
                $(".edit").css("display", "block");
                initCollectLevel();
                setTimeout(function () {
                    $(".edit").hide();
                }, 1000);
            }
        })
    })
}

//查看收藏夹
function byCollect(title, count) {
    backTo();
    $("#byOrderId").val("1");
    $("#currPage").val("1");
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
    initCollectVideos(0, "");
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
        initCollectVideos(0, "");
    } else {
        initCollectVideos(categoryId, categoryName);
    }
}

//视频列表
function initCollectVideos(categoryId, categoryName) {
    var title = $("#headerLevel").val();
    var orderId = $("#byOrderId").val();
    var currPage = $("#currPage").val();
    var url = "/collect/collectList?title=" + title + "&currPage=" + currPage;
    if (orderId != null || orderId != '') {
        url += "&orderId=" + orderId;
    }
    if (categoryId != null || categoryId != '') {
        url += "&categoryId=" + categoryId;
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
        if (collectList.length > 0) {
            $(".fav-content.section").removeClass("empty");
            $(".be-pager").css("display", "block");
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
                        "<div data-aid='" + video.videoPv + "' class='be-dropdown video-edit' onclick='editVideo(this)'><div class='be-dropdown-trigger' ><i title='更多操作' class='iconfont icon-ic_more'></i></div>" +
                        "<ul data-aid='" + video.videoPv + "' class='be-dropdown-menu menu-align- edit-video' style='left: 0px; top: 0px; transform-origin: center top 0px; display: none;'>" +
                        "<li class='be-dropdown-item be-dropdown-item-delimiter' onclick='cancelCollect(&apos;" + video.videoPv + "&apos;,&apos;" + collect.collectId + "&apos;)'>取消收藏</li>" +
                        "<li class='be-dropdown-item' onclick='moveVideo(&apos;" + video.videoPv + "&apos;,&apos;" + collect.collectId + "&apos;,&apos;1&apos;)'>移动到</li>" +
                        "<li class='be-dropdown-item' onclick='copyVideo(&apos;" + video.videoPv + "&apos;,&apos;2&apos;)'>复制到</li>" +
                        "</ul></div><div class='video-check-container' style='display: none;'><div class='video-check icon'></div></div></li>";

                }
            }
            flashPage(currPage, r.pages);
            $(".fav-video-list").html(ul);
        } else {
            $(".fav-content.section").addClass("empty");
            $(".be-pager").css("display", "none");
        }
    })
}

function actVideo() {
    var type = $("#type").val();
    if (type == 1) {
        moveByCollect();
    } else if (type == 2) {
        copyByCollect();
    }
}

//复制视频
function copyVideo(videoId, type) {
    $("#type").val(type);
    $("#videoPv").val(videoId);
    $(".edit-video-modal").css("display", "block");
    $(".edit-video-title").html("你正在复制1个视频到")
    $(".icon-ic_close").click(function () {
        $(".edit-video-modal").css("display", "none");
    })
    initEditCollect();
}

function copyByCollect() {
    var videoPv = $("#videoPv").val();
    var collectId = $("#newCollectId").val();
    var url = "/collect/copyCollectVideo?videoId=" + videoPv + "&collectId=" + collectId;
    $.post(url, function (data) {
        if (data.copyResult == "true") {
            if (data.numResult == "true") {
                initHeaderLevel();
                initCollectVideos(0, "");
                $(".edit-video-modal").css("display", "none");
                $(".copy-msg").css("display", "block");
                setTimeout(function () {
                    $(".copy-msg").hide();
                }, 1000);
            } else {
                $(".num[fid=" + collectId + "]").html(($(".num[fid=" + collectId + "]").html() * 1) + 1)
                initHeaderLevel();
                initCollectVideos(0, "");
                $(".edit-video-modal").css("display", "none");
                $(".copy-msg").css("display", "block");
                setTimeout(function () {
                    $(".copy-msg").hide();
                }, 1000);
            }
        }
    })
}

//移动视频
function moveVideo(videoPv, oldCollectId, type) {
    $("#type").val(type);
    $("#videoPv").val(videoPv);
    $("#oldCollectId").val(oldCollectId);
    $(".edit-video-modal").css("display", "block");
    $(".edit-video-title").html("你正在移动1个视频到")
    $(".icon-ic_close").click(function () {
        $(".edit-video-modal").css("display", "none");
    })
    initEditCollect();
}

function initEditCollect() {
    var title = $("#headerLevel").val();
    var url = "/collect/collectLevel";
    $.getJSON(url, function (collectList) {
        var ul = "";
        for (var i = 0; i < collectList.length; i++) {
            var collect = collectList[i];
            if (collect.title == title) {
                ul += "<li class='target-favitem disabled'>" +
                    "<div class='target-fav-title'>" +
                    "<div class='fav-select'></div>" +
                    "<div class='fav-meta'><p class='fav-name'>" + collect.title + "</p>" +
                    "<p class='fav-state'>公开</p></div>" +
                    "</div>" +
                    "<span class='target-fav-count'>" + collect.videoCount + "</span></li>";
                $(".target-favlist-container").html(ul);
            } else {
                ul += "<li class='target-favitem' cid='" + collect.id + "'>" +
                    "<div class='target-fav-title'>" +
                    "<div class='fav-select' onclick='selectedCollect(this)' cid='" + collect.id + "'></div>" +
                    "<div class='fav-meta'><p class='fav-name'>" + collect.title + "</p>" +
                    "<p class='fav-state'>公开</p></div>" +
                    "</div>" +
                    "<span class='target-fav-count'>" + collect.videoCount + "</span></li>";
                $(".target-favlist-container").html(ul);
            }
        }
    })
}

function moveByCollect() {
    var videoPv = $("#videoPv").val();
    var oldCollectId = $("#oldCollectId").val();
    var newCollectId = $("#newCollectId").val();
    var url = "/collect/moveCollectVideo?videoId=" + videoPv + "&oldCollectId=" + oldCollectId + "&collectId=" + newCollectId;
    $.post(url, function (data) {
        if (data.moveResult == "true") {
            if (data.numResult == "true") {
                $(".fav-item.cur .num").html($(".fav-item.cur .num").html() - 1);

                $(".small-item[data-aid=" + videoPv + "]").remove();
                initHeaderLevel();
                initCollectVideos(0, "");
                $(".edit-video-modal").css("display", "none");
                $(".move-msg").css("display", "block");
                setTimeout(function () {
                    $(".move-msg").hide();
                }, 1000);
            } else {
                $(".fav-item.cur .num").html($(".fav-item.cur .num").html() - 1);
                $(".num[fid=" + newCollectId + "]").html(($(".num[fid=" + newCollectId + "]").html() * 1) + 1);
                $(".small-item[data-aid=" + videoPv + "]").remove();
                initHeaderLevel();
                initCollectVideos(0, "");
                $(".edit-video-modal").css("display", "none");
                $(".move-msg").css("display", "block");
                setTimeout(function () {
                    $(".move-msg").hide();
                }, 1000);
            }
        }
    })
}

//选中选择的收藏夹
function selectedCollect(obj) {
    $("#newCollectId").val($(obj).attr("cid"));
    $(".fav-select.selected").removeClass("selected");
    $(obj).addClass("selected");
}

function newCollectVideo() {
    $(".fake-fav-input ").remove();
    $(".addfav-container").html("<div class='fav-container add-tip'><div class='fav-add-tip'>点击弹窗内其他区域或ESC键，取消新建收藏夹" +
        "<i class='blue-arrow'></i></div><input type='text' placeholder='最多输入20个字' maxlength='20' class='add-fav-input space_input' >" +
        "<div class='fav-add-btn' onclick='newCollectTwo()'>新建</div></div>");
}

function newCollectTwo() {
    var title = $(".add-fav-input").val();
    var url = "/collect/addCollect?title=" + title;
    $.post(url, function (data) {
        if (data.addResult == "true") {
            initCollectLevel();
            initEditCollect();
            $(".add-tip").remove();
            $(".addfav-container").html("<div class='fake-fav-input' onclick='newCollectVideo()'><i class='icon-fav-add'></i><p>新建收藏夹</p></div>");
        }
    })
}

function mouseupCollect(e) {
    var pop = $(".add-fav-input");
    if (!pop.is(e.target) && pop.has(e.target).length === 0) {
        $(".fake-fav-input ").remove();
        $(".addfav-container").html("<div class='fav-container add-tip'><div class='fav-add-tip'>点击弹窗内其他区域或ESC键，取消新建收藏夹" +
            "<i class='blue-arrow'></i></div><input type='text' placeholder='最多输入20个字' maxlength='20' class='add-fav-input space_input'  >" +
            "<div class='fav-add-btn'>新建</div></div>");
    } else {
        $(".add-tip").remove();
        $(".addfav-container").html("<div class='fake-fav-input' onclick='newCollectVideo()'><i class='icon-fav-add'></i><p>新建收藏夹</p></div>");
    }
}

function onKeyNewCollectDown(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 27) { // 按 Esc
        $(".add-tip").remove();
        $(".addfav-container").html("<div class='fake-fav-input' onclick='newCollectVideo()'><i class='icon-fav-add'></i><p>新建收藏夹</p></div>")
    }
    if (e && e.keyCode == 113) { // 按 F2
        //要做的事情
    }
    if (e && e.keyCode == 13) { // enter 键
        //要做的事情
    }
}

//取消收藏
function cancelCollect(videoPv, collectId) {
    var url = "/collect/delCollectVideo?videoPv=" + videoPv + "&collectId=" + collectId;
    $.post(url, function (data) {
        if (data.delResult == "true") {
            $(".cancel-video").css("display", "block");
            $(".fav-item.cur .num").html($(".fav-item.cur .num").html() - 1);
            initCollectVideos(0, "");
            setTimeout(function () {
                $(".cancel-video").remove();
            }, 1000);
        }
    })
}

//操作视频
function editVideo(obj) {
    var fid = $(obj).attr("data-aid");
    if ($(".edit-video[data-aid=" + fid + "]").is(":visible")) {
        $(".edit-video[data-aid=" + fid + "]").slideUp();//隐藏
    } else {
        $(".edit-video[data-aid=" + fid + "]").slideDown();//显示
        //offset()获取当前元素基于浏览的位置
        var left = $(obj).offset().left;//元素相当于窗口的左边的偏移量
        var top = $(obj).offset().top;//元素相对于窗口的上边的偏移量
        //设置panel2的位置基于unamespan的坐标
        $(".edit-video[data-aid=" + fid + "]").css({
            position: "fixed",
            'top': top - 410,
            'left': left - 75,
            'z-index': 1000,
            'display': 'block'
        });
    }
}

//进行收藏筛选
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
        initCollectVideos(0, "");
    } else {
        initCollectVideos(categoryId, categoryName);
    }
}

//分区筛选
function byCategory() {
    $("#currPage").val("1");
    var title = $("#headerLevel").val();
    var url = "/collect/categoryBy?title=" + title;
    var count = $(".fav-item.cur .num").html();

    $.getJSON(url, function (categoryList) {
        $("#onZoneBy").empty();
        var ul = "<li class='be-dropdown-item' onclick='initCollectVideos(0)'><span>全部分区</span><i>" + count + "</i></li>";
        for (var i = 0; i < categoryList.length; i++) {
            var category = categoryList[i];
            ul += "<li class='be-dropdown-item' onclick='initCollectVideos(" + category.pCategory.parentId + ",&apos;" + category.categoryName + "&apos;)'><span>" + category.categoryName + "区</span><i class='cateCount' caid='" + category.pCategory.id + "'>" + category.categoryCount + "</i></li>";
        }
        $("#onZoneBy").append(ul);
    })
}

//分页
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

//分页
function goto(curr) {
    if (curr <= 0) return;
    $("#currPage").val(curr);
    var categoryId = $("#categoryId").val();
    var categoryName = $("#categoryName").val();
    initCollectVideos(categoryId, categoryName)
}

//单击搜索
search = function () {
    if (keyword == "") return;
    $("#currPage").val("1");
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
        $("#currPage").val("1");
        searchToContent()
    }
}

//搜索
function searchToContent() {
    var keyword = $("#search").val();
    var title = $("#headerLevel").val();
    var currPage = $("#currPage").val();
    var videoCount = "";
    var url = "/collect/collectList?title=" + title + "&currPage=" + currPage;
    if (keyword != null || keyword != '') {
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
                    "<div data-aid='" + video.videoPv + "' class='be-dropdown video-edit' onclick='editVideo(this)'><div class='be-dropdown-trigger'><i title='更多操作' class='iconfont icon-ic_more'></i></div>" +
                    "<ul data-aid='" + video.videoPv + "' class='be-dropdown-menu menu-align- edit-video' style='left: 0px; top: 0px; transform-origin: center top 0px; display: none;'>" +
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
            $(".fav-header.fav-header-action").after("<div class='fav-content section empty search-page'><div class='search-empty-hint'><p>没有在 " + title + "里找到你要的视频</p><div data-v-1ea3cefa='' class='btn-container btn-center'><a data-v-7b0ffc38='' class='btn primary' data-v-1ea3cefa=''><!----><span data-v-7b0ffc38='' class='btn-content'>" +
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

//返回
function backTo() {
    $(".be-pager").css("display", "block");
    $(".fav-header.fav-header-action").remove();
    $(".fav-header.fav-header-info").remove();
    $(".fav-content.section.empty.search-page").remove();
    $(".favList-info").after("<div class='fav-header fav-header-info'>" +
        "<div class='fav-info clearfix'>" +
        "<div class='fav-filters clearfix'>" +
        // "<div class='filter-item do-batch'><span class='text'>批量操作</span></div>" +
        "<div class='be-dropdown filter-item' onclick='onZoneBy()'><span id='zoneBy'>全部分区<i" +
        "class='icon icon-arrow'></i></span>" +
        "<ul class='be-dropdown-menu filter-type menu-align-' id='onZoneBy'" +
        "style='transform-origin: center top; display: none;'>" +
        "" +
        "</ul><!----></div>" +
        "<div class='be-dropdown filter-item' onclick='onOrderBy()'><span id='orderBy'>" +
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










