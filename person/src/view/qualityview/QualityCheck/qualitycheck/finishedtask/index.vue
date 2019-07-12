
<template>
  <div>
    <el-form :model="finishform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item>
         <span>任务编码：</span> <el-input v-model="finishform.id" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item prop="state" style="margin-left:20px;">
         <span>问题状态：</span> <el-select v-model="finishform.state" style="width:230px;">
              <el-option v-for="(item,index) in statusoption" :key="index" :value="item.statusId" :label="item.label"> 
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="finishformbtn" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column label="任务编码" prop="id" width="120"></el-table-column>
      <el-table-column label="实际检查人" prop="chkManName" width="200" sortable></el-table-column>
      <el-table-column label="实际检查人" prop="dirManName" width="200"></el-table-column>
      <el-table-column label="检查部位">
         <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.chkArea }}</div>
            <div class="boxInput">{{ scope.row.chkArea }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="riskScore" >
        <template slot-scope="scope">{{ scope.row.state == 0 ? '没有问题' : '有问题' }}</template>
      </el-table-column>
      
      <el-table-column label="描述">
         <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.descri }}</div>
            <div class="boxInput">{{ scope.row.descri }}</div>
          </el-tooltip>
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
import * as qualitymanage from '@/api/qualityapi.js'
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      statusoption:[
        { label:"有问题",statusId:"1" },
        { label:"没问题",statusId:"0" },
      ],
      hiddentypeoption:[],
      zoneoption:[],
      currentPage: 1,
      itemnum:15,
      totalnum:1,
      finishform: {
        chkDate:'',
        state:'',
        id:'',
        planId:'',
      },
      hiddenpageData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        chkdate:this.finishform.chkDate,
        state:this.finishform.state,
        id:this.finishform.id,
        planId:this.finishform.planId,
      }
      this.$http.get(qualitymanage.checkdone,{params:data}).then(res=>{
        console.log(res);
        this.hiddenpageData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    finishformbtn() {
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
