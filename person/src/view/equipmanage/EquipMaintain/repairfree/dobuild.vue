<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">检查项目：</td>
                        <td>
                            <el-form-item prop="proId">
                                <el-select v-model="projcheckform.proId" style="width:280px">
                                    <el-option v-for="(item,index) in ProOption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">检查部位：</td>
                        <td>
                            <el-form-item prop="chkArea">
                                <el-input v-model.trim="projcheckform.chkArea" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">检查位置：</td>
                        <td>
                            <el-form-item prop="chkLoc">
                                <el-select v-model="projcheckform.chkLoc" style="width:280px">
                                    <el-option v-for="(item,index) in chkLocoption" :key="index" :value="item.id" :label="item.locName"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">检查人员：</td>
                        <td>
                            <el-form-item prop="chkMan">
                                <el-select v-model="projcheckform.chkMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">责任人：</td>
                        <td>
                            <el-form-item prop="dirMan">
                                <el-select v-model="projcheckform.dirMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">检查频率：</td>
                        <td>
                            <el-form-item prop="freq">
                                <el-input v-model.trim="projcheckform.freq" type="number" style="width:280px" :maxlength="2"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">开始时间：</td>
                        <td>
                            <el-form-item prop="beginTime">
                                <el-date-picker v-model="projcheckform.beginTime" type="datetime" style="width:280px" :picker-options="pickerBeginDateBefore" format="yyyy-MM-dd hh:mm:ss" placeholder="开始日期">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                        <td class="tdleft">结束时间：</td>
                        <td>
                            <el-form-item prop="endTime">
                                <el-date-picker v-model="projcheckform.endTime" type="datetime" style="width:280px" format="yyyy-MM-dd hh:mm:ss" :picker-options="pickerBeginDateAfter" placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">检查内容：</td>
                        <td colspan="3">
                            <el-form-item prop="descri">
                                <el-input v-model.trim="projcheckform.descri" type="textarea" :rows="4" ></el-input>
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
        return{
            fileList:[],
            projcheckform:{
                proId:'',
                chkArea:'',
                chkLoc:'',
                chkMan:'',
                dirMan:'',
                freq:'',
                descri:'',
                beginTime:'',
                endTime:'',
            },
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            useryz:{
                proId:[{required: true,message: "请选择上传员工",trigger: "change"}],
                chkArea:[{required: true,message: "请输入标题",trigger: "blur"}],
                chkLoc:[{required: true,message: "请选择检查位置",trigger: "change"}],
                chkMan:[{required: true,message: "请选择工种类别",trigger: "change"}],
                freq:[{validator: freqNum, trigger: 'blur'}],
                dirMan:[{required: true,message: "请选择责任人",trigger: "change"}],
                beginTime:[{required: true,message: "请选择开始时间",trigger: "change"}],
                endTime:[{required: true,message: "请选择结束时间",trigger: "change"}]
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
        prsubForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let checkform=new FormData();
                    checkform.append('proId',this.projcheckform.proId)
                    checkform.append('chkArea',this.projcheckform.chkArea)
                    checkform.append('chkLoc',this.projcheckform.chkLoc)
                    checkform.append('chkMan',this.projcheckform.chkMan)
                    checkform.append('freq',this.projcheckform.freq)
                    checkform.append('descri',this.projcheckform.descri)
                    checkform.append('beginTime',this.projcheckform.beginTime)
                    checkform.append('endTime',this.projcheckform.endTime)
                    checkform.append('dirMan',this.projcheckform.dirMan)
                    if(this.eduId==0){
                        this.$http.post(qualitymanage.checkplaninsert,checkform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/qualitymanage/qualityplan');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        checkform.append('id',this.eduId)
                        this.$http.post(qualitymanage.checkplanupdate,checkform).then(res=>{
                            // console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/qualitymanage/qualityplan');
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
            this.$router.push('/qualitymanage/qualityplan');
        },
        // 检查位置
        checkType(){
            this.$http.get(dictapi.location).then(res=>{
                // console.log(res);
                this.chkLocoption=res.data.list;
            })
        },
        // 上传人员
        uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                // console.log(res);
                this.personoption=res.data.list;

            })
        },
        // 项目
        Protype(){
            this.$http.get(dictapi.subprj).then(res=>{
                // console.log(res);
                this.ProOption=res.data.list;
                
            })
        },
    },
    mounted(){
        this.checkType();
        this.uploadperson();
        this.Protype();
        this.eduId=this.$route.query.id;
        if(this.eduId!=0){
            this.$http.get('/api/quality_plan/selectBy?id='+this.eduId).then(res=>{
                // console.log(res);
                this.projcheckform=res.data.list[0];
                this.projcheckform.beginTime='';
                this.projcheckform.endTime=''
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
