// 配置管理 用户控件

<template>
  <div class="usercontrol">
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline" style="margin-top:20px;" @submit.native.prevent>
      <el-form-item label="名称：" >
        <el-input v-model.trim="undidsearch.ywlc" placeholder="请输入用户名称" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="searchSubmit" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button>导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="datalist" border class="unfindTable" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="workerName" label="账号" sortable></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.stateType==0?"禁用":"启用"}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
            <el-button type="text" size="small" @click="qxdata(scope.row.workerId)">角色配置</el-button>
            <el-button @click="resetpass(scope.row.workerId)" type="text" size="small">重置密码</el-button>
            <el-button @click="start(scope.row.workerId)" type="text" size="small">{{scope.row.stateType==1?"禁用":"启用"}}</el-button>
            <el-button @click="detaildata(scope.row.workerId)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table> 
    <!-- 设置权限 -->
    <el-dialog :visible.sync="dialogFormVisible">
  <el-form :model="formdata">
    <div style="width:90%;margin:0 auto">
      <el-form-item>
          <el-radio-group v-model="formdata.role" >
            <el-radio  v-for="(item,index) in multipleTable" :key="index" :label="item.roleId" style="margin-bottom:20px;width:150px">{{item.roleName}}</el-radio>
          </el-radio-group>
      </el-form-item>
    </div>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onsubmitqx(formdata.userId)">确  定</el-button>
  </div>
</el-dialog>

<!-- 修改 -->
<el-dialog title="修改密码" :visible.sync="updateform">
  <el-form :model="updatedetail">
    <el-form-item label="请输入旧密码">
      <el-input v-model="updatedetail.oldpass" style="width:400px"></el-input>
    </el-form-item>
    <el-form-item label="请输入新密码">
      <el-input v-model="updatedetail.newpass"  style="width:400px"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="updateform= false">取 消</el-button>
    <el-button type="primary" @click="updata()">确 定</el-button>
  </div>
</el-dialog>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="totol"
        layout="prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import md5 from "js-md5";
import crypto from "crypto";
import * as personapi from '@/api/usercenter.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      formdata:{
        role:'',
      },
      datalist:[],
      permission:[],
      multipleTable:[],
      dialogFormVisible: false,
      updateform:false,
      currentPage: 1,
      totol:12,
      count:1,
      undidsearch: {
        ywlc: ""
      },
      updatedetail:{
        oldpass:'',
        newpass:''
      },
      workid:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 启用
    start(id){
      let data ={
        workerId:id,
      }
       this.$confirm('请确认操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(personapi.userupdatestart,{params:data}).then(res=>{
              console.log(res);
              if(res.data.result == "success"){
                this.$message({
                  type: 'success',
                  message: '成功!'
                });
                this.getall();
              }
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      
    },
    // 角色配置
    onsubmitqx(id){
      let  a = []
      a.push({'roleId' : this.formdata.role})
      let data = {
        userId:id,
        roles:JSON.stringify(a)
      }
      console.log(data);
      this.$http.get(personapi.roleInfosaveRole,{params:data}).then(res=>{
        console.log(res)
        if(res.data.result == "success:[保存用户角色成功]"){
            this.$message('保存用户角色成功');
          this.dialogFormVisible = false

        }
      }).catch(error=>{
        console.log(error)
      })
      
    },
    // 查询用户角色
    qxdata(id){
      this.formdata.userId = id
      this.dialogFormVisible = true
      this.$http.get(personapi.roleInfofindByUserId,{params:{userId:id}}).then(res=>{
        console.log(res)
        if(res.data.result == "Error:未给该用户分配角色！"){
          this.$message('未给该用户分配角色！')
        }
        this.formdata.role = res.data.role[0].roleId
      })
    },
    detaildata(id){
      this.updateform = true;
        this.workid = id
    },
    resetpass(id){
      // console.log(id)
      let data = {
        workerId:id,
        password:md5('123456')
      }
       this.$confirm('确认重置密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(personapi.resetPassword,{params:data}).then(res=>{
            // console.log(res)
            if(res.data.result == "success:[重置密码成功!]"){
              this.$message('重置密码成功');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });          
        });
      console.log(data.password,data.workerId)
    },
    updata(){
      let a = md5(this.updatedetail.oldpass);
      let b = md5(this.updatedetail.newpass);
      console.log(data)
      let data = new FormData()
      data.append('workerId',this.workid)
      data.append('oldPassword',a)
      data.append('newPassword',b)
      this.$http.post('/api/user/changePassword',data).then(res=>{
        console.log(res)
        if(res.data.result == "success:[修改密码成功!]"){
          this.$message('密码修改成功')
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getall();
    },
    searchSubmit() {},
    getrole(){
      this.$http.post("/api/dict/man_type").then(res => {
        // console.log(res);
        this.permission = res.data;
      });
    },
    getall(){
       let data = {
          page:this.currentPage,
          num:this.totol,
          ywlc:this.undidsearch.ywlc,
        }
        this.$http.get(personapi.userall,{params:data}).then(res => {
          console.log(res);
          this.count = res.data.count
          this.datalist = res.data.list;
        });
        this.$http.get(personapi.roleInforoleNameList).then(res=>{
        console.log(res);
        this.multipleTable=res.data.roleList;
      })
    }
  },
  created() {},
  mounted() {
   this.getall();
   this.getrole()
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.usercontrol {
  width: 100%;
  margin: 0 auto;
}
</style>
