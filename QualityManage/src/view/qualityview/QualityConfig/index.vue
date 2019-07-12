<template>
  <div>
    <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
       <el-form-item prop="subprj"  label="分部工程">
        <el-select v-model="sousou.subprj" style="width:280px">
          <el-option
            v-for="(item,index) in locname"
            :key="index"
            :value="item.subprj"
            :label="item.subprj"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button @click="addfile">+新增管理</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="hiddenpageData"
      tooltip-effect="dark"
      border
      style="width: 90%;margin:auto;"
    >
      <el-table-column label="分部工程" prop="subprj" width="200"></el-table-column>
      <el-table-column label="子分部工程" prop="prjs"></el-table-column>
      <el-table-column label="分项工程">
          <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.items }}</div>
            <div class="boxInput">{{ scope.row.items }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="90" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="deletes(scope.row.id)">删除</el-button>
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
import * as qualitymanage from "@/api/qualityapi.js";
import formatDate from "@/filter/date.js";
import * as dictapi from "@/api/dictapi.js";

export default {
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      statusoption: [],
      hiddentypeoption: [],
      zoneoption: [],
      currentPage: 1,
      itemnum: 15,
      totalnum:0,
      sousou: {
        subprj: "",
      },
      hiddenpageData: [],
      personoption: [],
      locname: []
    };
  },
  methods: {
    
    dataAll() {
      let data = {
        page: this.currentPage,
        num: this.itemnum,
        subprj:this.sousou.subprj,
      };
      this.$http
        .get(qualitymanage.qualityconfigselectBy, { params: data })
        .then(res => {
          console.log(res);
          this.totalnum = res.data.count;
          this.hiddenpageData = res.data.list;
        });
    },
    // 新增
    addfile() {
      this.$router.push({ path: "/qualitymanage/qualityconfigadd?id=0" });
    },
    // 表格中的删除
    deletes(id) {
       this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get( "/api/subItem/delete?id=" + id ).then(res=>{
            if(res.data.result=='success'){
                this.$message.success('删除成功~');
                this.dataAll();
            }else if(res.data.result=='error'){
                this.$message.error('删除失败');
            }
          });
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
    sousoubtn() {
      this.dataAll()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.dataAll();
    },
    fenbu(){
      this.$http.post('/api/dict/sun_prj_list').then(res=>{
        this.locname = res.data;
      })
    }
  },
  mounted() {
    this.dataAll();
    this.fenbu();
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
