var hchart = {};
hchart.dateFormat = function (day1, day2) {
    var year = day1.getFullYear();
    var month = day1.getMonth() + 1;
    var day = day1.getDate();
    return year + "-" + (month >= 10 ? month : "0" + month) + "-" + (day >= 10 ? day : "0" + day);
};
hchart.dateSelect = function (it, callback) {
    $(".startTime").each(function () {
        //console.log("hah");
        $(this).datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            showButtonPanel: true,
            /*显示今天的日期的显示，以及关闭时间选择器*/
            changeMonth: true,
            /*显示选择其他月份*/
            changeYear: true,
            /*显示选择其他年份*/
            dateFormat: "yy-mm-dd" /*设置日期的显示格式*/,
            showWeek: true, /*显示一年中的第几周*/
            firstDay: 1
        });
    });
    $(".endTime").each(function () {
        $(this).datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            showButtonPanel: true,
            /*显示今天的日期的显示，以及关闭时间选择器*/
            changeMonth: true,
            /*显示选择其他月份*/
            changeYear: true,
            /*显示选择其他年份*/
            dateFormat: "yy-mm-dd" /*设置日期的显示格式*/,
            showWeek: true, /*显示一年中的第几周*/
            firstDay: 1
        });
    });
    $(".date-select").each(function () {
        $(this).click(function () {
            $(this).siblings("ul").toggle("fast");
        });
    });
    var day2 = new Date();
    var day1 = new Date(day2.valueOf() - 7 * 24 * 60 * 60 * 1000);
    var startTime = this.dateFormat(day1);
    var endTime = this.dateFormat(day2);
    $(".date-select").find(".start").text(startTime);
    $(".date-select").find(".end").text(endTime);
    it[callback](startTime, endTime);
//    return {startTime: startTime, endTime: endTime};
};
hchart.rateIcon = function () {
    $(".rate").each(function () {
        var rateText = $(this).find("span").text();
        var rate = parseFloat(rateText);
        if (rate < 0) {
            $(this).find("span").addClass("desc");
        } else {
            $(this).find("span").addClass("asc");
        }
    });
};
hchart.selectedDate = function (it, callback) {
    var self = this;
    $(".select-list li").each(function () {
        $(this).click(function () {
            var text = $(this).text();
            var days = parseInt(text.substr(2));
            if (isNaN(days)) {

            } else {
                var day2 = new Date();
                var day1 = new Date(day2.valueOf() - days * 24 * 60 * 60 * 1000);
                var startTime = self.dateFormat(day1);
                var endTime = self.dateFormat(day2);
                var $ul = $(this).parent();
                $ul.toggle("fast");
                $ul.prev().find(".start").text(startTime);
                $ul.prev().find(".end").text(endTime);
                it[callback](startTime, endTime);
            }
        });
        $(this).find(".btn-confirm").click(function () {
            var $div = $(this).parent().prev();
            var startTime = $div.find(".startTime").val();
            var endTime = $div.find(".endTime").val();
            if (startTime > endTime || startTime == "" || endTime == "") {
                alert("输入错误！");
            } else {
                var $ul = $(this).parents("ul.select-list");
                $ul.toggle("fast");
                $ul.prev().find(".start").text(startTime);
                $ul.prev().find(".end").text(endTime);
                it[callback](startTime, endTime);
            }
        });
        $(this).find(".btn-cancel").click(function () {
            var $ul = $(this).parents("ul.select-list");
            $ul.toggle("fast");
        });
    });
};
hchart.chart = {
    categories: null,
    data: null,
    chartAdd: '',
    type: 'chart',
    showChart: function (item, is_data) {
        if (item === 'all') {
            var series = [];
            for (var i in this.data) {
                series.push(this.data[i]);
            }
            $('#' + this.chartAdd).highcharts(this.hchartConfig(this.categories, series, this.type));
        } else {
            $('#' + this.chartAdd).highcharts(this.hchartConfig(this.categories, is_data ? this.data[item].data : [this.data[item]], this.type));
        }

    },
    hchartConfig: function (categories, series, type) {
        var chart_config = {
            chart: {
                chart: {
                },
                title: {
                    text: null
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    categories: categories,
                    labels: {
                        align: "center",
                        step: parseInt(categories.length / 5),
                        staggerLines: 1
                    }
                },
                yAxis: {
                    plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                },
                tooltip: {
                },
                series: series
            },
            bar: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: null
                },
                exporting: {
                    buttons: {
                        contextButton: {
                            enabled: false
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                subtitle: {
                    text: null
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                tooltip: {
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: series
            },
            column: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: null
                },
                subtitle: {
                    text: null
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: series
            }
        };
        return type ? chart_config[type] : chart_config['chart'];
    },
    init: function (categories, data, chartAdd, type) {
        this.chartAdd = chartAdd;
        this.categories = categories;
        this.data = data;
        this.type = type;
    }
};