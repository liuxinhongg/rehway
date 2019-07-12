<template>
  <div class="qualitycheck">
    <el-scrollbar style="height:100%;">
      <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
        <el-form-item>
          <span>保养计划:</span>
            <el-select v-model="sousou.manitId" >
                <el-option v-for="(item,index) in bydetail" :key="index" :value="item.maintId" :label="item.maintIdInfo[0].maintainName"> 
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <span>保养人：</span>
          <el-select v-model="sousou.chkMan" >
              <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
        <el-table-column label="编号" type="index" width="100"></el-table-column>
        <el-table-column label="保养计划名称" prop="maintIdInfo[0].maintainName" sortable></el-table-column>
        <el-table-column label="设备" prop="maintIdInfo[0].devcodeMname" ></el-table-column>
        <el-table-column label="保养人" prop="chkManName"></el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyfile(scope.row.id)"><i class="iconfont icon-edit"></i>编辑</el-button>
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
      personoption:[],
      ProOption:[],
      currentPage: 1,
      itemnum:15,
      totalnum:1,
      sousou: {
        manitId:'',
        chkMan:'',
      },
      bydetail:[],
      hiddenpageData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        chkMan:this.sousou.chkMan,
        manitId:this.sousou.manitId,
      }
      this.$http.get(equipmanage.devmanittodayselectBy,{params:data}).then(res=>{
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
      this.$router.push({path:'/equipmanage/dotodayupkeep?id=0'});
    },
    uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                // console.log(res);
                this.personoption=res.data.list;

            })
        },
    // 表格中的修改
    modifyfile(id){
      this.$router.push({path:'/equipmanage/dotodayupkeep?id='+id});
    },
    sousoubtn() {
      this.dataAll();
    },
    byplan(){
             this.$http.get(equipmanage.devmanittodayselectBy).then(res=>{
                console.log(res);
                this.bydetail=res.data.list;
            })
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
  },
  mounted(){
    this.uploadperson()
    this.byplan();
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
