base.defineClass('interval', {
    interval: function () {
        var it = this;
        $("#item_select input[name='paytype']").change(function () {
            var item = $(this).val();
            $('#item_select').attr('data-item', item);
            console.log($(this).val());
            it.realtimeShowChart($(this).val())(it.intervalData);
        });
        hchart.dateSelect(it, 'loadInterval2');
        hchart.selectedDate(it, 'loadInterval2');
    },
    loadInterval2: function (day1, day2) {
        var it = this;
        it.doAjax({
            url: '../api/api_selecter/interval2',
            method: 'get',
            data: {day1: day1, day2: day2},
            success: function (res) {
                it.intervalData = res.data;
                it.realtimeShowChart('new_user')(it.intervalData);
                it.showTable(it.intervalData);
            }
        });
    },
    showTable: function (res) {
        var d = ['0:00-1:00', '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00',
            '5:00-6:00', '6:00-7:00', '7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
            '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00',
            '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00', '23:00-24:00'];

        var menu = {
            new_user: {name: '新增用户', data: []},
            active_user: {name: '活跃用户', data: []},
            access_user: {name: '访问/启动用户', data: []},
            access_times: {name: '访问/启动次数', data: []},
            pay_user: {name: '付费用户', data: []},
            pay_times: {name: '付费次数', data: []},
            pay_amount: {name: '付费金额', data: []},
            duo_user: {name: '夺宝用户', data: []},
            duo_times: {name: '夺宝次数', data: []},
            duo_amount: {name: '夺宝金额', data: []}
        };
        var html = [];
        for (var i = 0; i < 24; i++) {
            html.push('<tr><td>', d[i], '</td>');
            for (var j in menu) {
                for (var k in res) {
                    html.push('<td>', res[k][j][i], '</td>');
                }
            }
            html.push('</tr>');
        }
        $('#daily_detail').html(html.join(""));
    }
});