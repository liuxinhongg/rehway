<template>
    <div class="addsystem">
        <el-form :model="adform" :rules="rules" ref="adform" label-width="120px" class="admanage"  @submit.native.prevent>
            <el-form-item label="制度编号：" prop="systemcode" >
                <el-input v-model="adform.systemcode"></el-input>
            </el-form-item>
            <el-form-item label="制度标题：" prop="title" >
            <el-input v-model="adform.title"></el-input>
            </el-form-item>
            <el-form-item label="发布人：" prop="author" >
            <el-input v-model="adform.author"></el-input>
            </el-form-item>
            <el-form-item label="发布时间：" prop="sendtime" >
                <el-date-picker v-model="adform.sendtime" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" style="width:100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="制度内容">
                <el-upload ref="upload" class="upload-demo" accept="application/pdf" action=" "  :limit="1" 
                    :auto-upload="true" :show-file-list="true" :http-request="uploadUserImg">
                    <el-button size="small" type="primary" style="margin-right:20px;">点击上传</el-button>
                    <span slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过500kb</span>
                </el-upload>
            </el-form-item>
            <el-form-item label="备注：" prop="remark" >
                <el-input v-model="adform.remark" type="textarea" :rows="4" ></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;">
            <el-button type="primary" native-type="submit" @click="submitForm('adform')">确定</el-button>
            <el-button @click="addAnnounce=false">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            param: new FormData(),
            adform: {
                systemcode:'',
                title: "",
                author: "",
                desc: "",
                sendtime:'',
                remark:'',
                file:'',
            },
            rules: {
                systemcode:[{required: true,message: "请输入制度编号",}],
                author: [
                    { required: true, message: "请输入作者名称", trigger: "blur" },
                    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
                ],
                sendtime: [
                { required: true, message: "请选择发布时间", trigger: "change" }
                ],
                title: [
                    { required: true, message: "请输入广告标题", trigger: "blur" },
                    { min: 3, max: 20, message: "长度在 3 到 30 个字符", trigger: "blur" }
                ],
                remark:[{required:true,message:'请输入备注内容',trigger:'blur'}]
            },
        }
    },
    methods:{
        beforeZlUpload(file){
            var timestamp = Date.parse(new Date());
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                this.$message.error("上传文件大小不能超过 50MB!");
            }
            return isLt50M;
        },
        uploadUserImg(param){
            this.adform.file = param.file;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                var form = new FormData();
                form.append('filepath',this.adform.file);
                form.append('titleName',this.adform.title);
                form.append('time',this.adform.time);
                form.append('issuser',this.adform.issuser);
                this.$http.post('/api/regime/insert',form,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                    console.log(res);
                    if(res.data.result=='success'){
                        this.$router.push({path:'/project/systemmanage'});
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

<style lang="scss">
.addsystem{
    width: 50%;
    margin: 20px;
}
</style>
