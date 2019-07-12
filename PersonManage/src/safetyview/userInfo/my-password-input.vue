<template>
    <div class="userpass">
        <el-form :model="userpass" status-icon label-width="100px" :rules="passyz" ref="userpass" class="pass-ruleForm" action="">
            <el-form-item label="原密码：" prop="oldpass">
                <el-input type="password" v-model="userpass.oldpass" name="userpass.oldpass" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="newpass">
                <el-input type="password" v-model="userpass.newpass" name="userpass.newpass" style="width:280px"></el-input>
            </el-form-item>
             <el-form-item label="确认密码：" prop="repass">
                <el-input type="password" v-model="userpass.repass" name="userpass.repass" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userpass')">提交</el-button>
                <el-button @click="backForm('userpass')">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        var validateoldPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入原密码'));
            };
        }
        var validatenewPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.userpass.newpass !== '') {
                    this.$refs.userpass.validateField('newpass');
                }
                callback();
            }
        };
        var validaterePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userpass.repass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        
        return{
            userpass:{
                oldpass:'',
                newpass:'',
                repass:''
            },
            passyz: {
                newpass: [
                    { validator: validatenewPass, trigger: 'blur' }
                ],
                repass: [
                    { validator: validaterePass, trigger: 'blur' }
                ],
                oldpass: [
                    { validator: validateoldPass, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // this.$http.post(my-change-password-save).then(res=>{
                // })
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        backForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>
</style>
