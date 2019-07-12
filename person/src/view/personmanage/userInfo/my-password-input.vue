<template>
    <div class="userpass">
        <el-form :model="userpass" label-width="100px" ref="userpass" class="pass-ruleForm" >
            <!-- <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="userpass.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="userpass.checkPass" auto-complete="off"></el-input>
            </el-form-item> -->
            <el-form-item prop="oldpass">
               <span>原&nbsp;&nbsp;密&nbsp;&nbsp;码：</span> 
               <el-input type="text" placeholder="请输入原密码" v-model="userpass.oldpass" style="width:280px" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="newpass">
               <span>新&nbsp;&nbsp;密&nbsp;&nbsp;码：</span> 
               <el-input type="password" placeholder="请输入新密码" v-model="userpass.newpass"  style="width:280px" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item prop="repass">
               <span>确认密码：</span> 
               <el-input type="password" v-model="userpass.repass" placeholder="请输入旧密码" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userpass')">提交</el-button>
                <el-button @click="backForm('userpass')">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import * as personapi from '@/api/usercenter.js'
import md5 from "js-md5";
export default {
    data(){
        var passonce = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.userpass.repass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
            }
        };
        var passtwo = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.userpass.newpass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
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
            userId:'',
            // passyz: {
            //     newpass: [
            //         { validator: passtwo, trigger: 'blur' }
            //     ],
            //     repass: [
            //         { validator: passonce, trigger: 'blur' }
            //     ],
            //     oldpass: [
            //         { validator: passtwo, trigger: 'blur' }
            //     ]
            // }
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.userpass.oldpass==''||this.userpass.oldpass==null){
                    this.$message.error('旧密码不能为空');
                }else if(this.userpass.newpass==''||this.userpass.newpass==null){
                    this.$message.error('新密码不能为空');
                }else if(this.userpass.oldpass==this.userpass.newpass){
                    this.$message.error('新密码和旧密码不能相同');
                }else if(this.userpass.repass==''||this.userpass.repass==null){
                    this.$message.error('请输入确认密码');
                }else if(this.userpass.repass!==this.userpass.newpass){
                    this.$message.error('确认密码和新密码不一致');
                }else{
                    let oldp=md5(this.userpass.oldpass)
                    let newp=md5(this.userpass.newpass)
                    let reset=md5(this.userpass.repass)
                    let passform=new FormData();
                    passform.append('workerId',this.userId)
                    passform.append('oldPassword',oldp)
                    passform.append('newPassword',newp)
                    this.$http.post('/api/user/changePassword',passform).then(res=>{
                        console.log(res);
                        if(res.data.result=='success:[修改密码成功!]'){
                            this.$message.success('修改密码成功')
                        }else if(res.data.result=='Error:[密码验证不通过!]'){
                            this.$message.error('修改密码失败')
                        }
                    }).catch(error=>{
                        console.log(error);
                        // console.log(11);
                    })
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        backForm() {
            // this.$refs[formName].resetFields();
        }
    },
    mounted(){
        this.userId=sessionStorage.getItem('userId')
    }
}
</script>

<style>
</style>
