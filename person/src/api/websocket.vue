<template>
    <div>

    </div>
</template>

<script>
export default {
    methods:{
        getConfigResult (res) {
            // 接收回调函数返回数据的方法
            console.log(res)
        },
        websocketToLogin () {
            // 【agentData：发送的参数；this.getConfigResult：回调方法】
            this.socketApi.sendSock(getPlaceRevenue, this.getConfigResult)
        }
    },
    mounted(){
        // this.socketApi.sendSock(agentData,this.getConfigResult );   
    }
}
</script>

<style>

</style>
