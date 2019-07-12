<template>
  <div class="qualitycheck">
    <p class="persontop">操作员注册列表</p>
    <el-scrollbar style="height:100%;">
      <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
        <el-form-item>
          <span>设备:</span>
            <el-select v-model="sousou.devcode">
                <el-option v-for="(item,index) in sbdetail" :key="index" :label="item.mtypeName" :value="item.devcode"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="operName">
          <span>操作员：</span><el-input v-model="sousou.operName" style="width:200px" placeholder="操作员"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button  @click="addfile" type="success">+新增</el-button>
          <el-button><a :href="'/api/quality_plan/selectBy_?proId='+sousou.proid+'&chkArea='+sousou.chkArea">导出</a></el-button>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
        <el-table-column label="编号" type="index" width="100"></el-table-column>
        <el-table-column label="设备" prop="devcodeMname" sortable></el-table-column>
        <el-table-column label="操作员姓名" prop="operName" ></el-table-column>
        <el-table-column label="操作员身份证号" prop="operIdCard"> </el-table-column>
        <el-table-column label="性别"  sortable>
          <template slot-scope="scope">
            {{scope.row.gender == 0 ? "男" : "女"}}
          </template>
        </el-table-column>
        <el-table-column label="状态" >
          <template slot-scope="scope">
            {{scope.row.state == 0 ? "可用" : "不可用"}}
          </template>
        </el-table-column>
        <el-table-column label="资质照" >
          <template slot-scope="scope">
            <img style='height:40px;' v-if='scope.row.cretFileInfo' :src="'/api/took/user_get_photo?fileName='+scope.row.cretFileInfo[0].location" alt="">
            <!-- <a v-if='scope.row.cretFileInfo' :href="'/api/took/user_get_photo?fileName='+scope.row.cretFileInfo.location">{{scope.row.cretFileInfo.fileName}}</a> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyfile(scope.row.id)" ><i class="iconfont icon-edit"></i>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
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
import  formatDate from '@/filter/date.js';
import * as qualitymanage from '@/api/qualityapi.js'
import * as equipmanage from '@/api/equipmanage.js'
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
      sbdetail:[],
      ProOption:[],
      currentPage: 1,
      itemnum:10,
      totalnum:1,
      sousou: {
        devcode:'',
        operName:'',
        // dateTime:'',
      },
      hiddenpageData: [],
    };
  },
  methods: {
    shebei(){
            this.$http.get(equipmanage.equipreginsert).then(res=>{
                console.log(res);
                this.sbdetail = res.data.list;
            })
        },
    dataAll(){
      let data
      if(this.sousou.devcode){
        data={
          page:this.currentPage,
          num:this.itemnum,
          devcode:this.sousou.devcode,
          operName:this.sousou.operName,
        }
      }else{
         data={
          page:this.currentPage,
          num:this.itemnum,
          // devcode:this.sousou.devcode,
          operName:this.sousou.operName,
        }
      }
      console.log(data);
      this.$http.get(equipmanage.devoperatorselectBy,{params:data}).then(res=>{
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
      this.$router.push({path:'/equipmanage/doperatorReg?id=0'});
    },
    // 表格中的修改
    modifyfile(id){
      this.$router.push({path:'/equipmanage/doperatorReg?id='+id});
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
    // 检查项目
    Protype(){
      this.$http.get(dictapi.subprj).then(res=>{
          console.log(res);
          this.ProOption=res.data.list;
      })
    },
  },
  mounted(){
    this.shebei();
    this.Protype();
    this.dataAll();
  }
};
</script>
<style lang="scss">
.qualitycheck{
  width:100%;
  height: calc(100vh - 115px);
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
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
