/*
 * @Author:谢莹
 * @Date: 2019-05-12 
 * @function 财务报销模块
 */
<template>
  <div class="leave">
    <p class="persontop">财务报销</p>
    <el-form :model="sleaveform" :rules="rules" ref="sleaveform" class="demo-sleaveform">
        <table border="1" class="tableinsert" style="width:95%;">
            <tr>
                <td class="tdleft">姓名：</td>
                <td style="width:40%;"> 
                  {{username}}
                </td>
                <td class="tdleft">审批人：</td>
                <td > 
                  <el-form-item prop="leaderNext">
                    <el-select v-model="sleaveform.leaderNext" style="width:280px">
                        <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                        </el-option>
                    </el-select>
                  </el-form-item>
                </td>
               
            </tr>
            <tr>
               <td class="tdleft">报销金额：</td>
                <td>
                    <el-form-item prop="amount">
                        <el-input v-model="sleaveform.amount" type="number" :min="1" :max="200" placeholder="输入请假时天数" style="width:280px;"></el-input>
                    </el-form-item>
                </td> 
                <td class="tdleft">报销类型：</td>
                <td >
                    <el-form-item prop="feeType">
                      <el-select v-model="sleaveform.feeType" style="width:280px;">
                        <el-option value="01" label="住宿"></el-option>  
                        <el-option value="02" label="吃饭"></el-option>  
                        <el-option value="03" label="旅游"></el-option>  
                      </el-select>  
                    </el-form-item>
                </td>
            </tr>
             <tr>
               <td class="tdleft">附件文件</td>
                <td colspan="3">
                    <el-form-item >
                        <el-upload action="" :file-list="fileList" :multiple=true :http-request="handlefile">
                            <el-button size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">备注：</td>
                <td colspan="3">
                    <el-form-item prop="remark">
                        <el-input type="textarea" :rows="2" v-model="sleaveform.remark"></el-input>
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
      username:'',
      fileList:[],
      sleaveform: {
        userId:'',
        amount: "",
        feeType: "",
        remark:'',
       leaderNext:'',
      },
      leaveform:new FormData(),
      rules: {
        feeType: [
        { required: true, message: '请选择报销类型', trigger: 'change' }
        ],
        amount:  [ 
          { required: true, message: "请输入报销金额", trigger: "blur" },
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,message:'请输入正确的报销金额，小数点不超过两位' } 
        ],
        leaderNext: [
            { required: true, message: "审批人不能为空", trigger: 'change' }
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
    handlefile(par){
            this.leaveform.append('attachment',par.file);
        },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.leaveform.append('userId',this.sleaveform.userId)
          this.leaveform.append('amount',this.sleaveform.amount)
          this.leaveform.append('feeType',this.sleaveform.feeType)
          this.leaveform.append('remark',this.sleaveform.remark)
          this.leaveform.append('leaderNext',this.sleaveform.leaderNext)
          this.$http.post(personapi.reimbursesub,this.leaveform).then(res=>{
            if(res.data.result=='success'){
              this.$router.push({path:'/project/startflow'});
            }                                    
          })
        } else {
          return false;
        }
      });
    },
    saveForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.leaveform.append('userId',this.sleaveform.userId)
          this.leaveform.append('amount',this.sleaveform.amount)
          this.leaveform.append('feeType',this.sleaveform.feeType)
          this.leaveform.append('remark',this.sleaveform.remark)
          this.leaveform.append('leaderNext',this.sleaveform.leaderNext)
          this.$http.post(personapi.reimbursesave,this.leaveform).then(res=>{
            if(res.data.result=='success'){
              this.$router.push({path:'/project/draftbox'})
            }                                    
          })
        } else {
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
     getpersons(){
        this.$http.get(personapi.userId,{params:{workerId:this.sleaveform.userId}}).then(res=>{
            // this.personoption=res.data.list;
            console.log(res)
            this.username = res.data.list[0].workerName
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
      this.sleaveform.userId=sessionStorage.getItem('userId');
      this.getdep();
      this.getperson();
      this.teamconfig();
      this.getpersons();
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.leave {
  width:90%;
  margin: 0 auto;
}
</style>
