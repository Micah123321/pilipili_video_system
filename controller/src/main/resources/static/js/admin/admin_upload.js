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

$(function () {
    uploadImageFun=function () {
        if (!confirm("确定上传该图片作为封面吗"))return;
        var formData = new FormData($('#uploadForm')[0]);
        $.ajax({
            type: 'post',
            url: "/video/videoUpload", //上传文件的请求路径必须是绝对路劲
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
        }).success(function (data) {
            if (data.success!=null){
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
        dropZoneTitle : "请上传小于150M的视频！",
        uploadUrl : "/video/videoUpload",
        language : "zh",
        autoReplace : true,
        showCaption : true,
        showUpload : true,
        overwriteInitial : true,
        showUploadedThumbs : true,
        //showPreview:false,                   //显示上传图片的大小信息
        maxFileCount : 1,
        minFileCount:1,
        maxFileSize : 204800,//文件最大153600kb=150M
        initialPreviewShowDelete : true,
        showRemove : true,//是否显示删除按钮
        showClose : true,
        layoutTemplates : {
            actionUpload:'',
        },
        allowedFileExtensions : [ "mp4","avi","dat","3gp","mov","rmvb"],
        previewSettings : {
            image : {
                width : "100%",
                height : "100%"
            },
        }
    });
    //异步上传返回结果处理
    $('#input-repl-3a').on('fileerror', function(event, data, msg) {
        console.log("fileerror");
        console.log(data);
    });
    //异步上传返回结果处理
    $("#input-repl-3a").on("fileuploaded", function(event, data, previewId, index) {
        //debugger
        videoUrl = "/uploads/"+ data.response.url;
        $(".remain-upload").text("(1/1)")
        var ref = $(this).attr("data-ref");
        $("input[name='" + ref + "']").val(data.response.url);
    });

    $('#input-repl-3a').on('filesuccessremove', function(event, id) {
        if (some_processing_function(id)) {
            console.log('Uploaded thumbnail successfully removed');
        } else {
            return false;
        }
    });
    //标题字数校验
    $('.input-box-v2-1-val').bind('input propertychange','textarea',function(){
        var curLength=$(this).val().trim().length;
        if(curLength>80)
        {
            var num=$(this).val().trim().substr(0,80);
            $(this).val(num);
        }
        $("#titlenum").text($(this).val().trim().length);
    });
//简介字数校验
    $('#descarea').bind('input propertychange','textarea',function(){
        var curLength=$(this).val().trim().length;
        if(curLength>3000)
        {
            var num=$(this).val().trim().substr(0,3000);
            $(this).val(num);
        }
        $("#desctext").text($(this).val().trim().length);
    });

    gotoPage = function () {
        window.parent.location.href = "/"
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
                        tbody.append("<div cid='"+data[i].id+"' onclick='relistClass(this)' title='" + data[i].categoryName + "' data-v-5d902fe9=\"\" class=\"drop-cascader-list-item\"><p data-v-5d902fe9=\"\" class=\"item-main\">" + data[i].categoryName + "</p> <p data-v-5d902fe9=\"\" class=\"item-sub\">" + data[i].categoryName + "</p></div>")
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
            for (var i = 0; i < data.length; i++) {
                var j = 0;
                if (data[i].parentId == 2) {
                    j++;
                    if (j == 1) {
                        tbody.append("<div cid='"+data[i].id+"'  title='" + data[i].categoryName + "' onclick='relistClass(this)' data-v-5d902fe9=\"\" class=\"drop-cascader-list-item drop-cascader-list-item-selected\"><p data-v-5d902fe9=\"\" class=\"item-main\">" + data[i].categoryName + "</p> <p data-v-5d902fe9=\"\" class=\"item-sub\">" + data[i].categoryName + "</p></div>")
                    } else {
                        tbody.append("<div cid='"+data[i].id+"' title='" + data[i].categoryName + "' onclick='relistClass(this)' data-v-5d902fe9=\"\" class=\"drop-cascader-list-item \"><p data-v-5d902fe9=\"\" class=\"item-main\">" + data[i].categoryName + "</p> <p data-v-5d902fe9=\"\" class=\"item-sub\">" + data[i].categoryName + "</p></div>")
                    }
                }
            }
            var lv = $(".drop-cascader-pre-item-selected").attr("title");
            var lv2 = $(".drop-cascader-list-item-selected").attr("title");
            $(".select-item-cont-inserted").text("" + lv + "<--" + lv2)
            $(".select-item-cont-inserted").attr("value", $(".drop-cascader-list-item-selected").attr("cid"))
        },
        error: function (data) {

        }
    });
    $(".d-time-v2-date-picker-wrp").slideUp()
})
gotoPage = function () {
    window.parent.location.href = "/"
}