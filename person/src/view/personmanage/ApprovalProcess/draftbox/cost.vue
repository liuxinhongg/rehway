/*
 * @Author:谢莹
 * @Date: 2019-05-12 
 * @function 财务报销模块
 */
<template>
  <div class="leave">
    <p class="persontop">财务报销详情</p>
    <el-form :model="sleaveform" :rules="rules" ref="sleaveform" class="demo-sleaveform">
        <table border="1" class="tableinsert" style="width:95%;">
            <tr>
                <td class="tdleft">姓名：</td>
                <td style="width:40%"> 
                  <el-form-item >
                    <el-input v-model="sleaveform.userName" style="width:280px" ></el-input>
                  </el-form-item>
                </td>
                <td class="tdleft">审批人：</td>
                <td > 
                  <el-form-item prop="leaderNext" >
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
            <el-button @click="saveForm()">取消</el-button>
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
        leaderNext: [
            { required: true, message: "审批人不能为空", trigger: 'change' }
        ],
        amount:[ 
          { required: true, message: "请输入报销金额", trigger: "blur" },
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,message:'请输入正确的报销金额，小数点不超过两位' } 
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
            if(this.sleaveform.leaderNext ==''){
                alert('审批人不能为空')
            }else{
                this.leaveform.append('id',this.sleaveform.id)
                this.leaveform.append('userId',this.sleaveform.userId)
                this.leaveform.append('amount',this.sleaveform.amount)
                this.leaveform.append('feeType',this.sleaveform.feeType)
                this.leaveform.append('remark',this.sleaveform.remark)
                this.leaveform.append('leaderNext',this.sleaveform.leaderNext)
                this.$http.post(personapi.reimbursesub,this.leaveform).then(res=>{
                  if(res.data.result=='success'){
                    this.$router.push({path:'/project/draftbox'});
                  }                                    
                })
            }
          
        } else {
          return false;
        }
      });
    },
    saveForm(formName) {
      this.$router.go(-1);
      
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
    },
    dataall(){
      let data={
        id:this.id,
        flowType:this.type
      }
      this.$http.get(personapi.draftde,{params:data}).then(res=>{
        if(res.data.result == "error: 参数 [id] 或 [flowType] 不能为空！"){
          alert('查询错误')
        }
        if(res.data.result == 'success'){
          this.sleaveform = res.data.bill
          // if(typeof(res.data.bill.userId) == 'string'){
          //   this.sleaveform.userId = res.data.bill.userId.toNumber();
          // }
        }
      })
    },
    
  },
  created() {},
  mounted() {
      this.getdep();
      this.getperson();
      this.teamconfig();
      this.username=sessionStorage.getItem('username');
      this.teamName=sessionStorage.getItem('teamName');
      this.id = this.$route.query.id
      this.type = this.$route.query.type
      this.dataall()

      // 查详情
      
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.leave {
  width:90%;
  margin: 0 auto;
}
</style>
