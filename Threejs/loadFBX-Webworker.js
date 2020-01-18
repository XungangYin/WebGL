self.importScripts("js/three_dev.js","js/loaders/FBXLoader.js");
self.importScripts("js/libs/inflate.min.js");


//THREE.Loader.Handlers.add(/\.tga$/i, new THREE.TGALoader());
var loader = new THREE.FBXLoader();


//loader.load( 'models/fbx/FBX 2013/boy_jpg.FBX',load ){
// loader.load( 'models/fbx/FBX 2013/boy_jpg.FBX', function( object ) {  //boy_em_jpg
//
//      //object.scale.multiplyScalar(0.1); //模型缩放
//     postMessage(object);
//     //postMessage({a:a});
// });



function a() {
    var gridHelper = new THREE.GridHelper( 28, 28, 0x303030, 0x303030 );
    gridHelper.position.set( 0, - 0.04, 0 );
    self.postMessage(gridHelper.data.buffer);
    // postMessage(new THREE.Object3D());
};
a();
