<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                         <td class="tdleft">整改审核人：</td>
                        <td>
                             <el-form-item prop="auditMan">
                                <el-select v-model="projcheckform.auditMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                         <td class="tdleft" >状态：</td>
                        <td>
                            <el-form-item>
                                 <el-select v-model="projcheckform.state" style="width:280px">
                                    <el-option value="1" label="整改过程"></el-option>
                                    <el-option value="0" label="审核通过"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">审核意见：</td>
                        <td colspan="3">
                            <el-form-item prop="auditOpi">
                                <el-input v-model="projcheckform.auditOpi" type="textarea" :rows="4" ></el-input>
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
            fileList:[],
            projcheckform:{
                auditMan:'',
                state:'',
                auditOpi:'',

            },
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            hiddenpageData:[],
            useryz:{
                auditMan:[{required: true,message: "审核人",trigger: "change"}],
                state:[{required: true,message: "审核人",trigger: "change"}],
                auditOpi:[{required: true,message: "审核意见",trigger: "blur"}],
            },
        }
    },
    methods:{
        backForm(){
            this.$router.go(-1)
        },
        handleImg(param){
            this.projcheckform.filepath=param.file;
        },
        prsubForm() {
           let data ={
             auditMan:this.projcheckform.auditMan,
             state:this.projcheckform.state,
             auditOpi:this.projcheckform.auditOpi,
             id:this.id
           }
            console.log(data);
            this.$http.get(qualitymanage.qualityceckapplayfinsh,{params:data}).then(res=>{
                if(res.data.result=='success'){
                    this.$message.success('添加成功~');
                    this.$router.push('/qualitymanage/rectifyapplay');
                }else if(res.data.result=='error'){
                    this.$message.error('添加失败');
                }
            })
        },
       
         // 上传人员
        uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                // console.log(res);
                this.personoption=res.data.list;
            })
        },
       
    },
    mounted(){
        this.id = this.$route.query.id;
        this.uploadperson();
        this.$http.get(qualitymanage.checkplan).then(res=>{
            this.hiddenpageData=res.data.list;
        })
       
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
