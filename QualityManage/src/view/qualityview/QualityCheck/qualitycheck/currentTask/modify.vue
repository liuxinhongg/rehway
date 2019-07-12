<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="saftform" :rules="useryz" @submit.native.prevent  ref="saftform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">实际检查人：</td>
                        <td>
                            <el-form-item prop="chkMan">
                                <el-select v-model="saftform.chkMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">负责人：</td>
                        <td>
                            <el-form-item prop="dirMan">
                                <el-select v-model="saftform.dirMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        
                    </tr>
                    <tr>
                        <td class="tdleft">是否存在问题：</td>
                        <td>
                            <el-form-item prop="state">
                                <el-select v-model="saftform.state" style="width:280px">
                                    <el-option v-for="(item,index) in statusoption" :key="index" :value="item.type" :label="item.label"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">上传照片文件：</td>
                        <td>
                            <el-form-item>
                                <el-upload
                                    class="upload-demo"
                                    accept="image/*"
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
                        <td class="tdleft">检查真实结果：</td>
                        <td colspan="3">
                            <el-form-item prop="chkReal">
                                <el-input v-model="saftform.chkReal" type="textarea" :rows="4" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">纠正预防措施：</td>
                        <td colspan="3">
                            <el-form-item prop="chkRectify">
                                <el-input v-model="saftform.chkRectify" type="textarea" :rows="4" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-button type="primary" native-type="submit" @click="educateForm('saftform')">提交</el-button>
                        </td>
                        <td colspan="2">
                            <el-button @click="backForm('saftform')">返回</el-button>
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
            fileList:[],
            saftform:{
                state:'',
                chkReal:'',
                chkMan:'',
                chkRectify:'',
                filepath:'',
                dirMan:'',
            },
            statusoption:[
                {label:'有问题',type:1},
                {label:'没有问题',type:0},
            ],
            worktypeoption:[],
            personoption:[],
            edutypeoption:[],
            gcoption:[],
            useryz:{
                chkMan:[{required: true,message: "请选择检查人员",trigger: "change"}],
                state:[{required: true,message: "请选择问题状态",trigger: "blur"}],
                edutype:[{required: true,message: "请选择教育类型",trigger: "change"}],
                dirMan:[{required: true,message: "请选择责任人",trigger: "change"}],
            },
            currentId:0,
        }
    },
    methods:{
        handleChange(param){
            this.saftform.filepath=param.file;
        },
        educateForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let currform=new FormData();
                    currform.append('chkMan',this.saftform.chkMan)
                    currform.append('state',this.saftform.state)
                    currform.append('dirMan',this.saftform.dirMan)
                    currform.append('chkRectify',this.saftform.chkRectify)
                    currform.append('id',this.currentId)
                    currform.append('chkReal',this.saftform.chkReal)
                    currform.append('filepath',this.saftform.filepath)
                    this.$http.post('/api/chk_today/update',currform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                        console.log(res);
                        if(res.data.result=='success'){
                            this.$message.success('添加成功~');
                            this.$router.push('/qualitymanage/currentTask');
                        }else if(res.data.result=='error'){
                            this.$message.error('添加失败');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        returncancle(){
            this.$router.push({path:'/qualitymanage/currentTask'});
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
        this.currentId=this.$route.query.id;
        if(this.currentId!=0){
            this.$http.post('/api/chk_today/selectBy?id='+this.currentId).then(res=>{
                console.log(res);
                this.saftform=res.data.list[0];
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
