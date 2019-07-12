<template>
  <div>
    <p class="toptext">安全检查计划列表</p>
    <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item>
        <!-- 后期要加的字段 -->
        <span>计划检查人：</span>
        <el-select v-model="planform.chkMan" style="width:220px">
            <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span>检查主题：</span>
        <el-input v-model="planform.title" style="width:220px" placeholder="检查主题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="addfile" type="success">+  添加</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="adverData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column label="计划编号" prop="id" width="120"></el-table-column>
      <el-table-column label="计划制定者" sortable prop="chkManName"></el-table-column>
      <el-table-column label="计划主题" prop="title"></el-table-column>
      <el-table-column label="计划检查人" prop="chkManName"></el-table-column>
      <el-table-column label="检查类型" sortable prop="chkTypeName"></el-table-column>
      <el-table-column label="开始时间" prop="watchnum" >
          <template slot-scope="scope">{{ scope.row.beginDateTime | formatDate }} </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="watchnum" >
          <template slot-scope="scope">{{ scope.row.endDateTime | formatDate }} </template>
      </el-table-column>
      <el-table-column label="计划检查内容">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.planCont }}</div>
            <div class="boxInput">{{ scope.row.planCont }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button type="text" :disabled="scope.row.ifExec === 1" @click="execute(scope.row.id)">确定执行</el-button> -->
          <el-button type="text" @click="modify(scope.row.id)">编辑</el-button>
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
import * as security from '@/api/security.js'
import * as dictapi from '@/api/dictapi.js'
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
      aqdetail:[],
      wzdata:[],
      personoption:[],
      aqdetail:[],
      currentPage: 1,
      itemnum:12,
      totalnum:1,
      planform: {
        chkMan:'',
        title:'',
      },
      adverData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        chkMan:this.planform.chkMan,
        title:this.planform.title,
      }
      this.$http.get(security.riskplanselectBy,{params:data}).then(res=>{
        console.log(res);
        this.adverData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    aqtype(){
            this.$http.get(dictapi.ristverify).then(res=>{
                console.log(res)
                this.aqdetail = res.data
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
        //标记
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
     uploadperson(){
        this.$http.get(dictapi.user).then(res=>{
            this.personoption=res.data.list;
        })
    },
    locationdata(){
          this.$http.get(security.locationselectAll).then(res=>{
              console.log(res);
            this.wzdata=res.data.list;
            // this.countnum=res.data.count;
        })
    },
     aqtype(){
            this.$http.get(dictapi.ristverify).then(res=>{
                console.log(res)
                this.aqdetail = res.data
            })
        },
  },
  mounted(){
    this.aqtype()
    this.locationdata()
    this.uploadperson()
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
