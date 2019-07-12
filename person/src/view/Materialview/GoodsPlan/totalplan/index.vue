/*
 * @Author: 谢莹
 * @Date: 2019-05-07 10:53:27 
 * @funtion 物资计划--总计划
 */
<template>
  <div class="totleplan">
    <p class="persontop">材料总计划</p>
    <el-scrollbar style="height:100%;">    
      <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
        <el-form-item >
        <span>总计划名称：</span> <el-input v-model="planform.planname" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item >
          <span>项目ID：</span>
          <el-select v-model="planform.prjid" style="width:220px;">
            <el-option
              v-for="(item,index) in categoryoption"
              :key="index"
              :label="item.builderLicensesName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span>状态：</span>
          <el-select v-model="planform.state" style="width:220px;">
            <el-option
              v-for="(item,index) in stateoption"
              :key="index"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button @click="addfile" type="success">+新增</el-button>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="adverData" tooltip-effect="dark" border style="width: 90%;margin:auto;" >
        <el-table-column type="index" width="80" label="序号"></el-table-column>      
        <el-table-column label="计划编号" sortable prop="planid" width="150"></el-table-column>
        <el-table-column label="计划名称" sortable prop="planname"></el-table-column>
        <el-table-column label="项目名称" sortable prop="prjIdName"></el-table-column>
        <el-table-column label="提交人" sortable prop="cmtIdName" width="120"></el-table-column>
        <el-table-column label="详情" sortable width="200">
          <template slot-scope="scope">
            <!-- <img v-for="(item,index) in scope.row.filesList" :key="index" :src="'/api/took/user_get_photo?fileName='+item.location" alt="" srcset=""> -->
            <a v-for="(item,index) in scope.row.filesList" :key="index" :href="'/api/took/user_get_photo?fileName='+item.location">{{item.fileName   }}&nbsp;&nbsp;&nbsp; &nbsp;</a>
          </template>
        </el-table-column>
        <el-table-column label="状态" sortable prop="prj_id">
          <template
            slot-scope="scope"
          >{{scope.row.state == 0 ? '审批中' : scope.row.state == 1 ? '审批通过' : '审批失败' }}</template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.remark }}</div>
              <div class="boxInput">{{ scope.row.remark }}</div>
            </el-tooltip>
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
    </el-scrollbar>
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
        planname: "",
        prjid: "",
        state: ""
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
        planid: this.planform.planid,
        planname: this.planform.planname,
        prjid: this.planform.prjid,
        state: this.planform.state
      };
      this.$http.get(material.mplan, { params: data }).then(res => {
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
    //materoption材料配置
    materconfig(){
      this.$http.get(material.mmaterials).then(res=>{
        console.log(res);
        this.materoption=res.data.list;
      })
    },
    modifydata(id){
      this.$router.push('/materialmanage/dototalplandata?id='+id);
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
.totleplan{
  height: calc(100vh - 130px);
}
.totleplan .el-scrollbar__wrap {
  overflow-x: hidden;
}
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
