/*********************************************
 * @function: 文件管理---回收站
 * @filename: 刘新红 
 * @Date: 2019-03-19 
 *********************************************/
<template>
  <div>
    <div class="searchTop">
      <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
        <el-form-item >
         <span>文件编号：</span> <el-input v-model="sousou.code" placeholder="请输入文件编号" style="width:250px;margin-right:20px;"></el-input>
        </el-form-item>
        <el-form-item >
          <span>文件名称：</span> <el-input v-model="sousou.fileName" placeholder="请输入文件名称" style="width:250px;margin-right:20px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="sousoubtn">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="multipleTable" :data="adverData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column label="编号" type="index" width="100"></el-table-column>
      <!-- <el-table-column label="文件编码" prop="code" ></el-table-column> -->
      <el-table-column label="发布人" prop="issuser" width="200" sortable></el-table-column>
      <el-table-column label="文件名称" prop="fileName" >
        <template slot-scope="scope">
          <a :href="'/api/took/user_get_photo?fileName='+scope.row.address">{{scope.row.fileName }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="size"  label="大小" show-overflow-tooltip  width="200" sortable></el-table-column>
      <el-table-column label="日期">
        <template slot-scope="scope">{{ scope.row.date | formatDate}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="danger" style="padding: 5px;" size="mini" icon="el-icon-delete" @click="deletefile(scope.row.id)">删除</el-button>
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
      currentPage: 1,
      itemnum:10,
      totalnum:1,
      // 搜索输入框的变量
      sousou: {
        fileName: "",
        code:'',
        id:''
      },
      adverData: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    sousoubtn() {
      this.removedata();
    },
    // 删除
    deletefile(id) {
      this.$confirm('确定要移除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/file/delete?id='+id).then(res=>{
          console.log(res);
          if(res.data.result="success"){
            if(res.data.result="success"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.removedata();
            }
          }else{
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
          
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.removedata();
    },
    removedata(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        id:this.sousou.id,
        code:this.sousou.code,
        fileName:this.sousou.fileName,
      }
      this.$http.get('/api/file/selectREBy',{params:data}).then(res=>{
        console.log(res);
        this.adverData=res.data.list;
        this.totalnum=res.data.count;
      })
    }
  },
  mounted(){
    this.removedata();
  }
};
</script>
<style lang="scss">
.searchfrom {
  width: 90%;
  margin: 10px auto;
}
.fileupload {
  width: 90%;
  margin: auto;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
