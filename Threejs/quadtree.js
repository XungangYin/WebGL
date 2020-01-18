/*
 * Quadtree Constructor
 * @param Object bounds			bounds with x, y, width, height
 * @param Integer max_objects		(optional) max objects a node can hold before splitting into 4 subnodes (default: 10)
 * @param Integer max_levels		(optional) total max levels inside root Quadtree (default: 4)
 * @param Integer level			(optional) deepth level, required for subnodes
 */
function Quadtree( bounds, max_objects, max_levels, level ) {

    this.max_objects	= max_objects || 1;  //单个节点所能存贮的最大对象个数
    this.max_levels		= max_levels || 10;		//四叉树的最深级别

    this.level 			= level || 0;    //子节点的深度级别（当前深度级别）
    this.bounds 		= bounds;

    this.objects 		= [];  //该节点下包含的数组对象
    this.object_refs	= [];
    this.nodes 			= [];
};


/*
 * Split the node into 4 subnodes
 */
Quadtree.prototype.split = function() {

    var nextLevel	= this.level + 1;
       // subWidth	= Math.round( this.bounds.width / 2 ),  //Math.round把一个数字舍入为最接近的整数
       // subHeight 	= Math.round( this.bounds.height / 2 ),
       // x 			= Math.round( this.bounds.x ),
       // y 			= Math.round( this.bounds.y );
        subWidth	= Math.abs( (this.bounds.p3.x - this.bounds.p2.x )/ 2 ),  //Math.round把一个数字舍入为最接近的整数
        subHeight 	= Math.abs((this.bounds.p3.z - this.bounds.p0.z) / 2 );

    //top right node
    this.nodes[0] = new Quadtree({
        p0:this.bounds.p0,
        p1:{x:this.bounds.center.x, y:-125,z:this.bounds.p0.z},
        p2:this.bounds.center,
        p3:{x:this.bounds.p0.x, y:-125,z:this.bounds.center.z},
        center : {x:this.bounds.center.x+subWidth,y:-125,z:this.bounds.center.z - subHeight}
    }, this.max_objects, this.max_levels, nextLevel);
  //   this.nodes[0] = new Quadtree({
  //       x	: x + subWidth,
  //       y	: y,
  //       width	: subWidth,
  //       height	: subHeight
  //   }, this.max_objects, this.max_levels, nextLevel);

    //top left node
    this.nodes[1] = new Quadtree({
        p0:{x:this.bounds.center.x, y:-125,z:this.bounds.p0.z},
        p1:this.bounds.p1,
        p2:{x:this.bounds.p2.x, y:-125,z:this.bounds.center.z},
        p3:this.bounds.center,
        center : {x:this.bounds.center.x-subWidth,Y:-125,z:this.bounds.center.z - subHeight}
    }, this.max_objects, this.max_levels, nextLevel);
   //  this.nodes[1] = new Quadtree({
   //      x	: x,
   //      y	: y,
   //      width	: subWidth,
   //      height	: subHeight
   //  }, this.max_objects, this.max_levels, nextLevel);

    //bottom left node
    // this.node[2] = new Quadtree(obj,this.max_objects,this.max_levels,nextLevel);
    this.nodes[2] = new Quadtree({
        p0:this.bounds.center,
        p1:{x:this.bounds.p2.x, y:-125,z:this.bounds.center.z},
        p2:{x:this.bounds.p2.x,y:-125,z:this.bounds.p3.z},
        p3:{x:this.bounds.center.x, y:-125,z:this.bounds.p3.z},
        center : {x:this.bounds.center.x-subWidth,Y:-125,z:this.bounds.center.z + subHeight}
    }, this.max_objects, this.max_levels, nextLevel);

    //bottom right node
    //this.node[3] = new Quadtree(obj,this.max_objects,this.max_levels,nextLevel);
    this.nodes[3] = new Quadtree({
        p0:{x:this.bounds.p0.x, Y:-125,z:this.bounds.center.z},
        p1:this.bounds.center,
        p2:{x:this.bounds.center.x, y:-125,z:this.bounds.p3.z},
        p3:this.bounds.p3,
        center : {x:this.bounds.center.x+subWidth,Y:-125,z:this.bounds.center.z + subHeight}
    }, this.max_objects, this.max_levels, nextLevel);
};


/*
 * Determine the quadtrant for an area in this node。返回鼠标所在的象限索引
 * @param Object pRect		bounds of the area to be checked, with x, y, width, height
 * @return Integer			index of the subnode (0-3), or -1 if pRect cannot completely fit within a subnode and is part of the parent node
 */
Quadtree.prototype.getIndex = function( pRect ) {  //pRect代表的是传入的对象

    var index 				= -1,
        // verticalMidpoint 	= this.bounds.x + (this.bounds.width / 2),  //计算垂直中点
        // horizontalMidpoint 	= this.bounds.y + (this.bounds.height / 2),  //计算水平中点
        verticalMidpoint 	= this.bounds.center.x,  //计算垂直中点
        horizontalMidpoint 	= this.bounds.center.z,  //计算水平中点

        //pRect can completely fit within the top quadrants 。上边
        // topQuadrant = (pRect.y < horizontalMidpoint && pRect.y + pRect.height < horizontalMidpoint),
        topQuadrant = pRect.center.z < horizontalMidpoint,

        //pRect can completely fit within the bottom quadrants 。下边的象限
        bottomQuadrant = (pRect.center.z > horizontalMidpoint);

    //pRect can completely fit within the left quadrants
    if( pRect.center.x > verticalMidpoint ) {
        if( topQuadrant ) {
            index = 0;
        } else if( bottomQuadrant ) {
            index = 3;
        }

        //pRect can completely fit within the right quadrants
    } else if( pRect.center.x < verticalMidpoint ) {
        if( topQuadrant ) {
            index = 1;
        } else if( bottomQuadrant ) {
            index = 2;
        }
    }

    return index;
};


/*
 * Insert an object into the node. If the node
 * exceeds the capacity, it will split and add all
 * objects to their corresponding subnodes.
 * @param Object obj		the object to be added, with x, y, width, height
 */
Quadtree.prototype.insert = function( obj ) {

    var i = 0,
        index;

    //if we have subnodes ...
    if( typeof this.nodes[0] !== 'undefined' ) {
        index = this.getIndex( obj );

        if( index !== -1 ) {
            this.nodes[index].insert( obj );
            return;
        }
    }

    this.objects.push( obj );

    if( this.objects.length > this.max_objects && this.level < this.max_levels ) {

        //split if we don't already have subnodes
        if( typeof this.nodes[0] === 'undefined' ) {
            this.split();
        }

        //add all objects to there corresponding subnodes
        while( i < this.objects.length ) {

            index = this.getIndex( this.objects[ i ] );

            if( index !== -1 ) {
                // let arr = this.objects.splice(i,1);
                // let o = arr[0];
                // this.nodes[index].insert( o);
                this.nodes[index].insert( this.objects.splice(i, 1)[0] ); //splice方法：删除从i开始的1个元素，并返回被删除元素的数组
            } else {
                i = i + 1;
            }
        }
    }
};


/*
 * Return all objects that could collide with a given area 。返回可能发生碰撞的所有对像
 * @param Object pRect		bounds of the area to be checked, with x, y, width, height
 * @Return Array			array with all detected objects
 */
Quadtree.prototype.retrieve = function( pRect ) {

    var index = this.getIndex( pRect ),
        returnObjects = this.objects;

    //if we have subnodes ...
    if( typeof this.nodes[0] !== 'undefined' ) {

        //if pRect fits into a subnode ..
        if( index !== -1 ) {
            returnObjects = returnObjects.concat( this.nodes[index].retrieve( pRect ) );
            //if pRect does not fit into a subnode, check it against all subnodes
        } else {
            for( var i=0; i < this.nodes.length; i=i+1 ) {
                returnObjects = returnObjects.concat( this.nodes[i].retrieve( pRect ) );  //concat用于链接多个数组
            }
        }
    }

    return returnObjects;
};


/*
 * Get all objects stored in the quadtree
 * @return Array 		all objects in the quadtree
 */
Quadtree.prototype.getAll = function() {

    var objects = this.objects;

    for( var i=0; i < this.nodes.length; i=i+1 ) {
        objects = objects.concat( this.nodes[i].getAll() );
    }

    return objects;
};


/*
 * Get the node in which a certain object is stored。获取存储对象的节点
 * @param Object obj		the object that was added via Quadtree.insert
 * @return Object 			the subnode, or false when not found
 */
Quadtree.prototype.getObjectNode = function( obj ) {

    var index;

    //if there are no subnodes, object must be here
    if( !this.nodes.length ) {

        return this;

    } else {

        index = this.getIndex( obj );

        //if the object does not fit into a subnode, it must be here
        if( index === -1 ) {

            return this;

            //if it fits into a subnode, continue deeper search there
        } else {
            var node = this.nodes[index].getObjectNode( obj );
            if( node ) return node;
        }
    }

    return false;
};


/*
 * Removes a specific object from the quadtree 。 从四叉树中删除特定对象
 * Does not delete empty subnodes. See cleanup-function
 * @param Object obj		the object that was added via Quadtree.insert
 * @return Number			false, when the object was not found
 */
Quadtree.prototype.removeObject = function( obj ) {

    var node = this.getObjectNode( obj ),
        index = node.objects.indexOf( obj ); //返回obj首次在数组中出现的位置

    if( index === -1 ) return false;

    node.objects.splice( index, 1);
};


/*
 * Clear the quadtree and delte all objects
 */
Quadtree.prototype.clear = function() {

    this.objects = [];

    if( !this.nodes.length ) return;

    for( var i=0; i < this.nodes.length; i=i+1 ) {

        this.nodes[i].clear();
    }

    this.nodes = [];
};


/*
 * Clean up the quadtree
 * Like clear, but objects won't be deleted but re-inserted
 */
Quadtree.prototype.cleanup = function() {

    var objects = this.getAll();

    this.clear();

    for( var i=0; i < objects.length; i++ ) {
        this.insert( objects[i] );
    }
};
