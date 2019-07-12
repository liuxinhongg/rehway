
<template>
  <div class="taskmanage">
    <el-form name="task-infoForm" method="post" :inline="true" class="form-inline">
      <el-form-item label="名称：">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="status">
          <el-option label="进行中" value="active"></el-option>
          <el-option label="完成" value="completed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button @click="rebuild" type="success">+新建</el-button>
        <el-button >删除</el-button>
        <el-button @click="table.exportExcel()">导出</el-button>
      </el-form-item>
    </el-form>
 
    <el-table :data="taskdata" border class="unfindTable">
      <el-table-column prop="priority" label="优先级" width="120"></el-table-column>
      <el-table-column prop="presentationSubject" label="名称" width="250"></el-table-column>
      <el-table-column prop="creator" label="创建人" width="120"></el-table-column>
      <el-table-column prop="assignee" label="负责人" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      
      <el-table-column prop="completeTime" label="完成时间"></el-table-column>
      <el-table-column prop="expirationTime" label="过期时间"></el-table-column>
      <el-table-column prop="status" label="状态" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <router-link to='/project/rebuild'>
            <el-button type="text" size="small">编辑</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage:1,
      taskdata: [
        {
          priority: 50,
          presentationSubject: "印章申请-临远-2019-03-18 09:47",
          creator: "候",
          assignee: "薇薇安",
          createTime: "2019-3-18 9:47:26",
          completeTime: "2019-3-18 9:47:27",
          expirationTime: "2019-3-13 0:00:00",
          status: 1,
          id: 12
        },
        {
          priority: 50,
          presentationSubject: "印章申请-临远-2019-03-18 09:47",
          creator: "候",
          assignee: "薇薇安",
          createTime: "2019-3-18 9:47:26",
          completeTime: "2019-3-18 9:47:27",
          expirationTime: "2019-3-13 0:00:00",
          status: 3,
          id: 43
        },
        {
          priority: 50,
          presentationSubject: "印章申请-临远-2019-03-18 09:47",
          creator: "候",
          assignee: "薇薇安",
          createTime: "2019-3-18 9:47:26",
          completeTime: "2019-3-18 9:47:27",
          expirationTime: "2019-3-13 0:00:00",
          status: 2,
          id: 43
        }
      ]
    };
  },
  methods: {
    toggleSelectedItems() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    rebuild() {
      this.$router.push({ path: "/project/rebuild" });
    }
  }
};
</script>

<style>
.taskmanage {
  width: 90%;
  margin: 20px auto;
}
</style>
