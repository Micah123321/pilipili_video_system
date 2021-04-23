$(function () {
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
                    "                        <button type=\"button\" class=\"btn btn-primary\"\n" +
                    "                                data-toggle=\"button\"> 修改\n" +
                    "                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n" +
                    "                                 class=\"bi bi-forward\"\n" +
                    "                                 viewBox=\"0 0 16 16\">\n" +
                    "                                <path d=\"M9.502 5.513a.144.144 0 0 0-.202.134V6.65a.5.5 0 0 1-.5.5H2.5v2.9h6.3a.5.5 0 0 1 .5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 0 1 .042-.028.147.147 0 0 0 0-.252.51.51 0 0 1-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.503H2a.5.5 0 0 1-.5-.5v-3.9a.5.5 0 0 1 .5-.5h6.3v-.503z\"/>\n" +
                    "                            </svg>\n" +
                    "                        </button>\n" +
                    "                    </td>\n" +
                    "                </tr>")
            }
        }
    });
})