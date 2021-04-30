function mouseoutCollect() {
    $("#van-popover-3742").remove();
}

function mouseoverCollect(obj) {
    var left = $(obj).offset().left;
    var top = $(obj).offset().top;
    var url = "/collect/collectLevel";
    $.getJSON(url, function (collectLevelList) {
        var div = "<div role='tooltip' id='van-popover-3742' aria-hidden='true' class='van-popover van-popper van-popper-favorite'" +
            " tabindex='0' style='position:fixed;top:" + top + ";left:" + left + ";width: 520px; transform-origin: center top 0px; z-index: 2161;'   onmouseout='mouseoutCollect()'><!---->" +
            "<div data-v-64b63b5f='' class='vp-container'>" +
            "<div data-v-64b63b5f='' class='tabs-panel'>";
        for (var i = 0; i < collectLevelList.length; i++) {
            var collect = collectLevelList[i];
            if (collect.title == "默认收藏夹") {
                div +=
                    "<div data-v-64b63b5f='' class='tab-item tab-item--active'><span data-v-64b63b5f='' title='" + collect.title + "'" +
                    "class='title'>" + collect.title + "</span><span" +
                    "data-v-64b63b5f='' class='num'>" + collect.videoCount + "</span></div>";
            } else {
                div +=
                    "<div data-v-64b63b5f='' class='tab-item tab-item--normal'><span data-v-64b63b5f='' title='" + collect.title + "'" +
                    "class='title'>" + collect.title + "</span><span" +
                    "data-v-64b63b5f='' class='num'>" + collect.videoCount + "</span></div>";
            }
        }
        div += " <!----></div>" +
            "<div data-v-64b63b5f='' class='favorite-video-panel'>" +
            "<div data-v-64b63b5f='' class='favorite-video-list'>" +
            "<div data-v-64b63b5f=''><a data-v-37582e0a='' data-v-64b63b5f=''" +
            "   href='//www.bilibili.com/video/BV1sA411V7vQ' target='_blank'" +
            "   class='header-video-card'>" +
            "<div data-v-37582e0a='' class='video-preview multiple-preview'><!----><!---->" +
            "<div data-v-c05424d6='' data-v-37582e0a='' class='video-card-img'><!----><!----><img" +
            "data-v-c05424d6='' src='//i1.hdslb.com/bfs/archive/6f091d4119c87aec894f54b40587bc8b45b49754.jpg@140w_79h_1c_100q.webp' alt='' class='default-img'>" +
            "<div data-v-c05424d6=''><!----><!---->" +
            "<div data-v-c05424d6='' class='duration-tag'>06:36</div>" +
            "</div>" +
            "</div><!----></div>" +
            "<div data-v-37582e0a='' class='video-info'>" +
            "<div data-v-37582e0a='' title='【潘晓婷】今天不剪辑！20年台球训练法大曝光' class='line-2'>【潘晓婷】今天不剪辑！20年台球训练法大曝光" +
            "</div><!---->" +
            "<div data-v-37582e0a='' class='info'><!----><span data-v-37582e0a='' class='up'>潘晓婷</span></div>" +
            "</div>" +
            "</a></div>" +
            "</div>" +
            "<div data-v-64b63b5f='' class='play-view-all'><!----><!----><a data-v-64b63b5f='' href='//www.bilibili.com/medialist/play/ml142897163' target='_blank' class='play-all'><i" +
            "data-v-64b63b5f='' class='bilifont bili-icon_dingdao_bofang'></i>" +
            "播放全部" +
            "</a><!----></div>" +
            "</div>" +
            "</div>" +
            "<div x-arrow='' class='popper__arrow' style='left: 446.5px;'></div>" +
            "</div>";
        $("body").append(div);
    })


}