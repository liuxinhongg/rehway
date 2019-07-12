var websocket = null;
var global_callback = null;
var serverPort = '8081';
function getWebIp(){
    // location.hostname不包括端口号
    // location.host 包含端口(端口是80的话，就不显示)
    // var curIp = window.location.hostname;
    var curIp = '192.168.3.114';
    return curIp;

}
// 初始化websocket
function initWebSocket(){
    //地址
    var wsuri = "http://" + getWebIp() + serverPort;
    websocket = new WebSocket(wsuri);
    webSocket.onmessage = function(e){
        websocketonmessage(e);//接收数据
    }
    websocket.onclose = function(e){
        websocketclose(e);//关闭
    }
    websocket.onopen = function(){
        websocketOpen();//链接
    }
    // 链接错误的回调函数
    websocket.onerror = function(){
        console.log('websocket链接失败');
    }
}
//实际调用的方法
function sendSock(agentData,callback){
    global_callback = callback;
    if(websocket.readyState === websocket.OPEN ){// 若是ws是开启状态
        websocketsend(agentData);
    }else if(websocket.readyState === websocket.CONNECTING){//若是正在开启状态
        // 等待1s后重新调用
        setTimeout(function(){
            sendSock(agentData,callback);
        },1000);
    }else{// 若未开启
        // 等待1s后重新调用
        setTimeout(function(){
            sendSock(agentData,callback);
        },1000)
    }
}
//接收数据
function websocketonmessage(e){
    global_callback(JSON.parse(e.data));
}
//数据发送
function websocketsend(agentData){
    websocket.send(JSON.stringify(agentData));
}
//关闭
function websocketclose(e){
    console.log('connection closed (' + e.code + ')');
}
//链接
function websocketOpen(e){
    console.log('链接成功');
}
initWebSocket();
export{
    sendSock
}