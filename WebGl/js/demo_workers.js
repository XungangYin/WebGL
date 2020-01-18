var i =  0;

function timeCount() {
    i = i+1;
    postMessage(i);  // postMessage() 方法 - 它用于向 HTML 页面传回一段消息。
    setTimeout("timeCount()",1000);
}

timeCount();