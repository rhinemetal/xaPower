1.省：( http://localhost/api/getProvince)  http://10.4.69.178:8085/equmonitor/getProvince
{
  "msg": "请求成功",
  "data": [
    {
        "provinceName": "北京",
        "provinceId"  : 1
    },
    {
        "provinceName": "上海",
        "provinceId"  : 2
    },
    {
        "provinceName": "上海",
        "provinceId"  : 3
    }
  ],
  "status": "success"
}


2.站名：( http://localhost/api/getSite?provinceId=参数 )  http://10.4.69.178:8085/equmonitor/getstation?provinceId=2
{
  "msg": "请求成功",
  "data": [
        {
            "siteName"   : "北京市兰溪站1",
            "siteId"     : 11,
            "textTip"    : "微燃机+余热锅炉"
        },
        {
            "siteName"   : "北京兰溪站2",
            "siteId"     : 22,
            "textTip"    : "微燃机+余热锅炉"
        },
        {
            "siteName"   : "北京兰溪站3",
            "siteId"     : 33,
            "textTip"    : "微燃机+余热锅炉"
        }
  ],
  "status": "success"
}


3.设备：( http://localhost/api/getEquipment?siteId=参数 )  http://10.4.69.178:8085/equmonitor/getEquipment?siteId=CA06ES061
{
  "msg": "请求成功",
  "data": [
        {
            "equipmentName" : "微燃机",
            "modelNumber": "SEDRFTBK1"
        },
        {
            "siteName": "内燃机",
            "modelNumber": "SEDRFTBK2"
        },
        {
            "siteName": "蒸汽机",
            "modelNumber": "SEDRFTBK3"
        }
  ],
  "status": "success"
}


4.机组负荷率、发电效率: ( http://localhost/api/getSlowData?equipmentId=参数, 一分钟刷新 )  http://10.4.69.178:8085/equmonitor/getSlowData?equipmentId=333&equType=2
{
  "msg": "请求成功",
  "data":[
        {
            "attributeName": "机组负荷率",
            "attributeValue": "23.98%"
        },
        {
            "attributeName": "发电效率",
            "attributeValue": "23.45%"
        }
  ], 
  "status": "success"
}


5.其它属性数据: ( http://localhost/api/getFastData?equipmentId=参数, 10秒钟刷新 )  http://10.4.69.178:8085/equmonitor/getFastData?equipmentId=333&equType=1
{
  "msg": "请求成功",
  "state": {
      "stateText": "正常运行",
      "statetime": "23h",
  },
  "baseData":[
        {
            "attributeName": "发电功率",
            "attributeValue": "2340.34kW"
        },
        {
            "attributeName": "天然气耗量",
            "attributeValue": "29.34Nm³/h"
        }
  ], 
  "runData":[
        {
            "attributeName": "进气温度（℃）",
            "attributeValue": "3,888.80"
        },
        {
            "attributeName": "进气温度（℃）",
            "attributeValue": "3,888.80"
        },
        {
            "attributeName": "进气温度（℃）",
            "attributeValue": "3,888.80"
        }
  ],
  "sysData":[
        {
            "attributeName": "前轴承油压（bar）",
            "attributeValue": "3,888.80"
        },
        {
            "attributeName": "前轴承油压（bar）",
            "attributeValue": "3,888.80"
        },
        {
            "attributeName": "前轴承油压（bar）",
            "attributeValue": "3,888.80"
        }
  ],  
  "generatorData":[
        {
            "attributeName": "发电机电压（V）",
            "attributeValue": "3,888.80"
        },
        {
            "attributeName": "发电机电流（A）",
            "attributeValue": "3,888.80"
        },
        {
            "attributeName": "发电频率（Hz）",
            "attributeValue": "3,888.80"
        }
  ],  
  "status": "success"
}


6.产耗能监测\运行参数监测：( http://localhost/api/getMonitor?equipmentId=参数&date=2018-05-05 )  http://10.4.69.178:8085/equmonitor/getMonitor?equipmentId=we&date=2017-03-26
{
  "msg": "请求成功",
  "data": {
      "EnergyConsumption": [
            {
                "attributeName" : "发电功率1",
                "series" : [820, 932, 901, 934, 1290, 1330, 1320]
            },
            {
                "attributeName" : "发电功率2",
                "series" : [820, 932, 901, 934, 1290, 1330, 600]
            },
            {
                "attributeName" : "发电功率",
                "series" : [820, 932, 901, 934, 1290, 1330, 200]
            }
      ],
      "run":[
            {
                "attributeName" : "发电功率1",
                "series" : [820, 932, 901, 934, 1290, 1330, 400]
            },
            {
                "attributeName" : "压气机出口压力",
                "series" : [820, 932, 901, 934, 1290, 1330, 800]
            },
            {
                "attributeName" : "发电功率2",
                "series" : [820, 932, 901, 934, 1290, 1330, 700]
            }
      ]
  },
  "status": "success"
}


