
<template>
  <div class="menu">
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline" style="margin-top:20px;" @submit.native.prevent >
      <el-form-item label="名称">
        <el-input v-model="undidsearch.ywlc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit"  @click="searchSubmit" type="primary" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <router-link to="/project/menuredact">
          <el-button>+新建</el-button>
        </router-link>
        <el-button>导出</el-button>
        <!-- <el-button>删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="form" border class="unfindTable">
      <el-table-column type="index" width="120" label="序号"></el-table-column>      
      <el-table-column prop="user" label="编码" width="120"></el-table-column>
      <el-table-column prop="classify" label="名称"></el-table-column>
      <el-table-column prop="num" label="URL"></el-table-column>
      <el-table-column prop="whether" label="类型"></el-table-column>
      <el-table-column fixed="right" label="状态" width="100">
        <template slot-scope="scope">
          <router-link to="/project/menuredact">
            <el-button type="text" size="small">编辑</el-button>
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
      form:[
        {
          user:'',
          classify:'',
          num:'',
          whether:'',
        }
      ],
      currentPage: 1,
      undidsearch: {
        ywlc: ""
      }
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
.menu {
  width: 100%;
  margin: 0 auto;
}
</style>
