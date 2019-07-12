
<template>
    <div class="equipsearch" >
        <p class="persontop">设备需求计划详情</p>
        <el-scrollbar style="height:100%;overflow-x: hidden;">
            <div>
                <el-scrollbar style="height:100%;">    
                    <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent  ref="saftplanform">
                        <table border="1" class="tableinsert">
                            <tr>
                                <td class="tdleft" colspan="1">填报人：</td>
                                <td colspan="9">
                                    <el-form-item prop="userName">
                                        <el-input v-model="saftplanform.userName"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="tdleft" colspan="1">审批人：</td>
                                <td colspan="9">
                                    <el-form-item prop="leaderNext">
                                        <el-select v-model="saftplanform.leaderNext" style="width:280px">
                                            <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdleft" colspan="1">设备需求计划名称：</td>
                                <td colspan="9">
                                    <el-form-item prop="planName">
                                        <el-input v-model="saftplanform.planName" style="width:280px" placeholder="设备需求计划名称"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="tdleft" colspan="1">项目：</td>
                                <td  colspan="9">
                                    <el-form-item prop="prjId">
                                        <el-select v-model="saftplanform.prjId" style="width:280px">
                                            <el-option v-for="(item,index) in categoryoption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                            </tr>
                            
                            <tr>
                                <td class="tdleft"  colspan="1">附件：</td>
                                <td  colspan="19">
                                    <el-form-item >
                                        <el-upload class="upload-demo" action=""  multiple :http-request="needfile" :file-list="fileList">
                                            <el-button size="small" type="primary">上传附件</el-button>
                                            </el-upload>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="20">
                                <span style="margin:0 40%;font-size:18px;font-family: '楷体';">设备明细列表</span>
                                    <el-button v-if="id==0" style="text-align:right;margin-right:10px;" type="primary" @click="addmaterial()">+设备</el-button>
                                </td>
                            </tr>
                            <tr v-if='doubledata.length>0'>
                                <td colspan="2" style="text-align:center;">序号</td>
                                <td colspan="4" style="text-align:center;">物资</td>
                                <td colspan="4" style="text-align:center;">所在位置</td>
                                <td colspan="3" style="text-align:center;">机械物资的数量</td>
                                <td colspan="3" style="text-align:center;">备注</td>
                                <td colspan="1" style="text-align:center;">操作</td>
                            </tr>
                            <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                                <td colspan="2" >{{index+1}}</td>
                                <td colspan="4">{{item.mmid}}</td>
                                <td colspan="4">{{item.mloc}}</td>
                                <td colspan="3">{{item.mnum}}</td>
                                <td colspan="3">{{item.remark}}</td>
                                <td colspan="1"><el-button type="text" @click="doubmodify(item.id)">修改</el-button></td>
                            </tr>
                            <tr>
                                <td class="tdleft"  colspan="1">备注：</td>
                                <td colspan="19">
                                    <el-form-item>
                                        <el-input v-model="saftplanform.remark" type="textarea" :rows="2"></el-input>
                                    </el-form-item>
                                </td> 
                            </tr>
                           
                        </table>
                        <el-form-item style="text-align:center;">
                            <el-button type="primary" native-type="submit" @click="saftplansubmit('saftplanform')">修改</el-button>
                            <el-button @click="modelV('saftplanform')" >重新提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
            </div>
            <el-dialog title="设备" :visible.sync="modelVisible" center :close="closevisible">
                <el-form :model="equipdetialform" ref="equipdetialform" :rules="modelrules" @submit.native.prevent>
                    <table border="1" class="tableinsert" style="width:95%;">
                        <tr>
                            <td class="tdleft">物资ID：</td>
                            <td>
                                <el-form-item prop="mmid">
                                    <el-select v-model="equipdetialform.mmid">
                                        <el-option v-for="(item,index) in wzdetail" :key="index" :value="item.id" :label="item.mname"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td class="tdleft">所在位置：</td>
                            <td>
                                <el-form-item prop="mloc">
                                    <el-select v-model="equipdetialform.mloc">
                                        <el-option v-for="(item,index) in localoption" :key="index" :value="item.id" :label="item.locName"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft">机械物资的数量：</td>
                            <td>
                                <el-form-item prop="mnum">
                                    <el-input v-model="equipdetialform.mnum" type="number"></el-input>
                                </el-form-item>
                            </td>
                            <td class="tdleft">开始时间：</td>
                            <td>
                                <el-form-item prop="mBeginDate">
                                    <el-date-picker v-model="equipdetialform.mBeginDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft">备注：</td>
                            <td colspan="3">
                                <el-form-item prop="remark">
                                    <el-input  v-model="equipdetialform.remark" type="textarea" :rows="2"></el-input>
                                </el-form-item>
                            </td> 
                        </tr>
                    </table>
                    <el-form-item style="text-align:center;">
                        <el-button type="primary" native-type="submit" @click="modelesubmit(equipdetialform)">提交</el-button>
                        <el-button @click="modelVisible=false" >返回</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-scrollbar>
    </div>
</template>
<script>
import * as material from '@/api/material.js'
import * as dictapi from '@/api/dictapi.js'
import * as equipmanage from '@/api/equipmanage.js'
import  formatDate from '@/filter/date.js';
import * as personapi from '@/api/usercenter.js'

export default {
    filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
    data(){
        return{
            id:0,
            wzdetail:[],
            fileList:[],
            equipdetialform:{
                mmid:'',
                mnum:'',
                mloc:'',
                mBeginDate:'',
                remark:'',
                mname:'',
                uselocName:'',
            },
            statusoption:[
                {name:"确认",type:'1'},
                {name:"未确认",type:'0'},
            ],
            modId:0,
            // 传值   数组
            doubledata:[],
            modelVisible:false,
            num:0,
            modelrules:{
                mnum:[ 
                    { required: true, message: "输入", trigger: "blur" },
                    { pattern: /^[1-9]\d*$/,message:'请输入使用量，数字型' } 
                    ],
                mprice:[{required: true,message: "请输入参考价格",trigger: "blur"}],
                mmid:[{required: true,message: "请选择物资",trigger: "change"}],
                mloc:[{required: true,message: "请选择位置",trigger: "change"}],
                mBeginDate:[{required: true,message: "请选择时间",trigger: "change"}],
            },
            modeloption:[],
            materoption:[],
            localoption:[],
            planMVisible:false,
            ajform:new FormData(),
            // 传值
            saftplanform:{
                cmtMan:'',
                planName:'',  
                prjId:'',
                remark:'',
                audit:'',
                leaderNext:''
            },
            personoption:[],
            categoryoption:[],
            useryz:{
                cmtMan:[{required: true,message: "请选择上传员工",trigger: "change"}],           
                prjId:[{required: true,message: "请选择项目ID",trigger: "change"}],                  
                planName:[{required: true,message: "请输入设备需求计划名称",trigger: "blur"}],
                leaderNext:[{required: true,message: "请选择审批人",trigger: "change"}],
            },
            modleId:0,
            childValue:[],
            place:[],
            materialname:[],
            form:[],
            id:'',
            fileid:0,
        }
    },
    methods:{
        // 文件上传
        needfile(per){
            this.ajform.append('afile',per.file)
        },
        //修改和添加的公共方法
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ajform.append('planid',this.id)
                    this.ajform.append('cmtMan',this.saftplanform.cmtMan)
                    this.ajform.append('leaderNext',this.saftplanform.leaderNext)
                    this.ajform.append('planName',this.saftplanform.planName)
                    this.ajform.append('prjId',this.saftplanform.prjId)
                    this.ajform.append('remark',this.saftplanform.remark)
                    this.ajform.append('audit',this.saftplanform.audit)
                    let a = JSON.stringify(this.doubledata);
                    this.ajform.append('devReqPlanDetails',a);
                        this.$http.post(equipmanage.devreqplansave,this.ajform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('提交成功~');

                                this.$router.push('/project/draftbox')
                            }else if(res.data.result=='error'){
                                this.$message.error('提交失败'); 
                            }
                        })
                   
                } else {
                    this.$message.error('提交数据失败')
                    return false;
                }
            });
        },
        // 上传人员
        uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                this.personoption=res.data.list;
            })
        },
        // 分包项目
        category(){
            this.$http.get('/api/sub_prj/selectAll').then(res=>{
                this.categoryoption=res.data.list;
            })
        },
        // 物资
        wzdata(){
            this.$http.get(material.mmaterials).then(res=>{
                this.wzdetail = res.data.list;
            })
        },
        //弹框右上角的x按钮
        closevisible(){
            this.modelVisible=false;
            this.equipdetialform={};
        },
        //新增计划物资
        addmaterial(){
            this.modelVisible=true;
            this.equipdetialform={};
            this.modId=0;
        },
        // 弹框的提交事件
        modelesubmit(Fname){
            if(this.id==0){
                if(this.modId==0){
                    this.equipdetialform.id=Math.floor(Math.random()*200);
                    this.equipdetialform.mBeginDateTime = this.equipdetialform.mBeginDate.getTime();
                    this.doubledata.push(this.equipdetialform);
                    if(this.doubledata.length!=0){
                        for(let item in this.doubledata,this.wzdetail,this.localoption){
                            if(this.wzdetail[item].id==this.equipdetialform.mmid){
                                this.equipdetialform.mmidName= this.wzdetail[item].mname;
                            }
                            if(this.localoption[item].id==this.equipdetialform.mloc){
                                this.equipdetialform.mlocName= this.localoption[item].locName;
                            }
                        }
                    }
                    this.modelVisible=false;
                }else{
                    this.equipdetialform.id=this.modId;
                    for(let val in this.doubledata){
                        if(this.doubledata[val].id==this.modId){
                            this.equipdetialform.mBeginDateTime = this.equipdetialform.mBeginDate.getTime();
                            this.doubledata[val]=this.equipdetialform;
                        }
                    }
                    for(let item in this.doubledata,this.materoption,this.localoption){
                        if(this.materoption[item].id==this.equipdetialform.mmid){
                            this.equipdetialform.mname= this.materoption[item].mname;
                        }
                            if(this.localoption[item].id==this.equipdetialform.useloc){
                            this.equipdetialform.uselocName= this.localoption[item].locName;
                        }
                    }
                    this.modelVisible=false;
                }
            }else{
                Fname.mrid = this.id
                 for(let val in this.doubledata){
                      if(this.doubledata[val].id==this.modId){
                            this.equipdetialform.mBeginDateTime = this.equipdetialform.mBeginDate.getTime();
                            this.doubledata[val]=this.equipdetialform;
                      }
                  }
                  for(let item in this.doubledata,this.materoption,this.localoption){
                      if(this.materoption[item].id==this.equipdetialform.mmid){
                          this.equipdetialform.mname= this.materoption[item].mname;
                      }
                          if(this.localoption[item].id==this.equipdetialform.useloc){
                          this.equipdetialform.uselocName= this.localoption[item].locName;
                      }
                  }
                    this.modelVisible=false;

                }
            },
        // 物资计划的修改事件
        doubmodify(id){
                this.modId=id;
                this.modelVisible=true;
                for(let i in this.doubledata){
                    if(this.doubledata[i].id==id){
                        this.equipdetialform=this.doubledata[i]
                    }
                }
           
        },
        //材料配置
        materconfig(){
            this.$http.get('/api/mmaterials/selectBy').then(res=>{
                this.materoption=res.data.list;
            })
        },
        //仓库位置
        modellocaton(){
            this.$http.get(dictapi.location).then(res=>{
                this.localoption=res.data.list;
            })
        },
        modelV(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ajform.append('planid',this.id)
                    this.ajform.append('cmtMan',this.saftplanform.cmtMan)
                    this.ajform.append('leaderNext',this.saftplanform.leaderNext)
                    this.ajform.append('planName',this.saftplanform.planName)
                    this.ajform.append('prjId',this.saftplanform.prjId)
                    this.ajform.append('remark',this.saftplanform.remark)
                    this.ajform.append('audit',this.saftplanform.audit)
                    let a = JSON.stringify(this.doubledata);
                    this.ajform.append('devReqPlanDetails',a);
                        this.$http.post(equipmanage.devreqplansubmit,this.ajform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('提交成功~');
                                this.$router.push('/project/draftbox');
                            }else if(res.data.result=='error'){
                                this.$message.error('提交失败'); 
                            }
                        })
                   
                } else {
                    this.$message.error('提交数据失败')
                    return false;
                }
            });
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
                this.saftplanform = res.data.bill
                this.doubledata = res.data.details
                for(let i in this.doubledata){
                    this.doubledata[i].mBeginDateTime = this.doubledata[i].mBeginDate                    
                }
          })
        },
    },
    mounted(){
        this.wzdata();
        this.uploadperson();
        this.category();
        this.materconfig();
        this.modellocaton();
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        this.dataall()
        
    }
}
</script>

<style lang="scss">
.equipsearch{
    height:calc(100vh - 100px);
    
}
.equipsearch .el-scrollbar__wrap{
    overflow-x: hidden;
}
.equipsearch .textOinput{
    outline: none;
    border: none;
}
</style>