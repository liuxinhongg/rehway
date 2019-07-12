/*********************************************
 * @function: 会议查询--添加--修改
 * @Author: 谢莹 
 * @Date: 2019-03-08 10:44:13 
 *********************************************/

<template>
  <div class="meetinglist">
    <p class="persontop" >会议管理列表</p>
    <el-scrollbar style="height:100%;">
      <el-form :inline="true" class="conferenceTop" :model="searchform" @submit.native.prevent>
        <!-- <el-form-item >
          <span>会议编号：</span> <el-input placeholder="会议编号" v-model="searchform.id" style="width:180px;"></el-input>
        </el-form-item> -->
        <el-form-item>
          <span>会议主题：</span> <el-input placeholder="会议主题" v-model="searchform.title" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item >
          <span>会议地址：</span> <el-input placeholder="会议地址" v-model="searchform.address" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item >
          <span>主讲人：</span> <el-input placeholder="主讲人" v-model="searchform.speaker" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="search" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <router-link to="/project/searchinput?id=0">
            <el-button type="success">+添加</el-button>
          </router-link>
          <el-button style=" margin:-13px 0px">导出</el-button>
        </el-form-item>
      </el-form>
      <!-- 列表 -->
      <el-table :data="tableData" border style="width: 90%;margin:0 auto" >
        <el-table-column type="index" label="编号" width="100"></el-table-column>
        <el-table-column label="会议主题" width="200">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.title }}</div>
              <div class="boxInput">{{ scope.row.title }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="compere" label="主讲人" width="120" sortable></el-table-column>
        <el-table-column prop="address" label="会议地点" width="200">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top">
              <div slot="content">{{ scope.row.address }}</div>
              <div class="boxInput">{{ scope.row.address }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="会议人数" width="150" sortable></el-table-column>
        <el-table-column label="开始时间" width="180">
          <template slot-scope="scope">{{scope.row.beginTime | formatDate}}</template>
        </el-table-column>
        <el-table-column label="结束时间" width="180">
          <template slot-scope="scope">{{scope.row.endTime | formatDate}}</template>
        </el-table-column>
        <el-table-column label="会议文件">
          <template slot-scope="scope">
            <el-tooltip trigger="hover" placement="top" v-for="(item,index) in scope.row.fileList" :key="index">
              <div slot="content">{{ item.fileName }}</div>
              <div class="boxInput">
                <a :href="'/api/took/user_get_photo?fileName='+item.location">{{item.fileName }}</a>              
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" style="background:#fff;">
          <template slot-scope="scope">
            <el-button type="text"  @click="handleEdit(scope.row.id)"><i class="iconfont icon-edit"></i> 编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="pageAny" >
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import formatDate from '@/filter/date.js';
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  props: {},
  data() {
    return {
      currentPage:1,
      pageAny:1,
      size:10,
      searchform:{
        speaker:'',
        id:'',
        title:'',
        address:'',
      },
      tableData: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.getAll();
    },
    search(){
      this.getAll();
    },
    handleEdit(id){
      this.$router.push({path:'/project/searchinput?id='+id})
    },
    // 列表的所有数据
    getAll(){
      let data={
        page:this.currentPage,
        num:this.size,
        id:this.searchform.id,
        title:this.searchform.title,
        address:this.searchform.address,
        compre:this.searchform.speaker,
      };
      this.$http.get('/api/meeting/selectAll',{params:data}).then(res=>{
        console.log(res);
        this.tableData=res.data.list;
        let leng=res.data.count;
        this.pageAny=leng;
      })
    }
  },
  created() {},
  mounted() {
    this.getAll();
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.mainmajor {
  padding: 30px;
  flex: 1;
  margin: 0 10px;
}
.meetinglist{
  width: 100%;
  height: calc(100vh - 160px);
}
.conferenceTop {
  width: 90%;
  margin: 0 auto;
}
.boxInput{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.meetinglist .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
