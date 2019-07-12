// 角色管理

<template>
  <div class="rolemanagement">
    <el-form>
      <el-form-item>
          <el-button @click="addbuildrole">+新建</el-button>
        <el-button>导出</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable"  border :data="multipleTable" tooltip-effect="dark">
      <el-table-column prop="mId" label="编号" width="200"></el-table-column>
      <el-table-column prop="mname" label="名称"></el-table-column>
      <el-table-column width="120px" label="操作">
        <template slot-scope="scope">
            <el-button type="text" @click="deletehandle(scope.row.mId)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="1"
        layout="prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </div>
    <el-dialog title="新增角色" :visible.sync="addroleVisible" width="30%" center>
      <el-form ref="addrole" :model="addrole" label-width="80px" style="width:80%;margin:auto" @submit.native.prevent> 
        <el-form-item label="名称：">
          <el-input v-model="addrole.mname"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input type="textarea" v-model="addrole.coment"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" native-type="submit" @click="onSubmit">保存</el-button>
            <el-button @click="addroleVisible = false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
  </div>
</template>
<script type="text/ecmascript-6">
import * as rolemanage from '@/api/personmanage'
export default {
  components: {},
  props: {},
  data() {
    return {
      // 新增
      addrole: {
        desc: '',
        coment: ''
      },
      addroleVisible:false,
      multipleTable: [],
      currentPage: 1,
      undidsearch: {
        ywlc: ""
      },
      form: [
        {
          user: "zhangsan",
          id:12
        },
        {
          user: "lisi",
          id:22
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 新增
    addbuildrole(){
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
    },
    //新增
    onSubmit() {
      let data={
        mname:this.addrole.mname,
        coment:this.addrole.coment,
      }
      this.$http.get(rolemanage.addroleData,{params:data}).then(res=>{
        console.log(res);
        if(res.data.result="success"){
          this.addroleVisible=false;
          this.AllData();
        }
      })
    },
    AllData() {
      this.$http.post(rolemanage.roleData).then(res=>{
        console.log(res);
        this.multipleTable=res.data;
      })
    },
  },
  created() {},
  mounted() {
    this.AllData();
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.rolemanagement {
  width: 95%;
  margin: 20px auto;
}
</style>
