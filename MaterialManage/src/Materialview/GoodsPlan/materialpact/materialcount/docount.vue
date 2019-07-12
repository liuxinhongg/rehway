/*
 * @Author: 谢莹
 * @Date: 2019-05-07  
 * @function: 材料结算
 */
<template>
  <div class="rebuild">
      <div style="width:90%;margin:0 auto;text-align:right">
          <!-- <el-button @click="dialogVisible = true" type="primary">新增</el-button> -->
          <el-button @click="printContent" type="primary">打印</el-button>
          <el-button @click="returncancle()"  >返回</el-button>
      </div>
      <div id="subOutputRank-print" ref='examAnswerContent'>
    <el-scrollbar style="height:100%;overflow-x: hidden;">
      <div v-if="childsta==false">
        <el-scrollbar style="height:100%;">
          <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent ref="saftplanform">
            <el-form-item style="text-align:center;">
              <h3>材料结算表</h3>
            </el-form-item>
            <table border="1" class="tableinsert" v-for="(item,index) in jsdetail" :key="index">
              <tr >
                <td style="text-align:center;font-size:16px;">项目：</td>
                <td style="text-align:center;font-size:16px;">{{item.prjIdName}} </td>
                <td style="text-align:center;font-size:16px;">供应商：</td>
                <td style="text-align:center;font-size:16px;">  {{item.provIdName}} </td>
                <td style="text-align:center;font-size:16px;">月份：</td>
                <td style="text-align:center;font-size:16px;"> {{item.genDate | formatDate}} </td>
              </tr>
              <tr>
                <td style="text-align:center;font-size:16px;">验收单：</td>
                <td style="text-align:center;font-size:16px;" colspan="5">{{item.actId}}  </td>
              </tr>
              <tr v-if="doubledata.length>0">
                <td  style="text-align:center;">序号</td>
                <td colspan="2" style="text-align:center;">材料名称</td>
                <!-- <td  style="text-align:center;">单位</td> -->
                <td  style="text-align:center;">供货量</td>
                <!-- <td  style="text-align:center;">供货时间</td> -->
                <td  style="text-align:center;">参考价格</td>
                <td  style="text-align:center;">结算金额</td>
                <!-- <td  style="text-align:center;">操作</td> -->
              </tr>
              <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                <td  style="text-align:center;font-size:16px;">{{index+1}}</td>
                <td colspan="2" style="text-align:center;font-size:16px;">{{item.mmidName}}</td>
                <!-- <td  style="text-align:center;font-size:16px;">{{item.mCondIdInfo[0].prIdName}}</td> -->
                <td  style="text-align:center;font-size:16px;">{{item.mnum}}</td>
                <td  style="text-align:center;font-size:16px;">{{item.mCondIdInfo[0].ctdMoney}}</td>
                <td  style="text-align:center;font-size:16px;">{{item.mCondIdInfo[0].ctdSum}}</td>
                <!-- <td ><el-button type="text" @click="doubmodify(item.douId)">修改</el-button></td> -->
              </tr>
              <tr>
                  <td style="text-align:center;font-size:16px;">合计</td>
                  <td colspan="4" style="text-align:left;text-indent:2em">人民币大写：{{item.sumMoney}}</td>
                  <td style="text-align:center;font-size:16px;"></td>
              </tr>
              <!-- <tr>
                  <td style="text-align:center;font-size:16px;">累计发生</td>
                  <td colspan="4" style="text-align:left;text-indent:2em">人民币大写：&nbsp;{{b}}</td>
                  <td style="text-align:center;font-size:16px;"></td>
              </tr> -->
              <tr>
                  <td colspan="6" style="text-align:left;text-indent:2em">以上结算内容为供方在 {{item.actMonth}}与本项目所发生的所有业务，累计发生收料单  张</td>
              </tr>
              <tr>
                  <td rowspan="5" colspan="3" style="text-align:left !important;padding:20px;">供货单位(盖章):<br>经办人：<br><br><br><br><span style="float:right"> &nbsp;&nbsp;&nbsp;&nbsp; 年 &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   日  </span></td>
                  <td style="text-align:center;font-size:16px;">项目部</td>
                  <td style="text-align:center;font-size:16px;">审签栏</td>
                  <td style="text-align:center;font-size:16px;">日期</td>
              </tr>
              <tr>
                  <td style="text-align:center;font-size:16px;">材料员</td>
                  <td style="text-align:center;font-size:16px;"></td>
                  <td style="text-align:center;font-size:16px;"></td>
              </tr>
              <tr>
                  <td style="text-align:center;font-size:16px;">材料主管</td>
                  <td style="text-align:center;font-size:16px;"></td>
                  <td style="text-align:center;font-size:16px;"></td>
              </tr><tr>
                  <td style="text-align:center;font-size:16px;">商务经理</td>
                  <td style="text-align:center;font-size:16px;"></td>
                  <td style="text-align:center;font-size:16px;"></td>
              </tr>
              <tr>
                  <td style="text-align:center;font-size:16px;">项目经理</td>
                  <td style="text-align:center;font-size:16px;"></td>
                  <td style="text-align:center;font-size:16px;"></td>
              </tr>
            </table>
          </el-form>
        </el-scrollbar>
      </div>
    </el-scrollbar>
      </div>
      <el-dialog  :visible.sync="dialogVisible"  width="40%"  :before-close="handleClose">
        <p class="persontop">
          按条件生成结算
        </p>
        <el-form :model="jsform" ref="jsform" :rules="modelrules" @submit.native.prevent>
         <table border="1" class="tableinsert" style="width:95%;">          
            <tr>
              <td class="tdleft" >项目ID：</td>
              <td >
                  <el-form-item prop="prjId">
                      <el-select v-model="jsform.prjId" @change="selectpro">
                          <el-option v-for="(item,index) in categoryoption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
                          </el-option>
                      </el-select>
                  </el-form-item>
              </td>
              <td class="tdleft">供应商：</td>
              <td>
                <el-form-item>
                  <el-select v-model="jsform.prId" @change="selectpro">
                      <el-option
                        v-for="(item,index) in gydata"
                        :key="index"
                        :label="item.pname"
                        :value="item.pid"
                      ></el-option>
                    </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft" >日期：</td>
              <td>
                <el-form-item>
                  <el-date-picker   @change="selectpro" v-model="jsform.getDate"  type="month"  placeholder="选择月">  </el-date-picker>
                </el-form-item>
              </td>
               <td class="tdleft" >合同：</td>
              <td>
                <el-form-item>
                  <el-select v-model="ctid" @change="htdetails">
                      <el-option
                        v-for="(item,index) in htdetail"
                        :key="index"
                        :label="item.ctname"
                        :value="item.ctid"
                      ></el-option>
                    </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
                 <td colspan="4" style="height:200px">
                   <el-scrollbar style="height:100%;overflow-x: hidden;">
                    <el-table  ref="multipleTable"  :data="tableData"  tooltip-effect="dark"   style="width: 100%"    @selection-change="handleSelectionChange">
                      <el-table-column   type="selection"    width="55">  </el-table-column>
                      <el-table-column   label="材料名"  prop="mIdName">  </el-table-column>
                      <el-table-column   prop="ctdNum"  label="采购数量"  > </el-table-column>
                      <!-- <el-table-column  prop="ctdSum"  label="实际付款金额"  show-overflow-tooltip> </el-table-column> -->
                    </el-table>
                   </el-scrollbar>
                 </td>
            </tr>
          </table>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitselect">生成结算</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import MStore from "@/components/common/mstore";
import * as material from "@/api/material.js";
import * as dictapi from "@/api/dictapi.js";
import formatDate from "@/filter/date.js";
import money from '@/filter/money.js'
export default {
  filters: {
    formatDate(time) {
      return formatDate(+time, "yyyy-MM-dd hh:mm");  //+代表字符串转数值
														不用转就不写
    }
  },

  data() {
    return {
      ctid:'',
      tableData:[],
      jsform:{
      getDate:'',
      prjId:'',
      prId:'',
            },
        a:'4454546',
      modelform: {
        mid: "",
        mnum: "",
        useloc: "",
        mprice: "",
        provState: "",
        provDate: "",
        remark: "",
        mname: "",
        reponame: "",
        douId: 0
      },
      statusoption: [
        { name: "确认", type: "1" },
        { name: "未确认", type: "0" }
      ],
      modId: 0,
      jsdetail:[],
      doubledata: [],
      multipleSelection:[],
      modelVisible: false,
      dialogVisible: true,
      num: 0,
      childsta: false,
      // 计划物资表单
      modelplan: {
        mnum: "",
        useLoc: "",
        remark: "",
        mid: ""
      },
      modelrules: {
        mnum: [
          { required: true, message: "请输入需用使用量", trigger: "blur" }
        ],
        useLoc: [
          { required: true, message: "请输入使用位置", trigger: "blur" }
        ],
        mprice: [
          { required: true, message: "请输入参考价格", trigger: "blur" }
        ],
        mid: [{ required: true, message: "请选择材料", trigger: "change" }],
        useloc: [
          { required: true, message: "请选择仓库位置", trigger: "change" }
        ],
        provState: [
          { required: true, message: "请选择供应商确认状态", trigger: "change" }
        ],
        provDate: [
          { required: true, message: "请选择供应商确认时间", trigger: "change" }
        ]
      },
      modeloption: [],
      materoption: [],
      localoption: [],
      planMVisible: false,
      ajform: new FormData(),
      fileList: [],
      saftplanform: {
        cmtId: "",
        planname: "",
        prjId: "",
        state: "",
        files: "",
        remark: ""
      },
      htdetail:[],
      personoption: [],
      categoryoption: [],
      stateoption: [
        { name: "审批中", type: "0" },
        { name: "审批通过", type: "1" },
        { name: "审批失败", type: "2" }
      ],
      useryz: {
        cmtId: [
          { required: true, message: "请选择上传员工", trigger: "change" }
        ],
        prjId: [{ required: true, message: "请选择项目ID", trigger: "change" }],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        planname: [
          { required: true, message: "请输入计划主题", trigger: "blur" }
        ]
      },
      saftplanId: 0,
      modleId: 0,
      childValue: [],
      place: [],
      materialname: [],
      gydata: [],
      ysdlist: [],
      b:'',
      id:[],
      ctId:'',
    };
  },
  methods: {
    prjselect(id) {
      console.log(id);
      if (id) {
        this.$http
          .get(material.mactMonthselectBy, { params: { prjId: id } })
          .then(res => {
            console.log(res);
            this.saftplanform = res.data.list;
          });
      }
    },
    //      查合同
     selectpro(){
          let getDatetime
          if(this.jsform.getDate){
            getDatetime = this.jsform.getDate.getTime()
          }
          let data={
              ctdateTime:getDatetime,
              prId:this.jsform.ctId,
              prjId:this.jsform.prjId,
          }
          console.log(data);
          this.$http.get(material.mcontractselect,{params:data}).then(res=>{
              console.log(res);
              this.htdetail = res.data.list;
          });
      },
    childByValue(childValue) {
      // childValue就是子组件传过来的值
      this.childValue = childValue;
      console.log(this.childValue);
      this.place = childValue[0];
      this.materialname = childValue[1];
      // console.log(this.place)
      // console.log(this.materialname)
      this.childsta = false;
      for (let i in childValue) {
        // if(isArray()){}
      }
    },
    //上传文件 获取文件信息的方法
    handlefile(par) {
      this.ajform.append("filepaths", par.file);
    },
    submitselect(){
      for(let i in this.multipleSelection){
        this.id.push(this.multipleSelection[i].ctmId);
        this.dialogVisible = false
      }
      console.log(this.id);// provId
      let provId 
      provId = JSON.stringify(this.id)
      this.$http.get(material.mcontractdetailapprToAct,{params:{provId:provId}}).then(res=>{
        if(res.data.result == 'success'){
          this.$http.get(material.mactMonthcreateActMonth).then(res=>{
              console.log(res);
              this.ctId = res.data.actId
              this.$http.get(material.mactMonthselectBy,{params:{actId:res.data.actId}}).then(res=>{
                console.log(res);
                this.jsdetail = res.data.list
                console.log(res.data.list[0].sumMoney);
                this.jsdetail[0].sumMoney = money(res.data.list[0].sumMoney)
                this.doubledata = res.data.list[0].mActMonthDetail;
              })
              // this.dialogVisible = false;
          })
        }
      })
    },
    // 合同
    htdetails(){
      this.$http.get(material.mcontractselect,{params:{ctid:this.ctid}}).then(res=>{
        console.log(res);
        // this.tableData = res.data.list[0].mContractDetail
        for(let i in res.data.list[0].mContractDetail){
            if(res.data.list[0].mContractDetail[i].ctdState == '0'){
              this.tableData.push(res.data.list[0].mContractDetail[i]);
              console.log(this.tableData);

            }
        }
      })
    },
    // 返回按钮的事件
    returncancle() {
      this.$router.go(-1);
    },
    // 上传人员
    uploadperson() {
      this.$http.get(dictapi.user).then(res => {
        this.personoption = res.data.list;
      });
    },
    // 分包项目
    category() {
      this.$http.get("/api/sub_prj/selectAll").then(res => {
        // console.log(res);
        this.categoryoption = res.data.list;
      });
    },
    //弹框右上角的x按钮
    closevisible() {
      this.modelVisible = false;
      this.modelform = {};
    },
    //新增计划物资
    addmaterial() {
      this.modelVisible = true;
      this.modelform = {};
    },
    
    // 物资计划的修改事件
    doubmodify(val) {
      console.log(val);
      this.modId = val;
      console.log(this.doubledata);
      this.modelVisible = true;
      for (let i in this.doubledata) {
        if (this.doubledata[i].douId == val) {
          // console.log(12);
          this.modelform = this.doubledata[i];
        }
      }
    },
    // 验收单
    ysddata() {
      this.$http.get(material.mapproachselectBy).then(res => {
        console.log(res);
        this.ysdlist = res.data.list;
      });
    },
    // 供应商
    gyingdata() {
      this.$http.get(material.applay).then(res => {
        console.log(res);
        this.gydata = res.data.list;
      });
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    //材料配置
    materconfig() {
      this.$http.get(material.mmaterials).then(res => {
        // console.log(res);
        this.materoption = res.data.list;
      });
    },
    // mound(){
    //     this.b = money(this.a);
    // },
    //仓库位置
    modellocaton() {
      this.$http.get(material.mrepo).then(res => {
        // console.log(res);
        this.localoption = res.data.list;
      });
    },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    printContent(e) {
      console.log(1)
      let newContent = this.$refs.examAnswerContent.innerHTML
      let oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    },

  },
  mounted() {
      // this.mound()
    this.ysddata();
    this.gyingdata();
    console.log(this.doubledata);
    this.uploadperson();
    this.category();
    this.materconfig();
    this.modellocaton();
    this.saftplanId = this.$route.query.id;
    
  }
};
</script>
<style scoped>
  .tableinsert {
    width: 90%;
    margin: 31px auto;
    }
</style>
<style lang="scss" >
td{
    // font-size: 16px;
    text-align: center;
}
.rebuild {
  height: calc(100vh - 100px);
}
.rebuild .el-scrollbar__wrap {
  overflow-x: hidden;
}
.rebuild .textOinput {
  outline: none;
  border: none;
}
</style>

