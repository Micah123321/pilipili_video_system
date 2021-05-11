$(function () {
    $("#videoId").click(function () {
        $("#videoTitleList").slideDown()
    })
    ajaxbarrageList=()=>{
        var currPage=$("#currPage").val();
        var videoId=$("#videoId").val();
        var title=$("#content").val();
        if (videoId==null||videoId==""){
            videoId=0
        }
        $.ajax({
            url: "/admin/barrage/get",
            type: "get",
            dataType: "json",
            data:{
                currPage,
                videoId,
                "content":title
            },
            success: function (data) {
                var tbody=$(".bcc-table__align-left tbody")
                $("#currPage").val(data.currPageNo)
                $("#totalPageCount").val(data.totalPageCount)
                for (var i = 0; i < data.dataList.length; i++){
                    var dx=data.dataList[i]
                    tbody.append(`<tr class="bcc-table__tr-hover">
                    <td class="bcc-table__row-selection">
                        <div class="bcc-table__cell"><label class="bcc-checkbox"><span class="bcc-checkbox-checkbox"><i class="bcc-iconfont bcc-icon-ic_MenuButton-tick"></i><input type="checkbox" name="默认" aria-hidden="true" value=""></span><span class="bcc-checkbox-label"></span></label></div>
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
                        <div class="bcc-table__cell"><span data-v-716b6222="" class="danmu-rencent"><a data-v-716b6222="" target="_blank" href="/pv${dx.videoId}" class="colum-content ellipsis danmu-content">${dx.content}</a></span> <a data-v-716b6222="" class="video-title ellipsis"><span data-v-716b6222="" class="no-hover">视频：${dx.videoTitle} </span><span data-v-716b6222="" class="hover">该视频全部弹幕</span></a>
                        </div>
                    </td>
                    <td style="font-size: 14px; color: rgb(117, 117, 117); line-height: 18px; font-weight: normal; width: 11.4583%;">
                        <div class="bcc-table__cell">
                            <div data-v-716b6222="" class="colum-content"><span data-v-716b6222="" style="margin-right: 5px; word-break: keep-all; display: inline-block; min-width: 80px;">${dx.barrageCreateTime}</span>
                            </div>
                        </div>
                    </td>
                    <td style="font-size: 14px; color: rgb(117, 117, 117); line-height: 18px; font-weight: normal; width: 10.4167%; text-align: center;">
                        <div class="bcc-table__cell">
                            <div data-v-716b6222="" class="operate">
                                <div data-v-716b6222="" class="colum-content table-operate"><i data-v-716b6222="" class="bcc-iconfont bcc-icon-icon_list_more_x"></i>
                                </div> <!----></div>
                        </div>
                    </td>
                </tr>`)
                }
            }
        })
    }
    $(".cancel.refresh,.bcc-iconfont.bcc-icon-ic_search_.search").click(function () {
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
        if ($("#currPage").val()<$("#totalPageCount").val()){
            $("#currPage").val(Number($("#currPage").val())+1)
            ajaxbarrageList()
        }
    } else if (scrollT == 0) {
        console.log("到顶部了");
    }
}
$(document).bind('click', function (e) {
    var e = e || window.event; //浏览器兼容性
    var elem = e.target || e.srcElement;
    while (elem) { //循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id == 'videoTitleList'||elem.id == 'videoId') {
            return;
        }
        elem = elem.parentNode;
    }
    $("#videoTitleList").slideUp()
});