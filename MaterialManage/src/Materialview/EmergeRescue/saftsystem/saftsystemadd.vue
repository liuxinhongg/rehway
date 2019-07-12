<template>
    <div class="systembuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="systemform" :rules="useryz" @submit.native.prevent  ref="systemform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">制度标题：</td>
                        <td>
                            <el-form-item prop="title">
                                <el-input v-model="systemform.title" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">上传用户：</td>
                        <td>
                            <el-form-item prop="upworker">
                            <el-select v-model="systemform.upworker" style="width:280px">
                                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                </el-option>
                            </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">发布日期：</td>
                        <td>
                            <el-form-item prop="issueDate">
                                <el-date-picker v-model="systemform.issueDate" style="width:280px" placeholder="选择日期时间" type="datetime" :picker-options="pickerDisabled"></el-date-picker>
                            </el-form-item>
                        </td>
                        <td class="tdleft">附件：</td>
                        <td>
                            <el-form-item>
                                <el-upload action="" :limit="1" :file-list="fileList" accept="application/pdf" :before-upload="uploadbefore" :http-request="handlefile">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <span class="el-upload__tip">只能上传pdf文件，且不超过500kb</span>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">发布内容：</td>
                        <td colspan="3">
                            <el-form-item>
                                <el-input v-model="systemform.content" type="textarea" :rows="2" placeholder="最大64K"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-button type="primary" native-type="submit" @click="systemsubmit('systemform')">提交</el-button>
                        </td>
                        <td colspan="2">
                            <el-button @click="backForm('systemform')">返回</el-button>
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
            pickerDisabled:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            fileList:[],
            systemform:{
                title:'',
                upworker:'',
                issueDate:'',
                filepath:'',
                content:'',
            },
            personoption:[],
            useryz:{
                upworker:[{required: true,message: "请选择上传员工",trigger: "change"}],           
                title:[{required: true,message: "请输入计划主题",trigger: "blur"}],
                issueDate:[{required: true,message: "请选择发布日期",trigger: "change"}],
                
            },
            saftplanId:0,
        }
    },
    methods:{
        // 文件上传之前的限制
        uploadbefore(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            return isLt2M;
        },
        handlefile(param){
            this.systemform.filepath=param.file;
        },
        systemsubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let sysform=new FormData();
                    sysform.append('upworker',this.systemform.upworker)
                    sysform.append('title',this.systemform.title)
                    sysform.append('content',this.systemform.content)
                    sysform.append('issueDate',this.systemform.issueDate)
                    sysform.append('filepath',this.systemform.filepath)
                    if(this.saftplanId==0){
                        this.$http.post('/api/risk_issue/insert',sysform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/saftmanage/emergerescue');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        sysform.append('id',this.saftplanId)
                        this.$http.post('/api/risk_issue/update',sysform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/saftmanage/emergerescue');
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
            this.$http.post('/api/risk_issue/selectById?id='+this.saftplanId).then(res=>{
                console.log(res);
                this.systemform=res.data.result[0];
            })
            console.log('编辑前请求的数据');
        }
    }
}
</script>

<style>
.systembuild{
    height:calc(100vh - 80px);
}
.systembuild .el-scrollbar__wrap{
    overflow-x: hidden;
}
</style>
