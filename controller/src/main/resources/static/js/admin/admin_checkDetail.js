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
    ajaxVideoDetail()
})