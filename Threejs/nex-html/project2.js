var container = document.getElementById( 'container');
var renderer,scene,camera;
var stats,controls;

var raycaster,raycaster2,mouse;

var clock = new THREE.Clock();
var clock1 = new THREE.Clock();

var actionsMan = [];
var actionsBoy = [];
var mix;
var mixers = [];

var N = 0; //N个天津场景,表示N个平方公里

var numFBX = 0;  //fbx模型数量
var numGLTF = 0; //gltf模型数量

var nexus_obj;


var model3;

var helper;//交点显示圆锥
var lod;
var lods = [];

function initRender(){
    renderer= new THREE.WebGLRenderer( { antialias: false } );
    renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);
    container.appendChild( renderer.domElement );

    //renderer.setFaceCulling(THREE.CullFaceNone, THREE.FrontFaceDirectionCCW)

}

function initCameraAndControl(){
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.001, 200 );
    //camera.position.z = 2;
    camera.position.set(0,0.2,0.8); //北航研究院
   // camera.position.set(0,-4,1.5); //天津
    camera.lookAt({x:0,y:0,z:0});

    controls = new THREE.TrackballControls( camera,renderer.domElement ); //第二个参数防止该漫游器和dat.gui冲突
    // controls = new THREE.OrbitControls( camera,renderer.domElement );
    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 1.5;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    //controls.keys = [ 65, 83, 68 ];

    // controls.screenSpacePanning = false;
    controls.rotation = Math.PI / 12;
    controls.maxPolarAngle = Math.PI;

    controls.addEventListener( 'change', render );  //重要.该事件在表单元素的内容改变时触发
}


function initScene(){
    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );
    scene.add( new THREE.AmbientLight( 0x444444 ) );

    var light1 = new THREE.DirectionalLight( 0xffffff, 1.0 );
    light1.position.set( 0, 1, 0 );
    scene.add( light1 );

    var light2 = new THREE.DirectionalLight( 0xffffff, 1.0 );
    light2.position.set( 0, -1, 0 );
    scene.add( light2 );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
 //   document.getElementById("stats").appendChild(stats.domElement);


    loadModel();


    var geometry = new THREE.ConeBufferGeometry( 0.008, 0.01, 4 );  //创建帮助圆锥
    //var geometry = new  THREE.SphereGeometry();
    //  geometry.radius = 0.001;
   // geometry.translate( 0, 50, 0 );
    geometry.rotateX( Math.PI/2);
    var material = new THREE.MeshNormalMaterial({wireframe: true});
    material.wireframeLinewidth = 8;
    helper = new THREE.Mesh( geometry, material);
    scene.add( helper );
}

//计算相机与模型的距离
function dist(camera, instance, matrix) {
    var nexus = instance.mesh;
    var sp = nexus.sphere;
    var c = sp.center;
    var center = new THREE.Vector3(c[0], c[1], c[2]);
    //console.log(center);
    var sphere = new THREE.Sphere(center, sp.radius);
    sphere.applyMatrix4( matrix );   //将此向量与矩阵相乘,变化到当前场景中来
    var p=camera.position;
    var dx = Math.abs(sphere.center.x - p.x);
    var dy = Math.abs(sphere.center.y - p.y);
    var dz = Math.abs(sphere.center.z - p.z);
    var r =  sp.radius;
    dis = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)+Math.pow(dz,2));

    return dis;
}
function drawLine(arr) {
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({vertexColors:true}); //vertexColors定义线条是否使用定点颜色
    var color1 = new THREE.Color(0x444444),color2 = new THREE.Color(0xFF0000);

    geometry.vertices.push(arr[0]);
    geometry.vertices.push(arr[1]);
    geometry.vertices.push(arr[2]);
    geometry.vertices.push(arr[3]);
    geometry.colors.push(color2,color2,color2,color2);

    material.linewidth = 10;
    var line = new THREE.LineLoop(geometry,material);
    scene.add(line);

}

var linePoints = [];
function onMouseDown( event ) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    //raycaster.set( mouse, new THREE.Vector3(0,0,0) );
    nexus_obj.raycast(raycaster,arr);

    var intersections = raycaster.intersectObjects( [nexus_obj] );
    console.log(intersections);
    	/* if(nexus_obj.material.color) {
            if(intersections.length)
                nexus_obj.material.color =  0xff0000;
            else
                nexus_obj.material.color =  0xffffff;

        } else */ if(nexus_obj.material.vertexColors != null) {
        if(intersections.length)
             //nexus_obj.material.vertexColors = THREE.NoColors;
            //nexus_obj.material.color = [10,0,0];
            nexus_obj.material.lights = false;
        else
            nexus_obj.material.vertexColors = THREE.VertexColors;
    }
    helper.position.copy(intersections[0].center);
    //nexus_obj.material.needsUpdate = true;

    //camera.position.set(intersections[0].center);

    //camera.position.set(0,-2,3.5);

   // b_camera = true;
    render();

    console.log(camera.position);
    /*
    nexus_obj.instance.N = 1;
    nexus_obj.instance.M = 3;

  //  nexus_obj.removeNode(nexus_obj.instance.context,nexus_obj.instance);

    var sceneChildren = scene.children;
  //  for(let i = 2;i<sceneChildren.length-1;i++){  //[2,10]保留第一个
        // sceneChildren[i].raycast(raycaster,arr);  无作用
       //  sceneChildren[i].instance.childState = false;
        //var instance  = sceneChildren[i].instance;
        //var matrix = sceneChildren[i].matrixWorld;
        //var d = dist(camera,instance,matrix);


//    }
    // sceneChildren[2].raycast(raycaster,arr);
      console.log(arr);
      var p = arr[arr.length-1];
      helper.position.copy(p.center);  //此处使用都是面片包围球的球心,并非鼠标在屏幕上点击的位置坐标

    //获取点击的四个位置点
    if (linePoints.length<4){
        linePoints.push(p.center);
        if (linePoints.length == 4){
            drawLine(linePoints);
            linePoints.length = 0;
        }
    }
*/
   // nexus_obj.instance.setPrimitiveMode("POINT");

    arr =[]; //清空数组
        //console.log(arr);
    // var obj = arr[arr.length-1].object;
    //obj.instance.attributes.normal = 1;
    //   obj.instance.attributes.color = -10;
    // obj.material.visible = false;
    // obj.geometry.attributes.color = {};
  /*  {
        let instance = obj.instance;
        //instance.childState = false;
       // instance.traversal();
        var mesh = instance.mesh;
        for(var i = 0; i< mesh.status.length;++i){
          //  mesh.status[i] = 1;   // //0 for none, 1 for ready, 2+ for waiting data
        }

        for(var i = 0; i< mesh.textures.length;++i){
           // mesh.textures[i] = 0;   //  当设置该值的时候,好像网格不加载高分辨率.
        }

        //instance.setPrimitiveMode("POINT");  //设置点模式显示 model = POINT,FILE


    };
*/
}
var arr = [];

function loadModel() {
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    var model = getURLParameter('model') || "models/bhqditi_new_4000_simplified_3d_mesh_yxg.nxz";


     nexus_obj = new NexusObject(model, renderer, render /*,material*/);

     scene.add(nexus_obj);

    raycaster = new THREE.Raycaster();
    raycaster2 = new THREE.Raycaster();

    mouse = new THREE.Vector2();

    var row = Math.ceil(Math.sqrt(N));
    var col = row;

    for(var i = 0;i<row;i++){
        for(let j = 0;j<col;j++){
            model3 = new NexusObject("models/tianjin_jpg.nxs",renderer,render);
            model3.position.x = -2.5+i*1.4;
            model3.position.y = -1+j*1.4;
            scene.add(model3);
        }
    }

    //setTimeout("loadFbx()",1000);  //延时加载
    loadFbx();

}
function loadFbx() {
    //   THREE.Loader.Handlers.add(/\.tga$/i, new THREE.TGALoader());

    /**
     *读取man动画模型,animations::0:行走,1:奔跑, 2:转头
     */

    var loader1 = new THREE.FBXLoader();

    var loader2 = new THREE.GLTFLoader();
    for(var i = 0; i< numGLTF;i++){
        loader2.load('../models/gltf/_out/man_all_action.gltf', function( gltf ) {  //0:walk ,1:run
            scene.add( gltf.scene ); // 将模型引入three
            // 调用动画
            var mixer = new THREE.AnimationMixer( gltf.scene.children[0] );
            mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
            mixers.push( mixer );

        });
    }

    var fbxPath = [];

    //var oriOositoin = [-0.6,-0.07,0.018];
    var p = -0.7
    var position  =[];
    for(let j = 0;j<numFBX;j++){
        let path = "../models/fbx/3/"+"girl_"+j+".FBX";
        fbxPath.push(path);
        p += j*0.01;
        position.push(p);
    }

    // console.log(position);

   for(var i = 0 ; i<numFBX;i++){
   //    loader1.load(fbxPath[i], function ( object ) {
       loader1.load("../models/fbx/3/girl_1.FBX", function ( object ) {
           mix = object.mixer = new THREE.AnimationMixer( object );   //场景中特定对象的动画播放器
           mixers.push( object.mixer );

           var action = object.mixer.clipAction( object.animations[ 0 ] );  //返回可以控制动画的对象 .行走
           action.play(); //启动动画动作
           object.rotation.y = Math.PI/2;
           object.rotation.x = Math.PI/2;
           object.scale.multiplyScalar(0.001); //缩放
           let P = position;
           object.position.x = P[5];
          // object.position.x = -0.7;
           object.children[12].visible = false;
           //object.children[10].color = {r:0.1,g:0.1,b:0.1};

           scene.add( object );

       } );
   }

    loader1.load( '../models/fbx/test/man_all_action.FBX', function ( object ) {
        mix = object.mixer = new THREE.AnimationMixer( object );   //场景中特定对象的动画播放器
        mixers.push( object.mixer );

        //var action = object.mixer.clipAction( object.animations[ 0 ] );  //返回可以控制动画的对象 .行走
        // action.play(); //启动动画动作
        let action;
        for(let i = 0;i < object.animations.length;i++){
            action = object.mixer.clipAction(object.animations[i]);
            actionsMan.push(action);
        }

        object.rotation.y = Math.PI/2;
        object.rotation.x = Math.PI/2;
        object.scale.multiplyScalar(0.001); //缩放
        let positoin = [-0.6,-0.07,0.018];
        object.position.x = positoin[0]+0.04;
        object.position.y = positoin[1];
        object.position.z = positoin[2]+0.002;

        //object.children[10].visible = false;
        object.children[10].color = {r:0.1,g:0.1,b:0.1};

     //   scene.add( object );

    } );

}


// raycaster = new THREE.Raycaster();
// mouse = new THREE.Vector2();

function onDocumentTouchStart( event ) {
    event.preventDefault();
    event.clientX = event.touches[0].clientX;
    event.clientY = event.touches[0].clientY;
    onDocumentMouseDown( event );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    controls.handleResize();
    controls.update();
    render();
}

window.addEventListener("click",onMouseDown,false);
/**
 *动作循环
 */
function actionLoop() {
    if (mix) {
        mix.update( clock.getDelta() );
        for(let i = 0;i < mixers.length;i++){
            mixers[i].update(0.001*i );
           // mixers[i]._root.position.x +=0.001;
        }
    }
}

/**
 * 路径1
 */
function  path_1() {
    if(run){
        mix._root.position.x += clock.getDelta() ;
        if(mix._root.position.x > -0.26){
            mix._root.position.z -= 0.006;
            setTimeout(function () {                //setTimeOut函数的作用是等待3s后执行匿名函数
                mix._root.rotation.y = 0;
                actionsMan[2].stop();
                actionsMan[1].play();
                look = true;
            },5000);

            run = false;
            actionsMan[0].stop();
            actionsMan[2].play();
            // onChangeAction();
        }
    }
    if (look){
        //onChangeAction();
        mix._root.position.y -= 0.0006;
        if(mix._root.position.y < -0.34){
            mix._root.rotation.y = 45;
            mix._root.position.x += 0.0008;
            if(mix._root.position.x > -0.18){
                look = false;
                actionsMan[1].stop();
                actionsMan[2].play();
                mix._root.position.z = 0.012;
            }
        }

    }


}
function  path_2() {
    if(boy_run){
        mixers[0]._root.position.x -= 0.001;
        if(mixers[0]._root.position.x < -0.076){
            // mixers[0]._root.position.z -= 0.007;
            setTimeout(function () {                //setTimeOut函数的作用是等待3s后执行匿名函数
                mixers[0]._root.rotation.y = 0;
                actionsBoy[1].stop();
                actionsBoy[0].play();
                boy_look = true;
            },8000);

            boy_run = false;
            actionsBoy[0].stop();
            actionsBoy[1].play();
            // onChangeAction();
        }
    }
    if (boy_look){
        //onChangeAction();
        mixers[0]._root.position.y -= 0.0006;
        if(mixers[0]._root.position.y < -0.36){
            mixers[0]._root.rotation.y = -45;
            mixers[0]._root.position.x -= 0.0008;
            if(mixers[0]._root.position.x < -0.18){
                boy_look = false;
                actionsBoy[0].stop();
                actionsBoy[1].play();
                mixers[0]._root.position.z += 0.006;
            }
        }

    }


}

var b_camera = false;
var value= 1.5;
var R  = 1;
function cameraPath() {
    value+=0.003;
   // camera.position.set(0,-2,value);
    //camera.lookAt({x:value,y:0,z:value});
    //nexus_obj.position.x+=0.0001;
    nexus_obj.rotation.y = value;
    //nexus_obj.position.x = 0.3*Math.sin(value);
    //nexus_obj.position.z = 0.3*Math.cos(value);
    //console.log(camera.position);
}

function animate() {
    render();
    actionLoop();

    if (b_camera)
        cameraPath();
    // path_1();
    // path_2();

    // for (let i = 0; i < 1; i++) {
    //     console.log(arr[i]);
    // }
     //  console.log(arr);

    requestAnimationFrame( animate );
    controls.update();
    stats.update();   //帧数
}


function render() {

    Nexus.beginFrame(renderer.context);
    renderer.render( scene, camera );
    Nexus.endFrame(renderer.context);
}


/**
 *动作切换
 */
function onChangeAction() {
    if (changAction) {
        actionsMan[1].stop();
        actionsMan[0].play();
        // changAction = false;

    }
    else {
        actionsMan[0].stop();
        actionsMan[1].play();
        //changAction = true;
    }
}

var changAction = true;
var loop = false;
var run = false;
var look = false;

var boy_run = false;
var boy_look = false;

/**工具条
 *
 * @param action 左侧带单id
 */
function actionsToolbar(action) {
    if(action=='home')
    {
        controls.reset();
    }
    else if (action == "zoomin"){

        run = true;
        boy_run = true;
        actionsMan[0].play();
        actionsBoy[0].play();

    }
    else if (action=="light" || action =="light_on" ){
        mix._root.position.x = -0.6;
        mix._root.position.y = -0.07;
        mix._root.position.z = 0.018;
        mix._root.rotation.y = Math.PI/2;
        run = false;
        look = false;
        for(let i = 0; i< actionsMan.length;i++){
            actionsMan[i].stop();
        }
        // $('#light').css("visibility", "hidden");
        // $('#light_on').css("visibility", "visible");
        // _spidergl.postDrawEvent();
    }
    else if(action=="measure"||action == "measure_on")
    {
        //measureSwitch();
    }

}

//鼠标拖拽框选
function addTouch() {
    //存贮显示区域一半的大小
    var half ={};
    //获取一下当前的dom的距离左上角的偏移量
    var domClient = {};

    //鼠标按下距离左上角的距离
    var down = {};
    var move=  {};
    var max = {};
    var min = {};

    var modelsList= [];
    var group = THREE.Group;

    var material = new THREE.MeshPhongMaterial({color:0xffffff});

    //声明一个显示拖拽框的div
    var div = document.createElement("div");
    div.style.cssText = "position:fixed;box-sizing:border-box;border:1px solid #ccc";

    renderer.domElement.addEventListener("mousedown",function (e) {
        if(e.button !== 0)
            return;

       // controls.update = false;
        group = scene.getObjectById(2);

        half.height = renderer.domElement.offsetHeight/2; // 返回页面的宽
        half.width = renderer.domElement.offsetWidth/2;
        domClient.x = renderer.domElement.getBoundingClientRect().left; //左
        domClient.y = renderer.domElement.getBoundingClientRect().top; //上

        //dow.x .y鼠标第一次点击位置
        down.x = e.clientX - domClient.x;  //clientX 设置或获取鼠标指针位置相对于窗口客户区域的 x 坐标，其中客户区域不包括窗口自身的控件和滚动条。
        down.y = e.clientY - domClient.y;

        // for (let i = 0; i < group.children.length; i++) {
        //     let box = new THREE.Box3();
        //     box.expandByObject(group.children[i]);
        //     //获取到平面的坐标
        //     let vec3 = new THREE.Vector3();
        //     box.getCenter(vec3);
        //     let vec = vec3.project(camera);
        //     modelsList.push(
        //         {
        //             component: group.children[i],
        //             position: {
        //                 x: vec.x * half.width + half.width,
        //                 y: -vec.y * half.height + half.height
        //             },
        //             normalMaterial: group.children[i].material
        //         }
        //     )
        // }

        //重置样式
        div.style.left = 0;
        div.style.top = 0;
        div.style.width = 0;
        div.style.height = 0;
        document.body.appendChild(div);

        //绑定鼠标按下移动事件和抬起事件
        document.addEventListener("mousemove", movefun, false);
        document.addEventListener("mouseup", upfun, false);
    },false);


    function movefun(e) {
        move.x = e.clientX - domClient.x;
        move.y = e.clientY - domClient.y;
        //计算出来大小来设置拖拽框
        min.x = Math.min(move.x, down.x);
        min.y = Math.min(move.y, down.y);
        max.x = Math.max(move.x, down.x);
        max.y = Math.max(move.y, down.y);
        //设置div框
        div.style.left = min.x + "px";
        div.style.top = min.y + "px";
        div.style.width = max.x - min.x + "px";
        div.style.height = max.y - min.y + "px";
        //判断修改哪些构件
        for (let i = 0; i < modelsList.length; i++) {
            let position = modelsList[i].position;
            if (position.x > min.x && position.x < max.x && position.y > min.y && position.y < max.y) {
                modelsList[i].component.material = material;
            }
            else{
                modelsList[i].component.material = modelsList[i].normalMaterial;
            }
        }
    }
    function upfun(e) {
        //清除事件
        document.body.removeChild(div);
        document.removeEventListener("mousemove", movefun, false);
        document.removeEventListener("mouseup", upfun, false);
        //将所有的模型修改为当前默认的模型
        for (let i = 0; i < modelsList.length; i++) {
            modelsList[i].component.material = modelsList[i].normalMaterial;
        }
    }

}











