//作者：Allen Wang
//时间：2015-03-27 20:45
//最后一次修订时间：
    
        $(".rate").each(function(){
                var rateText=$(this).find("span").text();
                var rate=parseFloat(rateText);
            if(rate<0){
                $(this).find("span").addClass("desc");
            }else{
                $(this).find("span").addClass("asc");
            };
        });
        $(".startTime").each(function(){
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
                    dateFormat: "yy-mm-dd" /*设置日期的显示格式*/ ,
                    showWeek: true,/*显示一年中的第几周*/
                    firstDay: 1
                });
        });
        $(".endTime").each(function(){
            $(this).datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    showButtonPanel: true,
                    /*显示今天的日期的显示，以及关闭时间选择器*/
                    changeMonth: true,
                    /*显示选择其他月份*/
                    changeYear: true,
                    /*显示选择其他年份*/
                    dateFormat: "yy-mm-dd" /*设置日期的显示格式*/ ,
                    showWeek: true,/*显示一年中的第几周*/
                    firstDay: 1
                });
        });
        $("#in_date").datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    showButtonPanel: true,
                    /*显示今天的日期的显示，以及关闭时间选择器*/
                    changeMonth: true,
                    /*显示选择其他月份*/
                    changeYear: true,
                    /*显示选择其他年份*/
                    dateFormat: "yy-mm-dd" /*设置日期的显示格式*/ ,
                    showWeek: true,/*显示一年中的第几周*/
                    firstDay: 1
        });
        $("#channel_select").change(function(){
              var channel=$(this).val();

              window_page['page_nav'].dataSelect(channel);
              // var $channel_select=$("#channel_select");
              // var $channel_tbody=$channel_select.parent().next().find("tbody");
              // if(channel=='所有渠道'){
              //   $channel_tbody.find("tr").show();
              // }else{
              //   $channel_tbody.find("tr").hide();
              //   $channel_tbody.find("tr").find("td:contains('"+channel+"')").parent().show();
              // }
          });
        $(".help").mouseover(function(){
          var tips_id=$(this).attr("action-frame");
            var offset=$(this).offset();
            $("#"+tips_id).css({"left":offset.left+30,"top":offset.top-10}).fadeIn("slow");
        });
        $(".help").mouseout(function(){
            var tips_id=$(this).attr("action-frame");
          $("#"+tips_id).fadeOut("slow");
        });
        // $(".help").hover(
        //   function () {
        //     var tips_id=$(this).attr("action-frame");
        //     var offset=$(this).offset();
        //     $("#"+tips_id).css({"left":offset.left+20,"top":offset.top-12}).fadeIn("slow");
        //   },
        //   function () {
        //     var tips_id=$(this).attr("action-frame");
        //     var offset=$(this).offset();
        //     //$("#"+tips_id).css({"left":offset.left+10,"top":offset.top-12}).fadeOut("slow");
        //   }
        // );
          var a_a={
            commomOpts:function(categories, series){
                var common_opts={
                    chart:{  
                    },
                    title: {
                        text: null,
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        categories: categories,
                        labels:{
                            align:"center",
                            step:parseInt(categories.length/10),
                            staggerLines:1
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
                        // formatter: function(){
                        //     return this.x+":"+this.y;
                        // }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: series
                };
                return common_opts;
            },
            number_format:function(a){
                var b=a.split(",");
                var c="";
                for (var i = 0; i < b.length; i++) {
                    c+=b[i];
                };
                return c;
            },
            select_daily_date:function(a){
                    var d=[];
                    var nru=[];
                    var nrd=[];
                    var dau=[];
                    var dad=[];
                    var dr=[];
                    var pu=[];
                    var pt=[];
                    var pr=[];
                    var arpu=[];
                    var arppu=[];
                    //var tbody=document.getElementById("daily_detail");
                    for(var i in a){
                         d.unshift(a[i].d);
                          nru.unshift(parseInt(a_a.number_format(a[i].nru)));
                          nrd.unshift(parseInt(a_a.number_format(a[i].nrd)));
                          dau.unshift(parseInt(a_a.number_format(a[i].dau)));
                          dad.unshift(parseInt(a_a.number_format(a[i].dad)));
                          dr.unshift(parseFloat(a_a.number_format(a[i].dr)));
                          pu.unshift(parseInt(a_a.number_format(a[i].pu)));
                          pt.unshift(parseInt(a_a.number_format(a[i].pt)));
                          pr.unshift(parseFloat(a_a.number_format(a[i].pr)));
                          arpu.unshift(parseFloat(a_a.number_format(a[i].arpu)));
                          arppu.unshift(parseFloat(a_a.number_format(a[i].arppu)));
                    }
                    var page_nav=new Page();
                    window_page.page_nav=page_nav;
                    page_nav.init(a,function(a,from,to){
                        $tbody=$("#daily_detail");
                        $tbody.empty();
                        var tbody=$tbody[0];
                        for(var i=from;i<to;++i){
                                var tr=document.createElement("tr");
                                for(var j in a[i]){
                                    var td=document.createElement("td");
                                    if((j.indexOf('growth'))!=-1){
                                        var tdText=document.createTextNode(a[i][j]+"%");
                                        td.appendChild(tdText);
                                    }else{
                                        if(j=="pr"){
                                            var tdText=document.createTextNode(a[i][j]+"%");
                                        }else{
                                            var tdText=document.createTextNode(a[i][j]);
                                        }
                                        td.appendChild(tdText);
                                    }  
                                    tr.appendChild(td);
                                }
                                tbody.appendChild(tr);
                          
                    }
                    },"page_nav");
               
                    var series={
                        nru:[{name:"新增用户",data:nru}],
                        nrd:[{name:"新增设备",data:nrd}],
                        dau:[{name:"活跃用户",data:dau}],
                        dad:[{name:"活跃设备",data:dad}],
                        dr:[{name:"日收入",data:dr}],
                        pu:[{name:"付费用户",data:pu}],
                        pt:[{name:"付费次数",data:pt}],
                        pr:[{name:"付费率",data:pr}],
                        arpu:[{name:"ARPU",data:arpu}],
                        arppu:[{name:"ARPPU",data:arppu}]
                    };
                    
                    $chart=$("#test_chart");
                    var btn_id=$chart.parent().prev().find("li.on").attr("id");
                    var item=btn_id.substr(4);
                    var commomOpts=this.commomOpts(d,series[item]);
                    $("#test_chart").highcharts(commomOpts);   
            },
            select_weekly_date:function(a){
                var page=new Page();
                window_page.page_nav=page;
                    page.init(a,function(a,from,to){
                      $tbody=$("#daily_detail");
                        $tbody.empty();
                        var tbody=$tbody[0];
                        for(var i=from;i<to;++i){
                                var tr=document.createElement("tr");
                                for(var j in a[i]){
                                    console.log(j);
                                    var td=document.createElement("td");
                                    if((j.indexOf('growth'))!=-1){
                                        var tdText=document.createTextNode(a[i][j]+"%");
                                        td.appendChild(tdText);
                                    }else{
                                        if(j=="wpr"){
                                            var tdText=document.createTextNode(a[i][j]+"%");
                                        }else{
                                            var tdText=document.createTextNode(a[i][j]);    
                                        }     
                                        td.appendChild(tdText);
                                    }
                                    tr.appendChild(td);
                                }
                                tbody.appendChild(tr);
                        }
                    },"page_nav");
                  
            },
            select_monthly_date:function(a){
                var page=new Page();
                window_page.page_nav=page;
                    page.init(a,function(a,from,to){
                      $tbody=$("#monthly_detail");
                        $tbody.empty();
                        var tbody=$tbody[0];
                        for(var i=from;i<to;++i){
                                var tr=document.createElement("tr");
                                for(var j in a[i]){
                                    console.log(j);
                                    var td=document.createElement("td");
                                    if((j.indexOf('growth'))!=-1){
                                        var tdText=document.createTextNode(a[i][j]+"%");
                                        td.appendChild(tdText);
                                    }else{
                                        if(j=="mpr"){
                                            var tdText=document.createTextNode(a[i][j]+"%");
                                        }else{
                                            var tdText=document.createTextNode(a[i][j]);    
                                        }     
                                        td.appendChild(tdText);
                                    }
                                    tr.appendChild(td);
                                }
                                tbody.appendChild(tr);
                        }
                    },"page_nav");    
            },
            select_paymentRank_date:function(a){
                var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                $tbody=$("#paymentRank_detail");
                var user_cooper=$("#user_cooper").text();
                $tbody.empty();
                var tbody=$tbody[0];
                for(var i=from;i<to; i++){
                    var tr=document.createElement("tr");
                            for(var j in a[i]){
                                //console.log(j);
                                if(j=='username'){
                                    var td=document.createElement("td");
                                    var alink=document.createElement("a");
                                    alink.setAttribute('href',"javascript:void()");
                                    alink.setAttribute('title',"查看该用户信息");
                                    var username=a[i][j];
                                    var tdText=document.createTextNode(a[i][j]);
                                    alink.appendChild(tdText);
                                    td.appendChild(alink);
                                    td.onclick=function(){
                                        $("#username").val($(this).text());
                                       $("#form_selectUser").submit();
                                    }
                                    tr.appendChild(td);
                                } else if(j=='pt'){
                                     var td=document.createElement("td");
                                     if(user_cooper!="all"){
                                       
                                        var tdText=document.createTextNode(a[i][j]);
                                        td.appendChild(tdText);
                                     }else{
                                          td.setAttribute("date-username",a[i]['username']);
                                            var alink=document.createElement("a");
                                            alink.setAttribute('href',"javascript:void()");

                                            alink.setAttribute('title',"查看该用户支付详单");
                                            var username=a[i][0];
                                            var tdText=document.createTextNode(a[i][j]);
                                            alink.appendChild(tdText);

                                            td.appendChild(alink);
                                            td.onclick=function(){
                                                
                                                $("#username").val($(this).attr("date-username"));
                                                $("#form_selectUser").attr("action","../welcome/orderQuery");
                                               $("#form_selectUser").submit();
                                            }
                                     }
                                   
                                    tr.appendChild(td);
                                }else{
                                    var td=document.createElement("td");
                                    var tdText=document.createTextNode(a[i][j]);  
                                    td.appendChild(tdText);
                                    tr.appendChild(td);
                                }
                                
                            }
                
                    var tdn=document.createElement("td");
                    var tdTextn=document.createTextNode("unknow");
                    tdn.appendChild(tdTextn);
                    tr.appendChild(tdn);
                    tbody.appendChild(tr);
                    }
                },"page_nav");
            },//大R分析
            select_paymentCon_date:function(a){
                //console.log(a);
                $tbody=$("#paymentCon_detail");
                    $tbody.empty();
                var tbody=$tbody[0];
                for(var i in a){
                    var tr=document.createElement("tr")
                    for(var j in a[i]){
                        // console.log(a[i][j]);

                        var td=document.createElement("td");
                        var tdText=document.createTextNode(a[i][j]); 
                        td.appendChild(tdText);
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                    }
            },//
            select_paymentDis_date:function(a){
                $tbody=$("#paymentDis_detail");
                $tbody.empty();
                var tbody=$tbody[0];
                for(var i in a){
                    var tr=document.createElement("tr")
                    for(var j in a[i]){
                        // console.log(a[i][j]);

                        var td=document.createElement("td");
                        var tdText=document.createTextNode(a[i][j]); 
                        td.appendChild(tdText);
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
            },
            select_paymentType_date:function(a){
                para_chart.init(a,"payment_type_chart");
                var all_data=a.all_data;
                var page=new Page();
                window_page.page_nav=page;
                page.init(all_data,function(all_data,from,to){
                    $tbody=$("#payment_type_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                    for(var i in all_data){
                        var tr=document.createElement("tr");
                        for(var j in all_data[i]){
                            var td=document.createElement("td");
                            var tdText=document.createTextNode(all_data[i][j]); 
                            td.appendChild(tdText);
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                    }
                },"page_nav");
            },
            select_newUser_daily_date:function(a){
                var d=[];
                var alluser=[];
                var dnru=[];
                var wnru=[];
                var dnrd=[];
                var wnrd=[];
                var page=new Page();
                window_page.page_nav=page;
               
                page.init(a,function(a,from,to){
                    $tbody=$("#new_user_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                    for(var i=from;i<to; ++i){
                    var tr=document.createElement("tr");
                            for(var j in a[i]){
                                var td=document.createElement("td");
                                if((j.indexOf('growth'))!=-1){
                                    var tdText=document.createTextNode(a[i][j]+"%");
                                    td.appendChild(tdText);
                                }else{
                                    var tdText=document.createTextNode(a[i][j]);
                                    td.appendChild(tdText);
                                }
                                
                                
                                tr.appendChild(td);
                            }
                            tbody.appendChild(tr);
                }
                },"page_nav");
                
                for(var i in a){
                    d.unshift(a[i].d);
                    alluser.unshift(parseInt(this.number_format(a[i].alluser)));
                    dnru.unshift(parseInt(this.number_format(a[i].dnru)));
                    wnru.unshift(parseInt(this.number_format(a[i].wnru)));
                    dnrd.unshift(parseInt(this.number_format(a[i].dnrd)));
                    wnrd.unshift(parseInt(this.number_format(a[i].wnrd)));
                }
                var series=[
                {name:"总注册用户数",data:alluser},
                {name:"日新增用户数",data:dnru},
                {name:"周新增用户数",data:wnru},
                {name:"日新增设备数",data:dnrd},
                {name:"周新增设备数",data:wnrd}
                ];
                var commomOpts=this.commomOpts(d,series);
                //console.log(commomOpts);
                
                
               
                $("#new_alluser_chart").highcharts(commomOpts);  
            },
            channelidToChannelName:function(channelid){
                var a=
                {
                    '00001':"Appstore",
                    '00002':'Google Play',
                    '00003':'Appota',
                    '00004':'MoboMarket',
                    '00005':'Mobogenie',
                    '00006':'Advan',
                    '00007':'TCL',
                    '00008':'Apptoko',
                    '00010':'Advan-2',
                    '00011':'OPPO',
                    '00012':'MoboMarket-2',
                    '00013':'UC',
                    '00014':'Feeliu',
                    '00015':'Gudang Aplikasi',
                    '00016':'Oomph',
                    '00017':'weplay',
                    '00018':'Jalan tikus',
                    '00019':'Opera(OKGAME)',
                    '00000':'Test',
                    '99999':'common'
                };
                return a[channelid]!=undefined?a[channelid]:channelid;
            },
            select_newUser_channel_date:function(a){
                var d=a.d;
                var cid=a.cid;
                var cid_data=a.cid_data;
                var all_data=a.all_data;
                var series=[];
                var k=0;
                for(var i in cid){
                    var o={}; 
                    o.name=this.channelidToChannelName(cid[i]);
                    o.data=cid_data[k];
                    series.push(o);
                    k++;
                }
                //console.log(series);
                //var commomOpts=this.commomOpts(d,series);
                // $("#new_user_channel_chart").highcharts(commomOpts);
                  $tbody=$("#newUser_channel_detail");
                    $tbody.empty();
                var tbody=$tbody[0];
                for(var i in all_data){
                    var tr=document.createElement("tr");
                    for(var j in all_data[i]){
                        var td=document.createElement("td");
                        var tdText=document.createTextNode(all_data[i][j]); 
                        td.appendChild(tdText);
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                    }
                $('#new_user_channel_chart').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: null
                        },
                        xAxis: {
                            categories: d,
                            labels:{
                                align:"center",
                                step:parseInt(d.length/10),
                                staggerLines:1
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '新注册用户数'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                }
                            }
                        },
                        legend: {
                            align: 'right',
                            x: -70,
                            verticalAlign: 'top',
                            y: 20,
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        tooltip: {
                            formatter: function() {
                                return '<b>'+ this.x +'</b><br/>'+
                                    this.series.name +': '+ this.y +'<br/>'+
                                    '占比:'+Math.round(this.y/this.point.stackTotal*100)+"%"+'<br/>'+
                                    'Total: '+ this.point.stackTotal;
                            }
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true,
                                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                                    style: {
                                        textShadow: '0 0 3px black, 0 0 3px black'
                                    }
                                }
                            }
                        },
                        series: series
                    });

            },
            select_activeUser_daily_date:function(a){
                var d=[];
                var dau=[];
                var wau=[];
                var dad=[];
                var wad=[];
                for(var i in a){
                    d.unshift(a[i].d);
                    dau.unshift(parseInt(this.number_format(a[i].dau)));
                    wau.unshift(parseInt(this.number_format(a[i].wau)));    
                    dad.unshift(parseInt(this.number_format(a[i].dad)));
                    wad.unshift(parseInt(this.number_format(a[i].wad)));    
                }
                var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                    $tbody=$("#active_user_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                     for(var i=from;i<to;++i){
                        var tr=document.createElement("tr");
                        for(var j in a[i]){
                        // console.log(a[i][j]);
                        var td=document.createElement("td");
                        if((j.indexOf('growth'))!=-1){
                                    var tdText=document.createTextNode(a[i][j]+"%");
                                    td.appendChild(tdText);
                                }else{
                                    var tdText=document.createTextNode(a[i][j]);
                                    td.appendChild(tdText);
                                }
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
                },"page_nav");
                var series=[{name:"日活跃用户",data:dau},{name:"周活跃用户",data:wau}
                ,{name:"日活跃设备",data:dad},{name:"周活跃设备",data:wad}];
                var commomOpts=this.commomOpts(d,series);
                $("#select_activeUser_daily_date_chart").highcharts(commomOpts);  
            },
            select_newUserStayRate_date:function(a){
                var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                    $tbody=$("#newUserStayRate_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                    for(var i=from;i<to;i++){
                            var tr=document.createElement("tr")
                            for(var j in a[i]){
                                // console.log(a[i][j]);

                                var td=document.createElement("td");
                                var tdText=document.createTextNode(a[i][j]); 
                                td.appendChild(tdText);
                                tr.appendChild(td);
                            }
                            tbody.appendChild(tr);
                        }
                },"page_nav");
                
            },
            select_deviceRetention_date:function(a){
                var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                    $tbody=$("#deviceRetention_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                    for(var i=from;i<to;i++){
                            var tr=document.createElement("tr")
                            for(var j in a[i]){
                                var td=document.createElement("td");
                                var tdText=document.createTextNode(a[i][j]); 
                                td.appendChild(tdText);
                                tr.appendChild(td);
                            }
                            tbody.appendChild(tr);
                        }
                },"page_nav");    
            },
            select_dailyLogin_date:function(a){
                var d=[];
                var logintimes=[];
                var dau=[];
                var everytimes=[];
                var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                    $tbody=$("#daily_login_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                    for(var i in a){
                        var tr=document.createElement("tr")
                        for(var j in a[i]){
                            var td=document.createElement("td");
                            var tdText=document.createTextNode(a[i][j]); 
                            td.appendChild(tdText);
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                    }
                },"page_nav");
              
                for(var i in a){
                    d.unshift(a[i].d);
                    logintimes.unshift(parseInt(this.number_format(a[i].logintimes)));
                    dau.unshift(parseInt(this.number_format(a[i].dau)));
                    everytimes.unshift(parseInt(this.number_format(a[i].everytimes)));
                }
                var series=[{type:'column',name:"日活跃",data:dau},
                {type:'column',name:"日登录",data:logintimes},
                {type:'line',name:"人均登录次数",data:everytimes}];
                 $('#daily_login_chart').highcharts({
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
                        categories: d
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
                });
            },
            select_userRetention_channel_date:function(a){
                this.channel_select(a);
                 var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                    $tbody=$("#channel_userRetention_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                    for(var i=from;i<to;++i){
                        var tr=document.createElement("tr")
                        var option=document.createElement("option");
                        for(var j in a[i]){
                            var td=document.createElement("td");
                            if(j=='cid'){
                                var channelname=a_a.channelidToChannelName(a[i][j]);
                                 var tdText=document.createTextNode(channelname);
                            }else{
                                 var tdText=document.createTextNode(a[i][j]); 
                            }
                            td.appendChild(tdText);
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                        }
                },"page_nav");
                
            },
            channel_select:function(a){
                var $channel_select=$("#channel_select");
                $channel_select.empty();
                $channel_select.append("<option>所有渠道</option>");
                var channel=[];
                for(var i in a){
                    var channelid=a[i]['cid']||a[i]['channelid'];

                    var channelname=isNaN(channelid)?channelid:this.channelidToChannelName(channelid);
                            var flag=true;
                             for (var k = channel.length - 1; k >= 0; k--) {
                                  if(channel[k]==channelname){
                                    flag=false;
                                    break;
                                  }
                              }
                              if(flag){
                                channel.push(channelname);
                                var option=document.createElement("option");
                                var optionText=document.createTextNode(channelname);
                                option.appendChild(optionText);
                                channel_select.appendChild(option);
                              }
                }
            },
            select_channel_activeUser_date:function(a){
                this.channel_select(a);
                 var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                    var $tbody=$("#channel_activeUser_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                   
                    for(var i=from;i<to;++i){
                        var tr=document.createElement("tr")
                        for(var j in a[i]){
                            // console.log(a[i][j]);
                            console.log(j);
                            var td=document.createElement("td");
                            if(j=='channelid'){
                                 var tdText=document.createTextNode(a_a.channelidToChannelName(a[i][j])); 
                            }else{
                                 var tdText=document.createTextNode(a[i][j]); 
                            }
                            
                            td.appendChild(tdText);
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                        }
                },"page_nav");
            
            },
            select_channel_payment_date:function(a){
                this.channel_select(a);
                 var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                    $tbody=$("#channel_activeUser_detail");
                    $tbody.empty();    
                    var tbody=$tbody[0];
                    for(var i=from;i<to;++i){
                        var tr=document.createElement("tr");
                        for(var j in a[i]){
                            var td=document.createElement("td");
                            var tdText=document.createTextNode(a[i][j]); 
                            td.appendChild(tdText);
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                        }
                },"page_nav");
                
            },
            select_terminal:function(a){
                var categories=[];
                var series={};
                series.data=[];
                series.name=null;
                $chart=$("#terminal_chart");
                var btn_id=$chart.parent().prev().find("li.on").attr("id");
                var item=btn_id.substr(4);
                var name={
                    phonefactory:"品牌",
                    phonemodel:"设备型号",
                    os:"操作系统",
                    metrics:"分辨率",
                    operator:"运营商",
                    loginnettype:"联网方式"
                };
                series.name=name[item];
                for(var i in a){
                     categories.push(a[i].item==""?"unknow":a[i].item);
                    //console.log(a[i].item);
                    var series_data={};
                    series_data.y=parseInt(a[i].user_count);
                    var colorStr=Math.floor(Math.random()*0xFFFFFF).toString(16).toUpperCase();
                    series_data.color="#"+"000000".substring(0,6-colorStr)+colorStr;
                    series.data.push(series_data);
                    if(i>=15){
                        break;
                    }
                }
                //$tbody=$("#terminal_select");
                $("#terminal_item").text(name[item]);
                // $tbody.empty();    
                // var tbody=$tbody[0];
                 var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(data,from,to){
                    var allUser=0;
                    $tbody=$("#terminal_select");
                    $tbody.empty();    
                    var tbody=$tbody[0];
                    for(var i in data){
                        allUser+=parseInt(data[i].user_count);
                    }
                    for(var i=from;i<to; i++){
                        //明细数据
                        var tr=document.createElement("tr");
                        var td=document.createElement("td");
                        var tdText=document.createTextNode(parseInt(i)+1); 
                        td.appendChild(tdText);
                        tr.appendChild(td);
                        for(var j in data[i]){
                            var td=document.createElement("td");
                            var tdText=document.createTextNode(data[i][j]==""?"unknow":data[i][j]); 
                            td.appendChild(tdText);
                            tr.appendChild(td);
                        }
                        var td=document.createElement("td");
                        var tdText=document.createTextNode(allUser!=0?Math.floor(parseInt(data[i].user_count)/allUser*10000)/100+"%":"0%"); 
                        td.appendChild(tdText);
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    }
                },"page_nav");

                $('#terminal_chart').highcharts({
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
                    series: [series]
                });
            },
            select_today_interval:function(a){
                //console.log(a);
                //var active_item=$(".js-tab").find(".on").text();
                //console.log(active_item);
                var series=[];
                for(var i in a){
                    var serie={};
                    serie.name=i;
                    serie.data=a[i];
                    series.push(serie);
                }
                var d= ['0:00-1:00','1:00-2:00','2:00-3:00','3:00-4:00','4:00-5:00',
               '5:00-6:00','6:00-7:00','7:00-8:00','8:00-9:00','9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00',
               '13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00',
               '18:00-19:00','19:00-20:00','20:00-21:00','21:00-22:00','22:00-23:00','23:00-24:00'];
                   
                        $("#select_today_interval_chart").highcharts({
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
                    // subtitle: {
                    //     text: 'Source: WorldClimate.com'
                    // },
                    xAxis: {
                        categories: d,
                        labels:{
                            align:"center",
                            step:parseInt(d.length/10),
                            staggerLines:1
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
            },
            select_today_data:function(a){
              var num_array=[];
              var rate_array=[];num_array.push(a.nru);num_array.push(a.nrd);num_array.push(a.dau);num_array.push(a.dad);
              num_array.push(a.logintimes);num_array.push(a.pu);num_array.push(a.pt);num_array.push(a.newpu);num_array.push(a.rev);
              rate_array.push(a.nru_growth);rate_array.push(a.nrd_growth);rate_array.push(a.dau_growth);rate_array.push(a.dad_growth);
              rate_array.push(a.logintimes_growth);rate_array.push(a.pu_growth);rate_array.push(a.pt_growth);rate_array.push(a.newpu_growth);
              rate_array.push(a.rev_growth);
              var $num=$(".summarydata .num");
              var $rate=$(".summarydata .rate_i");
              var num_i=0;
              var rate_i=0;
              console.log(num_array);
              $num.each(function(){
                $(this).text(num_array[num_i]);
                console.log(num_i);
                num_i++;
              });
              console.log()
              $rate.each(function(){
                $(this).text(rate_array[rate_i]+"%");
                if(rate_array[rate_i]>=0){
                    $(this).parent().attr("class","asc");
                }else{
                    $(this).parent().attr("class","desc");
                }
                
                rate_i++;
              });
            },
            select_inactiveUser_date:function(a){
                var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                    $tbody=$("#inactiveUser_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                    for(var i=from;i<to; ++i){
                        var tr=document.createElement("tr")
                        for(var j in a[i]){
                            // console.log(a[i][j]);

                            var td=document.createElement("td");
                            var tdText=document.createTextNode(a[i][j]); 
                            td.appendChild(tdText);
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                        }
                },"page_nav");
                
            },
            select_backUser_date:function(a){
                 var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                    $tbody=$("#inactiveUser_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                    for(var i=from;i<to;++i){
                        var tr=document.createElement("tr")
                        for(var j in a[i]){
                            // console.log(a[i][j]);

                            var td=document.createElement("td");
                            var tdText=document.createTextNode(a[i][j]); 
                            td.appendChild(tdText);
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                        }
                },"page_nav");
                
            },
            select_wastageRate_date:function(a){
                var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                $tbody=$("#wastageRate_detail");
                $tbody.empty();
                var tbody=$tbody[0];
                for(var i=from;i<to;++i){
                    
                    var tr=document.createElement("tr")
                    for(var j in a[i]){
                        var td=document.createElement("td");
                        var tdText=document.createTextNode(a[i][j]); 
                        td.appendChild(tdText);
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                    }
                },"page_nav");
            },
            select_backRate_date:function(a){
                 var page=new Page();
                window_page.page_nav=page;
                page.init(a,function(a,from,to){
                    $tbody=$("#backRate_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                    for(var i=from;i<to;++i){
                        var tr=document.createElement("tr")
                        for(var j in a[i]){
                            // console.log(a[i][j]);

                            var td=document.createElement("td");
                            var tdText=document.createTextNode(a[i][j]); 
                            td.appendChild(tdText);
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                        }
                },"page_nav")
                
            },
            select_pay_funnel:function(a){
                console.log(a);
                $tbody=$("#pay_funnel_detail");
                $tbody.empty();
                var tbody=$tbody[0];
                for(var i in a){
                    var tr=document.createElement("tr");
                    for(var j in a[i]){
                        // console.log(a[i][j]);

                        var td=document.createElement("td");
                        var tdText=document.createTextNode(a[i][j]); 
                        td.appendChild(tdText);
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                    }
            },
            select_paytype_funnel:function(a){
                var page=new Page();
                window_page.page_nav2=page;
                page.init(a,function(){
                    $tbody=$("#paytype_funnel_detail");
                    $tbody.empty();
                    var tbody=$tbody[0];
                    var payview=a.payview;
                    var data=a.data;
                   
                    var length=data.length;
                    for(var i in data){
                        var tr=document.createElement("tr");
                        if(i==0){
                            for(var k in payview){
                                var td=document.createElement("td");
                                var tdText=document.createTextNode(payview[k]);         
                                td.setAttribute("rowspan",length);
                                td.appendChild(tdText);
                                tr.appendChild(td);
                            }
                        }
                        for(var j in data[i]){
                            var td=document.createElement("td");
                            var tdText=document.createTextNode(data[i][j]); 
                            td.appendChild(tdText);
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                        }
                },"page_nav2");
            },
            select_appsflyer_payment:function(res){
                console.log("Hello");
                var page_stage=new Page();
                window_page.page_stage=page_stage;
                page_stage.init(res,function(a,from,to){
                    $tbody=$("#appflys_payment_detail");
                        $tbody.empty();
                        var tbody=$tbody[0];
                        for(var i=from;i<to;++i){
                            var tr=document.createElement("tr");
                            for(var j in a[i]){
                                // console.log(a[i][j]);

                                var td=document.createElement("td");
                                var tdText=document.createTextNode(a[i][j]); 
                                td.appendChild(tdText);
                                tr.appendChild(td);
                            }
                            tbody.appendChild(tr);
                        } 
                },"page_nav");
            }
        };

        var para_chart={};
        para_chart.data=null;
        para_chart.chartAdd="";
        para_chart.curItem=""; 
        para_chart.showChart=function(item){
            var series=this.data[item];
                    var categories=this.data.d;
                    $('#'+this.chartAdd).highcharts({
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
                });
        };
        para_chart.init=function(a,chartAdd){
            this.data=a;
            this.chartAdd=chartAdd;
            var item=$("input[name='paytype']:checked").val();
            this.showChart(item);
        }
        //a_a.select_daily_date();
        $(".select-list li").each(function(){
            $(this).click(function(){
                var text=$(this).text();
                var days=parseInt(text.substr(2));
                if(isNaN(days)){
                    
                }else{
                    var day2=new Date();
                    var day1=new Date(day2.valueOf()-days*24*60*60*1000);
                    var startTime=dateFormat(day1);
                    var endTime=dateFormat(day2);
                    var $ul=$(this).parent();
                    $ul.toggle("fast");
                    $ul.prev().find(".start").text(startTime);
                    $ul.prev().find(".end").text(endTime);
                    var url=$(this).parent().parent().attr("id");
                    var a=getDataAjax(url,{day1:startTime,day2:endTime},a_a);
                }
            });
            $(this).find(".btn-confirm").click(function(){
                var $div=$(this).parent().prev();
                var startTime=$div.find(".startTime").val();
                var endTime=$div.find(".endTime").val();
                if(startTime>endTime||startTime==""||endTime==""){
                    alert("输入错误！");
                }else{
                    var $ul=$(this).parents("ul.select-list");
                    $ul.toggle("fast");
                    $ul.prev().find(".start").text(startTime);
                    $ul.prev().find(".end").text(endTime);
                    var url=$ul.parent().attr("id");
                    var a=getDataAjax(url,{day1:startTime,day2:endTime},a_a);
                }
            });
            $(this).find(".btn-cancel").click(function(){
                var $ul=$(this).parents("ul.select-list");
                    $ul.toggle("fast");
            });
        });
        $(".tab-li li").each(function(){
            $(this).click(function(){
               
                $(this).addClass("on")  
                .siblings("li.on").removeClass("on");
                $div=$(this).parents(".mod-body").prev();
                
                var startTime=$div.find(".start").text();
                var endTime=$div.find(".end").text();
                //console.log(startTime);
                //console.log(startTime);
                var url=$div.find(".option").attr("id");
                 var m=$(this).attr("id");
               
                var item=m.substr(4);
                if(url==undefined){
                    if($(".js-checkbox input:checked")[0]!=undefined){
                        var days=$(".js-checkbox input:checked").attr("data-day");
                    }else{
                        var days=0;
                    }
                    var a=getDataAjax('select_today_interval',{item:item,days:days},a_a);
                }else{
                    var a=getDataAjax(url,{day1:startTime,day2:endTime,item:item},a_a);
                }
            })
        });
        $(".js-checkbox input").each(function(){
                $(this).click(function(){
                  var days=$(this).attr("data-day");
                  $(this).siblings("input:checked").removeAttr("checked");
                  var active_item=$(".js-tab").find(".on").attr("id");
                  //console.log(active_item);
                  if($(".js-checkbox input:checked")[0]==undefined){
                    days=0;
                  }
                  var item=active_item.substr(4);
                    var a=getDataAjax('select_today_interval',{item:item,days:days},a_a);
                });
        });
        
        // $(".os-select input").each(function(){
        //         $(this).click(function(){
        //           var days=$(this).attr("data-day");
        //           $(this).siblings("input:checked").removeAttr("checked");
        //           var active_item=$(".js-tab").find(".on").attr("id");
        //           //console.log(active_item);
        //           if($(".js-checkbox input:checked")[0]==undefined){
        //             days=0;
        //           }
        //           var item=active_item.substr(4);
        //             var a=getDataAjax('select_today_interval',{item:item,days:days},a_a);

        //         });
        // });
        function dateFormat(day1){
            var year=day1.getFullYear();
            var month=day1.getMonth()+1;
            var day=day1.getDate();
            return year+"-"+(month>=10?month:"0"+month)+"-"+(day>=10?day:"0"+day);
        }
        function testFunction(res){
            console.log(res);
        }
        function getDataAjax(url,data,func){
            var dataJson="";
            // $.getJSON()
            var url_1=location.href;
            var a=url_1.split("/index.php/");
            a=a[1].split("/");
            var the_url="";
            if(a[0]=='welcome'){
                the_url="select";
            }else{
                the_url=a[0];
            }
            var curapp=$("#app_selected").attr("data-app");
            var curstate=$("#state_selected").attr("data-state");
            var os=$("#os_input").val();
            data.curapp=curapp;
            data.curstate=curstate;
            data.os=os;
            data.channelid=$("#user_channelid").text();
            if($("#channel_select_form input[checked='checked']")!=undefined){
                data.channelid=$("#channel_select_form input[checked='checked']").val();
            }
            if($(".js-tab")[0]){
                var active_item=$(".js-tab").find(".on").attr("id");
                var item=active_item.substr(4);
                data.item=item;
            }
            $.ajax({
                type:"GET",
                url:"../"+the_url+"/"+url,
                data:data,
                dataType:"json",
                beforeSend:function(){
                   
                    $("."+url+"_chart").html("<div class='loading-card'><span class='throbber-loader'>Loading…</span></div>");
                },
                success:function(res){
                    if(res.length==0){
                          func[url](res);
                    }else{
                        $("."+url+"_chart").html("");
                        func[url](res);
                    }
                    
                   
                }
            });
            return dataJson;
        }
        $("#select_btn").click(function(){
            var get_data={};
            $(".select_input .select-data").each(function(){
                get_data[$(this).attr("data-key")]=$(this).val();
            });
            var url=$(this).attr("data-key");
            //console.log(url);
            getDataAjax(url,get_data,a_a);
        });
       //展开列表...


