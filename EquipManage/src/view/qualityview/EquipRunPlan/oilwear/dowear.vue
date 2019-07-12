<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">检查项目：</td>
                        <td>
                            <el-form-item prop="prjId">
                                <el-select v-model="projcheckform.prjId" style="width:280px">
                                    <el-option v-for="(item,index) in ProOption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
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
                        <td class="tdleft">设备：</td>
                        <td>
                            <el-form-item prop="devCode">
                                <el-select v-model="projcheckform.devCode">
                                    <el-option v-for="(item,index) in sbdetail" :key="index" :label="item.mname" :value="item.devcode"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">用油：</td>
                        <td>
                            <el-form-item prop="oilType">
                                <el-select v-model="projcheckform.oilType" style="width:280px">
                                    <el-option value="0" label="柴油"></el-option>
                                    <el-option value="1" label="汽油"> </el-option>
                                    <el-option value="2" label="机油"> </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                   
                    <tr>
                        <td class="tdleft">加油时间：</td>
                        <td>
                            <el-form-item prop="oilDate">
                                <el-date-picker v-model="projcheckform.oilDate" type="datetime" style="width:280px" format="yyyy-MM-dd hh:mm:ss" placeholder="开始日期">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                        <td class="tdleft">加油量：</td>
                        <td>
                            <el-form-item prop="oilVal">
                                <el-input v-model="projcheckform.oilVal" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                     <tr>
                        <td class="tdleft">单价：</td>
                        <td>
                            <el-form-item prop="price">
                                <el-input v-model="projcheckform.price" style="width:280px"></el-input>

                            </el-form-item>
                        </td>
                        <td class="tdleft">小计：</td>
                        <td>
                            <el-form-item prop="subtotal">
                                <el-input :value="projcheckform.price*projcheckform.oilVal"></el-input>

                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">备注：</td>
                        <td colspan="3">
                            <el-form-item prop="remark">
                                <el-input v-model="projcheckform.remark" type="textarea" :rows="4" ></el-input>
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
            sbdetail:[],
            fileList:[],
            projcheckform:{
                prjId:'',
                cmtMan:'',
                devCode:'',
                oilType:'',
                oilDate:'',
                oilVal:'',
                remark:'',
                subtotal:'',
                price:'',
            },
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            useryz:{
                prjId:[{required: true,message: "请选择项目",trigger: "change"}],
                cmtMan:[{required: true,message: "请选择提交人",trigger: "change"}],
                devCode:[{required: true,message: "请选择设备",trigger: "change"}],
                oilType:[{required: true,message: "请选择用油类型",trigger: "change"}],
                oilDate:[{required: true,message: "请选择用油时间",trigger: "change"}],
                oilVal:[{required: true,message: "请选择加油量",trigger: "change"}],
                price:[{required: true,message: "请输入单价",trigger: "blur"}],
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
                let beginDateVal = this.projcheckform.oilDate;
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
                    checkform.append('prjId',this.projcheckform.prjId)
                    checkform.append('cmtMan',this.projcheckform.cmtMan)
                    checkform.append('devCode',this.projcheckform.devCode)
                    checkform.append('oilType',this.projcheckform.oilType)
                    checkform.append('oidVal',this.projcheckform.oilVal)
                    checkform.append('price',this.projcheckform.price)
                    checkform.append('subtotal',this.projcheckform.subtotal)
                    checkform.append('remark',this.projcheckform.remark)
                    if(this.eduId==0){
                        checkform.append('oilDateTime',this.projcheckform.oilDate.getTime())
                        this.$http.post(equipmanage.devoilinsert,checkform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/equipmanage/oilwear');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        checkform.append('id',this.eduId)
                        if(typeof(this.projcheckform.oilDate) == 'number'){
                            checkform.append('oilDateTime',this.projcheckform.oilDate)
                        }else{
                            checkform.append('oilDateTime',this.projcheckform.oilDate.getTime())
                        }
                        this.$http.post(equipmanage.devoilupdate,checkform).then(res=>{
                            // console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/equipmanage/oilwear');
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
        // 项目
        Protype(){
            this.$http.get(dictapi.subprj).then(res=>{
                // console.log(res);
                this.ProOption=res.data.list;
                
            })
        },
         shebei(){
            this.$http.get(equipmanage.equipreginsert).then(res=>{
                console.log(res);
                this.sbdetail = res.data.list;
            })
        },
    },
    mounted(){
        this.shebei()
        this.checkType();
        this.uploadperson();
        this.Protype();
        this.eduId=this.$route.query.id;
        this.id=this.$route.query.id;
        if(this.eduId!=0){
            this.$http.get(equipmanage.devoilselectBy,{params:{id:this.id}}).then(res=>{
                console.log(res);
                this.projcheckform=res.data.list[0];
                // this.projcheckform.beginTime='';
                // this.projcheckform.endTime=''
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
