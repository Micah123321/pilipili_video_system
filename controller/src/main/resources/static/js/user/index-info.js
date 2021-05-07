$(function () {
    changeVideo = function (divName, type) {
        $.ajax({
            url: "/index/randVideoInfo",
            type: "get",
            dataType: "json",
            data: {
                videoType: type
            },
            success: function (data) {
                var tbody = $(divName)
                tbody.empty()
                for (var i = 0; i < data.length; i++) {
                    var tx = "";
                    if (data[i].videoPlay >= 10000) {
                        tx = "silvery"
                    }
                    if (data[i].videoPlay >= 20000) {
                        tx = "golden"
                    }
                    tbody.append(`<div class="spread-module col-md-3 col-sm-6 col-xs-12"><a href="/pv${data[i].videoPv}" target="_blank"><div class="pic"><div class="lazy-img"><img alt="${data[i].videoTitle}" src="${data[i].videoImage}"></div><i class="icon medal ${tx}"></i><div class="cover-preview-module"><!----><div class="progress-bar"><span style="width: 0%;"></span></div></div><div class="mask-video"></div><div class="danmu-module"></div><span class="dur">${data[i].videoTime}</span><!----><!----><div class="watch-later-trigger w-later"></div></div><p title="${data[i].videoTitle}" class="t">${data[i].videoTitle}</p><p class="num"><span class="play"><i class="icon"></i>${data[i].videoPlayChar}</span><span class="danmu"><i class="icon"></i>${data[i].videoBarrage}</span></p></a></div>`)
                }
            }
        })
    }

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
                    var icon=``;
                    if (data[i].typeName=="动画"){
                        icon=`<svg style="position: relative;top: 10px;" width="36" height="36" id="bili-douga" viewBox="0 0 1024 1024"><path d="M273.408 166.912h477.696c58.368 0 105.984 47.616 105.984 105.984v477.696c0 58.368-47.616 105.984-105.984 105.984H273.408c-58.368 0-105.984-47.616-105.984-105.984V273.408C166.912 215.04 215.04 166.912 273.408 166.912z" fill="#7B78EB"></path><path d="M512 525.312v98.816c33.28-14.848 72.704 0.512 87.552 33.792 14.848 33.28-0.512 72.704-33.792 87.552-16.896 7.68-35.84 7.68-53.248 0v111.616H273.408c-58.368 0-105.984-47.616-105.984-105.984V512h137.216c-21.504 19.456-24.064 53.248-4.608 74.752 19.456 21.504 53.248 24.064 74.752 4.608 21.504-18.944 24.064-53.248 4.608-74.752l-4.608-4.608H512v-40.96c-4.096 0.512-9.216 0.512-13.312 0-51.2 0-86.016-47.616-86.016-105.984s20.992-108.032 86.016-108.032h13.312V166.912h238.592c58.368 0 105.984 47.616 105.984 105.984v251.904h-120.832c20.992-23.552 19.456-59.392-3.584-80.896-23.552-20.992-59.392-19.456-80.896 3.584-19.968 21.504-19.968 55.296 0 76.8H512z" fill="#9796ED"></path><path d="M512 525.312v98.816l13.312-4.096c35.84-7.68 72.704 15.872 79.872 52.224 7.68 35.84-18.432 72.192-54.272 78.848-4.096 1.024-8.704 1.024-13.312 1.024-9.216 0-16.384-3.072-25.088-6.144v111.616h-14.336v-132.608l18.432 8.192c27.136 11.776 58.368-0.512 70.144-27.648 11.776-27.136-0.512-58.368-27.648-70.144-13.312-5.632-28.672-5.632-42.496 0l-18.432 8.192v-117.76H399.872c14.848 33.28-0.512 72.704-33.792 87.552-33.28 14.848-72.704-0.512-87.552-33.792-7.68-16.896-7.68-35.84 0-53.248H166.912V512h137.216c-21.504 19.456-24.064 53.248-4.608 74.752 19.456 21.504 53.248 24.064 74.752 4.608 21.504-19.456 24.064-53.248 4.608-74.752l-4.608-4.608H512v-39.936h-13.312c-51.2 0-86.016-47.104-86.016-105.984s20.992-109.568 86.016-109.568h13.312V166.912h13.312v105.984h-26.624c-49.664 0-73.216 33.28-73.216 94.208 0 53.248 30.72 92.672 73.216 92.672 3.584 0.512 7.68 0.512 11.264 0l15.36-2.048V512h102.912c-13.824-35.84 4.096-76.8 40.448-90.624 35.84-13.824 76.8 4.096 90.624 40.448 6.144 15.872 6.144 33.792 0 50.176h97.792v13.312h-120.832c20.992-23.552 19.456-59.392-3.584-80.896-23.552-20.992-59.392-19.456-80.896 3.584-19.968 21.504-19.968 55.296 0 76.8H512z" fill="#6A68C6"></path><path d="M444.928 693.248c-23.04 13.312-52.224 5.12-65.024-17.408-4.096-7.68-6.144-15.36-6.144-24.064V392.192c0-26.624 20.992-47.616 47.616-47.616 8.704 0 16.896 2.048 24.576 6.656l221.696 132.608c23.04 13.312 30.208 42.496 16.896 65.024-4.096 6.656-10.24 12.8-16.896 16.896" fill="#FDDE80"></path></svg>`
                    }else if (data[i].typeName=="游戏"){
                        icon=`<svg style="position: relative;top: 10px;" width="36" height="36" id="bili-douga" viewBox="0 0 1024 1024">
<path d="M166.4 166.144m90.112 0l510.976 0q90.112 0 90.112 90.112l0 510.976q0 90.112-90.112 90.112l-510.976 0q-90.112 0-90.112-90.112l0-510.976q0-90.112 90.112-90.112Z" fill="#58D598"></path><path d="M307.2 325.632h136.448v136.448H307.2zM580.096 325.632h136.448v136.448h-136.448z" fill="#17AD8A"></path><path d="M443.648 462.336v75.776h-64.256v204.544h59.392v-68.096H585.216v68.096h59.136v-204.544h-64.256v-75.776h-136.448z" fill="#17AD8A"></path>
</svg>`
                    }else if (data[i].typeName=="生活"){
                        icon=`<svg style="position: relative;top: 10px;" width="36" height="36" id="bili-douga" viewBox="0 0 1024 1024">
<path d="M881.408 664.064V504.32a168.192 168.192 0 0 0-128-162.56l-7.936-1.792v144.896a12.288 12.288 0 0 1-14.592 11.776 170.752 170.752 0 0 0-30.464-2.816h-138.752v-27.648a37.632 37.632 0 0 1 11.776-27.648 175.872 175.872 0 0 0 57.856-135.68A179.2 179.2 0 0 0 460.8 132.352a175.872 175.872 0 0 0-180.992 176.128V409.6h32.256a225.536 225.536 0 0 0 15.872 19.2 36.608 36.608 0 0 1 9.472 25.6v42.496A193.792 193.792 0 0 0 179.2 712.96a197.12 197.12 0 0 0 197.12 166.656h325.12a148.48 148.48 0 0 0 45.568-6.144 217.088 217.088 0 0 0 64.256-31.744 176.896 176.896 0 0 0 18.176-15.616l4.608-4.352a156.16 156.16 0 0 0 47.36-111.872v-35.84c0.512-3.072 0.256-6.656 0-9.984z" fill="#FFD778"></path><path d="M468.736 238.592a40.192 40.192 0 1 0 40.192 40.192 40.192 40.192 0 0 0-40.192-40.192zM323.584 362.752H217.6a34.816 34.816 0 1 0 0 69.376h106.24a34.816 34.816 0 1 0 0-69.376z" fill="#FB813A"></path>
</svg>`
                    }else{
                        icon=`<svg style="position: relative;top: 10px;" width="36" height="36" id="bili-douga" viewBox="0 0 1024 1024">
<path d="M778.496 142.08h-537.6a56.832 56.832 0 0 0-60.16 54.016v630.528a56.832 56.832 0 0 0 59.136 54.016h537.6a56.832 56.832 0 0 0 59.136-54.016V196.096a56.832 56.832 0 0 0-59.136-54.016z" fill="#54E2E2"></path><path d="M298.496 679.168h421.376a25.6 25.6 0 0 0 0-52.736H298.496a25.6 25.6 0 1 0 0 52.736zM719.872 732.928H298.496a25.6 25.6 0 1 0 0 52.736h421.376a25.6 25.6 0 0 0 0-52.736z" fill="#23ADE5"></path><path d="M272.128 237.056m80.128 0l314.112 0q80.128 0 80.128 80.128l0 154.368q0 80.128-80.128 80.128l-314.112 0q-80.128 0-80.128-80.128l0-154.368q0-80.128 80.128-80.128Z" fill="#23ADE5"></path><path d="M404.992 361.472m-49.408 0a49.408 49.408 0 1 0 98.816 0 49.408 49.408 0 1 0-98.816 0Z" fill="#2EC3E5"></path><path d="M375.552 551.936l120.832-144.384a44.544 44.544 0 0 1 68.352 0l120.832 144.384z" fill="#2EC3E5"></path></svg>`
                    }
                    tbody.append("<div class=\"videoList\">\n" +
                        "            <div class=\"col-md-8\">\n" +
                        "                <h3 id=\"t" + data[i].typeName + "\" class=\"agileits-title\">\n" +icon+
                        "                    &nbsp;" + data[i].typeName + "\n" +
                        "\n" +
                        "                    <button onclick='toCategory(" + data[i].videoParentType + "," + data[i].videoType + ")' type=\"button\" style=\"font-family: 宋体;float:right;margin-right: 5px\" class=\"btn btn-primary\"\n" +
                        "                            data-toggle=\"button\"> 更多\n" +
                        "                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n" +
                        "                             class=\"bi bi-forward\"\n" +
                        "                             viewBox=\"0 0 16 16\">\n" +
                        "                            <path d=\"M9.502 5.513a.144.144 0 0 0-.202.134V6.65a.5.5 0 0 1-.5.5H2.5v2.9h6.3a.5.5 0 0 1 .5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 0 1 .042-.028.147.147 0 0 0 0-.252.51.51 0 0 1-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.503H2a.5.5 0 0 1-.5-.5v-3.9a.5.5 0 0 1 .5-.5h6.3v-.503z\"/>\n" +
                        "                        </svg>\n" +
                        "                    </button>\n" +
                        "\n" +
                        "                    <button type=\"button\" style=\"font-family: 宋体;float:right;margin-right: 5px\" class=\"btn btn-primary\"\n" +
                        "                            onclick='changeVideo(" + data[i].typeName + "," + data[i].videoType + ")' data-toggle=\"button\"> 换一组\n" +
                        "                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n" +
                        "                             class=\"bi bi-shuffle\"\n" +
                        "                             viewBox=\"0 0 16 16\">\n" +
                        "                            <path fill-rule=\"evenodd\"\n" +
                        "                                  d=\"M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z\"/>\n" +
                        "                            <path d=\"M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z\"/>\n" +
                        "                        </svg>\n" +
                        "                    </button>\n" +
                        "                </h3>\n" +
                        "<div id='" + data[i].typeName + "' class=\"news-agileinfo\">\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "            <div class=\"col-md-4\">\n" +
                        "                <div id='ph" + data[i].typeName + "' class=\"rank-list\" >\n" +
                        "                    <header class=\"rank-header\"><span class=\"name\">排行榜</span>\n" +
                        "                        <button type=\"button\" style=\"font-family: 宋体;float:right;margin-right: 5px\"\n" +
                        "                                class=\"btn btn-primary\" onclick='toCategory(" + data[i].videoParentType + "," + data[i].videoType + ")'\n" +
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
                var videoContent = "";
                var phContent = "";

                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].dataList.length; j++) {
                        var tx = "";
                        if (data[i].dataList[j].videoPlay >= 10000) {
                            tx = "silvery"
                        }
                        if (data[i].dataList[j].videoPlay >= 20000) {
                            tx = "golden"
                        }
                        videoContent = videoContent + `<div class="spread-module col-md-3 col-sm-6 col-xs-12"><a href="/pv${data[i].dataList[j].videoPv}" target="_blank"><div class="pic"><div class="lazy-img"><img alt="${data[i].dataList[j].videoTitle}" src="${data[i].dataList[j].videoImage}"></div><i class="icon medal ${tx}"></i><div class="cover-preview-module"><!----><div class="progress-bar"><span style="width: 0%;"></span></div></div><div class="mask-video"></div><div class="danmu-module"></div><span class="dur">${data[i].dataList[j].videoTime}</span><!----><!----><div class="watch-later-trigger w-later"></div></div><p title="${data[i].dataList[j].videoTitle}" class="t">${data[i].dataList[j].videoTitle}</p><p class="num"><span class="play"><i class="icon"></i>${data[i].dataList[j].videoPlayChar}</span><span class="danmu"><i class="icon"></i>${data[i].dataList[j].videoBarrage}</span></p></a></div>`
                        var array = ""
                        if (j < 3) {
                            array = "on";
                        }
                        if (j == 0) phContent = phContent + `<div onmouseleave="warpleave(this)" onmouseenter="warpenter(this)" class="rank-wrap"><span class="number on">${j + 1}</span><div class="preview"><div class="pic"><a href="/pv${data[i].dataList[j].videoPv}" target="_blank" class="link"><img src="${data[i].dataList[j].videoImage}" alt="${data[i].dataList[j].videoTitle}"></a><div class="watch-later-video van-watchlater black"><span class="wl-tips" style="left: -21px; display: none;"></span></div></div><div class="txt"><a href="/pv${data[i].dataList[j].videoPv}" target="_blank" class="link"><p title="${data[i].dataList[j].videoTitle}">${data[i].dataList[j].videoTitle}</p></a><span>${((data[i].dataList[j].videoPlay * 10) + (data[i].dataList[j].videoBarrage * 10)) / 10000}万分</span></div></div><div class="popover-video-card pvc" style="display: none;"><div class="content"><img src="${data[i].dataList[j].videoImage}" alt=""><div class="info"><p class="f-title">${data[i].dataList[j].videoTitle}</p><p class="subtitle"><span class="name">${data[i].dataList[j].videoUserName}</span><span class="point">·</span><span class="time">${data[i].dataList[j].videoReleasetime}</span></p></div></div><div class="count"><ul><li><i class="bilifont bili-icon_shipin_bofangshu"></i><span>${data[i].dataList[j].videoPlayChar}</span></li><li><i class="bilifont bili-icon_shipin_danmushu"></i><span>${data[i].dataList[j].videoBarrage}</span></li><li><i class="bilifont bili-icon_shipin_shoucangshu"></i><span>${data[i].dataList[j].videoCollect}</span></li></ul></div></div></div>`
                        else phContent = phContent + "<div onmouseleave=\"warpleave(this)\" onmouseenter=\"warpenter(this)\" class=\"rank-wrap\"><span class=\"number " + array + "\">" + (j + 1) + "</span><a href=\"/pv" + data[i].dataList[j].videoPv + "\" target=\"_blank\" class=\"link\"><p title=\"" + data[i].dataList[j].videoTitle + " ~\" class=\"title\">" + data[i].dataList[j].videoTitle + "</p></a>\n" +
                            "                        <div class=\"popover-video-card pvc\" style=\"display: none;\">\n" +
                            "                            <div class=\"content\"><img src=\"" + data[i].dataList[j].videoImage + "\" alt=\"\">\n" +
                            "                                <div class=\"info\"><p class=\"f-title\">" + data[i].dataList[j].videoTitle + "</p>\n" +
                            "                                    <p class=\"subtitle\"><span class=\"name\">" + data[i].dataList[j].videoUserName + "</span><span class=\"point\">·</span><span class=\"time\">" + data[i].dataList[j].videoReleasetime + "</span></p></div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"count\">\n" +
                            "                                <ul>\n" +
                            "                                    <li><i class=\"bilifont bili-icon_shipin_bofangshu\"></i><span>" + data[i].dataList[j].videoPlayChar + "</span></li>\n" +
                            "                                    <li><i class=\"bilifont bili-icon_shipin_danmushu\"></i><span>" + data[i].dataList[j].videoBarrage + "</span></li>\n" +
                            "                                    <li><i class=\"bilifont bili-icon_shipin_shoucangshu\"></i><span>" + data[i].dataList[j].videoCollect + "</span></li>\n" +
                            "                                </ul>\n" +
                            "                            </div>\n" +
                            "                        </div>\n" +
                            "                    </div>"
                    }
                    $("#ph" + data[i].typeName).append(phContent)
                    $("#" + data[i].typeName).append(videoContent + "<div class=\"clearfix\"></div>\n")
                    videoContent = "";
                    phContent = "";
                    if (i == 0) {
                        $(".flex-column").append("<li id='first' class=\"nav-item\">\n" +
                            "                <a class=\"nav-link\" onclick=\"changeHash('#t" + data[i].typeName + "');return false;\" href=\"#t" + data[i].typeName + "\">" + data[i].typeName + "</a>\n" +
                            "            </li>")
                    } else {
                        $(".flex-column").append("<li class=\"nav-item\">\n" +
                            "                <a class=\"nav-link\" onclick=\"changeHash('#t" + data[i].typeName + "');return false;\" href=\"#t" + data[i].typeName + "\">" + data[i].typeName + "</a>\n" +
                            "            </li>")
                    }

                }
            },
        });
    }

    ajaxVideoInfo();
})
$('#myScrollspy').on('activate.bs.scrollspy', function () {
    if ($(".nav-item.active").attr("id") != "first") {
        $("ul.nav-pills").css("transform", "translateY(10%)")
    } else {
        $("ul.nav-pills").css("transform", "translateY(60%)")
    }
})
goDetail = pv => {
    location.href = "/pv" + pv;
}
warpenter = obj => {
    $(obj).find(".popover-video-card.pvc").fadeIn("slow")
}
warpleave = obj => {
    $(obj).find(".popover-video-card.pvc").stop()
    $(obj).find(".popover-video-card.pvc").fadeOut(100)
}
changeHash = idName => {
    document.querySelector(idName).scrollIntoView(true)
}
toCategory = (pid, id) => {
    if (pid == 1) {
        location.href = "/categoryinfo/" + id;
    } else {
        location.href = "/categoryinfo/" + pid + "/" + id;
    }

}