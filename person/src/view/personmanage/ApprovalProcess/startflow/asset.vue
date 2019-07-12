/*
 * @Author: 谢莹 
 * @Date: 2019-05-12 
 * @function 资产申请功能模块
 */
<template>
  <div class="leave">
    <p class="persontop">资产申请</p>
    <el-form :model="sleaveform" :rules="rules" ref="sleaveform" class="demo-sleaveform">
        <table border="1" class="tableinsert" style="width:95%;">
            <tr>
                <td class="tdleft">姓名：</td>
                <td style="width:40%;padding:14px"> 
                    {{username}}
                    <!-- <el-input style="width:280px" v-model="username" :disabled="true"></el-input> -->
                </td>
               <td class="tdleft">部门：</td>
                <td style="width:40%;padding:14px">
                  {{depName}}
                    <!-- <el-input style="width:280px" v-model="depName" :disabled="true"></el-input> -->
                  
                </td>
            </tr>
            <tr>
              <td class="tdleft">所在班组：</td>
                <td style="width:40%;padding:14px">
                  {{teamIdName}}
                  <!-- <el-input style="width:280px" v-model="teamIdName" :disabled="true"></el-input> -->

                </td>
               <td class="tdleft">资产类型：</td>
                <td>
                    <el-form-item prop="assetsType">
                        <el-select v-model="sleaveform.assetsType" style="width:280px">
                          <el-option value="01" label="笔记本"></el-option>
                          <el-option value="02" label="A4纸"></el-option>
                          <el-option value="03" label="笔"></el-option>
                          <el-option value="04" label="水杯"></el-option>
                          <el-option value="05" label="椅子"></el-option>
                        </el-select>
                    </el-form-item>
                </td> 
            </tr>
            <tr>
                <td class="tdleft">数量：</td>
                <td>
                     <el-form-item prop="quantity" >
                       <el-input v-model="sleaveform.quantity" type="number" :min="1" :max="999" style="width:280px;"></el-input>
                        <!-- <el-input v-model="sleaveform.quantity" type="number" :min="1" :max="1999" placeholder="输入资产数量" style="width:280px;"></el-input> -->
                    </el-form-item>
                </td>
                <td class="tdleft">资产名称：</td>
                <td>
                    <el-form-item prop="assetsName">
                        <el-input v-model="sleaveform.assetsName"  placeholder="输入资产名称" style="width:280px;"></el-input>
                    </el-form-item>
                </td> 
            </tr>
            
            <tr>
                <td class="tdleft">审批人：</td>
                <td>
                    <el-form-item prop="leaderNext">
                        <el-select v-model="sleaveform.leaderNext" style="width:280px">
                            <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                            </el-option>
                        </el-select>
                    </el-form-item>
                </td>
                <td class="tdleft">备注：</td>
                <td>
                    <el-form-item prop="remark">
                        <el-input type="textarea" :rows="2" v-model="sleaveform.remark"></el-input>
                    </el-form-item>
                </td> 
            </tr>
            <tr>
                
                
            </tr>
        </table>
        <el-form-item style="text-align:center;">
            <el-button
             @click="submitForm('sleaveform')"
              type="primary">提交</el-button>
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
        assetsType: "",
        assetsName: "",
        quantity:'',
        className:'',
        departmentName:'',
        remark:'',
        leaderNext:'',
      },
      rules: {
        assetsType: [
             { required: true, message: "请选择资产类型", trigger: "change" }
        ],
        userId: [
            { required: true, message: '请选择申请人', trigger: 'change' }
        ],
        assetsName: [
            { required: true, message: '请输入资产名称', trigger: 'blur' }
        ],
        quantity: [ 
          { required: true, message: "输入资产数量", trigger: "blur" },
          { pattern: /^[1-9]\d*$/,message:'请输入资产数量' } 
        ],
        leaderNext: [
            { required: true, message: '请选择审批人', trigger: 'change' }
        ],
      },
      username:'',
      teamIdName:'',
      depName:'',
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          let leaveform=new FormData();
          leaveform.append('userId',this.sleaveform.userId)
          leaveform.append('assetsType',this.sleaveform.assetsType)
          leaveform.append('assetsName',this.sleaveform.assetsName)
          leaveform.append('quantity',this.sleaveform.quantity)
          leaveform.append('className',this.sleaveform.className)
          leaveform.append('departmentName',this.sleaveform.departmentName)
          leaveform.append('remark',this.sleaveform.remark)
          leaveform.append('leaderNext',this.sleaveform.leaderNext)
          this.$http.post(personapi.assetssub,leaveform).then(res=>{
            if(res.data.result=='success'){
              this.$router.push({path:'/project/startflow/leave'});
            }                                    
          })
        } else {
          return false;
        }
      });
    },

     saveForm(formName) {
        this.$confirm('是否保存草稿', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$refs[formName].validate(valid => {
            if (valid) {
              let leaveform=new FormData();
              leaveform.append('userId',this.sleaveform.userId)
              leaveform.append('assetsType',this.sleaveform.assetsType)
              leaveform.append('assetsName',this.sleaveform.assetsName)
              leaveform.append('quantity',this.sleaveform.quantity)
              leaveform.append('className',this.sleaveform.className)
              leaveform.append('departmentName',this.sleaveform.departmentName)
              leaveform.append('remark',this.sleaveform.remark)
              leaveform.append('leaderNext',this.sleaveform.leaderNext)
              this.$http.post(personapi.assetssave,leaveform).then(res=>{
                if(res.data.result=='success'){
                  this.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                  this.$router.push({path:'/project/draftbox'})
                }                                    
              })
            } else {
              return false;
            }
          });
        }).catch(() => {
          this.$router.push({path:'/project/startflow/asset'})
          this.$message({
            type: 'info',
            message: '已取消保存'
          });          
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
        this.$http.get(personapi.userId,{params:{workerId:this.sleaveform.userId}}).then(res=>{
            // this.personoption=res.data.list;
            console.log(res)
            this.username = res.data.list[0].workerName
            this.depName = res.data.list[0].depName
            this.sleaveform.departmentName = res.data.list[0].depId
            this.teamIdName = res.data.list[0].teamIdName
            this.sleaveform.className = res.data.list[0].teamId
        })
        
    },
    persion(){
      this.$http.get(personapi.userselect).then(res=>{
            console.log(res)
            this.personoption = res.data.list
        })
    }
    
  },
  created() {},
  mounted() {
      this.sleaveform.userId=sessionStorage.getItem('userId');
      this.getdep();
      this.getperson();
      this.teamconfig();
      this.persion()
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.leave {
  width:90%;
  margin: 0 auto;
}
</style>
