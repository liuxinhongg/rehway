<template>
  <div>
    <div class="listbox">
      <el-form :inline="true"  @submit.native.prevent>
        <el-form-item >
          <!-- <span>账号：</span> -->
           <el-input v-model="input" style="width:200px;" placeholder="账号/姓名"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button @click="search" type="primary" icon="el-icon-search" native-type="submit">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button @click="accadd()" type="success">+ 新建</el-button>
          <el-button><a :href="'/api/user/selectByHr_?cardNumber='+this.input">导出</a></el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%" :default-sort = "{prop: 'workerName', order: 'descending'}">
        <el-table-column type="index" width="80" label="序号"></el-table-column>
        <el-table-column label="头像" width="100px">
          <template slot-scope="scope">
            <img :src="'data:image/jpeg;base64,'+scope.row.headImage" alt="" class="avart">
          </template>
        </el-table-column>
        <el-table-column prop="idCardNumber" label="账号" sortable></el-table-column>
        <el-table-column label="显示名" sortable prop="workerName">
          <template slot-scope="scope">
            {{scope.row.workerName}}
          </template>
        </el-table-column>
        <el-table-column prop="politicsType" label="政治面貌" ></el-table-column>
        <el-table-column prop="workerId" label="工号" :formatter="formatter"></el-table-column>
        <el-table-column prop="cultureLevel" label="学历" ></el-table-column>
        <el-table-column prop="idCardNumber" label="身份证号"></el-table-column>
        <el-table-column label="注册考勤机状态">
          <template slot-scope="scope"> {{scope.row.attendLogin=="true" ? "已注册" : "未注册"}} </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.workerId)" type="text" size="small" style="color:#09f !important" >详情</el-button>
              <el-button type="text" :disabled="scope.row.attendLogin == 'true'" size="small" @click="registerClick(scope.row.workerId)">注册设备人员</el-button>
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
          :total="pagecount"
        ></el-pagination>
      </div>
      <el-dialog title="设备人员信息注册" :visible.sync="registerVisible" width="30%" center>
        <el-form :model="equipform" label-width="90px" @submit.native.prevent>
          <el-form-item label="设备密码：">
            <el-input v-model="pass" autocomplete="off" @blur="equippass('passnum')"></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="equipform.name" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="ID">
            <el-input v-model="equipform.id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="卡号：">
            <el-input v-model="equipform.idcardNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  style="text-align:center;">
            <el-button @click="registerVisible = false">取 消</el-button>
            <el-button type="primary" @click="registersubmit()" native-type="submit">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      itemnum: 8,
      currentPage: 1,
      pagecount: 1,
      checked: true,
      registerVisible:false,
      input: "",
      isDisabled:true,
      tableData: [],
      attanstatus:'',
      imgurl:'',
      equipform:{
        name:'ss',
        id:'1233',
        idcardNum:''
      },
      pass:'12345678',
      getpersonId:'',
    };
  },
  watch: {},
  computed: {},
  methods: {
    registersubmit(){
      let that=this;
      let numdata=that.$qs.stringify({ pass:'12345678',person:JSON.stringify(that.equipform)});
      that.$http.post('/equip/person/create',numdata, { headers : { 'Content-Type':'application/x-www-form-urlencoded' }}).then(res=>{
        console.log(res);
        if(res.success=true){
          that.attanstatus='已注册'
          console.log(that.attanstatus)
          that.$message.success('注册成功');
          this.getdataall();
          this.disabled=false;
          that.$http.get('/api/check_per/per_inseret_info',{params:res.data.data}).then(res=>{
            console.log(res);
          })
          that.registerVisible=false
        }else{
          that.$message.error('注册失败');
        }
      })
    },
    formatter(row, column) {
        return row.workerId;
    },
    equippass(item){
      console.log(item);
    },
    handleClick(row) {
      this.$router.push('/project/details?id='+row)
    },
    registerClick(id){
      this.getpersonId=id;
      this.registerVisible=true;
      this.$http.post('/api/user/user_select_id?workerId='+this.getpersonId).then(res=>{
        console.log(res);
        this.equipform.name=res.data.user[0].workerName;
        this.equipform.id=res.data.user[0].workerId;
      })
    },
    search() {
      this.$http.get('/api/user/select_by_ci',{params:{cardNumber:this.input}}).then(res=>{
        this.tableData = res.data.userpersonInfo
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      console.log(`当前页: ${val}`);
      that.currentPage = val;
      let data = {
        page: that.currentPage,
        num: that.itemnum,
      };
      this.$http
      .get("/api/user/user_select_all", {
        params: data
      })
      .then(res => {
        console.log(res);
        this.tableData = res.data.list;
        this.pagecount = res.data.count
      })
      .catch(req => {
        console.log(req);
      });
    },
    accadd(){
      this.$router.push('/project/accountadd?id=0')
    },
    exportlist(){
      this.$http.get('/api/user/selectByHr_?cardNumber='+this.input).then(res=>{
        console.log(res);
      })
    },
    getdataall(){
       this.$http.get("/api/user/user_select_all", { params: { page: this.currentPage, num: this.itemnum }}).then(res => {
        console.log(res);
        this.tableData = res.data.list;
        this.pagecount = res.data.count
      })
      .catch(req => {
        console.log(req);
      });
    },
  },
  created() {},
  mounted() {
    this.getdataall();
    this.$http.get("/api/user/user_select_all", {
        params: { page: this.currentPage, num: this.itemnum }
      })
      .then(res => {
        this.tableData = res.data.list;
        this.pagecount = res.data.count
      })
      .catch(req => {
        console.log(req);
      });
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.listbox {
  margin: 30px;
  .avart{
    width: 40px;
    height: 40px;
    border-radius: 50%; 
  }
}
</style>
