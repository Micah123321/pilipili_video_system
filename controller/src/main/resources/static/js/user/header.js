$(function () {
    $.ajax({
        url: "/user/getSessionUser/",
        type: "get",
        dataType: "json",
        success: function (data) {
            $(".scale-in img").attr("src",data.userPic)
        },
        beforeSend: function () {
        },
        error: function (data) {
        }
    });
})