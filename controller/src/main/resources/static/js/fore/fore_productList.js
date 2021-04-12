$(function () {
    //搜索框验证
    $('form').submit(function () {
        if ($(this).find('input[name="productName"]').val() === '') {
            alert('请输入关键字！');
            return false;
        }
    });
    //点击li排序时
    $('.context_menu li').click(function () {
        //获取排序字段
        var orderBy = $(this).attr('data-name');
        //判断排序顺序及样式设置
        var isDesc = true;
        if (orderBy === 'productSalePrice') {
            if ($(this).children(".orderByDesc").hasClass("orderBySelect")) {
                isDesc = false;
            }
        }
        //检索
        if ($(this).parent('ul').attr('data-value') === undefined) {
            location.href = '/product/0/20?orderBy=' + orderBy + "&isDesc=" + isDesc + "&categoryId=" + $(this).parent('ul').attr('data-type');
        } else {
            location.href = '/product/0/20?orderBy=' + orderBy + "&isDesc=" + isDesc + "&productName=" + $(this).parent('ul').attr('data-value');
        }
    });
    //点击产品图片时
    $(".context_product_imgList>li").click(function () {
        var url = $(this).children("img").attr("src");
        if (url !== undefined) {
            $(this).parent("ul").prev("a").children(".context_product_imgMain").attr("src", url);
        }
    });
});