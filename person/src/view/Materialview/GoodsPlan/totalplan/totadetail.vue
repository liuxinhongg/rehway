/*
 * @Author: 谢莹
 * @Date: 2019-05-07  
 * @function: 物资计划--总计划--新增/修改
 */
<template>
    <div class="rebuild" >
        <el-scrollbar style="height:100%;overflow-x: hidden;">
        <div v-if="childsta==false"><el-scrollbar style="height:100%;">    
            <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent  ref="saftplanform">
                <el-form-item style="text-align:center;"><h3>物资总计划表</h3></el-form-item>
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft" colspan="1">总计划名称：</td>
                        <td colspan="9">
                            <el-form-item prop="planname">
                                <el-input :disabled="true" v-model="saftplanform.planname" style="width:280px" placeholder="总计划名称"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft" colspan="1">提交人：</td>
                        <td colspan="9">
                            <el-form-item prop="cmtId">
                                <el-select :disabled="true" v-model="saftplanform.cmtId" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft" colspan="1">项目ID：</td>
                        <td  colspan="9">
                            <el-form-item prop="prjId">
                                <el-select :disabled="true" v-model="saftplanform.prjId" style="width:280px">
                                    <el-option v-for="(item,index) in categoryoption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <!-- <td class="tdleft"  colspan="1">状态：</td>
                        <td  colspan="9">
                            <el-form-item prop="state">
                                <el-select :disabled="true" v-model="saftplanform.state"  style="width:280px">
                                    <el-option v-for='(item,index) in stateoption' :key="index" :label="item.name" :value="item.type"></el-option>
                                </el-select>
                            </el-form-item>
                        </td> -->
                    </tr>
                    <tr>
                        <td class="tdleft"  colspan="1">提交时间：</td>
                        <td  colspan="9">
                            <el-form-item prop="cdate">
                                <el-date-picker  :disabled="true" v-model="saftplanform.cdate" type="datetime" placeholder="选择日期时间" style="width:280px"></el-date-picker>
                            </el-form-item>
                        </td> 
                        <td class="tdleft"  :disabled="true" colspan="1">到场时间：</td>
                        <td  colspan="9">
                            <el-form-item prop="arvDate">
                                <el-date-picker  :disabled="true" v-model="saftplanform.arvDate" type="datetime" placeholder="选择日期时间" style="width:280px"></el-date-picker>
                            </el-form-item>
                        </td> 
                    </tr>
                    <tr>
                        <td colspan="20">
                           <span style="margin:0 40%;font-size:18px;font-family: '楷体';">计划物资明细</span>
                        </td>
                    </tr>
                    <tr v-if='doubledata.length>0'>
                        <td colspan="2" style="text-align:center;">序号</td>
                        <td colspan="6" style="text-align:center;">材料名称</td>
                        <td colspan="6" style="text-align:center;">使用位置</td>
                        <td colspan="6" style="text-align:center;">使用量</td>
                    </tr>
                    <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                        <td colspan="2" >{{index+1}}</td>
                        <td colspan="6">{{item.mname}}</td>
                        <td colspan="6">{{item.useLocName}}</td>
                        <td colspan="6">{{item.mnum}}</td>
                    </tr>
                    
                    <tr>
                        <td class="tdleft"  colspan="1">备注：</td>
                        <td colspan="19">
                            <el-form-item>
                                <el-input :disabled="true" v-model="saftplanform.remark" type="textarea" :rows="2"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item style="text-align:center;">
                    <el-button @click="returncancle()" style="margin:0 40px;">返回</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
        </div>
            <el-dialog title="计划物资" :visible.sync="modelVisible" center :close="closevisible">
                <el-form :model="modelform" ref="modelform" :rules="modelrules" @submit.native.prevent>
                    <table border="1" class="tableinsert" style="width:95%;">
                        <tr>
                            <td class="tdleft">材料：</td>
                            <td>
                                <el-form-item prop="mmid">
                                    <el-select v-model="modelform.mmid" style="width:280px">
                                        <el-option v-for="(item,index) in materoption" :key="index" :value="item.id" :label="item.mname"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td class="tdleft">使用位置：</td>
                            <td>
                                <el-form-item prop="useLoc">
                                    <el-select v-model="modelform.useLoc" style="width:280px">
                                        <el-option v-for="(item,index) in localoption" :key="index" :value="item.id" :label="item.locName"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft">需用使用量：</td>
                            <td>
                                <el-form-item prop="mnum">
                                    <el-input v-model="modelform.mnum" style="width:280px" type="number"></el-input>
                                </el-form-item>
                            </td>
                            <td class="tdleft">备注：</td>
                            <td>
                                <el-form-item prop="remark">
                                    <el-input  v-model="modelform.remark" type="textarea" :rows="2"></el-input>
                                </el-form-item>
                            </td> 
                        </tr>
                        
                    </table>
                    <el-form-item style="text-align:center;">
                        <el-button type="primary" native-type="submit" @click="modelesubmit(modelform)">提交</el-button>
                        <el-button @click="modelVisible=false" >返回</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-scrollbar>
    </div>
</template>
<script>
import MStore from '@/components/common/mstore'
import * as material from '@/api/material.js'
import * as dictapi from '@/api/dictapi.js'
export default {
    watch:{
        doubledata:{
            handler(val,oldVal){
                console.log(val)
            },
            deep:true
        }
    },
    //  components: {
    //   child
    // },
    data(){
        return{
            modelform:{
                mmid:'',
                mnum:'',
                useLoc:'',
                remark:'',
                useLocName:'',
                id:0,
                mname:'',
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
            childsta:false,
            // 计划物资表单
            modelplan:{
                mnum:'',
                useLoc:'',
                remark:'',
                mmid:'',
            },
            modelrules:{
                mnum:[{ required: true,message: "请输入需用使用量",trigger: "blur",}],
                useLoc:[{required: true,message: "请输入使用位置",trigger: "blur"}],
                mmid:[{required: true,message: "请选择材料",trigger: "change"}],
                useLoc:[{required: true,message: "请选择仓库位置",trigger: "change"}],
            },
            modeloption:[],
            materoption:[],
            localoption:[],
            planMVisible:false,
            ajform:new FormData(),
            fileList:[],
            // 传值
            saftplanform:{
                cmtId:'',
                planname:'',  
                prjId:'', 
                state:'',
                files:'',
                remark:'',
                arvDate:'',
                cdate:'',
            },
            personoption:[],
            categoryoption:[],
            stateoption:[
                { name:'审批中',type:'0' },
                { name:'审批通过',type:'1' },
                { name:'审批失败',type:'2' },
            ],
            useryz:{
                cmtId:[{required: true,message: "请选择上传员工",trigger: "change"}],           
                prjId:[{required: true,message: "请选择项目ID",trigger: "change"}],           
                state:[{required: true,message: "请选择状态",trigger: "change"}],              
                planname:[{required: true,message: "请输入总计划名称",trigger: "blur"}],
            },
            saftplanId:0,
            modleId:0,
            childValue:[],
            place:[],
            materialname:[],
            form:[],
        }
    },
    methods:{
        //上传文件 获取文件信息的方法
        handlefile(par){
            this.ajform.append('filepaths',par.file);
        },
        //修改和添加的公共方法
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ajform.append('cmtId',this.saftplanform.cmtId)
                    this.ajform.append('planname',this.saftplanform.planname)
                    this.ajform.append('prjId',this.saftplanform.prjId)
                    // this.ajform.append('state',this.saftplanform.state)
                    this.ajform.append('remark',this.saftplanform.remark)
                    let a = JSON.stringify(this.doubledata);
                    this.ajform.append('mPlanDetails',a); 
                    console.log(this.ajform.arvDate)     
                    console.log(this.doubledata);
                    // 新增的方法
                    if(this.saftplanId==0){
                        this.ajform.append('arvDateTime',this.saftplanform.arvDate.getTime())
                        this.ajform.append('cdateTime',this.saftplanform.cdate.getTime())
                        this.$http.post(material.mplaninsert,this.ajform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/materialmanage/goodslplan');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        // 编辑的方法
                        if(typeof(this.saftplanform.cdate)=='number'){
                            this.ajform.append('cdateTime',this.saftplanform.cdate)
                        }else{
                            this.ajform.append('cdateTime',this.saftplanform.cdate.getTime())
                        }
                        if(typeof(this.saftplanform.arvDate)=='number'){
                            this.ajform.append('arvDateTime',this.saftplanform.arvDate)
                        }else{
                            this.ajform.append('arvDateTime',this.saftplanform.arvDate.getTime())
                        }
                        this.ajform.append('planid',this.saftplanId)
                        this.$http.post(material.mplanupdate,this.ajform).then(res=>{
                            // conssolee.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/materialmanage/goodslplan');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }
                } else {
                    this.$message.error('提交数据失败')
                    return false;
                }
            });
        },
        // 返回按钮的事件
        returncancle(){
            this.$router.push({path:'/materialmanage/goodslplan'});
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
        //弹框右上角的x按钮
        closevisible(){
            this.modelVisible=false;
            this.modelform={};
        },
        //新增计划物资
        addmaterial(){
            this.modelVisible=true;
            this.modelform={};
        },
        // 弹框的提交事件
        modelesubmit(Fname){
                    if(this.id==0){
                        if(this.modId==0){
                            this.modelform.id=Math.floor(Math.random()*200);
                            this.doubledata.push(this.modelform);
                            console.log(this.modelform);
                            if(this.doubledata.length!=0){
                                for(let item in this.doubledata,this.materoption,this.localoption){
                                    if(this.materoption[item].id==this.modelform.mmid){
                                        this.modelform.mname= this.materoption[item].mname;
                                        this.modelform.useLocName= this.materoption[item].useName;
                                        // this.modelform.mnum= this.materoption[item].mnum;
                                    }
                                    if(this.localoption[item].id==this.modelform.useLoc){
                                        this.modelform.useLocName= this.localoption[item].locName;
                                    }
                                }
                            }
                            this.modelVisible=false;
                        }else{
                            console.log('我是编辑');
                            for(let val in this.doubledata){
                                if(this.doubledata[val].id==this.modId){
                                    this.doubledata[val].mname=this.modelform.mname;
                                }
                            }
                            for(let item in this.doubledata,this.materoption,this.localoption){
                                    if(this.materoption[item].id==this.modelform.mmid){
                                        this.modelform.mname= this.materoption[item].mname;
                                        this.modelform.useLocName= this.materoption[item].useName;
                                        // this.modelform.mnum= this.materoption[item].mnum;
                                    }
                                    if(this.localoption[item].id==this.modelform.useLoc){
                                        this.modelform.useLocName= this.localoption[item].locName;
                                    }
                                }
                            this.modelVisible=false;
                        }
                    }else{
                        console.log('我是编辑');
                        this.$http.get(material.mplandetailup,{params:Fname}).then(res=>{
                              this.$http.get(material.mplan,{params:{planid:this.saftplanId}}).then(res=>{
                                console.log(res);
                                this.saftplanform=res.data.list[0];
                                this.doubledata =res.data.list[0].mPlanDetails;
                            })
                            this.modelVisible=false;
                        })
                        // this.modelform.id=this.id;
                    }
               
        },
        // 物资计划的修改事件
        doubmodify(id){
            if(this.id==0){
                console.log(id);
                this.modId=id;
                console.log(this.doubledata);
                this.modelVisible=true;
                for(let i in this.doubledata){
                    if(this.doubledata[i].id==id){
                        // console.log(12);
                        this.modelform=this.doubledata[i];
                    }
                }
            }else{
                console.log(id);
                this.modelVisible=true;
                this.$http.get(material.mplandetail,{params:{id:id}}).then(res=>{
                    // console.log(res);
                    this.modelform = res.data.list[0]
                })
            }
           
        },
        //材料配置
        materconfig(){
            this.$http.get(material.mmaterials).then(res=>{
                // console.log(res);
                this.materoption=res.data.list;
            })
        },
        //仓库位置
        // modellocaton(){
        //     this.$http.get(dictapi.locAll).then(res=>{
        //         console.log(res);
        //         this.localoption=res.data.list;
        //     })
        // },
        updats(){
            if(this.saftplanId!=0){
            this.$http.get(material.mplan,{params:{planid:this.saftplanId}}).then(res=>{
                console.log(res);
                this.saftplanform=res.data.list[0];
                this.doubledata =res.data.list[0].mPlanDetails;
            })
            console.log('编辑前请求的数据');
        }
        }
    },
    mounted(){
        this.uploadperson();
        this.category();
        this.materconfig();
        // this.modellocaton();
        this.saftplanId=this.$route.query.id;
        this.id=this.$route.query.id;
        //列表页面编辑操作
        if(this.saftplanId!=0){
            this.$http.get(material.mplan,{params:{planid:this.saftplanId}}).then(res=>{
                console.log(res);
                this.saftplanform=res.data.list[0];
                this.doubledata =res.data.list[0].mPlanDetails;
            })
            console.log('编辑前请求的数据');
        }
    }
}
</script>

<style lang="scss">
.rebuild{
    height:calc(100vh - 100px);
    
}
.rebuild .el-scrollbar__wrap{
    overflow-x: hidden;
}
.rebuild .textOinput{
    outline: none;
    border: none;
}
</style>
