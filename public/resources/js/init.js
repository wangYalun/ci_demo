$(".date-select").each(function () {
    $(this).click(function () {
        $(this).siblings("ul").toggle("fast");
    });
});

$("#app-select-head").click(function () {
    $("#app-select-list").toggle("fast");
});
$("#state-select-head").click(function () {
    $("#state-select-list").toggle("fast");
});
$(".rate").each(function () {
    var rateText = $(this).find("span").text();
    var rate = parseFloat(rateText);
    if (rate < 0) {
        $(this).find("span").addClass("desc");
    } else {
        $(this).find("span").addClass("asc");
    }
    ;
});
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
$(".help").mouseover(function () {
    var tips_id = $(this).attr("action-frame");
    var offset = $(this).offset();
    $("#" + tips_id).css({"left": offset.left + 30, "top": offset.top - 10}).fadeIn("slow");
});
$(".help").mouseout(function () {
    var tips_id = $(this).attr("action-frame");
    $("#" + tips_id).fadeOut("slow");
});


(function () {
    var url = location.href;
    var a = url.split("/index.php/");
    a = a[1].split("/");
    var controller = a[0];
    a = a[1].split("#");
    a = a[0].split("?");
    $("a[href$=" + a[0] + "]").addClass("current").parent().addClass("on")
            .siblings(".list2.on").removeClass("on");
    if (controller == "welcome") {
        (function () {
            var day2 = new Date();
            var day1 = new Date(day2.valueOf() - 7 * 24 * 60 * 60 * 1000);
            var startTime = dateFormat(day1);
            var endTime = dateFormat(day2);
            $(".date-select").find(".start").text(startTime);
            $(".date-select").find(".end").text(endTime);
            $option = $(".mod-header .option");
            if ($option[0] == undefined) {
                var a = getDataAjax('select_today_interval', {item: 'nru', days: 0}, a_a);
                //  a_a.select_today_data_id=0;
                // a_a.interval=window.setInterval(function(){
                //  getDataAjax("select_today_data",{times:a_a.select_today_data_id},a_a);
                //  a_a.select_today_data_id++;
                // },30000);
            } else {
                $(".mod-header .option").each(function () {
                    var url = $(this).attr("id");
                    var a = getDataAjax(url, {day1: startTime, day2: endTime}, a_a);
                });
            }
        })();//页面初始化
    } else {
        getDataAjax('test', {}, game);
    }

})();
(function () {
    var user_channelid = $("#user_channelid").text();
    var user_cooper = $("#user_cooper").text();
    if (user_cooper != 'all' || user_channelid != 'all') {
        $('#cp_alert').show("slow");
    }
    $("#cp_alert a").click(function () {
        $('#cp_alert').hide("slow");
    });
})();