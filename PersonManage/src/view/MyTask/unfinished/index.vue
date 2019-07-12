<template>
  <div class="undidhome">
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline">
      <el-form-item>
        <span>编号：</span> <el-input v-model="undidsearch.ywlc" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button>导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="undidData" border :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column type="index" label="编号" width="100"></el-table-column>
      <el-table-column prop="name" label="标题"></el-table-column>
      <el-table-column prop="date" label="达到时间" sortable></el-table-column>
      <el-table-column prop="flow" label="流程"></el-table-column>
      <el-table-column prop="processDefinitionId" label="环节" :formatter="formatter"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
            <!-- <router-link to="/project/taskdealwidth"> -->
            <router-link to>
            <el-button  style="color:#E6A23C" type="text" size="small"><i class="iconfont icon-do"></i> 处理</el-button>
            </router-link>
            <!-- :to="{path:'/project/UnFinisheddetail?id='+scope.row.id}" -->
            <router-link to>
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
      modelform: {
        name: ""
      },
      undidData: [
        {
          businessKey: "366093996195840",
          name: "请假流程-临远-2019-03-20 09:22",
          flow: "印章申请",
          processDefinitionId: "请假流程",
          startTime: "2019-03-20 09:22:01",
          endtime: "2019-03-20 17:53:39",
          lengthtime: "37分33秒",
          status: 1,
          id: 11
        },
        {
          businessKey: "364979951697920",
          name: "资产申请-临远-2019-03-19 14:28",
          flow: "资产申请",
          processDefinitionId: "资产申请",
          startTime: "2019-03-20 09:22:01",
          endtime: "2019-03-20 17:53:39",
          lengthtime: "4时33分39秒",
          status: 2,
          id: 12
        }
      ]
    };
  },
  methods: {
    formatter(){},
    searchSubmit() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 导出
    export() {},
    linksubmit() {
      this.transpond = false;
    }
  }
};
</script>

<style>
.undidhome {
  width: 90%;
  margin: 20px auto;
}
</style>
