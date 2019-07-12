export default function (num){
    //36472647357344
    //2018-09-10 12:00:00
    var date = new Date(num);
    var year = date.getFullYear();
    var month=date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1;
    var day = date.getDate()<10?'0'+date.getDate():date.getDate();
    var hour=date.getHours()<10?'0'+date.getHours():date.getHours();
    var minute=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes(); 
    var second=date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}