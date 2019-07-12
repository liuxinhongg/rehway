<template>
  <div>
    <p class="toptext">隐患排查列表</p>
    <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item prop="checktype">
         <span>隐患位置：</span> <el-select v-model="sousou.chkLoc" >
              <el-option v-for="(item,index) in zoneoption" :key="index" :value="item.id" :label="item.locName"> 
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item prop="nature" style="margin-left:30px;">
        <span>隐患类型：</span>
          <el-form-item prop="riskType">
              <el-select v-model="sousou.riskType">
                  <el-option v-for="(item,index) in hiddentypeoption" :key="index" :value="item.id" :label="item.riskType"> 
                  </el-option>
              </el-select>
          </el-form-item> 
      </el-form-item>
      <el-form-item prop="riskState" style="margin-left:20px;">
        <span>隐患状态：</span>
          <el-select v-model="sousou.riskState">
              <el-option v-for="(item,index) in statusoption" :key="index" :value="item.code" :label="item.type"> 
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="addfile" type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      
      <el-table-column label="检查日期" prop="chkDate" width="150">
        <template slot-scope="scope">
          {{scope.row.chkDate | formatDate}}
        </template>
      </el-table-column>
      
      <el-table-column label="隐患检查人" sortable prop="chkManName" width="130"></el-table-column>
      <el-table-column label="检查类型" prop="chkTypeName" width="120"></el-table-column>
      <el-table-column label="隐患位置" sortable>
         <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.chkLocName }}</div>
            <div class="boxInput">{{ scope.row.chkLocName }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="隐患类型" prop="riskTypeName" width="150"></el-table-column>
      <el-table-column label="隐患负责人" prop="riskLeaderName" width="120"></el-table-column>
      <el-table-column label="隐患直接责任人" prop="riskMan" width="130"></el-table-column>
      <el-table-column label="隐患性质" prop="riskAttrType"  width="120"></el-table-column>
      <el-table-column label="隐患状态" prop="riskStateName" width="100"></el-table-column>
      <el-table-column label="扣除分数" prop="riskScore"  width="80"></el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyfile(scope.row.riskId)">编辑</el-button>
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
      statusoption:[],
      hiddentypeoption:[],
      zoneoption:[],
      currentPage: 1,
      itemnum:10,
      totalnum:1,
      sousou: {
        worktype:'',
        dateTime:'',
        riskType:'',
        riskState:'',
        chkLoc:'',
      },
      hiddenpageData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        chkLoc:this.sousou.chkLoc,
        dateTime:this.sousou.dateTime,
        riskType:this.sousou.riskType,
        riskState:this.sousou.riskState,
      }
      this.$http.get(security.riskchkselectBy,{params:data}).then(res=>{
        console.log(res);
        this.hiddenpageData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    // 新增
    addfile(){
      this.$router.push({path:'/saftmanage/addhidden?id=0'});
    },
    // 表格中的修改
    modifyfile(id){
      this.$router.push({path:'/saftmanage/addhidden?id='+id});
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
    //隐患类型
    hiddentypedata(){
        this.$http.post(dictapi.risttype).then(res=>{
            this.hiddentypeoption=res.data.list;
        })
    },
    statusdata(){
        this.$http.post(dictapi.ristdangerstate).then(res=>{
            this.statusoption=res.data;
        })
    },
    // 隐患区域
    zonedata(){
        this.$http.post(security.locationselectBytitle).then(res=>{
            this.zoneoption=res.data.result;
        })
    },
  },
  mounted(){
    this.statusdata();
    this.hiddentypedata();
    this.zonedata();
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
