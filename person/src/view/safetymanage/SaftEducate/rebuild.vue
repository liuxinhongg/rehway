<template>
    <div class="rebuild">
        <p class="toptext">安全教育</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="saftform" :rules="useryz" @submit.native.prevent  ref="saftform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">上传员工：</td>
                        <td>
                            <el-form-item prop="upuser">
                            <el-select v-model="saftform.upuser" style="width:280px">
                                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                </el-option>
                            </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">标题：</td>
                        <td>
                            <el-form-item prop="title">
                                <el-input v-model.trim="saftform.title" style="width:280px" placeholder="请输入标题"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">教育类型：</td>
                        <td>
                            <el-form-item prop="edutype">
                                <el-select v-model="saftform.edutype" style="width:280px">
                                    <el-option v-for="(item,index) in edutypeoption" :key="index" :value="item.code" :label="item.type"> </el-option>
                                    <!-- <el-option v-for="(item,index) in edutypeoption" :key="index" :value="item.code" :label="item.type">{{item.type}}</el-option> -->
                                    <!-- <el-option v-for="(item,index) in edutypeoption" :key="index" :value="item.code" :label="item.type"></el-option> -->
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">工种类别：</td>
                        <td>
                            <el-form-item prop="worktype">
                                <el-select v-model="saftform.worktype" style="width:280px">
                                    <el-option v-for="(item,index) in worktypeoption" :key="index" :value="item.roleId" :label="item.roleName"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">工程类别：</td>
                        <td>
                            <el-form-item prop="protype">
                                <el-select v-model="saftform.protype" style="width:280px">
                                    <el-option v-for="(item,index) in gcoption" :key="index" :value="item.categorytype" :label="item.category"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">上传视频：</td>
                        <td>
                            <el-form-item>
                                <el-upload
                                    class="upload-demo"
                                    accept="video/*"
                                    action=" "
                                    :http-request="handleChange"
                                    :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <span class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">备注：</td>
                        <td colspan="3">
                            <el-form-item prop="remark">
                                <el-input v-model.trim="saftform.remark" type="textarea" :rows="4" maxlength="200"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item style="text-align: center;">
                    <el-button type="primary" native-type="submit" @click="educateForm('saftform')">提交</el-button>    
                    <el-button @click="backForm('saftform')">返回</el-button>
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
            fileList:[],
            saftform:{
                upuser:'',
                title:'',
                edutype:'',
                worktype:'',
                protype:'',
                remark:'',
                filepath:'',
            },
            worktypeoption:[],
            personoption:[],
            edutypeoption:[],
            gcoption:[],
            useryz:{
                upuser:[{required: true,message: "请选择上传员工",trigger: "change"}],
                title:[{required: true,message: "请输入标题",trigger: "blur"},{ pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,20}$/,message: '标题不能超过20个字符'}],
                edutype:[{required: true,message: "请选择教育类型",trigger: "change"}],
                worktype:[{required: true,message: "请选择工种类别",trigger: "change"}],
                protype:[{required: true,message: "请选择工程类别",trigger: "change"}],
            },
            eduId:0,
        }
        
    },
    methods:{
        handleChange(param){
            this.saftform.filepath=param.file;
        },
        educateForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.eduId==0){
                        let eduform=new FormData();
                        eduform.append('upuser',this.saftform.upuser)
                        eduform.append('title',this.saftform.title)
                        eduform.append('edutype',this.saftform.edutype)
                        eduform.append('worktype',this.saftform.worktype)
                        eduform.append('protype',this.saftform.protype)
                        eduform.append('remark',this.saftform.remark)
                        eduform.append('filepath',this.saftform.filepath)
                        this.$http.post(security.riskeduinsert,eduform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/saftmanage/safteducate');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        returncancle(){
            this.$router.push({path:'/saftmanage/safteducate'});
        },
        // 教育类型
        educateType(){
            this.$http.get(dictapi.ristedu).then(res=>{
                console.log(res);
                this.edutypeoption=res.data;
                // console.log(this.edutypeoption);
            })
        },
        // 上传人员
        uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                this.personoption=res.data.list;

            })
        },
        // 工种类别
        workertype(){
            this.$http.get(dictapi.worktype).then(res=>{
                console.log(res);
                this.worktypeoption=res.data;
            })
        },
        // 工程类别
        gcodata(){
            this.$http.get(dictapi.category).then(res=>{
                console.log(res);
                this.gcoption=res.data;
            })
        }
    },
    mounted(){
        this.educateType();
        this.uploadperson();
        this.workertype();
        this.gcodata();
        this.eduId=this.$route.query.id;
        if(this.eduId!=0){
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
