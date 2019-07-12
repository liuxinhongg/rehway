<template>
  <div>
    <p class="persontop">草稿箱请假详情</p>
    <div class="drafdetail">
     <el-form :model="detailData" :rules="rules" ref="detailData">
        <table border="1" class="tableinsert" >
            <tr>
                <td class="tdleft">姓名：</td>
                <td style="width:40%"> 
                  <el-form-item >
                    <el-input v-model="detailData.userName" ></el-input>
                  </el-form-item>
                </td>
                <td class="tdleft">班组：</td>
                <td>
                  <el-form-item >
                    <el-input v-model="detailData.className"></el-input>
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">请假类型：</td>
                <td> 
                  <el-form-item>
                    <el-radio-group v-model="detailData.leaveType">
                      <el-radio label="01">事假</el-radio>
                      <el-radio label="02">病假</el-radio>
                      <el-radio label="03">婚假</el-radio>
                      <el-radio label="04">丧假</el-radio>
                      <el-radio label="05">产假</el-radio>
                      <el-radio label="07">其他</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </td>
                <td class="tdleft">所在部门：</td>
                <td>
                  <el-form-item >
                    <el-input v-model="detailData.departmentName"></el-input>
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">请假日期：</td>
                <td>
                  <el-form-item>
                      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="detailData.leaveDate"  type="datetime"  :picker-options="pickerOptions" placeholder="选择日期时间"> </el-date-picker>
                    </el-form-item>
                </td>
                <td class="tdleft">请假时长：</td>
                <td> 
                  <el-form-item prop="leaveDay">
                      <el-input v-model="detailData.leaveDay" type="number" placeholder="输入请假时天数" style="width:80%"></el-input>（天） 
                  </el-form-item>
                  </td>
            </tr>
            <tr>
                <td class="tdleft">审批人：</td>
                <td> 
                  <el-form-item>
                      <el-select v-model="detailData.leaderNext" style="width:280px">
                          <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                          </el-option>
                      </el-select>
                    </el-form-item>
                </td>
                <td class="tdleft">审批状态：</td>
                <td> 未审批 </td>
            </tr>
            <tr>
                <td class="tdleft">请假原因：</td>
                <td colspan="3">
                  <el-form-item prop="leaveReason">
                        <el-input type="textarea" :rows="2" v-model="detailData.leaveReason"></el-input>
                    </el-form-item>
                </td>
            </tr>
        </table>
        <el-form-item style="text-align:center;">
          <el-button @click="renewleave()" type="primary">重新请假</el-button>
          <el-button @click="sub" >取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as personapi from '@/api/usercenter.js'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      personoption:[],
      // 请假详情弹框数据
      detailData:{
        leaderNext:'',
        className: "",
        departmentName: "",
        leaveDate: "",
        leaveDay: "",
        leaveReason: "",
        leaveType: "",
        subject: "",
        userId: "",
        userName: "",
        id:'',
      },
      rules: {
        leaveType: [
             { required: true, message: "请输入请假类型", trigger: "change" }
        ],
        userId: [
            { required: true, message: '请选择请假人', trigger: 'change' }
        ],
        leaveDate: [
            { required: true, message: '请选择请假日期', trigger: 'change' }
        ],
        status: [
        { required: true, message: '请选择请假类型', trigger: 'change' }
        ],
        leaveDay:  [ 
          { required: true, message: "请输入请假时长", trigger: "blur" },
          { pattern: /^([1-9]|[1-9]\d|1\d{2}|200)$/,message:'请输入1-200' } 
        ],
        leaveReason: [
           { required: true, message: "请输入请假原因", trigger: "change" }
        ], 
        leaderNext: [
          { required: true, message: "请选择审批人", trigger: "change" }
        ]},
      Id:'',
      teamName:'',
    };
  },
  methods: {
    sub(){
      this.$router.go(-1);
    },
    getdetail(){
      this.$http.get(personapi.draftde,{params:{id:this.$route.query.id,}}).then(res=>{
        this.detailData=res.data.leaveBill;
      })
    },
    detaildraft(id,type){
      this.$http.get(personapi.draftde,{params:{id:id,flowType:type}}).then(res=>{
        this.detailData=res.data.bill;
      })
    },
    getperson(){
        this.$http.get('/api/user/user_select').then(res=>{
            this.personoption=res.data.list;
        })
    },
     renewleave(){
      if(this.detailData.leaderNext==''||this.detailData.leaderNext==null){
        this.$message.error('请选择审批人');
      }else{
        this.$http.get(personapi.leavesub,{params:this.detailData}).then(res=>{
          if(res.data.result == 'success'){
            this.$router.push('/project/draftbox')
          }                                    
        })
      }
    }
  },
  mounted(){
    // this.getdetail();
    this.getperson()
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.detaildraft(this.id,this.type);
    this.teamName=sessionStorage.getItem('teamName');    
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
