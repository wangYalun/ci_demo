base.defineClass('realtime', {
    realtime: function () {
        var it = this;
        it.menu = {
            new_user: {name: '新增用户', data: []},
            active_user: {name: '活跃用户', data: []},
            access_user: {name: '独立访客', data: []},
            access_times: {name: '访问/启动次数', data: []},
            q_times: {name: '开奖期数', data: []},
            q_money: {name: '开奖金额', data: [], format: 'money'},
            pay_user: {name: '付费用户', data: []},
            pay_times: {name: '付费次数', data: []},
            pay_amount: {name: '付费金额', data: [], format: 'money'},
            give_amount: {name: '赠送夺宝币', data: [], format: 'money'},
            duo_user: {name: '夺宝人数', data: []},
            duo_times: {name: '夺宝次数', data: []},
            duo_amount: {name: '夺宝交易金额', data: [], format: 'money'}
        };
        it.intervalData = {};
        it.loadRealtimeData();
        it.loadInterval("new_user");
        //it.realtimeSSE();
        $("#item_select input[name='paytype']").change(function () {
            var item = $(this).val();
            $('#item_select').attr('data-item', item);
            it.realtimeShowChart($(this).val())(it.intervalData);
        });
        $("#compare_select input").each(function () {
            $(this).click(function () {
                var days = $(this).attr("data-day");
                var item = $('#item_select').attr('data-item');
                //console.log(item);
                $(this).siblings("input:checked").removeAttr("checked");
                if (!$("#compare_select input:checked")[0]) {
                    it.loadInterval(item);
                } else {
                    it.loadInterval(item, days);
                }
            });
        });
    },
    loadRealtimeData: function () {
        var it = this;
        it.doAjax({
            url: '../api/api_selecter/realtime',
            method: 'get',
            success: function (res) {
                var data = res.data;
                var html = [];
                for (var j in it.menu) {
                    if (data[j]) {
                        html.push('<td><p class="menu">', it.menu[j].name, '</p><p class="num">', it.numFormat(data[j], it.menu[j].format || void 0),
                                '</p>', '<i style="opacity:0;color:#F00;font-size:20px;">+0</i>', '</td>');
                    }
                }
                it.$('#summary_data').html(html.join(""));
                //if (it.platform_id === 99999) {
                it.realtimeSSE();

            }
        });
    },
    loadInterval: function (item, days) {
        var it = this;
        if (!days) {
            days = 0;
        }
        it.doAjax({
            url: '../api/api_selecter/interval',
            method: 'get',
            data: {days: days},
            success: function (res) {
                it.intervalData = res.data;
                it.realtimeShowChart(item)(it.intervalData);
            }
        });
    },
    realtimeSSE: function () {
        var it = this;
        var $summary_data = it.$('#summary_data td');
        var data = null;
        setInterval(function () {
            it.doAjax({
                url: '../api/api_selecter/realtime_ajax',
                method: 'get',
                success: function (res) {
                    var old_data = data;
                    data = res.data;
                    if (it.menu) {
                        var index_num = 0;
                        //var fadeToCallback = new Array();
                        for (var i in it.menu) {
                            if (data[i]) {
                                var grow_value = old_data ? data[i] - old_data[i] : 0;
                                if (grow_value > 0) {
                                    var $the_td = $summary_data.eq(index_num).find('.num').eq(0);
                                    $the_td.next().text("+" + grow_value).fadeTo(6000, 1).fadeTo(6000, 0);
                                    $the_td.fadeTo(3000, 0, function ($the_td, num, format) {
                                        return function () {
                                            $the_td.text(it.numFormat(parseInt(num), format));
                                        };
                                    }($the_td, data[i], it.menu[i].format)).fadeTo(3000, 1);
                                }
                                index_num++;
                            }
                        }
                    }
                }
            });
        }, 20000);


//        var es = new EventSource("http://data.local.gaopeng.com/api/api_selecter/realtime_sse");
//        es.addEventListener("message", function (e) {
//            var old_data = data;
//            data = JSON.parse(e.data);
//            if (it.menu) {
//                var index_num = 0;
//                for (var i in it.menu) {
//                    if (data[i]) {
//                        var grow_value = old_data ? data[i] - old_data[i] + 10 : 0;
//                        var $the_td = $summary_data.eq(index_num).find('.num').eq(0);
//                        if (grow_value > 0) {
//                            $the_td.next().text("+" + grow_value).fadeTo(2000, 1).fadeTo(2000, 0);
//                            $summary_data.eq(index_num).find('.num').eq(0).text(it.numFormat(parseInt(data[i]), it.menu[i].format || void 0));
//                        }
//                        index_num++;
//                    }
//
//                }
//            }
//        });
    }
});