function main() {
    //获取canvaa元素
    var canvas = document.getElementById("example");
    if (!canvas)
        console.log("Failed to read the <canvsa> element");

    //获取绘制上下文
    var ctx = canvas.getContext("2d");

    //绘制蓝色矩形kuang
    ctx.fillStyle = "rgba(0,0,255,1.0)";
    ctx.fillRect(120,10,150,150);
}