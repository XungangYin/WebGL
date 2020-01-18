var VSHADER_SOURCE =
    "void main() {\n"+
    "gl_Position = vec4(0.0,0.0,0.0,1.0);\n"+
    "gl_PointSize = 10.0;\n"+
    "}\n";

var FSHADER_SOURCE=
    "void main() {\n"+
    "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n"+
    "}\n";

function main() {
    var canvas = document.getElementById("Point");
    if (!canvas){
        return ;
    }

    var ctx = getWebGLContext(canvas);

    if(!initShaders(ctx,VSHADER_SOURCE,FSHADER_SOURCE))
    {
        console.log("failed to read shaders");
    }

    ctx.clearColor(0,0,0,1.0);

    ctx.clear(ctx.COLOR_BUFFER_BIT);

    ctx.drawArrays(ctx.POINTS,0,1);

}
