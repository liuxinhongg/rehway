<template>
  <div class="handletask">
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline">
      <el-form-item label="负责人：">
        <el-input v-model="undidsearch.ywlc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button @click="exportexecl()">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="handledata" border :row-class-name="tableRowClassName">
      <el-table-column type="index" label="编号" width="100"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="arriveTime" label="到达时间" sortable></el-table-column>
      <el-table-column prop="flow" label="流程"></el-table-column>
      <el-table-column prop="tache" label="环节"></el-table-column>
      <el-table-column prop="principal" label="负责人" sortable></el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <router-link to>
            <!-- to="/project/handledetail" -->
            <el-button type="text" icon="el-icon-info">详情</el-button> 
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      undidsearch: {
        ywlc: ""
      },
      handledata: [
        {
          title: "吃啥啥不剩，做啥啥不行",
          arriveTime: "2019-03-22",
          flow: "审批流程",
          principal: "王二小",
          tache: "审批流程",
          id: 12
        },
        {
          title: "吃啥啥不剩，做啥啥不行",
          arriveTime: "2019-03-22",
          flow: "请假流程",
          principal: "牛仔",
          tache: "审批流程",
          id: 32
        }
      ]
    };
  },
  methods: {
     tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    exportexecl() {},
    searchSubmit() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.handletask {
  width: 90%;
  margin: 20px auto;
}
</style>
