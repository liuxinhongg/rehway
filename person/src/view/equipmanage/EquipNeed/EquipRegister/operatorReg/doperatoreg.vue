<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <p class="persontop">操作员注册</p>
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">设备编码：</td>
                        <td>    
                            <el-form-item prop="devcode" >
                                <el-select v-model="projcheckform.devcode" style="width:280px" :disabled='istrue' placeholder="请选择设备编码">
                                    <el-option v-for="(item,index) in sbdetail" :key="index" :label="item.mname" :value="item.devcode"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">操作员姓名：</td>
                        <td>
                            <el-form-item prop="operName">
                                <el-input v-model.trim="projcheckform.operName" style="width:280px" placeholder="请输入操作员姓名"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">操作员身份证号：</td>
                        <td>
                            <el-form-item prop="operIdCard">
                                <el-input v-model.trim="projcheckform.operIdCard" style="width:280px" placeholder="请输入操作员身份证号"></el-input>                                
                            </el-form-item>
                        </td>
                        <td class="tdleft">性别：</td>
                        <td>
                            <el-form-item prop="gender">
                                <el-select v-model="projcheckform.gender" style="width:280px" placeholder="请选择性别">
                                    <el-option  value="m" label="男"></el-option>
                                    <el-option  value="f" label="女"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">状态：</td>
                        <td colspan="3">
                            <el-form-item prop="state">
                                <el-select v-model="projcheckform.state" style="width:280px" placeholder="请选择状态">
                                    <el-option  value="0" label="可用"></el-option>
                                    <el-option  value="1" label="不可用"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">资质文件照</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-upload action="" :file-list="fileList" :multiple=true :http-request="handlefile">
                                    <el-button size="small" type="primary">选取文件</el-button>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-form-item>
                                <el-button type="primary" native-type="submit" @click="prsubForm('projcheckform')" >提交</el-button>
                            </el-form-item>
                        </td>
                        <td colspan="2">
                            <el-form-item>
                                <el-button @click="backForm()">返回</el-button>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
            </el-form>
        </el-scrollbar>
    </div>
</template>
<script>
import * as qualitymanage from '@/api/qualityapi.js'
import * as equipmanage from '@/api/equipmanage.js'
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
        var freqNum = (rule, value, callback) => {
            if (value=== '') {
                return callback(new Error('请输入检查频率'));
            }else{
                let boolean=new RegExp('^[1-9][0-9]?$').test(value);
                if(!boolean){
                    return callback(new Error('请输入正整数,并且小于100'));
                    value='';
                }
                callback();
            }
        };
        var personcardID=(rule,value,callback)=>{
            if(value===''){
                return callback(new Error('请输入操作员身份证号码'))
            }else{
                let personId=/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
                if(!personId.test(value)){
                    return callback(new Error('请输入正确的身份证号'));
                    value='';
                }
                callback();
            }
        };
        return{
            istrue:false,
            sbdetail:[],
            fileList:[],
            projcheckform:{
                devcode:'',
                operName:'',
                operIdCard:'',
                gender:'',
                state:'',
            },
            checkform:new FormData(),
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            useryz:{
                operName:[
                    {required: true,message: "请输入操作员姓名",trigger: "blur"},
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/, message: '请输入正确的姓名' }
                ],
                operIdCard:[{validator:personcardID,trigger: "blur"}],
                devcode:[{required: true,message: "请选择设备编码",trigger: "change"}],
                state:[{required: true,message: "请选择状态",trigger: "change"}],
                gender:[{required: true,message: "请选择性别",trigger: "change"}],
            },
            eduId:0,
            pickerBeginDateBefore: {
                disabledDate: (time) => {
                let beginDateVal = this.projcheckform.endTime;
                if (beginDateVal) {
                    return time.getTime() > beginDateVal;
                }
                }
            },
            pickerBeginDateAfter: {
                disabledDate: (time) => {
                let beginDateVal = this.projcheckform.beginTime;
                if (beginDateVal) {
                    return time.getTime() < beginDateVal;
                }
                }
            }
        }
    },
    methods:{
        handlefile(par){
            this.checkform.append('filepaths',par.file);
        },
        prsubForm(formName) {
            console.log(1)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.checkform.append('devcode',this.projcheckform.devcode)
                    this.checkform.append('operName',this.projcheckform.operName)
                    this.checkform.append('operIdCard',this.projcheckform.operIdCard)
                    this.checkform.append('gender',this.projcheckform.gender)
                    this.checkform.append('state',this.projcheckform.state)
                    console.log(this.projcheckform)
                    if(this.eduId==0){
                        console.log(1);
                        this.$http.post(equipmanage.devoperatorinsert,this.checkform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/equipmanage/operatorReg');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        this.checkform.append('id',this.eduId)
                        this.$http.post(equipmanage.devoperatorupdate,this.checkform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/equipmanage/operatorReg');
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
        backForm(){
            this.$router.go(-1);
        },
        shebei(){
            this.$http.get(equipmanage.equipreginsert).then(res=>{
                this.sbdetail = res.data.list;
            })
        },
    },
    mounted(){
        this.shebei();
        this.eduId=this.$route.query.id;
        if(this.eduId!=0){
            this.istrue = true
            this.$http.get(equipmanage.devoperatorselectBy,{params:{id:this.eduId}}).then(res=>{
                this.projcheckform=res.data.list[0];
                if(typeof(res.data.list[0].state) == 'number'){
                    this.projcheckform.state = res.data.list[0].state.toString();
                }
                 if(typeof(res.data.list[0].gender) == 'number'){
                    this.projcheckform.gender = res.data.list[0].gender.toString();
                }
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
