<template>
  <div>
    <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item label="计划检查人">
        <el-select v-model="planform.chkMan" style="width:280px">
            <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检查类型">
            <el-select v-model="planform.chkType" style="width:280px">
                <el-option v-for="(item,index) in aqdetail" :key="index" :value="item.code" :label="item.type"> 
                </el-option>
            </el-select>
      </el-form-item>  
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="addfile" type="success">+  添加</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="adverData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column label="计划编号" prop="id" width="120"></el-table-column>
      <el-table-column label="隐患检查人" sortable prop="chkMan"></el-table-column>
      <el-table-column label="检查类型" prop="chkTypeName"></el-table-column>
      <el-table-column label="隐患负责人" prop="riskLeaderName"></el-table-column>
      <el-table-column label="计划检查内容">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.chkCont }}</div>
            <div class="boxInput">{{ scope.row.chkCont }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="检查图片">
          <template slot-scope="scope">
              <img v-if="scope.row.chkFileInfo" :src="'/api/took/user_get_photo?fileName='+scope.row.chkFileInfo.location" alt="" style='height:40px;'>
          </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button type="text"  @click="execute(scope.row.id)">修改</el-button> -->
          <el-button type="text" @click="modify(scope.row.id)">修改</el-button>
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
      wzdata:[],
      personoption:[],
      aqdetail:[],
      aqdetail:[],
      currentPage: 1,
      itemnum:12,
      totalnum:1,
      planform: {
        chkMan:'',
        chkType: '',
      },
      adverData: [],
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        chkMan:this.planform.chkMan,
        chkType:this.planform.chkType,
      }
      this.$http.get(security.risktodayselectby,{params:data}).then(res=>{
        console.log(res);
        this.adverData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    aqtype(){
            this.$http.get(dictapi.ristverify).then(res=>{
                console.log(res)
                this.aqdetail = res.data
            })
        },
    // 添加计划
    addfile(){
      this.$router.push({path:'/saftmanage/todayplanadd?id=0'});
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
    // 详情
    modify(id){
      this.$router.push({path:'/saftmanage/todayplanadd?id='+id});
    },
     uploadperson(){
        this.$http.get(dictapi.user).then(res=>{
            this.personoption=res.data.list;
        })
    },
    locationdata(){
          this.$http.get(security.locationselectAll).then(res=>{
              console.log(res);
            this.wzdata=res.data.list;
            // this.countnum=res.data.count;
        })
    },
    aqtype(){
            this.$http.get(dictapi.ristverify).then(res=>{
                // console.log(res)
                this.aqdetail = res.data
            })
        },
  },
  mounted(){
      this.aqtype()
    this.locationdata()
    this.uploadperson()
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
