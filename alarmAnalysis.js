/*!
 * @author Z.L
 * 报警统计分析
 * @date 2018.06.12
 */

var echartsOption = function () {
  return {

  /**
   * 接口参数说明
   * 示意1: http://localhost:8085/api/alarmAnalysis?date=M&equipmentClass=1
   * 示意2: http://localhost:8085/api/alarmAnalysis??date=Y&site=3&equipment=1
   * 参数: 1, 时间.data (M或Y，月或年)
           2, 设备类.equipmentClass (id)
           3, 单站.site (id)
           4, 设备.equipment (id)
   */

    API: function () {
        return {
            E1_API: "temp/E1_data.js",
            E2_API: "temp/E2_data.js",
            E3_API: "temp/E3_data.js",
            E4_API: "temp/E4_data.js",
            E5_API: "temp/E5_data.js",
            E6_API: "temp/E6_data.js"
        }
    },

    setTab: function (name, cursel, n) {
        for( var i = 1; i <= n; i++ ){
            var menu = document.getElementById( name + i );
            var con = document.getElementById( "con_" + name + "_" + i );
            menu.className = i == cursel ? "s" : "";
            con.style.display = i == cursel ? "block" : "none";
        }
    },

    //BAR
    E1: function () {
        return {
            title: {
                left: 'center',
                text: '报警时间分布',
            },
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                formatter: "{b}月：{c}",
                axisPointer : {
                    type : 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name: '报警数'
                }
            ],
            series : [
                {
                    name:'报警数时间分布',
                    type:'bar',
                    barWidth: '30%',
                }
            ]      
        }
    },

    //PIE
    E2: function () {
        return {
            title: {
                left: 'center',
                text: '报警等级分布',
            },
            color: ['#5B9BD5', '#ED7D31', '#A5A5A5'],
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: 10,
                data:['一般','严重','紧急']
            },
            series: [
                {
                    type:'pie',
                    radius : '65%',
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    }
                }
            ]
        }
    },

    //V_BAR
    E3: function () {
        return {
            color: ['#3398DB'],
            title: {
                left: 'center',
                text: '单站报警数排名',
            },
            tooltip: {
                trigger: 'axis',
                formatter: "{b} : {c}",
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top:'8%',
                left: '3%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                name: '报警数'
            },
            yAxis: {
                type: 'category'
            },
            series: [
                {
                    type: 'bar',
                    barWidth: '40%'
                }
            ]
        }
    },

    getData: function (eType, option, callback) {
        switch(eType){
            case "E1":
                var getUrl = new echartsOption().API().E1_API;
                break;
            case "E2":
                var getUrl = new echartsOption().API().E2_API;
                break;
            case "E3":
                var getUrl = new echartsOption().API().E3_API;
                break;
            case "E4":
                var getUrl = new echartsOption().API().E4_API;
                break;
            case "E5":
                var getUrl = new echartsOption().API().E5_API;
                break;
            case "E6":
                var getUrl = new echartsOption().API().E6_API;
                break;
        };
        if (option.type == "all") {
            var equipmentClass = $("#equipmentClass").val();  //设备类
            getUrl = getUrl + "?date=" + option.date + "&equipmentClass=" + equipmentClass;
        }else{
            var site = $("#site").val();     //单站
            var equipment = $("#equipment").val();     //设备
            getUrl = getUrl + "?date=" + option.date + "&site=" + site + "&equipment=" + equipment;
        };
        $.ajax({
            type: "GET",
            url: getUrl,
            dataType: "json",
            success: callback,
            error: function(){
                alert(eType + "数据响应失败!");
            }            
        });
    },

    //render Dom
    bindDOM : function () {
        return function (obj, option) {
            var dom = document.getElementById(obj);
            var chart = echarts.init(dom);
            chart.setOption(option);
        }
    }

  }
};


//echarts Bar
var E1 = function(option){
    var myOption = new echartsOption().E1();
    var setEchart = new echartsOption().bindDOM();
    new echartsOption().getData( option.echartsObj, option, function (data) {
        myOption.xAxis[0].data = data.data.xAxis;
        myOption.series[0].data = data.data.series;
        setEchart(option.echartsObj, myOption);
    });
};

//echarts Pie
var E2 = function(option){
    var myOption = new echartsOption().E2();
    var setEchart = new echartsOption().bindDOM();
    new echartsOption().getData( option.echartsObj, option, function (data) {
        myOption.series[0].data = data.data;
        setEchart(option.echartsObj, myOption);
    });
};

//echarts vertical-Bar
var E3 = function(option){
    var myOption = new echartsOption().E3();
    var setEchart = new echartsOption().bindDOM();
    setEchart(option.echartsObj, myOption);
    new echartsOption().getData( option.echartsObj, option, function (data) {
        myOption.yAxis.data = data.data.yAxis;
        myOption.series[0].data = data.data.series;
        if (option.echartsObj == "E6") {
            myOption.title.text = "报警类别排名";
        }
        setEchart(option.echartsObj, myOption);
    });
};


//pageLoad and resetHeight
$("#E4").width($("#E1").width()).height($("#E1").height());
$("#E5").width($("#E2").width()).height($("#E2").height());
$("#E6").width($("#E3").width()).height($("#E3").height());

E1({ type: "all",  echartsObj: "E1",  date: "M"});
E2({ type: "all",  echartsObj: "E2",  date: "M"});
E3({ type: "all",  echartsObj: "E3",  date: "M"});
E1({ type: "only",  echartsObj: "E4",  date: "M"});
E2({ type: "only",  echartsObj: "E5",  date: "M"});
E3({ type: "only",  echartsObj: "E6",  date: "M"});

//type.all
var Radio1 = document.getElementById("Radio1");
var Radio2 = document.getElementById("Radio2");
var equipmentClass = document.getElementById("equipmentClass");
Radio1.onclick = function () {   //month select
    E1({ type: "all",  echartsObj: "E1",  date: "M"});
    E2({ type: "all",  echartsObj: "E2",  date: "M"});
    E3({ type: "all",  echartsObj: "E3",  date: "M"});
}
Radio2.onclick = function () {   //year select
    E1({ type: "all",  echartsObj: "E1",  date: "Y"});
    E2({ type: "all",  echartsObj: "E2",  date: "Y"});
    E3({ type: "all",  echartsObj: "E3",  date: "Y"});
}
equipmentClass.onchange = function () {   //equipmentClass change
    var val = $('input:radio[name="RadioA"]:checked').val();
    E1({ type: "all",  echartsObj: "E1",  date: val});
    E2({ type: "all",  echartsObj: "E2",  date: val});
    E3({ type: "all",  echartsObj: "E3",  date: val});
}

//type.only
var Radio3 = document.getElementById("Radio3");
var Radio4 = document.getElementById("Radio4");
var site = document.getElementById("site");
var equipment = document.getElementById("equipment");
Radio3.onclick = function () {   //month select
    E1({ type: "only",  echartsObj: "E4",  date: "M"});
    E2({ type: "only",  echartsObj: "E5",  date: "M"});
    E3({ type: "only",  echartsObj: "E6",  date: "M"});
}
Radio4.onclick = function () {   //year select
    E1({ type: "only",  echartsObj: "E4",  date: "Y"});
    E2({ type: "only",  echartsObj: "E5",  date: "Y"});
    E3({ type: "only",  echartsObj: "E6",  date: "Y"});
}
site.onchange = function () {   //site change
    var val = $('input:radio[name="RadioB"]:checked').val();
    E1({ type: "only",  echartsObj: "E4",  date: val});
    E2({ type: "only",  echartsObj: "E5",  date: val});
    E3({ type: "only",  echartsObj: "E6",  date: val});
}
equipment.onchange = function () {   //equipment change
    var val = $('input:radio[name="RadioB"]:checked').val();
    E1({ type: "only",  echartsObj: "E4",  date: val});
    E2({ type: "only",  echartsObj: "E5",  date: val});
    E3({ type: "only",  echartsObj: "E6",  date: val});
}

