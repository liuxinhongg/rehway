
流程 配置
<template>
  <div class="allocation">
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="undidsearch.ywlc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <router-link to="/project/allocation">
          <el-button>+新建</el-button>
        </router-link>
        <el-button>导出</el-button>
        <!-- <el-button>删除</el-button> -->
      </el-form-item>
    </el-form>
      <el-table :data="form" border class="unfindTable">
        <el-table-column type="index" width="120" label="序号"></el-table-column>      
        <el-table-column prop="user" label="名称" width="120"></el-table-column>
        <el-table-column prop="classify" label="分类"></el-table-column>
        <el-table-column prop="num" label="排序"></el-table-column>
        <el-table-column prop="whether" label="是否配置任务负责人"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <router-link to="/project/allocation"><el-button type="text" size="small">查看</el-button></router-link>
          </template>
        </el-table-column>
      </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="1"
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
      currentPage:1,
      undidsearch: {
        ywlc: ""
      },
      form: [
        {
          user: "资产申请",
          num:'0',
          classify:'行政',
          whether:'是',

        },
        {
          user: "印章申请",
          num:'1',
          classify:'行政',
          whether:'否',
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    searchSubmit() {}
  }
};
</script>

<style>
.demo-form-inline{
    margin-top: 20px
}
.unfindTable{
    width: 100%;
}
</style>
