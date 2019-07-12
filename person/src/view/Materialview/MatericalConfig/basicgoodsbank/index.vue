<template>
  <div>
    <div class="toptext">基础物资库列表</div>
    <el-form :model="basicform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item>
        <el-form-item prop="mtype" label="物资类别：">
              <el-select v-model="basicform.mtype" style="width:200px">
                  <el-option v-for="(item,index) in typeoption" :key="index" :value="item.id" :label="item.materials"></el-option>
              </el-select>
          </el-form-item>
      </el-form-item>
      <el-form-item>
        <span>物资名称：</span><el-input v-model="basicform.mname"  style="width:200px;" placeholder="请输入物资名称"></el-input>
      </el-form-item>
      <el-form-item>
        <span>物资编码：</span><el-input v-model="basicform.mcode" style="width:200px;" placeholder="请输入物资编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="addfile" type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="applyData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column type="index" width="100" label="序号"></el-table-column>      
      <el-table-column label="物资名称" >
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.mname }}</div>
            <div class="boxInput">{{ scope.row.mname }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="物资类别" prop="mtypeName" sortable></el-table-column>
      <el-table-column label="物品单位">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.munit }}</div>
            <div class="boxInput">{{ scope.row.munit }}</div>
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
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
           <el-button  type="text"  style="color:#F56C6C" icon="el-icon-delete-solid" @click="storedelete(scope.row.id)">删除</el-button>
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
      personoption:[],
      currentPage: 1,
      itemnum:12,
      totalnum:1,
      basicform: {
        mtype:'',
        mname: '',
        model:'',
        mcode:'',
      },
      applyData: [],
      typeoption:[],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        mtype:this.basicform.mtype,
        mname:this.basicform.mname,
        model:this.basicform.model,
        mcode:this.basicform.mcode,
      }
      this.$http.get(material.mmaterials,{params:data}).then(res=>{
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
      this.$router.push({path:'/materialmanage/dobasic'});
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
    // 删除
    storedelete(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(material.mmaterialsdelete,{params:{id:id}}).then(res=>{
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
    materialtype(){
        this.$http.get(material.materialselect).then(res=>{
            this.typeoption=res.data.list
        })
    }
  },
  mounted(){
    this.materialtype();
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
