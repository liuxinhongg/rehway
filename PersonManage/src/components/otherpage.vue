<template>
    <div class="otherpage">
        <el-scrollbar style="height:100%;">
            <div class="othertop">
                <div class="othertop_left">
                    <img src="../assets/images/logo.png" alt=""  style="height:35px;width:100%;">
                    <!-- <p class="otext">陕西建工基础工程集团有限公司</p> -->
                </div>
                <p class="smartpro">智慧工地项目</p>
                <p>
                    <img src="../assets/images/title1.svg" alt="" srcset="" style="height: 26px;">
                </p>
            </div>
            <div class="toptwo">
                <p class="empty" style="width:10%"></p>
                <div class="middlebanner">
                    <p class="oneop"></p>
                    <p class="twoop"></p>
                    <p class="threeop"></p>
                    <p class="fourop"></p>
                    <p class="fiveop"></p>
                    <el-carousel indicator-position="none" :autoplay="false" style="height:47px;margin-top:23px;padding:0 23px;" >
                        <el-carousel-item v-for="(item,index) in 1" :key="index" style="height:45px;">
                            <div class="itemone">
                                <p v-for="(itemone,index) in itemcontent" :key="index" class="square" @click="itemBtn(index)">{{itemone.desc}}</p>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="timeright" >
                    <p>{{timeoption.onetime}}</p>
                    <p>{{timeoption.twotime}}</p>
                </div>
            </div>
            <div class="othermain">
                <div class="main_left">
                    <div class="envir_top">
                        <p>环境检测<span style="font-size:12px;font-family:STFangsong;margin: 0 10px;">ENVIROMENTAL MONITORING</span> </p>
                        <p><img src="../assets/images/tiao.png" alt="" srcset=""> </p>
                    </div>
                    <div>
                        <div class="tabletop">
                            <p class="title">西安</p>  
                            <div class="smailtable">
                                <p>{{weatheritem.wea}}</p>
                                <p>
                                    <!-- <img src="../assets/images/bingbao.png" alt="" srcset="" class="sunImg">  -->
                                    <img :src="weatheritem.wea_img=='yun' ? '/diststatic/img/yun.14304d9.png' : weatheritem.wea_img=='yu' ? '/diststatic/img/yu.95fc9bb.png' :  
                                    weatheritem.wea_img=='qing'? '/diststatic/img/qing.c0ac22d.png':weatheritem.wea_img=='yin'?'/diststatic/img/yin.740e844.png':weatheritem.wea_img=='xue'?
                                    '/diststatic/img/xue.7817be8.png': weatheritem.wea_img=='lei'? '/diststatic/img/lei.47559d2.png':  weatheritem.wea_img=='shachen'?
                                    '/diststatic/img/shachen.8c55664.png':weatheritem.wea_img=='wu'?'/diststatic/img/wu.164a92e.png':'/diststatic/img/lei.47559d2.png' " alt="" srcset="" class="sunImg"> 
                                </p>
                                <p>{{weatheritem.tem2}} ~ {{weatheritem.tem1}} </p>
                            </div>
                        </div>
                        <div>
                            <div class="moreTable">
                                <div class="listItem">
                                    <p class="titleless">当前温度</p>
                                    <p class="lesstable">{{weatheritem.tem}}</p>  
                                </div>
                                <div class="listItem">
                                    <p class="titleless">风速（m/s）</p>
                                    <p class="lesstable">{{ weatheritem.win_speed }}</p>  
                                </div>
                            </div>
                            <div class="moreTable">
                                <div class="listItem">
                                    <p class="titleless">湿度</p>
                                    <p class="lesstable">{{weatheritem.humidity}}</p>  
                                </div>
                                <div class="listItem">
                                    <p class="titleless">风向</p>
                                    <p class="lesstable">{{weatheritem.win}}</p>  
                                </div>
                            </div>
                            <div class="moreTable">
                                <div class="listItem">
                                    <p class="titleless">空气质量(μg/m3)</p>
                                    <p class="lesstable">{{weatheritem.air}}</p>  
                                </div>
                                <div class="listItem">
                                    <p class="titleless">空气质量等级</p>
                                    <p class="lesstable">{{weatheritem.air_level}}</p>  
                                </div>
                            </div>
                        </div>
                        <div class="tabletop">
                            <p class="title">空气质量描述</p>  
                            <div class="smailtable" style="font-size: 14px;font-weight: bold;text-indent:2em;line-height:20px;">
                                {{weatheritem.air_tips}} 
                            </div>
                        </div>
                    </div>
                    <div class="tabletotal">
                        <p class="optabletop"></p>
                        <p class="optableright"></p>
                        <p class="optablebottom"></p>
                        <p class="optableleft"></p>
                        <div class="bigtable" v-for="(item,index) in watheroption" :key="index">
                            <p>{{item.day}}</p>
                            <p>{{item.date}}</p>
                            <p>    
                                <img :src="item.wea_img=='yun' ? '/diststatic/img/yun.14304d9.png' : item.wea_img=='yu' ? '/diststatic/img/yu.95fc9bb.png' :  
                                    item.wea_img=='qing'? '/diststatic/img/qing.c0ac22d.png':item.wea_img=='yin'?'/diststatic/img/yin.740e844.png':item.wea_img=='xue'?
                                    '/diststatic/img/xue.7817be8.png': item.wea_img=='lei'? '/diststatic/img/lei.47559d2.png':  item.wea_img=='shachen'?
                                    '/diststatic/img/shachen.8c55664.png':item.wea_img=='wu'?'/diststatic/img/wu.164a92e.png':'/diststatic/img/lei.47559d2.png' " alt="" srcset="" class="sunImg"> 
                            </p>
                            <p>{{item.weather}}</p>
                            <p>{{item.tem}}~{{item.tem2}}</p>
                        </div>
                    </div>
                </div>
                <div class="main_middle">
                    <div class="tv_top">
                        <p>视频监控<span style="font-size:12px;font-family:STFangsong;margin: 0 10px;">VIDEO SURVEILLANCE</span> </p>
                        <p><img src="../assets/images/tiao.png" alt="" srcset=""> </p>
                    </div>
                    <div class="middle_box">
                        <p class="optabletop"></p>
                        <p class="optableright"></p>
                        <p class="optablebottom"></p>
                        <p class="optableleft"></p>
                        <div class="tvcontent">
                            <p>
                                <img src="../assets/images/one.jpg" alt="" srcset="">
                            </p>
                            <p>
                                <img src="../assets/images/two.jpg" alt="" srcset="">
                            </p>
                            <p>
                                <img src="../assets/images/three.jpg" alt="" srcset="">
                            </p>
                            <p>
                                <img src="../assets/images/four.jpg" alt="" srcset="">
                            </p>
                            <p>
                                <img src="../assets/images/oth-five.jpg" alt="" srcset="">                                
                            </p>
                            <p>
                                <img src="../assets/images/six.jpg" alt="" srcset="">                                
                            </p>
                            <p>
                                <img src="../assets/images/seven.jpg" alt="" srcset="">                                
                            </p>
                            <p>
                                <img src="../assets/images/eight.jpg" alt="" srcset="">                                
                            </p>
                            <p>
                                <img src="../assets/images/nine.jpg" alt="" srcset="">                                
                            </p>
                        </div>
                    </div>
                </div>
                <div class="main_right">
                    <div class="main_right_top">
                        <div class="tv_top">
                            <p>人员动态<span style="font-size:12px;font-family:STFangsong;margin: 0 10px;">PERSONNEL DYNAMIC</span> </p>
                            <p><img src="../assets/images/tiao.png" alt="" srcset=""> </p>
                        </div>
                        <div class="personnum">
                            <div class="personItem" v-for="(item,index) in persondymatic" :key="index">
                                <p class="descperson">{{item.personstatus}}</p>
                                <div class="countnum">
                                    <p class="countopone"></p>
                                    <p class="countoptwo"></p>
                                    <p class="countopthree"></p>
                                    <p class="countopfour"></p>
                                    {{item.personnum}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main_right_bottom">
                        <div class="tv_top" style="margin-top:30px;">
                            <p>水电检测<span style="font-size:12px;font-family:STFangsong;margin: 0 10px;">HYDROPOWER DETECTION</span> </p>
                            <p><img src="../assets/images/tiao.png" alt="" srcset=""> </p>
                        </div>
                        <div class="echartItem">
                            <div id="Chartsquera" :style="{width: '100%', height: '290px',marginTop: '-20px'}"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="otherBottom">
                <div class="bottomItem">
                    <div class="smog_test">
                        <p>烟雾感应<span style="font-size:12px;font-family:STFangsong;margin: 0 10px;">SMOKE INDUCTION</span> </p>
                        <p><img src="../assets/images/tiao.png" alt="" srcset=""> </p>
                    </div>
                    <div id="chartcategory" :style="{width: '100%', height: '290px',marginTop: '-20px'}"></div>
                </div>
                <div class="bottomItem">
                    <div class="smog_test">
                        <p>标养室检测<span style="font-size:12px;font-family:STFangsong;margin: 0 10px;">STANDARD ROOM DETECTION</span> </p>
                        <p><img src="../assets/images/tiao.png" alt="" srcset=""> </p>
                    </div>
                    <div id="categoryzone" :style="{width: '100%', height: '290px',marginTop: '-20px'}"></div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data(){
        return{
            weatheritem:{},
            watheroption:[],
            itemcontent:[
                { desc:'人事管理',id:1 },
                { desc:'项目管理',id:2, },
                { desc:'设备管理',id:3, },
                { desc:'质量管理',id:4, },
                { desc:'安全管理',id:5, },
                { desc:'物资管理',id:6, },
                { desc:'物联网',id:7, },
                { desc:'视频管理',id:8 },
            ],
            timeoption:{
                onetime:'',
                twotime:'',
            },
            timer: null,
            weather:[
                {todaytime:'今天',datetime:'4月16日',weather:'晴',temperature:'18°C ~ 29°C'},
                {todaytime:'明天',datetime:'4月17日',weather:'晴',temperature:'19°C ~ 27°C'},
                {todaytime:'后天',datetime:'4月18日',weather:'晴',temperature:'17°C ~ 26°C'},
            ],
            persondymatic:[
                {personstatus:'在场人数',personnum:'654'},
                {personstatus:'现场人数',personnum:'339'},
                {personstatus:'今日出勤人数',personnum:'287'},
                {personstatus:'刷卡率',personnum:'654'},
            ]
        }
    },
    methods:{
        // 左侧天气的数据获取
        getweather(){
            this.$http.post('https://www.tianqiapi.com/api/?version=v1').then(res=>{
                this.weatheritem=res.data.data[0];
                this.watheroption=res.data.data.slice(0, 3);
                console.log(this.watheroption);
                this.weatheritem.win=res.data.data[0].win.join('~')
            })
        },
        itemBtn(status){
            console.log(status);
            this.$router.push({path:'/login?id='+status});
        },
        getTime(){
            this.$http.post('http://quan.suning.com/getSysTime.do').then(res=>{
                // console.log(res);
                this.timeoption=res.data;
                if(!!res.data.sysTime2){
                    this.timeoption.onetime=res.data.sysTime2.substring(0,10); 
                    this.timeoption.twotime=res.data.sysTime2.substring(11); 
                }
            })
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let Chartline = this.$echarts.init(document.getElementById("Chartsquera"));
            Chartline.setOption({
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    splitLine:{
                　　　　show:false
                　　},
                    type: 'category',
                    axisLabel: {
                        show: true,
                        textStyle: {
                        color: '#ccc',  //更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#51CCDC' //更改坐标轴颜色
                        }
                    },
                    data: ['4-10','4-11','4-12','4-13','4-14','4-15','4-16','4-17']
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 150,
                    axisLabel: {
                        show: true,
                        textStyle: {
                        color: '#ccc',  //更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#51CCDC' //更改坐标轴颜色
                        },
                    },
                },
                series: [
                    {
                        name:'邮件营销',
                        type:'line',
                        lineStyle:{  
                            normal:{
                                color:'#3BAABD',
                                width:2,
                                show: false
                            }
                       },
                        data:[120, 121, 116, 140, 135, 130, 120,70]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        lineStyle:{  
                            normal:{
                                color:'#EDB57C',
                                width:2
                            }
                        },
                        data:[110, 109, 112, 125, 130, 120, 130,65]
                    },
                ]
            })
        },
        category(){
            let ChartCategory = this.$echarts.init(document.getElementById("chartcategory"));
            ChartCategory.setOption({
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '1%',
                    containLabel: true
                },
                 xAxis: {
                    type: 'category',
                    axisLabel: {
                        show: true,
                        textStyle: {
                        color: '#ccc',  //更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#51CCDC' //更改坐标轴颜色
                        }
                    },
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    splitLine:{ show:false },
                    axisLabel: {
                        show: true,
                        textStyle: {
                        color: '#ccc',  //更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#51CCDC' //更改坐标轴颜色
                        }
                    },
                    type: 'value'
                },
                series: [{
                    areaStyle: {normal: {}},
                    itemStyle:{
                        normal:{
                            label: {
                                show: false,
                                textStyle: {
                                    color: '#e6b459'
                                }
                            },
                            barBorderColor:'#e6b459',
                            color:'#a7e9f7'//折线图区域的颜色
    
                        },
                        emphasis:{
                            color:'white'
                        }
                    },
                     lineStyle:{  
                        normal:{
                            color:'#29DBFF',//折线图的颜色
                            width:2,
                            show: false
                        }
                    },
                    data: [0.2, 0.16, 0.2, 0.3, 0.33, 0.43, 0.6],
                    type: 'line',
                    areaStyle: {}
                }]
            })
        },
        categzone(){
            let CategoryZone = this.$echarts.init(document.getElementById("categoryzone"));
            CategoryZone.setOption({
                grid: {
                    // left: '2%',
                    right: '4%',
                    bottom: '1%',
                    containLabel: true
                },
                 xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        show: true,
                        textStyle: {
                        color: '#ccc',  //更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#51CCDC' //更改坐标轴颜色
                        }
                    },
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    splitLine:{ show:false },
                    axisLabel: {
                        show: true,
                        textStyle: {
                        color: '#ccc',  //y轴颜色更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#51CCDC' //更改坐标轴颜色
                        }
                    },
                    type: 'value'
                },
                series: [{
                    areaStyle: {normal: {}},
                    itemStyle:{
                        normal:{
                            label: {
                                show: false,
                                textStyle: {
                                    color: '#e6b459'
                                }
                            },
                            barBorderColor:'#e6b459',
                            color:'#a7e9f7'//折线图区域的颜色
    
                        },
                        emphasis:{
                            color:'white'
                        }
                    },
                     lineStyle:{  
                        normal:{
                            color:'#29DBFF',//折线图的颜色
                            width:2,
                            show: false
                        }
                    },
                    data: [20, 17, 19, 20, 23, 22, 20],
                    type: 'line',
                    areaStyle: {}
                }]
            })
        }
    },
    mounted(){
        this.drawLine();
        this.category();
        this.categzone();
        // 左侧天气的数据获取
        this.getweather();
        this.timer = setInterval(this.getTime, 1000);
    },
    created(){
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
}
</script>

<style lang="scss">
.otherpage{
    width: 100%;
    height: calc(100vh);
    padding: 0 20px;
    background-image: url("../assets/images/back.jpg");
    .othertop{
        width: 100%;
        height: 50px;
        // border-bottom: 0.5px solid #00f;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .othertop_left{
            width: auto;
            height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .leftImg{
                width: 45px;
                border-radius: 45%;
            }
            .otext{
                font-size: 20px;
                color: #fff;
                font-weight: bold;
                margin-left: 20px;
            }
        }
        .smartpro{
            font-weight: bold;
            font-size: 24px;
            margin-left: -15%;
            color: #29DBFF;
        }
    }
    .toptwo{
        width: 100%;
        padding: 0 20px;
        height: 75px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .middlebanner{
            width: 75%;
            height: 80px;
            position: relative;
            .oneop{
                height: 15px;
                width: 20px;
                position: absolute;
                top:10px;
                left: 0;
                border-top: 2px solid #9EA7AE;
                border-left: 2px solid #9EA7AE;
            }
            .twoop{
                height: 15px;
                width: 20px;
                position: absolute;
                bottom:0;
                left: 0;
                border-bottom: 2px solid #9EA7AE;
                border-left: 2px solid #9EA7AE;
            }
            .threeop{
                height: 15px;
                width: 20px;
                position: absolute;
                top:10px;
                right: 0;
                border-top: 2px solid #9EA7AE;
                border-right: 2px solid #9EA7AE;
            }
            .fourop{
                height: 15px;
                width: 20px;
                position: absolute;
                bottom:0px;
                right: 0;
                border-bottom: 2px solid #9EA7AE;
                border-right: 2px solid #9EA7AE;
            }
            .itemone{
                height: 45px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .square{
                    width: 172px;
                    height: 20px;
                    line-height: 20px;
                    color: #ccc;
                    font-size: 14px;
                    text-align: center;
                    border-right: 1px solid #2F343A;
                    cursor: pointer;
                    &:last-child{
                        border: none;
                    }
                    &:hover{
                        color: #55B0C2;
                        font-weight: bold;
                    }
                }
            }
            .el-carousel__container{
                height:45px;
                background: #000;
                border: 2px solid #253942;
            }
        }
        .timeright{
            width: 10%;
            height: 45px;
            text-align: center;
            color: #51CCDC;
            font-size: 17px;
            font-weight: bold;
        }
    }
    .othermain{
        width: 100%;
        height: auto;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .main_left{
            width: 33%;
            .envir_top{
                width: 100%;
                background: #000;
                font-family: '微软雅黑';
                font-size: 16px;
                color: #29DBFF;
                display: flex;
                justify-content: space-between;
            }
            .tabletop{
                width: 95%;
                height:45px;
                margin-top: 20px;
                display: flex;
                justify-content: flex-start;
                .title{
                    width: 110px;
                    line-height: 40px;
                    color: #ccc;
                    font-size: 16px;
                    text-align: right;
                }
                .smailtable{
                    width: 78%;
                    height: 40px;
                    margin-left: 21px;
                    color: #29DBFF;
                    line-height: 40px;
                    background: #303940;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p{
                        width: 30%;
                        text-align: center;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .sunImg{
                        width: 25px;
                        // height: 25px;
                        // border-radius: 50%;
                    }
                }
            }
            .moreTable{
                width: 95%;
                margin-top: 10px;
                display: flex;
                justify-content: flex-start;
                .listItem{
                    width: 50%;
                    display: flex;
                    justify-content: flex-start;
                    .titleless{
                        width: 120px;
                        line-height: 35px;
                        color: #ccc;
                        font-size: 14px;
                        text-align: right;
                        // background: #f00;
                    }
                    .lesstable{
                        width: 55%;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                        font-weight: bold;
                        margin-left: 15px;
                        font-size: 15px;
                        color: #29DBFF;
                        background: #303940;
                    }
                }
                
            }
        }
        .main_middle{
            width: 33%;
            // border: 1px solid #fff;
            .tv_top{
                width: 100%;
                background: #000;
                font-family: '微软雅黑';
                font-size: 16px;
                color: #29DBFF;
                display: flex;
                justify-content: space-between;
            }
            .middle_box{
                height: 430px;
                margin-top: 20px;
                padding: 5px;
                border-left: 1px solid #8B9096;
                border-right: 1px solid #8B9096;
                position: relative;
            }
            .tvcontent{
                width: 100%;
                height: 100%;
                padding: 3px;
                border: 1px solid #5e5e5e;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                p{
                    width: 33%;
                    height: 135px;
                    top:0px;
                    margin: auto;
                    border: 1px solid #fff;
                    img,video{
                        width: 100%;
                        height: 135px;
                    }
                }
            }
            .optabletop{
                position: absolute;
                width: 20px;
                height: 24px;
                top: -10px;
                border-left: 2px solid #8B9096;
                left: 4px;
                transform: rotate(60deg);
            }
            .optableright{
                position: absolute;
                width: 24px;
                height: 24px;
                top: -10px;
                border-top: 2px solid #8B9096;
                right: 3px;
                transform: rotate(35deg);
            }
            .optablebottom{
                position: absolute;
                width: 24px;
                height: 24px;
                bottom: -12px;
                border-bottom: 2px solid #8B9096;
                left: 3px;
                transform: rotate(45deg);
            }
            .optableleft{
                position: absolute;
                width: 24px;
                height: 24px;
                bottom: -12px;
                border-right: 2px solid #8B9096;
                right: 3px;
                transform: rotate(45deg);
            }
        }
        .main_right{
            width: 33%;
            // border: 1px solid #ccc;
            .tv_top{
                width: 100%;
                background: #000;
                font-family: '微软雅黑';
                font-size: 16px;
                color: #29DBFF;
                display: flex;
                justify-content: space-between;
            }
            .main_right_top{
                width: 100%;
                .personnum{
                    width: 100%;
                    display: flex;  
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    .personItem{
                        width: 50%;
                        margin-top: 20px;
                        display: flex;
                        justify-content: flex-start;
                        .descperson{
                            width: 120px;
                            text-align: right;
                            font-size: 14px;
                            line-height: 40px;
                            color: #ccc;
                            text-align: center;

                        }
                        .countnum{
                            width: 80px;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            font-size: 20px;
                            color: #fff;
                            border-bottom: 2px solid #273037;
                            position: relative;
                            .countopone{
                                width: 17px;
                                height: 10px;
                                border-bottom:2px solid #fff; 
                                position: absolute;
                                bottom: -1px;
                                left: 0;
                            }
                            .countoptwo{
                                width: 17px;
                                height: 10px;
                                border-bottom:2px solid #fff; 
                                position: absolute;
                                bottom: -1px;
                                right: 0;
                            }
                            .countopthree{
                                width: 30px;
                                height: 35px;
                                border-right: 2px solid #273037;
                                position: absolute;
                                transform: rotate(45deg);
                                bottom: 5px;
                                right: -17px;
                            }
                            .countopfour{
                                width: 5px;
                                height: 5px;
                                border-radius: 50%;
                                border: 1px solid #fff;
                                position: absolute;
                                top: 10px;
                                right: -26px;
                            }
                        }
                    }
                }
            }
            .main_right_bottom{
                width: 100%;
            }
        }
    }
    .tabletotal{
        width: 100%;
        margin-top: 40px;
        padding: 1px 20px 15px 20px;
        position: relative;
        border-left: 2px solid #8B9096;
        border-right: 2px solid #8B9096;
        .optabletop{
            position: absolute;
            width: 20px;
            height: 24px;
            top: -10px;
            border-left: 2px solid #8B9096;
            left: 4px;
            transform: rotate(60deg);
        }
        .optableright{
            position: absolute;
            width: 24px;
            height: 24px;
            top: -10px;
            border-top: 2px solid #8B9096;
            right: 3px;
            transform: rotate(35deg);
        }
        .optablebottom{
            position: absolute;
            width: 24px;
            height: 24px;
            bottom: -12px;
            border-bottom: 2px solid #8B9096;
            left: 3px;
            transform: rotate(45deg);
        }
        .optableleft{
            position: absolute;
            width: 24px;
            height: 24px;
            bottom: -12px;
            border-right: 2px solid #8B9096;
            right: 3px;
            transform: rotate(45deg);
        }
        .title{
            width: 120px;
            line-height: 40px;
            color: #ccc;
            font-size: 16px;
            text-align: right;
            // background: pink;
        }
        .bigtable{
            width: 100%;
            height: 40px;
            padding: 0 10px;
            margin-top: 10px;
            color: #8B9096;
            line-height: 40px;
            background: #303940;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
                // width: 20%;
                // text-align: center;
                font-size: 15px;
                font-weight: bold;
            }
            .sunImg{
                width: 25px;
                // height: 25px;
                // border-radius: 50%;
            }
            &:nth-child(1){
                margin-top: 0px;
            }
        }
    }
    .otherBottom{
        width: 100%;
        display: flex;
        height: 300px;
        justify-content: space-between;
        margin-top: 30px;
        .bottomItem{
            width: 48%;
            .smog_test{
                width: 100%;
                background: #000;
                font-family: '微软雅黑';
                font-size: 16px;
                color: #29DBFF;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}
</style>