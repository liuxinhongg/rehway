<template>
  <div class="qualitycheck">
    <el-scrollbar style="height:100%;">
      <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
        <el-form-item>
          <span>运营计划:</span>
             <el-select v-model="sousou.planId" placeholder="请选择" >
            <el-option v-for="(item,index) in yydetail" :key="index" :label="item.bname" :value="item.businessId"></el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <!-- <el-button  @click="addfile" type="success">+新增</el-button> -->
          <el-button><a :href="'/api/quality_plan/selectBy_?proId='+sousou.proId+'&chkArea='+sousou.chkArea">导出</a></el-button>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
        <el-table-column label="编号" type="index" width="100"></el-table-column>
        <el-table-column label="运营项目" prop="planIdInfo[0].prjIdName"></el-table-column>
        <el-table-column label="运营计划名称" prop="planIdInfo[0].bname" sortable></el-table-column>
        <el-table-column label="运营设备数量" prop="planIdInfo[0].devBusinessPlanDetails.length"></el-table-column>
        <el-table-column label="上传人" prop="planIdInfo[0].cmtManName" width="150" sortable></el-table-column>
        <el-table-column label="开始时间" width="150">
          <template slot-scope="scope">
            {{scope.row.planIdInfo[0].beginTimeTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="150">
          <template slot-scope="scope">
            {{scope.row.planIdInfo[0].endTimeTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyfile(scope.row.planId)" ><i class="iconfont icon-edit"></i>详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
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
import  formatDate from '@/filter/date.js';
import * as qualitymanage from '@/api/qualityapi.js'
import * as dictapi from '@/api/dictapi.js'
import * as equipmanage from '@/api/equipmanage.js'

export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      ProOption:[],
      currentPage: 1,
      itemnum:15,
      totalnum:1,
      sousou: {
        planId:'',
        chkArea:'',
        // dateTime:'',
      },
      yydetail:[],
      hiddenpageData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        // chkArea:this.sousou.chkArea,
        // // beginTime:this.sousou.beginTime,
        planId:this.sousou.planId,
      }
      this.$http.get(equipmanage.devbusinessrealselectBy,{params:data}).then(res=>{
        console.log(res);
        this.hiddenpageData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
      
    },
     yydata(){
      this.$http.get(equipmanage.devbusinessplanselectBy).then(res=>{
        // console.log(res);
        this.yydetail = res.data.list;
      })
    },
    // 新增
    addfile(){
      this.$router.push({path:'/qualitymanage/addqualityplan?id=0'});
    },
    // 表格中的详情
    modifyfile(id){
      this.$router.push({path:'/equipmanage/rundetail?id='+id});
    },
    sousoubtn() {
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
    // 检查项目
    Protype(){
      this.$http.get(dictapi.subprj).then(res=>{
          console.log(res);
          this.ProOption=res.data.list;
      })
    },
  },
  mounted(){
    this.yydata()
    this.Protype();
    this.dataAll();
  }
};
</script>
<style lang="scss">
.qualitycheck{
  width:100%;
  height: calc(100vh - 115px);
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
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
