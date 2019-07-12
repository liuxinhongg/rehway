<template>
  <div>
    <div class="toptext">合同配置列表</div>
    <el-form :model="mrepoform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item>
        <span>合同名称：</span>
        <el-input v-model.trim="mrepoform.contract" style="width:200px;" placeholder="请输入合同名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="addfile" type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="packData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column label="合同名称">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.contract }}</div>
            <div class="boxInput">{{ scope.row.contract }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="300">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.remark }}</div>
            <div class="boxInput">{{ scope.row.remark }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button  type="text"  style="color:#F56C6C" icon="el-icon-delete-solid" @click="storedelete(scope.row.code)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemnum"
        layout="prev, pager, next, jumper"
        :total="totalnum"
      ></el-pagination>
    </div>
    <el-dialog title="新增合同" :visible.sync="conVisible" width="30%" center>
        <el-form style="width: 70%;margin: auto;" label-width="100px" :model="htform" >
          <el-form-item label="合同名称：" >
            <el-input v-model.trim="htform.contractname" autocomplete="off" placeholder="请输入合同名称" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="描述：" >
            <el-input v-model.trim="htform.remark" autocomplete="off" type="textarea" :rows="3" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center;" >
            <el-button type="primary" @click="suresub">确定</el-button>
            <el-button @click="conVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>
<script>
import * as material from '@/api/material.js'
import * as dictapi from '@/api/dictapi.js'
export default {
  data() {
    return {
      personoption:[],
      currentPage: 1,
      itemnum:12,
      totalnum:1,
      mrepoform: {
        reponame:'',
        reman: '',
      },
      htform:{
        contractname:'',
        remark:'',
      },
      packData: [],
      conVisible:false,
      edid:0,
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        contract:this.mrepoform.contract,
      }
      this.$http.get('/api/dict/selectContractTypesAll',{params:data}).then(res=>{
        console.log(res);
        this.packData=res.data;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    // 添加计划
    addfile(){
      this.conVisible=true;
      // this.$router.push({path:'/materialmanage/dostorehose?id=0'});
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
    suresub(){
      if(this.htform.contractname==''||this.htform.contractname==null){
        this.$message.error('合同名称不能为空');
      }
      this.$http.get('/api/contract/insert',{params:{contract:this.htform.contractname,remark:this.htform.remark}}).then(res=>{
        console.log(res);
        if(res.data.result=='success'){
          this.$message.success('添加合同成功')
            this.conVisible=false;        
            this.dataAll(); 
            this.htform={};
        }
      })
    },
    // 删除
    storedelete(id){
      console.log(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/api/contract/delete',{params:{code:id}}).then(res=>{
          console.log(res);
          if(res.data.result='success'){
            this.dataAll();
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    uploadperson(){
        this.$http.get(dictapi.user).then(res=>{
            this.personoption=res.data.list;
        })
    },
  },
  mounted(){
    this.dataAll();
    this.uploadperson();
    this.$http.get('/api/dict/selectContractTypesAll').then(res=>{
      console.log(res);
    })
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
