// 授权分类

<template>
  <div class="rolemanagement">
    <p class="toptext">设备列表</p>
    <el-form :inline="true" :model="equipform" class="demo-form-inline" style="margin-top:20px;">
      <el-form-item>
        <span>设备IP：</span>
        <el-input v-model="equipform.id" placeholder="请输入设备IP" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <span>设备进出场状态：</span>
        <el-select v-model="equipform.state">
          <el-option style="width:200px;" v-for="item in statustype" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
          <el-button @click="addequip" type="success">+新建</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" border :data="equipData">
      <el-table-column type="index" width="120" label="序号"></el-table-column>      
      <el-table-column prop="name" label="设备机名称" sortable></el-table-column>
      <el-table-column prop="serial" label="设备机序列号" sortable></el-table-column>
      <el-table-column prop="ip" label="设备机IP" sortable></el-table-column>
      <el-table-column label="进出场状态">
        <template slot-scope="scope">
          {{scope.row.state==1 ? "进场" : "出场"}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-button type="text" @click="edithandle(scope.row.id)"><i class="iconfont icon-edit"></i>编辑</el-button>
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
        this.$router.push({path:'/project/equipdetail?id='+id})
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
