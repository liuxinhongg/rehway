/*********************************************
 * @function: 文件管理---我的分享
 * @filename: 刘新红 
 * @Date: 2019-03-19 
 *********************************************/
<template>
  <div class="myshare">
    <el-table
      ref="multipleTable"
      :data="adverData"
      border
      tooltip-effect="dark"
      style="width: 90%;margin:auto;"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <span class="disk-tool">
            <a href="#" @click="deletefile(scope.row.id)" title="删除">
              <i class="glyphicon glyphicon-remove"></i>
            </a>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="文件名称">
        <template slot-scope="scope">
          <div>
            <a :href="'/project/filedetail?id='+scope.row.id">
              <span class="file-16-name">{{scope.row.name}}</span>
            </a>
            链接:
            <a href="#">{{scope.row.urlhref}}</a>
            <!-- 密码: ${item.sharePassword} -->
            分享类型:
            <span>{{ scope.row.type == 1 ? "公开" : "私密"}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="250">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import top from "@/components/common/HeadTop";
import left from "@/components/common/IndexLeft";
export default {
  components: {
    top,
    left
  },
  data() {
    return {
      adverData: [
        {
          size: "189KB",
          name: "王小虎",
          date: "2019-3-18 10:04:09",
          urlhref: "www.baidu.com",
          type: 1,
          id: 1
        },
        {
          size: "189KB",
          name: "王小虎",
          date: "2019-3-18 10:04:09",
          urlhref:
            "http://localhost:8080/lemon/disk/disk-view.do?id=364806463799296",
          type: 2,
          id: 2
        },
        {
          size: "189KB",
          name: "王小虎",
          date: "2019-3-18 10:04:09",
          urlhref:
            "http://localhost:8080/lemon/disk/disk-view.do?id=364806463799296",
          type: 1,
          id: 3
        },
        {
          size: "189KB",
          name: "王小虎",
          date: "2019-3-18 10:04:09",
          urlhref:
            "http://localhost:8080/lemon/disk/disk-view.do?id=364806463799296",
          type: 2,
          id: 4
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 表格的操作
    // 删除
    deletefile(id) {
      console.log(id);
    }
  }
};
</script>
<style lang="scss">
  .myshare{
    margin-top:20px;
  }
</style>
