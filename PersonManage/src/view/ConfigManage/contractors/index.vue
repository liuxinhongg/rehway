<template>
  <div class="contractors">
    <!-- 搜索 -->
    <el-form :inline="true" :model="contractform" class="demo-form-inline">
      <el-form-item label="项目编码：">
        <el-input v-model="contractform.projectCode" placeholder="项目编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button @click="addcontract">+新增参见单位</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表显示信息 -->
    <div class="alltable">
      <el-scrollbar style="height:100%;">
        <el-table :data="trainData" border style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column type="index" width="120" label="序号"></el-table-column>  
          <el-table-column prop="corpName" label="企业名称">
            <template slot-scope="scope">
              <el-tooltip trigger="hover" placement="top">
                <div slot="content">{{ scope.row.corpName }}</div>
                <div class="boxInput">{{ scope.row.corpName }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="corpCode" label="组织机构代码"></el-table-column>
          <el-table-column prop="corpTypeName" label="参建类型"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.sub_id)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemnum"
        layout="prev, pager, next, jumper"
        :total="countnum"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contractform: {
        projectCode: ""
      },
      trainType: [
        { label: "安全教育", type: "one" },
        { label: "入场教育", type: "two" },
        { label: "退场教育", type: "three" },
        { label: "技能培训", type: "four" }
      ],
      trainData: [
      ],
      // 分页
      currentPage: 1,
      itemnum: 10,
      countnum: 1,
      editId:''
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    search() {
      this.$http.get("/api/prj_sub/sub_select_bycode",{params:{prjCode:this.contractform.projectCode,page:this.currentPage,num:this.itemnum}}).then(res => {
        console.log(res);
          this.trainData = res.data.list;
          let leng = res.data.count;
          this.countnum=leng;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.$http.get('/api/prj_sub/sub_select_list',{params:{page:this.currentPage,num:this.itemnum}}).then(res=>{
        console.log(res);
        this.trainData = res.data.PrjSubInfos;
        let leng = res.data.count;
        this.countnum=leng;
      })
    },
    addcontract() {
      this.$router.push({ path: "/project/addeditcont?id=0" });
    },
    // 编辑
    handleClick(id) {
      console.log(id);
      this.$router.push({ path: "/project/addeditcont?id=" + id });
    }
  },
  mounted() {
      this.$http.get("/api/prj_sub/sub_select_list",{params:{page:this.currentPage,num:this.itemnum}}).then(res => {
          this.trainData = res.data.PrjSubInfos;
            console.log(res);
            let leng = res.data.count;
            this.countnum=leng;
      });
  }
};
</script>

<style lang="scss">
.contractors {
  width: 95%;
  margin: 20px auto;
  .alltable {
    width: 100%;
    height: calc(100vh - 280px);
    .boxInput {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
<style>
.contractors .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>