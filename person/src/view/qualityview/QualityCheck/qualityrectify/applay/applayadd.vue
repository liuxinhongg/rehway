<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">检查时间：</td>
                        <td>
                           <el-form-item prop="chkDate">
                                <el-date-picker v-model="projcheckform.chkDate" type="datetime" style="width:280px" format="yyyy-MM-dd hh:mm:ss" placeholder="检查时间">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                        <td class="tdleft">实际检查人：</td>
                        <td>
                            <el-form-item prop="chkMan">
                                <el-select v-model="projcheckform.chkMan" style="width:280px" placeholder="请选择实际检查人">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                         <td class="tdleft">整改审核人：</td>
                        <td>
                             <el-form-item prop="auditMan">
                                <el-select v-model="projcheckform.auditMan" style="width:280px" placeholder="请选择整改审核人">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">检查计划ID</td>
                        <td>
                             <el-form-item prop="planId">
                                <el-select v-model="projcheckform.planId" style="width:280px" placeholder="请选择检查计划">
                                    <el-option v-for="(item,index) in hiddenpageData" :key="index" :value="item.id" :label="item.prjIdName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        
                        <td class="tdleft">结束日期：</td>
                        <td>
                           <el-form-item prop="limitDate">
                                <el-date-picker v-model="projcheckform.limitDate" type="datetime" style="width:280px" format="yyyy-MM-dd hh:mm:ss" placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="tdleft">照片文件：</td>
                        <td colspan="3">
                            <el-upload class="upload-demo" action="#" :limit="1" accept="image/*" :http-request="handleImg" :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <span class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                            </el-upload>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">整改方式：</td>
                        <td colspan="3">
                            <el-form-item prop="rectifyMode">
                                <el-input v-model.trim="projcheckform.rectifyMode" type="textarea" :maxlength="200" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">纠正预防措施：</td>
                        <td colspan="3">
                            <el-form-item prop="chkRectify">
                                <el-input v-model.trim="projcheckform.chkRectify" type="textarea" :rows="3" :maxlength="200"></el-input>                                
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">检查真实情况内容：</td>
                        <td colspan="3">
                            <el-form-item prop="chkReal">
                                <el-input v-model.trim="projcheckform.chkReal" type="textarea" :maxlength="200" ></el-input>
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
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
       
        return{
            isTrue:'',
            fileList:[],
            projcheckform:{
                planId:'',
                chkDate:'',
                chkMan:'',
                chkRectify:'',
                auditMan:'',
                limitDate:'',
                // filepath:'',
                state:'',
                rectifyMode:'',
                chkReal:'',
            },
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            hiddenpageData:[],
            useryz:{
                chkDate:[{required: true,message: "检查时间",trigger: "change"}],
                chkMan:[{required: true,message: "检查人",trigger: "blur"}],
                planId:[{required: true,message: "检查计划",trigger: "blur"}],
                chkRectify:[{required: true,message: "纠正预防措施",trigger: "blur"}],
                rectifyMode:[{required: true,message: "整改方式",trigger: "blur"}],
                chkReal:[{required: true,message: '检查真是情况内容',trigger: "blur"}],
                chkDate:[{required: true,message: "检查时间",trigger: "change"}],
                auditMan:[{required: true,message: "整改审核人",trigger: "change"}],
                limitDate:[{required: true,message: "结束日期",trigger: "change"}],
                // filepath:[{required: true,message: "照片文件",trigger: "change"}],
            },
            checkform:new FormData()
            // pickerBeginDateBefore: {
            //     disabledDate: (time) => {
            //     let beginDateVal = this.projcheckform.chkDate;
            //     if (beginDateVal) {
            //         return time.getTime() > beginDateVal;
            //     }
            //     }
            // },
            // pickerBeginDateAfter: {
            //     disabledDate: (time) => {
            //     let beginDateVal = this.projcheckform.beginTime;
            //     if (beginDateVal) {
            //         return time.getTime() < beginDateVal;
            //     }
            //     }
            // }
        }
    },
    methods:{
        backForm(){
            this.$router.go(-1)
        },
        handleImg(param){
            this.checkform.append('filepaths',param.file);
            console.log(param.file)
        },
        prsubForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid){
                 this.checkform.append('planId',this.projcheckform.planId)
                 this.checkform.append('time',this.projcheckform.chkDate)
                 this.checkform.append('chkMan',this.projcheckform.chkMan)
                 this.checkform.append('chkRectify',this.projcheckform.chkRectify)
                 this.checkform.append('auditMan',this.projcheckform.auditMan)
                 this.checkform.append('limitDate',this.projcheckform.limitDate)
                 this.checkform.append('state',this.projcheckform.state)
                 this.checkform.append('rectifyMode',this.projcheckform.rectifyMode)
                 this.checkform.append('chkReal',this.projcheckform.chkReal)
                    if(this.id==0){
                        this.$http.post(qualitymanage.qualityceckapplayadd,this.checkform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                           if(res.data.result=='success'){
                              this.$message.success('添加成功~');
                              this.$router.push('/qualitymanage/rectifyapplay');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                         }
                        })
                    }else{
                        this.checkform.append('id',this.id)
                         this.$http.post(qualitymanage.qualityceckapplayupdate,this.checkform).then(res=>{
                        console.log(res);
                        if(res.data.result=='success'){
                           this.$message.success('修改成功~');
                           this.$router.push('/qualitymanage/rectifyapplay');
                        }else if(res.data.result=='error'){
                            this.$message.error('修改失败');
                        }
                      })
                    }
                }
            })
        },
        //查询数据
        searchperson(){
            this.$http.get('/api/quality_rectiry/selectBy?id='+this.id).then(res=>{
            this.projcheckform.planId = res.data.list[0].planId;
            this.projcheckform.chkMan = res.data.list[0].chkMan;
            this.projcheckform.chkRectify = res.data.list[0].chkRectify;
            this.projcheckform.auditMan = res.data.list[0].auditMan;
            this.projcheckform.state = res.data.list[0].stateType;
            this.projcheckform.rectifyMode = res.data.list[0].rectifyMode;
            this.projcheckform.chkReal = res.data.list[0].chkReal;
            this.projcheckform.rectifyMode = res.data.list[0].rectifyMpde;
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
        if(this.id != 0){
            this.searchperson();
            this.isTrue = true
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
