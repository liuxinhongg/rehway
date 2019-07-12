/*
 * @Author: 谢莹
 * @Date: 2019-05-07 10:53:27 
 * @funtion 出库
 */
<template>
  <div>
    <div class="toptext">材料出库列表</div>
    <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item>
        <span>项目：</span>
          <el-select v-model="planform.prjid" style="width:280px">
              <el-option v-for="(item,index) in categoryoption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <span>领用班组：</span>
        <el-select v-model="planform.teamid" style="width:280px">
            <el-option v-for="(item,index) in banzudetail" :key="index" :value="item.teamId" :label="item.teamName"> 
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span>状态：</span>
        <el-select v-model="planform.state">
            <el-option value="0" label="出库"></el-option>
            <el-option value="1" label="退库"></el-option>
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
      <el-table-column label="项目" prop="prjidName" width="200"></el-table-column>
      <el-table-column label="领用班组" prop="teamidName"></el-table-column>
      <el-table-column label="录入人员" prop="inputidName"></el-table-column>
      <el-table-column label="录入日期">
        <template slot-scope="scope">{{ scope.row.iptDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="prj_id" sortable>
        <template
          slot-scope="scope"
        >{{scope.row.state == 0 ? '出库' : '退库' }}</template>
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
          <el-button type="text" @click="modify(scope.row.moutid)"><i class="iconfont icon-edit"></i> 编辑</el-button>
          <el-button type="text" @click="modidetail(scope.row.moutid)" icon="el-icon-info">详情</el-button>
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
import formatDate  from '@/filter/date.js';
export default {
  filters: {
    formatDate(time) {
      return formatDate(+time, "yyyy-MM-dd hh:mm");
    }
  },

  data() {
    return {
      banzudetail:[],
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
        teamid: "",
        prjid: "",
        state: ""
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
        teamid: this.planform.teamid,
        prjid: this.planform.prjid,
        state: this.planform.state
      };
      this.$http.get(material.moutstockselectBy, { params: data }).then(res => {
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
      this.$router.push({ path: "/materialmanage/materialdoexit?id=0" });
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
    // 列表的修改  modidetail
    modify(id) {
      this.$router.push({ path: "/materialmanage/materialdoexit?id=" + id });
    },
    modidetail(id) {
      this.$router.push({ path: "/materialmanage/materialdetail?id=" + id });
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
     //班组
         banzu(){
             this.$http.get(material.teamteamselectlist).then(res=>{
                //  console.log(res);
                 this.banzudetail = res.data
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
    this.banzu();
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
