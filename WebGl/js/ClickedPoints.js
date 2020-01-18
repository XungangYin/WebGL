var VSHADER_SOURCE =
    "attribute vec4 a_Position;\n"+
    "void main() {\n"+
    //"gl_Position = vec4(0.0,0.0,0.0,1.0);\n"+
    "gl_Position = a_Position;\n"+
    "gl_PointSize = 10.0;\n"+
    "}\n";

var FSHADER_SOURCE=
    "void main() {\n"+
    "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n"+
    "}\n";
function main() {
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE))
    {
        console.log("failed to read shaders");
    }

    //获取a_Position位置
    var a_Position = gl.getAttribLocation(gl.program,"a_Position");

    //注册鼠标点击函数.当鼠标点击时,会自动调用注册到canvas的onmousedow函数
    canvas.onmousedown = function (ev) {  //匿名函数
        click(ev,gl,canvas,a_Position);
    };

    gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_position =[]; //鼠标点击的数组
function click(ev, gl, canvas, a_Position) {
    var x = ev.clientX;
    var y = ev.clientY;

    var rect = ev.target.getBoundingClientRect(); //获取页面客户区坐标

    x =( (x - rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

    g_position.push(x);g_position.push(y);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_position.length;
    for(var i = 0;i<len;i+=2)
    {
        //将点传递到shader中
        gl.vertexAttrib3f(a_Position,g_position[i],g_position[i+1],0.0);
        gl.drawArrays(gl.POINTS,0,1);
    }
}
