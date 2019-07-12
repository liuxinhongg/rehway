
<template>
  <div class="equipsearch">
    <p class="persontop">运营计划</p>
    <el-scrollbar style="height:100%;overflow-x: hidden;">
      <div>
        <el-scrollbar style="height:100%;">
          <el-form :model="saftplanform" :rules="doplanrules" @submit.native.prevent ref="saftplanform">
            <table border="1" class="tableinsert">
              <tr>
                <td class="tdleft" colspan="2">项目：</td>
                <td colspan="8">
                  <el-form-item prop="prjId">
                    <el-select v-model="saftplanform.prjId" style="width:280px" placeholder="请选择项目">
                      <el-option
                        v-for="(item,index) in categoryoption"
                        :key="index"
                        :value="item.id"
                        :label="item.builderLicensesName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft" colspan="2">计划名称：</td>
                <td colspan="8">
                  <el-form-item prop="bname">
                    <el-input v-model.trim="saftplanform.bname" placeholder="请输入计划名称" style="width:280px"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="2">开始时间：</td>
                <td colspan="8">
                  <el-form-item prop="beginTimeTime" >
                    <el-date-picker  style="width:280px"
                      v-model="saftplanform.beginTimeTime"
                      type="datetime"
                      placeholder="选择日期时间"
                    ></el-date-picker>
                  </el-form-item>
                </td>
                <td class="tdleft" colspan="2">结束时间：</td>
                <td colspan="8">
                  <el-form-item prop="endTimeTime">
                    <el-date-picker  style="width:280px"
                      v-model="saftplanform.endTimeTime"
                      type="datetime"
                      placeholder="选择日期时间"
                    ></el-date-picker>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="2">填报人：</td>
                <td colspan="8">
                  <el-form-item prop="cmtMan">
                    <el-select v-model="saftplanform.cmtMan" placeholder="请选择填报人" style="width:280px">
                      <el-option
                        v-for="(item,index) in personoption"
                        :key="index"
                        :value="item.workerId"
                        :label="item.workerName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft" colspan="2">审批人：</td>
                <td colspan="8">
                  <el-form-item prop="leaderNext">
                    <el-select v-model="saftplanform.leaderNext" placeholder="请选择审批人" style="width:280px">
                      <el-option
                        v-for="(item,index) in personoption"
                        :key="index"
                        :value="item.workerId"
                        :label="item.workerName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="20">
                  <span style="margin:0 40%;font-size:18px;font-family: '楷体';">设备明细列表</span>
                  <el-button
                    style="text-align:right;margin-right:10px;"
                    type="primary"
                    @click="addmaterial()"
                  >+设备</el-button>
                </td>
              </tr>
              <tr v-if="doubledata.length>0">
                <td colspan="5" style="text-align:center;">序号</td>
                <td colspan="7" style="text-align:center;">设备名称</td>
                <td colspan="5" style="text-align:center;">价格</td>
                <td colspan="3">操作</td>
              </tr>
              <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;" v-if="doubledata.length>0">
                <td colspan="5">{{index+1}}</td>
                <td colspan="7" v-if='item.mname'>{{ item.mname  }}</td>
                <td colspan="5" v-if='item.price'>{{ item.price }}</td>
                <td colspan="3">
                  <el-button type="text" @click="doubmodify(item.id)">修改</el-button>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="1">备注：</td>
                <td colspan="19">
                  <el-form-item>
                    <el-input v-model.trim="saftplanform.remark" type="textarea" :rows="2"></el-input>
                  </el-form-item>
                </td>
              </tr>
             
            </table>
            <el-form-item style="text-align:center;">
              <el-button
                type="primary"
                native-type="submit"
                @click="saftplansubmit('saftplanform')"
              >提交</el-button>
              <el-button @click="modelV('saftplanform')">保存</el-button>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <el-dialog title="设备" :visible.sync="modelVisible" center :close="closevisible">
        <!-- @submit.native.prevent -->
                <el-form :model="equipdetialform" ref="equipdetialform" :rules="modelrules" @submit.native.prevent>
                    <table border="1" class="tableinsert" style="width:95%;">
                        <tr>
                            <td class="tdleft">设备：</td>
                            <td>
                                <el-form-item prop="devcode">
                                    <el-select v-model="equipdetialform.devcode" style="width:280px">
                                        <el-option v-for="(item,index) in wzdetail" :key="index" :value="item.devcode" :label="item.mname"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td class="tdleft">价格：</td>
                            <td>
                                <el-form-item prop="price">
                                    <el-input v-model.trim="equipdetialform.price" style="width:280px" :min="1"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                    </table>
                    <el-form-item style="text-align:center;">
                      <!-- native-type="submit" -->
                        <el-button type="primary" @click="modelesubmit('equipdetialform')">提交</el-button>
                        <el-button @click="modelVisible=false" >返回</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
    </el-scrollbar>
  </div>
</template>
<script>
import * as material from "@/api/material.js";
import * as dictapi from "@/api/dictapi.js";
import * as equipmanage from "@/api/equipmanage.js";
import formatDate from "@/filter/date.js";

export default {
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  //  components: {
  //   child
  // },
  data() {
    return {
        multipleSelection: [],
        tableData:[],
      wzdetail: [],
      fileList: [],
      equipdetialform: {
        devcode: "",
        price: "",
      },
      statusoption: [
        { name: "确认", type: "1" },
        { name: "未确认", type: "0" }
      ],
      modId: 1,
      // 传值   数组
      doubledata: [],
      modelVisible: false,
      num: 0,
      modelrules: {
        price: [ 
          { required: true, message: "请输入参考价格", trigger: "blur" },
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,message:'请输入正确的价格数，小数点不超过两位' } 
        ],
        devcode: [{ required: true, message: "请选择设备", trigger: "change" }],
      },
      modeloption: [],
      materoption: [],
      localoption: [],
      planMVisible: false,
      ajform: new FormData(),
      // 传值
      saftplanform: {
        bname:'',
        cmtMan: "",
        prjId: "",
        beginTimeTime: "",
        remark: "",
        leaderNext:'',
        endTimeTime: ""
      },
      personoption: [],
      categoryoption: [],
      stateoption: [
        { name: "审批中", type: "0" },
        { name: "审批通过", type: "1" },
        { name: "审批失败", type: "2" }
      ],
      doplanrules: {
        cmtMan: [ { required: true, message: "请选择上传员工", trigger: "change" } ],
        bname:[
          { required: true, message: "输入计划名称", trigger: "blur" },
          {pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,20}$/,message:'计划名称格式不正确'}
        ],
        prjId: [{ required: true, message: "请选择项目ID", trigger: "change" }],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        planName: [ { required: true, message: "请输入设备需求计划名称", trigger: "blur" }],
        beginTimeTime:[{ required: true, message: "请选择开始时间", trigger: "change" }],
        endTimeTime:[{ required: true, message: "请选择结束时间", trigger: "change" }],
        leaderNext:[{ required: true, message: "请选择审批人", trigger: "change" }],
      },
      saftplanId: 0,
      modleId: 0,
      childValue: [],
      place: [],
      materialname: [],
      form: [],
      fileid: 0,
      devcode:[],
    };
  },
  methods: {
    // 文件上传
    // needfile(per) {
    //   this.ajform.append("filepaths", per.file);
    // },
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
    //修改和添加的公共方法
    saftplansubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ajform.append("cmtMan", this.saftplanform.cmtMan);
          this.ajform.append("leaderNext", this.saftplanform.leaderNext);
          this.ajform.append("bname", this.saftplanform.bname);
          this.ajform.append("prjId", this.saftplanform.prjId);
          this.ajform.append("remark", this.saftplanform.remark);
          let a = JSON.stringify(this.doubledata);
          this.ajform.append("devBusinessPlanDetails", a);
          console.log(this.saftplanform);
          console.log(a);
            this.ajform.append("beginTimeTime", this.saftplanform.beginTimeTime.getTime());
            this.ajform.append("endTimeTime", this.saftplanform.endTimeTime.getTime());
            this.$http
              .post(equipmanage.devbusinessplansubmit, this.ajform)
              .then(res => {
                if (res.data.result == "success") {
                  this.$message.success("添加成功~");
                  this.$router.push("/equipmanage/plansearch");
                } else if (res.data.result == "error") {
                  this.$message.error("添加失败");
                }
              });
        } else {
          this.$message.error("提交数据失败");
          return false;
        }
      });
    },
    // 返回按钮的事件
    returncancle() {
      // this.$router.push({path:'/materialmanage/goodslplan'});
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
        this.categoryoption = res.data.list;
      });
    },
    // shebei 
    // wzdata() {
    //   this.$http.get(material.equipreginsert).then(res => {
    //     console.log(res);
    //     this.wzdetail = res.data.list;
    //   });
    // },
    //弹框右上角的x按钮
    closevisible() {
      this.modelVisible = false;
      this.equipdetialform = {};
    },
    //新增计划物资
    addmaterial() {
      this.equipdetialform = {};
      this.modId = 0;
      // 设备查询
      if(this.saftplanform.beginTimeTime == '' || this.saftplanform.endTimeTime == ''){
        alert('开始时间结束时间不能为空')
      }else{
        let data = {
          bDateTime:this.saftplanform.beginTimeTime.getTime(),
          eDateTime:this.saftplanform.endTimeTime.getTime()
        }
        console.log(data)
         this.$http.get(equipmanage.devreginfoselectCanPlan,{params:data}).then(res=>{
            console.log(res.data.result);
            if(res.data.result == 'null'){
              alert('时间错误')
            }else if(res.data.result == 'error'){
              alert('时间错误')
            }else{
               this.modelVisible = true;
              this.wzdetail = res.data.list
            }
        })
      }
    },
    // 弹框的提交事件
    modelesubmit(Fname) {
      this.$refs[Fname].validate(valid => {
        console.log(11);
        let pricenum=/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        if(this.equipdetialform.devcode==''||this.equipdetialform.devcode==null){
        }else if(this.equipdetialform.price==''||this.equipdetialform.price==null){
        }else if(!pricenum.test(this.equipdetialform.price)){
        }else{
          if(this.modId==0){
            this.equipdetialform.id=Math.floor(Math.random()*200);
            this.doubledata.push(this.equipdetialform);
            console.log(this.equipdetialform);
            if(this.doubledata.length!=0){
                for(let item in this.wzdetail){
                    if(this.wzdetail[item].devcode==this.equipdetialform.devcode){
                        this.equipdetialform.mname= this.wzdetail[item].mname;
                    }
                }
            }
            this.modelVisible=false;
          }else{
            console.log('我是编辑');
            this.equipdetialform.id=this.modId;
            for(let val in this.doubledata){
              if(this.doubledata[val].id==this.modId){
                console.log(12);
                this.doubledata[val]=this.equipdetialform;
              }
            }
            for(let item in this.wzdetail){
              if(this.wzdetail[item].devcode==this.equipdetialform.devcode){
                  this.equipdetialform.mname= this.wzdetail[item].mname;
              }
            }
            this.modelVisible=false;
          }
        }
      })
    },
    // 物资计划的修改事件
    doubmodify(id) {
      if (this.id == 0) {
        console.log(id);
        this.modId = id;
        console.log(this.doubledata);
        this.modelVisible = true;
        for (let i in this.doubledata) {
          if (this.doubledata[i].id == id) {
            // console.log(12);
            this.equipdetialform = this.doubledata[i];
          }
        }
      } else {
        this.modelVisible = true;
        this.$http
          .get(equipmanage.devbusinessplandetailselectBy, { params: { id: id } })
          .then(res => {
            console.log(res);
            this.equipdetialform = res.data.list[0];
          
          });
      }
    },
    //材料配置
    materconfig() {
      this.$http.get("/api/mmaterials/selectBy").then(res => {
        console.log(res);
        this.materoption = res.data.list;
      });
    },
    //仓库位置
    modellocaton() {
      this.$http.get(dictapi.location).then(res => {
        console.log(res);
        this.localoption = res.data.list;
      });
    },
    modelV(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ajform.append("cmtMan", this.saftplanform.cmtMan);
          this.ajform.append("bname", this.saftplanform.bname);
          this.ajform.append("prjId", this.saftplanform.prjId);
          this.ajform.append("leaderNext", this.saftplanform.leaderNext);
          this.ajform.append("remark", this.saftplanform.remark);
          let a = JSON.stringify(this.doubledata);
          this.ajform.append("devBusinessPlanDetails", a);
          console.log(this.saftplanform);
          console.log(a);
            this.ajform.append("beginTimeTime", this.saftplanform.beginTimeTime.getTime());
            this.ajform.append("endTimeTime", this.saftplanform.endTimeTime.getTime());
            this.$http
              .post(equipmanage.devbusinessplansave, this.ajform)
              .then(res => {
                if (res.data.result == "success") {
                  this.$message.success("添加成功~");
                  this.$router.push("/equipmanage/plansearch");
                } else if (res.data.result == "error") {
                  this.$message.error("添加失败");
                }
              });
        } else {
          // this.$message.error("提交数据失败");
          return false;
        }
      });
    }
  },
  mounted() {
    // this.wzdata();
    this.uploadperson();
    this.category();
    this.materconfig();
    this.modellocaton();
    this.saftplanId = this.$route.query.id;
    this.id = this.$route.query.id;
    //列表页面编辑操作
    if (this.id != 0) {
      this.$http
        .get(equipmanage.devbusinessplanselectBy, { params: { businessId: this.id } })
        .then(res => {
          console.log(res);
          this.saftplanform = res.data.list[0];
          this.doubledata = res.data.list[0].devBusinessPlanDetails;
          if (typeof res.data.list[0].state == "number") {
            this.saftplanform.state = res.data.list[0].state.toString();
          }
        });
      console.log("编辑前请求的数据");
    }
    
  }
};
</script>

<style lang="scss">
.equipsearch {
  height: calc(100vh - 100px);
}
.equipsearch .el-scrollbar__wrap {
  overflow-x: hidden;
}
.equipsearch .textOinput {
  outline: none;
  border: none;
}
</style>