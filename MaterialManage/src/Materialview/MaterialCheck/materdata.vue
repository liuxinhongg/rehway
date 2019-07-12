/*
 * @Author: 谢莹
 * @Date: 2019-05-07  
 * @function: 仓库详情
 */
<template>
  <div class="rebuild">
      <div style="width:90%;margin:0 auto;text-align:right">
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
            <table border="1" class="tableinsert">
              <tr>
                <td style="text-align:center;font-size:16px;">仓库：</td>
                <td style="text-align:center;font-size:16px;">rweryeyerye </td>
                <td style="text-align:center;font-size:16px;">仓库位置：</td>
                <td style="text-align:center;font-size:16px;">  ryeywyewryewry </td>
                <td style="text-align:center;font-size:16px;">仓库管理员：</td>
                <td style="text-align:center;font-size:16px;"> ewryeryeyyeyew </td>
              </tr>
              <tr>
                <td style="text-align:center;font-size:16px;">验收单：</td>
                <td style="text-align:center;font-size:16px;" colspan="5">eryewyeyrerwye  </td>
              </tr>
              <tr v-if="doubledata.length>0">
                <td  style="text-align:center;">序号</td>
                <td  style="text-align:center;">物资名称</td>
                <td  style="text-align:center;">物品型号</td>
                <td  style="text-align:center;">物品单位</td>
                <td  style="text-align:center;">库存量</td>
                <td  style="text-align:center;">供应商</td>
                <td  style="text-align:center;">物品价格</td>
              </tr>
              <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                <td  style="text-align:center;font-size:16px;">{{index+1}}</td>
                <td  style="text-align:center;font-size:16px;">{{item.mname}}</td>
                <td  style="text-align:center;font-size:16px;">{{item.reponame}}</td>
                <td  style="text-align:center;font-size:16px;">{{item.mnum}}</td>
                <td  style="text-align:center;font-size:16px;">{{item.mprice}}</td>
                <td  style="text-align:center;font-size:16px;">{{item.mprice}}</td>
                <td  style="text-align:center;font-size:16px;">{{item.mprice}}</td>
              </tr>
            </table>
          </el-form>
        </el-scrollbar>
      </div>
    </el-scrollbar>
      </div>
  </div>
</template>
<script>
import MStore from "@/components/common/mstore";
import * as material from "@/api/material.js";
import * as dictapi from "@/api/dictapi.js";
import money from '@/filter/money.js'
export default {
  data() {
    return {
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
      doubledata: [],
      modelVisible: false,
      num: 0,
      childsta: false,
      // 计划物资表单
      modelplan: {
        mnum: "",
        useLoc: "",
        remark: "",
        mid: ""
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
        // state: [{ required: true, message: "请选择状态", trigger: "change" }],
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
        // console.log(res);
        this.gydata = res.data.list;
      });
    },
    //材料配置
    materconfig() {
      this.$http.get(material.mmaterials).then(res => {
        // console.log(res);
        this.materoption = res.data.list;
      });
    },
    mound(){
        this.b = money(this.a);
    },
    //仓库位置
    modellocaton() {
      this.$http.get(material.mrepo).then(res => {
        // console.log(res);
        this.localoption = res.data.list;
      });
    },
    printContent(e) {
        console.log(1)
      let newContent = this.$refs.examAnswerContent.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },

  },
  mounted() {
      this.mound()
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

<style lang="scss" scoped>
td{
    font-size: 16px;
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
