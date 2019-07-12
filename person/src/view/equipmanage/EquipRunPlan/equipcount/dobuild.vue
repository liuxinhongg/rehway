/*
 * @Author: 谢莹
 * @Date: 2019-05-07  
 * @function: 运营结算
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
      <div>
        <el-scrollbar style="height:100%;">
              <h3 class="persontop">结算表</h3>
              <!-- style="border-bottom: 4px solid #ccc;" -->
            <table border="1" class="tableinsert" v-if="isfalse == true" style="border-bottom: 4px solid #ccc;">
                  <tr >
                    <td style="text-align:center;font-size:16px;">项目：</td>
                    <td colspan="2" style="text-align:center;font-size:16px;">{{jsdetail.prjIdName}} </td>
                    <td style="text-align:center;font-size:16px;">运营计划：</td>
                    <td colspan="2" style="text-align:center;font-size:16px;"> {{jsdetail.planName }} </td>
                  </tr>
                  <tr>
                    <td  style="text-align:center;">序号</td>
                    <td colspan="2" style="text-align:center;">设备名称</td>
                    <td style="text-align:center;">数量</td>
                    <td  style="text-align:center;">参考价格</td>
                    <td  style="text-align:center;">小计</td>
                  </tr>
                  <tr v-for="(item,index) in jsdetail.list" :key="index" style="text-align:center;">
                    <td  style="text-align:center;font-size:16px;">{{index+1}}</td>
                    <td colspan="2" style="text-align:center;font-size:16px;">{{item.devCodeName}}</td>
                    <td  style="text-align:center;font-size:16px;">{{item.runCount}}</td>
                    <td  style="text-align:center;font-size:16px;">{{item.price}}</td>
                    <td  style="text-align:center;font-size:16px;">{{item.sumMoney}}</td>
                  </tr>
                  <tr>
                      <td style="text-align:center;font-size:16px;">合计</td>
                      <td colspan="4" style="text-align:left;text-indent:2em">人民币大写：{{jsdetail.sumMoney}}</td>
                      <td style="text-align:center;font-size:16px;"></td>
                  </tr>
                  <tr>
                      <td colspan="6" style="text-align:left;text-indent:2em">以上结算内容为{{jsdetail.planName }}的所有业务</td>
                  </tr>
              <tr>
                  <td rowspan="4" colspan="3" style="text-align:left !important;padding:20px;">经办人：<br><br><br><br><span style="float:right"> &nbsp;&nbsp;&nbsp;&nbsp; 年 &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   日  </span></td>
                  <td style="text-align:center;font-size:16px;">项目部</td>
                  <td style="text-align:center;font-size:16px;">审签栏</td>
                  <td style="text-align:center;font-size:16px;">日期</td>
              </tr>
              <tr>
                  <td style="text-align:center;font-size:16px;">设备主管</td>
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
            <table border="1" class="tableinsert" v-if="isfalse == false">
                  <tr >
                    <td style="text-align:center;font-size:16px;">设备：</td>
                    <td colspan="5" style="text-align:center;font-size:16px;">{{jsdetail.devCodeName}} </td>
                  </tr>
                  <tr>
                    <td  style="text-align:center;">序号</td>
                    <td colspan="2" style="text-align:center;">运营计划</td>
                    <td style="text-align:center;">数量</td>
                    <td  style="text-align:center;">参考价格</td>
                    <td  style="text-align:center;">小计</td>
                  </tr>
                  <tr v-for="(item,index) in jsdetail.list" :key="index" style="text-align:center;">
                    <td  style="text-align:center;font-size:16px;">{{index+1}}</td>
                    <td colspan="2" style="text-align:center;font-size:16px;">{{item.planIdName}}</td>
                    <td  style="text-align:center;font-size:16px;">{{item.runCount}}</td>
                    <td  style="text-align:center;font-size:16px;">{{item.price}}</td>
                    <td  style="text-align:center;font-size:16px;">{{item.sumMoney}}</td>
                  </tr>
                  <tr>
                      <td style="text-align:center;font-size:16px;">合计</td>
                      <td colspan="4" style="text-align:left;text-indent:2em">人民币大写：{{jsdetail.sumMoney}}</td>
                      <td style="text-align:center;font-size:16px;"></td>
                  </tr>
                  <tr>
                      <td colspan="6" style="text-align:left;text-indent:2em">以上结算内容为{{jsdetail.planName }}的所有业务</td>
                  </tr>
               
              <tr>
                  <td rowspan="4" colspan="3" style="text-align:left !important;padding:18px;">经办人：<br><br><br><br><span style="float:right"> &nbsp;&nbsp;&nbsp;&nbsp; 年 &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   日  </span></td>
                  <td style="text-align:center;font-size:16px;">项目部</td>
                  <td style="text-align:center;font-size:16px;">审签栏</td>
                  <td style="text-align:center;font-size:16px;">日期</td>
              </tr>
              <tr>
                  <td style="text-align:center;font-size:16px;">设备主管</td>
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
        </el-scrollbar>
      </div>
    </el-scrollbar>
      </div>
      <el-dialog title="生成结算" :visible.sync="dialogFormVisible" center width="30%">
      <el-form :model="visibleform" :rules="visiblerules" ref="form" label-width="100px" @submit.native.prevent>
        <el-form-item >
          <span>运营计划：</span>
          <el-select v-model="visibleform.planId" placeholder="请选择" @change="yychange"  style="width:240px">
            <el-option v-for="(item,index) in yydetail" :key="index" :label="item.bname" :value="item.businessId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span>设&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 备：</span>
          <el-select v-model="visibleform.devCode" placeholder="请选择"  style="width:240px">
              <el-option v-for="(item,index) in sbdetail" :key="index" :label="item.mname" :value="item.devcode"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onsubmit('visibleform')" native-type="submit">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as material from "@/api/material.js";
import * as dictapi from "@/api/dictapi.js";
import formatDate from "@/filter/date.js";
import * as equipmanage from "@/api/equipmanage.js";
import money from '@/filter/money.js'
export default {
  filters: {
    formatDate(time) {
      return formatDate(+time, "yyyy-MM-dd hh:mm");  //+代表字符串转数值   // 不用转就不写
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
      dialogFormVisible: true,
      visibleform: {
        planId: '',
        devCode: '',
      },
      visiblerules: {
        planId: [
          { required: true, message: "请选择运营计划", trigger: "change" }
        ],
        devCode: [
          { required: true, message: "请选择设备", trigger: "change" }
        ],
      },
      num: 0,
      // childsta: false,
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
      // childValue: [],
      place: [],
      materialname: [],
      yydetail:[],
      sbdetail:[],
      gydata: [],
      ysdlist: [],
      b:'',
      id:[],
      ctId:'',
      isfalse:true,
    };
  },
  methods: {
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
    // childByValue(childValue) {
    //   // childValue就是子组件传过来的值
    //   this.childValue = childValue;
    //   console.log(this.childValue);
    //   this.place = childValue[0];
    //   this.materialname = childValue[1];
    //   this.childsta = false;
    //   for (let i in childValue) {
    //     // if(isArray()){}
    //   }
    // },
    //上传文件 获取文件信息的方法
    handlefile(par) {
      this.ajform.append("filepaths", par.file);
    },
    
// 生成结算
    onsubmit(){
      if(this.visibleform.planId==''||this.visibleform.planId==null){
        this.$message.error('请选择运营计划')
      }else if(this.visibleform.devCode==''||this.visibleform.devCode==null){
        this.$message.error('请选择设备')
      }else{
        console.log(this.visibleform.planId,this.visibleform.devCode)
        let data = {
          planId:this.visibleform.planId,
          devCode:this.visibleform.devCode
        }
        this.$http.get(equipmanage.devruncreate,{params:data}).then(res=>{
            console.log(res)
            if(res.data.data.devCode !='' || res.data.data.planId == ''){
              this.isfalse= false
            }else{
              this.isfalse= true
            }
            console.log(this.isfalse)
            this.jsdetail = res.data.data
            this.jsdetail.sumMoney = money(this.jsdetail.sumMoney);
            // this.doubledata = res.data.data.list
        })
        this.dialogFormVisible = false
      }
    },
    // 运营计划
    yydata(){
      this.$http.get(equipmanage.devbusinessplanselectBy).then(res=>{
        // console.log(res);
        this.yydetail = res.data.list;
      })
    },
     sbdata(){
      this.$http.get(equipmanage.equipreginsert).then(res=>{
        console.log(res);
        this.sbdetail = res.data.list
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
    yychange(){
      let bid = this.visibleform.planId
      this.$http.get(equipmanage.devbusinessplandetailselectBy,{params:{bId:bid}}).then(res=>{
        // console.log(res);
        this.sbdetail = res.data.list
      })
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
     yydata(){
      this.$http.get(equipmanage.devbusinessplanselectBy).then(res=>{
        // console.log(res);
        this.yydetail = res.data.list;
      })
    },
    sbdata(){
      this.$http.get(equipmanage.equipreginsert).then(res=>{
        console.log(res);
        this.sbdetail = res.data.list
      })
    }

  },
  mounted() {
      // this.mound()
      this.yydata();
      this.sbdata()
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

