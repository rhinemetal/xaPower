/*!
 * @author Z.L
 * 设备监视
 * @date 2018.06.22
 */

var EquipmentMonitor = {

    API : function (n) {

      /**
       * URL demo:    equipmentMonitor.html?province=2&stationID=CA06ES06&modelNumber=ENN/HZX_02HLB01MT0002&equType=3
       * URL demo:    equipmentMonitor.html?province=35&stationID=CA06ES06&modelNumber=ENN/HZX_02HLB01MT0002&equType=3
       * province:    省ID
       * stationID:   站ID
       * modelNumber: 设备型号
       * equType:     设备类型
       */

        var urlStr;
        switch(n){
            case 1:
                // var urlStr = "http://10.4.78.24:9002/equmonitor/getProvince";
                var urlStr = "temp/getProvince.js";
                break;
            case 2:
                // var urlStr = "http://10.4.78.24:9002/equmonitor/getstation?provinceId=";
                var urlStr = "temp/getstation.js?provinceId=";
                break;
            case 3:
                // var urlStr = "http://10.4.78.24:9002/equmonitor/getEquipment?siteId=";
                var urlStr = "temp/getEquipment.js?siteId=";
                break;
            case 4:
                // var urlStr = "http://10.4.78.24:9002/equmonitor/getSlowData?";
                var urlStr = "temp/getSlowData.js?";
                break;
            case 5:
                // var urlStr = "http://10.4.78.24:9002/equmonitor/getFastData?";
                var urlStr = "temp/getFastData.js?";
                break;
            case 6:
                // var urlStr = "http://10.4.78.24:9002/equmonitor/getMonitor?";
                var urlStr = "temp/getMonitor1.js?";
                break;
        };
        return urlStr
    },


    getParamete: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null
    },


    getToday : function () {
        var T = new Date();
        var Y = T.getFullYear().toString();
        var M = T.getMonth() + 1;
        if (M < 10) {M = "0" + M}
        var D = T.getDate();
        var time = Y + "-" + M + "-" + D;
        return time;
    },


    renderDOM : function (obj, option) {
        var dom = document.getElementById(obj);
        var chart = echarts.init(dom);
        chart.setOption(option);
    },


    setOption : function (data, time, unit) {
    	return {
			color: ["#36CC6B"],
            tooltip : {
                trigger: 'axis',
                formatter: "{b} : {c}"
            },
			grid: {
				top: '16%',
				left: '2%',
				right: '2%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
                {
    				type: 'category',
    				boundaryGap: false,
                    show : false,
    				data: time
    			},
                {
                    type: 'category',
                    boundaryGap: false,
                    position: 'bottom',
                    axisPointer:{
                        show: false
                    },
                    data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '23:59']
                },
            ],
			yAxis: {
				type: 'value',
                name: unit,
				splitLine: {
					show: false
				}
			},
			series: [{
				data: data,
                showSymbol: false,
                hoverAnimation: false,
				type: 'line'
			}]
    	}
    },


    Ajax : function(url, callback, target){
    		var _target = target;
        $.ajax({
            type: "GET",
            url: url,
            data: {"v": new Date().getTime()},
            dataType: "json",
            success: function(data) {
              callback(data, _target);
            }
        });
    },


    provinceList: function(){
        this.Ajax( this.API(1), this.provinceListBind );
        this.stationList();
    },


    stationList: function(){
        this.Ajax( this.API(2) + this.getParamete("province"), this.stationListBind );
        this.equipmentList();
    },


    equipmentList: function(e){
        this.Ajax( this.API(3) + this.getParamete("stationID") , this.equipmentListBind );
    },


    setSlow: function () {
        this.Ajax( this.API(4) + "equipmentId=" + this.getParamete("modelNumber") + "&equType=" + this.getParamete("equType"), this.slowBind );
    },


    setFast: function () {
        this.Ajax( this.API(5) + "equipmentId=" + this.getParamete("modelNumber") + "&equType=" + this.getParamete("equType"), this.fastBind );
    },


    setEcharts: function (date, target) {
        this.Ajax( this.API(6) + "equipmentId=" + this.getParamete("modelNumber") + "&date=" + date , this.echartsBind, target);
    },


    provinceListBind: function(data) {
        if (data.status == "success"){
            $("#province option").remove();
            for (var i = 0; i < data.data.length; i++) {
                $("#province").append("<option value='"+data.data[i].provinceId+"'>"+data.data[i].provinceName+"</option>");
            }
	        $('#province').val(EquipmentMonitor.getParamete("province"));
            $('#province').on('change', function(){
                EquipmentMonitor.Ajax( EquipmentMonitor.API(2) + $(this).val(), EquipmentMonitor.stationListBind );
            });
        }
    },


    stationListBind: function(data) {
        if (data.status == "success"){
            $("#station option").remove();
            for (var i = 0; i < data.data.length; i++) {
                $("#station").append("<option value='"+data.data[i].siteId+"' data-tip='"+data.data[i].textTip+"'>"+data.data[i].siteName+"</option>");
            }
	        $('#station').val( EquipmentMonitor.getParamete("stationID") ).trigger('change');
            $("#stationTip").attr("title", $("#station").find("option:selected").attr("data-tip") );
			$('#station').change(function(){
				$("#stationTip").attr("title", $(this).find("option:selected").attr("data-tip") );
                EquipmentMonitor.Ajax( EquipmentMonitor.API(3) + $(this).val(), EquipmentMonitor.equipmentListBind );
			});
        }
    },


    equipmentListBind: function(data) {
        if (data.status == "success"){
            $("#equipment option").remove();
            for (var i = 0; i < data.data.length; i++) {
                $("#equipment").append("<option value='"+data.data[i].modelNumber+"' data-tip='"+data.data[i].modelNumber+"' data-type='"+data.data[i].equType+"'>"+data.data[i].equipmentName+"</option>");
            }
	        $('#equipment').val(EquipmentMonitor.getParamete("modelNumber"));
            $("#equipmentTip").attr("title", $("#equipment").find("option:selected").attr("data-tip") );
			$('#equipment').change(function(){
				//页面已跳转，这个可以不使用 $("#equipmentTip").attr("title", $(this).find("option:selected").attr("data-tip") );
                EquipmentMonitor.query();
			});
        }
    },


    slowBind: function (data) {
        if (data.status == "success"){
            $("#slow_attributeName0").text(data.data[0].attributeName);
            $("#slow_attributeName1").text(data.data[1].attributeName);
            $("#slow_attributeValue0").text(data.data[0].attributeValue);
            $("#slow_attributeValue1").text(data.data[1].attributeValue);
        }
    },


    fastBind: function (data) {
        if (data.status == "success"){
            if (data.data.baseData) {
                $("#fast_attributeName0").text(data.data.baseData[0].attributeName);
                $("#fast_attributeName1").text(data.data.baseData[1].attributeName);
                $("#fast_attributeValue0").text(data.data.baseData[0].attributeValue);
                $("#fast_attributeValue1").text(data.data.baseData[1].attributeValue);
            }


            if (EquipmentMonitor.getParamete("equType") == 1) {
                $("#state").html("运行状态：<span>"+ data.data.state.stateText +"</span>　　设备总运行时长：<span>"+ data.data.state.stateTime +"</span>");
                $(".pic").attr("src", "./images/equipmentA.png");
            };
            if (EquipmentMonitor.getParamete("equType") == 2) {
                $("#state").html("运行状态：<span>"+ data.data.state.stateText +"</span>");
                $(".fast").hide();
                $(".slow").show();
                $(".pic").attr("src", "./images/equipmentB.png");
                $(".runCon p").text("运行状态参数（一级）");
                $(".sysCon p").text("运行状态参数（二级）");

                //类型为2时的基础参数
                var _baseStr = [];
                for (var i_baseStr = 0; i_baseStr < data.data.baseData.length; i_baseStr++) {
                   _baseStr.push("<span>"+ data.data.baseData[i_baseStr].attributeName +"</span><em>"+ data.data.baseData[i_baseStr].attributeValue +"</em>");
                }
                $(".base").html( _baseStr.join('') );
           };
            if (EquipmentMonitor.getParamete("equType") == 3) {
                $("#state").html("运行状态：<span>"+ data.data.state.stateText +"</span>　　设备总运行时长：<span>"+ data.data.state.stateTime +"</span>");
                $(".slow, .runCon, .sysCon").hide();
                $(".baseCon ul").css({"padding-top":"100px"});
                $(".pic").attr("src", "./images/equipmentC.png");
            };

            //运行参数
            if (data.data.runData) {
                var _runStr = [];
                for (var i_runStr = 0; i_runStr < data.data.runData.length; i_runStr++) {
                    _runStr.push('<li><span>'+ data.data.runData[i_runStr].attributeName +'</span><em>'+ data.data.runData[i_runStr].attributeValue +'</em></li>');
                }
                $("#run, #run1").html( _runStr.join('') );
            }

            //系统参数
            if (data.data.sysData) {
                var _sysStr = [];
                for (var i_sysStr = 0; i_sysStr < data.data.sysData.length; i_sysStr++) {
                    _sysStr.push('<li><span>'+ data.data.sysData[i_sysStr].attributeName +'</span><em>'+ data.data.sysData[i_sysStr].attributeValue +'</em></li>');
                }
                $("#sys").html( _sysStr.join('') );
            }

            //发电机
            if (data.data.generatorData) {
                var _generatorStr = [];
                for (var i_g = 0; i_g < data.data.generatorData.length; i_g++) {
                    _generatorStr.push('<li><div class="img"></div><span>'+ data.data.generatorData[i_g].attributeName +'</span><em>'+ data.data.generatorData[i_g].attributeValue +'</em></li>');
                }
                $("#generator").html( _generatorStr.join('') );
            }

        }
    },


    echartsBind: function (data, target) {
        if (data.status == "success"){
        	var color = ["#36CC6B","#6EC3EE"];
        	//产耗能监测
        	if (target.ec == true) {
	        	var ecs = $("#EnergyConsumptionSelect");
	        	ecs.empty();
                var option_ec_0 = EquipmentMonitor.setOption(
                    data.data.energyConsumption[$("#EnergyConsumptionVal").val()].series,
                    data.data.energyConsumption[$("#EnergyConsumptionVal").val()].dataTime,
                    data.data.energyConsumption[$("#EnergyConsumptionVal").val()].unit
                );
                option_ec_0.color = [color[0]];
                EquipmentMonitor.renderDOM("ebox01", option_ec_0);
                for (var i = 0; i < data.data.energyConsumption.length; i++) {
                    ecs.append("<option value='" + i + "'>" + data.data.energyConsumption[i].attributeName + "</option>");
                };
                $("#EnergyConsumptionSelect option[value=" + $("#EnergyConsumptionVal").val() +"]").attr("selected", "selected");
				ecs.change(function(){
                    $("#EnergyConsumptionVal").val($("#EnergyConsumptionSelect").val());
					var option_ec = EquipmentMonitor.setOption(
                        data.data.energyConsumption[$("#EnergyConsumptionVal").val()].series,
                        data.data.energyConsumption[$("#EnergyConsumptionVal").val()].dataTime,
                        data.data.energyConsumption[$("#EnergyConsumptionVal").val()].unit
                    );
                    option_ec.color =[color[0]];
					EquipmentMonitor.renderDOM("ebox01", option_ec);
				});
        	}


			//运行参数监测
        	if (target.run == true) {
	        	var runs = $("#runSelect");
	        	runs.empty();
	        	var option_run_0 = EquipmentMonitor.setOption(
                    data.data.run[$("#runVal").val()].series,
                    data.data.run[$("#runVal").val()].dataTime,
                    data.data.run[$("#runVal").val()].unit
                );
	        	option_run_0.color = [color[1]];
				EquipmentMonitor.renderDOM("ebox02", option_run_0);
	            for (var j = 0; j < data.data.run.length; j++) {
	            	runs.append("<option value='" + j + "'>" + data.data.run[j].attributeName + "</option>");
	            }
                $("#runSelect option[value=" + $("#runVal").val() +"]").attr("selected", "selected");
				runs.change(function(){
                    $("#runVal").val($("#runSelect").val());
					var option_run = EquipmentMonitor.setOption(
                        data.data.run[$("#runVal").val()].series,
                        data.data.run[$("#runVal").val()].dataTime,
                        data.data.run[$("#runVal").val()].unit
                    );
					option_run.color = [color[1]];
					EquipmentMonitor.renderDOM("ebox02", option_run);
				});
			}
        }
    },


    onload: function () {
        $(".content").addClass("equType"+ EquipmentMonitor.getParamete("equType"));
        $('#station').select2();
        $('.date').val(EquipmentMonitor.getToday());
		$('.date').bind('click', function(){
			WdatePicker({
				dateFmt: 'yyyy-MM-dd',
				onpicked: function(){
					var date = $(this).val();
					var target = $(this).attr("data-target");
					if (target == "ec") {
						EquipmentMonitor.setEcharts(date, {ec: true, run: false});
					}
					if (target == "run") {
						EquipmentMonitor.setEcharts(date, {ec: false, run: true});
					}
				}
			});
		});
        EquipmentMonitor.provinceList();
        EquipmentMonitor.setSlow();
        EquipmentMonitor.setFast();
        EquipmentMonitor.setEcharts(EquipmentMonitor.getToday(), {ec: true, run: true});
        setInterval('EquipmentMonitor.setFast()',10000)
        setInterval('EquipmentMonitor.setSlow()',60000)
    },


    query: function () {
    	var url = "?province=" + $('#province').val();
    	url = url + "&stationID=" + $('#station').val();
    	url = url + "&modelNumber=" + $('#equipment').val();
    	url = url + "&equType=" + $('#equipment').find("option:selected").attr("data-type");
    	// console.log(url);
    	location.href = url;
    }


};

EquipmentMonitor.onload();
