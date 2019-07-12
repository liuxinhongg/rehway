// 授权分类

<template>
  <div class="rolemanagement">
    <el-form :inline="true" :model="equipform" class="demo-form-inline" >
      <el-form-item label="设备IP：">
        <el-input v-model="equipform.id"></el-input>
      </el-form-item>
      <el-form-item label="设备进出场状态：" >
        <el-select v-model="equipform.state">
          <el-option v-for="item in statustype" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
          <el-button @click="addequip">+新建</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" border :data="equipData">
      <el-table-column type="index" width="120" label="序号"></el-table-column>      
      <el-table-column prop="name" label="设备机名称"></el-table-column>
      <el-table-column prop="serial" label="设备机序列号"></el-table-column>
      <el-table-column prop="ip" label="设备机IP"></el-table-column>
      <el-table-column label="进出场状态">
        <template slot-scope="scope">
          {{scope.row.state==1 ? "进场" : "出场"}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edithandle(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemsize"
        layout="prev, pager, next, jumper"
        :total="totlenum"
      ></el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      totlenum:1,
      itemsize:10,
      currentPage: 1,
      multipleTable: [],
      equipform: {
        id: "",
        state:'',
      },
      statustype:[
        {label:'进场',value:'1'},
        {label:'出场',value:'2'},
      ],
      equipData: [],
      multipleSelection:[],
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.getquipdata();
    },
    edithandle(id){
      // this.$confirm('确定要编辑该设备信息？, 是否继续?', '提示',
      // { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
        this.$router.push({path:'/project/equipdetail?id='+id})
      // }).catch(() => {
      //   this.$message({ type: 'info', message: '已取消编辑'});          
      // });
    },
    // 新增
    addequip(){
      this.$router.push({path:'/project/equipdetail?id=0'});
    },
    searchSubmit() {
      this.getquipdata()
    },
    getquipdata(){
      let data={
        num:this.itemsize,
        page:this.currentPage,
        id:this.equipform.id,
        state:this.equipform.state,
      }
      this.$http.get('/api/attendance_machine/attend_machine_selectby',{params:data}).then(res=>{
        console.log(res);
        this.equipData=res.data.list;
        var leng=res.data.count;
        this.totlenum=leng
      })
    },
    
  },
  created() {},
  mounted() {
    this.getquipdata();
    
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.rolemanagement {
  width: 90%;
  margin: 0 auto;
}
</style>
