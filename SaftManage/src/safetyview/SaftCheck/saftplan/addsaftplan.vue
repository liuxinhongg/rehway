<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent  ref="saftplanform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">安全计划制定人：</td>
                        <td>
                            <el-form-item prop="cmtMan">
                            <el-select v-model="saftplanform.cmtMan" style="width:280px">
                                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                </el-option>
                            </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">计划主题：</td>
                        <td>
                            <el-form-item prop="title">
                                <el-input v-model="saftplanform.title" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                         <td class="tdleft">计划检查人：</td>
                        <td>
                            <el-form-item prop="chkMan">
                                <el-select v-model="saftplanform.chkMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">检查位置：</td>
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
                         <td class="tdleft">开始时间：</td>
                        <td>
                            <el-form-item prop="beginDateTime">
                                 <el-date-picker style="width:280px"  v-model="saftplanform.beginDateTime"  type="datetime"  placeholder="选择日期时间">  </el-date-picker>
                            </el-form-item>
                        </td>
                        <td class="tdleft">结束时间：</td>
                        <td>
                            <el-form-item prop="endDateTime">
                                 <el-date-picker style="width:280px"  v-model="saftplanform.endDateTime"  type="datetime"  placeholder="选择日期时间">  </el-date-picker>                                
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
                        <td class="tdleft">检查周期：</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input v-model="saftplanform.chkCircle" type="number" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">计划内容：</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input v-model="saftplanform.planCont" type="textarea" :rows="2" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                 
                    <tr>
                        <td class="tdleft">计划目的：</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input v-model="saftplanform.planDest" type="textarea" :rows="2" ></el-input>
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
            saftplanform:{
                title:'',
                cmtMan:'',
                planCont:'',
                planDest:'',
                chkMan:'',
                beginDateTime:'',
                endDateTime:'',
                chkLoc:'',
                chkType:'',
                chkCircle:'',
            },
            wzdata:[],
            aqdetail:[],
            personoption:[],
            useryz:{
                cmtMan:[{required: true,message: "请选择上传员工",trigger: "change"}],           
                title:[{required: true,message: "请输入计划主题",trigger: "blur"}],
            },
            saftplanId:0,
        }
    },
    methods:{
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let ajform=new FormData();
                    ajform.append('cmtMan',this.saftplanform.cmtMan)
                    ajform.append('title',this.saftplanform.title)
                    ajform.append('planCont',this.saftplanform.planCont)
                    ajform.append('planDest',this.saftplanform.planDest)
                    ajform.append('chkMan',this.saftplanform.chkMan)
                    ajform.append('chkLoc',this.saftplanform.chkLoc)
                    ajform.append('chkCircle',this.saftplanform.chkCircle)
                    ajform.append('chkType',this.saftplanform.chkType)
                    if(this.id==0){
                        console.log(this.saftplanform)
                        ajform.append('beginDateTime',this.saftplanform.beginDateTime.getTime())
                        ajform.append('endDateTime',this.saftplanform.endDateTime.getTime())
                        this.$http.post(security.riskplaninsert,ajform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/saftmanage/saftplan');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        ajform.append('id',this.id)
                        if(typeof(this.saftplanform.beginDateTime) == 'number'){
                            ajform.append('beginDateTime',this.saftplanform.beginDateTime)
                        }else{
                            ajform.append('beginDateTime',this.saftplanform.beginDateTime.getTime())
                        }
                        if(typeof(this.saftplanform.endDateTime) == 'number'){
                            ajform.append('endDateTime',this.saftplanform.endDateTime)
                        }else{
                            ajform.append('endDateTime',this.saftplanform.endDateTime.getTime())
                        }
                        this.$http.post(security.riskplanupdate,ajform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/saftmanage/saftplan');
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
                 console.log(res);
                this.wzdata=res.data.list;
                // this.countnum=res.data.count;
            })
        },
        aqtype(){
            this.$http.get(dictapi.ristverify).then(res=>{
                console.log(res)
                this.aqdetail = res.data
            })
        },
        backForm(){
            this.$router.go(-1)
        }
    },
    mounted(){
        this.aqtype()
        this.locationdata()
        this.uploadperson();
        this.id=this.$route.query.id;
        if(this.id!=0){
            this.$http.get(security.riskplanselectBy,{params:{id:this.id}}).then(res=>{
                console.log(res);
                this.saftplanform=res.data.list[0];
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
