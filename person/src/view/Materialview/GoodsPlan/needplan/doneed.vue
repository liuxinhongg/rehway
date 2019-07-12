/*
 * @Author: 谢莹
 * @Date: 2019-05-07  
 * @function: 需求  新增
 */
<template>
    <div class="rebuild" >
        <el-scrollbar style="height:100%;overflow-x: hidden;">
        <div v-if="childsta==false"><el-scrollbar style="height:100%;">    
            <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent  ref="saftplanform">
                <el-form-item style="text-align:center;"><h3>材料需用计划表</h3></el-form-item>
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft" colspan="1">需求计划名称：</td>
                        <td colspan="9">
                            <el-form-item prop="mrName">
                                <el-input v-model.trim="saftplanform.mrName" style="width:280px" placeholder="总计划名称"></el-input>
                            </el-form-item>
                        </td>
                         <td class="tdleft" colspan="1">项目ID：</td>
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
                        <td class="tdleft" colspan="1">提交人：</td>
                        <td colspan="9">
                            <el-form-item prop="cmtMan">
                                <el-select v-model="saftplanform.cmtMan" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft"  colspan="1">计划执行人：</td>
                        <td  colspan="9">
                            <el-form-item prop="execMan">
                                <el-select v-model="saftplanform.execMan"  style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft" colspan="1">审批人：</td>
                        <td colspan="9">
                            <el-form-item prop="leaderNext">
                                <el-select v-model="saftplanform.leaderNext" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">到场日期：</td>
                        <td  colspan="9">
                            <el-form-item prop="comeDate">
                                <el-date-picker  v-model="saftplanform.comeDate" type="datetime" placeholder="选择日期时间" style="width:280px"></el-date-picker>
                            </el-form-item>
                        </td> 
                    </tr>
                  
                    <tr>
                        <td colspan="20">
                           <span style="margin:0 40%;font-size:18px;font-family: '楷体';">计划物资明细</span>
                            <el-button style="text-align:right;margin-right:10px;" type="primary" @click="addmaterial()">+计划物资</el-button>
                        </td>
                    </tr>
                    <tr v-if='doubledata.length>0'>
                        <td colspan="1" style="text-align:center;">序号</td>
                        <td colspan="4" style="text-align:center;">材料名称</td>
                        <td colspan="4" style="text-align:center;">使用位置</td>
                        <td colspan="3" style="text-align:center;">使用量</td>
                        <td colspan="3" style="text-align:center;">参考价格</td>
                        <td colspan="3" style="text-align:center;">确认状态</td>
                        <td colspan="1" style="text-align:center;">操作</td>
                    </tr>
                    <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                        <td colspan="1" >{{index+1}}</td>
                        <td colspan="4">{{item.mname}}</td>
                        <td colspan="4">{{item.uselocName}}</td>
                        <td colspan="3">{{item.mnum}}</td>
                        <td colspan="3">{{item.mprice}}</td>
                        <td colspan="3">{{item.provState==0 ? '未确认' : '确认'}}</td>
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
                    <el-button type="primary" native-type="submit" @click="saftplansubmit('saftplanform')">提交</el-button>
                    <el-button @click="returncancle('saftplanform')" >保存</el-button>
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
                                <el-form-item prop="useloc">
                                    <el-select v-model="modelform.useloc" style="width:280px">
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
                                    <el-input v-model="modelform.mnum" style="width:280px" type="number" placeholder="请输入使用量"></el-input>
                                </el-form-item>
                            </td>
                            <td class="tdleft">参考价格：</td>
                            <td>
                                <el-form-item prop="mprice">
                                    <el-input v-model="modelform.mprice" style="width:280px" placeholder="请输入正整数"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                       
                        <tr>
                            <td class="tdleft">是否超额：</td>
                            <td>
                                <el-form-item prop="ifover">
                                    <el-select v-model="modelform.ifover" style="width:280px">
                                        <el-option value="0" label="否"></el-option>
                                        <el-option value="1" label="是"></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td class="tdleft">小计：</td>
                            <td>
                                <el-form-item prop="msum">
                                    <el-input :value="modelform.mnum*modelform.mprice"></el-input>
                                </el-form-item>
                            </td>
                           
                        </tr>
                         <tr>
                            <td class="tdleft">供应商确认状态：</td>
                            <td>
                                <el-form-item prop="provState">
                                    <el-select v-model="modelform.provState" style="width:280px">
                                        <el-option v-for="(item,index) in statusoption" :key="index" :value="item.type" :label="item.name"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                             <td class="tdleft">备注：</td>
                            <td>
                                <el-form-item prop="remark">
                                    <el-input  v-model="modelform.remark" type="textarea" ></el-input>
                                </el-form-item>
                            </td> 
                        </tr>
                        <tr v-if="modelform.provState == 1">
                            <td class="tdleft" >供应商确认时间：</td>
                            <td colspan="3">
                                <el-form-item prop="provDateTime">
                                    <el-date-picker  v-model="modelform.provDateTime" required type="datetime" placeholder="选择日期时间" style="width:280px"></el-date-picker>
                                </el-form-item>
                            </td> 
                        </tr>
                    </table>
                    <el-form-item style="text-align:center;">
                        <el-button type="primary" native-type="submit" @click="modelesubmit('modelform')">提交</el-button>
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
    //  components: {
    //   child
    // },
    data(){
        return{
            modelform:{
                mmid:'',
                mnum:'',
                useloc:'',
                mprice:'',
                provState:'',
                infover:'',
                provDateTime:'',
                msum:'',
                remark:'',
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
            modelrules:{
                mnum:[{ required: true,message: "请输入需用使用量",trigger: "blur"},{pattern:/^[1-9][0-9]{0,2}$/,message:'请输入数字，且不能超过三位数'}],
                mprice:[{required: true,message: "请输入参考价格",trigger: "blur"},{pattern:/^[1-9]{0,1}\d{1,16}$/,message:'价格是正整数,请不超过17位'}],
                mmid:[{required: true,message: "请选择材料",trigger: "change"}],
                useloc:[{required: true,message: "请选择使用位置",trigger: "change"}],
                provState:[{required: true,message: "请选择供应商确认状态",trigger: "change"}],
                ifover:[{required: true,message: "请选择是否超额",trigger: "change"}],
            },
            modeloption:[],
            materoption:[],
            localoption:[],
            planMVisible:false,
            ajform:new FormData(),
            fileList:[],
            // 传值
            saftplanform:{
                cmtMan:'',
                mrName:'',  
                prjId:'',
                msum:'', 
                state:'',
                execMan:'',
                remark:'',
                comeDate:'',
                cmtDate:'',
                leaderNext:'',
            },
            personoption:[],
            categoryoption:[],
            stateoption:[
                { name:'审批中',type:'0' },
                { name:'审批通过',type:'1' },
                { name:'审批失败',type:'2' },
            ],
            useryz:{
                cmtMan:[{required: true,message: "请选择提交人",trigger: "change"}],           
                prjId:[{required: true,message: "请选择项目ID",trigger: "change"}],
                execMan:[{required: true,message: "请选择计划执行人",trigger: "change"}],    
                comeDate:[{required: true,message: "请选择到场时间",trigger: "change"}],           
                // state:[{required: true,message: "请选择状态",trigger: "change"}],                
                mrName:[{required: true,message: "请输入需求计划名称",trigger: "blur"},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{5,20}$/,message:'计划名称5~20个字符'}],
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
        //修改和添加的公共方法
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ajform.append('cmtMan',this.saftplanform.cmtMan)
                    this.ajform.append('mrName',this.saftplanform.mrName)
                    this.ajform.append('prjId',this.saftplanform.prjId)
                    this.ajform.append('remark',this.saftplanform.remark)
                    this.ajform.append('execMan',this.saftplanform.execMan)
                    this.ajform.append('leaderNext',this.saftplanform.leaderNext)
                    let a = JSON.stringify(this.doubledata);
                    this.ajform.append('mRequirePlanDetails',a);
                    console.log(this.doubledata);
                    console.log(this.saftplanform);
                        this.ajform.append('comeDateTime',this.saftplanform.comeDate.getTime())
                    this.$http.post(material.mrequiresubmit,this.ajform).then(res=>{
                        if(res.data.result=='success'){
                            this.$message.success('添加成功~');
                            this.$router.push('/materialmanage/needplan');
                        }else if(res.data.result=='error'){
                            this.$message.error('添加失败');
                        }
                    })
                   
                } else {
                    this.$message.error('提交数据失败')
                    return false;
                }
            });
        },
        // 返回按钮的事件
        returncancle(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ajform.append('cmtMan',this.saftplanform.cmtMan)
                    this.ajform.append('mrName',this.saftplanform.mrName)
                    this.ajform.append('prjId',this.saftplanform.prjId)
                    this.ajform.append('remark',this.saftplanform.remark)
                    this.ajform.append('execMan',this.saftplanform.execMan)
                    this.ajform.append('leaderNext',this.saftplanform.leaderNext)
                    let a = JSON.stringify(this.doubledata);
                    this.ajform.append('mRequirePlanDetails',a);
                    console.log(this.doubledata);
                    console.log(this.saftplanform);
                        this.ajform.append('comeDateTime',this.saftplanform.comeDate.getTime())
                    this.$http.post(material.mrequiresave,this.ajform).then(res=>{
                        if(res.data.result=='success'){
                            this.$message.success('添加成功~');
                            this.$router.push('/materialmanage/needplan');
                        }else if(res.data.result=='error'){
                            this.$message.error('添加失败');
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
        //弹框右上角的x按钮
        closevisible(){
            this.modelVisible=false;
            this.modelform={};
        },
        //新增计划物资
        addmaterial(){
            this.modelVisible=true;
            this.modelform={};
            this.modId=0;
        },
        // 弹框的提交事件
        modelesubmit(Fname){
            this.$refs[Fname].validate((valid) => {
                if (valid) {
                    if(this.modId==0){
                        this.modelform.id=Math.floor(Math.random()*200);
                        if(this.modelform.provDateTime){
                            this.modelform.provDateTime=this.modelform.provDateTime.getTime()
                        }
                        this.doubledata.push(this.modelform);
                        console.log(this.doubledata);
                        if(this.doubledata.length!=0){
                            for(let item in this.materoption){
                                if(this.materoption[item].id==this.modelform.mmid){
                                    this.modelform.mname= this.materoption[item].mname;
                                }
                            }
                            for(let item in this.localoption){
                                if(this.localoption[item].id==this.modelform.useloc){
                                    this.modelform.uselocName= this.localoption[item].locName;
                                }
                            }
                        }
                        this.modelVisible=false;
                    }else{
                        console.log('我是编辑');
                        this.modelform.id=this.modId;
                        for(let val in this.doubledata){
                            if(this.doubledata[val].id==this.modId){
                                this.doubledata[val]=this.modelform;
                                if(this.modelform.provDateTime){
                                  if(typeof(this.modelform.provDateTime) == 'number'){
                                      this.doubledata[val].provDateTime=this.modelform.provDateTime;
                                  }else{
                                      this.doubledata[val].provDateTime=this.modelform.provDateTime.getTime();
                                  }
                                }
                            }
                        }
                        for(let item in this.materoption){
                            if(this.materoption[item].id==this.modelform.mmid){
                                this.modelform.mname= this.materoption[item].mname;
                            }
                        }
                        for(let item in this.localoption){
                            if(this.localoption[item].id==this.modelform.useloc){
                                this.modelform.uselocName= this.localoption[item].locName;
                            }
                        }
                        this.modelVisible=false;
                    }
                }
            })

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
                        this.modelform=this.doubledata[i]
                    }
                }
            }else{
                // console.log(id);
                this.modelVisible=true;
                this.$http.get(material.mrequireplanselect,{params:{id:id}}).then(res=>{
                    console.log(res);
                    this.modelform = res.data.list[0]
                     if(typeof(res.data.list[0].ifover)=='number'){ 
                            this.modelform.ifover = res.data.list[0].ifover.toString();
                     }
                     if(typeof(res.data.list[0].provState)=='number'){
                            this.modelform.provState = res.data.list[0].provState.toString();
                     }
                
                })
            }
           
        },
        //材料配置
        materconfig(){
            this.$http.get(material.mmaterials).then(res=>{
                console.log(res);
                this.materoption=res.data.list;
            })
        },
        //仓库位置
        modellocaton(){
            this.$http.get(dictapi.location).then(res=>{
                console.log(res);
                this.localoption=res.data.list;
            })
        },
        modelV(){
            console.log(1)
            this.$router.go(-1);
        }
    },
    mounted(){
        this.uploadperson();
        this.category();
        this.materconfig();
        this.modellocaton();
        this.saftplanId=this.$route.query.id;
        this.id=this.$route.query.id;
        //列表页面编辑操作
        if(this.saftplanId!=0){
            this.$http.get(material.mrequireselect,{params:{mrid:this.saftplanId}}).then(res=>{
                console.log(res);
                this.saftplanform=res.data.list[0];
                // if(this.saftplanform.state == '0'){
                //     this.saftplanform.state = '0'
                // }
                // if(this.saftplanform.state == '1'){
                //     this.saftplanform.state = '1'
                // }
                // if(this.saftplanform.state == 2){
                //     this.saftplanform.state = '2'
                // }
                // if(this.saftplanform.state == '3'){
                //     this.saftplanform.state = '3'
                // }
                this.doubledata = res.data.list[0].mRequirePlanDetail
                for(let i in res.data.list[0].mRequirePlanDetail){
                    this.doubledata[i].uselocName = res.data.list[0].mRequirePlanDetail[i].uselocName
                }
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
