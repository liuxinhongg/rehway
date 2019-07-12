<template>
    <div class="rebuild">
        <p class="persontop">设备保养计划详情</p>

        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">发起人：</td>
                        <td>
                            <el-form-item>
                                   <el-input v-model="projcheckform.userName" style="width:280px" :disabled='istrue'></el-input>
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
                                <el-button @click="backForm()">修改</el-button>
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
import * as equipmanage from '@/api/equipmanage.js'
import * as dictapi from '@/api/dictapi.js'
import * as personapi from '@/api/usercenter.js'

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
                chkCircle:[ 
                        { required: true, message: "输入", trigger: "blur" },
                        { pattern: /^[1-9]\d*$/,message:'请输入保养周期' } 
                        ],
                chkMan:[{required: true,message: "请选择",trigger: "change"}],
                chkCont:[{validator: freqNum, trigger: 'blur'}],
                remark:[{required: true,message: "请选择责任人",trigger: "change"}],
                audit:[{required: true,message: "请选择开始时间",trigger: "change"}],
                leaderNext:[{required: true,message: "请选择审批人",trigger: "change"}],
            },
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
                    checkform.append('id',this.id)                       
                    checkform.append('devcode',this.projcheckform.devcode)   
                    checkform.append('maintainName',this.projcheckform.maintainName)   
                    checkform.append('chkCircle',this.projcheckform.chkCircle)
                    checkform.append('chkMan',this.projcheckform.chkMan)
                    checkform.append('userId',this.projcheckform.userId)
                    checkform.append('chkCont',this.projcheckform.chkCont)
                    checkform.append('remark',this.projcheckform.remark)
                    if(typeof(this.projcheckform.beginDate) == 'number'){
                        checkform.append('beginDateTime',this.projcheckform.beginDate)
                    }else{
                        checkform.append('beginDateTime',this.projcheckform.beginDate.getTime())
                    }
                    checkform.append('leaderNext',this.projcheckform.leaderNext)
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
                    checkform.append('id',this.id)                       
                    checkform.append('devcode',this.projcheckform.devcode)   
                    checkform.append('maintainName',this.projcheckform.maintainName)   
                    checkform.append('chkCircle',this.projcheckform.chkCircle)
                    checkform.append('chkMan',this.projcheckform.chkMan)
                    checkform.append('userId',this.projcheckform.userId)
                    checkform.append('chkCont',this.projcheckform.chkCont)
                    checkform.append('remark',this.projcheckform.remark)
                    checkform.append('leaderNext',this.projcheckform.leaderNext)
                    if(typeof(this.projcheckform.beginDate) == 'number'){
                        checkform.append('beginDateTime',this.projcheckform.beginDate)
                    }else{
                        checkform.append('beginDateTime',this.projcheckform.beginDate.getTime())
                    }
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
                this.sbdetail = res.data.list;
            })
        },
        // 检查位置
        checkType(){
            this.$http.get(dictapi.location).then(res=>{
                this.chkLocoption=res.data.list;
            })
        },
        // 上传人员
        uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                this.personoption=res.data.list;

            })
        },
        // 项目
        Protype(){
            this.$http.get(dictapi.subprj).then(res=>{
                this.ProOption=res.data.list;
                
            })
        },
         dataall(){
          let data={
            id:this.id,
            flowType:this.type
          }
          this.$http.get(personapi.draftde,{params:data}).then(res=>{
            if(res.data.result == "error: 参数 [id] 或 [flowType] 不能为空！"){
              alert('查询错误')
            }
            if(res.data.result == 'success'){
              this.projcheckform = res.data.bill
              this.doubledata = res.data.details
            }
          })
        },
    },
    mounted(){
        this.shebei()
        this.checkType();
        this.uploadperson();
        this.Protype();
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        this.dataall()
       
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
