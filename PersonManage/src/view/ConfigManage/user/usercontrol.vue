// 配置管理 用户控件

<template>
  <div class="usercontrol">
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline" style="margin-top:20px;" @submit.native.prevent>
      <el-form-item label="名称：" >
        <el-input v-model="undidsearch.ywlc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="searchSubmit" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <!-- <router-link to="/project/setpermission">
          <el-button>新建</el-button>
        </router-link> -->
        <el-button>导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="form" border class="unfindTable" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="user" label="账号" width="120"></el-table-column>
      <el-table-column prop="pass" label="密码"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="jurisdiction" label="权限"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <router-link to="/project/setpermission">
            <el-button type="text" size="small">设置权限</el-button>
          </router-link>
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

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      currentPage: 1,
      undidsearch: {
        ywlc: ""
      },
      form: [
        {
          user: "zhangsan",
          pass: "123123",
          status: true,
          jurisdiction: "普通用户"
        },
        {
          user: "lisi",
          pass: "112553",
          status: false,
          jurisdiction: "普通用户"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    searchSubmit() {}
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.usercontrol {
  width: 100%;
  margin: 0 auto;
}
</style>
