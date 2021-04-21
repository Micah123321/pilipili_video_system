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
$(function () {
    gotoPage = function () {
        window.parent.location.href = "/"
    }
    $(".select-box-v2-controller").click(function () {
        $(".drop-cascader-container").slideToggle()
    })
    reClass = function (obj) {
        $(".drop-cascader-pre-item").removeClass("drop-cascader-pre-item-selected")
        $(obj).addClass("drop-cascader-pre-item-selected")
        ajaxTypelv2()
    }
    relistClass=function (obj) {
        $(".drop-cascader-list-item").removeClass("drop-cascader-list-item-selected")
        $(obj).addClass("drop-cascader-list-item-selected")
        var lv = $(".drop-cascader-pre-item-selected").attr("title");
        var lv2 = $(".drop-cascader-list-item-selected").attr("title");
        $(".select-item-cont-inserted").text(""+lv+"<--"+lv2)
        $(".select-item-cont-inserted").attr("value",lv2)
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
                            tbody.append("<div parentid='"+data[i].id+"' title='" + data[i].categoryName + "' data-v-5d902fe9=\"\" onclick='reClass(this)' class=\"drop-cascader-pre-item drop-cascader-pre-item-selected\"><p data-v-5d902fe9=\"\" class=\"pre-item-content\">\n" +
                                "" + data[i].categoryName + "</p> <i data-v-5d902fe9=\"\" class=\"pre-item-icon iconfont icon-ic_into\"></i>\n" +
                                "</div>")
                        else tbody.append("<div parentid='"+data[i].id+"' title='" + data[i].categoryName + "' data-v-5d902fe9=\"\" onclick='reClass(this)' class=\"drop-cascader-pre-item\"><p data-v-5d902fe9=\"\" class=\"pre-item-content\">\n" +
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
                        tbody.append("<div onclick='relistClass(this)' title='"+data[i].categoryName+"' data-v-5d902fe9=\"\" class=\"drop-cascader-list-item\"><p data-v-5d902fe9=\"\" class=\"item-main\">"+data[i].categoryName+"</p> <p data-v-5d902fe9=\"\" class=\"item-sub\">"+data[i].categoryName+"</p></div>")
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
                var j=0;
                if (data[i].parentId == 2) {
                    j++;
                    if (j==1){
                        tbody.append("<div  title='"+data[i].categoryName+"' onclick='relistClass(this)' data-v-5d902fe9=\"\" class=\"drop-cascader-list-item drop-cascader-list-item-selected\"><p data-v-5d902fe9=\"\" class=\"item-main\">"+data[i].categoryName+"</p> <p data-v-5d902fe9=\"\" class=\"item-sub\">"+data[i].categoryName+"</p></div>")
                    }
                    else{
                        tbody.append("<div  title='"+data[i].categoryName+"' onclick='relistClass(this)' data-v-5d902fe9=\"\" class=\"drop-cascader-list-item \"><p data-v-5d902fe9=\"\" class=\"item-main\">"+data[i].categoryName+"</p> <p data-v-5d902fe9=\"\" class=\"item-sub\">"+data[i].categoryName+"</p></div>")
                    }
                }
            }
            var lv = $(".drop-cascader-pre-item-selected").attr("title");
            var lv2 = $(".drop-cascader-list-item-selected").attr("title");
            $(".select-item-cont-inserted").text(""+lv+"<--"+lv2)
            $(".select-item-cont-inserted").attr("value",lv2)

        },
        error: function (data) {

        }
    });
})
gotoPage = function () {
    window.parent.location.href = "/"
}