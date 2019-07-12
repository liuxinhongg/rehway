<template>
    <div class="persons">
        <div>
            <div class="sumperosn"><p>参加项目总人数：</p><p>{{sumperson}}</p></div>
            <div class="sumperosn"><p>到场人数：</p><p>{{attendancenum}}</p></div>
        </div>
        <!-- <div class="echartItem">
            <div id="Chartpie" :style="{width: '500px', height: '450px',}"></div>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            sumperson:454,
            attendancenum:390
        }
    },
    methods:{
        // drawLine() {
        //     // 基于准备好的dom，初始化echarts实例
        //     let Chartpie = this.$echarts.init(document.getElementById("Chartpie"));
        //     // 绘制图表
        //     Chartpie.setOption({
        //         title: {
        //             text: "在场人员",
        //             x: "center"
        //         },
        //         tooltip: {
        //             trigger: "item",
        //             formatter: "{a} <br/>{b} : {c} ({d}%)"
        //         },
        //         legend: {
        //             orient: "horizontal",
        //             left: "center",
        //             data: [
        //                 "",
        //                 "",
        //                 "",
        //                 "",
        //                 "钳工",
        //                 "砖工",
        //                 "卸货工",
        //                 "架子工",
        //                 "技术工"
        //             ]
        //         },
        //         series: [
        //             {
        //                 name: "访问来源",
        //                 type: "pie",
        //                 radius: "50%",
        //                 center: ["50%", "50%"],
        //                 data: [
        //                 { value: 80, name: "钳工" },
        //                 { value: 180, name: "砖工" },
        //                 { value: 50, name: "卸货工" },
        //                 { value: 96, name: "架子工" },
        //                 { value: 48, name: "技术工" }
        //                 ],
        //                 itemStyle: {
        //                 emphasis: {
        //                     shadowBlur: 10,
        //                     shadowOffsetX: 0
        //                 }
        //                 }
        //             }
        //         ]
        //     });
        // },
    },
    mounted(){
        // this.drawLine();
    }
}
</script>

<style lang="scss">
    .persons{
        width: 95%;
        margin: 20px auto;
        .sumperosn{
            display: flex;
            justify-content: flex-start;
            line-height: 40px;
            height: 40px;
            p:nth-child(1){
                width: 140px;
                text-align: right;
                font-weight: bold;
                font-size: 15px;
            }
            p:nth-child(2){
                color: #5e5e5e;
                font-weight: bold;
            }
        }
        .echartItem{
            width: 500px;
            margin: auto;
        }
    }
</style>
