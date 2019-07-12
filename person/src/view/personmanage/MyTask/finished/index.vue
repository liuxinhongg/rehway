<template>
  <div class="undidhome">
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline">
      <el-form-item >
        <span>标题：</span> <el-input v-model="undidsearch.ywlc" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit" icon="el-icon-search" >查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button @click="exportexecl">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="undidData" border :row-class-name="tableRowClassName">
      <el-table-column type="index" label="编号" width="100"></el-table-column>
      <el-table-column prop="name" label="标题" sortable></el-table-column>
      <el-table-column prop="processDefinitionId" label="流程定义"></el-table-column>
      <el-table-column prop="startTime" label="创建时间"></el-table-column>
      <el-table-column prop="endtime" label="结束时间"></el-table-column>
      <el-table-column prop="lengthtime" label="持续时间" sortable></el-table-column>
      <!-- <el-table-column prop="status" label="状态" width="120"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <router-link to> 
            <span style="color:#E6A23C"><i class="iconfont iconcancle"></i> 撤回</span> 
          </router-link>
          <!-- to="/project/finisheddetail" -->
          <router-link to>
            <el-button type="text" icon="el-icon-info">详情</el-button> 
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </div>
    <!-- 转发的弹框 -->
    <el-dialog title="转发对象" :visible.sync="linkman" width="16%" center>
      <el-form :model="modelform" class="demo-form-inline" :inline="true">
        <el-form-item label>
          <el-input placeholder="请输入内容" v-model="modelform.name">
            <template slot="append">
              <i class="iconfont icon-username"></i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="linkman = false">取 消</el-button>
        <el-button type="primary" @click="linksubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkman: false,
      currentPage: 1,
      undidsearch: {
        ywlc: ""
      },
      modelform: {
        name: ""
      },
      undidData: [
        {
          businessKey: "366093996195840",
          name: "请假流程-临远-2019-03-20 09:22",
          processDefinitionId: "请假流程",
          startTime: "2019-03-20 09:22:01",
          endtime: "2019-03-20 17:53:39",
          lengthtime: "37分33秒",
          id: 11
        },
        {
          businessKey: "364979951697920",
          name: "资产申请-临远-2019-03-19 14:28",
          processDefinitionId: "资产申请",
          startTime: "2019-03-20 09:22:01",
          endtime: "2019-03-20 17:53:39",
          lengthtime: "4时33分39秒",
          id: 12
        }
      ]
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
    searchSubmit() {},
    exportexecl() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 转发
    transpond(id) {
      console.log(id);
      this.linkman = true;
    },
    linksubmit() {
      this.transpond = false;
    }
  }
};
</script>

<style>
.undidhome {
  width: 90%;
  margin: 20px auto;
}
</style>
