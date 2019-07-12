/*查询工人工资 */ 
<template>
  <div class="searchsalary">
    <p class="persontop">工资发放列表</p>
    <el-form :inline="true" :model="searchform" class="listseach" @submit.native.prevent style="margin-top:15px;">
      <el-form-item>
        <span>发放日期：</span> <el-date-picker v-model="searchform.payMonthTime" type="date" style="width:200px;" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp"></el-date-picker>
      </el-form-item>
      <el-form-item label="班组：">
        <el-select v-model="searchform.teamNo" style="width:220px;">
          <el-option v-for="(item,index) in team_info" :key="index" :value="item.teamId" :label="item.teamName"></el-option>
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
        <el-table-column prop="teamName" label="班组名称" sortable></el-table-column>
        <el-table-column prop="payMonthTime" label="发放月份" >
          <template slot-scope="scope">{{scope.row.payMonthTime | formatDate}}</template>
        </el-table-column>
        <!-- payRollBankCardNumber -->
        <el-table-column prop="corpCode" label="分包企业信用码"></el-table-column>
        <el-table-column label="企业名称" sortable>
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.corpName }}</div>
              <div class="boxInput">{{ scope.row.corpName }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- fileInfo -->
        <el-table-column  label="工资附件" >
          <template slot-scope="scope">
            <p  v-if="scope.row.fileInfo.length>0" v-for="(item,index) in JSON.parse(scope.row.fileInfo)" :key="index">
              <!-- <a :key="index" :href="'/api/'"></a> -->
              <a v-for="(itemone,index) in item.fileInfo" :key="index" :href="'/api/took/user_get_photo?fileName='+itemone.location">{{itemone.fileName }}</a>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="deleteClick(scope.row.id)" type="text" size="small" >编辑</el-button>
            <el-button @click="deletesalary(scope.row.id)" type="text" size="small">工资明细</el-button>
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
import formatDate from '@/filter/date.js';
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {},
  props: {},
  data() {
    return {
      itemnum: 16,
      currentPage: 1,
      pagecount: 1,
      team_info:[],
      searchform: {
        payMonthTime:'',
        teamNo:'',
        baseId:'',
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
      this.$router.push({ path: "/project/addsalary?id="+id});
    },
    // 工资明细
    deletesalary(id){
      this.$router.push('/project/searchsalarydetail?id='+id);
    },
    //按条件搜索内容
    search() {
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
        baseId:this.searchform.baseId,
        payMonthTime:this.searchform.payMonthTime,
        teamNo:this.searchform.teamNo,
      };
      this.$http.get('/api/pay/base/select_by_id',{params:data}).then(res=>{
        console.log(res);
        let salaryarray=[];
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
      this.team_info=res.data.list
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
