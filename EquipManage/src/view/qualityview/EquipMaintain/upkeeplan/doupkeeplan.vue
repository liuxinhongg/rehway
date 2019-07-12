
// 保养计划 
<template>
    <div class="rebuild">
        <p class="persontop">设备保养计划</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">发起人：</td>
                        <td>
                            <el-form-item prop="userId">
                                <el-select v-model="projcheckform.userId" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">责任人：</td>
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
                        <td class="tdleft" style="width:150px;">设备唯一编码：</td>
                        <td>
                             <el-form-item prop="devcode" >
                                <el-select v-model="projcheckform.devcode" style="width:280px" :disabled='istrue'>
                                    <el-option v-for="(item,index) in sbdetail" :key="index" :label="item.mname" :value="item.devcode"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">保养名称：</td>
                        <td>
                            <el-form-item prop="maintainName">
                                <el-input v-model="projcheckform.maintainName" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">保养周期(n天/1次)：</td>
                        <td>
                            <el-form-item prop="chkCircle">
                               <el-input v-model="projcheckform.chkCircle" style="width:280px;"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">保养开始时间：</td>
                        <td>
                            <el-form-item prop="beginDate">
                                <el-date-picker v-model="projcheckform.beginDate" type="datetime" style="width:280px" :picker-options="pickerBeginDateBefore" format="yyyy-MM-dd hh:mm:ss" placeholder="开始日期">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">审批人：</td>
                        <td colspan="3">
                            <el-form-item prop="leaderNext">
                                <el-select v-model="projcheckform.leaderNext" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">保养检查内容：</td>
                        <td colspan="3" style="height:100px;" >
                            <el-form-item prop="chkCont">
                                <quill-editor  v-model="projcheckform.chkCont"   ref="myQuillEditor"   :options="projcheckform.editorOption"  >  </quill-editor>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">备注：</td>
                        <td colspan="3">
                            <el-form-item prop="remark">
                                <el-input type="textarea" v-model="projcheckform.remark"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-form-item>
                                <el-button type="primary" native-type="submit" @click="prsubForm(projcheckform)" >提交</el-button>
                            </el-form-item>
                        </td>
                        <td colspan="2">
                            <el-form-item>
                                <el-button @click="backForm()">保存</el-button>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
            </el-form>
        </el-scrollbar>
    </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
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
        return{
            istrue:false,
            sbdetail:[],
            fileList:[],
            projcheckform:{
                beginDate:'',
                leaderNext:'',
                maintainName:'',
                chkCircle:'',
                chkMan:'',
                userId:'',
                chkCont:'',
                remark:'',
                audit:'',
                devcode:'',
                editorOption:{}
            },
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            useryz:{
                beginDate:[{required: true,message: "请选择",trigger: "change"}],
                maintainName:[{required: true,message: "请输入保养名称",trigger: "blur"}],
                chkCircle:[{required: true,message: "请选择检查位置",trigger: "change"}],
                chkMan:[{required: true,message: "请选择",trigger: "change"}],
                chkCont:[{validator: freqNum, trigger: 'blur'}],
                remark:[{required: true,message: "请选择责任人",trigger: "change"}],
                audit:[{required: true,message: "请选择开始时间",trigger: "change"}],
                leaderNext:[{required: true,message: "请选择审批人",trigger: "change"}],
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
                    let checkform=new FormData();
                    checkform.append('devcode',this.projcheckform.devcode)   
                    checkform.append('maintainName',this.projcheckform.maintainName)   
                    checkform.append('chkCircle',this.projcheckform.chkCircle)
                    checkform.append('chkMan',this.projcheckform.chkMan)
                    checkform.append('userId',this.projcheckform.userId)
                    checkform.append('chkCont',this.projcheckform.chkCont)
                    checkform.append('remark',this.projcheckform.remark)
                    checkform.append('beginDateTime',this.projcheckform.beginDate.getTime())
                    checkform.append('leaderNext',this.projcheckform.leaderNext)
                        console.log(this.projcheckform)
                        this.$http.post(equipmanage.devmantplansubmit,checkform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/equipmanage/upkeeplan');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
        },
        backForm(){
            let checkform=new FormData();
                    checkform.append('devcode',this.projcheckform.devcode)   
                    checkform.append('maintainName',this.projcheckform.maintainName)   
                    checkform.append('chkCircle',this.projcheckform.chkCircle)
                    checkform.append('chkMan',this.projcheckform.chkMan)
                    checkform.append('userId',this.projcheckform.userId)
                    checkform.append('chkCont',this.projcheckform.chkCont)
                    checkform.append('remark',this.projcheckform.remark)
                    checkform.append('beginDateTime',this.projcheckform.beginDate.getTime())
                    checkform.append('leaderNext',this.projcheckform.leaderNext)
                        console.log(this.projcheckform)
                        this.$http.post(equipmanage.devmantplansave,checkform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/project/draftbox');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
        },
        shebei(){
            this.$http.get(equipmanage.equipreginsert).then(res=>{
                console.log(res);
                this.sbdetail = res.data.list;
            })
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
        this.shebei()
        this.checkType();
        this.uploadperson();
        this.Protype();
        this.eduId=this.$route.query.id;
        if(this.eduId!=0){
            this.istrue = true
            this.$http.get(equipmanage.devmantplanselectBy,{params:{id:this.eduId}}).then(res=>{
                console.log(res);
                this.projcheckform=res.data.list[0];
                if(typeof(res.data.list[0].state) == 'number'){
                    this.projcheckform.state = res.data.list[0].state.toString()
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
