<template>
  <div class="undidhome">
    <p class="persontop" style="margin-bottom:20px;">草稿箱</p>
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline">
      <el-form-item>
        <span>请假类型：</span>
        <el-select v-model="undidsearch.leaveType" style="width:200px;">
          <el-option value="01" label="事假"></el-option>
          <el-option value="02" label="病假"></el-option>
          <el-option value="03" label="婚假"></el-option>
          <el-option value="04" label="丧假"></el-option>
          <el-option value="05" label="产假"></el-option>
          <el-option value="06" label="陪产假"></el-option>
          <el-option value="07" label="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span>请假时间：</span>
         <el-date-picker v-model="undidsearch.date" type="datetime" style="width:200px;"  placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <span>请假天数：</span>
         <el-input v-model="undidsearch.leaveDay" type="number" style="width:200px;"  placeholder="选择日期时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="alldid">
      <el-button type="danger" size="small" plain style="margin-bottom:20px;"  icon="el-icon-delete-solid" @click="moredetele">批量删除</el-button>
      <el-table :data="undidData" border style="width: 100%" @selection-change="SelectChange" ref="multipleTable">
        <el-table-column type="selection" width="80" style="text-align:center;"></el-table-column>
        <el-table-column type="index" width="100" label="序号"></el-table-column>      
        <el-table-column label="标题">
          <template slot-scope="scope"> 
            <router-link :to="{path:'/project/draftcompile?id='+scope.row.id+'&type='+scope.row.folwtype}" v-if="scope.row.flowType == 'LeaveRequest'">{{scope.row.subject}}</router-link>              
            <router-link :to="{path:'/project/draftcompilecost?id='+scope.row.id+'&type='+scope.row.folwtype}" v-if="scope.row.flowType == 'Reimburse'">{{scope.row.subject}}</router-link>              
            <router-link :to="{path:'/project/draftcompileasset?id='+scope.row.id+'&type='+scope.row.folwtype}" v-if="scope.row.flowType == 'Assets'">{{scope.row.subject}}</router-link>              
            <router-link :to="{path:'/project/draftrequirement?id='+scope.row.id+'&type='+scope.row.folwtype}" v-if="scope.row.flowType == 'DevReq'">{{scope.row.subject}}</router-link>              
            <router-link :to="{path:'/project/draftupkeep?id='+scope.row.id+'&type='+scope.row.folwtype}" v-if="scope.row.flowType == 'DevMaint'">{{scope.row.subject}}</router-link>              
            <router-link :to="{path:'/project/draftcompileoperation?id='+scope.row.id+'&type='+scope.row.folwtype}" v-if="scope.row.flowType == 'DevBusiness'">{{scope.row.subject}}</router-link>              
            <router-link :to="{path:'/project/draftbargain?id='+scope.row.id+'&type='+scope.row.folwtype}" v-if="scope.row.flowType == 'MContract'">{{scope.row.subject}}</router-link>              
            <router-link :to="{path:'/project/draftsiteplan?id='+scope.row.id+'&type='+scope.row.folwtype}" v-if="scope.row.flowType == 'MSummary'">{{scope.row.subject}}</router-link>              
            <router-link :to="{path:'/project/draftdemandplan?id='+scope.row.id+'&type='+scope.row.folwtype}" v-if="scope.row.flowType == 'MRequire'">{{scope.row.subject}}</router-link>              
          </template>
        </el-table-column>
        <el-table-column prop="busiType" label="业务类型" sortable  :filter-method="filterHandler"
            :filters="[{text: '人事管理', value: '01'}, {text: '办公', value: '02'},{text: '安全管理', value: '03'}, {text: '质量管理', value: '04'},
            {text: '物资管理', value: '05'}, {text: '设备管理', value: '06'}]" width="300">
            <template slot-scope="scope">
              {{scope.row.busiType=='OA' ? '人事管理' : scope.row.busiType=='OF' ? '办公' : scope.row.busiType=='SQ' ? '安全管理' : scope.row.busiType=='QT' ? '质量管理' :
              scope.row.busiType=='MT' ? '物资管理' : '设备管理' }}
            </template>
        </el-table-column>
        
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="onedelete(scope.row.id,scope.row.flowType)" style="color:#F56C6C" icon="el-icon-delete-solid">删除</el-button> 
            <el-button v-if="scope.row.flowType == 'LeaveRequest'" @click="detaildraft(scope.row.id,scope.row.flowType,a=1)" type="text" icon="el-icon-info">详情</el-button>   <!-- 请假-->
            <el-button v-if="scope.row.flowType == 'Reimburse'"  @click="detaildraft(scope.row.id,scope.row.flowType,a=2)" type="text" icon="el-icon-info">详情</el-button>  <!-- 费用报销-->
            <el-button v-if="scope.row.flowType == 'Assets'"  @click="detaildraft(scope.row.id,scope.row.flowType,a=3)" type="text" icon="el-icon-info">详情</el-button> <!-- 资产申请-->
            <el-button v-if="scope.row.flowType == 'DevReq'"  @click="detaildraft(scope.row.id,scope.row.flowType,a=4)" type="text" icon="el-icon-info">详情</el-button> <!-- 设备 需求 计划申请-->
            <el-button v-if="scope.row.flowType == 'DevMaint'"  @click="detaildraft(scope.row.id,scope.row.flowType,a=5)" type="text" icon="el-icon-info">详情</el-button> <!-- 设备 保养 计划申请-->
            <el-button v-if="scope.row.flowType == 'DevBusiness'"  @click="detaildraft(scope.row.id,scope.row.flowType,a=6)" type="text" icon="el-icon-info">详情</el-button>   <!-- 设备 运营 计划申请-->
            <el-button v-if="scope.row.flowType == 'MContract'"  @click="detaildraft(scope.row.id,scope.row.flowType,a=7)" type="text" icon="el-icon-info">详情</el-button>   <!-- 物资  合同-->
            <el-button v-if="scope.row.flowType == 'MSummary'"  @click="detaildraft(scope.row.id,scope.row.flowType,a=8)" type="text" icon="el-icon-info">详情</el-button>   <!-- 物资  合同-->
            <el-button v-if="scope.row.flowType == 'MRequire'"  @click="detaildraft(scope.row.id,scope.row.flowType,a=9)" type="text" icon="el-icon-info">详情</el-button>   <!-- 物资  合同-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="number"
        layout="prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
    
  </div>
</template>

<script>
import * as personapi from '@/api/usercenter.js'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      
      currentPage: 1,
      number:12,
      count:1,
      detailVisible:false,
      undidsearch: {
        leaveType:'',
        leaveDay:'',
        date:'',
        ywlc: "",
        date:'',
      },
      undidData: [],
      cause: [
          { required: true, message: "请输入请假原因", trigger: "change" }
      ], 
      // 请假详情弹框数据
      detailData:{
        leaderNext:'',
        className: "",
        departmentName: "",
        leaveDate: "",
        leaveDay: "",
        leaveReason: "",
        leaveType: "",
        subject: "",
        userId: "",
        userName: "",
        id:'',
      },
      username:'',
      teamName:'',
      depoption:[],//部门
      personoption:[],//人员信息
      delist:[],
      deletelist:[],
    };
  },
  methods: {
    // 过滤状态
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
    },
    // 查询
    searchSubmit() {
      this.getall();
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      // this.currentPage=val;
      this.getall();
    },
    //选中的数据
    SelectChange(val){
      this.delist=val;
    },
    // 批量删除
    moredetele(){
        this.delist.map(item => { return {id: item.id,flowType:item.flowType}});
        let moredetele=new FormData();
        moredetele.append('deleteList',JSON.stringify(this.delist));
        this.$http.post(personapi.draftdete,moredetele).then(res=>{
          if(res.data.result=="success"){
            this.$message.success('批量删除成功~');
            this.getall();
          }
        })
    },
    // 单个删除
    onedelete(id,type){
      let data={ id:id,flowType:type}
      this.deletelist.push(data);
      let detele=new FormData()
      detele.append('deleteList',JSON.stringify(this.deletelist));
       this.$confirm('你确定要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(personapi.draftdete,detele).then(res=>{
            if(res.data.result=='success'){
              this.$message.success('删除成功~');
              this.getall()
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
    // 获取部门
    getdep(){
        this.$http.get('/api/dep/selectBy').then(res=>{
            this.depoption=res.data.list;
        })
    },
    getperson(){
        this.$http.get('/api/user/user_select').then(res=>{
            this.personoption=res.data.list;
        })
    },
    getall(){
      let data={  userId:"103", num:this.number, page:this.currentPage };
        this.$http.get(personapi.draft,{params:data}).then(res=>{
          if(res.data.result == 'success'){
            this.undidData=res.data.billList;
            this.count=res.data.count;
          }
          if(res.data.result == "error"){
          }
        })
    },
    // 详情
    detaildraft(id,type,v){
      //OA 请假
      if(v==1){
        this.$router.push('/project/draftcompile?id='+id+"&type="+type)
      }
      //OA 报销
      if(v==2){
        this.$router.push('/project/draftcompilecost?id='+id+"&type="+type)
      }
      //OA 资产申请
      if(v==3){
        this.$router.push('/project/draftcompileasset?id='+id+"&type="+type)
      }
      //设备 需求
      if(v==4){
        this.$router.push('/project/draftrequirement?id='+id+"&type="+type)
      }
      //设备 保养
      if(v==5){
        this.$router.push('/project/draftupkeep?id='+id+"&type="+type)
      }
      //设备 运营
      if(v==6){
        this.$router.push('/project/draftcompileoperation?id='+id+"&type="+type)
      }
      // 物资  合同       
      if(v==7){
        this.$router.push('/project/draftbargain?id='+id+"&type="+type)
      }
      // 物资  总计划       
      if(v==8){
        this.$router.push('/project/draftsiteplan?id='+id+"&type="+type)
      }
      // 物资  总计划       
      if(v==9){
        this.$router.push('/project/draftdemandplan?id='+id+"&type="+type)
      }
    },
    // 详情--重新请假
    renewleave(){
      if(this.detailData.leaderNext==''||this.detailData.leaderNext==null){
        this.$message.error('请选择审批人');
      }else{
        this.$http.get(personapi.leavesub,{params:this.detailData}).then(res=>{
          if(res.data.result == 'success'){
            this.detailVisible=false;
            this.getall();
          }                                    
        })
      }
    }
  },
  created() {},
  mounted() {
      this.getall();
      this.getdep();
      this.getperson();
  },
};
</script>

<style lang="scss">
.undidhome {
  width: 90%;
  margin: auto;
  .alldid {
    width: 100%;
    height: calc(100vh - 273px);
    .el-table__column-filter-trigger i{
      color: #efefef;
      font-size: 17px;
    }
  }
}
</style>
<style>
.undidhome .el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar__wrap {
  margin-right: 0;
}
</style>

