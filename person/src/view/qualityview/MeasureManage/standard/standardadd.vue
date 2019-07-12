<template>
    <div class="rebuild">
    <p class="toptext">项目标准数据</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">检查项：</td>
                        <td>
                           <el-form-item prop="chkItem">
                                 <el-input v-model.trim="projcheckform.chkItem" style="width:280px" placeholder="请输入检查项"></el-input>  
                            </el-form-item>
                        </td>
                         <td class="tdleft">检查标准具体项目：</td>
                        <td>
                            <el-form-item prop="chkStd">
                                <el-input v-model.trim="projcheckform.chkStd" style="width:280px" placeholder="请输入检查标准具体项目"></el-input>                                
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">标准数据值：</td>
                        <td>
                            <el-form-item prop="stdVal">
                                <el-input v-model.trim="projcheckform.stdVal" style="width:280px" placeholder="请输入标准数据值"></el-input>                                
                            </el-form-item>
                        </td>
                         <td class="tdleft">标准数据单位：</td>
                        <td>
                             <el-form-item prop="stdUnit">
                                <el-input v-model.trim="projcheckform.stdUnit" style="width:280px" placeholder="请输入标准数据单位"></el-input>                                                               
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">测量工具：</td>
                        <td>
                             <el-form-item prop="mtool">
                                <el-input v-model.trim="projcheckform.mtool" style="width:280px" placeholder="请输入测量工具"></el-input>                                                                                                
                            </el-form-item>
                        </td>
                        <td class="tdleft">测试取点个数：</td>
                        <td>
                           <el-form-item prop="mnum">
                                <el-input v-model.trim="projcheckform.mnum" style="width:280px" type="number" placeholder="请输入测试取点个数"></el-input>                                                                                                                               
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">测量方法：</td>
                        <td colspan="3">
                           <el-form-item prop="mway">
                                <el-input type="textarea" :rows="4" v-model.trim="projcheckform.mway" placeholder="请输入测量方法"></el-input>                                                                                                                               
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item style="text-align:center;">
                    <el-button type="primary" native-type="submit" @click="prsubForm('projcheckform')" >提交</el-button>
                    <el-button @click="backForm()">返回</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>
<script>
import * as qualitymanage from '@/api/qualityapi.js'
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
       
        return{
            isTrue:'',
            fileList:[],
            projcheckform:{
                chkItem:'',
                chkStd:'',
                stdVal:'',
                stdUnit:'',
                mtool:'',
                mnum:'',
                mway:'',
            },
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            hiddenpageData:[],
            useryz:{
                chkItem:[
                    {required: true,message: "检查项",trigger: "blur"},
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,20}$/,message: '检查项不能超过20个字符'}
                ],
                chkStd:[
                    {required: true,message: "检查标准具体项目",trigger: "blur"},
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,30}$/,message: '检查项不能超过30个字符'}
                ],
                stdVal:[
                    {required: true,message: "标准数据值",trigger: "blur"},
                    { pattern: /^\d{1,3}$/,message: '准数据值不能超过三位数'}
                ],
                stdUnit:[
                    {required: true,message: "标准数据单位",trigger: "blur"},
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,30}$/,message: '标准数据单位不能超过30个字符'}
                ],
                mtool:[
                    {required: true,message: "测量工具",trigger: "blur"},
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,15}$/,message: '测量工具不能超过15个字符'}                    
                ],
                mnum:[
                    {required: true,message: "请输入测量点个数",trigger: "blur"},
                    { pattern: /^[1-9]{1}[0-9]{0,6}$/,message: '测量点个数不能超过7个字符'}                     
                ],
                mway:[{required: true,message: "测试方法",trigger: "blur"}],
            },
        }
    },
    methods:{
        backForm(){
            this.$router.go(-1)
        },
        prsubForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.id)
                    if(this.id=='0'){
                        this.$http.get(qualitymanage.prostandardinsert,{params:this.projcheckform}).then(res=>{
                            console.log(res)
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/qualitymanage/prostandard');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }else if(res.data.result == "is exist"){
                                this.$message.error('重复添加');
                            }
                        })
                    }else{
                        this.$http.get(qualitymanage.prostandardupdate,{params:this.projcheckform}).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/qualitymanage/prostandard');
                            }else if(res.data.result=='error'){
                                this.$message.error('修改失败');
                            }
                        })
                    }
                }else{
                    console.log('数据错误');
                }
            })
        },
        //查询人员
        searchperson(){
            this.$http.get('/api/itemStd/selectBy?id='+this.id).then(res=>{
               this.projcheckform = res.data.list[0]
                console.log(res);
            })
        },
    },
    mounted(){
        this.id = this.$route.query.id;
        if(this.id != 0){
            this.searchperson();
            this.projcheckform.id = this.$route.query.id;
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
