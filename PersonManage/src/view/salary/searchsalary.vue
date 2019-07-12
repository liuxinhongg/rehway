/*
*salary   查询工人工资 */ 
<template>
  <div class="searchsalary">
    <el-form :inline="true" :model="form" class="listseach" label-width="100px">
      <el-form-item label="发放月份2：">
        <el-date-picker v-model="form.value4" type="month" placeholder="选择月"></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="是否补发：">
        <el-select v-model="form.address" placeholder="请选择">
          <el-option label="是" value="shanghai"></el-option>
          <el-option label="否" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item  style="float:right">
        <el-button class="btn btn-default a-insert" @click="newbuildpart">+上传工资</el-button>
      </el-form-item>
    </el-form>
    <!-- <div style="margin-bottom:40px;">
      <button class="btn btn-default a-insert" @click="newbuildpart">上传工资</button>
    </div> -->
    <div class="listtable">
      <el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="date" label="姓名" width="125"></el-table-column>
        <el-table-column label="证件号码" width="170">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.province }}</div>
              <div class="boxInput">{{ scope.row.province }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="工人工资卡号" width="200">

        </el-table-column>
        <el-table-column label="工人工资卡开户行名称" width="200" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.address }}</div>
              <div class="boxInput">{{ scope.row.address }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="工资代发开户行名称" width="180" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.address }}</div>
              <div class="boxInput">{{ scope.row.address }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="应发金额" width="120"></el-table-column>
        <el-table-column prop="name" label="实发金额" width="120"></el-table-column>
        <el-table-column prop="name" label="是否补发" width="120"></el-table-column>
        <el-table-column prop="zip" label="发放日期" width="180"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemnum"
        layout="prev, pager, next, jumper"
        :total="pagecount"
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
      itemnum: 8,
      currentPage: 1,
      pagecount: 1,
      form: {
        value4: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      options: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: 615896523632569874,
          city: "普陀区",
          address: "上海市普陀区金518 弄",
          zip: 200333,
          num:6228595632412563325
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          num:6228595632412563325,
          province: 615896523632569874,
          city: "普陀区",
          address: "上海市普陀 弄",
          zip: '2019-05-20'
        },
        {
          date: "2016-05-01",
          province: 615896523632569874,
          num:6228595632412563325,
          name: "王小虎",
          city: "普陀区",
          address: "上海市普519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          province: 615896523632569874,
          name: "王小虎",
          num:6228595632412563325,          
          city: "普陀区",
          address: "上海市 弄",
          zip: 200333
        }
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
    onSubmit() {},
    handleClick(row) {
      console.log(row);
    },
    submitForm() {},
    newbuildpart() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      console.log(`当前页: ${val}`);
      that.currentPage = val;
      let data = {
        page: that.currentPage,
        num: that.itemnum,
        department_id: that.formInline.partID,
        user_name: that.formInline.search_name
      };
    },
    newbuildpart() {
      this.$router.push({ path: "/project/addsalary" });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.searchsalary {
  width: 95%;
  margin: 0 auto;
  padding-top: 20px;
  .boxInput{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
  }
}
</style>
