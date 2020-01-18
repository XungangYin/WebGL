function NexusObject(url, renderer, render, material) {
	var gl = renderer.context;
	var geometry = new THREE.BufferGeometry();
	var positions = new Float32Array(3);


	geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
	

	if(!material)
		this.autoMaterial = true;

	THREE.Mesh.call( this, geometry, material);   //call js方法.将geometry和material对象的交给this使用
	this.frustumCulled = false;

	var mesh = this;
	var instance = this.instance = new Nexus.Instance(gl);
	instance.open(url);
	instance.onLoad = function() {
		var s = 1/instance.mesh.sphere.radius;
		var pos = instance.mesh.sphere.center;
		mesh.position.set(-pos[0]*s, -pos[1]*s, -pos[2]*s);  //将模型移到视图中心
		//mesh.scale.set(s, s, s); //将模型整体缩放

		if(mesh.autoMaterial)
			mesh.material = new THREE.MeshLambertMaterial( /*{ color: 0xffffff } ,*/{
				side:THREE.DoubleSide
			});

		if(this.mesh.vertex.normal) {
			var normals = new Float32Array(3);
			geometry.addAttribute( 'normal', new THREE.BufferAttribute(normals, 3));
		}
		if(this.mesh.vertex.color) {
			var colors = new Float32Array(4);
			geometry.addAttribute( 'color', new THREE.BufferAttribute(colors, 4));
			if(mesh.autoMaterial)
				mesh.material = new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors });
		}

		if(this.mesh.vertex.texCoord) {
			var uv = new Float32Array(2);
			geometry.addAttribute( 'uv', new THREE.BufferAttribute(uv, 2));
			if(mesh.autoMaterial) {
				var texture = new THREE.DataTexture( new Uint8Array([1, 1, 1]), 1, 1, THREE.RGBFormat );
				texture.needsUpdate = true;
				mesh.material = new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture } );
			}
		}

		if(this.mesh.face.index) {   //作用是啥 还不清楚
          //  console.log(this.mesh.face.index);

            var indices = new Uint32Array(3);
			geometry.setIndex(new THREE.BufferAttribute( indices, 3) );
		}

		render();
	};
	instance.onUpdate = function() { render(); }


	//计算相机与模型的距离
	function dist(camera,matrix) {
        var nexus = instance.mesh;
        var sp = nexus.sphere;
        var c = sp.center;
        var center = new THREE.Vector3(c[0], c[1], c[2]);
		 //将此向量与矩阵相乘,变化到世界坐标系中来
		center.applyMatrix4(matrix);
		var p=camera.position;
		var dx = Math.abs(center.x - p.x);
        var dy = Math.abs(center.y - p.y);
        var dz = Math.abs(center.z - p.z);
        var r =  sp.radius;
        dis = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)+Math.pow(dz,2));

        return dis;
    }

	this.onAfterRender = function(renderer, scene, camera, geometry, material, group) { //An optional callback that is executed immediately after the Object3D is rendered. This function is called with the following parameters: renderer, scene, camera, geometry, material, group.

		if(!instance.isReady) return;

		var s = renderer.getSize();   //web客户端的宽高
		instance.updateView([0, 0, s.width, s.height],
			camera.projectionMatrix.elements,
			mesh.modelViewMatrix.elements);   //主要目的是实时获取相机的世界坐标
		var program = renderer.context.getParameter(gl.CURRENT_PROGRAM);
		instance.attributes['position'] = renderer.context.getAttribLocation(program, "position");   //作用是啥?
		instance.attributes['normal'] = renderer.context.getAttribLocation(program, "normal");
		instance.attributes['color'] =renderer.context.getAttribLocation(program, "color");  //控制数据方块的调度显示,类似于四叉树方块
		instance.attributes['uv'] = renderer.context.getAttribLocation(program, "uv");

		//yxg
		// let distance = dist(camera,this.matrixWorld);
		// if(distance < 1.5)  //调度控制
		// 	instance.childState = true;
		// else
		// 	instance.childState = false;

     //   instance.childState = false;
		instance.render();　　//真正在Ｎｅｘｕｓ中实现对节点的调度
	}
}

NexusObject.prototype = Object.create(THREE.Mesh.prototype); //Object为ECMAScript自带,creat()方法创建对象

NexusObject.prototype.raycast = function(raycaster, intersects) {
	var instance = this.instance;
	var nexus = instance.mesh;

	if(!nexus.sphere) return;
	var sp = nexus.sphere;
	var c = sp.center;
	var center = new THREE.Vector3(c[0], c[1], c[2]);
	var sphere = new THREE.Sphere(center, sp.radius);
   // console.log(sphere);
	sphere.applyMatrix4( this.matrixWorld );   //将此向量与矩阵相乘,变化到当前世界坐标系下
	//console.log(sphere);

	if ( raycaster.ray.intersectsSphere( sphere ) === false ) {  //首先判断是否与整个场景球体相交
		//console.log("没有交点");
		return;
	}

	// just check the last level spheres.
	if(!nexus.sink) return;
    var spherepatch ;  //yxg

	var distance = -1.0;
	for(var i = 0; i < nexus.sink; i++) {    			// sink应该表示最底层节点数量,遍历所有节点(0-8643). 8643=sink = nodescount -1
		var patch = nexus.nfirstpatch[i];    			//获取节点索引. nfirstpatch[]应该是节点数组,存储节点的索引 8644
		//nexus.status[i] = 0;
		if(nexus.patches[patch*3] != nexus.sink)    	// 获取最低层索引点 ?????????? patches= 92250 = patchesCount(30750)*3;
		 	continue;
		//var p = nexus.nfaces[i];
        //nexus.status[i] = 1;
        //nexus.nfaces[i] = 0;
		//instance.visited[i] = 0;
		var x = nexus.nspheres[i*5];                    //获取节点对应球心坐标x
		var y = nexus.nspheres[i*5+1];					//
		var z = nexus.nspheres[i*5+2];
        //console.log(nexus.nspheres[i*5+3]);
		var r = nexus.nspheres[i*5+4]; //tight radius
		spherepatch = new THREE.Sphere(new THREE.Vector3(x, y, z), r);   //构造节点包围球
        spherepatch.applyMatrix4( this.matrixWorld );
		if ( raycaster.ray.intersectsSphere( spherepatch ) != false ) {    //判断是否和球体相交
			var d = spherepatch.center.lengthSq();  //该球体到原点的距离平方 .坐标轴值的平方和
			if(distance == -1.0 || d < distance) {  //??为什么这么判定
				distance = d;
               //console.log( distance);	//yxg
               intersects.push(spherepatch);  //保留最小的球体
            }
		}
	}
	if(distance == -1.0) return;

	//console.log(this);
   // intersects.push({ distance: distance, object: this}); //适用于四点构边
}
//移除节点
NexusObject.prototype.removeNode = function (context,node) {
    var n = 50;//node.id;
    var m = node.mesh;
    if(m.status[n] == 0) return;

//	console.log("Removing " + m.url + " node: " + n);
    m.status[n] = 0;

    if (m.georeq.readyState != 4) m.georeq.abort();
    if (m.texreq.readyState != 4) m.texreq.abort();

    //context.cacheSize -= m.nsize[n];
    context.gl.deleteBuffer(m.vbo[n]);
    context.gl.deleteBuffer(m.ibo[n]);
    m.vbo[n] = m.ibo[n] = null;

    if(!m.vertex.texCoord) return;
    //也就是说下边该字段对应索引面片的texture
    var tex = m.patches[m.nfirstpatch[n]*3+2]; //TODO assuming one texture per node
    m.texref[tex]--;

    if(m.texref[tex] == 0 && m.texids[tex]) {
        context.gl.deleteTexture(m.texids[tex]);
        m.texids[tex] = null;
    }


}