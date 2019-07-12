<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent  ref="saftplanform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">安全计划制定人：</td>
                        <td>
                            <el-form-item prop="workerId">
                            <el-select v-model="saftplanform.workerId" style="width:280px">
                                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                </el-option>
                            </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">计划主题：</td>
                        <td>
                            <el-form-item prop="title">
                                <el-input v-model="saftplanform.title" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">计划内容：</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input v-model="saftplanform.planCont" type="textarea" :rows="2" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">计划方法：</td>
                        <td colspan="3">
                            <el-form-item>
                                <el-input v-model="saftplanform.planMethod" type="textarea" :rows="2" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">计划目的：</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input v-model="saftplanform.planDest" type="textarea" :rows="2" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-button type="primary" native-type="submit" @click="saftplansubmit('saftplanform')">提交</el-button>
                        </td>
                        <td colspan="2">
                            <el-button @click="backForm('saftplanform')">返回</el-button>
                        </td>
                    </tr>
                </table>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data(){
        return{
            saftplanform:{
                title:'',
                workerId:'',
                planCont:'',
                planMethod:'',
                planDest:'',
            },
            personoption:[],
            useryz:{
                workerId:[{required: true,message: "请选择上传员工",trigger: "change"}],           
                title:[{required: true,message: "请输入计划主题",trigger: "blur"}],
            },
            saftplanId:0,
        }
    },
    methods:{
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let ajform=new FormData();
                    ajform.append('workerId',this.saftplanform.workerId)
                    ajform.append('title',this.saftplanform.title)
                    ajform.append('planCont',this.saftplanform.planCont)
                    ajform.append('planMethod',this.saftplanform.planMethod)
                    ajform.append('planDest',this.saftplanform.planDest)
                    if(this.saftplanId==0){
                        this.$http.post('/api/risk_plan/insert',ajform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/saftmanage/saftplan');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        ajform.append('id',this.saftplanId)
                        this.$http.post('/api/risk_plan/update',ajform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/saftmanage/saftplan');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }
                } else {
                    this.$message.error('提交数据失败')
                    return false;
                }
            });
        },
        returncancle(){
            this.$router.push({path:'/saftmanage/safteducate'});
        },
        // 上传人员
        uploadperson(){
            this.$http.get('/api/user/user_select').then(res=>{
                this.personoption=res.data.list;
            })
        },
    },
    mounted(){
        this.uploadperson();
        this.saftplanId=this.$route.query.id;
        if(this.saftplanId!=0){
            this.$http.post('/api/risk_plan/selectByID?id='+this.saftplanId).then(res=>{
                console.log(res);
                this.saftplanform=res.data;
            })
            console.log('编辑前请求的数据');
        }
    }
}
</script>

<style>
.rebuild{
    height:calc(100vh - 80px);
}
.rebuild .el-scrollbar__wrap{
    overflow-x: hidden;
}
</style>
