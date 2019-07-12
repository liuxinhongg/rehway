<template>
    <div class="rebuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="projcheckform" :rules="useryz" @submit.native.prevent  ref="projcheckform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">项目：</td>
                        <td>
                           <el-form-item prop="prjId">
                                 <el-select v-model="projcheckform.prjId" style="width:280px">
                                    <el-option v-for="(item,index) in proname" :key="index" :value="item.id" :label="item.categoryTypeName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">分部分项</td>
                        <td>
                           <el-form-item style="display:inline-block;width:200px">
                                <el-select v-model="value" @change="subitem">
                                    <el-option v-for="(item,index) in fbfx" :key="index" :value="item.subprj" :label="item.subprj"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            &nbsp;&nbsp;
                            <el-form-item prop="subItem" style="display:inline-block;width:200px">
                                <el-select v-model="projcheckform.subItem">
                                    <el-option v-for="(item,index) in fbfxin" :key="index" :value="item.id" :label="item.prjs"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">详细检查部位：</td>
                        <td>
                           <el-form-item prop="loc">
                                <el-input v-model="projcheckform.loc" style="width:280px"></el-input>                                                                
                            </el-form-item>
                        </td>
                         <td class="tdleft">检查部位：</td>
                        <td>
                            <el-form-item prop="locid">
                                <el-select v-model="projcheckform.locid" style="width:280px">
                                    <el-option v-for="(item,index) in locname" :key="index" :value="item.id" :label="item.locName"> 
                                    </el-option>
                                </el-select>                                    
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">测量日期：</td>
                        <td>
                            <el-form-item prop="mdate">
                                 <el-date-picker v-model="projcheckform.mdate" type="datetime" style="width:280px" format="yyyy-MM-dd hh:mm:ss" placeholder="测量日期">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                         <td class="tdleft">项目负责人：</td>
                        <td>
                             <el-form-item prop="resman">
                                <el-select v-model="projcheckform.resman" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">验收人员1：</td>
                        <td>
                             <el-form-item prop="mman1">
                               <el-select v-model="projcheckform.mman1" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">验收人员2：</td>
                        <td>
                           <el-form-item prop="mman2">
                                <el-select v-model="projcheckform.mman2" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">验收人员3：</td>
                        <td>
                            <el-form-item prop="mman3">
                                <el-select v-model="projcheckform.mman3" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                       <td class="tdleft">测量结果：</td>
                        <td>
                            <el-form-item prop="result">
                                <el-select v-model="projcheckform.result" style="width:280px">
                                    <el-option value="0" label="正常"> </el-option>
                                    <el-option value="1" label="不正常"> </el-option>
                                </el-select>
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
            value:'',
            fbfxin:[],
            fbfx: [],
            fileList:[],
            projcheckform:{
                prjId:'',
                subItem:'',
                loc:'',
                locid:'',
                mdate:'',
                resman:'',
                mman1:'',
                mman2:'',
                mman3:'',
                result:'',
            },
            locname:[],
            ProOption:[],
            personoption:[],
            chkLocoption:[],
            hiddenpageData:[],
            proname:[],
            useryz:{
                prjId:[{required: true,message: '项目',trigger: "change"}],
                subItem:[{required: true,message: '分部分项',trigger: "change"}],
                locid:[{required: true,message: '检查部位',trigger: "change"}],
                mdate:[{required: true,message: '测量日期',trigger: "change"}],
                resman:[{required: true,message: '项目负责人',trigger: "change"}],
                mman1:[{required: true,message: '验收人员1',trigger: "change"}],
                mman2:[{required: true,message: '验收人员2',trigger: "change"}],
                mman3:[{required: true,message: '验收人员3',trigger: "change"}],
                loc:[{required: true,message: "详细检查部位",trigger: "blur"}],
            },
        }
    },
    methods:{
        prsubForm() {
            let data = {
                prjId:this.projcheckform.prjId,
                subItem:this.projcheckform.subItem,
                loc:this.projcheckform.loc,
                locid:this.projcheckform.locid,
                mtime:this.projcheckform.mdate.getTime(),
                resman:this.projcheckform.resman,
                mman1:this.projcheckform.mman1,
                mman2:this.projcheckform.mman2,
                mman3:this.projcheckform.mman3,
                result:this.projcheckform.result,
                id:this.projcheckform.id
            }
            if(this.id=='0'){
                this.$http.get(qualitymanage.measurinsert,{params:data}).then(res=>{
                if(res.data.result=='success'){
                    this.$message.success('添加成功~');
                    this.$router.push('/qualitymanage/measuredata');
                }else if(res.data.result=='error'){
                    this.$message.error('添加失败');
                }
            })
            }else{
                console.log(data);
                this.$http.get(qualitymanage.measurupdate,{params:data}).then(res=>{
                    if(res.data.result=='success'){
                        this.$message.success('修改成功~');
                        this.$router.push('/qualitymanage/measuredata');
                    }else if(res.data.result=='error'){
                        this.$message.error('修改失败');
                    }
                })
            }
           
        },
        //返回按钮
        backForm(){
            this.$router.go(-1)
        },
        subitem(){
            console.log(this.value);
            for(let i in this.fbfx){
                if(this.fbfx[i].subprj == this.value){
                    this.fbfxin = this.fbfx[i].child
                    console.log(this.fbfxin);
                }
            }
        },
        // 查询项目
        searchpro(){
            this.$http.post('/api/sub_prj/selectAll').then(res=>{
                // console.log(res)
                this.proname = res.data.list;
            })
        },
        
        // 检查部位 
        searchlocal(){
            this.$http.post('/api/location/selectAll').then(res=>{
                // console.log(res);
                this.locname = res.data.list;
            })
        },
        //分部分项
        searchsamepro(){
            this.$http.post('/api/dict/sun_prj_list').then(res=>{
                console.log(res);
                this.fbfx = res.data;
            })
        },
         // 上传人员
        uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                // console.log(res);
                this.personoption=res.data.list;
            })
        },
        searchperson(){
            this.$http.post('/api/realMesure/selectBy?id='+this.id).then(res=>{
                console.log(res);
                this.projcheckform = res.data.list[0];
                if(res.data.list[0].result=='0'){
                    this.projcheckform.result ='0'
                }
                if(res.data.list[0].result==1){
                    this.projcheckform.result ='1'
                }
                if(Number.isInteger(res.data.list[0].subItem)){
                   this.projcheckform.subItem =  ''
                }
                if(Number.isInteger(res.data.list[0].mdate)){
                   this.projcheckform.mdate =  ''
                }
            })
        }
       
    },
    mounted(){
        this.id = this.$route.query.id;
        this.searchpro();
        this.searchlocal();
        this.searchsamepro();
        this.uploadperson();
        this.$http.get(qualitymanage.checkplan).then(res=>{
            this.hiddenpageData=res.data.list;
        })
        if(this.id != 0){
            this.searchperson();
            this.projcheckform.id = this.$route.query.id
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
