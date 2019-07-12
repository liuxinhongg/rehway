<template>
    <div class="systembuild">
        <el-scrollbar style="height:100%;">    
            <p class="toptext">安全制度表单</p>
            <el-form :model="systemform" :rules="useryz" @submit.native.prevent  ref="systemform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">制度标题：</td>
                        <td>
                            <el-form-item prop="title">
                                <el-input v-model.trim="systemform.title" style="width:280px" placeholder="请输入制度标题"></el-input>
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
                        <td class="tdleft">附件：</td>
                        <td colspan="3">
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
                                <el-input v-model.trim="systemform.content" type="textarea" :rows="4" placeholder="请输入发布内容" maxlength="300"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item style="text-align:center;">
                    <el-button type="primary" native-type="submit" @click="systemsubmit('systemform')">提交</el-button>  
                    <el-button @click="backForm('systemform')">返回</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
import * as security from '@/api/security.js'
import * as dictapi from '@/api/dictapi.js'
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
                filepath:'',
                content:'',
            },
            personoption:[],
            useryz:{
                upworker:[{required: true,message: "请选择上传员工",trigger: "change"}],           
                title:[{required: true,message: "请输入计划主题",trigger: "blur"},{ pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,20}$/,message: '标题不能超过20个字符'}],
                
            },
            saftplanId:0,
        }
    },
    methods:{
        backForm(){
            this.$router.go(-1)
        },
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
                    sysform.append('filepath',this.systemform.filepath)
                    if(this.saftplanId==0){
                        this.$http.post(security.riskissueinsert,sysform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/saftmanage/emergerescue');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        console.log(this.systemform.issueDate)
                        sysform.append('id',this.saftplanId)
                        this.$http.post(security.riskissueupdate,sysform).then(res=>{
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
            this.$http.get(dictapi.user).then(res=>{
                this.personoption=res.data.list;
            })
        },
    },
    mounted(){
        this.uploadperson();
        this.saftplanId=this.$route.query.id;
        if(this.saftplanId!=0){
            console.log(this.saftplanId);
            // security.riskissueselectBy
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
