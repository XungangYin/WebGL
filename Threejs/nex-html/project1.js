var container = document.getElementById( 'container');
var renderer,scene,camera;
var stats,controls;
var light, sphereLightMesh;

var raycaster,mouse;

var clock = new THREE.Clock();
var clock1 = new THREE.Clock();

var actionsMan = [];
var actionsBoy = [];
var mix;
var mixers = [];

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
    camera.position.z = 4;
    //camera.position.set(0,-4,1.5); //北航研究院
    //camera.position.set(0,-4,1.5); //天津
    //camera.lookAt({x:0,y:0,z:0});

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

    // controls.enabled = false;

    controls.addEventListener( 'change', render );  //重要
}


function initScene(){
    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );
    scene.add( new THREE.AmbientLight( 0x444444 ) );

     // var light1 = new THREE.DirectionalLight( 0xffffff, 1.0 );
     // light1.position.set( -1, 0, -1 );
     // scene.add( light1 );

    light = new THREE.DirectionalLight( 0xffffff, 1.0 );
    light.position.set(0,0,1);
    scene.add( light );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("stats").appendChild(stats.domElement);


    loadModel();
}

function loadModel() {
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    var model = getURLParameter('model') || "models/tianjin_jpg.nxs";

    var nexus_obj = new NexusObject(model, renderer, render /*,material*/);
    scene.add(nexus_obj);

    //setTimeout("loadFbx()",1000);  //延时加载
    loadFbx();

}
function loadFbx() {
    //   THREE.Loader.Handlers.add(/\.tga$/i, new THREE.TGALoader());
    var loader1 = new THREE.FBXLoader();
    /**
     *读取man动画模型,animations::0:行走,1:奔跑, 2:转头
     */
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
        object.scale.multiplyScalar(0.0001); //缩放
        let positoin = [-0.6,-0.07,0.018];
        object.position.x = positoin[0]+0.04;
        object.position.y = positoin[1];
        object.position.z = positoin[2]+0.002;

        //object.children[10].visible = false;
        object.children[10].color = {r:0.1,g:0.1,b:0.1};

        scene.add( object );

    } );

    //setTimeout(scene.add(o),2000);
    /**
     * 读取boy动画模型,0:跑步,1:转头
     */
    loader1.load( '../models/fbx/FBX 2013/boy_action_jpg.FBX', function( object ) {
        object.mixer = new THREE.AnimationMixer( object );   //场景中特定对象的动画播放器
        mixers.push( object.mixer );

        let action;
        for(let i = 0;i < object.animations.length;i++){
            action = object.mixer.clipAction(object.animations[i]);
            actionsBoy.push(action);
        }
        //actions[3].play();

        object.rotation.y = -Math.PI/2;
        object.rotation.x = Math.PI/2;
        object.scale.multiplyScalar(0.0001); //缩放

        let oriPositoin = [0,-0.07,0.007]; //虚拟人的初始坐标
        object.position.x = oriPositoin[0]+0.05;
        object.position.y = oriPositoin[1]-0.03;
        object.position.z = oriPositoin[2];

        object.children[11].visible = false;

        scene.add( object );

    } );
    loader1.load( '../models/fbx/FBX 2013/aaajpg.FBX', function( object ) {
        object.rotation.x = Math.PI/2;
        object.rotation.y = Math.PI;
        object.scale.multiplyScalar(0.0001); //缩放

        object.position.x = -0.19;
        object.position.y = -0.48;
        object.position.z = 0.0082;

        object.children[3].visible = false;  //关闭自身的环境光

        scene.add( object );
        //lod.addLevel(object,1.);

    } );


    /**
     * 测试用例子
     */
    lod1 =  new THREE.LOD();
    lod1.addLevel(new THREE.Object3D,0.8);
    // lod.position.x = 0;
    // lod.position.y =  0;
    // lod.position.z = 0; //* ( 0.5 - Math.random() );
    // lod.updateMatrix();
    // lod.matrixAutoUpdate = false;
    var positoin1 = [-0.6,-0.07,0.018];
    loader1.load( '../models/fbx/FBX 2013/boy_tga_jpg.FBX', function ( object ) {
        object.rotation.y = Math.PI/2;
        object.rotation.x = Math.PI/2;
           // object.scale.multiplyScalar(0.001); //缩放
           // object.position.x = positoin[0]+0.01*i;
           // object.position.y = positoin[1];
           //object.position.z = positoin[2]+0.002;
           object.children[3].visible = false;
           object.scale.multiplyScalar(0.0002); //缩放
           object.position.x = -0.2;
           object.position.y = -0.46;
           object.position.z = 0.0082;
           // scene.add( object );
          lod1.addLevel(object,0.601);

        } );
    lods.push(lod1)

    let lod2 = new THREE.LOD();
    lod2.addLevel(new THREE.Object3D,0.8);
    loader1.load( '../models/fbx/test/man_all_action.FBX', function ( object ) {
       // object.rotation.y = Math.PI/4;
        object.rotation.x = Math.PI/2;
        // object.scale.multiplyScalar(0.001); //缩放
        // object.position.x = positoin[0]+0.01*i;
        // object.position.y = positoin[1];
        //object.position.z = positoin[2]+0.002;
        object.children[10].visible = false;
        object.scale.multiplyScalar(0.0001); //缩放
        object.position.x = -0.16;
        object.position.y = -0.48;
        object.position.z = 0.008;
        //scene.add( object );
        lod2.addLevel(object,0.5);
    } );
    lods.push(lod2);


    for(let i = 0 ;i < lods.length; ++i){
        scene.add(lods[i]);
    }

}


function enablelightChange(event) {

    if(document.addEventListener){
        //document.addEventListener("mousedown",downHandler);
        //document.addEventListener("mousemove",moveHandler,true);
        //document.addEventListener("mouseup",upHandler,true);
        document.getElementById("light_on").addEventListener("mousemove",moveHandler,true);
        //document.getElementById("light_on").addEventListener("mouseup",upHandler,true);
    }

    function moveHandler(event) {
        let pX = event.clientX;
        let pY = event.clientY;

        let lx = 30*((Math.cos(pY / 3)));
        let ly = 30*((Math.sin(pX / 3)));
        let lz = 10.0;
        light.position.set(lx,ly,lz);
    }

}

function dislightChange(){event}
{
            //document.getElementById("light_on").removeEventListener("mouseup",upHandler,true);
    document.getElementById("light_on").removeEventListener("mousemove",null);

}

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

/**
 *动作循环
 */
function actionLoop() {
    if (mix) {
        mix.update( clock.getDelta() );
        mixers[0].update(clock1.getDelta());
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

function animate() {
    render();
    actionLoop();

    path_1();
    path_2();
    //   scene.updateMatrixWorld();
    scene.traverse( function ( object ) {
        if ( object instanceof THREE.LOD ) {

            object.update( camera );

        }

    } );

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
var on = true;

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
        if(on) {
            lightSwitch(on);
            enablelightChange(event);
            on  = false;
        }else{
            lightSwitch(on);
            on  = true;
            dislightChange(event);
        }

    }
    else if(action=="measure"||action == "measure_on")
    {
        mix._root.position.x = -0.6;
        mix._root.position.y = -0.07;
        mix._root.position.z = 0.018;
        mix._root.rotation.y = Math.PI/2;
        run = false;
        look = false;
        for(let i = 0; i< actionsMan.length;i++){
            actionsMan[i].stop();
        }
    }

}

