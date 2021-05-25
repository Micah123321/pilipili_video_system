$(function () {
    ajaxAppeals=()=>{
        $.ajax({
            url: "admin/appeal/list",
            type: "get",
            dataType: "json",
            data: {
                state:-1,
                currPage:$("#currPage").val()
            },
            success: function (data) {
                $("#currPage").val(data.currPageNo)
                $("#totalPageCount").val(data.totalPageCount)
                for (let i = 0; i < data.dataList.length; i++) {
                    var obj=data.dataList[i]
                    if (obj.pvideos==null){
                        $(".ap-con").append(`<li class="con-item"><a onclick="javascript:ajaxUtil.pagetopage('/appeal/${obj.id}');return false;"  class="">
                        <div class="it-info">
                            <div class="info-lt"><p href="/pv${obj.videoId}" target="_blank" class="title">
                                </p>
                                <p class="ar-status">稿件状态：已被up删除</p></div>
                            <div target="_blank" class="info-rt"><img src="" alt="" style="width: 100%; height: 100%; opacity: 1;"></div>
                        </div>
                        <div class="it-sta complete">
                            <div class="sta-info"><p class="item ap-time">申诉时间：${obj.createtime}</p>
                                <p class="item ap-id">申诉编号：${obj.id}</p>
                                <div class="item ap-stat"><span class="txt">受理状态：</span> <i class="iconfont"></i>
                                    ${obj.stateString}
                                    <!----></div>
                            </div>
                            <div class="ap-detail-btn bili-btn plain">
                                申诉详情
                            </div> <!----></div>
                    </a></li>`)

                    }else{
                        $(".ap-con").append(`<li class="con-item"><a onclick="javascript:ajaxUtil.pagetopage('/appeal/${obj.id}');return false;" class="">
                        <div class="it-info">
                            <div class="info-lt"><p href="/pv${obj.videoId}" target="_blank" class="title">
                                ${obj.pvideos.videoTitle}</p>
                                <p class="ar-status">稿件状态：${obj.state}</p></div>
                            <div target="_blank" class="info-rt"><img src="${obj.pvideos.videoImage}" alt="" style="width: 100%; height: 100%; opacity: 1;"></div>
                        </div>
                        <div class="it-sta complete">
                            <div class="sta-info"><p class="item ap-time">申诉时间：${obj.createtime}</p>
                                <p class="item ap-id">申诉编号：${obj.id}</p>
                                <div class="item ap-stat"><span class="txt">受理状态：</span> <i class="iconfont"></i>
                                    ${obj.stateString}
                                    <!----></div>
                            </div>
                            <div class="ap-detail-btn bili-btn plain">
                                申诉详情
                            </div> <!----></div>
                    </a></li>`)

                    }
                }
            }
        })
    }

    window.onscroll = function () {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
        var clientH = document.documentElement.clientHeight || document.body.clientHeight
        if (scrollT == scrollH - clientH) {
            if ($("#currPage").val() < $("#totalPageCount").val()) {
                $("#currPage").val(Number($("#currPage").val()) + 1)
                ajaxAppeals()
            }
        } else if (scrollT == 0) {
            console.log("到顶部了");
        }
    }
    ajaxAppeals()
})