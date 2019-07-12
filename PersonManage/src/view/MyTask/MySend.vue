<template>
  <div>
    <!-- <top></top>
        <div class="containerpage">
            <left></left>
    <div class="mainmajor">-->
    <el-table :data="unfinishData" class="unfindTable" border :row-class-name="tableRowClassName">
      <el-table-column label="发布者头像" width="100">
        <template slot-scope="scope">
          <div class="OImg">
            <!-- <img :src="scope.row.Avater" alt="" srcset=""> -->
            <img src="../../assets/images/userImg.jpg" alt srcset>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="发布者" width="200"></el-table-column>
      <el-table-column label="任务标题" width="400">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.title }}</div>
            <div class="boxInput">{{ scope.row.title }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="sendTime" label="发布时间" width="250"></el-table-column>
      <el-table-column prop="endTime" label="截止时间" width="250"></el-table-column>
      <el-table-column label="操作">
        <template style="overflow:visible;">
          <el-button
            @click="visiblecheck=true"
            size="small"
            style="padding: 5px;border:1px solid #409eff;color:#409eff"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- </div>
    </div>-->
    <el-dialog title="查看" :visible.sync="visiblecheck" width="30%" center>
      <div class="checkout">
        <div class="chechlist">
          <p>发布者头像：</p>
          <div class="OImg" style="width:65px;">
            <img src="../../assets/images/userImg.jpg" alt srcset>
          </div>
        </div>
        <div class="chechlist">
          <p>发布者：</p>
          <p>刘新红</p>
        </div>
        <div class="chechlist">
          <p style="width:227px;">发布标题：</p>
          <p>周一你好，很高兴认识你，往后的周一请多指教,往后的周一请多指教,往后的周一请多指教,往后的周一请多指教</p>
        </div>
        <div class="chechlist">
          <p>发布时间：</p>
          <p>2019-03-11 15:52</p>
        </div>
        <div class="chechlist">
          <p>截止时间：</p>
          <p>2019-03-22 15:22</p>
        </div>
      </div>
    </el-dialog>
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
      unfinishData: [
        {
          Avater: "../../assets/images/userImg.jpg",
          username: "刘新红",
          title:
            "周一你好，很高兴认识你，往后的周一请多指教,往后的周一请多指教,往后的周一请多指教,往后的周一请多指教",
          endTime: "2019-03-22 15:22",
          sendTime: "2019-03-11 15:52",
          dostatus: "未读"
        }
      ],
      visiblecheck: false
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
    }
  }
};
</script>
<style lang="scss">
.unfinished {
  width: 90%;
  margin: 20px auto;
  .unlist {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #ccc;
    .OImg {
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      border-right: 1px solid #ccc;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .userInfo {
      width: 20%;
    }
  }
}
.unfindTable {
  width: 90%;
  margin: 20px auto;
  .el-table_1_column_6 .cell {
    overflow: visible;
  }
  .boxInput {
    cursor: pointer;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.OImg {
  width: 80px;
  height: 50px;
  text-align: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.checkout {
  width: 80%;
  height: auto;
  margin: 10px auto;
  margin-bottom: 20px;
  .chechlist {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
    font-size: 15px;
    p:nth-child(1) {
      width: 100px;
      text-align: right;
      color: #5e5e5e;
      font-weight: bold;
    }
    p:nth-child(2) {
      color: #808080;
      font-weight: bold;
      margin-left: 10px;
    }
  }
}
</style>