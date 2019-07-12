/*
 * @Author: 刘新红 
 * @Date: 2019-05-12 
 * @function 请假功能模块
 */
<template>
  <div class="leave">
    <p class="persontop">请假申请</p>
    <el-form :model="sleaveform" :rules="rules" ref="sleaveform" class="demo-sleaveform">
        <table border="1" class="tableinsert" style="width:95%;">
            <tr>
                <td class="tdleft">姓名：</td>
                <td style="width:40%;"> 
                  <el-form-item prop="userId">
                    <el-select v-model="sleaveform.userId" style="width:280px">
                        <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                        </el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft">所在班组：</td>
                <td>
                  <el-form-item prop="teamId">
                    <el-select v-model="sleaveform.className" style="width:280px" >
                        <el-option v-for="(item,index) in teamoption" :key="index" :value="item.teamName" :label="item.teamName"> 
                        </el-option>
                    </el-select>
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">请假类型：</td>
                <td>
                    <el-form-item prop="leaveType">
                      <el-radio-group v-model="sleaveform.leaveType">
                        <el-radio label="01">事假</el-radio>
                        <el-radio label="02">病假</el-radio>
                        <el-radio label="03">婚假</el-radio>
                        <el-radio label="04">丧假</el-radio>
                        <el-radio label="05">产假</el-radio>
                        <el-radio label="07">其他</el-radio>
                      </el-radio-group>
                    </el-form-item>
                </td>
                <td class="tdleft">请假天数：</td>
                <td>
                    <el-form-item prop="leaveDay">
                        <el-input v-model="sleaveform.leaveDay" type="number" placeholder="输入请假时天数" style="width:280px;"></el-input>
                    </el-form-item>
                </td> 
            </tr>
            <tr>
                <td class="tdleft">请假日期：</td>
                <td>
                    <el-form-item prop="leaveDate">
                      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="sleaveform.leaveDate"  type="datetime" style="width:280px;" :picker-options="pickerOptions" placeholder="选择日期时间"> </el-date-picker>
                    </el-form-item>
                </td>
                <td class="tdleft">审批人：</td>
                <td>
                    <el-form-item prop="leaderNext">
                        <el-select v-model="sleaveform.leaderNext" style="width:280px">
                            <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                            </el-option>
                        </el-select>
                    </el-form-item>
                </td>
            </tr>
            <tr>
              <td class="tdleft">部门：</td>
                <td>
                  <el-form-item prop="departmentName">
                      <el-select v-model="sleaveform.departmentName" style="width:280px">
                          <el-option v-for="(item,index) in depoption" :key="index" :value="item.departmentName" :label="item.departmentName"> 
                          </el-option>
                      </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft">请假原因：</td>
                <td>
                    <el-form-item prop="leaveReason">
                        <el-input type="textarea" :rows="2" v-model="sleaveform.leaveReason"></el-input>
                    </el-form-item>
                </td> 
            </tr>
        </table>
        <el-form-item style="text-align:center;">
            <el-button @click="submitForm('sleaveform')" type="primary">提交</el-button>
            <el-button @click="saveForm('sleaveform')">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import * as personapi from '@/api/usercenter.js'
import * as dictapi from '@/api/dictapi.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      sleaveform: {
        userId:'',
        leaveType: "",
        leaveDay: "",
        leaveReason:'',
        leaderNext:'',
        status:'',
        leaveDate:'',
        teamId:'',
        depId:'',
        className:'',
        departmentName:'',
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
        leaveDay: [
            { required: true, message: '请输入时长', trigger: 'blur' }
        ],
        leaveReason: [
           { required: true, message: "请输入请假原因", trigger: "change" }
        ], 
      },
      username:'',
      teamName:'',
      depoption:[],//部门
      personoption:[],//人员信息
      teamoption:[],//班组
    };
  },
  watch: {},
  computed: {},
  methods: {
    //提交
    submitForm(formName) {
      console.log(this.sleaveform.userId); 
      this.$refs[formName].validate(valid => {
        if (valid) {
          let leaveform=new FormData();
          leaveform.append('userId',this.sleaveform.userId)
          leaveform.append('leaveDate',this.sleaveform.leaveDate)
          leaveform.append('leaveDay',this.sleaveform.leaveDay)
          leaveform.append('leaveType',this.sleaveform.leaveType)
          leaveform.append('leaderNext',this.sleaveform.leaderNext)
          leaveform.append('status',1)
          leaveform.append('leaveReason',this.sleaveform.leaveReason)
          leaveform.append('departmentName',this.sleaveform.departmentName)
          leaveform.append('className',this.sleaveform.className)
          this.$http.post(personapi.leavesub,leaveform).then(res=>{
            console.log(res);
            if(res.data.result=='success'){
              this.$router.push({path:'/project/dealwith'});
            }                                    
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.sleaveform.userId);
          let drafform=new FormData();
          drafform.append('userId',this.sleaveform.userId)
          drafform.append('leaveDate',this.sleaveform.leaveDate)
          drafform.append('leaveDay',this.sleaveform.leaveDay)
          drafform.append('leaveType',this.sleaveform.leaveType)
          drafform.append('status',0)
          drafform.append('leaveReason',this.sleaveform.leaveReason)
          drafform.append('departmentName',this.sleaveform.departmentName)
          drafform.append('className',this.sleaveform.className)
          this.$http.post(personapi.leave,drafform).then(res=>{
            console.log(res);
            if(res.data.result=='success'){
              this.$router.push({path:'/project/draftbox'})
            }                                    
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取部门
    getdep(){
        this.$http.get('/api/dep/selectBy').then(res=>{
            this.depoption=res.data.list;
        })
    },
    teamconfig(){
        this.$http.get(dictapi.teamconfig).then(res=>{
            this.teamoption=res.data;
        })
    },
    getperson(){
        this.$http.get('/api/user/user_select').then(res=>{
            this.personoption=res.data.list;
        })
    }
    
  },
  created() {},
  mounted() {
      this.getdep();
      this.getperson();
      this.teamconfig();
      this.username=localStorage.getItem('username');
      this.teamName=localStorage.getItem('teamName');
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.leave {
  width:90%;
  margin: 0 auto;
}
</style>
