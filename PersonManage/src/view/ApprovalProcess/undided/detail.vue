/*
 * @Author:刘新红
 * @Date: 2019-05-15 
 * @Function: 待办任务详情 
 */
<template>
  <div>
    <div class="undodetail">
      <el-scrollbar style="height:100%;">
        <p class="persontop">待办任务详情</p>
        <div class="topImg">
          <img src="../../../assets/images/liucheng.png">
        </div>
        <el-form >
          <table border="1" class="tableinsert" >
              <tr>
                  <td class="tdleft">姓名：</td>
                  <td> 高宇航 </td>
                  <td class="tdleft">班组：</td>
                  <td> 水利组 </td>
              </tr>
              <tr>
                  <td class="tdleft">请假类型：</td>
                  <td> 事假 </td>
                  <td class="tdleft">所在部门：</td>
                  <td> 测量组 </td>
              </tr>
              <tr>
                  <td class="tdleft">开始时间：</td>
                  <td> 2019-03-13 </td>
                  <td class="tdleft">请假时长：</td>
                  <td> 4（天） </td>
              </tr>
              <tr>
                  <td class="tdleft">负责人：</td>
                  <td> 杨玉环 </td>
                  <td class="tdleft">审批状态：</td>
                  <td> 未审批 </td>
              </tr>
              <tr>
                  <td class="tdleft">请假原因：</td>
                  <td colspan="3"> 因为家里有事 </td>
              </tr>
          </table>
        </el-form>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import * as personapi from '@/api/usercenter.js'
export default {
  data() {
    return {
      detailData: [],
      detailId:'',
      InId:'',
    };
  },
  methods: {
    getformdata(){
    console.log(this.detailId,this.InId)
      let dedata={
        id:this.detailId,
        processInstanceId:this.InId
      }
      this.$http.get(personapi.inqueryde,{params:dedata}).then(res=>{
        console.log(res);
        if(res.data.result="success"){
          // this.$message.success('数据请求成功')
        }
      })
    }
  },
  mounted(){
    this.detailId=this.$route.query.id;
    this.InId=this.$route.query.InId;
    console.log(this.InId)
    this.getformdata();
    eventBus.$on('eventBusName', function(val) {
      console.log(val)
    }) 
  }
};
</script>

<style lang="scss">
.undodetail {
  width: 100%;
  margin: auto;
  height: calc(100vh - 100px);
  .topImg {
    width: 55%;
    margin: auto;
    img {
      width: 100%;
      height: 200px;
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
<style>
  .undodetail .el-scrollbar__wrap{overflow-x: hidden;}
</style>