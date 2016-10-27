base.defineClass('daily', {
    daily: function () {
        var it = this;
        hchart.dateSelect(it, 'loadDailyData');
        hchart.selectedDate(it, 'loadDailyData');
    },
    loadDailyData: function (day1, day2) {

        var it = this;
        it.$("#export_csv").attr("href", '../api/api_selecter/daily_csv?day1=' + day1 + '&day2=' + day2);
        var obj = {
            url: '../api/api_selecter/daily',
            method: 'get',
            data: {day1: day1, day2: day2},
            dataType: 'json'
        };
        var doneCallback = function (res) {
            var data = res.data;
            var html = [];
            var tabMenu = [];
            var categories = [];
            var menu = {
                new_user: {name: '新增用户', data: []},
                active_user: {name: '活跃用户', data: []},
                access_user: {name: '独立访客', data: []},
                q_money: {name: '开奖金额', data: [], format: 'money'},
                pay_user: {name: '付费用户', data: []},
                pay_amount: {name: '付费金额', data: [], format: 'money'},
                arppu: {name: 'ARPPU', data: []},
                pay_rate: {name: '付费渗透率', data: []},
                new_pay_user: {name: '首充用户', data: []},
                the_day_pay_user: {name: '新用户付费人数', data: []},
                the_day_pay_amount: {name: '新用户付费金额', data: [], format: 'money'},
                give_amount: {name: '赠送夺宝币', data: [], format: 'money'},
                duo_rate: {name: '夺宝渗透率', data: []},
                duo_amount: {name: '夺宝交易金额', data: [], format: 'money'}
            };
            var tableHtml = [];

            var len = data.length;
            for (var i in data) {
                tableHtml.push('<tr>');

                for (var j in data[i]) {
                    if (menu[j]) {
                        menu[j].data.push(Number(data[i][j]));
                    } else if (j === 'd') {
                        categories.push(data[i]['d']);
                        tableHtml.push('<td>', data[len - 1 - i][j], '</td>');
                    }
                    if (j.indexOf('_gr') == -1 && j != 'd') {
                        tableHtml.push('<td>', it.numFormat(data[len - 1 - i][j], menu[j].format || void 0), '<span class="', data[len - 1 - i][j + '_gr'] >= 0 ? 'asc' : 'desc', '"><i class="i_arr"></i></span></td>');
                    }
                }
                tableHtml.push('</tr>');
            }
            var lastData = data[data.length - 1];
            $('#daily_date').text(lastData.d + '数据');
            var first = true;
            for (var j in data[len - 1]) {
                if (menu[j]) {
                    var rate_class = 'asc';
                    if (data[i][j + '_gr'] < 0) {
                        rate_class = 'desc';
                    }
                    html.push('<td><p class="menu">', menu[j].name, '</p><p class="num">', it.numFormat(data[i][j], menu[j].format || void 0),
                            '</p><div class="rate" title="环比昨天"><span class="', rate_class, '"><i class="i_arr"></i>', data[i][j + '_gr'] + '%', '</span></div></td>');
                    tabMenu.push('<input type="radio" name="paytype" value="', j, '"', first ? 'checked' : '', '>', menu[j].name);
                    first = false;
                }
            }
            $('#summary_data').html(html.join(""));
            $('.mod-body div.select_input').html(tabMenu.join(""));
            $('#daily_detail').html(tableHtml.join(""));
            $("input[name='paytype']").change(function () {
                hchart.chart.showChart($("input[name='paytype']:checked").val());
            });
            hchart.chart.init(categories, menu, 'test_chart');
            hchart.chart.showChart('new_user');
        };
        this.$.ajax(obj).done(doneCallback).fail(function () {
            console.log('error');
        });
    }
});