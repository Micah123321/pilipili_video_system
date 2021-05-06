$(function () {
    ajaxbarrageList=()=>{
        $.ajax({
            url: "/admin/barrage/get",
            type: "get",
            dataType: "json",
            success: function (data) {
                var tbody=$(".bcc-table__align-left tbody")
                tbody.empty()
                for (var i = 0; i < data.length; i++){
                    var dx=data[i]
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
    $(".cancel.refresh").click(function () {
        ajaxbarrageList()
    })
    ajaxbarrageList()
})