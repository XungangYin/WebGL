Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMTc3NjhkOC0xYmExLTQwOTYtYTYwZS05YzQ4YzNhZWVhM2QiLCJpZCI6NTkwNywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0NDU5NTA4Nn0.-4tFtV4jM36IJTT7s8S1VrioG-hZSA9Wf9eKtR-kS7k";

var viewer = new Cesium.Viewer("cesiumContainer",{
    shouldAnimate : true  //开启动画循环
});
viewer._cesiumWidget._creditContainer.style.display = "none";

var entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(100,100,0),
    ellipse: {
        semiMinorAxis:250000,
        semiMajorAxis:400000,
        material : Cesium.Color.BLUE.withAlpha(0.5),
       // material : "SampleData/fire.png",  //直接贴图片
        outline:true,
        fill:false,
        outlineColor:Cesium.Color.YELLOW,
        outlineWidth:3,

    }
});

var ellipse = entity.ellipse;
// ellipse.fill = false;
// ellipse.outline = true;
// ellipse.outlineColor = Cesium.Color.YELLOW;
// ellipse.outlineWidth = 2.0;

var entity2 = viewer.entities.add({
    name:"椭圆",
    position: Cesium.Cartesian3.fromDegrees(100,100,0),
    ellipse: {
        semiMinorAxis:250000,
        semiMajorAxis:400000,
        material : Cesium.Color.BLUE.withAlpha(0.5),
        // material : "SampleData/fire.png",  //直接贴图片
        outline:false,
        fill:true,
        outlineColor:Cesium.Color.YELLOW,
        height:30000,
       // extrudeHeight:40000

    }
});

var heading = Cesium.Math.toRadians(90);
var pitch = Cesium.Math.toRadians(-60);

/*
viewer.zoomTo(entity2,new Cesium.HeadingPitchRange(heading,pitch));  //以特定的角度去zoomTo

viewer.flyTo(entity2).then(function(result){  //相机飞行到entity2,然后执行then函数的内容 result是bool型
    if (result) {
        viewer.selectedEntity = entity2;
    }
});

entity2.position = Cesium.Cartesian3.fromDegrees(-107.724, 42.68);
//viewer.trackedEntity = entity2;   //相机追随
*/

var heading = Cesium.Math.toRadians(45.0);
var pitch = Cesium.Math.toRadians(90.0);
var roll = Cesium.Math.toRadians(0.0);
var position  =Cesium.Cartesian3.fromDegrees(120,100,100);
var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(heading, pitch, roll));

var entity3 = viewer.entities.add({
    name:"gltf动画",
    position: position,
   // orientation:orientation,
    model:{
        // uri:"SampleData/models/GroundVehicle/GroundVehicle.glb" //ok
        // uri:"SampleData/gltf/sene_texture_z.gltf" //ok
        // uri:"SampleData/gltf/aaajpg_out/aaajpg.gltf"  //ok
       // uri:"SampleData/gltf/_out/man_all_action.gltf"  //ok
        uri:"SampleData/gltf/boy_action_jpg_out/boy_action_jpg.gltf"  //ok
        //uri:"SampleData/OBJ_JPG/tileset.json"  //ok


    }
});

viewer.zoomTo(entity3);







//当点击entities元素时,显示如下信息.viewer的infoBox属性
entity2.description = '\
<img\
  width="50%"\
  style="float:left; margin: 0 1em 1em 0;"\
  src="//cesiumjs.org/tutorials/Visualizing-Spatial-Data/images/Flag_of_Wyoming.svg"/>\
<p>\
  Wyoming is a state in the mountain region of the Western \
  United States.\
</p>\
<p>\
  Wyoming is the 10th most extensive, but the least populous \
  and the second least densely populated of the 50 United \
  States. The western two thirds of the state is covered mostly \
  with the mountain ranges and rangelands in the foothills of \
  the eastern Rocky Mountains, while the eastern third of the \
  state is high elevation prairie known as the High Plains. \
  Cheyenne is the capital and the most populous city in Wyoming, \
  with a population estimate of 62,448 in 2013.\
</p>\
<p>\
  Source: \
  <a style="color: WHITE"\
    target="_blank"\
    href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>\
</p>';


/**
 * 返回对应窗口位置最上面一个Entity 如果该位置没有对象那么返回undefined
 * @param {Cartesian2} windowPosition 窗口坐标
 * @returns {Entity} 返回值
 */
function pickEntity(viewer, windowPosition) {
    var picked = viewer.scene.pick(windowPosition);
    if (defined(picked)) {
        var id = Cesium.defaultValue(picked.id, picked.primitive.id);
        if (id instanceof Cesium.Entity) {
            return id;
        }
    }
    return undefined;
};

/**
 *返回对应窗口位置所有Entity的列表 如果该位置没有对象那么返回undefined
 * 返回值按可视化顺序从前到后存储在数组里
 *
 * @param {Cartesian2} windowPosition 窗口位置
 * @returns {Entity[]}
 */
function drillPickEntities(viewer, windowPosition) {
    var i;
    var entity;
    var picked;
    var pickedPrimitives = viewer.scene.drillPick(windowPosition);
    var length = pickedPrimitives.length;
    var result = [];
    var hash = {};

    for (i = 0; i < length; i++) {
        picked = pickedPrimitives[i];
        entity = Cesium.defaultValue(picked.id, picked.primitive.id);
        if (entity instanceof Cesium.Entity &&
            !Cesium.defined(hash[entity.id])) {
            result.push(entity);
            hash[entity.id] = true;
        }
    }
    return result;
};
