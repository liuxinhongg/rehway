<template>
  <div class="wrapper">
    <el-table :data="tableData" border style="width: 100%;margin:50px 0px;"  :row-class-name="tableRowClassName">
       <el-table-column label="头像">
          <template slot-scope="scope">
            <!-- <p>{{scope="scope.row.headImage"}}</p> -->
            <img :src="'data:image/jpeg;base64,'+scope.row.headImage" alt="" style="width:45%">
          </template>
        </el-table-column>
      <el-table-column prop="headImageType" label="类型" class="portrait"></el-table-column>
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
    }
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.$http
      .get("/api/user/user_select_id", { params: { workerId: this.id } })
      .then(res => {
        console.log(res);
        this.tableData = res.data.user;
        // console.log(this.tableData)
      });
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.portrait {
  width: 50%;
}
</style>
