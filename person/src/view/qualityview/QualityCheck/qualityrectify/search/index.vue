<template>
  <div>
    <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item prop="planId" >
         <span>检查计划：</span> <el-select v-model="sousou.planId" style="width:280px" >
              <el-option v-for="(item,index) in hiddendata" :key="index" :value="item.id" :label="item.prjIdName"> 
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item prop="state" style="margin-left:20px;">
        <span>检查状态：</span>
          <el-select v-model="sousou.state">
              <el-option value="0" label="审核通过"> </el-option>
              <el-option value="1" label="整改过程"> </el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column label="检查日期" prop="chkDate" >
        <template slot-scope="scope">
          {{scope.row.chkDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="实际检查人" prop="chkManName" sortable></el-table-column>
      <el-table-column label="检查内容" >
         <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.chkReal }}</div>
            <div class="boxInput">{{ scope.row.chkReal }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="纠正预防措施">
          <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.chkRectify }}</div>
            <div class="boxInput">{{ scope.row.chkRectify }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
       <el-table-column label="照片文件" prop="chkFile"  >
        <template slot-scope="scope">
          <img :src='"/api/took/user_get_photo?fileName="+scope.row.chkFile1' :onerror='imgsrc' style="width:100px;height:50px"/>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" prop="stateType" ></el-table-column>
      <el-table-column label="申请状态" prop="applicantType" ></el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyfile(scope.row.id)">编辑</el-button>
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
import *  as qualitymanage from '@/api/qualityapi.js'
import formatDate from '@/filter/date.js';
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
      imgsrc:'this.src="' + require('@/assets/images/waiting.jpg') + '"',
      statusoption:[],
      hiddentypeoption:[],
      zoneoption:[],
      currentPage: 1,
      itemnum:8,
      totalnum:1,
      sousou: {
        planId:'',
        state:'',
      },
      hiddenpageData: [],
      personoption:[],
      hiddendata:[],
          };
  },
  methods: {
    modifyfile(id){
      this.$router.push('/qualitymanage/projectdocheck?id='+id);
    },
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        planId:this.sousou.planId,
        state:this.sousou.state
      }
      this.$http.get(qualitymanage.qualityselectBy,{params:data}).then(res=>{
        console.log(res);
          this.totalnum = res.data.count;
        this.hiddenpageData=res.data.list;
      })
    },
    // 新增
    addfile(){
      this.$router.push({path:'/saftmanage/addhidden?id=0'});
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
    //隐患类型
    hiddentypedata(){
        this.$http.post('/api/dict/rist_type').then(res=>{
            this.hiddentypeoption=res.data.list;
        })
    },
    statusdata(){
        this.$http.post('/api/dict/rist_danger_state').then(res=>{
            this.statusoption=res.data;
        })
    },
    // 隐患区域
    zonedata(){
        this.$http.post('/api/location/selectBytitle?name=').then(res=>{
            this.zoneoption=res.data.result;
        })
    },
      uploadperson(){
          this.$http.get(dictapi.user).then(res=>{
              // console.log(res);
              this.personoption=res.data.list;
          })
      },
  },
  mounted(){
    this.$http.get(qualitymanage.checkplan).then(res=>{
            this.hiddendata=res.data.list;
        })
    this.statusdata();
    this.hiddentypedata();
    // this.zonedata();
    this.dataAll();
    this.uploadperson();
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
