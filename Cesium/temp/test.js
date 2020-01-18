var build_one   = "这是1号楼....学生宿舍楼";
var build_two   = "这是2号楼......餐厅、员工宿舍";
var build_three = "虚拟现实研究院--虚拟现实研究院依托所两所国家级重点实验室——北航虚拟现实技术与系统国家重点实验室及“互联网＋”领域全国唯一一个虚拟现实/增强现实技术与应用国家工程实验室，" +
    "重点围绕虚拟现实+教育、虚拟现实+智慧城市、虚拟现实+文化旅游等领域开展研究及开发工作；" +

    "精密仪器与光电研究院聚焦三维视觉测量系统、智能制造装备、微小型姿态测量装置等研究方向，进行创新性技术研究和技术产业化应用研究" ;

var build_four  = "军民融合研究院依托北航一流的空天信息学科资源和新一代空天信息技术产业化科研平台，重点在无人机系统应用、" +
    "卫星系统应用、空天地海大数据应用及航空航天文化教育培训等领域开展科学研究、人才培养和科技成果转化工作。";

var build_five  =  "微电子研究院已建成500平米千级超净实验室与500平米传感器交叉学科实验室，配备世界领先的微纳电子传感器研发设备和生物医学、光学、" +
    "电子学基础实验设备，开展面向传感器研发的微纳加工技术研究及综合测试等能力." ;

var build_six   =   "新材料研究院依托北航徐惠彬院士、英国帝国理工林建国院士、上海交大丁文江院士等材料领域顶尖团队，在研究院和崂山区政府大力支持下，" +
    "与孵化企业共同创建了汽车轻量化工程中心，已建成一条完整的熔炼、铸造、热处理、机加工、检测中试线，形成研发与中试能力." ;

var floor_7 = "./Video/video.MP4";

// var three_3;
var three_3 ={
    name:"3#",
    position:[
        new Cesium.Cartesian3(-2616283.0304040015,  4440291.231606548,  3744994.942467528),
        new Cesium.Cartesian3(-2616292.368096401,  4440306.571829809, 3744970.3960967697),
        new Cesium.Cartesian3(-2616336.5444647837, 4440281.29070909,  3744969.514537107),
        new Cesium.Cartesian3( -2616349.5549550382, 4440240.109561059,3745008.985652393),
        new Cesium.Cartesian3(-2616322.03683423, 4440246.3424316095,  3745020.7411412294),
        new Cesium.Cartesian3(-2616307.1668043644, 4440275.093563626, 3744997.199497464)
    ]
};
var building_1 ={
    name:"1#",
    position:[
        new Cesium.Cartesian3( -2616278.4929233436,4440195.4898719,  3745110.845386404),
        new Cesium.Cartesian3( -2616282.837580834, 4440210.078498245, 3745090.650049722),
        new Cesium.Cartesian3(-2616344.994098353, 4440174.348209929,  3745089.596663513),
        new Cesium.Cartesian3(  -2616369.340778027, 4440170.352291228,3745077.40751253353),
        new Cesium.Cartesian3(-2616374.504174395, 4440151.62275109,  3745095.8814578266),
        new Cesium.Cartesian3(-2616342.833465587, 4440155.843823038, 3745113.10236261),
        new Cesium.Cartesian3(-2616277.2835122626, 4440194.285996903,3745113.10236261)
    ]
};
var building_2 ={
    name:"2#",
    position:[
        new Cesium.Cartesian3( -2616275.951973913, 4440240.254236504,  3745059.890711316),
        new Cesium.Cartesian3(  -2616283.3963595717, 4440252.713483673, 3745040.0517257703),
        new Cesium.Cartesian3(  -2616360.340150568, 4440208.721573618,3745038.46683172),
        new Cesium.Cartesian3(-2616361.9342468483, 4440190.999453751,  3745058.231640355),
        new Cesium.Cartesian3(  -2616362.3721449, 4440190.051055799, 3745059.044670875),
        new Cesium.Cartesian3( -2616338.4217101866, 4440194.619834245,  3745070.28420714),
        new Cesium.Cartesian3(-2616336.3350242362,  4440202.103837242, 3745062.918497309),
        new Cesium.Cartesian3(-2616275.292188612,  4440238.770470061,3745062.095962033)
    ]
};
var building_4 ={
    name:"4#",
    position:[
        new Cesium.Cartesian3(  -2616198.103981536, 4440331.120629203,  3745006.8961560233),
        new Cesium.Cartesian3(  -2616195.6042502816, 4440352.55694901,3744983.384409437),
        new Cesium.Cartesian3(  -2616229.2790340357,4440345.094155659,3744968.806201712),
        new Cesium.Cartesian3( -2616265.4334670263, 4440321.941816104,  3744970.985170938),
        new Cesium.Cartesian3(  -2616255.617378165,  4440306.326694966, 3744996.1872588885),
        new Cesium.Cartesian3( -2616223.1939108735, 4440325.226367624, 3744996.4278375152),

    ]
};
var building_5 ={
    name:"5#",
    position:[
        new Cesium.Cartesian3(   -2616129.1734192125, 4440367.520877004,  3745011.857052734),
        new Cesium.Cartesian3(  -2616176.113623069, 4440356.063765363, 3744992.778961084),
        new Cesium.Cartesian3(  -2616179.65587306,4440335.153140583,3745014.948152318),
        new Cesium.Cartesian3(-2616133.661072478,4440346.036896568,  3745034.045493724),
    ]
};
var building_6 ={
    name:"6#",
    position:[
        new Cesium.Cartesian3(  -2616117.7727815267, 4440372.097606606,  3745014.377601054),
        new Cesium.Cartesian3(  -2616125.0120637086,4440344.176322924,  3745042.238129963),
        new Cesium.Cartesian3(   -2616074.2910778187,4440356.854144505,  3745062.5010642735),
        new Cesium.Cartesian3(  -2616069.273611013,4440382.399890818, 3745035.8966039424),
    ]
};


//园区路径文字路径导航
var path = function (text1,text2,text) {

    if(text1 == "" && text2 ==""){
        text.value +=  "请先输入起始--终点位置";
    } else if(text1 == "3#" && text2 =="4#"){
        text.value = "";
        // viewer.entities.removeById("building");
        // viewer.entities.removeById("buildingY");
        viewer.entities.removeAll();
        text.value +=  "从3#门口，向西步行80米，到达4#号楼";
        createPolygonY(three_3);
        createPolygon(building_4);
    }else if (text1 == "4#" && text2 =="3#") {
        viewer.entities.removeAll();
        // viewer.entities.removeById("building");
        // viewer.entities.removeById("buildingY");
        text.value = "";
        text.value +=  "从4#门口，向东步行80米，到达3#号楼";
        createPolygonY(building_4);
        createPolygon(three_3);
    }else if(text1 == "2#" && text2 =="4#"){
        text.value = "";
        viewer.entities.removeAll();
        // viewer.entities.removeById("building");
        // viewer.entities.removeById("buildingY");
        text.value +=  "从2#门口，向南步行30米，到达3#号楼，接着向西步行80米，到达4#楼";
        createPolygonY(building_2);
        createPolygon(building_4);
    }else if (text1 == "4#" && text2 =="2#") {
        text.value = "";
        viewer.entities.removeAll();
        // viewer.entities.removeById("building");
        // viewer.entities.removeById("buildingY");
        text.value +=  "从4#门口，向东步行80米，到达3#号楼，然后向北步行50米，到达2号楼";
        createPolygonY(building_4);
        createPolygon(building_2);
    }else if(text1 == "2#" && text2 =="5#"){
        text.value = "";
        viewer.entities.removeAll();
        // viewer.entities.removeById("building");
        // viewer.entities.removeById("buildingY");
        text.value +=  "从2#门口，向南步行30米，到达3#号楼，从3#楼向西步行100米，到达5#楼";
        createPolygonY(building_2);
        createPolygon(building_5);
    }else if (text1 == "5#" && text2 =="2#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从5#门口，向东步行130米，到达3#号楼，从3#楼向北步行50米，到达2#楼";
        createPolygonY(building_5);
        createPolygon(building_2);
    }else if(text1 == "1#" && text2 =="3#"){
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从1#门口，向西步行80米，到达操场，然后继续向东南方向步行100米，到达3#楼";
        createPolygonY(building_1);
        createPolygon(three_3);
    }else if (text1 == "3#" && text2 =="1#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从3#门口，向西北步行80米，到达操场，然后继续向东南方向步行100米，到达1#楼";
        createPolygonY(three_3);
        createPolygon(building_1);
    }else if (text1 == "1#" && text2 =="4#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从1#门口，向西步行80米，到达操场，然后继续向南步行100米，到达4#楼";
        createPolygonY(building_1);
        createPolygon(building_4);
    }else if (text1 == "4#" && text2 =="1#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从4#门口，向北步行80米，到达操场，然后继续向东南方向步行100米，到达1#楼";
        createPolygonY(building_4);
        createPolygon(building_1);
    }else if (text1 == "3#" && text2 =="5#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从3#门口，向西步行180米，到达5#楼";
        createPolygonY(three_3);
        createPolygon(building_5);
    }else if (text1 == "5#" && text2 =="3#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从5#门口，向东步行180米，到达3#楼";
        createPolygonY(building_5);
        createPolygon(three_3);
    }else if (text1 == "5#" && text2 =="1#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从5#门口，向东步行80米，到达4#楼，然后向北步行80米，到达操场，最后向东北步行180米到达目的地";
        createPolygonY(building_5);
        createPolygon(building_1);
    }else if (text1 == "1#" && text2 =="5#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从1#门口，向西南步行180米，到达操场，然后继续向南步行80米，到达4#门口，最后向西步行50米到达5#门口";
        createPolygonY(building_1);
        createPolygon(building_5);
    }
    else if (text1 == "1#" && text2 =="6#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从1#门口，向西南步行240米，到达网球场，然后继续向西步行80米，到达4#门口，最后向西步行50米到达5#门口";
        createPolygonY(building_1);
        createPolygon(building_6);
    }else if (text1 == "6#" && text2 =="1#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从6#门口，向东步行240米，到达操场，然后继续向北步行80米，到达4#门口，最后向西步行50米到达5#门口";
        createPolygonY(building_6);
        createPolygon(building_1);
    }

    else if (text1 == "6#" && text2 =="3#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从6#门口，向东步行280米，到达3#号楼门口";
        createPolygonY(building_6);
        createPolygon(three_3);
    }else if (text1 == "3#" && text2 =="6#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从3#门口，向西步行280米，到达6#号楼门口";
        createPolygonY(three_3);
        createPolygon(building_6);
    }

    else if (text1 == "6#" && text2 =="2#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从6#门口，向东步行280米，到达3#号楼,然后向北步行80米，到达2#门口";
        createPolygonY(building_6);
        createPolygon(building_2);
    }else if (text1 == "2#" && text2 =="6#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从2#门口，向南步行80米，到达3#号楼门口，然后继续向西步行280米，到达2#号楼门口";
        createPolygonY(building_2);
        createPolygon(building_6);
    }

    else if (text1 == "6#" && text2 =="4#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从6#门口，向东步行200米，到达4#门口";
        createPolygonY(building_6);
        createPolygon(building_4);
    }else if (text1 == "4#" && text2 =="6#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从4#门口，向西步行200米，到达6#号楼门口";
        createPolygonY(building_4);
        createPolygon(building_6);
    }

    else if (text1 == "1#" && text2 =="2#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从1#门口，向南步行30米，到达2#北门门口";
        createPolygonY(building_1);
        createPolygon(building_2);
    }else if (text1 == "2#" && text2 =="1#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从2#门口，向北步行30米，到达1#号楼门口";
        createPolygonY(building_2);
        createPolygon(building_1);
    }


    else if (text1 == "2#" && text2 =="3#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从2#门口，向南步行50米，到达3#门口";
        createPolygonY(building_2);
        createPolygon(three_3);
    }else if (text1 == "3#" && text2 =="2#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从3#门口，向北步行50米，到达2#号楼门口";
        createPolygonY(three_3);
        createPolygon(building_2);
    }

    else if (text1 == "4#" && text2 =="5#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从4#门口，向西步行50米，到达5#门口";
        createPolygonY(building_4);
        createPolygon(building_5);
    }else if (text1 == "5#" && text2 =="4#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从3#门口，向北步行50米，到达2#号楼门口";
        createPolygonY(building_5);
        createPolygon(building_4);
    }

    else if (text1 == "5#" && text2 =="6#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从5#门口，向西步行50米，到达6#门口";
        createPolygonY(building_5);
        createPolygon(building_6);
    }else if (text1 == "6#" && text2 =="5#") {
        text.value = "";
        viewer.entities.removeAll();
        text.value +=  "从6#门口，向东步行50米，到达5#号楼门口";
        createPolygonY(building_6);
        createPolygon(building_5);
    }

    else {
        text.value = "";
        text.value +=  "输入错误，请重新输入";
    }

}

//鼠标右击弹窗信息实践
var bh1 = [
    {
        id: "1",
        light:false,
    },
    {
        text: "编辑颜色",
        type: "editColor",
    },
    {
        text: "调节大小",
        type: "editSize",
    },
    {
        text: "高亮显示",
        type: "highlight",
    },
    {
        text: "关闭高亮",
        type: "closehighlight",
    },
    {
        text: "删除对象",
        type: "cesiumObj",
    },
    {
        text: "取消",
        type: "cancle",
    },

];
var bh2 = [
    {
        id: "2",
        light:false,
    },
    {
        text: "编辑颜色",
        type: "editColor",
    },
    {
        text: "调节大小",
        type: "editSize",
    },
    {
        text: "高亮显示",
        type: "highlight",
    },
    {
        text: "关闭高亮",
        type: "closehighlight",
    },

    {
        text: "一层",
        type: "1_floor",
    },{
        text: "二层",
        type: "2_floor",
    },{
        text: "三    层",
        type: "3_floor",
    },{
        text: "四    层",
        type: "4_floor",
    },{
        text: "五    层",
        type: "5_floor",
    },{
        text: "六    层",
        type: "6_floor",
    },{
        text: "七    层",
        type: "7_floor",
    },

    {
        text: "删除对象",
        type: "cesiumObj",
    },
    {
        text: "取消",
        type: "cancle",
    },
];
var bh3 = [
    {
        id: "3",
        light:false,
    },
    {
        text: "编辑颜色",
        type: "editColor",
    },
    {
        text: "调节大小",
        type: "editSize",
    },
    {
        text: "高亮显示",
        type: "highlight",
    },
    {
        text: "关闭高亮",
        type: "closehighlight",
    },

    {
        text: "一层",
        type: "1_floor",
    },{
        text: "二层",
        type: "2_floor",
    },{
        text: "三    层",
        type: "3_floor",
    },{
        text: "四    层",
        type: "4_floor",
    },{
        text: "五    层",
        type: "5_floor",
    },{
        text: "六    层",
        type: "6_floor",
    },{
        text: "七    层",
        type: "7_floor",
    },

    {
        text: "删除对象",
        type: "cesiumObj",
    },
    {
        text: "取消",
        type: "cancle",
    },
];


var bh4 = [
    {
        id: "4",
        light:false,
    },
    {
        text: "编辑颜色",
        type: "editColor",
    },
    {
        text: "调节大小",
        type: "editSize",
    },
    {
        text: "高亮显示",
        type: "highlight",
    },
    {
        text: "关闭高亮",
        type: "closehighlight",
    },

    {
        text: "一层",
        type: "1_floor",
    },{
        text: "二层",
        type: "2_floor",
    },{
        text: "三    层",
        type: "3_floor",
    },{
        text: "四    层",
        type: "4_floor",
    },{
        text: "五    层",
        type: "5_floor",
    },{
        text: "六    层",
        type: "6_floor",
    },{
        text: "七    层",
        type: "7_floor",
    },

    {
        text: "删除对象",
        type: "cesiumObj",
    },
    {
        text: "取消",
        type: "cancle",
    },
];
var bh5 = [
    {
        id: "5",
        light:false,
    },
    {
        text: "编辑颜色",
        type: "editColor",
    },
    {
        text: "调节大小",
        type: "editSize",
    },
    {
        text: "高亮显示",
        type: "highlight",
    },
    {
        text: "关闭高亮",
        type: "closehighlight",
    },

    {
        text: "一层",
        type: "1_floor",
    },{
        text: "二层",
        type: "2_floor",
    },{
        text: "三    层",
        type: "3_floor",
    },{
        text: "四    层",
        type: "4_floor",
    },{
        text: "五    层",
        type: "5_floor",
    },{
        text: "六    层",
        type: "6_floor",
    },{
        text: "七    层",
        type: "7_floor",
    },

    {
        text: "删除对象",
        type: "cesiumObj",
    },
    {
        text: "取消",
        type: "cancle",
    },
];
var bh6 = [
    {
        id: "6",
        light:false,
    },
    {
        text: "编辑颜色",
        type: "editColor",
    },
    {
        text: "调节大小",
        type: "editSize",
    },
    {
        text: "高亮显示",
        type: "highlight",
    },
    {
        text: "关闭高亮",
        type: "closehighlight",
    },

    {
        text: "一层",
        type: "1_floor",
    },{
        text: "二层",
        type: "2_floor",
    },{
        text: "三    层",
        type: "3_floor",
    },{
        text: "四    层",
        type: "4_floor",
    },{
        text: "五    层",
        type: "5_floor",
    },{
        text: "六    层",
        type: "6_floor",
    },{
        text: "七    层",
        type: "7_floor",
    },

    {
        text: "删除对象",
        type: "cesiumObj",
    },
    {
        text: "取消",
        type: "cancle",
    },
];



var czml = [
    {
        "id":"document",
        "version":"1.0"
    },
    {
        "id":"",
        "availability":"2012-08-04T16:00:00Z/2012-08-04T16:04:54.9962195740191Z",
        "label":{
            "fillColor":[
                {
                    "interval":"2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                    "rgba":[
                        255,255,0,255
                    ]
                }
            ],
            "font":"bold 10pt Segoe UI Semibold",
            // "horizontalOrigin":"CENTER",
            "outlineColor":{
                "rgba":[
                    0,0,0,255
                ]
            },
            "pixelOffset":{
                "cartesian2":[
                    0.0,20.0
                ]
            },
            "scale":1.0,
            "show":[
                {
                    "interval":"2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",  //定义时间间隔
                    "boolean":true
                }
            ],
            // "style":"FILL",
            // "verticalOrigin":"CENTER"
        },
        "model":{
            "gltf":"SampleData/fire/xiaofangqicai/FireCar/Firetruck_JP18.gltf",
            // "minimumPixelSize":100,
            "maximumScale":2   //最大缩放倍数
        },
        "orientation" : {          //这可以控制实时改变方向，使得行走方向和路线方向一致
            "velocityReference": "#position"
        },
        "viewFrom": {
            "cartesian": [ -2080, -1715, 779 ]
        },
        "properties" : {
            "fuel_remaining" : {
                "epoch":"2012-08-04T16:00:00Z",
                "number": [
                    0, 22.5,
                    1500, 21.2
                ]
            }
        },
        "path":{
            "material":{
                "solidColor":{
                    "color":{
                        "interval":"2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                        "rgba":[
                            255,255,0,255
                        ]
                    }
                }
            },
            "width":[
                {
                    "interval":"2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                    "number":5.0
                }
            ],
            "show":[
                {
                    "interval":"2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                    "boolean":true
                }
            ]
        },
        "position":{
            "interpolationAlgorithm":"LAGRANGE",  //插值算法，此处为线性插值
            "interpolationDegree":1,            //插值算法的次数
            "epoch":"2012-08-04T16:00:00Z",  //epoch：表示时间的方法
            "cartographicDegrees":[
                0,120.31681149588947,36.06409520677735,40.72081407529729,
                10,120.31693280055144,36.064047215823926,41.3700960754782,
                20,120.3171411463128,36.06399006107798,42.58599766259917,
                30,120.31748799695052,36.06390740836271,44.84169003881721,
                40,120.31777406454765,36.06385689428787,46.61846467051051,
                50,120.3180525742223,36.06380132564934,48.38284493429874,
                60,120.31853944670036,36.063708656569084,51.28828248498913,
                70,120.3187428702371,36.06370827801603,52.38373045885928,
                80,120.31879046743109,36.06381213840397,53.25003755782413,
                90,120.31887171298982,36.06414643281027,56.14875043726292,
                100,120.3192286434945,36.06426123575461,57.71087243422107
            ]
        }
    }
];
