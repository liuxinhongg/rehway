/*********************************************
 * @function: 公告管理---发布功能
 * @Author: 刘新红 
 * @Date: 2019-03-08 10:34:13 
 *********************************************/
<template>
  <div>
    <el-form :inline="true" :model="newsform" class="searchTop" @submit.native.prevent>
      <el-form-item label="标题：" >
        <el-input placeholder="请输入标题" v-model="newsform.title" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="发布时间：">
        <el-date-picker v-model="newsform.date" type="datetime" placeholder="选择日期" format="yyyy-MM-dd hh:mm:ss" value-format="timestamp" style="width:200px;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" native-type="submit" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
          <el-button style="margin:-13px 0px"  @click='addnew()'>+添加</el-button>
          <el-button style="margin:-13px 0px"><a :href="'/api/news/selectDetailByID_?id='+newsform.id+'&title='+newsform.title+'&date='+newsform.date">导出</a></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="adverData" border style="width: 90%;margin:0 auto;">
      <el-table-column type="index" width="100" label="序号"></el-table-column>      
      <el-table-column prop="issuer" label="发布者" width="300" sortable></el-table-column>
      <el-table-column label="新闻标题" width="300">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.title }}</div>
            <div class="boxInput">{{ scope.row.title }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="发布时间" width="300">
        <template slot-scope="scope">{{scope.row.date | formatDate}} </template>
      </el-table-column>
      <el-table-column label="新闻附件" >
        <template slot-scope="scope">
          <a :href="'/api/took/user_get_photo?fileName='+scope.row.filepath">{{ scope.row.fileName =='' ? '暂无附件' : scope.row.fileName }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="deletehanle(scope.row.id)">删除</el-button>
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
        :total="pagecount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import formatDate from '@/filter/date.js';
import * as personmanage from '@/api/personmanage'
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      newsform:{
        id:'',
        title:'',
        date:'',
      },
      currentPage:1,
      itemnum:12,
      pagecount:1,
      // 搜索输入框的变量
      InputAuthor: "",
      adverData: [],
    };
  },
  methods: {
    deletehanle(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(personmanage.deletenew,{ params:{id:id} }).then(res=>{this.getAll();})
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });          
        });
     
    },
    addnew(){
      console.log(11);
      this.$router.push('/project/newsadd');
    },
    search(){this.getAll()},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getAll();
    },
    getAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        id:this.newsform.id,
        title:this.newsform.title,
        date:this.newsform.date,
      };
      this.$http.get(personmanage.newlist,{ params:data }).then(res=>{
        console.log(res);
        this.adverData=res.data.list;
        let newlength=res.data.count;
        this.pagecount=newlength;
      })
    }
  },
  mounted(){
    this.getAll()
  }
};
</script>
<style lang="scss">
.sendAd {
  margin: 10px 20px;
}
.searchTop {
  width: 90%;
  margin:  auto;
  margin-top: 20px;
  .el-input {
    width: 15%;
    margin-right: 3%;
  }
}
.boxInput {
  cursor: pointer;
  // width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.admanage {
  width: 80%;
  margin: 20px auto;
}
.checkout {
  width: 80%;
  height: auto;
  margin: 10px auto;
  margin-bottom: 20px;
  .chechlist {
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
    font-size: 15px;
    p:nth-child(1) {
      width: 100px;
      color: #5e5e5e;
      font-weight: bold;
    }
    p:nth-child(2) {
      color: #808080;
      font-weight: bold;
    }
  }
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>