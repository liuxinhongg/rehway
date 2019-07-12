/*********************************************
 * @function: 考勤管理---考勤查询
 * @Author: 刘新红 
 * @Date: 2019-03-11 
 *********************************************/
<template>
  <div class="attendlist">
    <p class="persontop" style="margin-bottom;15px;">考勤管理列表</p>
    <el-scrollbar style="height:100%;">
      <el-form class="kqattendance" :model="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <span>工人编码：</span> <el-input v-model="form.workercode" style="width:200px;" placeholder="工人编码"></el-input>
        </el-form-item>
        <el-form-item>
          <span>工人姓名：</span> <el-input v-model="form.workerName" style="width:200px;" placeholder="工人编码"></el-input>
        </el-form-item>
        <el-form-item>
          <span>班组：</span>
          <el-select v-model="form.projectCode" style="width:200px;" placeholder="选择班组">
            <el-option v-for="(item,index) in teamoptions" :key="index" :label="item.teamName" :value="item.teamId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span>部门：</span>
          <el-select v-model="form.projectCode" style="width:200px;" placeholder="选择部门">
            <el-option v-for="(item,index) in partoptions" :key="index" :label="item.departmentName" :value="item.departmentId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span>识别方式：</span>
          <el-select v-model="form.projectCode" style="width:200px;" placeholder="选择班组">
            <el-option v-for="(item,index) in typeoption" :key="index" :label="item.type" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期&nbsp;：&nbsp;</span>
          <el-select v-model="form.date1" placeholder="请选择时间区" style="width:200px;">
            <el-option :label="item.label" :value="item.label" v-for="(item,index) in timeoptions" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" @click="search" type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button>导出</el-button>
          <el-button @click="printContent">打印</el-button>
          <el-button @click="configkq">配置考勤时间</el-button>
        </el-form-item>
      </el-form>
      <div id="subOutputRank-print" ref="examAnswerContent">
        <el-table :data="unfinishData" class="unfindTable" border>
          <el-table-column type="index" width="80" label="编号"></el-table-column>      
          <el-table-column prop="workerName" label="工人姓名" sortable></el-table-column>
          <el-table-column prop="personId" label="工人编号" sortable></el-table-column>
          <el-table-column prop="userinfno" label="所在部门" sortable></el-table-column>
          <el-table-column prop="teamName" label="所在班组" sortable></el-table-column>
          <el-table-column prop="attendanceMachinedName" label="设备名称" sortable></el-table-column>
          <el-table-column prop="type" label="识别方式">
            <template slot-scope="scope">
              {{scope.row.type== 'face_0' ? '刷脸识别(权限内)' : scope.row.type== 'face_1' ? '刷脸识别(权限外)' :
                scope.row.type== 'face_2' ? '刷脸识别(陌生人)' : scope.row.type== 'card_0' ? '刷卡识别(权限内)' : 
                scope.row.type== 'card_1' ? '刷卡识别(权限外)' : scope.row.type== 'faceAndcard_0' ? '双重认证(权限内)' :
                scope.row.type== 'faceAndcard_1' ? '双重认证(权限外)' : scope.row.type== 'faceAndcard_2' ? '双重认证(陌生人)' :
                scope.row.type=='idcard_0' ? '人证比对(权限内)' : '人证比对(陌生人)'
              }}
            </template>
          </el-table-column>
          <el-table-column label="刷卡时间" prop="date" column-key="attendTime" :filter-multiple=false sortable
            :filters="[
              {text: '一周', value: '一周'}, 
              {text: '一月', value: '一月'},
              {text: '三月', value: '三月'}, 
              {text: '半年', value: '半年'}]" :filter-method="filterTime">
            <template slot-scope="scope">
              <p>{{scope.row.attendTime | formatDate}}</p>
            </template>
          </el-table-column>
          <el-table-column label="进退场">
            <template slot-scope="scope">
              <p>{{scope.row.state==1 ? '进场':'退场'}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-scrollbar>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="pageAny"
      ></el-pagination>
    </div>
    <el-dialog title="考勤时间配置" :visible.sync="kqVisible" width="25%" center>
      <el-form :model="form" label-width="90px">
        <el-form-item label="开始时间：" style="margin-left:40px;">
            <el-time-select placeholder="起始时间" v-model="startTime"
              :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }">
            </el-time-select>
        </el-form-item>
        <el-form-item label="结束时间：" style="margin-left:40px;">
            <el-time-select placeholder="结束时间" v-model="endTime"
                :picker-options="{ start: '08:30',  step: '00:15', end: '18:30', minTime: startTime }">
            </el-time-select>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button type="primary" @click="suretime">确定</el-button>
          <el-button @click="kqVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import formatDate from "@/filter/date.js";
export default {
  filters: {
    formatDate(times) {
      return formatDate(+times, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      kqVisible:false,
      startTime:'',
      endTime:'',
      form: {
        date1: "",
        workercode:'',
        projectCode: "",
        workerName:'',
      },
      timevalue: "",
      partvalue: "",
      partoptions: [],
      teamoptions:[],
      typeoption:[
        { type:'刷脸识别(权限内)',id:'face_0' },
        { type:'刷脸识别(权限外)',id:'face_1' },
        { type:'刷脸识别(陌生人)',id:'face_2' },
        { type:'刷卡识别(权限内)',id:'card_0' },
        { type:'刷卡识别(权限内)',id:'card_1' },
        { type:'双重认证(权限内)',id:'faceAndcard_0' },
        { type:'双重认证(权限外)',id:'faceAndcard_1' },
        { type:'双重认证(陌生人)',id:'faceAndcard_2' },
        { type:'人证比对(权限内)',id:'idcard_0' },
        { type:'人证比对(权限外)',id:'idcard_2' },
      ],//识别方式
      timeoptions: [
        { value: "01", label: "一周" },
        { value: "02", label: "一月" },
        { value: "03", label: "三月" },
        { value: "04", label: "半年" }
      ],
      // 总条数
      pageAny: 1,
      size: 20,
      // paginationShow:true,
      right: "right",
      formLabelAlign: {},
      centerDialogVisible: false,
      //当前页数
      currentPage: 1,
      unfinishData: [],
      partId: "",
      PartOption: [],
      multipleSelection:[],
    };
  },
  methods: {
    //过滤
    filterTime(value, row, column) {
        console.log(value);
        console.log(row);
        console.log(column);
        const property = column['property'];
        return row[property] === value;
      },
    suretime(){
      this.$http.get('/api/clockConfig/insert').then(res=>{
        console.log(res);
      })
    },
    configkq(){
      this.kqVisible=true;
    },
    choosearrow(status){
      if(status==1){
       this.unfinishData.choosestatus = 0;
       console.log(this.unfinishData.choosestatus);
      }else{
        this.unfinishData.choosestatus=1;
        console.log(this.unfinishData.choosestatus);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.getAlldata();
    },
    search() {
      var that = this;
      //条件查
      this.getAlldata();
    },
    // 打印
    printContent(e) {
      let newContent = this.$refs.examAnswerContent.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },
    getAlldata(){
      var that = this;
      let data = {
        backTime: that.form.date1,
        teamId:that.form.projectCode,
        workerId:that.form.workercode,
        page: that.currentPage,
        num: that.size,
      };
      that.$http.get("/api/check/select_all", {params: data}).then(res => {
          console.log(res);
          that.unfinishData = res.data.list;
          let leng = res.data.count;
          that.pageAny = leng;
        }).catch(req => {});
    },
    getTeam(){
      this.$http.post('/api/team/team_select_list').then(res=>{
        console.log(res);
        this.teamoptions=res.data;
      })
    },
    getpart(){
      this.$http.post('/api/dep/selectBy').then(res=>{
        console.log(res);
        this.partoptions=res.data.list;
      })
    },
  },
  mounted() {
    //全部列表
    this.getAlldata();
    //班组数据
    this.getTeam();
    //部门
    this.getpart();
  }
};
</script>
<style lang="scss">
.attendlist{
  width: 100%;
  height: calc(100vh - 136px);
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.kqattendance {
  width: 90%;
  margin: auto;
  margin-top: 20px;
}
.tablezc {
  width: 45px;
  height: 25px;
  border-radius: 5px;
  line-height: 25px;
  text-align: center;
  margin: auto;
  background: #67c23a;
  color: #fff;
}
.tablebzc {
  width: 50px;
  height: 25px;
  border-radius: 5px;
  line-height: 25px;
  text-align: center;
  margin: auto;
  background: #e6a23c;
  color: #fff;
  
}
.unfindTable {
  width: 90%;
  margin: 0 auto;
  .el-table_1_column_6 .cell {
    overflow: visible;
  }
  .boxInput {
    cursor: pointer;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.OImg {
  width: 80px;
  height: 50px;
  text-align: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.checkout {
  width: 80%;
  height: auto;
  margin: 10px auto;
  margin-bottom: 20px;
  .chechlist {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
    font-size: 15px;
    p:nth-child(1) {
      width: 100px;
      text-align: right;
      color: #5e5e5e;
      font-weight: bold;
    }
    p:nth-child(2) {
      color: #808080;
      font-weight: bold;
      margin-left: 10px;
    }
  }
}
// .el-table td,
// .el-table th.is-leaf {
//   padding: 10px;
// }
.subOutputRank-print{
  width: 90%;
  margin: 0 auto;
}
</style>