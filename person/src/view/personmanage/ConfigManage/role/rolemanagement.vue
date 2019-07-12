// 角色管理
<template>
  <div class="rolemanagement">
    <el-form>
      <el-form-item>
          <el-button @click="addbuildrole" type="success">+新建</el-button>
        <el-button>导出</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable"  border :data="multipleTable" tooltip-effect="dark">
      <el-table-column prop="role" label="编号" width="200"></el-table-column>
      <el-table-column prop="roleName" label="名称"></el-table-column>
      <el-table-column label="状态" sortable>
        <template slot-scope="scope">
          {{scope.row.available == 0 ? "禁用" : "启用"}}
        </template>
      </el-table-column>
      <el-table-column width="250" label="操作">
        <template slot-scope="scope">
            <el-button type="text" @click="distribute(scope.row.roleId)" size="small">分配权限</el-button>
            <el-button type="text" @click="start(scope.row.roleId)" size="small">启用</el-button>
            <el-button type="text" @click="nostart(scope.row.roleId)" size="small">禁用</el-button>
            <!-- <el-button type="text" @click="deletehandle(scope.row.roleId)" size="small">删除</el-button> -->
            <el-button type="text" @click="update(scope.row.roleId)" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="num"
        layout="prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
    <el-dialog title="角色" :visible.sync="addroleVisible" width="30%" center class="visiblerole">
      <el-form ref="addrole" :model="addrole" :rules="rolerules" style="width:80%;margin:auto" @submit.native.prevent> 
        <el-form-item prop="roleName" style="text-align:center;">
         <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span> <el-input v-model.trim="addrole.roleName"  style="width:220px" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item prop="available" style="text-align:center;">
          <span>是否可用：</span>
          <el-select v-model="addrole.available" style="width:220px">
              <el-option label="可用" value="1"></el-option>
              <el-option label="不可用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="role" style="text-align:center;">
          <span>描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
          <el-input type="textarea" v-model.trim="addrole.role" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button v-if="isfalse == false" type="primary" native-type="submit" @click="Submitjs('addrole')">保存</el-button>
          <el-button v-if="isfalse == true" type="primary" native-type="submit" @click="onSubmit('addrole')">保存</el-button>
            <el-button @click="addroleVisible = false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
       <el-form :model="formdata">
          <el-tree ref="tree" :data="limitdata" show-checkbox default-expand-all node-key="permissionId" highlight-current :props="limitProps"> </el-tree>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedNodes">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import * as rolemanage from '@/api/personmanage'
import * as personapi from '@/api/usercenter.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      isfalse:true,
      limitdata: [],
      limitProps: {
        children: 'childList',
        label: 'permissionName',
        id:'permissionId'
      },
      dialogFormVisible: false,
      formdata: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      // 新增
      addrole: {
        desc: '',
        role: '',
        available:''
      },
      addroleVisible:false,
      multipleTable: [],
      currentPage: 1,
      num:10,
      count:1,
      undidsearch: {
        ywlc: ""
      },
      chooseddata:[],
      qxId:'',
      rolerules:{
        roleName:[
            { required: true, message: '请输入名称', trigger: 'blur' },
            {pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/,message:'名称长度不能超过10位'}
        ],
        available:[
            { required: true, message: '请选择是否可用', trigger: 'change' },
        ],
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    distribute(id){
      this.qxId=id
      this.dialogFormVisible = true;
    },
    // 启用
    start(id){
      // available
      let data= {
        roleId:id,
        available:1
      }
       this.$confirm('确认启用吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(personapi.roleInforoleUpdate,{params:data}).then(res=>{
              console.log(res);
              if(res.data.result == "success:[角色更新成功]"){
                this.AllData()
              }
            })
          this.$message({
            type: 'success',
            message: '启用成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          });          
        });
      
    },
    // 禁用
    nostart(id){
      // available
      let data= {
        roleId:id,
        available:0
      }
       this.$confirm('确认禁用吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(personapi.roleInforoleUpdate,{params:data}).then(res=>{
              console.log(res);
              if(res.data.result == "success:[角色更新成功]"){
                this.AllData()
              }
            })
          this.$message({
            type: 'success',
            message: '禁用成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });          
        });
      
    },
    // xiugai
    update(id){
        for(let i in this.multipleTable){
            // console.log(this.multipleTable[i],id)
          if(this.multipleTable[i].roleId == id){
            
            console.log(this.multipleTable[i])
            this.addrole = this.multipleTable[i]
          }
        }
        console.log(this.addrole);
        this.addroleVisible = true
        this.isfalse = false
    },
    // 分配权限
    distribution(id){
      
    },
    // 新增
    addbuildrole(){
      this.isfalse = true
      this.addroleVisible=true;
    },
    // 删除
    deletehandle(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(rolemanage.deleterole+ id).then(res=>{
          console.log(id);
          console.log(res);
          if(res.data.result="success"){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.AllData();
          }else{
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.AllData()
    },
    //新增
    onSubmit(formName) {
      console.log(11)
      this.$refs[formName].validate((valid) => {
        if (valid) {
            let  data={
              role:this.addrole.role,
              roleName:this.addrole.roleName,
              available:this.addrole.available
            }
            console.log(data);
            this.$http.get(personapi.roleInforoleAdd,{params:data}).then(res=>{
              console.log(res);
              if(res.data.result="success"){
                this.addroleVisible=false;
                this.$message('新增角色成功')
                this.AllData();
              }
            })
          }
      })
    },
    Submitjs(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let  data={
            role:this.addrole.role,
            roleName:this.addrole.roleName,
            available:this.addrole.available,
            roleId:this.addrole.roleId
          }
          this.$http.get(personapi.roleInforoleUpdate,{params:data}).then(res=>{
          console.log(res);
            if(res.data.result="success"){
              this.addroleVisible=false;
              this.$message('修改角色成功')
              this.AllData();
            }
          })
        }
      })
    },
    AllData() {
      let data = {
        page:this.currentPage,
        num:this.num,
      }
      // console.log(1)
      this.$http.get(personapi.roleInforoleList,{params:data}).then(res=>{
        console.log(res);
        // console.log(2)
        this.multipleTable=res.data.roleList;
        this.count = res.data.count
      })
      // console.log(3)
    },
    treeAlldata(){
      this.$http.get(personapi.sysPermissionfindAll).then(res=>{
        console.log(res);
        this.limitdata=res.data.permissionList
      })
    },
    getCheckedNodes() {
      var chkIds1 = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
      chkIds1.forEach(item=>{
        this.chooseddata.push({permissionId:item});
      })
      console.log(this.chooseddata);
      this.$http.get(personapi.ssavePermission,{params:{permissions:JSON.stringify(this.chooseddata),roleId:this.qxId}}).then(res=>{
        console.log(res);
        if(res.data.result=="success:[保存角色权限成功]"){
        this.dialogFormVisible = false;
        this.$message.success('角色权限成功');         
        }
      })
    },
    checkedRoleIds(type){
      console.log(type);
      if(type){
        console.log(11);
      }else{
        console.log(22);
      }
    }
  },
  created() {},
  mounted() {
    this.AllData();
    this.treeAlldata();
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.rolemanagement {
  width: 95%;
  margin: 20px auto;
}

</style>
<style>
.visiblerole .el-form-item__error{
    left: 140px;
}
</style>

