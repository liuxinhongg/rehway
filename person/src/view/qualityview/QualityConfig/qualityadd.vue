<template>
    <div class="rebuild">
        <p class="toptext">质量管理配置</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">分部工程：</td>
                        <td>
                           <el-form-item prop="subprj">
                                <el-input v-model.trim="projcheckform.subprj" style="width:280px" placeholder="请输入分部工程"></el-input>                                                                                                
                            </el-form-item>
                        </td>
                        <td class="tdleft">子分部工程：</td>
                        <td>
                           <el-form-item prop="prjs">
                                <el-input v-model.trim="projcheckform.prjs" style="width:280px" placeholder="请输入子分部工程"></el-input>                                                                                                
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">分项工程：</td>
                        <td>
                           <el-form-item prop="items">
                                <el-input v-model.trim="projcheckform.items" style="width:280px"  placeholder="请输入分项工程"></el-input>                                                                
                            </el-form-item>
                        </td>
                         <td class="tdleft">备用：</td>
                        <td>
                           <el-form-item prop="res">
                                <el-input v-model.trim="projcheckform.res" style="width:280px" placeholder="请输入"></el-input>                                                                                                
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
            projcheckform:{
                subprj:'',
                prjs:'',
                items:'',
                res:'',
            },
            useryz:{
                subprj:[
                    {required: true,message: '分部工程',trigger: "blur"},
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,20}$/,message: '分部工程不能超过20个字符'}
                ],
                prjs:[{required: true,message: "子分部工程",trigger: "blur"},{ pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,20}$/,message: '子分部工程不能超过20个字符'}],
                items:[{required: true,message: "分项工程",trigger: "blur"},{ pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,20}$/,message: '分项工程检查项不能超过20个字符'}],
                res:[{required: true,message: "备用",trigger: "blur"},{ pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,20}$/,message: '备用不能超过20个字符'}],
            },
        }
    },
    methods:{
        prsubForm(formName) {
            this.$refs[formName].validate((vaild)=>{
                if(vaild){
                    this.$http.get(qualitymanage.qualityconfiginsert,{params:this.projcheckform}).then(res=>{
                        if(res.data.result=='success'){
                            this.$message.success('添加成功~');
                            this.$router.push('/qualitymanage/qualityconfig');
                        }else if(res.data.result=='error'){
                            this.$message.error('添加失败');
                        }
                    })
                }else{
                    console.log('数据添加失败')
                }
            })
        },
        //返回按钮
        backForm(){
            this.$router.go(-1)
        },
        
     
    },
    mounted(){
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
