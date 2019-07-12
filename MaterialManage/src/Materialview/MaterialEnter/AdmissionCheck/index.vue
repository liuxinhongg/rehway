/*
 * @Author: 谢莹
 * @Date: 2019-05-07 10:53:27 
 * @funtion 材料入场
 */
<template>
  <div>
    <div class="toptext">材料入场验收列表</div>
    <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item>
        <span>供应商：</span>
        <el-select v-model="planform.proId">
          <el-option
            v-for="(item,index) in categoryoption"
            :key="index"
            :label="item.builderLicensesName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='车牌号：'>
        <el-input v-model="planform.vno"></el-input>
      </el-form-item>
      <el-form-item>
        <span>状态：</span>
        <el-select v-model="planform.ifacpt">
          <el-option label="接收" value="0"></el-option>
          <el-option label="退回" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button @click="addfile" type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="needData" tooltip-effect="dark" border style="width: 90%;margin:auto;" >
      <el-table-column type="index" width="80" label="序号"></el-table-column>      
      <el-table-column label="车牌号" sortable prop="vno"></el-table-column>
      <el-table-column label="验证人员" sortable prop="verMan"></el-table-column>
      <el-table-column label="供应商" sortable prop="proId"></el-table-column>
       <el-table-column label="物资清单照片" sortable >
         <template
          slot-scope="scope"
        ><a v-for='(item,index) in scope.row.mlistInfo' :key="index" :href="'/api/took/user_get_photo?fileName='+item.location">{{item.fileName}}&nbsp;&nbsp;&nbsp;&nbsp;</a></template>
     
        </el-table-column>
      <el-table-column label="物资进场申报表" sortable width='200'>
        <template
          slot-scope="scope"
        ><a v-for='(item,index) in scope.row.declareInfo' :key="index" :href="'/api/took/user_get_photo?fileName='+item.location">{{item.fileName}}&nbsp;&nbsp;&nbsp;&nbsp;</a></template>
        </el-table-column>
      <el-table-column label="是否接收" sortable prop="prj_id">
        <template
          slot-scope="scope"
        >{{scope.row.state == 0 ? '接收' : '退回' }}</template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.remark }}</div>
            <div class="boxInput">{{ scope.row.remark }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="modify(scope.row.aprid)"><i class="iconfont icon-edit"></i> 编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemnum"
        layout="prev, pager, next, jumper"
        :total="totalnum"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import * as material from "@/api/material.js";
import * as dictapi from "@/api/dictapi.js";
export default {
 
  data() {
    return {
      // 计划物资表单
      modelplan:{
        planid:'',
        mnum:'',
        useLoc:'',
        remark:'',
        mid:'',
      },
      
      modlerules:{
        mnum:[{required: true,message: "请输入总计划使用量",trigger: "blur"}],
        useLoc:[{required: true,message: "请输入使用位置",trigger: "blur"}],
        mid:[{required: true,message: "请选择材料",trigger: "change"}],
      },
      modeloption:[],
      materoption:[],
      categoryoption: [],
      currentPage: 1,
      itemnum: 12,
      totalnum: 1,
      planform: {
        planid: "",
        vno: "",
        proId: "",
        ifacpt: ""
      },
      needData: [],
      stateoption: [
        { name: "审批中", type: "0" },
        { name: "审批通过", type: "1" },
        { name: "审批失败", type: "2" }
      ]
    };
  },
  methods: {
    //获取全部的数据
    dataAll() {
      let data = {
        page: this.currentPage,
        num: this.itemnum,
        vno: this.planform.vno,
        planname: this.planform.planname,
        proId: this.planform.proId,
        ifacpt: this.planform.ifacpt
      };
      this.$http.post(material.mapproachselectBy, { params: data }).then(res => {
        console.log(res);
        this.needData = res.data.list;
        this.modeloption=res.data.list;
        this.totalnum = res.data.count;
        if (res.data.result == "error") {
          this.$message.error("添加文件失败");
        }
      });
    },
    // 添加计划
    addfile() {
      this.$router.push({ path: "/materialmanage/materialdoadmicheck?id=0" });
    },
    // 根据条件搜索
    plansearch() {
      this.dataAll();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.dataAll();
    },
    // 列表的修改
    modify(id) {
      this.$router.push({ path: "/materialmanage/materialdoadmicheck?id=" + id });
    },
    // 获取项目ID
    category() {
      this.$http.get("/api/sub_prj/selectAll").then(res => {
        console.log(res);
        this.categoryoption = res.data.list;
      });
    },
    modlesubmit(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    //materoption材料配置
    materconfig(){
      this.$http.get(material.mmaterials).then(res=>{
        console.log(res);
        this.materoption=res.data.list;
      })
    }
  },
  mounted() {
    this.dataAll();
    this.category();
    this.materconfig();
  }
};
</script>
<style lang="scss">
.searchfrom {
  width: 90%;
  margin: auto;
  margin-top: 20px;
}
.fileupload {
  width: 90%;
  margin: 10px auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.boxInput {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
