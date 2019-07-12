<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">保养计划：</td>
                        <td>
                            <el-form-item prop="maintId">
                                <el-select v-model="projcheckform.maintId" style="width:280px" disabled >
                                    <el-option v-for="(item,index) in bydetail" :key="index" :value="item.maintId" :label="item.maintIdInfo[0].maintainName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">保养人：</td>
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
                        <td class="tdleft">设备状态：</td>
                        <td>
                            <el-form-item prop="chkState">
                                <el-select v-model="projcheckform.chkState" style="width:280px">
                                    <el-option value="0" label="正常"></el-option>
                                    <el-option value="1" label="已保养"></el-option>
                                    <el-option value="2" label="有问题不影响使用"></el-option>
                                    <el-option value="3" label="影响使用报停"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">检查问题描述：</td>
                        <td>
                            <el-form-item prop="chkCont">
                                <el-input type="textarea" v-model="projcheckform.chkCont"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                   <tr>
                        <td class="tdleft">附件文件</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-upload action="" :file-list="fileList" :multiple=true :http-request="handlefile">
                                    <el-button size="small" type="primary">选取文件</el-button>
                                </el-upload>
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
import * as equipmanage from '@/api/equipmanage.js'

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
            bydetail:[],
            fileList:[],
            projcheckform:{
                chkMan:'',
                chkState:'',
                maintId:'',
                chkCont:'',
            },
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            checkform:new FormData(),
            useryz:{
                chkState:[{required: true,message: "请选择保养状态",trigger: "change"}],
                chkMan:[{required: true,message: "请选择保养人",trigger: "change"}],
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
        handlefile(par){
            this.checkform.append('filepaths',par.file);
        },
        prsubForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.checkform.append('chkMan',this.projcheckform.chkMan)
                    this.checkform.append('chkState',this.projcheckform.chkState)
                    this.checkform.append('maintId',this.projcheckform.maintId)
                    this.checkform.append('chkCont',this.projcheckform.chkCont)
                    this.checkform.append('id',this.eduId)
                    // console.log(this.projcheckform,this.eduId)
                    this.$http.post(equipmanage.devmanittodayupdate,this.checkform).then(res=>{
                        // console.log(res);
                        if(res.data.result=='success'){
                            this.$message.success('添加成功~');
                            this.$router.push('/equipmanage/todayupkeep');
                        }else if(res.data.result=='error'){
                            this.$message.error('添加失败');
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        backForm(){
            this.$router.go(-1);
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
        // 保养计划
        byplan(){
             this.$http.get(equipmanage.devmanittodayselectBy).then(res=>{
                console.log(res);
                this.bydetail=res.data.list;
            })
        }
    },
    mounted(){
        this.byplan()
        this.checkType();
        this.uploadperson();
        this.Protype();
        this.eduId=this.$route.query.id;
        if(this.eduId!=0){
            this.$http.get(equipmanage.devmanittodayselectBy,{params:{id:this.eduId}}).then(res=>{
                console.log(res);
                this.projcheckform=res.data.list[0];
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
