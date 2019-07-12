<template>
    <div>
        <el-form :model="kqform" label-width="120px" ref="kqform" :rules="tiomkq" style="width:41%;margin-top:40px;">
            <el-form-item label="开始时间：" style="margin-left:40px;" prop="startTime">
                <el-time-select placeholder="起始时间" v-model="kqform.startTime" 
                    :picker-options="{ start: '08:30', step: '01:00', end: '18:30' }">
                </el-time-select> <span style="margin:0 15px;">至</span>
                <el-time-select placeholder="结束时间" v-model="kqform.endTime"
                    :picker-options="{ start: '09:00',  step: '01:00', end: '24:00', minTime: kqform.startTime }">
                </el-time-select>
            </el-form-item>
            <el-form-item label="时间误差：" style="margin-left:40px;" prop="timelength" >
                <el-select type="text" v-model="kqform.timelength" style="width:90%;">
                    <el-option v-for="(item,index) in timeoption" :key="index" :label="item.timeat" :value="item.timeat"></el-option>
                </el-select><span>(分钟)</span>
            </el-form-item>
            <el-form-item style="text-align:center;">
            <el-button type="primary" @click="suretime('kqform')">确定</el-button>
            <el-button @click="cancle">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            kqform:{
                startTime:'',
                endTime:'',
                timelength:'',
            },
            tiomkq:{
                startTime:[ { required: true, message: '请选择开始时间', trigger: 'change' }],
                // endTime:[ { required: true, message: '请选择结束时间', trigger: 'change' }],
                timelength:[ {  required: true, message: '请选择误差时间', trigger: 'change'}],
            },
            kqrouterId:0,
            timeoption:[
                {timeat:'00:00'},
                {timeat:'10:00'},
                {timeat:'15:00'},
                {timeat:'20:00'},
                {timeat:'30:00'},
            ]
        }
    },
    methods:{
        suretime(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    let kqtime=new FormData();
                    kqtime.append('clockTime',this.kqform.startTime),
                    kqtime.append('closeTime',this.kqform.endTime),
                    kqtime.append('timeLength',this.kqform.timelength),
                    this.$http.post('/api/clockConfig/insert',kqtime).then(res=>{
                        console.log(res);
                        if(res.data.result="success"){
                            this.$router.push('/project/menu');
                        }else{
                            this.$message.error('新增考勤时间失败');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancle(){
            this.$router.push('/project/menu')
        }
    },
    mounted(){
    }
}
</script>

<style>

</style>
