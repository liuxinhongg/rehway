<template>
    <div >
        <div class="avidofrom">
        <el-scrollbar style="height：100%;">
            <el-form :model="editadd" status-icon :rules="editaddrule" ref="editadd" label-width="120px" class="editconfig">
                <el-form-item label="名称：" prop="emailname">
                    <el-input type="text" v-model="editadd.emailname" name="emailname" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="SMTP服务器：" prop="service">
                    <el-input type="text" v-model="editadd.service" name="service" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="SMTP端口：" prop="emailport">
                    <el-input type="text" v-model="editadd.emailport" name="emailport" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="需要认证：" prop="needyz">
                    <el-radio-group v-model="editadd.needyz">
                    <el-radio label="1" checked>是</el-radio>
                    <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="使用TLS：" prop="usertls">
                    <el-radio-group v-model="editadd.usertls">
                    <el-radio label="1" checked>是</el-radio>
                    <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="使用SSL：" prop="needssl">
                    <el-radio-group v-model="editadd.needssl">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0" checked>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="账号：" prop="acount">
                    <el-input type="text" v-model="editadd.acount" name="acount" autocomplete="off"  style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="pass">
                    <el-input type="password" v-model="editadd.pass" name="pass" autocomplete="off"  style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="默认发件人：" prop="sendperson">
                    <el-input type="text" v-model="editadd.sendperson" name="sendperson" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="状态：" prop="status">
                    <el-checkbox-group v-model="editadd.status">
                    <el-checkbox label="正常" name="status"></el-checkbox>
                    <el-checkbox label="测试" name="status"></el-checkbox>
                    <el-checkbox label="忽略" name="status"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="测试邮件：" prop="testEmail">
                    <el-input v-model="editadd.testEmail" name="testEmail" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editadd')">提交</el-button>
                    <el-button @click="reback()">返回</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
        </div>
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
        var validateservice = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('服务器不能为空'));
            }
        };
        var validateport = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('端口不能为空'));
            }
        };
        var validateneedyz = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('认证不能为空'));
            }
        };
        var validateport = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            }
        };
        return {
            editadd: {
                emailname:'',
                service:'',
                emailport:'',
                needyz:'',
                usertls:'',
                needssl:'',
                acount:'',
                sendperson:'',
                status:[],
                testEmail:'',
                pass: '',
                checkPass: '',
                age: ''
            },
            editaddrule: {
                checkname: [
                    { validator: checkname, trigger: 'blur' }
                ],
                service: [
                    { validator: validateservice, trigger: 'blur' }
                ],
                emailport: [
                    { validator: validateport, trigger: 'blur' }
                ],
                needyz: [
                    { message:'需要进行认证', trigger: 'blur' }
                ],
                usertls: [
                    {message:'是否使用TLS', trigger: 'blur' }
                ],
                needssl: [
                    { message: '是否使用SSL', trigger: 'change' }
                ],
                acount:[
                        { required:true,message:'账号不能为空', trigger: 'blur' }
                ],
                pass:[
                        { required:true,message:'密码不能为空', trigger: 'blur' }
                ],
                sendperson:[
                        { required:true,message:'默认发件人不能为空', trigger: 'blur' }
                ],
                status:[
                        { required:true,message:'至少选择一种状态', trigger: 'blur' }
                ],
                testEmail:[
                        { required:true,message:'测试邮件不能为空', trigger: 'blur' }
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
      }
    }
}
</script>

<style>
.avidofrom{
    /* width: 100%; */
    height: 890px;
}
.editconfig{
    margin: 20px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
