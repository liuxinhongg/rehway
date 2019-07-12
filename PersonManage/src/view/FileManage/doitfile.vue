<template>
    <div>
         <el-form :model="fileform" :rules="rules" enctype="multipart/form-data" ref="fileform" @submit.native.prevent label-width="120px" style="width:50%;margin:20px;">
            <el-form-item label="文件编号：" prop="code" >
            <el-input v-model="fileform.code"></el-input>
            </el-form-item>
            <el-form-item label="发布人：" prop="issuser" >
            <el-input v-model="fileform.issuser"></el-input>
            </el-form-item>
            <el-form-item label="发布时间：" prop="time" >
              <el-date-picker v-model="fileform.time" type="datetime" placeholder="选择日期时间" format="yyyy 年 MM 月 dd 日" style="width:100%;" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <el-form-item label="选取文件：" prop="prop">
                <el-upload class="upload-demo" action="" :auto-upload="true" :show-file-list="true" :http-request="handleDoIt">
                    <el-button slot="trigger" size="small" :limit="1" type="primary"><i class="el-icon-upload" style="font-size:20px;margin:0 5px 0 0;"></i>选取文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item style="text-align:center;">
            <el-button type="submit" native-type="submit" @click="submitForm('fileform')">确定</el-button>
            <el-button @click="addAnnounce=false">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    
    data(){
        return{
            fileform:{
                code:'',
                issuser:'',
                time:'',
                filepath:'',
            },
            rules:{
                code:[{required: true,message: "请输入文件编号",trigger: "blur"}],
                issuser:[{required: true,message: "请输入文件编号",trigger: "blur"}],
                time:[{required: true,message: "请选择时间",trigger: "change"}],
            }
        }
    },
    methods:{
        handleDoIt(param){
            console.log(param);
            this.fileform.file=param.file;//获取文件的信息
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var form=new FormData();
                    form.append('filepath',this.fileform.file);
                    form.append('code',this.fileform.code);
                    form.append('issuser',this.fileform.issuser);
                    form.append('time',this.fileform.time);
                    this.$http.post('/api/file/insert',form,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                        console.log(res);
                        if(res.data.result=='success'){
                            this.$router.push({path:'/project/filemanage'});
                        }else if(res.data.result=='error'){
                            this.$message.error('添加文件失败');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style>

</style>
