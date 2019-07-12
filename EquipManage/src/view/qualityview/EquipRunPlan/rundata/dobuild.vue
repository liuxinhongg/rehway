
<template>
  <div class="equipsearch">
    <p class="persontop">运营数据详情</p>
    <el-scrollbar style="height:100%;overflow-x: hidden;">
      <div>
        <el-scrollbar style="height:100%;">
          <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent ref="saftplanform">
            <table border="1" class="tableinsert">
              <tr>
                <td class="tdleft" colspan="2">项目ID：</td>
                <td colspan="8">
                  <el-form-item prop="prjId">
                    <el-select v-model="saftplanform.prjId" style="width:280px">
                      <el-option
                        v-for="(item,index) in categoryoption"
                        :key="index"
                        :value="item.id"
                        :label="item.builderLicensesName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft" colspan="2">上传人：</td>
                <td colspan="8">
                  <el-form-item prop="cmtMan">
                    <el-select v-model="saftplanform.cmtMan" style="width:280px">
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
                <td class="tdleft" colspan="2">状态：</td>
                <td colspan="18">
                  <el-form-item prop="state">
                    <el-select v-model="saftplanform.state" style="width:280px">
                      <el-option value="0" label="审批中"></el-option>
                      <el-option value="1" label="审批通过"></el-option>
                      <el-option value="2" label="审批未通过"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="20">
                  <span style="margin:0 40%;font-size:18px;font-family: '楷体';">设备明细列表</span>
                </td>
              </tr>
              <tr v-if="doubledata.length>0">
                <td colspan="2" style="text-align:center;">序号</td>
                <td colspan="9" style="text-align:center;">设备名称</td>
                <td colspan="9" style="text-align:center;">价格</td>
              </tr>
              <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                <td colspan="2">{{index+1}}</td>
                <td colspan="9" v-if='item.mname'>{{ item.mname  }}</td>
                <td colspan="9" v-if="item.price">{{item.price}}</td>
              </tr>
              <tr>
                <td class="tdleft" colspan="1">备注：</td>
                <td colspan="19">
                  <el-form-item>
                    <el-input v-model="saftplanform.remark" type="textarea" :rows="2"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="1">批注意见：</td>
                <td colspan="19">
                  <el-form-item prop="audit">
                    <el-input v-model="saftplanform.audit" type="textarea" :rows="2"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
            <el-form-item style="text-align:center;">
              <!-- <el-button
                type="primary"
                native-type="submit"
                @click="saftplansubmit('saftplanform')"
              >提交</el-button> -->
              <el-button @click="modelV">返回</el-button>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <el-dialog title="设备" :visible.sync="modelVisible" center :close="closevisible">
        <el-table  ref="multipleTable"  :data="tableData"    tooltip-effect="dark"    style="width: 100%"  @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="mname" label="设备名" width="120"></el-table-column>
          <el-table-column prop="mtypeName" label="设备类型" show-overflow-tooltip></el-table-column>
        </el-table>
        <div style="text-align:center;margin-top:20px;">
            <el-button type="primary" native-type="submit" @click="modelesubmit(devcode)">提交</el-button>
            <el-button @click="modelVisible=false">返回</el-button>
        </div>
        
      </el-dialog>
    </el-scrollbar>
  </div>
</template>
<script>
// import MStore from '@/components/common/mstore'
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
        mmid: "",
        mnum: "",
        mloc: "",
        mBeginDateTime: "",
        remark: "",
        mname: "",
        uselocName: ""
      },
      statusoption: [
        { name: "确认", type: "1" },
        { name: "未确认", type: "0" }
      ],
      modId: 0,
      // 传值   数组
      doubledata: [],
      modelVisible: false,
      num: 0,
      modelrules: {
        mnum: [
          { required: true, message: "请输入需用使用量", trigger: "blur" }
        ],
        mprice: [
          { required: true, message: "请输入参考价格", trigger: "blur" }
        ],
        mmid: [{ required: true, message: "请选择物资", trigger: "change" }],
        mloc: [{ required: true, message: "请选择位置", trigger: "change" }],
        mBeginDateTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      },
      modeloption: [],
      materoption: [],
      localoption: [],
      planMVisible: false,
      ajform: new FormData(),
      // 传值
      saftplanform: {
        cmtMan: "",
        prjId: "",
        beginTimeTime: "",
        remark: "",
        endTimeTime: ""
      },
      personoption: [],
      categoryoption: [],
      stateoption: [
        { name: "审批中", type: "0" },
        { name: "审批通过", type: "1" },
        { name: "审批失败", type: "2" }
      ],
      useryz: {
        cmtMan: [
          { required: true, message: "请选择上传员工", trigger: "change" }
        ],
        prjId: [{ required: true, message: "请选择项目ID", trigger: "change" }],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        planName: [
          { required: true, message: "请输入设备需求计划名称", trigger: "blur" }
        ]
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
          this.ajform.append("prjId", this.saftplanform.prjId);
          this.ajform.append("state", this.saftplanform.state);
          this.ajform.append("remark", this.saftplanform.remark);
          this.ajform.append("audit", this.saftplanform.audit);
          let a = JSON.stringify(this.multipleSelection);
          this.ajform.append("devBusinessPlanDetails", a);
          console.log(this.saftplanform);
          console.log(a);
        //   新增的方法
          if (this.saftplanId == 0) {
                this.ajform.append("beginTimeTime", this.saftplanform.beginTimeTime.getTime());
                this.ajform.append("endTimeTime", this.saftplanform.endTimeTime.getTime());
            this.$http
              .post(equipmanage.devbusinessplaninsert, this.ajform)
              .then(res => {
                if (res.data.result == "success") {
                  this.$message.success("添加成功~");
                  this.$router.push("/equipmanage/plansearch");
                } else if (res.data.result == "error") {
                  this.$message.error("添加失败");
                }
              });
          } else {
            // 编辑的方法
            this.ajform.append("businessId", this.saftplanId);
            this.$http
              .post(equipmanage.devbusinessplanupdate, this.ajform)
              .then(res => {
                if (res.data.result == "success") {
                  this.$message.success("修改成功~");
                  this.$router.push("/equipmanage/plansearch");
                } else if (res.data.result == "error") {
                  this.$message.error("修改失败");
                }
              });
          }
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
    // 物资
    wzdata() {
      this.$http.get(material.mmaterials).then(res => {
        console.log(res);
        this.wzdetail = res.data.list;
      });
    },
    //弹框右上角的x按钮
    closevisible() {
      this.modelVisible = false;
      this.equipdetialform = {};
    },
    //新增计划物资
    addmaterial() {
      this.modelVisible = true;
      this.equipdetialform = {};
      this.modId = 0;
      this.$http.get(equipmanage.equipreginsert).then(res=>{
        console.log(res);
        this.tableData = res.data.list
    })
    },
    // 弹框的提交事件
    modelesubmit(Fname) {
      if (this.id == 0) {
          console.log(this.multipleSelection)
          for(let i in this.multipleSelection){
            this.multipleSelection[i].id = '';
          }
          this.doubledata = this.multipleSelection
          console.log(this.multipleSelection)
          this.modelVisible=false
      } else {
         for(let i in this.multipleSelection){
            this.multipleSelection[i].id = '';
          }

          this.doubledata = this.multipleSelection
          let a = JSON.stringify(this.multipleSelection)
          console.log(this.multipleSelection)
          let data ={
              bId:this.id,
              devBusinessPlanDetail:a
          }
          this.$http.get(equipmanage.devbusinessplandetailinsert,{params:data}).then(res=>{
              console.log(res);
          })

          this.modelVisible=false

      }
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
          .get(equipmanage.devreqplandetailselectBy, { params: { id: id } })
          .then(res => {
            console.log(res);
            this.equipdetialform = res.data.list[0];
            if (typeof res.data.list[0].state == "number") {
              this.equipdetialform.state = res.data.list[0].state.toString();
            }
            if (typeof res.data.list[0].mBeginDate == "number") {
              this.equipdetialform.mBeginDateTime = res.data.list[0].mBeginDate;
            }
            // modId
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
    modelV() {
      console.log(1);
      this.$router.go(-1);
    }
  },
  mounted() {
    this.wzdata();
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