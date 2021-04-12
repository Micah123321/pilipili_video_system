$(function () {
    //刷新下拉框
    $('#select_user_address_province').selectpicker('refresh');
    $('#select_user_address_city').selectpicker('refresh');
    $('#select_user_address_district').selectpicker('refresh');
    //改变订单信息时
    $('#select_user_address_province').change(function () {
        $.ajax({
            type: "GET",
            url: contextPath+"/address/" + $(this).val(),
            data: null,
            dataType: "json",
            success: function (data) {
                $(".loader").hide();
                if (data.success) {
                    $("#select_user_address_city").empty();
                    $("#select_user_address_district").empty();
                    for (var i = 0; i < data.addressList.length; i++) {
                        var address_id = data.addressList[i].addressAreaId;
                        var addressName = data.addressList[i].addressName;
                        $("#select_user_address_city").append("<option value='" + address_id + "'>" + addressName + "</option>")
                    }
                    for (var j = 0; j < data.childAddressList.length; j++) {
                        var childAddress_id = data.childAddressList[j].addressAreaId;
                        var childAddress_name = data.childAddressList[j].addressName;
                        $("#select_user_address_district").append("<option value='" + childAddress_id + "'>" + childAddress_name + "</option>")
                    }
                    $('#select_user_address_city').selectpicker('refresh');
                    $("#select_user_address_district").selectpicker('refresh');
                    $("span.address-province").text($("#select_user_address_province").find("option:selected").text());
                    $("span.address-city").text($("#select_user_address_city").find("option:selected").text());
                    $("span.address_district").text($("#select_user_address_district").find("option:selected").text());
                } else {
                    alert("加载地区信息失败，请刷新页面再试！")
                }
            },
            beforeSend: function () {
                $(".loader").show();
            },
            error: function () {
                alert("加载地区信息失败，请刷新页面再试！")
            }
        });
    });
    $("#select_user_address_city").change(function () {
        $.ajax({
            type: "GET",
            url: contextPath+"/address/" + $(this).val(),
            data: null,
            dataType: "json",
            success: function (data) {
                $(".loader").hide();
                if (data.success) {
                    $("#select_user_address_district").empty();
                    for (var i = 0; i < data.addressList.length; i++) {
                        var address_id = data.addressList[i].addressAreaId;
                        var addressName = data.addressList[i].addressName;
                        $("#select_user_address_district").append("<option value='" + address_id + "'>" + addressName + "</option>")
                    }
                    $('#select_user_address_district').selectpicker('refresh');
                    $("span.address-city").text($("#select_user_address_city").find("option:selected").text());
                    $("span.address_district").text($("#select_user_address_district").find("option:selected").text());
                } else {
                    alert("加载地区信息失败，请刷新页面再试！")
                }
            },
            beforeSend: function () {
                $(".loader").show();
            },
            error: function () {
                alert("加载地区信息失败，请刷新页面再试！")
            }
        });
    });
    $("#select_user_address_district").change(function () {
        $("span.address_district").text($(this).find("option:selected").text());
    });

    //用户名input获取光标
    $("#userName").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请输入用户名").css("display", "inline-block").css("color", "#00A0E9");
    });
    //密码input获取光标
    $("#userPassword").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请输入密码").css("display", "inline-block").css("color", "#00A0E9");
    });
    //再次输入密码input获取光标
    $("#user_password_one").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请再次输入密码").css("display", "inline-block").css("color", "#00A0E9");
    });
    //昵称input获取光标
    $("#userNickName").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请输入昵称").css("display", "inline-block").css("color", "#00A0E9");
    });
    //出生日期input获取光标
    $("#userBirthday").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请输入出生日期").css("display", "inline-block").css("color", "#00A0E9");
    });
    //真实姓名input获取光标
    $("#userRealName").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请输入真实姓名").css("display", "inline-block").css("color", "#00A0E9");
    });

    //input离开光标
    $(".form-text").blur(function () {
        $(this).css("border-color", "#cccccc")
            .next().css("display", "none");
    });

    //非空验证
    $("#register_sub").click(function () {
        //真实姓名
        var userRealName = $.trim($("input[name=userRealName]").val());
        //密码
        var userPassword = $.trim($("input[name=userPassword]").val());
        //确认密码
        var user_password_one = $.trim($("input[name=user_password_one]").val());
        //昵称
        var userNickName = $.trim($("input[name=userNickName]").val());
        //出生日期
        var userBirthday = $.trim($("input[name=userBirthday]").val());

        //验证密码的格式 包含数字和英文字母
        var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
        if (userRealName == null || userRealName === "") {
            $("#userRealName").css("border", "1px solid red")
                .next().text("请输入真实姓名").css("display", "inline-block").css("color", "red");
            return false;
        } else if (userPassword == null || userPassword === "") {
            $("#userPassword").css("border", "1px solid red")
                .next().text("请输入密码").css("display", "inline-block").css("color", "red");
            return false;
        } else if (user_password_one == null || user_password_one === "") {
            $("#user_password_one").css("border", "1px solid red")
                .next().text("请重复输入密码").css("display", "inline-block").css("color", "red");
            return false;
        } else if (!reg.test(userPassword)) {
            $("#userPassword").css("border", "1px solid red")
                .next().text("密码格式必须包含数字和字母").css("display", "inline-block").css("color", "red");
            return false;
        } else if (userPassword !== user_password_one) {
            $("#user_password_one").css("border", "1px solid red")
                .next().text("两次输入密码不相同").css("display", "inline-block").css("color", "red");
            return false;
        } else if (userNickName == null || userNickName === "") {
            $("#userNickName").css("border", "1px solid red")
                .next().text("请输入昵称").css("display", "inline-block").css("color", "red");
            return false;
        } else if (userBirthday == null || userBirthday === "") {
            $("#userBirthday").css("border", "1px solid red")
                .next().text("请选择出生日期").css("display", "inline-block").css("color", "red");
            return false;
        }
        return true;
    });
});

//图片上传
function uploadImage(fileDom) {
    //获取文件
    var file = fileDom.files[0];
    //判断类型
    var imageType = /^image\//;
    if (file === undefined || !imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    //判断大小
    if (file.size > 512000) {
        alert("图片大小不能超过500K！");
        return;
    }
    //清空值
    $(fileDom).val('');
    var formData = new FormData();
    formData.append("file", file);
    //上传图片
    $.ajax({
        url: contextPath+"/user/uploadUserHeadImage",
        type: "post",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "json",
        mimeType: "multipart/form-data",
        success: function (data) {
            if (data.success) {
                $(fileDom).prev("img").attr("src","/res/images/item/userProfilePicture/"+data.fileName);
                $("#user_profile_picture_src_value").val(data.fileName);
            } else {
                alert("图片上传异常！");
            }
        },
        beforeSend: function () {
        },
        error: function () {

        }
    });
}