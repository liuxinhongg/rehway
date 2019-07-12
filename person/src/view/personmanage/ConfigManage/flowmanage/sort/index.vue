
<template>
  <div class="dispose">
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="undidsearch.ywlc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <!-- <router-link to="/project/disposedetail"> -->
          <el-button type="success"  @click="dialogFormVisible = true">+新建</el-button>
        <!-- </router-link> -->
        <el-button>导出</el-button>
        <!-- <el-button>删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="form" border  class="unfindTable">
      <el-table-column type="index" width="80" label="序号" ></el-table-column>      
      <el-table-column prop="user" label="名称" width="120" sortable></el-table-column>
      <el-table-column prop="num" label="排序" sortable></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
            <router-link to="/project/disposedetail"><el-button  type="text" size="small">查看</el-button></router-link>
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

    <el-dialog title="流程分类" :visible.sync="dialogFormVisible" width='30%'>
      <el-form :model="formdata">
        <el-form-item label="名称">
              <el-input v-model="formdata.name" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="formdata.id" style="width:280px"></el-input>
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
      form: [
        {
          user: "行政",
          num:'1'
        },
        {
          user: "人事",
          num:'2'
        }
      ],
       dialogFormVisible: false,
        formdata: {
          id: 1,
          check: true,
          name: "超级管理员"
        },
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
<style scoped>
  /* .el-dialog{
    width:25% !important;
  } */
</style>
<style>
</style>
