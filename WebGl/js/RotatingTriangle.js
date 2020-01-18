var VSHADER_SOURCE =
    "attribute vec4 a_Position;\n"+
    "uniform mat4 u_ModelMatrix;\n"+
    "void main() {\n"+
    "gl_Position = u_ModelMatrix * a_Position;\n"+
   // "gl_PointSize = 10.0;\n"+
    "}\n";

var FSHADER_SOURCE=
    "void main() {\n"+
    "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n"+
    "}\n";

var ANGLE_STEP =45.0;
function main() {
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE))
    {
        console.log("failed to read shaders");
    }

    var n = initVertexBuffers(gl);

    //  设置canvas背景颜色
    gl.clearColor(0.0,0.0,0.0,1.0);
    var u_ModelMatrix = gl.getUniformLocation(gl.program,"u_ModelMatrix");

    //三角形当前的旋转角度
    var currentAngle = 0.0;

    //模型矩阵
    var modelMatrix = new Matrix4();

    //开始绘制三角形
    var tick = function () {
        currentAngle = animate(currentAngle);
        draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix);
        requestAnimationFrame(tick);//请求浏览器调用tick
    }
   tick();
}
function initVertexBuffers(gl) {
    var vertices = new Float32Array([0.0,0.5,-0.5,-0.5,0.5,-0.5]); //与js数组不同，这是webgl专用数组（类型化数组），效率比较高
    var n  =3;
    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) return -1;
    //绑定
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program,"a_Position");

    //将缓冲区分配给shader变量
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

    //开启attribute变量
    gl.enableVertexAttribArray(a_Position);
    return n;
}
var g_last = Date.now();
function animate(angle) {
    //计算距离上次用了多少时间
    var now = Date.now();
    var elapsed = now - g_last;//毫秒
    g_last = now;
    //根据上次距离时间,更新角度
    var newAngle = angle+(ANGLE_STEP*elapsed)/1000.0;
    return newAngle %360;
}
function draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix) {
    //设置旋转矩阵
    modelMatrix.setRotate(currentAngle,0,0,1);  //将modeMatrix设置为旋转矩阵
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements); //返回改类型化数组
    //清楚canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制三角形
    gl.drawArrays(gl.TRIANGLES,0,n);

}