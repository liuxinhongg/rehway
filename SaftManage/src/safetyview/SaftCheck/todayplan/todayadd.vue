<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent  ref="saftplanform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">隐患检查人：</td>
                        <td>
                            <el-form-item prop="chkMan">
                                <el-select v-model="saftplanform.chkMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                         <td class="tdleft">隐患负责人：</td>
                        <td>
                            <el-form-item prop="riskLeader">
                                <el-select v-model="saftplanform.riskLeader" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                       
                    </tr>
                    <tr>
                        <td class="tdleft">检查类型：</td>  
                        <td>
                            <el-form-item prop="chkType">
                                <el-select v-model="saftplanform.chkType" style="width:280px">
                                    <el-option v-for="(item,index) in aqdetail" :key="index" :value="item.code" :label="item.type"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">隐患位置：</td>
                        <td>
                            <el-form-item prop="chkLoc">
                            <el-select v-model="saftplanform.chkLoc" style="width:280px">
                                <el-option v-for="(item,index) in wzdata" :key="index" :value="item.id" :label="item.locName"> 
                                </el-option>
                            </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                         <td class="tdleft">隐患类型：</td>  
                        <td>
                            <el-form-item prop="riskType">
                                <el-select v-model="saftplanform.riskType" style="width:280px">
                                    <el-option v-for="(item,index) in yhdetail" :key="index" :value="item.id" :label="item.riskType"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">隐患级别：</td>
                        <td>
                            <el-form-item prop="riskAttr">
                            <el-select v-model="saftplanform.riskAttr" style="width:280px">
                                <el-option v-for="(item,index) in yhonedata" :key="index" :value="item.code" :label="item.type"> 
                                </el-option>
                            </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">隐患状态：</td>
                        <td>
                            <el-form-item prop="riskState">
                            <el-select v-model="saftplanform.riskState" style="width:280px">
                                <el-option v-for="(item,index) in yhstates" :key="index" :value="item.code" :label="item.type"> 
                                </el-option>
                            </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">提交：</td>
                        <td>
                            <el-form-item prop="sub">
                            <el-select v-model="saftplanform.sub" style="width:280px">
                                <el-option value="0" label="提交"> </el-option>
                                <el-option value="1" label="暂时不提交"> </el-option>
                            </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                         <td class="tdleft">隐患直接负责人：</td>
                        <td>
                            <el-form-item prop="riskMan">
                                <el-select v-model="saftplanform.riskMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                         <td class="tdleft">扣分分数：</td>
                        <td>
                            <el-form-item prop="riskScore">
                                <el-input v-model="saftplanform.riskScore" required type="number" style="width:280px" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                  
                    <tr>
                        <td class="tdleft">附件：</td>
                        <td colspan="3">
                            <el-form-item>
                                <el-upload action="" :limit="1" :file-list="fileList" accept="image/*" :before-upload="uploadbefore" :http-request="handlefile">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <span class="el-upload__tip">只能上传图片文件，且不超过500kb</span>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                     <tr>
                        <td class="tdleft">隐患内容：</td>
                        <td colspan="3">
                            <el-form-item prop="chkCont">
                                <el-input v-model="saftplanform.chkCont" type="textarea"  style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-button type="primary" native-type="submit" @click="saftplansubmit('saftplanform')">提交</el-button>
                        </td>
                        <td colspan="2">
                            <el-button @click="backForm('saftplanform')">返回</el-button>
                        </td>
                    </tr>
                </table>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
import * as security from '@/api/security.js'
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
        return{
            fileList:[],
            saftplanform:{
                chkCont:'',
                chkMan:'',
                riskLeader:'',
                riskMan:'',
                riskType:'',
                riskAttr:'',
                chkLoc:'',
                chkType:'',
                chkCircle:'',
                sub:'',
                riskScore:'',
                riskState:'',
                },
            wzdata:[],
            yhdetail:[],
            yhonedata:[],
            aqdetail:[],
            yhstates:[],
            personoption:[],
            ajform:new FormData(),
            useryz:{
                chkMan:[{required: true,message: "请输入隐患检查人",trigger: "blur"}],           
                chkCont:[{required: true,message: "请输入隐患内容",trigger: "blur"}],
                riskLeader:[{required: true,message: "请选择隐患负责人",trigger: "change"}],
                riskType:[{required: true,message: "请选择隐患类型",trigger: "change"}],
                riskAttr:[{required: true,message: "请选择隐患级别",trigger: "change"}],
                riskState:[{required: true,message: "请选择隐患状态",trigger: "change"}],
            },
            saftplanId:0,
        }
    },
    methods:{
        // 文件上传之前的限制
        uploadbefore(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            return isLt2M;
        },
        handlefile(param){
            this.ajform.append('filepaths',param.file);
        },
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ajform.append('chkMan',this.saftplanform.chkMan)
                    this.ajform.append('chkCont',this.saftplanform.chkCont)
                    this.ajform.append('riskMan',this.saftplanform.riskMan)
                    this.ajform.append('riskLeader',this.saftplanform.riskLeader)
                    this.ajform.append('chkLoc',this.saftplanform.chkLoc)
                    this.ajform.append('riskScore',this.saftplanform.riskScore)
                    this.ajform.append('sub',this.saftplanform.sub)
                    this.ajform.append('riskState',this.saftplanform.riskState)
                    this.ajform.append('chkCircle',this.saftplanform.chkCircle)
                    this.ajform.append('riskType',this.saftplanform.riskType)
                    this.ajform.append('riskAttr',this.saftplanform.riskAttr)
                    this.ajform.append('chkType',this.saftplanform.chkType)
                    if(this.id==0){
                        console.log(this.saftplanform)
                        this.$http.post(security.risktodayinsert,this.ajform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/saftmanage/todayplan');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        this.ajform.append('id',this.id)
                        this.$http.post(security.risktodayupdate,this.ajform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/saftmanage/todayplan');
                            }else if(res.data.result=='error'){
                                this.$message.error('修改失败');
                            }
                        })
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
            this.$http.get(dictapi.user).then(res=>{
                this.personoption=res.data.list;
            })
        },
        locationdata(){
             this.$http.get(security.locationselectAll).then(res=>{
                //  console.log(res);
                this.wzdata=res.data.list;
                // this.countnum=res.data.count;
            })
        },
        aqtype(){
            this.$http.get(dictapi.ristverify).then(res=>{
                // console.log(res)
                this.aqdetail = res.data
            })
        },
        yhtype(){
            this.$http.get(dictapi.risttype).then(res=>{
                // console.log(res);
                this.yhdetail = res.data.list
            })
        },
        yhone(){
            this.$http.get(dictapi.ristdanger).then(res=>{
                // console.log(res)
               this.yhonedata =  res.data
            })
        },
        yhstate(){
            this.$http.get(dictapi.ristdangerstate).then(res=>{
                // console.log(res);
                this.yhstates = res.data
            })
        },
backForm(){
            this.$router.go(-1)
        }
    },
    mounted(){
        this.yhstate()
        this.aqtype()
        this.yhone()
        this.yhtype()
        this.locationdata()
        this.uploadperson();
        this.id=this.$route.query.id;
        if(this.id!=0){
            this.$http.get(security.risktodayselectby,{params:{id:this.id}}).then(res=>{
                console.log(res);
                this.saftplanform=res.data.list[0];
                if(typeof(res.data.list[0].sub) == 'number'){
                    this.saftplanform.sub = res.data.list[0].sub.toString()
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
