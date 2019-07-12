/*
 * @Author: 谢莹
 * @Date: 2019-05-07 10:53:27 
 * @funtion 仓库材料盘点
 */
<template>
  <div>
    <p class="persontop">材料盘点</p>
    <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item label="仓库：">
        <el-select v-model="planform.repoid">
          <el-option
            v-for="(item,index) in ckdetail"
            :key="index"
            :label="item.reponame"
            :value="item.repoid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <!-- <el-button @click="addfile" type="success">+新增</el-button> -->
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="adverData" tooltip-effect="dark" border style="width: 90%;margin:auto;" >
      <el-table-column type="index" width="80" label="序号"></el-table-column>      
      <el-table-column label="物资" sortable prop="mmidName" ></el-table-column>
      <el-table-column label="物资数量" sortable prop="mnum"></el-table-column>
      <!-- <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button type="text" style="color:#E6A23C" @click="modify(scope.row.planid)" icon="el-icon-edit">修改</el-button> -->
          <!-- <el-button type="text" @click="modifydata(scope.row.id)">详情</el-button> 
        </template>
      </el-table-column> -->-->
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
        ckdetail:[],
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
        repoid: "",
      },
      adverData: [],
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
        repoid:this.planform.repoid,
        // mid:this.mid,
      };
      this.$http.get(material.mrepocheckselectBy,{params:data}).then(res => {
        console.log(res);
        this.adverData = res.data.list;
        this.modeloption=res.data.list;
        this.totalnum = res.data.count;
        if (res.data.result == "error") {
          this.$message.error("添加文件失败");
        }
      });
    },
    // 添加计划
    addfile() {
      this.$router.push({ path: "/materialmanage/dototalplan?id=0" });
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
      this.$router.push({ path: "/materialmanage/dototalplan?id=" + id });
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
    ckdata(){
        this.$http.get(material.mrepo).then(res=>{
            console.log(res);
            this.ckdetail = res.data.list
        })
    },
    //materoption材料配置
    materconfig(){
      this.$http.get(material.mmaterials).then(res=>{
        console.log(res);
        this.materoption=res.data.list;
      })
    },
    modifydata(id){
      this.$router.push('/materialmanage/matericalcheckdata?id='+id);
    }
  },
  mounted() {
      this.ckdata();
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
