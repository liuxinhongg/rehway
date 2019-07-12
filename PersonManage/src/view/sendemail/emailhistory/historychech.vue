<template>
    <div>
        <div class="testcontent">
            <el-form  label-width="120px">
                <el-form-item label="名称："><span>刘新红</span></el-form-item>
                <el-form-item label="收件人："><span>lingo@rhway.com</span></el-form-item>
                <el-form-item label="抄送："><span> </span></el-form-item>
                <el-form-item label="暗送："><span> </span></el-form-item>
                <el-form-item label="标题："><span>陕西睿合科技有限公司 </span></el-form-item>
                <el-form-item label="状态："><span>正常</span></el-form-item>
                <el-form-item>
                    <el-button @click="backreturn">返回</el-button>
                </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        sendback(){
            this.$router.push({path:'/project/test-send-back'});
        }
    }
}
</script>

<style>
.testcontent{
    width: 90%;
    margin: auto;
    padding: 20px;
    margin: 30px;
}
</style>
