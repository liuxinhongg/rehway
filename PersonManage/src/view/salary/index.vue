/*查询工人工资 */ 
<template>
  <div class="searchsalary">
    <p class="persontop">工资发放列表</p>
    <el-form :inline="true" :model="searchform" class="listseach" @submit.native.prevent style="margin-top:15px;">
      <el-form-item>
        <span>发放日期：</span> <el-date-picker v-model="searchform.balanceDate" type="date" style="width:200px;" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp"></el-date-picker>
      </el-form-item>
      <el-form-item >
        <span>工人身份证号：</span> <el-input v-model="searchform.idCardNumber" style="width:200px;" placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item >
        <span>发放金额：</span> <el-input v-model="searchform.actualAmount" style="width:200px;" placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item >
        <span>是否补发：</span> <el-select v-model="searchform.isBackPay" style="width:200px;" placeholder="是否补发">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="search" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item  style="float:right">
        <el-button type="success" @click="newbuildpart">+新增</el-button>
        <el-button class="btn btn-default a-insert" @click="exportpart">导出</el-button>
      </el-form-item>
    </el-form>
    <div class="listtable">
      <el-table :data="tableData" border style="width: 100%" >
        <el-table-column type="index" label="编号" width="100"></el-table-column>
        <el-table-column label="证件号码" sortable>
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.idCardNumber }}</div>
              <div class="boxInput">{{ scope.row.idCardNumber }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="payRollBankCardNumber" label="工人工资卡号" sortable></el-table-column>
        <el-table-column label="工人工资卡开户行名称" :show-overflow-tooltip="true" width="200">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.payRollBankName }}</div>
              <div class="boxInput">{{ scope.row.payRollBankName }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="工资代发开户行名称" :show-overflow-tooltip="true" sortable width="200">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.payBankName }}</div>
              <div class="boxInput">{{ scope.row.payBankName }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="totalPayAmount" label="应发金额"></el-table-column>
        <el-table-column prop="actualAmount" label="实发金额" sortable></el-table-column>
        <el-table-column prop="isBackPay" label="是否补发" width="120">
          <template slot-scope="scope"> {{scope.row.isBackPay==1 ? "是" : "否"}} </template>
        </el-table-column>
        <el-table-column prop="balanceDate" label="发放日期"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="deleteClick(scope.row.id)" type="text" size="small">删除</el-button>
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
      itemnum: 16,
      currentPage: 1,
      pagecount: 1,
      team_info:[],
      searchform: {
        isBackPay:'',
        actualAmount:'',
        balanceDate: "",
        idCardNumber:'',
        id:''
      },
      tableData: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 导出
    exportpart(){},
    // 删除
    deleteClick(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get("/api/pay/delete?id="+id).then(res=>{
            console.log(res);
            if(res.data.result="error"){
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }else if(res.data.result="success"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.salaryAll();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //按条件搜索内容
    search() {
      console.log(this.searchform.balanceDate);
      this.salaryAll();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.salaryAll();
    },
    salaryAll(){
      let data={
        id:this.searchform.id,
        page:this.currentPage,
        num:this.itemnum,
        idCardNumber:this.searchform.idCardNumber,
        balanceDate:this.searchform.balanceDate,
      };
      this.$http.get('/api/pay/select',{params:data}).then(res=>{
        console.log(res);
        this.tableData=res.data.list;
        let leng=res.data.count
        this.pagecount=leng;
      })
    },
    // 新建工资表
    newbuildpart() {
      this.$router.push({ path: "/project/addsalary?id=0"});
    }
  },
  created() {},
  mounted() {
    this.salaryAll()
    //班组
    this.$http.post('/api/team/team_select_list').then(res=>{
      console.log(res);
      this.team_info=res.data
    });
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.searchsalary {
  width: 95%;
  margin: 0 auto;
  .boxInput{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
  }
}
</style>
