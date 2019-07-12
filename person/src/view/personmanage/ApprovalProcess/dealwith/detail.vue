/*
 * @Author:谢莹
 * @Date: 2019-05-15 
 * @Function: 办结任务详情 
 */
<template>
  <div>
    <div class="undodetail">
      <el-scrollbar style="height:100%;">
        <p class="persontop">办结任务详情</p>
        <div class="topImg">
          <img :src="imgsrc" alt="">
          <!-- <img :src="imgsrc" /> -->
        </div>
        <el-form >
          <!-- 请假 -->
          <table border="1" class="tableinsert" v-if="isLeaveRequest==true">
              <tr>
                  <td class="tdleft">申请人：</td>
                  <td> {{qjdetail.userName}} </td>
                  <td class="tdleft">班组：</td>
                  <td> {{qjdetail.className}} </td>
              </tr>
              <tr>
                  <td class="tdleft">请假类型：</td>
                  <td> 事假 </td>
                  <td class="tdleft">所在部门：</td>
                  <td> {{qjdetail.departmentName}} </td>
              </tr>
              <tr>
                  <td class="tdleft">开始时间：</td>
                  <td> {{qjdetail.leaveDate}} </td>
                  <td class="tdleft">请假时长：</td>
                  <td> {{qjdetail.leaveDay}}（天）</td>
              </tr>
              <tr>
                  <td class="tdleft">请假原因：</td>
                  <td colspan="3"> {{qjdetail.leaveReason}} </td>
              </tr>
              <tr>
              </tr>
          </table>
          <!-- 报销 -->
          <table border="1" class="tableinsert" v-if="isReimburse==true">  
              <tr>
                  <td class="tdleft">申请人：</td>
                  <td> {{qjdetail.userName}} </td>
                  <td class="tdleft">申请时间：</td>
                  <td> {{qjdetail.createTime}} </td>
              </tr>
              <tr>
                  <td class="tdleft">申请金额：</td>
                  <td> {{qjdetail.amount}} </td>
                  <td class="tdleft">所在部门：</td>
                  <td> {{qjdetail.departmentName}} </td>
              </tr>
              <tr>
                  <td class="tdleft">备注：</td>
                  <td colspan="3"> {{qjdetail.remark}} </td>
              </tr>
              <tr>
              </tr>
          </table>
          <!-- 资产 -->
          <table border="1" class="tableinsert" v-if="isAssets==true">  
              <tr>
                  <td class="tdleft">申请人：</td>
                  <td> {{qjdetail.userName}} </td>
                  <td class="tdleft">申请时间：</td>
                  <td> {{qjdetail.createTime}} </td>
              </tr>
              <tr>
                  <td class="tdleft">所在班组：</td>
                  <td> {{qjdetail.className}} </td>
                  <td class="tdleft">所在部门：</td>
                  <td> {{qjdetail.departmentName}} </td>
              </tr>
               <tr>
                  <td class="tdleft">资产类型：</td>
                  <td> {{qjdetail.assetsType}} </td>
                  <td class="tdleft">资产名称：</td>
                  <td> {{qjdetail.assetsName}} </td>
              </tr>
              <tr>
                  <td class="tdleft">备注：</td>
                  <td colspan="3"> {{qjdetail.remark}} </td>
              </tr>
              <tr>
              </tr>
          </table>
          <!-- 保养设备 -->
          <table border="1" class="tableinsert" v-if="isDevMaint==true">  
              <tr>
                  <td class="tdleft">发起人：</td>
                  <td> {{qjdetail.userName}} </td>
                  <td class="tdleft">责任人：</td>
                  <td> {{qjdetail.chkMan}} </td>
              </tr>
              <tr>
                  <td class="tdleft">设备名称：</td>
                  <td> {{qjdetail.devcode}} </td>
                  <td class="tdleft">保养名称：</td>
                  <td> {{qjdetail.maintainName}} </td>
              </tr>
               <tr>
                  <td class="tdleft">保养周期：</td>
                  <td> {{qjdetail.chkCircle }} </td>
                  <td class="tdleft">开始时间：</td>
                  <td> {{qjdetail.beginDate | formatDate}} </td>
              </tr>
               <tr>
                  <td class="tdleft">保养检查内容：</td>
                  <td colspan="3" v-html="qjdetail.chkCont"></td>
              </tr>   
              <tr>
                  <td class="tdleft">备注：</td>
                  <td colspan="3"> {{qjdetail.remark}} </td>
              </tr>
              <tr>
              </tr>
          </table>
          <!-- 设备需求 -->
          <table border="1" class="tableinsert" v-if="isDevReq==true">  
              <tr>
                  <td class="tdleft">申请人：</td>
                  <td> {{qjdetail.userName}} </td>
                  <td class="tdleft">申请时间：</td>
                  <td> {{qjdetail.createTime}} </td>
              </tr>
              <tr>
                  <td class="tdleft">设备需求计划：</td>
                  <td> {{qjdetail.planName}} </td>
                  <td class="tdleft">项目名称：</td>
                  <td> {{qjdetail.departmentName}} </td>
              </tr>
              <tr>
                <td colspan="4">
                    <table border="1" class="tableinsert" style="margin:0px;width:100%;text-align:center">  
                        <tr>
                            <td>序号</td>
                            <td>物资</td>
                            <td>所在位置</td>
                            <td>物资数量</td>
                            <td>时间</td>
                        </tr>
                        <tr v-for="(item,index) in xqdetail" :key="index">
                            <td> {{index+1}}</td>
                            <td> {{item.mmid}} </td>
                            <td> {{item.mloc}} </td>
                            <td> {{item.mnum}} </td>
                            <td> {{item.mBeginDate | formatDate }} </td>
                        </tr>
                       
                    </table>
                     <div style="float:right">
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page.sync="currentPage"
                              :page-size="number"
                              layout="prev, pager, next, jumper"
                              :total="count"
                            ></el-pagination>
                          </div>
                </td>
              </tr>
              <tr>
                  <td class="tdleft">备注：</td>
                  <td colspan="3"> {{qjdetail.remark}} </td>
              </tr>
              <tr>
              </tr>
          </table>
          <!-- 运营计划 -->
          <table border="1" class="tableinsert" v-if="isDevBusiness==true"> 
              <tr>
                  <td class="tdleft">申请人：</td>
                  <td> {{qjdetail.userName}} </td>
                  <td class="tdleft">申请时间：</td>
                  <td> {{qjdetail.createTime}} </td>
              </tr>
              <tr>
                  <td class="tdleft">开始时间：</td>
                  <td> {{qjdetail.beginTime | formatDate}} </td>
                  <td class="tdleft">结束时间：</td>
                  <td> {{qjdetail.endTime | formatDate}} </td>
              </tr>
              <tr>
                  <td class="tdleft">设备运营计划：</td>
                  <td> {{qjdetail.bname}} </td>
                  <td class="tdleft">项目名称：</td>
                  <td> {{qjdetail.departmentName}} </td>
              </tr>
              <tr>
                <td colspan="4">
                    <table border="1" class="tableinsert" style="margin:0px;width:100%;text-align:center">  
                        <tr>
                            <td>序号</td>
                            <td>物资</td>
                            <td>价格</td>
                        </tr>
                        <tr v-for="(item,index) in xqdetail" :key="index">
                            <td> {{index+1}}</td>
                            <td> {{item.devcode}} </td>
                            <td> {{item.price}} </td>
                        </tr>
                       
                    </table>
                     <div style="float:right">
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page.sync="currentPage"
                              :page-size="number"
                              layout="prev, pager, next, jumper"
                              :total="count"
                            ></el-pagination>
                          </div>
                </td>
              </tr>
              <tr>
                  <td class="tdleft">备注：</td>
                  <td colspan="3"> {{qjdetail.remark}} </td>
              </tr>
              <tr>
              </tr>
          </table>
           <!-- 物资合同 -->
          <table border="1" class="tableinsert" v-if="isMContract==true">    
              <tr>
                  <td class="tdleft">申请人：</td>
                  <td> {{qjdetail.userId}} </td>
                  <td class="tdleft">申请时间：</td>
                  <td> {{qjdetail.createTime}} </td>
              </tr>
              <tr>
                  <td class="tdleft">合同名称：</td>
                  <td> {{qjdetail.ctname}} </td>
                  <td class="tdleft">合同类型</td>
                  <td> {{qjdetail.cttype}} </td>
              </tr>
               <tr>
                  <td class="tdleft">供应商：</td>
                  <td> {{qjdetail.prId}} </td>
                  <td class="tdleft">合同金额：</td>
                  <td> {{qjdetail.ctsum}} </td>
              </tr>
               <tr>
                  <td class="tdleft">付款方式：</td>
                  <td> {{qjdetail.payMode == 0 ? "按合同付款" : "按进度付款"}} </td>
                  <td class="tdleft">项目：</td>
                  <td> {{qjdetail.prjId}} </td>
              </tr>
              <tr>
                  <td class="tdleft">开始时间：</td>
                  <td> {{qjdetail.ctBeginDate | formatDate}} </td>
                  <td class="tdleft">结束时间：</td>
                  <td> {{qjdetail.ctEndDate | formatDate}} </td>
              </tr>
              <tr>
                  <td class="tdleft">签订日期：</td>
                  <td> {{qjdetail.ctdate | formatDate}} </td>
                  <td class="tdleft">结算方式：</td>
                  <td> {{qjdetail.actMode == 0 ? "分段结算": "整体结算"}} </td>
              </tr>
              <tr>
                  <td class="tdleft">保证金：</td>
                  <td> {{qjdetail.deposit }} </td>
                  <td class="tdleft">预付款：</td>
                  <td> {{qjdetail.prePay == 0 ? "按合同付款": "按进度付款"}} </td>
              </tr>
              <tr>
                  <td class="tdleft">合同执行人：</td>
                  <td colspan="3"> {{qjdetail.ctexecMan }} </td>
              </tr>
              <tr>
                <td colspan="4">
                    <table border="1" class="tableinsert" style="margin:0px;width:100%;text-align:center">  
                        <tr>
                            <td>序号</td>
                            <td>物资</td>
                            <td>采购数量</td>
                            <td>采购单价</td>
                            <td>小计</td>
                        </tr>
                        <tr v-for="(item,index) in xqdetail" :key="index">
                            <td> {{index+1}}</td>
                            <td> {{item.mId}} </td>
                            <td> {{item.ctdNum}} </td>
                            <td> {{item.ctdMoney}} </td>
                            <td> {{item.ctdNum*item.ctdMoney}} </td>
                        </tr>
                       
                    </table>
                     <div style="float:right">
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page.sync="currentPage"
                              :page-size="number"
                              layout="prev, pager, next, jumper"
                              :total="count"
                            ></el-pagination>
                          </div>
                </td>
              </tr>
              <tr>
                  <td class="tdleft">付款条件：</td>
                  <td colspan="3"> {{qjdetail.paycond}} </td>
              </tr>
              <tr>
                  <td class="tdleft">主要条款：</td>
                  <td colspan="3"> {{qjdetail.mainct}} </td>
              </tr>
              <tr>
                  <td class="tdleft">备注：</td>
                  <td colspan="3"> {{qjdetail.remark}} </td>
              </tr>
              <tr>
              </tr>
          </table>
           <!-- 物资总计划 -->
          <table border="1" class="tableinsert" v-if="isMSummary==true">    
              <tr>
                  <td class="tdleft">申请人：</td>
                  <td> {{qjdetail.cmtId}} </td>
                  <td class="tdleft">申请时间：</td>
                  <td> {{qjdetail.createTime}} </td>
              </tr>
              <tr>
                  <td class="tdleft">总计划名称：</td>
                  <td> {{qjdetail.planname}} </td>
                  <td class="tdleft">项目：</td>
                  <td> {{qjdetail.prjId}} </td>
              </tr>
              <tr>
                  <td class="tdleft">提交时间：</td>
                  <td colspan="3"> {{qjdetail.cdate | formatDate}} </td>
              </tr>
             
              <tr>
                <td colspan="4">
                    <table border="1" class="tableinsert" style="margin:0px;width:100%;text-align:center">  
                        <tr>
                            <td>序号</td>
                            <td>物资</td>
                            <td>使用位置</td>
                            <td>使用量</td>
                        </tr>
                        <tr v-for="(item,index) in xqdetail" :key="index">
                            <td> {{index+1}}</td>
                            <td> {{item.mmid}} </td>
                            <td> {{item.useLoc}} </td>
                            <td> {{item.mnum}} </td>
                        </tr>
                       
                    </table>
                     <div style="float:right">
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page.sync="currentPage"
                              :page-size="number"
                              layout="prev, pager, next, jumper"
                              :total="count"
                            ></el-pagination>
                          </div>
                </td>
              </tr>
              <tr>
                  <td class="tdleft">付款条件：</td>
                  <td colspan="3"> {{qjdetail.paycond}} </td>
              </tr>
              <tr>
                  <td class="tdleft">主要条款：</td>
                  <td colspan="3"> {{qjdetail.mainct}} </td>
              </tr>
              <tr>
                  <td class="tdleft">备注：</td>
                  <td colspan="3"> {{qjdetail.remark}} </td>
              </tr>
              <tr>
              </tr>
          </table>
           <!-- 物资总计划 -->
          <table border="1" class="tableinsert" v-if="isMRequire==true">    
              <tr>
                  <td class="tdleft">申请人：</td>
                  <td> {{qjdetail.cmtMan}} </td>
                  <td class="tdleft">申请时间：</td>
                  <td> {{qjdetail.createTime}} </td>
              </tr>
              <tr>
                  <td class="tdleft">需求计划名称：</td>
                  <td> {{qjdetail.mrName}} </td>
                  <td class="tdleft">项目：</td>
                  <td> {{qjdetail.prjId}} </td>
              </tr>
              <tr>
                  <td class="tdleft">计划执行人：</td>
                  <td> {{qjdetail.execMan }} </td>
                   <td class="tdleft">到场日期：</td>
                  <td> {{qjdetail.comeDate |  formatDate}} </td>
              </tr>
              <tr>
                <td colspan="4">
                    <table border="1" class="tableinsert" style="margin:0px;width:100%;text-align:center">  
                        <tr>
                            <td>序号</td>
                            <td>物资</td>
                            <td>使用位置</td>
                            <td>使用量</td>
                            <td>参考价格</td>
                            <td>确认状态</td>
                        </tr>
                        <tr v-for="(item,index) in xqdetail" :key="index">
                            <td> {{index+1}}</td>
                            <td> {{item.mmid}} </td>
                            <td> {{item.useLoc}} </td>
                            <td> {{item.mnum}} </td>
                            <td> {{item.mprice}} </td>
                            <td> {{item.provState == 0 ? "未确认" : "确认"}} </td>
                        </tr>
                       
                    </table>
                     <div style="float:right">
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page.sync="currentPage"
                              :page-size="number"
                              layout="prev, pager, next, jumper"
                              :total="count"
                            ></el-pagination>
                          </div>
                </td>
              </tr>
              <tr>
                  <td class="tdleft">付款条件：</td>
                  <td colspan="3"> {{qjdetail.paycond}} </td>
              </tr>
              <tr>
                  <td class="tdleft">主要条款：</td>
                  <td colspan="3"> {{qjdetail.mainct}} </td>
              </tr>
              <tr>
                  <td class="tdleft">备注：</td>
                  <td colspan="3"> {{qjdetail.remark}} </td>
              </tr>
              <tr>
              </tr>
          </table>
        </el-form>
        <!-- <div style="width:90%;margin:0 auto;position: absolute;bottom:50px;">
          <el-button style="float:right;" type="primary" @click="onsubmit(0)">驳回</el-button>
          <el-button style="float:right;margin-right:10px;" type="primary" @click="dialogTableVisible = true">转交</el-button>
          <el-button style="float:right;" type="primary" @click="onsubmit(1)">不同意</el-button>
          <el-button style="float:right;" type="success" @click="onsubmit(2)">同意</el-button>
        </div> -->
          <!-- <el-dialog title="转交" :visible.sync="dialogTableVisible" >
                <el-table :data="gridData" height="550">
                  <el-table-column style="text-align: center" property="workerName" label="姓名" ></el-table-column>
                  <el-table-column  style="text-align: center" label="性别">
                      <template slot-scope="scope">
                        {{scope.row.gender == 0 ? "男" :'女'}}
                      </template>
                  </el-table-column>
                  <el-table-column style="text-align: center"  label="操作">
                    <template slot-scope="scope">
                        <el-button @click="care(scope.row.workerId)">转交</el-button>
                    </template>
                  </el-table-column>
                </el-table>
          </el-dialog>
            <el-dialog title="" :visible.sync="bhTableVisible">
              <el-form ref="form" :model="form" label-width="120px">
                 <el-form-item label="批注：  ">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="结果：  ">
                <el-radio-group v-model="form.resource">
                    <el-radio label="同意" ></el-radio>
                    <el-radio label="不同意"></el-radio>
                    <el-radio label="结束"  v-if="flowType == 'MSummary'"></el-radio>
                    <el-radio label="结束"  v-if="flowType == 'MRequire'"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="下级审批人：" v-if="nav==2" >
                    <el-select v-model="form.leaderNext" style="width:280px">
                        <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                        </el-option>
                    </el-select>
                  </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="gohome">确定</el-button>
                  <el-button @click="bhTableVisible = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog> -->
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import * as personapi from '@/api/usercenter.js'
import formatDate from "@/filter/date.js";
export default {
  filters: {
        formatDate(time) {
          return formatDate(+time, "yyyy-MM-dd hh:mm"); 
        }
    },
  data() {
    return {
      flowType:'',
      currentPage: 1,
      number:10,
      count:1,
      xqdetail:[],
      detailData: [],
      detailId:'',
       form: {
          desc: '',
          leaderNext:'',
          resource:''
        },
      InId:'',
      isLeaveRequest:false,
      isReimburse:false,
      isAssets:false,
      isDevReq:false,
      isDevMaint:false,
      isMSummary:false,
      isDevBusiness:false,
      isMRequire:false,
      isMContract:false,
      detaillist:{},
      bhTableVisible:false,
      qjdetail:{},
      imgsrc:'../../../assets/images/liucheng.png',
       gridData: [],
      personoption:[],
        dialogTableVisible: false,
        nav : -1,
    };
  },
  methods: {
    onsubmit(nav){
      this.bhTableVisible = true
      this.nav = nav
    },
    care(id){
      let data={
        processInstanceId:this.InId,
        newAssignee:id
      }
      this.$http.get(personapi.dispatcher,{params:data}).then(res=>{
        if(res.data.result == 'success'){
          this.$router.go(-1);
        }
      })
    },
    // 驳回
    // gohome(){
    //   // 不同意
    //   if(this.nav==2){
        
    //     if(this.form.resource == '同意'){
    //       this.detaillist.condition = 'Access'
    //     }
    //     if(this.form.resource == '不同意'){
    //       this.detaillist.condition = 'Reject'
    //     }
    //     if(this.form.resource == '结束'){
    //       this.detaillist.condition = 'end'
    //     }
    //     this.detaillist.id = this.id
    //     this.detaillist.comment = this.form.desc
    //     this.detaillist.processInstanceId = this.InId
    //     this.detaillist.flowType = this.flowType
    //     this.$http.get(personapi.complete,{params:this.detaillist}).then(res=>{
    //       if(res.data.result == 'success'){
    //           this.$router.go(-1)
    //         }
    //     })
    //   }
      
      // 驳回
    //   if(this.nav==0){
    //     let data = {
    //       id:this.id,
    //       processInstanceId:this.InId,
    //       comment:this.form.desc
    //     }
    //     this.$http.get(personapi.goback,{params:data}).then(res=>{
    //       if(res.data.result == 'success'){
    //           this.$router.go(-1)
    //         }
    //     })
    //   }
     
    // },
    getformdata(){
         let data = {
            page:this.currentPage,
            num:this.number,
            id:this.id,
            processInstanceId:this.InId,
            flowType:this.flowType
          }
          this.$http.get(personapi.taskhistory,{params:data}).then(res=>{
            if(res.data.result == 'success'){
              this.qjdetail = res.data.bill
              this.count = res.data.count
              if(this.flowType == 'DevReq'){
                this.xqdetail = res.data.details
              }
              if(this.flowType == 'DevBusiness'){
                this.xqdetail = res.data.details
              }
              if(this.flowType == 'MContract'){ 
                this.xqdetail = res.data.details
              }
              if(this.flowType == 'MSummary'){  
                this.xqdetail = res.data.details
              }
              if(this.flowType == 'MRequire'){  
                this.xqdetail = res.data.details
              }
            }
          })
          this.$http.get(personapi.Image,{params:{id:this.id}}).then(res=>{
          })
    },
    getperson(){
        this.$http.get('/api/user/user_select').then(res=>{
            this.gridData=res.data.list;
            this.personoption = res.data.list
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getformdata();
    },
  },
  mounted(){
    this.getperson()
    this.id=this.$route.query.id;
    this.InId=this.$route.query.InId;
    this.flowType = this.$route.query.flowType;
    console.log(this.id,this.InId,this.flowType)
    this.getformdata();
    if(this.flowType == 'LeaveRequest'){
      this.isLeaveRequest = true
    }
    if(this.flowType == 'Reimburse'){
      this.isReimburse = true
    }
    if(this.flowType == 'Assets'){  
      this.isAssets = true
    }
    if(this.flowType == 'DevReq'){  
      this.isDevReq = true
    }
    if(this.flowType == 'DevMaint'){   
      this.isDevMaint = true
    }
    if(this.flowType == 'DevBusiness'){   
      this.isDevBusiness = true
    }
    if(this.flowType == 'MContract'){   
      this.isMContract = true
    }
    if(this.flowType == 'MSummary'){   
      this.isMSummary = true
    }
    if(this.flowType == 'MRequire'){   
      this.isMRequire = true
    }
    eventBus.$on('eventBusName', function(val) {
    })
    
  }
};
</script>

<style lang="scss">
.undodetail {
  width: 100%;
  margin: auto;
  height: calc(100vh - 100px);
  .topImg {
    width: 55%;
    margin: auto;
    img {
      width: 100%;
      height: 200px;
      margin-bottom: 20px;
    }
  }
  .tdleft{
    width: 10%;
  }
  .el-table .cell{
    text-align: center
  }
  .panel .table .opinin {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
  }
}
</style>
<style>
  .undodetail .el-scrollbar__wrap{overflow-x: hidden;}
</style>