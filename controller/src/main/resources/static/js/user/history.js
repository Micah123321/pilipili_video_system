$(function () {
    $(".search-icon").click(function () {
        $(".history-list").empty()
        ajaxHistory()
    })
    $(".cleanhsbtn").click(function () {
        $(".dlg-contain").show()
    })
    $(".history-dlg .cancel").click(function () {
        $(".dlg-contain").hide()
    })
    ajaxDelHistory=(videoId,isDelAll)=>{
        var userId=$("#userId").val();
        if (isDelAll){
            $(".dlg-contain").hide()
        }
        $.ajax({
            url: "/history/del",
            type: "get",
            dataType: "json",
            data: {
                userId,
                videoId,
                isDelAll
            },
            success: function (data) {
                if (data.code==0){
                    $(".history-list").empty()
                    ajaxHistory()
                }
            }
        })
    }
    ajaxHistory = () => {
        var userId=$("#userId").val();
        var videoTitle=$(".b-head-search_input").val();
        var currPage=$("#currPage").val();
        $.ajax({
            url: "/history/get",
            type: "get",
            dataType: "json",
            data: {
                userId,
                currPage,
                videoTitle
            },
            success: function (data) {
                $("#currPage").val(data.currPageNo)
                $("#totalPageCount").val(data.totalPageCount)
                for (var i=0;i<data.dataList.length;i++){
                    var obj=data.dataList[i];
                    $(".history-list").append(`<li class="history-record">
                <div class="l-info">
                    <div class="lastplay-time"><i class="history-red-round"></i> <span class="lastplay-t">${obj.viewTimeString}</span></div>
                </div>
                <div class="r-info clearfix">
                    <div class="cover-contain"><a class="preview" target="_blank" href="/pv${obj.videoId}">
                        <div class="lazy-img"><img alt="" src="${obj.videoImage}">
                        </div>
                    </a>
                        <div class="info"></div>
                        <div class="progress-c">
                            <div class="progress" style="width: ${obj.loadBar}%;"></div>
                        </div>
                    </div>
                    <div class="r-txt"><a class="title" target="_blank" href="/pv${obj.videoId}">${obj.videoTitle}</a>
                        <p class="subtitle"><span></span></p>
                        <div class="w-info">
                            <div class="time-wrap"><i class="device bilifont bili-PC"></i> <span class="pro-txt progress"><span>${obj.viewSecond}</span>&nbsp;&nbsp;</span></div>
                            <span> <a href="/user/space/${obj.videoUserId}"> <div class="lazy-img userpic"> <img alt="" src="${obj.videoUserImage}"> </div> <span class="username">${obj.videoUserName}</span> </a> <span class="name">${obj.categoryName}</span> </span></div>
                        <i onclick="ajaxDelHistory(${obj.videoId},0)" class="history-delete bilifont bili-shanchu"></i></div>
                </div>
            </li>`)
                }
                if (videoTitle != null && videoTitle != "") {
                    $(".b-head-search").addClass("input-active")
                    $(".search-icon").addClass("cursor")
                    $(".search-icon").attr("src","//s1.hdslb.com/bfs/static/history-record/./img/search-active.png")
                    $(".r-txt .title").each(function () {
                        $(this).html(setHighLight($(this).html(), videoTitle, "keyword"));
                    });
                }else{
                    $(".b-head-search").removeClass("input-active")
                    $(".search-icon").removeClass("cursor")
                    $(".search-icon").attr("src","//s1.hdslb.com/bfs/static/history-record/./img/search-default.png")
                }
            }
        })
    }
    ajaxHistory()
})
window.onscroll = function () {
    var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
    var clientH = document.documentElement.clientHeight || document.body.clientHeight
    if (scrollT == scrollH - clientH) {
        if ($("#currPage").val()<$("#totalPageCount").val()){
            $("#currPage").val(Number($("#currPage").val())+1)
            ajaxHistory()
        }
    } else if (scrollT == 0) {
        console.log("到顶部了");
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
        if (elem.id && elem.id == 'delAll' || elem.id=="cleanHistory") {
            return;
        }
        elem = elem.parentNode;
    }
    $(".dlg-contain").hide()
});