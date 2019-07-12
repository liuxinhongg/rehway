<template>
    <div class="userinfo">
        <el-form :model="userInfo" status-icon label-width="100px" :rules="useryz" ref="userInfo" class="info-ruleForm" action="">
            <el-form-item label="账号：" prop="liuxinhong">
                <label>{{userInfo.countname}}</label>
            </el-form-item>
            <el-form-item label="显示名：" >
                <label>{{userInfo.overname}}</label>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="userInfo.email" name="userInfo.email" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="phone">
                <el-input v-model="userInfo.phone" name="userInfo.phone" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userInfo')">提交</el-button>
                <el-button @click="backForm('userInfo')">返回</el-button>
            </el-form-item>
        </el-form>
        <!-- <form id="pimRemindForm" method="post" action="my-info-save.do" class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-md-1" for="pimRemind_repeatType">账号</label>
                <div class="col-sm-5">
                <label class="control-label">${accountInfo.username}</label>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-1" for="pimRemind_repeatType">显示名</label>
                <div class="col-sm-5">
                <label class="control-label">${accountInfo.displayName}</label>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-1" for="pimRemind_description">邮箱</label>
                <div class="col-sm-5">
                <input id="pimInfo_name" type="text" name="email" value="${personInfo.email}" class="form-control required" minlength="2" maxlength="50">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-1" for="pimRemind_infoTime">电话</label>
                <div class="col-sm-5">
                <input id="pimInfo_name" type="text" name="cellphone" value="${personInfo.cellphone}" class="form-control required" minlength="2" maxlength="50">
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-offset-1 col-md-11">
                <button type="submit" class="btn btn-default a-submit">保存</button>
                &nbsp;
                <button type="button" class="btn btn-link a-cancel" onclick="history.back();">返回</button>
                </div>
            </div>
        </form> -->
    </div>
</template>

<script>
export default {
    data(){
        var validatemail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入正确的邮箱'));
            }else{
                if (value !== '') { 
                    var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if(!reg.test(value)){
                    callback(new Error('请输入有效的邮箱'));
                    }
                }
                callback();
            }
        }
        var validatephone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'));
            }else{
                if (value !== '') { 
                    var reg=/^1[3456789]\d{9}$/;
                    if(!reg.test(value)){
                    callback(new Error('请输入有效的手机号码'));
                    }
                }
                callback();
            } 
        };
        return{
            userInfo:{
                countname:'liuxinhong',
                overname:'刘新红',
                email:'',
                phone:''
            },
            useryz:{
                email:[{validator: validatemail, trigger: 'blur' }],
                phone:[{validator: validatephone, trigger: 'blur' }]
            }
        }
    },
    methods:{
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
        backForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>
</style>
