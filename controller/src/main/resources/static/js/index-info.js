$(function () {
    ajaxUserInfo = function () {
        $.ajax({
            url: "/index/userinfo",
            type: "get",
            dataType: "json",
            data: {},
            success: function (data) {
                if (data.userId==null){
                    return;
                }
                $("#imgcircle").attr("src",data.userPic)
                var tbody = $("#van-popover-9985");
                tbody.empty();
                tbody.append("<a data-v-59fd5a91=''href='//space.bilibili.com'target='_blank' class='avatar'><div class='bili-avatar'>   <img class='bili-avatar-img bili-avatar-face bili-avatar-img-radius'        data-src='"+data.userPic+"'        alt=''        src='"+data.userPic+"'>     <span class='bili-avatar-icon'></span>     </div> </a>")
                tbody.append("<p data-v-59fd5a91=\"\" class=\"nickname\" style=\"padding-top: 42px;\">"+data.nickName+"</p><!----><div data-v-59fd5a91=\"\" class=\"level-content\"><div data-v-59fd5a91=\"\" class=\"level-info\"><span data-v-59fd5a91=\"\"class=\"grade\">等级 "+data.level+"</span></div><a data-v-59fd5a91=\"\"href=\"https://account.bilibili.com/account/record?type=exp\"target=\"_blank\" class=\"level-link\"><div data-v-59fd5a91=\"\" class=\"level-bar\"><div data-v-59fd5a91=\"\" class=\"level-progress\"  style=\"width: 0%;\"></div></div></a><div data-v-59fd5a91=\"\" class=\"level-intro\"><p data-v-59fd5a91=\"\" class=\"level-intro__title\">作为LV0，你无法享受特权</p><div data-v-59fd5a91=\"\" class=\"level-intro__content\">成为正式会员,你可以：<br>1、发射个性弹幕<br>2、参与视频评论<br>3、登入获得硬币<br>4、投稿成为偶像</div><a data-v-59fd5a91=\"\"href=\"//www.bilibili.com/blackboard/help.html#%E4%BC%9A%E5%91%98%E7%AD%89%E7%BA%A7%E7%9B%B8%E5%85%B3?id=7251c4ab69d44a8ebbbd276dea46d790\"target=\"_blank\" class=\"level-intro__link\">会员等级相关说明<svg data-v-59fd5a91=\"\" aria-hidden=\"true\" class=\"svg-icon\"> <use data-v-59fd5a91=\"\"xlink:href=\"#bili-icon_caozuo_xiangyou\"></use></svg></a></div></div><div data-v-59fd5a91=\"\" class=\"counts\"><a data-v-59fd5a91=\"\"href=\"//space.bilibili.com/1632884258/fans/follow\"target=\"_blank\" class=\"count-item\"><div data-v-59fd5a91=\"\" class=\"item-key\">关注</div><div data-v-59fd5a91=\"\" class=\"item-value\"><span data-v-59fd5a91=\"\"class=\"item-num\">"+data.subscribeNum+"</span><spandata-v-59fd5a91=\"\" class=\"item-unit\"></span></div></a><a data-v-59fd5a91=\"\" href=\"//space.bilibili.com/1632884258/fans/fans\"target=\"_blank\" class=\"count-item\"><div data-v-59fd5a91=\"\" class=\"item-key\">粉丝</div><div data-v-59fd5a91=\"\" class=\"item-value\"><span data-v-59fd5a91=\"\"class=\"item-num\">"+data.fansNum+"</span><spandata-v-59fd5a91=\"\" class=\"item-unit\"></span></div></a></div><div data-v-59fd5a91=\"\" class=\"links\"><a data-v-59fd5a91=\"\"href=\"https://account.bilibili.com/account/home\"target=\"_blank\" class=\"link-item\"><div data-v-59fd5a91=\"\" class=\"link-title\"><i data-v-59fd5a91=\"\"class=\"link-icon bilifont bili-icon_dingdao_gerenzhongxin\"></i>个人中心</div></a><a data-v-59fd5a91=\"\"href=\"https://member.bilibili.com/v2#/upload-manager/article\"target=\"_blank\" class=\"link-item\"><div data-v-59fd5a91=\"\" class=\"link-title\"><i data-v-59fd5a91=\"\"class=\"link-icon bilifont bili-icon_dingdao_tougaoguanli\"></i>投稿管理</div></a></div><div data-v-59fd5a91=\"\" class=\"logout\"><span data-v-59fd5a91=\"\"><idata-v-59fd5a91=\"\"class=\"link-icon bilifont bili-icon_dingdao_dengchu\"></i>退出</span></div>  </div>")
            },
        });
    }
    ajaxUserInfo();
    $("#van-popover-9985").hide();
})
$(".img-circle").hover(function () {
    $("#van-popover-9985").show()
    ajaxUserInfo()
}, function () {
    $("#van-popover-9985").hide()
})
$("#van-popover-9985").hover(function () {
    $("#van-popover-9985").show()
}, function () {
    $("#van-popover-9985").hide()

})