<template>
    <div>
        <div class="testcontent">
            <el-form  label-width="120px">
                <el-form-item label="名称："><span>刘新红</span></el-form-item>
                <el-form-item label="发件人："><span>测试@qq.com</span></el-form-item>
                <el-form-item label="收件人："><span>lingo@rhway.com</span></el-form-item>
                <el-form-item label="抄送："><span> </span></el-form-item>
                <el-form-item label="暗送："><span> </span></el-form-item>
                <el-form-item label="标题："><span>陕西睿合科技有限公司 </span></el-form-item>
                <el-form-item label="内容："><span>陕西睿合科技有限公司 搜if后iwe</span></el-form-item>
                <el-form-item label="SMTP服务器：">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option>default</el-option>
                        <el-option>frist</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sendback">发送测试文件</el-button>
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
        backreturn(){
            this.$router.push({path:'/project/sendemail'});
        },
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
