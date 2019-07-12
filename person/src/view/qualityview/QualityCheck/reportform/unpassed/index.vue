<template>
  <div>
    <p class="toptext">存在问题的质量检查列表</p>
     <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item prop="loc">
         <span>整改位置：</span> <el-input v-model="sousou.loc" style="width:280px;"></el-input>
      </el-form-item>
      <el-form-item prop="chkMan" style="margin-left:30px;">
            <span>实际检查人：</span>  <el-select v-model="sousou.chkMan">
                  <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                  </el-option>
              </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
   <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
        <el-table-column label="整改日期" prop="cmtDate">
           <template slot-scope="scope">
          {{scope.row.cmtDate | formatDate}}
        </template>
        </el-table-column>
        <el-table-column label="实际检查人" prop="chkManName" width="100"></el-table-column>
        <el-table-column label="整改位置" width="120">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.chkArea }}</div>
              <div class="boxInput">{{ scope.row.chkArea }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="照片文件" prop="chkFile" width="120">
          <template slot-scope="scope">
            <img :src='"/api/took/user_get_photo?fileName="+scope.row.chkFile' :onerror='imgsrc' style="width:80px;height:50px"/>
          </template>
        </el-table-column>
        <el-table-column label="整改审核人" prop="dirManName" width="150"></el-table-column>
         <el-table-column label="审核状态" prop="stateName" sortable ></el-table-column>        
         <el-table-column label="检查真实情况内容">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.chkReal }}</div>
              <div class="boxInput">{{ scope.row.chkReal }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="纠正预防措施" width="180" fixed="right">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.chkRectify }}</div>
              <div class="boxInput">{{ scope.row.chkRectify }}</div>
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
import *  as qualitymanage from '@/api/qualityapi.js'
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
      imgsrc:'this.src="' + require('@/assets/images/waiting.jpg') + '"',
      statusoption:[],
      hiddentypeoption:[],
      zoneoption:[],
      currentPage: 1,
      itemnum:15,
      totalnum:1,
      sousou: {
        chkMan:'',
        loc:'',
      },
      hiddenpageData: [],
      personoption:[],
    };
  },
  methods: {
    verifier(id){
      this.$router.push('/qualitymanage/verifier?id='+id);
    },
    modifyfile(id){
      this.$router.push('/qualitymanage/rectifyapplayadd?id='+id);
    },
    dataAll(){
      let data = {
        page:this.currentPage,
        num:this.itemnum,
        state:1,
        chkMan:this.sousou.chkMan,
        loc:this.sousou.loc
      }
        this.$http.get(qualitymanage.qualityceckapplay,{params:data}).then(res=>{
          this.hiddenpageData = res.data.list
          this.totalnum = res.data.count;
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.dataAll()
    },
    sousoubtn(){
      this.dataAll()
    },
    addfile(){
      this.$router.push('/qualitymanage/rectifyapplayadd?id=0')
    },
    uploadperson(){
          this.$http.get(dictapi.user).then(res=>{
              // console.log(res);
              this.personoption=res.data.list;
          })
      },
  },
  mounted(){
    this.dataAll();
    this.uploadperson()
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