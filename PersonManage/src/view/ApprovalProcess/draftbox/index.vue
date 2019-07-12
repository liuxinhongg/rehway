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
    </el-form>
    <div class="alldid">
      <el-button type="danger" size="small" style="margin-bottom:20px;" @click="moredetele">批量删除</el-button>
      <el-table :data="undidData" border style="width: 100%" @selection-change="SelectChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="100" label="序号"></el-table-column>      
        <el-table-column label="标题">
          <template slot-scope="scope"> 
            <router-link :to="{path:'/project/draftcompile?id='+scope.row.id}">{{scope.row.subject}}</router-link>              
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
        <el-table-column prop="leaveDay" label="请假原因">
          <template slot-scope="scope">
              <el-tooltip trigger="hover" placement="top">
                <div slot="content">{{ scope.row.leaveReason }}</div>
                <div class="boxInput">{{ scope.row.leaveReason }}</div>
              </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <router-link to> 
             <el-button type="text" @click="onedelete(scope.row.id)" style="color:#F56C6C" icon="el-icon-delete">删除</el-button> 
            </router-link> 
              <el-button @click="detaildraft(scope.row.id)" type="text" icon="el-icon-info">详情</el-button> 
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
    <el-dialog title="请假详情" :visible.sync="detailVisible" width="45%" center>
      <el-form :model="detailData">
        <table border="1" class="tableinsert" >
            <tr>
                <td class="tdleft">标题：</td>
                <td colspan="3"> {{detailData.subject}} </td>
            </tr>
            <tr>
                <td class="tdleft">姓名：</td>
                <td> {{detailData.userName}} </td>
                <td class="tdleft">班组：</td>
                <td> {{detailData.className}} </td>
            </tr>
            <tr>
                <td class="tdleft">请假类型：</td>
                <td> 
                  {{detailData.leaveType=='01' ? '事假' : detailData.leaveType=='02' ? '病假' : detailData.leaveType=='03' ? '婚假' : detailData.leaveType=='04' ? '丧假' :
                    detailData.leaveType=='05' ? '产假' : detailData.leaveType=='06' ? '陪产假' : '其他' }}
                </td>
                <td class="tdleft">所在部门：</td>
                <td> {{detailData.departmentName}} </td>
            </tr>
            <tr>
                <td class="tdleft">请假日期：</td>
                <td> {{detailData.leaveDate}} </td>
                <td class="tdleft">请假时长：</td>
                <td> {{detailData.leaveDay}}（天） </td>
            </tr>
            <tr>
                <td class="tdleft">负责人：</td>
                <td> 杨玉环 </td>
                <td class="tdleft">审批状态：</td>
                <td> 未审批 </td>
            </tr>
            <tr>
                <td class="tdleft">请假原因：</td>
                <td colspan="3"> {{detailData.leaveReason}} </td>
            </tr>
        </table>
        <el-form-item style="text-align:center;">
          <el-button @click="renewleave()" type="primary">重新请假</el-button>
          <el-button @click="detailVisible=false" >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.getall();
    },
    //选择删除
    SelectChange(val){
      console.log(val);
      this.delist=val;
    },
    // 批量删除
    moredetele(){
      this.delist.forEach(item=>{
        console.log(item);
      })
      // for(let item in this.delist){
      //   console.log(item);
        // this.$http.post(personapi.draftdete,this.delist).then(res=>{
        //   console.log(res);
        // })
      // }
    },
    // 单个删除
    onedelete(id){
      let data={ id:id }
      this.deletelist.push(data);
      let detele=new FormData()
      detele.append('idList',JSON.stringify(this.deletelist));
      this.$http.post(personapi.draftdete,detele).then(res=>{
        console.log(res);
      })
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
        userId:"103",
        num:this.number,
        page:this.currentPage
      }
      this.$http.get(personapi.draft,{params:data}).then(res=>{
        console.log(res);
        if(res.data.result == 'success'){

          this.undidData=res.data.leaveList;
          this.number=res.data.count;
        }
        if(res.data.result == "error"){
          console.log("请求数据错误");
        }
      })
    },
    // 详情
    detaildraft(id){
      this.detailVisible=true;
      this.$http.get(personapi.draftde,{params:{id:id,}}).then(res=>{
        console.log(res);
        this.detailData=res.data.leaveBill;
      })
    },
    // 详情--重新请假
    renewleave(){
      console.log(this.detailData.id);
      this.$http.get(personapi.leavesub,{params:this.detailData}).then(res=>{
        console.log(res);
        if(res.data.result == 'success'){
          this.detailVisible=true;
          this.getall();
        }                                    
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
