/*
 * @Author: 刘新红 
 * @Date: 2019-05-12 15:36:45 
 * @function 新增请假功能模块
 */
<template>
  <div class="leave">
    <p class="persontop">请假申请</p>
    <el-form :model="sleaveform" :rules="rules" ref="sleaveform" class="demo-sleaveform">
        <table border="1" class="tableinsert" style="width:95%;">
            <tr>
                <td class="tdleft">姓名：</td>
                <td> 
                  <el-form-item prop="userId">
                    <el-select v-model="sleaveform.userId" style="width:280px">
                        <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                        </el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft">所在班组：</td>
                <td>{{ teamName }}</td>
            </tr>
            <tr>
                <td class="tdleft">请假类型：</td>
                <td>
                    <el-form-item prop="resource">
                        <el-radio-group v-model="sleaveform.resource">
                        <el-radio label="0">倒休</el-radio>
                        <el-radio label="1">事假</el-radio>
                        <el-radio label="2">病假</el-radio>
                        <el-radio label="3">婚假</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </td>
                <td class="tdleft">请假时长：</td>
                <td>
                    <el-form-item prop="daylength">
                        <el-input v-model="sleaveform.daylength" type="number" placeholder="输入请假时长" style="width:280px;"></el-input>
                    </el-form-item>
                </td> 
            </tr>
            <tr>
                <td class="tdleft">所在部门：</td>
                <td>
                    <el-form-item prop="dep">
                        <el-select v-model="sleaveform.dep" style="width:280px">
                            <el-option v-for="(item,index) in depoption" :key="index" :value="item.departmentId" :label="item.departmentName"> 
                            </el-option>
                        </el-select>
                    </el-form-item>
                </td>
                <td class="tdleft">负责人：</td>
                <td>
                    <el-form-item prop="mainperson">
                        <el-select v-model="sleaveform.mainperson" style="width:280px">
                            <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                            </el-option>
                        </el-select>
                    </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">请假原因：</td>
                <td colspan="3">
                    <el-form-item prop="cause">
                        <el-input type="textarea" :rows="2" v-model="sleaveform.cause"></el-input>
                    </el-form-item>
                </td> 
            </tr>
        </table>
        <el-form-item style="text-align:center;">
            <el-button @click="submitForm('sleaveform')" type="primary">提交数据</el-button>
            <el-button @click="resetForm()">保存草稿</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import * as personapi from '@/api/usercenter.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      sleaveform: {
        userId:'',
        leaveDay:'',
        resource: "",
        daylength: "",
        date2: "",
        cause:'',
        dep:'',
        mainperson:'',
      },
      rules: {
        resource: [
             { required: true, message: "请输入请假类型", trigger: "change" }
        ],
        dep: [
            { required: true, message: '请选择部门', trigger: 'change' }
        ],
        mainperson: [
        { required: true, message: '请选择负责人', trigger: 'change' }
        ],
        daylength: [
            { type: 'date', required: true, message: '请输入时长', trigger: 'blur' }
        ],
        cause: [
           { required: true, message: "请输入请假原因", trigger: "change" }
        ], 
      },
      username:'',
      teamName:'',
      depoption:[],//部门
      personoption:[],//人员信息
    };
  },
  watch: {},
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //未结流程
          let leaveform=new FormData();
          leaveform.append('',this.sleaveform.username)
          this.$http.post(usercenter.leav,leaveform).then(res=>{
            console.log(res);
          })
          // this.$router.push({path:'/project/undided',query:{id:this.sleaveform}});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
          this.$router.push({path:'/project/draftbox'});//草稿
    },
    // 获取部门
    getdep(){
        this.$http.get('/api/dep/selectBy').then(res=>{
            // console.log(res);
            this.depoption=res.data.list;
        })
    },
    getperson(){
        this.$http.get('/api/user/user_select').then(res=>{
            console.log(res);
            this.personoption=res.data.list;
        })
    }
    
  },
  created() {},
  mounted() {
      this.getdep();
      this.getperson();
      this.username=sessionStorage.getItem('username');
      this.teamName=sessionStorage.getItem('teamName');
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.leave {
  width: 100%;
  margin: 0 auto;
}
</style>
