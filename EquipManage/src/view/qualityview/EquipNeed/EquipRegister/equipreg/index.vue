<template>
  <div class="qualitycheck">
    <p class="persontop">设备注册列表</p>
    <el-scrollbar style="height:100%;">
      <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
        <el-form-item>
          <span>设备类型:</span>
            <el-select v-model="sousou.mtype">
                <el-option v-for="(item,index) in MOption" :key="index" :value="item.id" :label="item.materials"> 
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item >
          <span>是否本单位：</span>
          <el-select v-model="sousou.ifmine">
              <el-option label="本单位" value="0"></el-option>
              <el-option label="租赁" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span>设备名称：</span><el-input v-model="sousou.mname" style="width:200px" placeholder="设备名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button  @click="addfile" type="success">+新增</el-button>
          <el-button><a :href="'/api/quality_plan/selectBy_?proId='+sousou.proId+'&chkArea='+sousou.chkArea">导出</a></el-button>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="equipregData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
        <el-table-column label="编号" type="index" width="100"></el-table-column>
        <el-table-column label="设备唯一编码" width="150">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.devcode }}</div>
              <div class="boxInput">{{ scope.row.devcode }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="设备名称" prop="mname" width="120" sortable></el-table-column>
        <el-table-column label="设备类型" prop="mtypeName" width="120" sortable></el-table-column>
        <el-table-column label="备案时间" width="150">
          <template slot-scope="scope">
            {{scope.row.devBackDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="是否本单位" width="120">
          <template slot-scope="scope"> {{scope.row.ifmine==1?'租赁' :'本单位'}} </template>
        </el-table-column>
        <el-table-column label="设备出场日期" width="150">
          <template slot-scope="scope">
            {{scope.row.devProdDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="设备状态" width="100">
          <template slot-scope="scope"> {{scope.row.devState == 0 ? '正常' :'故障'}} </template>
        </el-table-column>
        <el-table-column label="安装智能读取设备" prop="ifread">
          <template slot-scope="scope"> {{scope.row.ifread==0?'未安装':'已安装'}} </template>
        </el-table-column>
        <el-table-column label="产权单位">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.devRight }}</div>
              <div class="boxInput">{{ scope.row.devRight }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
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
import * as material from '@/api/material.js'
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      MOption:[],
      ProOption:[],
      currentPage: 1,
      itemnum:15,
      totalnum:1,
      sousou: {
        mtype:"",
        ifmine:'',
        mname:'',
      },
      equipregData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        mtype:this.sousou.mtype,
        ifmine:this.sousou.ifmine,
        mname:this.sousou.mname
      }
      this.$http.get(equipmanage.equipreginsert,{params:data}).then(res=>{
        console.log(res);
        this.equipregData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    // 新增
    addfile(){
      this.$router.push({path:'/equipmanage/doequipreg?id=0'});
    },
    // 表格中的修改
    modifyfile(id){
      this.$router.push({path:'/equipmanage/doequipreg?id='+id});
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
    Protype(){
            this.$http.get(material.materialselect).then(res=>{
                console.log(res);
                this.MOption=res.data.list;
            })
        },
    // 检查项目
    // Protype(){
    //   this.$http.get(dictapi.subprj).then(res=>{
    //       // console.log(res);
    //       this.ProOption=res.data.list;
    //   })
    // },
  },
  mounted(){
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
