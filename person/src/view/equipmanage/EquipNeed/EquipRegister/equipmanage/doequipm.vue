<template>
    <div class="rebuild">
    <p class="persontop">设备管理列表</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">设备：</td>
                        <td>
                            <el-form-item prop="devcode">
                                <el-select v-model="projcheckform.devcode" style="width:280px">
                                    <el-option v-for="(item,index) in sbdetail" :key="index" :label="item.mname" :value="item.devcode"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">设备所在项目：</td>
                        <td>
                            <el-form-item prop="prjid">
                                <el-select v-model="projcheckform.prjid" style="width:280px">
                                    <el-option v-for="(item,index) in ProOption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">设备到场时间：</td>
                        <td>
                            <el-form-item prop="beginDate">
                                <el-date-picker v-model="projcheckform.beginDate" type="datetime" style="width:280px" format="yyyy-MM-dd hh:mm:ss" :picker-options="pickerBeginDateAfter" placeholder="选择时间">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                        <td class="tdleft">设备离场时间：</td>
                        <td>
                            <el-form-item prop="endDate">
                               <el-date-picker v-model="projcheckform.endDate" type="datetime" style="width:280px" format="yyyy-MM-dd hh:mm:ss" :picker-options="pickerBeginDateAfter" placeholder="选择时间">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">设备所在位置：</td>
                        <td>
                            <el-form-item prop="devLoc">
                                 <el-select v-model="projcheckform.devLoc" style="width:280px">
                                        <el-option v-for="(item,index) in localoption" :key="index" :value="item.id" :label="item.locName"> 
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">提交人：</td>
                        <td>
                            <el-form-item prop="cmtMan">
                                <el-select v-model="projcheckform.cmtMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">备注：</td>
                        <td colspan="3">
                            <el-form-item prop="remark">
                                <el-input type="textarea" v-model.trim="projcheckform.remark"></el-input>
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
            sbdetail:[],
            localoption:[],
            fileList:[],
            projcheckform:{
                devcode:'',
                prjid:'',
                beginDate:'',
                endDate:'',
                cmtMan:'',
                remark:'',
                devLoc:'',
            },
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            useryz:{
                prjid:[{required: true,message: "请选择设备所在项目",trigger: "change"}],
                devcode:[{required: true,message: "请输入设备唯一码",trigger: "blur"}],
                beginDate:[{required: true,message: "请选择设备到场时间",trigger: "change"}],
                endDate:[{required: true,message: "请选择设备离场时间",trigger: "change"}],
                cmtMan:[{required: true,message: "请选择提交人",trigger: "change"}],
                devLoc:[{required: true,message: "请选择设备所在位置",trigger: "change"}],
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
                    checkform.append('devcode',this.projcheckform.devcode)
                    checkform.append('prjid',this.projcheckform.prjid)
                    checkform.append('cmtMan',this.projcheckform.cmtMan)
                    checkform.append('remark',this.projcheckform.remark)
                    checkform.append('devLoc',this.projcheckform.devLoc)
                    console.log(this.projcheckform);
                    if(this.eduId==0){
                        checkform.append('beginDateTime',this.projcheckform.beginDate.getTime())
                        checkform.append('endDateTime',this.projcheckform.endDate.getTime())
                        this.$http.post(equipmanage.devmangeinsert,checkform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/equipmanage/equipmanage');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        checkform.append('id',this.eduId)
                        if(typeof(this.projcheckform.beginDate) == 'number'){
                            checkform.append('beginDateTime',this.projcheckform.beginDate)
                        }else{
                            checkform.append('beginDateTime',this.projcheckform.beginDate.getTime())
                        }
                        if(typeof(this.projcheckform.endDate) == 'number'){
                            checkform.append('endDateTime',this.projcheckform.endDate)
                        }else{
                            checkform.append('endDateTime',this.projcheckform.endDate.getTime())
                        }
                        this.$http.post(equipmanage.devmangeupdate,checkform).then(res=>{
                            // console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/equipmanage/equipmanage');
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
         modellocaton(){
            this.$http.get(dictapi.location).then(res=>{
                // console.log(res);
                this.localoption=res.data.list;
            })
        },
        // 项目
        Protype(){
            this.$http.get(dictapi.subprj).then(res=>{
                // console.log(res);
                this.ProOption=res.data.list;
                
            })
        },
        shebei(){
            this.$http.get(equipmanage.equipreginsert).then(res=>{
                // console.log(res);
                this.sbdetail = res.data.list;
            })
        },
    },
    mounted(){
        this.shebei()
        this.modellocaton()
        this.checkType();
        this.uploadperson();
        this.Protype();
        this.eduId=this.$route.query.id;
        if(this.eduId!=0){
             this.$http.get(equipmanage.devmangeselectBy,{params:{id:this.eduId}}).then(res=>{
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
