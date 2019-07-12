<template>
  <div class="undidhome">
    <p class="persontop" style="margin-bottom:20px;">办结流程</p>
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline">
      <el-form-item>
        <span>业务类型：</span>
        <el-select v-model="undidsearch.leaveType" style="width:200px;">
          <el-option value="OA" label="人事"></el-option>
          <el-option value="OF" label="办公"></el-option>
          <el-option value="ST" label="安全"></el-option>
          <el-option value="QT" label="质量"></el-option>
          <el-option value="MT" label="物资"></el-option>
          <el-option value="EQ" label="设备"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
      <!-- <el-form-item style="float:right;">
        <el-button type="success" @click="adddata">+新增</el-button>
      </el-form-item> -->
    </el-form>
    <div class="alldid">
      <el-table :data="undidData" border style="width: 100%" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>      
        <el-table-column label="标题">
          <template slot-scope="scope"> 
            <router-link :to="{path:'/project/detailapprove?id='+scope.row.id+'&InId='+scope.row.processInstanceId+'&flowType='+scope.row.flowType}">
            <el-button type="text" >{{scope.row.subject}}</el-button> 
            </router-link>
            <!-- <a href=""></a> -->
           <!-- {{scope.row.subject}}       -->
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope"> 
            {{scope.row.status == 0 ? "未提交" : scope.row.status == 1 ? "审批中" : scope.row.status == 2 ? "审批通过" : "审批不通过"}} 
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
        
       <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <router-link :to="{path:'/project/detailapprove?id='+scope.row.id+'&InId='+scope.row.processInstanceId+'&flowType='+scope.row.flowType}">
            <el-button type="text" icon="el-icon-info">详情</el-button> 
            </router-link>
            <router-link to> 
              <span style="color:#E6A23C" v-if="scope.row.userId==userId"  @click="withdraw(scope.row.id,scope.row.processInstanceId)"><i class="iconfont iconcancle"></i>撤回</span> 
            </router-link>
          </template>
        </el-table-column>>
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
      currentPage: 1,
      number:12,
      count:1,
      leavevisible:false,
      undidsearch: {
        leaveType:'',
        leaveDay:'',
        date:'',
        ywlc: "",
        date:'',
      },
      undidData: [],
      sleaveform: {
        resource: "",
        daylength: "",
        date2: "",
        cause:'',
        dep:'',
        mainperson:'',
      },
      rules: {
        resource: [
             { required: true, message: "请输入请假类型", trigger: "change" }
        ],
        dep: [
            { required: true, message: '请选择部门', trigger: 'change' }
        ],
        mainperson: [
        { required: true, message: '请选择负责人', trigger: 'change' }
        ],
        daylength: [
            { type: 'date', required: true, message: '请输入时长', trigger: 'blur' }
        ],
        cause: [
           { required: true, message: "请输入请假原因", trigger: "change" }
        ], 
      },
      username:'',
      teamName:'',
      depoption:[],//部门
      personoption:[],//人员信息
      userId:'',
    };
  },
  methods: {
    //新增
    adddata(){
      this.leavevisible=true;
    },
    // 过滤状态
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
    },
    // 查询
    searchSubmit() {},
    //详情
    detail(unid,InId){
      this.$router.push({path:'/project/detailapprove?InId='+InId})
        eventBus.$emit('id', unid);
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.getall();
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
      let data={ 
        assignee:"117",
        num:this.number,
        page:this.currentPage,
      }
      this.$http.get(personapi.taskhistory,{params:data}).then(res=>{
        this.undidData=res.data.beanList;
        this.count = res.data.count
      })
    },
    withdraw(id,processInstanceId){

       this.$confirm('你确定撤回?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.get(personapi.gorevert,{params:{id:id,processInstanceId:processInstanceId}}).then(res=>{
              if(res.data.result == 'success'){
                this.getall()
                this.$message({
                  message: '撤回成功',
                  type: 'success'
                });
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    }
  },
  created() {
    this.userId=sessionStorage.getItem('userId')
  },
  mounted() {
    this.getall();//获取全部数据信息
    // this.getdep();//获取部门信息
    // this.getperson();//获取人员信息
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
