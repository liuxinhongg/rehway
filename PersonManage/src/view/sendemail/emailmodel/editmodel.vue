<template>
    <div>
        <el-form :model="editadd" status-icon :rules="editaddrule" ref="editadd" label-width="120px" class="editconfig">
            <el-form-item label="名称：" prop="emailname">
                <el-input type="text" v-model="editadd.emailname" name="emailname" autocomplete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="发件人：" prop="sendperson">
                <el-input type="text" v-model="editadd.sendperson" name="sendperson" autocomplete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="收件人：" prop="collectperson">
                <el-input type="textarea" v-model="editadd.collectperson" name="collectperson" autocomplete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="抄送：" prop="copyto">
                <el-input type="textarea" v-model="editadd.copyto" name="copyto" autocomplete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="暗送：" prop="darksend">
                <el-input type="textarea" v-model="editadd.darksend" name="darksend" autocomplete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="标题：" prop="title">
                <el-input type="text" v-model="editadd.title" name="title" autocomplete="off"  style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="内容：" prop="content">
                <el-input type="text" v-model="editadd.content" name="content" autocomplete="off"  style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="附件：">
                <el-upload class="upload-demo" ref="upload" :limit="1"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('editadd')">提交</el-button>
                <el-button @click="reback()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        var checkname = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('名称不能为空'));
            }
        };
        var validatesendperson = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('服务器不能为空'));
            }
        };
        return {
            editadd: {
                emailname:'',
                sendperson:'',
                collectperson:'',
                copyto:'',
                darksend:'',
                content:'',
                title:'',
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            },
            editaddrule: {
                emailname: [
                    { validator: checkname, trigger: 'blur' }
                ],
                sendperson: [
                    { validator: validatesendperson, trigger: 'blur' }
                ],
                collectperson: [
                    {required:true, message:'收件人不能为空', trigger: 'blur' }
                ],
                copyto: [
                    {required:true,message:'抄送不能为空', trigger: 'blur' }
                ],
                darksend: [
                    { required:true,message: '是否使用SSL', trigger: 'change' }
                ],
                title:[
                        { required:true,message:'标题不能为空', trigger: 'blur' }
                ],
                content:[
                        { required:true,message:'内容不能为空', trigger: 'blur' }
                ],
            }
      };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        reback(formName) {
            this.$router.push({path:'/project/sendemail'})
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
}
</script>

<style>
.editconfig{
    margin: 20px;
}
</style>
