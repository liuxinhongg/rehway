/*
*  安全制度
 */
<template>
  <div>
    <el-form class="searchTop" :inline="true"  @submit.native.prevent>
      <el-form-item label="制度标题：">
        <el-input v-model="title" style="width:250px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="searchsystem" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="sendAd" >+添加制度</el-button>
        <el-button  @click="exportexcel" >导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="adverData" border style="width: 90%;margin:0 auto;">
      <el-table-column prop="id" label="编号" width="120"></el-table-column>
      <el-table-column prop="workerName" label="发布人" sortable width="150"></el-table-column>
      <el-table-column label="发布时间" width="240">
        <template slot-scope="scope">{{scope.row.issueDate | formatDate}}</template>
      </el-table-column>
      <el-table-column label="制度标题" width="300">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.title }}</div>
            <div class="boxInput">{{ scope.row.title }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="制度文件" >
        <template slot-scope="scope">
          <a :href="'/api/took/user_get_photo?fileName='+scope.row.filename">{{scope.row.fileName }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="modify(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemsize"
        layout="prev, pager, next, jumper"
        :total="totlenum"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import * as security from '@/api/security.js'
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
      totlenum:1,
      itemsize:12,
      currentPage: 1,
      searchId:'',
      title:'',
      visiblecheck: false,
      adverData: [{
        id:'1',
        issuser:'11',
        date:1535465654,
        titleName:'ffafsdef',
        con:'34456',
        detailsType:'1.php'
      }],
    };
  },
  methods: {
    modify(id){
      this.$router.push({path:'/saftmanage/saftsystemadd?id='+id})
    },
    sendAd() {
      this.$router.push({path:'/saftmanage/saftsystemadd?id=0'})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.DataAll();
    },
    // 表格导出
    exportexcel(){},
    // 所以的列表数据
    DataAll() {
      let data={
        page:this.currentPage,
        num:this.itemsize,
        title:this.title,
      }
      this.$http.get(security.riskissueselectBy,{params:data}).then(res => {
        console.log(res);
        this.adverData = res.data.list;
        let leng = res.data.count;
         this.totlenum = leng;
      });
    },
    // 根据条件搜索
    searchsystem() {
      this.DataAll();
    },
  },
  mounted() {
    this.DataAll();
  }
};
</script>
<style lang="scss">
.sendAd {
  margin: 10px 20px;
}
.searchTop {
  width: 90%;
  margin: auto;
}
.boxInput {
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
</style>