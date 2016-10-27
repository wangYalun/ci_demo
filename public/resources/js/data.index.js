base.defineClass('init', {
    realtimeShowChart: function (item) {
        return function (data) {
            var series = [];
            for (var i in data) {
                var serie = {};
                serie.name = i;
                if (!item) {
                    for (item in data[i]) {
                        break;
                    }
                }
                serie.data = data[i][item];
                series.push(serie);
            }
            var d = ['0:00-1:00', '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00',
                '5:00-6:00', '6:00-7:00', '7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
                '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00',
                '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00'];

            $("#container_realtime").highcharts({
                chart: {
                    type: 'spline'
                },
                credits: {
                    enabled: false
                },
                colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9',
                    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
                title: {
                    text: null
                },
                xAxis: {
                    categories: d,
                    labels: {
                        align: "center",
                        step: parseInt(d.length / 10),
                        staggerLines: 1
                    }

                },
                yAxis: {
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: series
            });
        };
    },
    weekly: function () {
        var it = this;
        hchart.dateSelect(it, 'loadWeeklyData');
        hchart.selectedDate(it, 'loadWeeklyData');
    },
    monthly: function () {
        var it = this;
        hchart.dateSelect(it, 'loadMonthlyData');
        hchart.selectedDate(it, 'loadMonthlyData');
    },
    payment_pay_conversion: function () {
        var it = this;
        hchart.dateSelect(it, 'loadPayConverionData');
        hchart.selectedDate(it, 'loadPayConversionData');
    },
    loadWeeklyData: function (day1, day2) {
        var it = this;
        it.doAjax({
            url: '../api/api_selecter/weekly',
            method: 'post',
            data: {
                day1: day1,
                day2: day2
            },
            success: function (res) {
                var data = res.data;
                var tabMenu = [];
                var categories = [];
                var menu = {
                    new_user: {name: '新增用户', data: []},
                    all_user: {name: '总注册量', data: []},
                    q_times: {name: '开奖期数', data: []},
                    q_money: {name: '开奖金额', data: []},
                    pay_user: {name: '付费用户', data: []},
                    pay_times: {name: '付费次数', data: []},
                    pay_amount: {name: '付费金额', data: []},
                    arppu: {name: 'ARPPU', data: []},
                    give_amount: {name: '赠送夺宝币', data: []},
                    duo_user: {name: '夺宝人数', data: []},
                    duo_times: {name: '夺宝次数', data: []},
                    duo_amount: {name: '夺宝交易金额', data: []}
                };
                var tableHtml = [];

                var len = data.length;
                var week_nature = [];
                for (var i in data) {

                    tableHtml.push('<tr>');
                    if (data[i]['d'].indexOf('自然周') > 0) {
                        week_nature = data[i];
                    }
                    for (var j in data[i]) {
                        if (menu[j]) {
                            menu[j].data.push(Number(data[i][j]));
                        } else if (j === 'd') {
                            categories.push(data[i]['d']);
                            tableHtml.push('<td>', data[len - 1 - i][j], '</td>');
                        }
                        if (j.indexOf('_gr') == -1 && j != 'd') {
                            tableHtml.push('<td>', data[len - 1 - i][j], '<span class="', data[len - 1 - i][j + '_gr'] >= 0 ? 'asc' : 'desc', '"><i class="i_arr"></i></span></td>');
                        }
                    }
                    tableHtml.push('</tr>');
                }
                var lastData = data[len - 1];

                $('#weekly_date').text(lastData.d + '数据');
                $('#weekly_nature').text(week_nature.d + '数据');
                var first = true;
                var html = [];
                var html_nature = [];
                for (var j in lastData) {
                    if (menu[j]) {
                        var rate_class = 'asc';
                        if (lastData[j + '_gr'] < 0) {
                            rate_class = 'desc';
                        }
                        html.push('<td><p class="menu">', menu[j].name, '</p><p class="num">', lastData[j],
                                '</p><div class="rate" title="环比上周"><span class="', rate_class, '"><i class="i_arr"></i>', lastData[j + '_gr'] + '%', '</span></div></td>');
                        html_nature.push('<td><p class="menu">', menu[j].name, '</p><p class="num">', week_nature[j],
                                '</p><div class="rate" title="环比上周"><span class="', rate_class, '"><i class="i_arr"></i>', week_nature[j + '_gr'] + '%', '</span></div></td>');
                        first = false;
                    }
                }
                $('#summary_data').html(html.join(""));
                $('#summary_data_nature').html(html_nature.join(""));
                $('.mod-body div.select_input').html(tabMenu.join(""));
                $('#daily_detail').html(tableHtml.join(""));
            }
        });
    },
    loadPayConversionData: function (day1, day2) {
        var it = this;
        it.doAjax({
            url: '../api/api_selecter/user_pay_conversion',
            method: 'post',
            data: {
                day1: day1,
                day2: day2
            },
            success: function (res) {
                var data = res.data;
                var tabMenu = [];
                var categories = [];
                var menu = {
                    new_user: {name: '新增用户', data: []},
                    new_pay_user: {name: '付费用户', data: []},
                    new_pay_user_amount: {name: '付费金额', data: []},
                    new_arpu: {name: 'ARPU', data: []},
                    conversion: {name: '当天付费转化率', data: []},
                    day3_conversion: {name: '3天后付费转化率', data: []}
                };
                var tableHtml = [];

                var len = data.length;
                for (var i in data) {
                    tableHtml.push('<tr>');

                    for (var j in data[i]) {
                        if (menu[j]) {
                            menu[j].data.push(Number(data[i][j]));
                        } else if (j === 'd') {
                            tableHtml.push('<td>', data[len - 1 - i][j], '</td>');
                        }
                        if (j.indexOf('_gr') == -1 && j != 'd') {
                            tableHtml.push('<td>', data[len - 1 - i][j], '</td>');
                        }
                    }
                    tableHtml.push('</tr>');
                }
                var lastData = data[len - 1];

                $('#date').text(lastData.d + '数据');

                var html = [];

                for (var j in lastData) {
                    if (menu[j]) {


                        html.push('<td><p class="menu">', menu[j].name, '</p><p class="num">', lastData[j],
                                '</p></td>');
                    }
                }
                $('#summary_data').html(html.join(""));
                $('#user_pay_conversion_detail').html(tableHtml.join(""));
            }
        });
    },
    loadMonthlyData: function (day1, day2) {
        var it = this;
        it.doAjax({
            url: '../api/api_selecter/monthly',
            method: 'post',
            data: {
                day1: day1,
                day2: day2
            },
            success: function (res) {
                var data = res.data;
                var tabMenu = [];
                var categories = [];
                var menu = {
                    new_user: {name: '新增用户', data: []},
                    all_user: {name: '总注册量', data: []},
                    q_times: {name: '开奖期数', data: []},
                    q_money: {name: '开奖金额', data: []},
                    pay_user: {name: '付费用户', data: []},
                    pay_times: {name: '付费次数', data: []},
                    pay_amount: {name: '付费金额', data: []},
                    arppu: {name: 'ARPPU', data: []},
                    give_amount: {name: '赠送夺宝币', data: []},
                    duo_user: {name: '夺宝人数', data: []},
                    duo_times: {name: '夺宝次数', data: []},
                    duo_amount: {name: '夺宝交易金额', data: []}
                };
                var tableHtml = [];

                var len = data.length;
                var week_nature = [];
                for (var i in data) {

                    tableHtml.push('<tr>');
                    if (data[i]['d'].indexOf('自然月') > 0) {
                        week_nature = data[i];
                    }
                    for (var j in data[i]) {
                        if (menu[j]) {
                            menu[j].data.push(Number(data[i][j]));
                        } else if (j === 'd') {
                            categories.push(data[i]['d']);
                            tableHtml.push('<td>', data[len - 1 - i][j], '</td>');
                        }
                        if (j.indexOf('_gr') == -1 && j != 'd') {
                            tableHtml.push('<td>', data[len - 1 - i][j], '<span class="', data[len - 1 - i][j + '_gr'] >= 0 ? 'asc' : 'desc', '"><i class="i_arr"></i></span></td>');
                        }
                    }
                    tableHtml.push('</tr>');
                }
                var lastData = data[len - 1];

                $('#weekly_date').text(lastData.d + '数据');
                $('#weekly_nature').text(week_nature.d + '数据');
                var first = true;
                var html = [];
                var html_nature = [];
                for (var j in lastData) {
                    if (menu[j]) {
                        var rate_class = 'asc';
                        if (lastData[j + '_gr'] < 0) {
                            rate_class = 'desc';
                        }
                        html.push('<td><p class="menu">', menu[j].name, '</p><p class="num">', lastData[j],
                                '</p><div class="rate" title="环比上月"><span class="', rate_class, '"><i class="i_arr"></i>', lastData[j + '_gr'] + '%', '</span></div></td>');
                        html_nature.push('<td><p class="menu">', menu[j].name, '</p><p class="num">', week_nature[j],
                                '</p><div class="rate" title="环比上月"><span class="', rate_class, '"><i class="i_arr"></i>', week_nature[j + '_gr'] + '%', '</span></div></td>');
                        first = false;
                    }
                }
                $('#summary_data').html(html.join(""));
                $('#summary_data_nature').html(html_nature.join(""));
                $('.mod-body div.select_input').html(tabMenu.join(""));
                $('#daily_detail').html(tableHtml.join(""));
            }
        });
    }
});