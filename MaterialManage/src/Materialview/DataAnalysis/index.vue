<template>
  <div style="padding:50px;0px;height:100%;">
    <el-scrollbar style="height:100%;overflow-x: hidden;">
      <el-form :inline="true" class="demo-form-inline">
        <el-date-picker v-model="value1" type="year" placeholder="根据年份查询"></el-date-picker>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="echartItem">
        <div id="Chartradar" :style="{width: '500px', height: '300px'}"></div>
      </div>
      <div class="echartItem">
        <div id="entrance" :style="{width: '500px', height: '300px'}"></div>
      </div>
      <div class="echartItem">
        <div id="retrieval" :style="{width: '500px', height:'300px'}"></div>
      </div>
      <div class="echartItem">
        <div id="supplier" :style="{width:'500px', height:'300px'}"></div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>

import * as material from "@/api/material.js";
import * as dictapi from "@/api/dictapi.js";
export default {
  data() {
    return {
      value1: 1546272000000,
    };
  },
  methods: {
    onSubmit() {
      this.selectdate()
    },
    drawTradar() {
      let Chartradar = this.$echarts.init(
        document.getElementById("Chartradar")
      );
      Chartradar.setOption({
        title: {
          text: "合同金额统计(元)"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [452, 523, 432, 632, 562, 478, 996, 545, 332, 126, 152, 562],
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          }
        ]
      });
    },
    entrance() {
      let Entrance = this.$echarts.init(document.getElementById("entrance"));
      Entrance.setOption({
        title: {
          text: "入厂验收统计"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          //   boundaryGap: false,
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          }
        ]
      });
    },
    retrieval() {
      let retrieval = this.$echarts.init(document.getElementById("retrieval"));
      retrieval.setOption({
        title: {
          text: "出库统计"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 152, 541, 556, 441, 222],
            type: "bar"
          }
        ]
      });
    },
    supplier() {
      let supplier = this.$echarts.init(document.getElementById("supplier"));
      supplier.setOption({
        title: {
          text: "供应商数据分析"
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
           data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            step: "start",
            data: [120, 132, 101, 134, 90, 230, 210,536,541,125,563,125]
          }
        ]
      });
    },
    selectdate(){
      let datatime = ''
      if(typeof(this.value1)!='number'){
        datatime = this.value1.getTime();
      }else{
        datatime = this.value1;
        console.log(datatime)
      }
      // 供应商
      this.$http.get(material.mprovidersselectms,{params:{dateTime:datatime}}).then(res=>{
        console.log(res);
      })
      // 合同金额统计
      this.$http.get(material.mcontractgetContractSumMoney,{params:{bDateTime:datatime}}).then(res=>{
        console.log(res);
      })

    }
  },
  mounted() {
    this.selectdate()
    this.drawTradar();
    this.entrance();
    this.retrieval();
    this.supplier();
  }
};
</script>
<style>
.echartItem {
  float: left;
  padding: 0 2%;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
