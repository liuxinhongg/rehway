/*
 * @Author: 谢莹
 * @Date: 2019-05-07  
 * @function: 合同  新增
 */
<template>
    <div class="rebuild" >
        <el-scrollbar style="height:100%;overflow-x: hidden;">
        <div v-if="childsta==false"><el-scrollbar style="height:100%;">    
            <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent  ref="saftplanform">
                <el-form-item style="text-align:center;"><h3>材料合同表</h3></el-form-item>
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft" colspan="2">申请人：</td>
                        <td colspan="5">
                            <el-form-item prop="userName" >
                                <el-input v-model="saftplanform.userName" style="width:280px" ></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft" colspan="1">合同名称：</td>
                        <td colspan="5">
                            <el-form-item prop="ctname">
                                <el-input v-model="saftplanform.ctname" style="width:280px" placeholder="合同名称"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft" colspan="2">合同类型：</td>
                        <td  colspan="5">
                            <el-form-item prop="cttype">
                                <el-select v-model="saftplanform.cttype" style="width:280px">
                                    <el-option v-for="(item,index) in Contract" :key="index" :value="item.code" :label="item.contract"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft" colspan="2">供应商：</td>
                        <td colspan="5">
                            <el-form-item prop="prId">
                                <el-select v-model="saftplanform.prId" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.pid" :label="item.pname"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft" colspan="1">合同金额：</td>
                        <td  colspan="5">
                            <el-form-item prop="ctsum">
                                <el-input v-model="saftplanform.ctsum" style="width:280px" placeholder="合同金额"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft"  colspan="2">付款方式：</td>
                        <td  colspan="5">
                            <el-form-item prop="payMode">
                                <el-select v-model="saftplanform.payMode"  style="width:280px">
                                    <el-option value="0" label="按合同付款"></el-option>
                                    <el-option value="1" label="按进度付款"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="tdleft"  colspan="2">开始日期：</td>
                        <td  colspan="5">
                            <el-form-item prop="ctBeginDate">
                                <el-date-picker  v-model="saftplanform.ctBeginDate" type="datetime" placeholder="选择日期时间" style="width:280px"></el-date-picker>
                            </el-form-item>
                        </td> 
                        <td class="tdleft"  colspan="1">结束日期：</td>
                        <td  colspan="5">
                            <el-form-item prop="ctEndDate">
                                <el-date-picker  v-model="saftplanform.ctEndDate" type="datetime" placeholder="选择日期时间" style="width:280px"></el-date-picker>
                            </el-form-item>
                        </td> 
                        <td class="tdleft" colspan="2">签订日期：</td>
                        <td  colspan="5">
                            <el-form-item prop="ctdate">
                                <el-date-picker  v-model="saftplanform.ctdate" type="datetime" placeholder="选择日期时间" style="width:280px"></el-date-picker>
                            </el-form-item>
                        </td> 
                    </tr>
                    <tr>
                        <td class="tdleft" colspan="2">项目：</td>
                        <td colspan="5">
                            <el-form-item prop="prjId">
                                <el-select v-model="saftplanform.prjId" style="width:280px">
                                    <el-option v-for="(item,index) in categoryoption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft"  colspan="1">结算方式：</td>
                        <td  colspan="5">
                            <el-form-item prop="actMode">
                                <el-select v-model="saftplanform.actMode"  style="width:280px">
                                    <el-option value="0" label="分段结算"></el-option>
                                    <el-option value="1" label="整体结算"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft" colspan="2">预付款：</td>
                        <td  colspan="5">
                            <el-form-item prop="prePay">
                                <el-select v-model="saftplanform.prePay" style="width:280px">
                                    <el-option value="0" label="按合同付款"></el-option>
                                    <el-option value="1" label="按进度付款"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        
                        <td class="tdleft"  colspan="2">保证金：</td>
                        <td  colspan="5">
                            <el-form-item prop="deposit">
                                <el-input v-model="saftplanform.deposit" style="width:280px" placeholder="保证金"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft" colspan="1">合同执行人：</td>
                        <td  colspan="5">
                            <el-form-item prop="ctexecMan">
                                <el-select v-model="saftplanform.ctexecMan" style="width:280px">
                                    <el-option v-for="(item,index) in personop" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                          <td class="tdleft" colspan="2">审批人：</td>
                        <td  colspan="5">
                            <el-form-item prop="leaderNext">
                                <el-select v-model="saftplanform.leaderNext" style="width:280px">
                                    <el-option v-for="(item,index) in personop" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="20">
                           <span style="margin:0 40%;font-size:18px;font-family: '楷体';">计划物资明细</span>
                            <!-- <el-button style="text-align:right;margin-right:10px;"  type="success" @click="addmaterial()">+计划物资明细</el-button> -->
                        </td>
                    </tr>
                    <tr v-if='doubledata.length>0'>
                        <td colspan="1" style="text-align:center;">序号</td>
                        <td colspan="4" style="text-align:center;">材料</td>
                        <td colspan="4" style="text-align:center;">采购数量</td>
                        <td colspan="3" style="text-align:center;">采购单价</td>
                        <td colspan="3" style="text-align:center;">小计</td>
                        <td colspan="1" style="text-align:center;">操作</td>
                    </tr>
                    <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                        <td colspan="1" >{{index+1}}</td>
                        <td colspan="4">{{item.mId}}</td>
                        <td colspan="4">{{item.ctdNum}}</td>
                        <td colspan="3">{{item.ctdMoney}}</td>
                        <td colspan="3">{{item.ctdNum*item.ctdMoney}}</td>
                        <td colspan="1"><el-button type="text" @click="doubmodify(item.ctmId)">修改</el-button></td>
                    </tr>
                   
                    <tr>
                        <td class="tdleft"  colspan="1">付款条件：</td>
                        <td colspan="19">
                            <el-form-item  prop="paycond">
                                <el-input v-model="saftplanform.paycond" type="textarea" :rows="2"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft"  colspan="1">主要条款：</td>
                        <td colspan="19">
                            <el-form-item prop="mainct">
                                <el-input v-model="saftplanform.mainct" type="textarea" :rows="2"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft"  colspan="1">备注：</td>
                        <td colspan="19">
                            <el-form-item prop="remark">
                                <el-input v-model="saftplanform.remark" type="textarea" :rows="2"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item style="text-align:center;">
                    <el-button type="primary" native-type="submit" @click="saftplansubmit('saftplanform')">提交</el-button>
                    <el-button @click="returncancle('saftplanform')" style="margin:0 40px;">保存</el-button>
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
                                <el-form-item prop="mId">
                                    <el-select v-model="modelform.mId" style="width:280px">
                                        <el-option v-for="(item,index) in materoption" :key="index" :value="item.id" :label="item.mname"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td class="tdleft">采购数量：</td>
                            <td>
                                <el-form-item prop="ctdNum" >
                                    <el-input v-model="modelform.ctdNum" type="number"   style="width:280px"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                       
                        <tr>
                            <td class="tdleft">采购单价：</td>
                            <td>
                                <el-form-item prop="ctdMoney">
                                    <el-input v-model="modelform.ctdMoney" style="width:280px" type="number"></el-input>
                                </el-form-item>
                            </td>
                            <td class="tdleft">小计金额：</td>
                            <td>
                                <el-form-item >
                                    <el-input  :value='modelform.ctdMoney*modelform.ctdNum' style="width:280px" type="number"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            
                            <td class="tdleft">结算：</td>
                            <td>
                                <el-form-item prop="ctdState">
                                     <el-select v-model="modelform.ctdState"  style="width:280px">
                                        <el-option value="0" label="未结算"></el-option>
                                        <el-option value="1" label="结算未付款"></el-option>
                                        <el-option value="2" label="结算"></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                             <td class="tdleft">备注：</td>
                            <td>
                                <el-form-item prop="remark"  >
                                    <el-input  v-model="modelform.remark" type="textarea" :rows="2" style="width:280px"></el-input>
                                </el-form-item>
                            </td> 
                        </tr>
                        <tr v-if="istrue">
                            <td class="tdleft">实际付款金额：</td>
                            <td colspan="3">
                                <el-form-item prop="ctdRealSum"  style="width:280px">
                                    <el-input v-model="modelform.ctdRealSum" type="number"></el-input>
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
// import MStore from '@/components/common/mstore'
import * as material from '@/api/material.js'
import * as personapi from '@/api/usercenter.js'
import * as dictapi from '@/api/dictapi.js'
// import child from '@/components/common/mstore'
export default {
    //  components: {
    //   child
    // },
    data(){
        return{
            modelform:{
                mId:'',
                mIdName:'',
                ctdNum:'',
                ctdMoney:'',
                ctdRealSum:'',
                ctdState:'',
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
            // 计划物资表单
            modelplan:{
                mnum:'',
                useLoc:'',
                remark:'',
                mid:'',
            },
            modelrules:{
                mId:[{ required: true,message: "请选择材料编号",trigger: "change",}],  //
                ctdNum:[ 
                    { required: true, message: "请输入采购数量", trigger: "blur" },
                    { pattern: /^[1-9]\d*$/,message:'请输入正确的采购数量' } 
                    ],
                ctdMoney:[ 
                    { required: true, message: "请输入采购单价", trigger: "blur" },
                    { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,message:'请输入正确的采购单价，小数点不超过两位' } 
                    ],
                ctdRealSum:
                [ 
                    { required: true, message: "请输入付款金额", trigger: "blur" },
                    { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,message:'请输入正确的付款金额，小数点不超过两位' } 
                    ],
                ctdState:[{required: true,message: "请选择结算方式",trigger: "change"}],
            },
            Contract:[],
            modeloption:[],
            materoption:[],
            localoption:[],
            planMVisible:false,
            ajform:new FormData(),
            fileList:[],
            // 传值
            saftplanform:{
                userId:'',
                ctname:'', 
                cttype:'', 
                prId:'',
                ctsum:'',
                payMode:'',
                ctBeginDate:'',
                ctEndDate:"",
                prjId:'',
                actMode:'',
                msum:'', 
                state:'',
                execMan:'',
                remark:'',
                mainct:'',
                paycond:'',
                ctdate:'',
                prePay:'',
                deposit:'',
                ctexecMan:'',
                leaderNext:''
            },
            personoption:[],
            categoryoption:[],
            stateoption:[
                { name:'审批中',type:'0' },
                { name:'审批通过',type:'1' },
                { name:'审批失败',type:'2' },
            ],
            useryz:{
                userId:[{required: true,message: "请选择上传员工",trigger: "change"}],           
                prId:[{required: true,message: "请选择供应商",trigger: "change"}],       
                cttype:[{required: true,message: "请选择合同类型",trigger: "change"}],              
                ctname:[{required: true,message: "请输入合同名称",trigger: "blur"}],
                ctsum:[ 
                    { required: true, message: "请输入合同金额", trigger: "blur" },
                    { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,message:'请输入正确的合同金额，小数点不超过两位' } 
                    ],
                payMode:[{required: true,message: "请选择付款方式",trigger: "change"}],
                ctBeginDate:[{required: true,message: "请选择开始日期",trigger: "change"}],
                ctEndDate:[{required: true,message: "请选择结束日期",trigger: "change"}],
                ctdate:[{required: true,message: "请选择签订日期",trigger: "change"}],
                prjId:[{required: true,message: "请选择项目名称",trigger: "change"}],
                actMode:[{required: true,message: "请选择结算方式",trigger: "change"}],
                prePay:[{required: true,message: "请选择预付款方式",trigger: "change"}],
                deposit:[ 
                    { required: true, message: "请输入保证金", trigger: "blur" },
                    { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,message:'请输入正确的保证金，小数点不超过两位' } 
                    ],
                ctexecMan:[{required: true,message: "请选择合同执行人",trigger: "change"}],
                leaderNext:[{required: true,message: "请选择审批人",trigger: "change"}],

            },
            saftplanId:0,
            modleId:0,
            childValue:[],
            place:[],
            materialname:[],
            form:[],
            modId:0,
            personop:[],
            istrue:false,
        }
    },
    methods:{
        // 文件
        handlefile(par){
            this.ajform.append('filepaths',par.file);
        },
        //修改和添加的公共方法
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ajform.append('userId',this.saftplanform.userId)
                    this.ajform.append('ctname',this.saftplanform.ctname)
                    this.ajform.append('payMode',this.saftplanform.payMode)
                    this.ajform.append('cttype',this.saftplanform.cttype)
                    this.ajform.append('prId',this.saftplanform.prId)
                    this.ajform.append('ctsum',this.saftplanform.ctsum)
                    this.ajform.append('prjId',this.saftplanform.prjId)
                    this.ajform.append('actMode',this.saftplanform.actMode)
                    this.ajform.append('prePay',this.saftplanform.prePay)
                    this.ajform.append('deposit',this.saftplanform.deposit)
                    this.ajform.append('mainct',this.saftplanform.mainct) 
                    this.ajform.append('paycond',this.saftplanform.paycond)
                    this.ajform.append('leaderNext',this.saftplanform.leaderNext)
                    this.ajform.append('remark',this.saftplanform.remark)
                    this.ajform.append('msum',this.saftplanform.msum)
                    this.ajform.append('ctexecMan',this.saftplanform.ctexecMan)
                    let a = JSON.stringify(this.doubledata);
                    this.ajform.append('mContractDetails',a);      
                        if(typeof(this.saftplanform.ctBeginDate)=='number'){
                            this.ajform.append('ctBeginDateTime',this.saftplanform.ctBeginDate)                            
                        }else{
                            this.ajform.append('ctBeginDateTime',this.saftplanform.ctBeginDate.getTime())                                                        
                        }
                        if(typeof(this.saftplanform.ctdate)=='number'){
                            this.ajform.append('ctDateTime',this.saftplanform.ctdate)                            
                        }else{
                            this.ajform.append('ctDateTime',this.saftplanform.ctdate.getTime())                                                        
                        }
                        if(typeof(this.saftplanform.ctEndDate)=='number'){
                            this.ajform.append('ctEndDateTime',this.saftplanform.ctEndDate)                            
                        }else{
                            this.ajform.append('ctEndDateTime',this.saftplanform.ctEndDate.getTime())                                                        
                        }
                        this.ajform.append('ctid',this.id)
                        this.$http.post(material.mcontractaddsubmit,this.ajform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/materialmanage/pactmanage');
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
                    this.ajform.append('userId',this.saftplanform.userId)
                    this.ajform.append('ctname',this.saftplanform.ctname)
                    this.ajform.append('payMode',this.saftplanform.payMode)
                    this.ajform.append('cttype',this.saftplanform.cttype)
                    this.ajform.append('prId',this.saftplanform.prId)
                    this.ajform.append('ctsum',this.saftplanform.ctsum)
                    this.ajform.append('prjId',this.saftplanform.prjId)
                    this.ajform.append('actMode',this.saftplanform.actMode)
                    this.ajform.append('prePay',this.saftplanform.prePay)
                    this.ajform.append('deposit',this.saftplanform.deposit)
                    this.ajform.append('mainct',this.saftplanform.mainct) 
                    this.ajform.append('paycond',this.saftplanform.paycond)
                    this.ajform.append('leaderNext',this.saftplanform.leaderNext)
                    this.ajform.append('remark',this.saftplanform.remark)
                    this.ajform.append('msum',this.saftplanform.msum)
                    this.ajform.append('ctexecMan',this.saftplanform.ctexecMan)
                    let a = JSON.stringify(this.doubledata);
                    this.ajform.append('mContractDetails',a);      
                     if(typeof(this.saftplanform.ctBeginDate)=='number'){
                            this.ajform.append('ctBeginDateTime',this.saftplanform.ctBeginDate)                            
                        }else{
                            this.ajform.append('ctBeginDateTime',this.saftplanform.ctBeginDate.getTime())                                                        
                        }
                        if(typeof(this.saftplanform.ctdate)=='number'){
                            this.ajform.append('ctDateTime',this.saftplanform.ctdate)                            
                        }else{
                            this.ajform.append('ctDateTime',this.saftplanform.ctdate.getTime())                                                        
                        }
                        if(typeof(this.saftplanform.ctEndDate)=='number'){
                            this.ajform.append('ctEndDateTime',this.saftplanform.ctEndDate)                            
                        }else{
                            this.ajform.append('ctEndDateTime',this.saftplanform.ctEndDate.getTime())                                                        
                        }
                    // 新增的方法
                        this.ajform.append('ctid',this.id)
                        this.$http.post(material.mcontractaddsave,this.ajform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/materialmanage/pactmanage');
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
            this.$http.get(material.applay).then(res=>{
                this.personoption=res.data.list;
            })
        },
        uploadper(){
            this.$http.get(dictapi.user).then(res=>{
                this.personop=res.data.list;
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
            this.modId=0
        },
        // 弹框的提交事件
       modelesubmit(Fname){
                    for(let val in this.doubledata){
                        if(this.doubledata[val].ctmId==this.modId){
                            this.doubledata[val].mIdName=this.modelform.mIdName;
                        }
                    }
                    for(let item in this.doubledata,this.materoption,this.localoption){
                        if(this.materoption[item].id==this.modelform.mId){
                            this.modelform.mIdName= this.materoption[item].mname;
                        }
                    }
                    this.modelVisible=false;
          
        },
        // 物资计划的修改事件
        doubmodify(id){
                    this.modId=id;
                    this.modelVisible=true;
                    for(let i in this.doubledata){
                        if(this.doubledata[i].ctmId==id){
                            this.modelform=this.doubledata[i];
                        }
                    }
        },
        //材料配置
        materconfig(){
            this.$http.get(material.mmaterials).then(res=>{
                this.materoption=res.data.list;
            })
        },
        //仓库位置
        modellocaton(){
            this.$http.get(material.mrepo).then(res=>{
                this.localoption=res.data.list;
            })
        },
        //合同类型
        ContractType(){
            this.$http.get(dictapi.selectContractTypesAll).then(res=>{
                this.Contract = res.data
            })
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
            if(typeof(res.data.bill.payMode) == 'number'){
              this.saftplanform.payMode = res.data.bill.payMode.toString()
            }
            if(typeof(res.data.bill.actMode) == 'number'){
              this.saftplanform.actMode = res.data.bill.actMode.toString()
            }
            if(typeof(res.data.bill.prePay) == 'number'){
              this.saftplanform.prePay = res.data.bill.prePay.toString()
            }
            for(let i in this.doubledata){
              if(typeof(this.doubledata[i].ctdState) == 'number'){
                this.doubledata[i].ctdState = this.doubledata[i].ctdState.toString()
              }
            }
          })
        },
    },
    mounted(){
        this.uploadperson();
        this.category();
        this.materconfig();
        this.modellocaton();
        this.ContractType();
        this.uploadper();
        this.id=this.$route.query.id;
        this.type = this.$route.query.type
        this.dataall()
      
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
