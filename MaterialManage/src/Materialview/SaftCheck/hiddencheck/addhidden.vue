<template>
    <div class="checkbuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="checkform" :rules="useryz" @submit.native.prevent  ref="checkform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">隐患检查人：</td>
                        <td>
                            <el-form-item prop="chkMan">
                            <el-select v-model="checkform.chkMan" style="width:280px">
                                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                </el-option>
                            </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">检查日期：</td>
                        <td>
                            <el-form-item prop="chkDate">
                                <el-date-picker v-model="checkform.chkDate" style="width:280px" placeholder="选择日期时间" type="datetime" :picker-options="pickerDisabled"></el-date-picker>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">隐患位置：</td>
                        <td>
                            <el-form-item prop="chkLoc">
                                <el-select v-model="checkform.chkLoc" style="width:280px">
                                    <el-option v-for="(item,index) in zoneoption" :key="index" :value="item.id" :label="item.locName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">检查类型：</td>
                        <td>
                            <el-form-item prop="chkType">
                                <el-select v-model="checkform.chkType" style="width:280px">
                                    <el-option v-for="(item,index) in checkoption" :key="index" :value="item.code" :label="item.type"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">隐患类型：</td>
                        <td>
                            <el-form-item prop="riskType">
                                <el-select v-model="checkform.riskType" style="width:280px">
                                    <el-option v-for="(item,index) in hiddentypeoption" :key="index" :value="item.id" :label="item.riskType"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">隐患性质：</td>
                        <td>
                            <el-form-item prop="riskAttr">
                                <el-select v-model="checkform.riskAttr" style="width:280px">
                                    <el-option v-for="(item,index) in hiddenxzoption" :key="index" :value="item.code" :label="item.type"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                     <tr>
                        <td class="tdleft">隐患负责人：</td>
                        <td>
                            <el-form-item prop="riskLeader">
                                <el-select v-model="checkform.riskLeader" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">隐患直接责任人：</td>
                        <td>
                            <el-form-item prop="riskMan">
                                <el-select v-model="checkform.riskMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">扣除分数：</td>
                        <td>
                            <el-form-item prop="riskScore">
                                <el-input v-model="checkform.riskScore" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">附件图1：</td>
                        <td>
                            <el-form-item prop="riskScore">
                                <el-upload action=" " :limit="1" accept="image/*" :http-request="handlefileone">
                                    <el-button size="small" type="primary">上传附件</el-button>
                                    <span class="el-upload__tip">只能上传图片文件</span>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">附件图2：</td>
                        <td>
                            <el-form-item prop="riskScore">
                                <el-upload action=" " :limit="1" accept="image/*" :http-request="handlefiletwo">
                                    <el-button size="small" type="primary">上传附件</el-button>
                                    <span class="el-upload__tip">只能上传图片文件</span>
                                </el-upload>
                            </el-form-item>
                        </td>
                        <td class="tdleft">附件图3：</td>
                        <td>
                            <el-form-item prop="riskScore">
                                <el-upload action=" " :limit="1" accept="image/*" :http-request="handlefilethree">
                                    <el-button size="small" type="primary">上传附件</el-button>
                                    <span class="el-upload__tip">只能上传图片文件</span>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr v-if="cheackId!=0">
                    <!-- <tr> -->
                        <td class="tdleft">隐患状态：</td>
                        <td>
                            <el-form-item >
                                <el-select v-model="checkform.riskState" style="width:280px">
                                    <el-option v-for="(item,index) in statusoption" :key="index" :value="item.code" :label="item.type"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="tdleft">隐患内容：</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input v-model="checkform.planDest" type="textarea" :rows="2" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-button type="primary" native-type="submit" @click="hiddensubmit('checkform')">提交</el-button>
                        </td>
                        <td colspan="2">
                            <el-button @click="backForm('checkform')">返回</el-button>
                        </td>
                    </tr>
                </table>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
import formatDate from '@/filter/date.js';
export default {
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    data(){
        return{
            pickerDisabled:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            checkform:{
                chkMan:'',
                chkCont:'',
                chkDate:'',
                chkLoc:'',
                chkType:'',
                riskType:'',
                riskAttr:'',
                riskMan:'',
                riskScore:'',
                riskLeader:'',
                filepath1:'',
                filepath2:'',
                filepath3:'',
                riskState:'',
            },
            personoption:[],
            zoneoption:[],//隐患区域
            checkoption:[],//检查类型
            hiddentypeoption:[],//隐患类型
            hiddenxzoption:[],//隐患性质
            statusoption:[],//隐患状态
            useryz:{
                chkMan:[{required: true,message: "请选择隐患检查人",trigger: "change"}],           
                chkDate:[{required: true,message: "请选择检查日期",trigger: "change"}],           
                chkLoc:[{required: true,message: "请选择隐患位置",trigger: "change"}],           
                chkType:[{required: true,message: "请选择检查类型",trigger: "change"}],           
                riskType:[{required: true,message: "请选择隐患类型",trigger: "change"}],           
                riskAttr:[{required: true,message: "请选择隐患性质",trigger: "change"}],           
                riskMan:[{required: true,message: "请选择隐患直接责任人",trigger: "change"}],           
                riskLeader:[{required: true,message: "请选择隐患负责人",trigger: "change"}],           
                riskScore:[{required: true,message: "请输入扣除分数",trigger: "blur"}],         
            },
            cheackId:0,
        }
    },
    methods:{
        handlefileone(parone){
            this.checkform.filepath1=parone.file;
        },
        handlefiletwo(partwo){
            this.checkform.filepath2=partwo.file;            
        },
        handlefilethree(parthree){
            this.checkform.filepath3=parthree.file;                        
        },
        hiddensubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let cheakhiddenform=new FormData();
                    cheakhiddenform.append('chkMan',this.checkform.chkMan)
                    cheakhiddenform.append('chkCont',this.checkform.chkCont)
                    cheakhiddenform.append('chkDate',this.checkform.chkDate)
                    cheakhiddenform.append('chkLoc',this.checkform.chkLoc)
                    cheakhiddenform.append('chkType',this.checkform.chkType)
                    cheakhiddenform.append('riskType',this.checkform.riskType)
                    cheakhiddenform.append('riskAttr',this.checkform.riskAttr)
                    cheakhiddenform.append('riskMan',this.checkform.riskMan)
                    cheakhiddenform.append('riskScore',this.checkform.riskScore)
                    cheakhiddenform.append('riskLeader',this.checkform.riskLeader)
                    cheakhiddenform.append('filepath1',this.checkform.filepath1)
                    cheakhiddenform.append('filepath2',this.checkform.filepath2)
                    cheakhiddenform.append('filepath3',this.checkform.filepath3)
                    if(this.cheackId==0){
                        this.$http.post('/api/risk_chk/insert',cheakhiddenform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/saftmanage/hiddencheck');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        cheakhiddenform.append('riskId',this.cheackId)
                        cheakhiddenform.append('riskState',this.checkform.riskState)
                        if(this.checkform.riskState==''||this.checkform.riskState==null){
                            this.$message.error('隐患类型不能为空，请选择')
                        }else{
                            this.$http.post('/api/risk_chk/update',cheakhiddenform).then(res=>{
                                console.log(res);
                                if(res.data.result=='success'){
                                    this.$message.success('修改成功~');
                                    this.$router.push('/saftmanage/hiddencheck');
                                }else if(res.data.result=='error'){
                                    this.$message.error('添加失败');
                                }
                            })
                        }

                    }
                } else {
                    this.$message.error('提交数据失败')
                    return false;
                }
            });
        },
        returncancle(){
            this.$router.push({path:'/saftmanage/safteducate'});
        },
        // 上传人员
        uploadperson(){
            this.$http.get('/api/user/user_select').then(res=>{
                this.personoption=res.data.list;
            })
        },
        // 隐患区域
        zonedata(){
            this.$http.post('/api/location/selectBytitle?name=').then(res=>{
                console.log(res);
                this.zoneoption=res.data.result;
            })
        },
        //检查类型
        checkdata(){
            this.$http.post('/api/dict/rist_verify').then(res=>{
                console.log(res);
                this.checkoption=res.data;
            })
        },
        //隐患类型
        hiddentypedata(){
            this.$http.post('/api/dict/rist_type').then(res=>{
                console.log(res);
                this.hiddentypeoption=res.data.list;
            })
        },
        //隐患性质
        naturepedata(){
            this.$http.post('/api/dict/rist_danger').then(res=>{
                console.log(res);
                this.hiddenxzoption=res.data;
            })
        },
        // 隐患状态
        statusdata(){
            this.$http.post('/api/dict/rist_danger_state').then(res=>{
                console.log(res);
                this.statusoption=res.data;
            })
        }
    },
    mounted(){
        this.zonedata();//隐患区域
        this.checkdata();//检查类型
        this.hiddentypedata();//隐患类型
        this.naturepedata();//隐患性质
        this.statusdata();//隐患状态
        this.uploadperson();
        this.cheackId=this.$route.query.id;
        if(this.cheackId!=0){
            this.$http.post('/api/risk_chk/selectByID?id='+this.cheackId).then(res=>{
                console.log(res);
                this.checkform=res.data.result[0];
                res.data.result[0].chkDate='';
            })
            console.log('编辑前请求的数据');
        }
    }
}
</script>

<style>
.checkbuild{
    height:calc(100vh - 80px);
}
.checkbuild .el-scrollbar__wrap{
    overflow-x: hidden;
}
</style>
