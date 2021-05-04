$(function () {
    /**
     * var pageUtil = {
                        index: data.index,
                        totalPageCount: data.totalPageCount,
                        totalCount: data.totalCount
                    };

     * @param pageUtil
     */
    fun = () => {

    }
    flashPage = (pageUtil, ajaxfun) => {
        fun = ajaxfun
        $(".x").empty();
        var pageDiv = $(".be-pager");
        var pageContent = "<li  onclick='goto(" + (pageUtil.index - 1) + ")' title=\"上一页\" class=\"be-pager-prev\"><a>上一页</a></li>";
        for (var i = 1; i <= pageUtil.totalPageCount; i++) {
            if (i - pageUtil.index >= -5 && i - pageUtil.index <= 5) {
                if (i == pageUtil.index) {
                    pageContent = pageContent + "<li class=\"be-pager-item be-pager-item-active\"><a>" + i + "</a></li>"
                } else {
                    pageContent = pageContent + "<li  onclick='goto(" + (i) + ")' class=\"be-pager-item\"><a>" + i + "</a></li>";
                }
            }
        }
        pageContent = pageContent + "<li onclick='goto(" + (pageUtil.index + 1) + ")' class=\"be-pager-next\"><a>下一页</a></li><span class=\"be-pager-total\">共 " + pageUtil.totalPageCount + " 页，</span><span class=\"be-pager-options-elevator\">\n" +
            "    跳至\n" +
            "    <input onchange='changeInput()' id='changeInput' type=\"text\" class=\"space_input\"> 页\n" +
            "  </span>"
        pageDiv.html(pageContent);

        if (pageUtil.index <= 1) {
            $(".be-pager-prev").addClass("be-pager-disabled").children("a").attr("onclick", null);
        }
        if (pageUtil.index >= pageUtil.totalPageCount) {
            $(".be-pager-next").addClass("be-pager-disabled").children("a").attr("onclick", null);
        }
    }
    changeInput = () => {
        if ($("#changeInput").val() > 0)
            $("#currPage").val($("#changeInput").val())
        //刷新数据方法👇👇
        fun()
    }
})
goto = (curr) => {
    if (curr <= 0) return;
    $("#currPage").val(curr)
    //刷新数据方法👇👇
    fun()
}