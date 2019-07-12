<template>
  <div class="wrapper">
    <el-table :data="tableData" border style="width: 100%;margin:50px 0px;" :row-class-name="tableRowClassName">
      <el-table-column prop="idCardNumber" label="账号" width="250"></el-table-column>
      <el-table-column prop="workerName" label="真实姓名" width="280"></el-table-column>
      <el-table-column prop="idCardNumber" label="身份证号" width="350"></el-table-column>
      <el-table-column prop="stateType" label="状态" width="280"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          username: "王小虎",
          c_id:'610523199802123325',
          date:'2019-04-01'
        },
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
      tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id
    this.$http.get('/api/user/user_select_id',{params:{workerId:this.id}}).then(res=>{
      // console.log(res)
      this.tableData = res.data.user;
      // console.log(this.tableData)
    })
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
}
</style>
