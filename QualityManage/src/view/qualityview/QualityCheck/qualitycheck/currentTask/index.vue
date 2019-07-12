<template>
  <div>
    <el-form :model="currentform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item label="问题状态：" >
          <el-select v-model="currentform.state">
              <el-option v-for="(item,index) in statusoption" :key="index" :value="item.type" :label="item.label"> 
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="检查人：" style="margin-left:30px;">
          <el-select v-model="currentform.chkMan">
              <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="currentData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column label="检查编码" prop="id" width="100"></el-table-column>
      <el-table-column label="检查人" prop="chkManName" width="100"></el-table-column>
      <el-table-column label="检查区域" width="220">
         <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.chkArea }}</div>
            <div class="boxInput">{{ scope.row.chkArea }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="负责人" prop="dirManName" width="120"></el-table-column>
      <el-table-column label="状态"  width="150">
        <template slot-scope="scope">
          {{scope.row.state==0 ? '没有问题' : '有问题' }}
        </template>
      </el-table-column>
      <el-table-column label="附件照片" width="200">
        <template slot-scope="scope">
          <img :src="'/api/took/user_get_photo?fileName='+scope.row.chkFile" :onerror="errorImg" style="width:80px;height:50px;">
        </template>
      </el-table-column>
      <el-table-column label="纠正预防措施" width="200">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.chkRectify }}</div>
            <div class="boxInput">{{ scope.row.chkRectify }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="检查真实情况内容" width="200">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.chkReal }}</div>
            <div class="boxInput">{{ scope.row.chkReal }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
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
import formatDate from '@/filter/date.js';
import * as qualitymanage from '@/api/qualityapi.js'
import * as dictapi from '@/api/dictapi.js'
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      errorImg:'this.src="' + require('@/assets/images/waiting.jpg') + '"',
      personoption:[],
      statusoption:[
        {label:'有问题',type:'1'},
        {label:'没问题',type:'0'}
      ],
      currentPage: 1,
      itemnum:8,
      totalnum:1,
      currentform: {
        state:'',
        id:'',
        chkMan:'',
      },
      currentData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        state:this.currentform.state,
        chkMan:this.currentform.chkMan,
        id:this.currentform.id,
      }
      console.log(data);
      this.$http.get(qualitymanage.chktoday,{params:data}).then(res=>{
        console.log(res);
        this.currentData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    // 表格中的修改
    modifyfile(id){
      this.$router.push({path:'/qualitymanage/modifycurrentTask?id='+id});
    },
    sousoubtn() {
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
    //负责人
    persontypedata(){
      this.$http.get(dictapi.user).then(res=>{
        console.log(res);
          this.personoption=res.data.list;
      })
    },
  },
  mounted(){
    this.persontypedata();
    this.dataAll();
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
