<template>
  <div class="undidhome">
    <p class="persontop" style="margin-bottom:20px;">休假申请-草稿箱</p>
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
      <el-form-item style="float:right;">
        <el-button type="success" @click="adddata">+新增</el-button>
      </el-form-item>
    </el-form>
    <div class="alldid">
      <el-table :data="dealData" border style="width: 100%" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>      
        <el-table-column label="标题">
          <template slot-scope="scope"> 
            <router-link :to="{path:'/project/detailapprove?id='+scope.row.id}">{{scope.row.subject}}</router-link>              
          </template>
        </el-table-column>
        <el-table-column prop="leaveDay" label="请假天数" sortable width="200"></el-table-column>
        <el-table-column prop="leaveType" label="请假类型" sortable  :filter-method="filterHandler"
            :filters="[{text: '事假', value: '01'}, {text: '病假', value: '02'},{text: '婚假', value: '03'}, {text: '丧假', value: '04'},
            {text: '产假', value: '05'}, {text: '陪产假', value: '06'},{text: '其他', value: '07'}]" width="200">
            <template slot-scope="scope">
              {{scope.row.leaveType=='01' ? '事假' : scope.row.leaveType=='02' ? '病假' : scope.row.leaveType=='03' ? '婚假' : scope.row.leaveType=='04' ? '丧假' :
              scope.row.leaveType=='05' ? '产假' : scope.row.leaveType=='06' ? '陪产假' : '其他' }}
            </template>
        </el-table-column>
        <el-table-column prop="date" label="创建时间" sortable width="250"></el-table-column>
        <el-table-column prop="leaveDay" label="请假原因">
          <template slot-scope="scope">
              <el-tooltip trigger="hover" placement="top">
                <div slot="content">{{ scope.row.leaveReason }}</div>
                <div class="boxInput">{{ scope.row.leaveReason }}</div>
              </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <router-link :to="{path:'/project/dealwithend?id='+scope.row.id+'&InId='+scope.row.processInstanceId}">
            <el-button type="text" icon="el-icon-info">详情</el-button> 
            </router-link>
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
      dealData: [],
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 弹框提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //未结流程
          let leaveform=new FormData();
          leaveform.append('',this.sleaveform.username)
          this.$http.post(usercenter.leav,leaveform).then(res=>{
            console.log(res);
          })
          // this.$router.push({path:'/project/undided',query:{id:this.sleaveform}});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
          this.$router.push({path:'/project/draftbox'});//草稿
    },
    // 获取部门
    getdep(){
        this.$http.get('/api/dep/selectBy').then(res=>{
            // console.log(res);
            this.depoption=res.data.list;
        })
    },
    getperson(){
        this.$http.get('/api/user/user_select').then(res=>{
            // console.log(res);
            this.personoption=res.data.list;
        })
    },
    getall(){
      let data={ 
        userId:'103',
        num:this.number,
        page:this.currentPage
      }
      this.$http.get(personapi.taskhistory,{params:data}).then(res=>{
        console.log(res);
        this.dealData=res.data.leaveList;
      })
    }
  },
  created() {},
  mounted() {
      this.getall();
      this.getdep();
      this.getperson();
      this.username=localStorage.getItem('username');
      this.teamName=localStorage.getItem('teamName');
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
