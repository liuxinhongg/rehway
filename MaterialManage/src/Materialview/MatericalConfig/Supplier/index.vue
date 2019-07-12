<template>
  <div>
    <div class="toptext">供应商配置列表</div>
    <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item >
       <span>供应商名称：</span> <el-input v-model="planform.pname" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
       <span>供应商地区：</span> <el-cascader :options="pareaoption" :props="areaprops" v-model="planform.parea" @change="areaChange"></el-cascader>
      </el-form-item>
      <el-form-item>
        <span>供应商负责人：</span><el-input v-model="planform.leader" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="addfile" type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="applyData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column type="index" width="80" label="序号"></el-table-column>
      <el-table-column label="供应商名称" width="200">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.pname }}</div>
            <div class="boxInput">{{ scope.row.pname }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="供应商地区" width="250">
          <template slot-scope="scope"> {{ scope.row.pareaLevel =='' ? '地区为空' : scope.row.pareaLevel.join('-')  }} </template>
      </el-table-column>
      <el-table-column label="供应商企业类型" prop="pcotypeName"></el-table-column>
      <el-table-column label="供应商负责人" prop="leader" width="120"></el-table-column>
      <el-table-column label="负责人电话" prop="telno"></el-table-column>
      <el-table-column label="供应商类别" prop="ptype"  width="120">
        <template slot-scope="scope"> 
            {{ scope.row.ptype == 0 ? '分包类' : scope.row.ptype == 1 ? '材料类' : scope.row.ptype == 2 ? '机械类' : scope.row.ptype == 4 ? '劳务类' : '其他' }} 
        </template>
      </el-table-column>
      <el-table-column label="供应商所属行业" prop="pprof">
          <template slot-scope="scope"> {{ scope.row.pprof == 1 ? '批发零售业' : '建筑业' }} </template>
      </el-table-column>
      <el-table-column label="供应商地址">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.paddr }}</div>
            <div class="boxInput">{{ scope.row.paddr }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
           <el-button type="text" @click="modify(scope.row.pid)"><i class="iconfont icon-edit"></i> 编辑</el-button>
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
import * as material from '@/api/material.js'
import * as dictapi from '@/api/dictapi.js'
export default {
  data() {
    return {
      pareaoption:[],
      currentPage: 1,
      itemnum:12,
      totalnum:1,
      planform: {
        pname:'',
        leader: '',
        parea:[],
        pid:'',
      },
      applyData: [],
      areaprops:{
        label:'name',
        value: 'code',
        children: 'child'
      },
    };
  },
  methods: {
    areaChange(val){
        console.log(val);
        this.planform.parea=val;
        console.log(this.planform.parea[2]);
    },
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        pname:this.planform.pname,
        leader:this.planform.leader,
        parea:this.planform.parea[2],
        pid:this.planform.pid,
      }
      this.$http.get(material.applay,{params:data}).then(res=>{
        console.log(res);
        this.applyData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    // 添加计划
    addfile(){
      this.$router.push({path:'/materialmanage/dosupply?pid=0'});
    },
    // 根据条件搜索
    plansearch() {
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
    // 列表的修改
    modify(id){
      this.$router.push({path:'/materialmanage/dosupply?pid='+id});
    },
    //供应商地区(省)
    region(){
        this.$http.get(dictapi.regioncodelevel).then(res=>{
            console.log(res);
            this.pareaoption=res.data;
        })
    },
  },
  mounted(){
    this.region();
    this.dataAll();
  }
};
</script>
<style lang="scss">
.supplier{
  background: #fff;
  width: 100%;
  height: 100%;
  padding: 50px;
}
// .toptext{
//   width: 100%;
//   font-size: 22px;
//   text-align: center;
//   font-family: '楷体';
// }
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
