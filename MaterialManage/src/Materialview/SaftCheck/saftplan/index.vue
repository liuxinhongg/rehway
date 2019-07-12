<template>
  <div>
    <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item label="计划主题：">
        <el-input v-model="planform.title" ></el-input>
      </el-form-item>
      <el-form-item label="计划日期：">
        <el-date-picker v-model="planform.time" type="datetime" placeholder="选择日期" ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="addfile"  type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="adverData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column label="计划编号" prop="id" width="120"></el-table-column>
      <el-table-column label="计划制定者" prop="workerName"></el-table-column>
      <el-table-column label="计划日期" prop="watchnum" >
          <template slot-scope="scope">{{ scope.row.planDate | formatDate }} </template>
      </el-table-column>
      <el-table-column label="计划主题">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.title }}</div>
            <div class="boxInput">{{ scope.row.title }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="是否执行" >
          <template slot-scope="scope">{{ scope.row.ifExec == 0 ? "否" : "是"}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" :disabled="scope.row.ifExec === 1" @click="execute(scope.row.id)">确定执行</el-button>
          <el-button type="text" @click="modify(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemnum"
        layout="prev, pager, next, jumper"
        :total="totalnum"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import formatDate from '@/filter/date.js';
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      currentPage: 1,
      itemnum:12,
      totalnum:1,
      planform: {
        title:'',
        time: '',
      },
      adverData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        title:this.planform.title,
        time:this.planform.time,
      }
      this.$http.get('/api/risk_plan/selectBy',{params:data}).then(res=>{
        console.log(res);
        this.adverData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    // 添加计划
    addfile(){
      this.$router.push({path:'/saftmanage/addsaftplan?id=0'});
    },
    // 根据条件搜索
    plansearch() {
      this.dataAll();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.dataAll();
    },
    // 列表的执行确定按钮
    execute(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/risk_plan/finsh?id='+id).then(res=>{
          console.log(res);
          if(res.data.result='success'){
            this.dataAll();
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 列表的修改
    modify(id){
      this.$router.push({path:'/saftmanage/addsaftplan?id='+id});
    },
  },
  mounted(){
    this.dataAll();
  }
};
</script>
<style lang="scss">
  .searchfrom {
    width: 90%;
    margin: auto;
    margin-top: 20px;
  }
.fileupload {
  width: 90%;
  margin: 10px auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.boxInput {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
