// 授权管理
<template>
  <div class="superuser">
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="undidsearch.ywlc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <p style="margin:20px 0px">
      <router-link to="/project/superuserdetail">
        <el-button>新建</el-button>
      </router-link>
      <el-button>导出</el-button>
      <el-button>删除</el-button>
    </p>

    <el-table
      ref="multipleTable"
      border
      :data="form"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="code" label="代码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="permType" label="分类"></el-table-column>
      <el-table-column prop="priority" label="排序"></el-table-column>

      <el-table-column label width="120px">
        <template slot-scope="scope">
          <router-link to="/project/superuserdetail">
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
      from:[
        {
          code:'',
          name:'',
          permType:'',
          priority:'',
        }
      ],
      multipleTable: [],
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
    searchSubmit() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.superuser {
  width: 90%;
  margin: 0 auto;
}
</style>
