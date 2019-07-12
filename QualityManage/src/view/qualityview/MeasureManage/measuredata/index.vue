<template>
  <div>
    <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item label="负责人：" prop="resman" style="margin-left:30px;">
          <el-select v-model="sousou.resman">
            <el-option
              v-for="(item,index) in personoption"
              :key="index"
              :value="item.workerId"
              :label="item.workerName"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item prop="locId"  label="检查部位：">
        <el-select v-model="sousou.locId" style="width:280px">
          <el-option
            v-for="(item,index) in locname"
            :key="index"
            :value="item.id"
            :label="item.locName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button @click="addfile">+新增数据</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="hiddenpageData"
      tooltip-effect="dark"
      border
      style="width: 90%;margin:auto;"
    >
      <el-table-column label="测量日期" prop="mdate"></el-table-column>
      <el-table-column label="项目" prop="prjIdName"></el-table-column>
      <el-table-column label="项目负责人" prop="resmanName"></el-table-column>
      <el-table-column label="分部分项" prop="subItemPrjs"></el-table-column>
      <el-table-column label="检查部位" prop="locIdName"></el-table-column>
      <el-table-column label="验收人员1" prop="mman1Name"></el-table-column>
      <el-table-column label="验收人员2" prop="mman2Name"></el-table-column>
      <el-table-column label="验收人员3" prop="mman3Name"></el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyfile(scope.row.id)">编辑</el-button>
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
        :total="totalnum"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import * as qualitymanage from "@/api/qualityapi.js";
import formatDate from "@/filter/date.js";
import * as dictapi from "@/api/dictapi.js";

export default {
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      statusoption: [],
      hiddentypeoption: [],
      zoneoption: [],
      currentPage: 1,
      itemnum: 15,
      totalnum: 0,
      sousou: {
        locId: "",
        resman:'',
      },
      hiddenpageData: [],
      personoption: [],
      locname: []
    };
  },
  methods: {
    // 检查部位
    searchlocal() {
      this.$http.post("/api/location/selectAll").then(res => {
        // console.log(res);
        this.locname = res.data.list;
      });
    },
    dataAll() {
      let data = {
        page: this.currentPage,
        num: this.itemnum,
        locId:this.sousou.locId,
        resman:this.sousou.resman
      };
      this.$http
        .get(qualitymanage.measurselectBy, { params: data })
        .then(res => {
          this.totalnum = res.data.count;
          this.hiddenpageData = res.data.list;
        });
    },
    // 新增
    addfile() {
      this.$router.push({ path: "/qualitymanage/measureadd?id=0" });
    },
    // 表格中的修改
    modifyfile(id) {
      this.$router.push({ path: "/qualitymanage/measureadd?id=" + id });
    },
    sousoubtn() {
        this.dataAll();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.dataAll();
    },
    //隐患类型
    hiddentypedata() {
      this.$http.post("/api/dict/rist_type").then(res => {
        this.hiddentypeoption = res.data.list;
      });
    },
    statusdata() {
      this.$http.post("/api/dict/rist_danger_state").then(res => {
        this.statusoption = res.data;
      });
    },
    // 隐患区域
    zonedata() {
      this.$http.post("/api/location/selectBytitle?name=").then(res => {
        this.zoneoption = res.data.result;
      });
    },
    uploadperson() {
      this.$http.get(dictapi.user).then(res => {
        // console.log(res);
        this.personoption = res.data.list;
      });
    }
  },
  mounted() {
    this.statusdata();
    this.hiddentypedata();
    this.zonedata();
    this.dataAll();
    this.uploadperson();
    this.searchlocal();
  }
};
</script>
<style lang="scss">
.searchfrom {
  width: 90%;
  margin: auto;
  margin-top: 20px;
}
.fileupload {
  width: 90%;
  margin: 10px auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.boxInput {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
