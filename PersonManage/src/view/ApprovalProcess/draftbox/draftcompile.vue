<template>
  <div>
    <p class="persontop">草稿箱详情</p>
    <div class="drafdetail">
      <el-form >
        <table border="1" class="tableinsert" >
            <tr>
                <td class="tdleft">标题：</td>
                <td colspan="3"> {{detailData.subject}} </td>
            </tr>
            <tr>
                <td class="tdleft">姓名：</td>
                <td> {{detailData.userName}} </td>
                <td class="tdleft">班组：</td>
                <td> {{detailData.className}} </td>
            </tr>
            <tr>
                <td class="tdleft">请假类型：</td>
                <td> 
                  {{detailData.leaveType=='01' ? '事假' : detailData.leaveType=='02' ? '病假' : detailData.leaveType=='03' ? '婚假' : detailData.leaveType=='04' ? '丧假' :
                    detailData.leaveType=='05' ? '产假' : detailData.leaveType=='06' ? '陪产假' : '其他' }}
                </td>
                <td class="tdleft">所在部门：</td>
                <td> {{detailData.departmentName}} </td>
            </tr>
            <tr>
                <td class="tdleft">请假日期：</td>
                <td> {{detailData.leaveDate}} </td>
                <td class="tdleft">请假时长：</td>
                <td> {{detailData.leaveDay}}（天） </td>
            </tr>
            <tr>
                <td class="tdleft">负责人：</td>
                <td> 杨玉环 </td>
                <td class="tdleft">审批状态：</td>
                <td> 未审批 </td>
            </tr>
            <tr>
                <td class="tdleft">请假原因：</td>
                <td colspan="3"> {{detailData.leaveReason}} </td>
            </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as personapi from '@/api/usercenter.js'
export default {
  data() {
    return {
      detailData: {},
      Id:'',
      teamName:'',
    };
  },
  methods: {
    getdetail(){
      this.$http.get(personapi.draftde,{params:{id:this.$route.query.id,}}).then(res=>{
        console.log(res);
        this.detailData=res.data.leaveBill;
      })
    }
  },
  mounted(){
    this.getdetail();
    this.teamName=localStorage.getItem('teamName');    
  }
};
</script>

<style lang="scss">
.drafdetail {
  width: 80%;
  margin: 40px auto;
  .topImg {
    width: 35%;
    margin: auto;
    img {
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
