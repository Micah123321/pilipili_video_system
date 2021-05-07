$(function () {
    ajaxFansData = () => {
        $.ajax({
            url: "/admin/fansData/get",
            type: "get",
            dataType: "json",
            success: function (data) {
                $(".section-row.bcc-row").empty()
                $(".section-row.bcc-row").append(`<div class="bcc-col bcc-col-6" style="padding-left: 8px; padding-right: 8px;">
                            <div class="section-item pointer">
                                <div class="data-name">
                                    粉丝总数
                                    <!----> <!----></div>
                                <div class="text-content"><!----> <span>${data.fanCount}</span></div>
                                <div class="diff-wrp"><span class="improve">近30日</span> <span class="diff-text">--</span></div>
                            </div>
                        </div>
                        <div class="bcc-col bcc-col-6" style="padding-left: 8px; padding-right: 8px;">
                            <div class="section-item pointer">
                                <div class="data-name">
                                    活跃粉丝数
                                    <!----> <span class="popover-example"><div class="bcc-popover" style="display: none;"><div class="tips_wrap">粉丝中最近30天与你有互动行为的人数（含视频、专栏、直播）</div> </div><i class="bcc-iconfont bcc-icon-ic_help"></i></span></div>
                                <div class="text-content"><!----> <span>${data.liveFanCount}</span></div>
                                <div class="diff-wrp"><span class="improve">近30日</span> <span class="diff-text">--</span></div>
                            </div>
                        </div>`)

            }
        })
    }
    ajaxFansData()
})

$.ajax({
    url: "/admin/fansData/getCharts",
    type: "get",
    dataType: "json",
    data:{
    },
    success: function (data){
        Highcharts.chart('dc-section-item_body', {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: '粉丝关注趋势'
            },
            subtitle: {
                text: '涨粉'
            },
            xAxis: [{
                categories: data.dateStr,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: '粉丝',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            series: [ {
                name: '粉丝',
                type: 'spline',
                data: data.fansUpArray
            }]
        });
        Highcharts.chart('dc-section_preference', {
            chart: {
                type: 'column'
            },
            title: {
                text: '分区倾向'
            },
            subtitle: {
                text: '粉丝观看该视频分区占比'
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: '百分比'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> 的占比<br/>'
            },

            series: [
                {
                    name: "分区",
                    colorByPoint: true,
                    data: data.cateCharts
                }
            ]
        });
    }
})
