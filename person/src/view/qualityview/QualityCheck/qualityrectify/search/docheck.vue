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
                         <td class="tdleft">纠正预防措施：</td>
                        <td>
                            <el-form-item prop="chkRectify">
                                <el-input v-model.trim="projcheckform.chkRectify" style="width:280px" placeholder="请输入纠正预防措施"></el-input>                                
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">检查部位：</td>
                        <td>
                           <el-form-item prop="chkArea">
                                <el-input v-model="projcheckform.chkArea" style="width:280px" placeholder="请输入检查部位"></el-input>                                                                
                            </el-form-item>
                        </td>
                         <td class="tdleft">检查频率：</td>
                        <td>
                            <el-form-item prop="freq">
                                <el-input v-model.trim="projcheckform.freq" style="width:280px" placeholder="请输入检查频率"></el-input>                                
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">实际检查人：</td>
                        <td>
                            <el-form-item prop="chkMan">
                                <el-select v-model="projcheckform.chkMan" style="width:280px" placeholder="请选择实际检查人">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                         <td class="tdleft">整改审核人：</td>
                        <td>
                             <el-form-item prop="auditMan">
                                <el-select v-model="projcheckform.auditMan" style="width:280px" placeholder="请选择整改审核人">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">检查计划</td>
                        <td>
                             <el-form-item prop="planId">
                                <el-select v-model="projcheckform.planId" style="width:280px" disabled >
                                    <el-option v-for="(item,index) in hiddenpageData" :key="index" :value="item.id" :label="item.prjIdName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">结束日期：</td>
                        <td>
                           <el-form-item prop="limitDate">
                                <el-date-picker v-model="projcheckform.limitDate" type="datetime" style="width:280px" format="yyyy-MM-dd hh:mm:ss" placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">照片文件：</td>
                        <td>
                            <el-upload class="upload-demo" action="#" :limit="1" accept="image/*" :http-request="handleImg">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <span class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                            </el-upload>
                        </td>
                        <td class="tdleft" >状态：</td>
                        <td>
                            <el-form-item>
                                 <el-select v-model="projcheckform.state" style="width:280px" placeholder="请选择状态">
                                    <el-option value="1" label="整改过程"></el-option>
                                    <el-option value="0" label="审核通过"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                     <tr>
                        <td class="tdleft">整改方式：</td>
                        <td colspan="3">
                            <el-form-item prop="rectifyMode">
                                <el-input v-model.trim="projcheckform.rectifyMode" type="textarea" :rows="4" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft" >检查内容：</td>
                        <td colspan="3">
                            <el-form-item prop="descri">
                                <el-input v-model.trim="projcheckform.descri" type="textarea" :rows="4" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">检查真实情况内容：</td>
                        <td colspan="3">
                            <el-form-item prop="chkReal">
                                <el-input v-model.trim="projcheckform.chkReal" type="textarea" :rows="4" ></el-input>
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
            id:0,
            fileList:[],
            projcheckform:{
                planId:'',
                chkDate:'',
                chkMan:'',
                chkRectify:'',
                auditMan:'',
                limitDate:'',
                filepath:'',
                state:'',
                rectifyMode:'',
                chkReal:'',
                chkArea:'',
                descri:'',
                freq:'',
                proId:'',
            },
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            hiddenpageData:[],
            useryz:{
                planId:[{required: true,message: "请选择检查计划",trigger: "change"}],
                chkDate:[{required: true,message: "请选择检查时间",trigger: "change"}],
                chkMan:[{required: true,message: "请选择实际检查人",trigger: "change"}],
                chkRectify:[{required: true,message: "请输入纠正预防措施",trigger: "blur"}],
                auditMan:[{required: true,message: "请选择整改审核人",trigger: "change"}],
                limitDate:[{required: true,message: "请选择结束日期",trigger: "change"}],
                filepath:[{required: true,message: "照片文件",trigger: "change"}],
                state:[{required: true,message: "请选择状态",trigger: "change"}],
                chkReal:[{required: true,message: "请输入检查真实情况内容",trigger: "blur"}],
                chkArea:[{required: true,message: "请输入检查部位",trigger: "blur"}],
                descri:[{required: true,message: "请输入检查内容",trigger: "blur"}],
                freq:[{required: true,message: "请输入检查频率",trigger: "blur",type:'number'}],
                rectifyMode:[{required: true,message: "请输入整改方式",trigger: "blur"}],
            },
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
        handleImg(param){
            this.projcheckform.filepath=param.file;
        },

        prsubForm() {
            let checkform=new FormData();
            // let chkdate = ;
            // console.log(chkdate);
            checkform.append('planId',this.projcheckform.planId)
            checkform.append('time',this.projcheckform.chkDate)
            checkform.append('chkMan',this.projcheckform.chkMan)
            checkform.append('chkRectify',this.projcheckform.chkRectify)
            checkform.append('auditMan',this.projcheckform.auditMan)
            checkform.append('limitDate',this.projcheckform.limitDate)
            checkform.append('filepath',this.projcheckform.filepath)//文件
            checkform.append('state',this.projcheckform.state)
            checkform.append('rectifyMode',this.projcheckform.rectifyMode)
            checkform.append('chkReal',this.projcheckform.chkReal)
            checkform.append('chkArea',this.projcheckform.chkArea)
            checkform.append('descri',this.projcheckform.descri)
            checkform.append('freq',this.projcheckform.freq)
            this.$http.post(qualitymanage.qualityceckapplayadd,checkform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                if(res.data.result=='success'){
                    this.$message.success('添加成功~');
                    this.$router.push('/qualitymanage/rectifyapplay');
                }else if(res.data.result=='error'){
                    this.$message.error('添加失败');
                }
            })
            this.$http.get('/api/quality_chk/update?id='+this.id).then(res=>{
                console.log(res);
            })
        },
        //返回按钮
        backForm(){
            this.$router.go(-1)
        },
        //查询人员
        searchperson(){
            this.$http.get('/api/quality_rectiry/selectBy?id='+this.id).then(res=>{
            this.projcheckform = res.data.list[0]
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
