$(function () {
    getCateInfo=function (cid) {
        $.ajax({
            url: "admin/categoryinfo/"+cid,
            type: "get",
            dataType: "json",
            success: function (data) {
                $("#cateId").val(data.id)
                $("#cateId").attr("disabled","disabled");
                if (data.parentId==0){
                    lv="一级"
                }else if (data.parentId==1){
                    lv="二级"
                }else if (data.parentId>1){
                    lv="三级"
                }
                $("#cateLvl").val(lv)
                $("#cateLvl").attr("disabled","disabled");
                $("#cateName").val(data.categoryName)
            }
        });
    }
    $("#addCate").click(function () {
        $("#cateId").attr("disabled","disabled");
        $("#cateLvl").removeAttr("disabled")
        $("#cateName").val("")
        $("#cateLvl").val("")
        $("#cateId").val("自增长")
    })

    ajaxCateEdit=function () {
        $.ajax({
            url: "admin/categoryinfo/edit",
            type: "post",
            dataType: "json",
            success: function (data) {

            }
        });
    }
    ajaxCateListInfo=function () {
        $.ajax({
            url: "admin/categoryinfo",
            type: "get",
            dataType: "json",
            success: function (data) {
                var tbody = $(".category-inner");
                tbody.empty();
                for (var i = 0; i < data.length; i++) {
                    var lv="";
                    if (data[i].parentId==0){
                        lv="一级"
                    }else if (data[i].parentId==1){
                        lv="二级"
                    }else if (data[i].parentId>1){
                        lv="三级"
                    }
                    var trclass="success";
                    var result = i % 2;
                    if (result==0){
                        trclass="active"
                    }
                    tbody.append("<tr class=\""+trclass+"\">\n" +
                        "                    <td>\n" +
                        "                        <span class=\"label label-warning\">"+data[i].id+"</span> </td>\n" +
                        "                    <td>"+data[i].categoryName+"</td>\n" +
                        "                    <td>"+lv+"</td>\n" +
                        "                    <td>\n" +
                        "                        <button data-target=\"#myModal\" type=\"button\" class=\"btn btn-default center text-center\"\n" +
                        "                                data-toggle=\"modal\" onclick='getCateInfo("+data[i].id+")'> 修改\n" +
                        "                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n" +
                        "                                 class=\"bi bi-forward\"\n" +
                        "                                 viewBox=\"0 0 16 16\">\n" +
                        "                                <path fill-rule=\"evenodd\" d=\"M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7a.5.5 0 000 1h5a.5.5 0 000-1h-5zM.8 1a.8.8 0 00-.8.8V3a.8.8 0 00.8.8h14.4A.8.8 0 0016 3V1.8a.8.8 0 00-.8-.8H.8z\"></path>\n" +
                        "                            </svg>\n" +
                        "                        </button>\n" +
                        "                    </td>\n" +
                        "                </tr>")
                }
            }
        });
    }
    ajaxCateListInfo()
})