<template>
  <div>
    <div class="detail-body">
      <div class="topImg">
        <img src="../../../assets/images/endover.png">
      </div>

      <el-form >
        <table border="1" class="tableinsert" >
            <tr>
                <td class="tdleft">姓名：</td>
                <td> 高宇航 </td>
                <td class="tdleft">班组：</td>
                <td> 水利组 </td>
            </tr>
            <!-- <tr>
                <td class="tdleft">班组：</td>
                <td> 水利组 </td>
            </tr> -->
            <tr>
                <td class="tdleft">请假类型：</td>
                <td> 事假 </td>
                <td class="tdleft">所在部门：</td>
                <td> 测量组 </td>
            </tr>
            <!-- <tr>
                <td class="tdleft">所在部门：</td>
                <td> 测量组 </td>
            </tr> -->
            <tr>
                <td class="tdleft">开始时间：</td>
                <td> 2019-03-13 </td>
                <td class="tdleft">请假时长：</td>
                <td> 4（天） </td>
            </tr>
            <!-- <tr>
                <td class="tdleft">请假时长：</td>
                <td> 4（天） </td>
            </tr> -->
            <tr>
                <td class="tdleft">负责人：</td>
                <td> 杨玉环 </td>
                <td class="tdleft">审批状态：</td>
                <td> 未审批 </td>
            </tr>
            <!-- <tr>
                <td class="tdleft">审批状态：</td>
                <td> 未审批 </td>
            </tr> -->
            <tr>
                <td class="tdleft">请假原因：</td>
                <td colspan="3"> 因为家里有事 </td>
            </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailData: [
        {
          name: "填写请假单",
          createTime: "2019-03-20 09:22:01",
          endTime: "2019-03-20 09:22:01",
          assignee: "临远",
          owner: "金",
          catalog: 1,
          idea: "试试事实上水库"
        },
        {
          name: "填写请假单",
          createTime: "2019-03-20 09:22:01",
          endTime: "2019-03-20 09:22:01",
          assignee: "临远",
          owner: "金",
          catalog: 2,
          idea: "完美告白，为爱转身"
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
    }
  }
};
</script>

<style lang="scss">
.detail-body {
  width: 90%;
  margin: auto;
  .topImg {
    width: 35%;
    margin: auto;
    img {
      // width: 100%;
      margin-bottom: 20px;
    }
  }
  .tdleft{
    width: 10%;
  }
  .panel .table .opinin {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
