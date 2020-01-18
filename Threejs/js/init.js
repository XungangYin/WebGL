function init3D() {
    var ismouseDown,interval;
    var button = 0;

    $("#toolbar img") //jquery语法
        .mouseenter(function (e) {  //.mouseenter函数是jQuery自带函数，表示鼠标穿过上述元素(#toolbar img)时候,引发functio函数
            id = $(this).attr("id"); //attr方法，设置或返回被选元素的属性值
            if(!ismouseDown)
                $(this).css("opacity","0.8");
            else $(this).css("opacity","1.0");
        })
        .mouseout (function e() {
            clearInterval(interval);
            $(this).css("opacity","0.5");
        })
        .mousedown(function(e) {
            id = $(this).attr('id');
            ismousedown = true;
            if(e.button==button){
                actionsToolbar(id);
                if(id == "zoomin" || id == "zoomout"){
                    interval = setInterval(function(){  //setInterval周期性的调用函数或者代码，延迟时间为100ms
                        actionsToolbar(id);
                    }, 100);
                }
                else {
                    clearInterval(interval);
                }
                $(this).css("opacity","1.0");
                button=0;
            }
        })
        .mouseup(function(e) {
            ismousedown = false;
            if(e.button==button){
                clearInterval(interval);
                $(this).css("opacity","0.8");
                button=0;
            }
        })
        .on('touchstart', function(e) {
            button=2;
        })
        .on('touchend', function(e) {
            button=0;
        });
}

function measureSwitch(on)
{

}

Tool = function () {
    function zoomin() {
        
    }
}