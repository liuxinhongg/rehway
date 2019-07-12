<template>
  <div>
    <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
           <el-form-item prop="auditMan" label="检查项：">
                  <el-input v-model="sousou.chkItem"></el-input>
            </el-form-item>
            <el-form-item prop="id" label="编号：">
                  <el-input v-model="sousou.id"></el-input>
            </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="addfile">+ 新增项目标准</el-button>
      </el-form-item>
    </el-form>
     <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
        <el-table-column label="编号" prop="id" width="100"></el-table-column>
        <el-table-column label="检查项" prop="chkItem"> </el-table-column>
        <el-table-column label="检查标准具体项" prop="chkStd" ></el-table-column>
        <el-table-column label="标准数据值" width="120" prop="stdVal"></el-table-column>
        <el-table-column label="标准数据单位" prop="stdUnit" >
        </el-table-column>
        <el-table-column label="测量工具" prop="mtool" ></el-table-column>
         <el-table-column label="测试取点个数" prop="mnum"  ></el-table-column>        
         <el-table-column label="测量方法" prop="mway"  ></el-table-column>        
        <el-table-column label="操作" width="90" fixed="right">
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
        chkItem:'',
        id:'',
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
      this.$router.push('/qualitymanage/standardadd?id='+id);
    },
    dataAll(){
      let data = {
        page:this.currentPage,
        num:this.itemnum,
        chkItem:this.sousou.chkItem,
        id:this.sousou.id
      }
        this.$http.get(qualitymanage.prostandardselectBy,{params:data}).then(res=>{
          this.totalnum = res.data.count;
          this.hiddenpageData = res.data.list
          this.personoption = res.data.list
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.dataAll();
    },
    sousoubtn(){
      this.dataAll();
    },
    addfile(){
      this.$router.push('/qualitymanage/standardadd?id=0')
    },
    uploadperson(){
          this.$http.get(dictapi.user).then(res=>{
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
<style>
</style>