/*
 * @Author: 谢莹
 * @Date: 2019-05-07 10:53:27 
 * @funtion 需求查询
 */
<template>
  <div>
    <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item label="项目：">
        <el-select v-model="planform.prjId">
          <el-option
            v-for="(item,index) in categoryoption"
            :key="index"
            :label="item.builderLicensesName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item prop="cmtMan" label="提交人">
              <el-select v-model="planform.cmtMan">
                  <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                  </el-option>
              </el-select>
          </el-form-item>
      <!-- <el-form-item label="状态：">
        <el-select v-model="planform.state">
          <el-option
            v-for="(item,index) in stateoption"
            :key="index"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button @click="addfile"  type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="needData" tooltip-effect="dark" border style="width: 90%;margin:auto;" >
      <el-table-column type="index" width="80" label="序号"></el-table-column>      
      <el-table-column label="计划编号" sortable prop="mrid" width="200"></el-table-column>
      <el-table-column label="计划名称" sortable prop="mrName"></el-table-column>
      <el-table-column label="项目名称" sortable prop="prjIdName"></el-table-column>
      <el-table-column label="提交人" sortable prop="cmtManName" width="120"></el-table-column>
      <el-table-column label="物资金额合计" sortable prop="msum"></el-table-column>
      <el-table-column label="状态" sortable>
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
      <!-- <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="modify(scope.row.mrid)"> <i class="iconfont icon-edit"></i>编辑</el-button>
          <el-button type="text" @click="modi(scope.row.mrid)" icon="el-icon-info">详情</el-button>
        </template>
      </el-table-column> -->
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
        cmtMan: "",
        prjId: "",
      },
      needData: [],
      stateoption: [
        { name: "审批中", type: "0" },
        { name: "审批通过", type: "1" },
        { name: "审批失败", type: "2" }
      ],
      personoption:[],
    };
  },
  methods: {
    //获取全部的数据
    dataAll() {
      let data = {
        page: this.currentPage,
        num: this.itemnum,
        cmtMan: this.planform.cmtMan,
        prjId: this.planform.prjId,
      };
      this.$http.get(material.mrequireselect, { params: data }).then(res => {
        console.log(res);
        this.needData = res.data.list;
        this.modeloption=res.data.list;
        this.totalnum = res.data.count;
      });
    },
    // 添加计划
    addfile() {
      this.$router.push({ path: "/materialmanage/doneedplan?id=0" });
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
      this.$router.push({ path: "/materialmanage/doneedplan?id=" + id });
    },
    //详情
    modi(id){
      this.$router.push({ path: "/materialmanage/doneedplandata?id=" + id });
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
     uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
              console.log(res);
              this.personoption=res.data.list;
            })
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
    this.uploadperson()
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
