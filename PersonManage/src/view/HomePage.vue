/*********************************************
 * @function: 项目项目的首页
 * @Author: 刘新红 
 * @Date: 2019-03-05
 *********************************************/
<template>
  <div>
    <v-header></v-header>
    <div class="mainconten">
      <left></left>
      <div class="middlecontent">
        <div class="middleTop">
          <div class="echartItem">
            <div id="Chartpie" :style="{width: '350px', height: '350px',}"></div>
          </div>
          <div class="echartItem">
            <div id="Chartbar" :style="{width: '350px', height: '300px',}"></div>
          </div>
          <div class="echartItem">
            <div id="Chartradar" :style="{width: '350px', height: '300px'}"></div>
          </div>
        </div>
        <div class="bottomhome">
          <div class="dowmleft">
            <el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="200"></el-table-column>
              <el-table-column prop="address" label="地址" width="260"></el-table-column>
              <el-table-column prop="status" label="工种"></el-table-column>
            </el-table>
          </div>
          <div class="dowmRight">
            <baidu-map class="map" center="西安" :zoom="zoom" @ready="handler" v-if="choose==0"> 
              <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            </baidu-map>
            <div class="map" v-if="choose==1">
              <video-player ref="playerObj"></video-player>
              <a @click="playVideo">播放视频</a>
              
              <!-- <video id="video" width="480" height="320" controls>
              </video>
              <div>
                <button id="capture">拍照</button>
              </div>
              <canvas id="canvas" width="480" height="320"></canvas> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import '../filter/videa.js' 
import HeadTop from "../components/common/HeadTop";
import left from "../components/common/homeLeft";
import VideoPlayer from "../components/common/videoplayer";
export default {
  data() {
    return {
      choose:0,
      styleJson:'',
      center: {lng: 0, lat: 0},
      zoom: 3,
      autoLocationPoint: {lng: 0, lat: 0},
      initLocation: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: "土建"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          status: "土建"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          status: "土建"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          status: "土建"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          status: "土建"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: "土建"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          status: "土建"
        }
      ]
    };
  },
  components: {
    "v-header": HeadTop,
    left,
    VideoPlayer
    // BMapComponent
  },
  methods: {
        tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
     handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    },
    playVideo() {
        this.$refs['playerObj'].videoSrc = 'rtmp://xxxxxxxx'//播放视频的地址
        this.$refs['playerObj'].playerOptions.sources[0].src = 'rtmp://xxxxxxxx' //选择视频播放的资源
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let Chartpie = this.$echarts.init(document.getElementById("Chartpie"));
      // 绘制图表
      Chartpie.setOption({
        title: {
          text: "某站点用户访问来源",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "center",
          data: [
            "",
            "",
            "",
            "",
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "40%",
            center: ["45%", "55%"],
            data: [
              { value: 405, name: "直接访问" },
              { value: 410, name: "邮件营销" },
              { value: 334, name: "联盟广告" },
              { value: 465, name: "视频广告" },
              { value: 848, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0
                // shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    drawLpie() {
      // 基于准备好的dom，初始化echarts实例
      let Chartbar = this.$echarts.init(document.getElementById("Chartbar"));
      // 绘制图表
      Chartbar.setOption({
        title: { text: "在Vue中使用echarts", x: "center" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "袜子", "鞋子"]
        },
        yAxis: { max: 30 },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 28, 10, 18, 30]
            // barCateGoryGap:'60%',
          }
        ]
      });
    },
    drawTradar() {
      let Chartradar = this.$echarts.init(
        document.getElementById("Chartradar")
      );
      Chartradar.setOption({
        title: {
          text: "基础雷达图",
          x: "center"
        },
        tooltip: {},
        legend: {
          data: ["", "", "", "预算分配", "实际开销"]
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [2, 5]
            }
          },
          indicator: [
            { name: "销售", max: 6500 },
            { name: "管理", max: 16000 },
            { name: "信息技术", max: 30000 },
            { name: "客服", max: 38000 },
            { name: "研发", max: 52000 },
            { name: "市场", max: 25000 }
          ],
          radius: 60
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配"
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "实际开销"
              }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    //当页面刚打开时，请求后台的接口，来渲染页面
    // this.video();
    this.drawLine();
    this.drawLpie();
    this.drawTradar();
    // this.getUserMedia();
    // this.videosystem();
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.mainconten {
  width: 100%;
  height: calc(100vh - 55px);
  overflow: hidden;
  background: #6b6b6b;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  .middlecontent {
    margin: 10px;
    width: 100%;
    height: 98%;
    background: pink;
    margin: 10px;
    .middleTop {
      width: 100%;
      height: 560px;
      padding-top: 10px;
      background: #868686;
      .echartItem {
        width: 25%;
        height: 400px;
        float: left;
        margin-left: 5%;
        text-align: center;
      }
    }
    .bottomhome {
      width: 100%;
      flex: 1;
      display: flex;
      justify-content: flex-start;
      .dowmleft {
        width: 60%;
        height: 100%;
        padding: 20px;
        background: #5e5e5e;
      }
      .dowmRight {
        height: 80%;
        flex: 1;
      }
    }
  }
}
.map {
  width: 100%;
  height: 335px;
}
</style>
<style>
.middlecontent .bottomhome .dowmleft .el-table th {
  background: #5e5e5e;
}
.middlecontent .bottomhome .dowmleft .el-table tr {
  background: #5e5e5e;
}
.middlecontent .bottomhome .dowmleft .el-table {
  color: #158607;
}
</style>