$(document).bind('click', function (e) {
    var e = e || window.event; //浏览器兼容性
    var elem = e.target || e.srcElement;
    while (elem) { //循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id == 'test') {
            return;
        }
        elem = elem.parentNode;
    }
    $(".drop-cascader-container").slideUp()
});

function changepic() {
    var reads = new FileReader();
    f = document.getElementById('file').files[0];
    reads.readAsDataURL(f);
    reads.onload = function (e) {
        document.getElementById('show').src = this.result;
    };
    uploadImageFun()
}

function FileValue(val) {
    var file = val.files[0];
    var url = URL.createObjectURL(file);
    $("#myvideo").prop("src", url);
    $("#myvideo")[0].addEventListener("loadedmetadata", function () {
        var tol = this.duration; //获取总时长
        $("input[name='videoTime']").val(tol)
    });
}

$(function () {

    ajaxVideo = function (url) {
        var videoTitle = $(".input-box-v2-1-val").val();
        var videoUrl = $("input[name='videoUrl']").val();
        var videoDesc = $("#descarea").val();
        var videoReleasetime = 0;
        if ($(".check-radio-v2-2-container-active").length > 0) {
            videoReleasetime = $("#pickdate").val() + " " + $("#picktime").val();
        }
        var videoType = $(".select-item-cont-inserted").attr("value");
        var videoTime = $("input[name='videoTime']").val();
        var videoImage = $("input[name='videoImage']").val();
        var pid=$("#pid").val()
        $.ajax({
            type: 'post',
            url: url,
            data: {
                "videoTitle": videoTitle,
                "videoUrl": videoUrl,
                "videoDesc": videoDesc,
                "videoReleasetimeSecond": videoReleasetime,
                "videoType": videoType,
                "videoTimeSecond": videoTime,
                "videoImage": videoImage,
                "videoPv": pid
            },
            beforeSend: function () {
                $(".loader").css("display", "block");
            }
        }).success(function (data) {
            $(".loader").css("display", "none");
            if (data.videoPv > 0) {
                $(".upload-step-3-container-v2").show()
                $(".upload-v2-step2-container").hide()
                $("#objgj").text(data.videoTitle);
            }

        }).error(function () {
            if (pid>0)alert("修改失败"); else alert("投稿失败");
        });
    }

    uploadImageFun = function () {
        if (!confirm("确定上传该图片作为封面吗")) return;
        var formData = new FormData($('#uploadForm')[0]);
        $.ajax({
            type: 'post',
            url: "/video/videoUpload", //上传文件的请求路径必须是绝对路劲
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
        }).success(function (data) {
            if (data.success != null) {
                alert(data.success)
                $("input[name='videoImage']").val(data.url);
            }
        }).error(function () {
            alert("上传失败");
        });
    }
    $(".cover-v2-upload-show-tip-upload").click(function () {
        uploadImageFun()
    })

    $("#input-repl-3a").fileinput({
        dropZoneTitle: "请上传小于150M的视频！",
        uploadUrl: "/video/videoUpload",
        language: "zh",
        autoReplace: true,
        showCaption: true,
        showUpload: true,
        overwriteInitial: true,
        showUploadedThumbs: true,
        //showPreview:false,                   //显示上传图片的大小信息
        maxFileCount: 1,
        minFileCount: 1,
        maxFileSize: 204800,//文件最大153600kb=150M
        initialPreviewShowDelete: true,
        showRemove: true,//是否显示删除按钮
        showClose: true,
        layoutTemplates: {
            actionUpload: '',
        },
        allowedFileExtensions: ["mp4", "avi", "dat", "3gp", "mov", "rmvb"],
        previewSettings: {
            image: {
                width: "100%",
                height: "100%"
            },
        }
    });
    //异步上传返回结果处理
    $('#input-repl-3a').on('fileerror', function (event, data, msg) {
        console.log("fileerror");
        console.log(data);
    });
    //异步上传返回结果处理
    $("#input-repl-3a").on("fileuploaded", function (event, data, previewId, index) {
        //debugger
        videoUrl = "/uploads/" + data.response.url;
        $(".remain-upload").text("(1/1)")
        var ref = $(this).attr("data-ref");
        $("input[name='" + ref + "']").val(data.response.url);
    });

    $('#input-repl-3a').on('filesuccessremove', function (event, id) {
        if (some_processing_function(id)) {
            console.log('Uploaded thumbnail successfully removed');
        } else {
            return false;
        }
    });
    //标题字数校验
    $('.input-box-v2-1-val').bind('input propertychange', 'textarea', function () {
        var curLength = $(this).val().trim().length;
        if (curLength > 80) {
            var num = $(this).val().trim().substr(0, 80);
            $(this).val(num);
        }
        $("#titlenum").text($(this).val().trim().length);
    });
//简介字数校验
    $('#descarea').bind('input propertychange', 'textarea', function () {
        var curLength = $(this).val().trim().length;
        if (curLength > 3000) {
            var num = $(this).val().trim().substr(0, 3000);
            $(this).val(num);
        }
        $("#desctext").text($(this).val().trim().length);
    });

    gotoPage = function () {
        $.ajax({
            url: "/admin/creative",
            type: "get",
            contentType: "text/html;charset=UTF-8",
            success: function (data) {
                $("#div_home_context_main", window.parent.document).html(data);
            }
        });
    }
    /**
     * 以下方法均为分类管理
     */
    $(".select-box-v2-controller").click(function () {
        $(".drop-cascader-container").slideToggle()
    })
    $(".check-radio-v2-2-container ").click(function () {
        if ($(this).hasClass("check-radio-v2-2-container-active")) {
            $(this).removeClass("check-radio-v2-2-container-active")
            $(".d-time-v2-date-picker-wrp").slideUp()
        } else {
            $(this).addClass("check-radio-v2-2-container-active")
            $(".d-time-v2-date-picker-wrp").slideDown()
        }
    })
    reClass = function (obj) {
        $(".drop-cascader-pre-item").removeClass("drop-cascader-pre-item-selected")
        $(obj).addClass("drop-cascader-pre-item-selected")
        ajaxTypelv2()
    }
    relistClass = function (obj) {
        $(".drop-cascader-list-item").removeClass("drop-cascader-list-item-selected")
        $(obj).addClass("drop-cascader-list-item-selected")
        var lv = $(".drop-cascader-pre-item-selected").attr("title");
        var lv2 = $(".drop-cascader-list-item-selected").attr("title");
        $(".select-item-cont-inserted").text("" + lv + "<--" + lv2)
        $(".select-item-cont-inserted").attr("value", $(".drop-cascader-list-item-selected").attr("cid"))
        $(".drop-cascader-container").slideUp()
    }
    ajaxType = function () {
        $.ajax({
            url: "/typeinfo",
            type: "get",
            dataType: "json",
            success: function (data) {
                var tbody = $(".drop-cascader-pre-wrp");
                tbody.empty();
                for (var i = 0; i < data.length; i++) {
                    if (data[i].parentId == 1) {
                        if (i == 1)
                            tbody.append("<div parentid='" + data[i].id + "' title='" + data[i].categoryName + "' data-v-5d902fe9=\"\" onclick='reClass(this)' class=\"drop-cascader-pre-item drop-cascader-pre-item-selected\"><p data-v-5d902fe9=\"\" class=\"pre-item-content\">\n" +
                                "" + data[i].categoryName + "</p> <i data-v-5d902fe9=\"\" class=\"pre-item-icon iconfont icon-ic_into\"></i>\n" +
                                "</div>")
                        else tbody.append("<div parentid='" + data[i].id + "' title='" + data[i].categoryName + "' data-v-5d902fe9=\"\" onclick='reClass(this)' class=\"drop-cascader-pre-item\"><p data-v-5d902fe9=\"\" class=\"pre-item-content\">\n" +
                            "" + data[i].categoryName + "</p> <i data-v-5d902fe9=\"\" class=\"pre-item-icon iconfont icon-ic_into\"></i>\n" +
                            "</div>")
                    }
                }
            },
            error: function (data) {

            }
        });
    }
    ajaxTypelv2 = function () {
        var lv = $(".drop-cascader-pre-item-selected").attr("parentid");
        $.ajax({
            url: "/typeinfo",
            type: "get",
            dataType: "json",
            success: function (data) {
                var tbody = $(".drop-cascader-list-wrp");
                tbody.empty();
                for (var i = 0; i < data.length; i++) {
                    if (data[i].parentId == lv) {
                        tbody.append("<div cid='" + data[i].id + "' onclick='relistClass(this)' title='" + data[i].categoryName + "' data-v-5d902fe9=\"\" class=\"drop-cascader-list-item\"><p data-v-5d902fe9=\"\" class=\"item-main\">" + data[i].categoryName + "</p> <p data-v-5d902fe9=\"\" class=\"item-sub\">" + data[i].categoryName + "</p></div>")
                    }
                }
            },
            error: function (data) {

            }
        });
    }
    ajaxType()
    $(".drop-cascader-container").hide()
    $.ajax({
        url: "/typeinfo",
        type: "get",
        dataType: "json",
        success: function (data) {
            var tbody = $(".drop-cascader-list-wrp");
            tbody.empty();
            var mr = [];
            for (var i = 0; i < data.length; i++) {
                var j = 0;
                mr.push(data[i])
                if (data[i].parentId == data[1].id) {
                    j++;
                    if (j == 1) {
                        tbody.append("<div cid='" + data[i].id + "'  title='" + data[i].categoryName + "' onclick='relistClass(this)' data-v-5d902fe9=\"\" class=\"drop-cascader-list-item drop-cascader-list-item-selected\"><p data-v-5d902fe9=\"\" class=\"item-main\">" + data[i].categoryName + "</p> <p data-v-5d902fe9=\"\" class=\"item-sub\">" + data[i].categoryName + "</p></div>")
                    } else {
                        tbody.append("<div cid='" + data[i].id + "' title='" + data[i].categoryName + "' onclick='relistClass(this)' data-v-5d902fe9=\"\" class=\"drop-cascader-list-item \"><p data-v-5d902fe9=\"\" class=\"item-main\">" + data[i].categoryName + "</p> <p data-v-5d902fe9=\"\" class=\"item-sub\">" + data[i].categoryName + "</p></div>")
                    }
                }
            }
            var lv = $(".drop-cascader-pre-item-selected").attr("title");
            var lv2 = $(".drop-cascader-list-item-selected").attr("title");
            $(".select-item-cont-inserted").text("" + mr[1].categoryName + "<--" + lv2)
            $(".select-item-cont-inserted").attr("value", $(".drop-cascader-list-item-selected").attr("cid"))
        },
        error: function (data) {

        }
    });

    removeVideo = function () {
        if (!confirm("确定要删除原视频重新上传吗")) {
            return;
        }
        $("div.file-input.file-input-ajax-new").show()
        $(".file-list-v2-wrp").hide()
    }

    var pid = $("#pid").val()
    if (pid.length > 0) {
        $("div.file-input.file-input-ajax-new").hide()
        $(".file-list-v2-wrp").show()
        $.ajax({
            url: "/video/videodata",
            type: "get",
            data: {
                "pid": pid
            },
            dataType: "json",
            success: function (data) {
                $(".file-list-v2-wrp").empty()
                $(".file-list-v2-wrp").append("<div data-v-632b126d=\"\">\n" +
                    "                        <div data-v-632b126d=\"\" data-drag-index=\"0\" class=\"file-list-v2-item\">\n" +
                    "                            <div data-v-632b126d=\"\" class=\"file-list-v2-item-icon\"><span data-v-632b126d=\"\">P1</span>\n" +
                    "                            </div>\n" +
                    "                            <div data-v-632b126d=\"\" class=\"file-list-v2-item-wrp\">\n" +
                    "                                <div data-v-632b126d=\"\" class=\"item-status-wrp\"><span data-v-632b126d=\"\" class=\"item-title\"><p data-v-632b126d=\"\" class=\"item-title-text\">" + data.videoTitle + "</p> <!----></span>\n" +
                    "                                    <div data-v-632b126d=\"\" class=\"item-status-op\"><!----> <!----> <span data-v-632b126d=\"\" onclick='removeVideo()' class=\"item-status-click\">删除</span> <!----> <i data-v-632b126d=\"\" class=\"icon-success-v2\"></i> <!----> <!----></div>\n" +
                    "                                </div>\n" +
                    "                                <div data-v-632b126d=\"\" class=\"item-upload-info\"><span data-v-632b126d=\"\" class=\"upload-status-intro\">上传完成</span>\n" +
                    "                                    <!----> <!----> <!----> <!----></div>\n" +
                    "                                <div data-v-632b126d=\"\" class=\"item-upload-progress\">\n" +
                    "                                    <div data-v-632b126d=\"\" class=\"item-upload-progress-complete\" style=\"width: 100%;\"></div>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>")
                $(".input-box-v2-1-val").val(data.videoTitle);
                $("input[name='videoUrl']").val(data.videoUrl);
                $("#descarea").val(data.videoDesc);
                var pickdate = data.videoReleasetimeSecound + "";
                var picktime = pickdate.split(" ");
                $("#pickdate").val(picktime[0])
                $("#picktime").val(picktime[1]);
                $(".select-item-cont-inserted").attr("value", data.videoType);
                $(".select-item-cont-inserted").text(data.typeName);
                $("input[name='videoTime']").val(time_to_sec(data.videoTime));
                $("input[name='videoImage']").val(data.videoImage);
                $(".cover-preview-show").attr("src", data.videoImage);
                $(".submit-button-group-v2-container").attr("onclick", "onclick=\"ajaxVideo('/video/upload')\"")
                $(".submit-btn-group-add").text("修改")
            },
            error: function (data) {

            }
        });
    }
    $(".d-time-v2-date-picker-wrp").slideUp()
    /**
     * 时间转为秒
     * @param time 时间(00:00:00)
     * @returns {string} 时间戳（单位：秒）
     */
    var time_to_sec = function (time) {
        var s = '';

        var hour = time.split(':')[0];
        var min = time.split(':')[1];
        var sec = time.split(':')[2];

        s = Number(hour * 3600) + Number(min * 60) + Number(sec);

        return s;
    };
})
