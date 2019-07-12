<template>
  <div class="qualitycheck">
    <p class="persontop">设备管理列表</p>
    <el-scrollbar style="height:100%;">
      <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
        <el-form-item>
          <span>检查项目:</span>
            <el-select v-model="sousou.prjid" style="width:200px">
                <el-option v-for="(item,index) in ProOption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="chkArea">
          <span>检查部位：</span>
          <el-select v-model="sousou.devLoc" >
              <el-option v-for="(item,index) in localoption" :key="index" :value="item.id" :label="item.locName"> 
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button  @click="addfile" type="success">+新增</el-button>
          <el-button><a :href="'/api/quality_plan/selectBy_?prjId='+sousou.prjid+'&chkArea='+sousou.chkArea">导出</a></el-button>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
        <el-table-column label="编号" type="index" width="100"></el-table-column>
        <el-table-column label="设备" prop="devcodeMname"></el-table-column>
        <el-table-column label="设备所在项目" prop="prjidName"></el-table-column>
        <el-table-column label="检查部位" prop="devLocName" sortable></el-table-column>
        <el-table-column label="提交人" prop="cmtManName"  ></el-table-column>
        <el-table-column label="开始时间"  >
          <template slot-scope="scope">
            {{scope.row.beginDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="到场时间"  >
          <template slot-scope="scope">
            {{scope.row.endDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="离场时间" >
          <template slot-scope="scope">
            {{scope.row.cmtDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyfile(scope.row.id)" ><i class="iconfont icon-edit"></i>编辑</el-button>
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
      ProOption:[],
      currentPage: 1,
      itemnum:15,
      totalnum:1,
      sousou: {
        prjid:'',
        devLoc:'',
        // dateTime:'',
      },
      hiddenpageData: [],
      localoption:[],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        devLoc:this.sousou.devLoc,
        prjid:this.sousou.prjid,
      }
      console.log(data);
      this.$http.get(equipmanage.devmangeselectBy,{params:data}).then(res=>{
        console.log(res);
        this.hiddenpageData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    // 新增
    addfile(){
      this.$router.push({path:'/equipmanage/doequipmanage?id=0'});
    },
    // 表格中的修改
    modifyfile(id){
      this.$router.push({path:'/equipmanage/doequipmanage?id='+id});
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
          // console.log(res);
          this.ProOption=res.data.list;
      })
    },
    modellocaton(){
        this.$http.get(dictapi.location).then(res=>{
            // console.log(res);
            this.localoption=res.data.list;
        })
    },
  },
  mounted(){
    this.modellocaton()
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
