<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">分部工程：</td>
                        <td>
                           <el-form-item prop="subprj">
                                <el-input v-model="projcheckform.subprj" style="width:280px"></el-input>                                                                                                
                            </el-form-item>
                        </td>
                        <td class="tdleft">子分部工程：</td>
                        <td>
                           <el-form-item prop="prjs">
                                <el-input v-model="projcheckform.prjs" style="width:280px"></el-input>                                                                                                
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">分项工程：</td>
                        <td>
                           <el-form-item prop="items">
                                <el-input v-model="projcheckform.items" style="width:280px"></el-input>                                                                
                            </el-form-item>
                        </td>
                         <td class="tdleft">备用</td>
                        <td>
                           <el-form-item prop="res">
                                <el-input v-model="projcheckform.res" style="width:280px"></el-input>                                                                                                
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-form-item>
                                <el-button type="primary" native-type="submit" @click="prsubForm()" >提交</el-button>
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
                subprj:[{required: true,message: '分部工程',trigger: "blur"}],
                prjs:[{required: true,message: "子分部工程",trigger: "blur"}],
                items:[{required: true,message: "分项工程",trigger: "blur"}],
                res:[{required: true,message: "备用",trigger: "blur"}],
            },
        }
    },
    methods:{
        prsubForm() {
                this.$http.get(qualitymanage.qualityconfiginsert,{params:this.projcheckform}).then(res=>{
                        if(res.data.result=='success'){
                            this.$message.success('添加成功~');
                            this.$router.push('/qualitymanage/qualityconfig');
                        }else if(res.data.result=='error'){
                            this.$message.error('添加失败');
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
