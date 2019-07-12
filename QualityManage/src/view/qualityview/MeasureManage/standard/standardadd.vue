<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">检查项：</td>
                        <td>
                           <el-form-item prop="chkItem">
                                 <el-input v-model="projcheckform.chkItem" style="width:280px"></el-input>  
                            </el-form-item>
                        </td>
                         <td class="tdleft">检查标准具体项目：</td>
                        <td>
                            <el-form-item prop="chkStd">
                                <el-input v-model="projcheckform.chkStd" style="width:280px"></el-input>                                
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">标准数据值：</td>
                        <td>
                            <el-form-item prop="stdVal">
                                <el-input v-model="projcheckform.stdVal" style="width:280px"></el-input>                                
                            </el-form-item>
                        </td>
                         <td class="tdleft">标准数据单位：</td>
                        <td>
                             <el-form-item prop="stdUnit">
                                <el-input v-model="projcheckform.stdUnit" style="width:280px"></el-input>                                                               
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">测量工具：</td>
                        <td>
                             <el-form-item prop="mtool">
                                <el-input v-model="projcheckform.mtool" style="width:280px"></el-input>                                                                                                
                            </el-form-item>
                        </td>
                        <td class="tdleft">测试取点个数：</td>
                        <td>
                           <el-form-item prop="mnum">
                                <el-input v-model="projcheckform.mnum" style="width:280px"></el-input>                                                                                                                               
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">测量方法：</td>
                        <td>
                           <el-form-item prop="mway">
                                <el-input v-model="projcheckform.mway" style="width:280px"></el-input>                                                                                                                               
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
                chkItem:[{required: true,message: "检查项",trigger: "blur"}],
                chkStd:[{required: true,message: "检查标准具体项目",trigger: "blur"}],
                stdVal:[{required: true,message: "标准数据值",trigger: "blur"}],
                stdUnit:[{required: true,message: "标准数据单位",trigger: "blur"}],
                mtool:[{required: true,message: "测量工具",trigger: "blur"}],
                mnum:[{required: true,message: "测试取点个数",trigger: "blur",type: 'number'}],
                mway:[{required: true,message: "测试方法",trigger: "blur"}],
            },
        }
    },
    methods:{
        backForm(){
            this.$router.go(-1)
        },
        prsubForm() {
            console.log(this.id)
            if(this.id=='0'){
                this.$http.get(qualitymanage.prostandardinsert,{params:this.projcheckform}).then(res=>{
                    // console.log(res)
                    if(res.data.result=='success'){
                        this.$message.success('添加成功~');
                        this.$router.push('/qualitymanage/prostandard');
                    }else if(res.data.result=='error'){
                        this.$message.error('添加失败');
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
