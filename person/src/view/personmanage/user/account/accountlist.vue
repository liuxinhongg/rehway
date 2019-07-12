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
          <el-button @click="accadd()" type="success">+ 添加</el-button>
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
        <el-table-column prop="workerId" label="工号" ></el-table-column>
        <el-table-column prop="idCardNumber" label="身份证号"></el-table-column>
        <el-table-column label="注册考勤机状态">
          <template slot-scope="scope"> {{scope.row.attendLogin=="true" ? "已注册" : "未注册"}} </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.workerId)" type="text" size="small" style="color:#09f !important" >详情</el-button>
              <el-button type="text" size="small" @click="registerClick(scope.row.workerId)">注册设备人员</el-button>
              <!-- <el-button type="text" v-show="!registeruser" disabled size="small" >已注册设备人员</el-button> -->
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
            <el-input v-model="equipform.pass" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="equipform.workerName" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="ID">
            <el-input v-model="equipform.id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="卡号：">
            <el-input v-model="equipform.idcardNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  style="text-align:center;">
            <el-button type="primary" @click="registersubmit()" native-type="submit">注册考勤机用户</el-button>
            <el-button type="primary" @click="avatersubmit()" native-type="submit">注册图片</el-button>
            <el-button @click="registerVisible = false">取 消</el-button>
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
      itemnum: 10,
      currentPage: 1,
      pagecount: 1,
      // registeruser: true,
      registerVisible:false,
      input: "",
      isDisabled:true,
      tableData: [],
      attanstatus:'',
      imgurl:'',
      equipform:{
        workerName:'',
        id:'',
        headImage:'',
        idcardNum:'',
        pass:''
      },
      // pass:'12345678',
      getpersonId:'',
    };
  },
  watch: {},
  computed: {},
  methods: {
    registersubmit(){
      let that=this;
      let persondata={
        id:that.equipform.id,
        name:that.equipform.workerName,
        idcardNum:that.equipform.idcardNum
      }
      let numdata=that.$qs.stringify({ pass:that.equipform.pass,person:JSON.stringify(persondata)});
      that.$http.post('/equip/person/create',numdata, { headers : { 'Content-Type':'application/x-www-form-urlencoded' }}).then(res=>{
        console.log(res);
        if(res.data.msg=='创建成功'){
          that.attanstatus='创建成功'
          that.$message.success('创建成功');
          that.getdataall();
          that.disabled=false;
          // that.$http.get('/api/check_per/per_inseret_info',{params:res.data.data}).then(res=>{
          //   console.log(res);
          // })
          that.registerVisible=false;
        }else{
          that.$message.error('注册失败');
        }
      })
    },
    avatersubmit(){
      if(this.getpersonId){
        let register=new FormData();
        register.append('pass',this.equipform.pass)
        register.append('personId',this.getpersonId+'')
        this.$http.post('/equip/face/takeImg',register).then(res=>{
          console.log(res);
          if(res.data.msg=="正在执行"){
            this.registerVisible=false;
            // this.registeruser=false;
          }
        })
      }
    },
    handleClick(row) {
      this.$router.push('/project/details?id='+row)
    },
    registerClick(id){
      this.getpersonId=id;
      console.log(id);
      this.getpersonId=id;
      this.registerVisible=true;
      this.$http.post('/api/user/select?workerId='+this.getpersonId).then(res=>{
        console.log(res);
        this.equipform.workerName=res.data.list[0].workerName;
        this.equipform.id=res.data.list[0].workerId;
        this.equipform.headImage=res.data.list[0].headImage;
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
      this.$http.get("/api/user/user_select_all", { params: data }).then(res => {
        console.log(res);
        this.tableData = res.data.list;
        this.pagecount = res.data.count
      }).catch(req => {
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
