$(function () {
    $("#videoId").click(function () {
        $("#videoTitleList").slideToggle()
        flushTitle()
    })
    allCheckboxCheck = (obj) => {
        var flag=$(obj).parent().parent().hasClass("bcc-checkbox-checked")
        if (flag){
            $(".bcc-checkbox").each(function () {
                $(this).removeClass("bcc-checkbox-checked")
            });
        }else {
            $(".bcc-checkbox").each(function () {
                $(this).addClass("bcc-checkbox-checked")
            });
        }
        pdcheck()
    }

    $(".button_wrap.default").click(function () {
        var delArr=[]
        $(".bcc-checkbox.barr-check").each(function () {
            if ($(this).hasClass("bcc-checkbox-checked")){
                delArr.push($(this).attr("barId"))
            }
        });
        piliModel("删除提醒", "删除后无法恢复，确认删除选中的弹幕吗？", "articel_wrap", ajaxDelBarrage, delArr)
    })

    pdcheck=()=>{
        var checkcount=0
        $(".bcc-checkbox").each(function () {
            if ($(this).hasClass("bcc-checkbox-checked")){
                checkcount++
            }
        })
        if (checkcount>0){
            $(".button_wrap.default").removeClass("disabled")
        }else{
            $(".button_wrap.default").addClass("disabled")
        }
    }

    checkboxCheck = (obj) => {
        var flag=$(obj).parent().parent().hasClass("bcc-checkbox-checked")
        if (flag){
            $(obj).parent().parent().removeClass("bcc-checkbox-checked")
        }else {
            $(obj).parent().parent().addClass("bcc-checkbox-checked")
        }
        var count=0
        var checkcount=0
        $(".bcc-checkbox.barr-check").each(function () {
            count++
            if ($(this).hasClass("bcc-checkbox-checked")){
                checkcount++
            }
        });
        if (checkcount==count){
            $("#allCheck").addClass("bcc-checkbox-checked")
        }else{
            $("#allCheck").removeClass("bcc-checkbox-checked")
        }
        pdcheck()
    }
    flushTitle = () => {
        $(".search-list div").empty()
        var selected = ""
        if ($("#videoId").attr("title") == 0) {
            selected = "selected"
        }
        $(".search-list div").append(`<li onclick="changeTitle(this)" data-v-6c40e918="" class="bcc-option ${selected}" value="0">
                                        <span>最近弹幕</span><i class="bcc-iconfont bcc-icon-ic_MenuButton-tick"></i></li>`)
        ajaxVideoTitle()
    }
    $("#titleSearchIcon").click(function () {
        flushTitle()
    })

    addDelModel = (delArr) => {
        piliModel("删除提醒", "删除后无法恢复，确认删除弹幕吗？", "articel_wrap", ajaxDelBarrage, delArr)
    }

    ajaxDelBarrage = (delArr) => {
        $.ajax({
            url: "/admin/barrage/del",
            type: "get",
            dataType: "json",
            data: {
                barrageArr: delArr
            },
            success: function (data) {
                if (data.code == 0) {
                    $(".cancel.refresh").click()
                }

            }
        })
    }
    ajaxVideoTitle = () => {
        var videoTitle = $("#titleSearch").val()
        var orderBy = 0
        var currPage = $("#titleCurrPage").val();
        $.ajax({
            url: "admin/creative/data",
            type: "get",
            dataType: "json",
            data: {
                videoTitle,
                orderBy,
                currPage
            },
            success: function (data) {
                $("#titleCurrPage").val(data.currPageNo)
                $("#titleTotalPageCount").val(data.totalPageCount)
                for (var i = 0; i < data.dataList.length; i++) {
                    var obj = data.dataList[i]
                    var selected = ""
                    if ($("#videoId").attr("title") == obj.videoPv) {
                        selected = "selected"
                    }
                    $(".search-list div").append(`<li onclick="changeTitle(this)" data-v-6c40e918="" class="bcc-option ${selected}" value="${obj.videoPv}">
                                        <span>${obj.videoTitle}</span><i class="bcc-iconfont bcc-icon-ic_MenuButton-tick"></i></li>`)
                }
            }
        })
    }

    changeTitle = (obj) => {
        $("#videoId").val($(obj).find("span").text())
        $("#videoId").attr("title", $(obj).val())
        $("#videoTitleList").slideUp()
        $("#titleCurrPage").val("1")
        flushTitle()
        $(".bcc-table__align-left tbody").empty()
        $("#currPage").val(1)
        ajaxbarrageList()
    }

    changeTitleInContent = (obj) => {
        $("#videoId").val($(obj).attr("videoTitle"))
        $("#videoId").attr("title", $(obj).attr("videoId"))
        $("#titleCurrPage").val("1")
        flushTitle()
        $(".bcc-table__align-left tbody").empty()
        $("#currPage").val(1)
        ajaxbarrageList()
    }

    ajaxbarrageList = () => {
        var currPage = $("#currPage").val();
        var videoId = $("#videoId").attr("title");
        var title = $("#content").val();
        if (videoId == null || videoId == "") {
            videoId = 0
        }
        $.ajax({
            url: "/admin/barrage/get",
            type: "get",
            dataType: "json",
            data: {
                currPage,
                videoId,
                "content": title
            },
            success: function (data) {
                var tbody = $(".bcc-table__align-left tbody")
                $("#currPage").val(data.currPageNo)
                $("#totalPageCount").val(data.totalPageCount)
                for (var i = 0; i < data.dataList.length; i++) {
                    var dx = data.dataList[i]
                    tbody.append(`<tr class="bcc-table__tr-hover">
                    <td class="bcc-table__row-selection">
                        <div class="bcc-table__cell"><label barId="${dx.id}" class="bcc-checkbox barr-check"><span class="bcc-checkbox-checkbox"><i class="bcc-iconfont bcc-icon-ic_MenuButton-tick"></i><input onclick="checkboxCheck(this)"  type="checkbox" name="默认" aria-hidden="true" value=""></span><span class="bcc-checkbox-label"></span></label></div>
                    </td>
                    <td style="font-size: 14px; color: rgb(117, 117, 117); line-height: 18px; font-weight: normal; width: 9.375%;">
                        <div class="bcc-table__cell"><a data-v-716b6222="" href="/user/space/${dx.userId}" target="_blank" class="colum-content ellipsis">${dx.nickName}</a></div>
                    </td>
                    <td style="font-size: 14px; color: rgb(117, 117, 117); line-height: 18px; font-weight: normal; text-align: center; width: 10.4167%;">
                        <div class="bcc-table__cell">
                            <div data-v-716b6222="" class="colum-content">${dx.barrageTime}</div>
                        </div>
                    </td>
                    <td style="font-size: 14px; color: rgb(117, 117, 117); line-height: 18px; font-weight: normal; width: 12.5%;">
                        <div class="bcc-table__cell"><span data-v-716b6222="" class="danmu-rencent"><a data-v-716b6222="" target="_blank" href="/pv${dx.videoId}" class="colum-content ellipsis danmu-content">${dx.content}</a></span> <a data-v-716b6222="" class="video-title ellipsis"><span data-v-716b6222="" class="no-hover">视频：${dx.videoTitle} </span><span videoId="${dx.videoId}" videoTitle="${dx.videoTitle}" onclick="changeTitleInContent(this)" data-v-716b6222="" class="hover">该视频全部弹幕</span></a>
                        </div>
                    </td>
                    <td style="font-size: 14px; color: rgb(117, 117, 117); line-height: 18px; font-weight: normal; width: 11.4583%;">
                        <div class="bcc-table__cell">
                            <div data-v-716b6222="" class="colum-content"><span data-v-716b6222="" style="margin-right: 5px; word-break: keep-all; display: inline-block; min-width: 80px;">${dx.barrageCreateTime}</span>
                            </div>
                        </div>
                    </td>
                    <td style="font-size: 14px; color: rgb(117, 117, 117); line-height: 18px; font-weight: normal; width: 10.4167%; text-align: center;"><div class="bcc-table__cell"><div data-v-716b6222="" class="operate"><!----> <div data-v-716b6222="" onclick="addDelModel(${dx.id})" class="operate-del">删除</div> <div data-v-716b6222="" class="divid"></div> <div data-v-716b6222="" class="ignor">保护</div></div></div></td>
                </tr>`)
                }
            }
        })
    }
    $(".cancel.refresh,#contentSearch").click(function () {
        $(".bcc-table__align-left tbody").empty()
        $("#currPage").val(1)
        ajaxbarrageList()
    })
    ajaxbarrageList()
})
window.onscroll = function () {
    var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
    var clientH = document.documentElement.clientHeight || document.body.clientHeight
    if (scrollT == scrollH - clientH) {
        if ($("#currPage").val() < $("#totalPageCount").val()) {
            $("#currPage").val(Number($("#currPage").val()) + 1)
            ajaxbarrageList()
        }
    } else if (scrollT == 0) {
        console.log("到顶部了");
    }
}
$(".search-list").scroll(function () {
    var scrollT = this.scrollTop;
    var scrollH = this.scrollHeight;
    var clientH = this.clientHeight;
    if (scrollT == scrollH - clientH) {
        if ($("#titleCurrPage").val() < $("#titleTotalPageCount").val()) {
            $("#titleCurrPage").val(Number($("#titleCurrPage").val()) + 1)
            ajaxVideoTitle()
        }
    } else if (scrollT == 0) {
        console.log("到顶部了");
    }
})
$(document).bind('click', function (e) {
    var e = e || window.event; //浏览器兼容性
    var elem = e.target || e.srcElement;
    while (elem) { //循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id == 'videoTitleList' || elem.id == 'videoId') {
            return;
        }
        elem = elem.parentNode;
    }
    $("#videoTitleList").slideUp()
});