// Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMTc3NjhkOC0xYmExLTQwOTYtYTYwZS05YzQ4YzNhZWVhM2QiLCJpZCI6NTkwNywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0NDU5NTA4Nn0.-4tFtV4jM36IJTT7s8S1VrioG-hZSA9Wf9eKtR-kS7k";

// var czml = [
//     {
//         "id"    : "document",
//         "name"  : "CZML path",
//         "version": "1.0",
//         "clock":{
//             "interval":"2012-08-04T10:00:00Z/2012-08-04T11:00:00Z",
//             "currentTime":"2012-08-04T10:00:00Z",
//             "multiplier":5
//         }
//     },
//     {
//         "id"    : "path",
//         "name"  : "path with GPS",
//         "availability": "2012-08-04T10:00:00Z/2012-08-04T11:00:00Z",
//         "path": {
//             "material" : {
//                 "polylineOutline" : {
//                     "color" : {
//                         "rgba" : [255, 0, 255, 255]
//                     },
//                     "outlineColor" : {
//                         "rgba" : [0, 255, 255, 255]
//                     },
//                     "outlineWidth" : 5
//                 }
//             },
//             "width" : 8,
//             // "leadTime" : 10,
//             // "trailTime" : 1000,
//             "resolution" : 5
//         },
//         "model" : {
//             "gltf":"SampleData/gltf/boy_action_jpg_out/boy_action_jpg.gltf",
//             "minimumPixelSize":100,
//             "maximumScale":50
//         },
//         "position"  : {
//             "epoch" : "2012-08-04T10:00:00Z",
//             "interpolationAlgorithm":"LAGRANGE",
//             "interpolationDegree":1,
//              "cartographicDegrees" : [
//                 0,117.00001,39.11999699,2.5,
//                 10,117.00002,39.119997,2.5,
//                 20,117.00005,39.1198,2.5,
//                 30,117.00007,39.11999,2.5,
//                 40,117.00008,39.12001,2.5,
//                 50,117.00010,39.12002,2.5,
//                 60,117.00012,39.12003,2.5,
//                 70,117.00013,39.12005,2.5,
//                 80,117.00015,39.12004,2.5,
//                 90,117.00016,39.12003,2.5,
//                 100,117.00014,39.12003,2.5
//             ]
//         }
//     }
// ];

// var viewer = new Cesium.Viewer("cesiumContainer",{
//     shouldAnimate : true  //开启动画循环
// });
//
//
// var scene = viewer.scene;
// var clock = viewer.clock;
// var referenceFramePrimitive;
//
// viewer._cesiumWidget._creditContainer.style.display="none";  //隐藏版权显示
//
// var entity = viewer.entities.add({
//     position: Cesium.Cartesian3.fromDegrees(117,39.12,5),  //三维笛卡尔点
//     model: {
//         uri: "SampleData/models/GroundVehicle/GroundVehicle.glb",
//         scale:1
//     }
// });
//
// // 删除默认的影像图层(默认需要翻墙)
// viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
// // 增加谷歌影像底图
// viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
//         url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
//         tilingScheme: new Cesium.WebMercatorTilingScheme()
//     })
// );
//
// // 开启全球光照
// viewer.scene.globe.enableLighting = true;
//
// // viewer.extend(Cesium.viewerCesiumInspectorMixin);  //cesium小工具
//
// var scene = viewer.scene;
// var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
//     Cesium.Cartesian3.fromDegrees(117,39.12,2)
// );
// var model = scene.primitives.add(Cesium.Model.fromGltf({
//     name: "汽车",
//     url: "SampleData/models/GroundVehicle/GroundVehicle.glb",
//     modelMatrix : modelMatrix,
//     scale:10
// }));
//
// var position  =Cesium.Cartesian3.fromDegrees(117,39.12002,2);
//
//
// Cesium.when(model.readyPromise).then(function(model) {
//     model.activeAnimations.addAll({
//         loop : Cesium.ModelAnimationLoop.REPEAT,
//         speedup : 0.5,
//         reverse : false //颠倒
//     });
// });
//
//
//
// var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
// handler.setInputAction(
//     function (movement) {
//         // var pick = scene.pick(movement.endPosition);
//         var pick = scene.pick(movement.position);
//         if (Cesium.defined(pick) && Cesium.defined(pick.node) && Cesium.defined(pick.mesh)) {
//             console.log('node: ' + pick.node.name + '. mesh: ' + pick.mesh.name);
//         }
//     },
//     Cesium.ScreenSpaceEventType.LEFT_CLICK
// );
//
// //  viewer.trackedEntity = entity;
//
// var tileset = viewer.scene.primitives.add(
//     new Cesium.Cesium3DTileset({
//         url: Cesium.IonResource.fromAssetId(12276),
//        // url:"SampleData/Production_1/Data/LODTreeExport.xml",
//         modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(117, 39.12))
//     })
// );


//viewer.zoomTo(tileset);

//viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));
// viewer.dataSources.add(Cesium.CzmlDataSource.load(czml)).then(function (ds) {
//    // viewer.trackedEntity = ds.entities.getById("path");
// })


// var longitude = 120.28912418100008;
// var latitude = 36.16416839734635;
// var height = -1.3969838619232178e-9;
// var heading = 0;
// var tileset = new Cesium.Cesium3DTileset({
//     url: 'DATA/qingDbim/tileset.json'
// });
// tileset.style = new Cesium.Cesium3DTileStyle({
//     color:"color()*vec4(1,1,1,0.8)"
// });
// viewer.scene.primitives.add(tileset);
// tileset.readyPromise.then(function(argument) {
//     var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
//     var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
//     var rotationX = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(heading)));
//     Cesium.Matrix4.multiply(mat, rotationX, mat);
//     tileset._root.transform = mat;
//     viewer.camera.flyTo({destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height + 1000)});
// }).otherwise(function(error){
//     //Display any errrors encountered while loading.
//     window.alert(error);
// });

// var promise = Cesium.GeoJsonDataSource.load('DATA/qingdaoBIM/qingdao1.json');
//
// promise.then(function(dataSource) {
//     viewer.dataSources.add(dataSource);
//
//     //Get the array of entities
//     var entities = dataSource.entities.values;
//
//     var colorHash = {};
//     for (var i = 0; i < entities.length; i++) {
//         //For each entity, create a random color based on the state name.
//         //Some states have multiple entities, so we store the color in a
//         //hash so that we use the same color for the entire state.
//          var entity = entities[i];
//         // var name = entity.name;
//         // var color = colorHash[name];
//         // if (!color) {
//         //     color = Cesium.Color.fromRandom({
//         //         alpha : 1.0
//         //     });
//         //     colorHash[name] = color;
//         // }
//
//         //Set the polygon material to our random color.
//         //entity.polygon.material = color;
//         //Remove the outlines.
//        // entity.polygon.outline = false;
//
//         //Extrude the polygon based on the state's population.  Each entity
//         //stores the properties for the GeoJSON feature it was created from
//         //Since the population is a huge number, we divide by 50.
//         entity.polygon.extrudedHeight = entity.properties.Population / 50.0;
//     }
// }).otherwise(function(error){
//     //Display any errrors encountered while loading.
//     window.alert(error);
// });

// Sandcastle.addToolbarMenu([{
//     text : 'Camera Options'
// }, {
//     text : 'Fly in Tianjin',
//     onselect : function() {
//         flytoTianjin();
//         Sandcastle.highlight(flytoTianjin);
//     }
//  }
//    ,{
//     text : 'Fly to San Diego',
//     onselect : function() {
//         flyToSanDiego();
//         Sandcastle.highlight(flyToSanDiego);
//     }
// }, {
//     text : 'Fly to Location with heading, pitch and roll',
//     onselect : function() {
//         flyToHeadingPitchRoll();
//         Sandcastle.highlight(flyToHeadingPitchRoll);
//     }
// }, {
//     text : 'Fly to My Location',
//     onselect : function() {
//         flyToLocation();
//         Sandcastle.highlight(flyToLocation);
//     }
// }, {
//     text : 'Fly to Rectangle',
//     onselect : function() {
//         flyToRectangle();
//         Sandcastle.highlight(flyToRectangle);
//     }
// }, {
//     text : 'View a Rectangle',
//     onselect : function() {
//         viewRectangle();
//         Sandcastle.highlight(viewRectangle);
//     }
// }, {
//     text : 'Set camera reference frame',
//     onselect : function() {
//         setReferenceFrame();
//         Sandcastle.highlight(setReferenceFrame);
//     }
// }, {
//     text : 'Set camera with heading, pitch, and roll',
//     onselect : function() {
//         setHeadingPitchRoll();
//         Sandcastle.highlight(setHeadingPitchRoll);
//     }
// }, {
//     text : 'View in ICRF',
//     onselect : function() {
//         viewInICRF();
//         Sandcastle.highlight(viewInICRF);
//     }
// }, {
//     text : 'Move events',
//     onselect : function() {
//         cameraEvents();
//         Sandcastle.highlight(cameraEvents);
//     }
// }, {
//     text : 'Camera changed event',
//     onselect : function() {
//         cameraChanges();
//         Sandcastle.highlight(cameraChanges);
//     }
// }, {
//     text : 'Fly from Los Angeles to Tokyo via Europe',
//     onselect : function() {
//         flyOverLongitude();
//         Sandcastle.highlight(flyOverLongitude);
//     }
// }, {
//     text : 'Look down during exaggerated flight',
//     onselect : function() {
//         flyOverLongitudeWithPitch();
//         Sandcastle.highlight(flyOverLongitudeWithPitch);
//     }
// }
//]);

/*
Sandcastle.reset = function() {
    scene.completeMorph();
    viewer.entities.removeAll();
    scene.primitives.remove(referenceFramePrimitive);
    scene.tweens.removeAll();

    if (Cesium.defined(removeStart)) {
        removeStart();
        removeEnd();

        viewChanged.style.display = 'none';

        removeStart = undefined;
        removeEnd = undefined;
    }

    if (Cesium.defined(removeChanged)) {
        removeChanged();
        removeChanged = undefined;

        cameraChanged.style.display = 'none';
    }

    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

    clock.multiplier = 1.0;
    scene.postUpdate.removeEventListener(icrf);
    scene.globe.enableLighting = false;
};

scene.morphComplete.addEventListener(function() {
    Sandcastle.reset();
});



*/

