
<template>
  <div class="qualitycheck">
    <p class="persontop">需求列表</p>
    <el-scrollbar style="height:100%;">
      <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
        <el-form-item>
          <span>检查项目:</span>
            <el-select v-model="sousou.prjId" >
                <el-option v-for="(item,index) in ProOption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item >
          <span>填报人：</span>
          <el-select v-model="sousou.cmtMan" >
              <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span>状态：</span>
          <el-select v-model="sousou.state" >
              <el-option value="0" label="审批中"></el-option>
              <el-option value="1" label="审批通过"></el-option>
              <el-option value="2" label="审批未通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button  @click="addplansearch" type="success">+新增</el-button>
          <el-button><a :href="'/api/quality_plan/selectBy_?proId='+sousou.proId+'&chkArea='+sousou.chkArea">导出</a></el-button>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
        <el-table-column label="编号" type="index"></el-table-column>
        <el-table-column label="检查项目" prop="prjIdName" sortable></el-table-column>
        <el-table-column label="设备需求计划名称" prop="planName" ></el-table-column>
        <el-table-column label="填报人" prop="cmtManName"></el-table-column>
        <el-table-column label="状态"  >
          <template slot-scope="scope">
              <p>{{scope.row.state == 0 ?"审批中": scope.row.state == 1 ? "审批通过":"审批未通过"}}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyfile(scope.row.planid)" style="color:#E6A23C;"><i class="iconfont icon-edit"></i>编辑</el-button>
          </template>
        </el-table-column> -->
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
import * as qualitymanage from '@/api/qualityapi.js'
import * as equipmanage from '@/api/equipmanage.js'
import * as dictapi from '@/api/dictapi.js'
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      personoption:[],
      ProOption:[],
      currentPage: 1,
      itemnum:15,
      totalnum:1,
      sousou: {
        prjId:'',
        cmtMan:'',
        state:'',
      },
      hiddenpageData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        cmtMan:this.sousou.cmtMan,
        prjId:this.sousou.prjId,
        state:this.sousou.state,
      }
      this.$http.get(equipmanage.devreqplanselectBy,{params:data}).then(res=>{
        console.log(res);
        this.hiddenpageData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    // 新增
    addplansearch(){
      this.$router.push({path:'/equipmanage/dosearch?id=0'});
    },
    // 表格中的修改
    modifyfile(id){
      this.$router.push({path:'/equipmanage/dosearch?id='+id});
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
    uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                this.personoption=res.data.list;
            })
        },
  },
  mounted(){
    this.uploadperson()
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
