$(function () {
    ajaxAppealDetail = () => {
        var id = $("#id").val()
        $.ajax({
            url: "/admin/appeal/get",
            type: "get",
            dataType: "json",
            data: {
                id
            },
            success: function (data) {
                $("p.time span").text(data.createtime)
                $("p.num span").text(data.id)
                $(".sta.waiting .text").text(data.stateString)
                $(".info-con").html(`<p target="_blank" class="title" href="/pv${data.pvideos.videoPv}">${data.pvideos.videoTitle}</p>
                            <p class="ar-sta">稿件状态：已锁定</p>
                            <div class="info-pic"><img alt="" src="${data.pvideos.videoImage}" style="width: 100%; height: 100%; opacity: 1;"></div>`)
                $(".ap-reply-text").text(data.content)
                $(".app-commit-time span").text(data.createtime)
                ajaxAppealReply()
            }
        })
    }
    ajaxAppealReply = () => {
        var id = $("#id").val()
        $.ajax({
            url: "/admin/appealReply/list",
            type: "get",
            dataType: "json",
            data: {
                id
            },
            success: function (data) {
                $(".appeal-detail-reply").empty()
                for (let i = 0; i < data.list.length; i++) {
                    var obj=data.list[i]
                    $(".appeal-detail-reply").append(`<div class="ap-reply-dialog ${obj.isU ? "self" : "service"}"><a href="javascript:;" class="dialog-up"><img src="${obj.puserInfo.userPic}" alt=""></a>
                    <div class="dialog-info"><span class="name">
                    \t\t\t${obj.puserInfo.nickName}
                    \t\t</span> <span class="time">
                    \t\t\t${obj.createtime}
                    \t\t</span></div>
                    <div div="" class="ap-reply no-radius-left"><p class="ap-reply-text">${obj.content}
                        <!----></p>
                        <div class="ap-reply-pics"></div>
                    </div>
                </div>`)
                }
                if (data.state==0){
                    $(".appeal-detail-reply").append(`<form class="appeal-reply-form"><textarea name="" id="" cols="30" rows="10" autocomplete="off" placeholder="请输入回复内容" class=""></textarea>
                    <div class="upload-con"><span class="upload-btn" style="position: relative; overflow: hidden;"><input type="file" class="file-input"></span>
                        <div class="upload-err" style="display: none;"><p></p> <span class="normal-arr left-arr"></span>
                        </div>
                        <a href="javascript:;" class="confirm-btn bili-btn ok">发表回复</a>
                        <div class="reply-err" style="display: none;"><p></p> <span class="normal-arr right-arr"></span>
                        </div>
                    </div>
                </form>`)
                }
            }
        })
    }
    $(".appeal-detail-reply").on("mouseenter", function () {
        $(".confirm-btn.bili-btn.ok").off("click");
        $(".confirm-btn.bili-btn.ok").on("click", function () {
            var content = $(this).parent().parent().find("textarea").val()
            var appealsid = $("#id").val()
            $.ajax({
                url: "/admin/appealReply/add",
                type: "post",
                dataType: "json",
                data: {
                    content,
                    appealsid
                },
                success: function (data) {
                    if (data.code == 0) {
                        ajaxAppealReply()
                    }
                }
            })
            return false;
        })
    })
    ajaxUpdateAppeal = () => {
        var id = $("#id").val()
        $.ajax({
            url: "/admin/appeal/update",
            type: "post",
            dataType: "json",
            data: {
                id
            },
            success: function (data) {
                if (data.code == 0) {
                    alert("成功")
                    ajaxAppealDetail()
                }
            }
        })
    }
    ajaxAppealDetail()
})