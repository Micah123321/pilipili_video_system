$(function () {
    ajaxVideoDetail=()=>{
        var pid=$("#pid").val()
        $.ajax({
            url: "/video/videodata",
            type: "get",
            data: {
                pid
            },
            dataType: "json",
            success: function (data) {
                $("#bofqi").append(`<iframe data-v-4fc36e5a=""
                        src="/videoPlay?url=/file/video/?url=${data.videoUrl}"
                        scrolling="no" board="0" frameborder="no" framespacing="0" class="bilibiliHtml5Player"></iframe>`)
            }
        })
    }
    ajaxCheckVideo=(videoPv,videoState,videoReleasetimeString)=>{
        $.ajax({
            url: "/admin/check/post",
            type: "post",
            data: {
                videoPv,
                videoState,
                videoReleasetimeString
            },
            dataType: "json",
            success: function (data) {
                if (data.code==0){
                    alert("审核成功")
                    location.href="/admin?url=check"
                }
            }
        })
    }
    ajaxVideoInfo=pv=>{
        $.ajax({
            url: "/detail/getinfo",
            type: "get",
            data: {
                pv
            },
            dataType: "json",
            success: function (data) {
                $(".breadcrumb .title").text(data.video.videoTitle)
                $(".breadcrumb .desc").text(data.video.videoDesc)
                $(".nickName").text(data.userInfo.nickName)
                $(".parentName").text(data.video.typeName.split("<--")[0])
                $(".typeName").text(data.video.typeName.split("<--")[1])
                $(".updateTime").text(data.video.videoUpdatetime)
                $(".videoTime").text(data.video.videoTime)
                $(".checkList").append(`<div class="left stat-card" style="width: 50%;">
                    <div class="num"><span class="text "><button onclick="ajaxCheckVideo(${data.video.videoPv},1,${data.video.videoReleasetime})" class="btn btn-primary">通过</button></span></div>
                </div>
                <div class="left stat-card" style="width: 50%;">
                    <div class="num"><span class="text "><button onclick="ajaxCheckVideo(${data.video.videoPv},2,${data.video.videoReleasetime})" class="btn btn-danger">不通过</button></span></div>
                </div>`)
            }
        })
    }
    ajaxVideoDetail()
    ajaxVideoInfo($("#pid").val())
})