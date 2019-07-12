<template>
  <div class="qualitycheck">
    <el-scrollbar style="height:100%;">
      <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
        <el-form-item>
          <span>保养计划:</span>
            <el-select v-model="sousou.maintId" >
                <el-option v-for="(item,index) in bydetail" :key="index" :value="item.maintId" :label="item.maintIdInfo[0].maintainName"> 
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="chkArea">
          <span>提交人：</span>
          <el-select v-model="sousou.chkMan" >
                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <span>状态：</span>

          <el-select v-model="sousou.chkState" >
                <el-option value="0" label="正常"></el-option>
                <el-option value="1" label="已保养"></el-option>
                <el-option value="2" label="有问题不影响使用"></el-option>
                <el-option value="3" label="影响使用报停"></el-option>
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
        <el-table-column label="保养计划名称" prop="maintIdInfo[0].maintainName"></el-table-column>
        <el-table-column label="提交人" prop="chkManName"></el-table-column>
        <el-table-column label="检查时间" width="150">
          <template slot-scope="scope">
            {{scope.row.chkDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.chkState == 0 ? "正常" : scope.row.chkState == 1 ? "已保养" : scope.row.chkState == 2 ? "发现问题不影响使用" : scope.row.chkState == 3 ? "影响使用设备报停" : "未检查"}}
          </template>
        </el-table-column>
        <el-table-column label="问题描述">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.chkCont }}</div>
              <div class="boxInput">{{ scope.row.chkCont }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyfile(scope.row.chkid)" style="color:#E6A23C;"><i class="iconfont icon-edit"></i>编辑</el-button>
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
      bydetail:[],
      personoption:[],
      ProOption:[],
      currentPage: 1,
      itemnum:15,
      totalnum:1,
      sousou: {
        maintId:'',
        chkMan:'',
        chkState:'',
        // dateTime:'',
      },
      hiddenpageData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        chkMan:this.sousou.chkMan,
        maintId:this.sousou.maintId,
        chkState:this.sousou.chkState
      }
      this.$http.get(equipmanage.devchkhistoryselectBy,{params:data}).then(res=>{
        console.log(res);
        this.hiddenpageData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                this.personoption=res.data.list;

            })
        },
    // 新增
    addfile(){
      this.$router.push({path:'/equipmanage/dohistory?id=0'});
    },
    // 表格中的修改
    modifyfile(id){
      this.$router.push({path:'/equipmanage/dohistory?id='+id});
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
     byplan(){
             this.$http.get(equipmanage.devmanittodayselectBy).then(res=>{
                console.log(res);
                this.bydetail=res.data.list;
            })
        },
  },
  mounted(){
    this.byplan()
    this.uploadperson();
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
