<template>
  <div class="addintegral">
    <el-form :model="integraladdform" ref="integraladdform" label-width="120px" :rules="integralrule">
      <table border="1" class="tableinsert" style="width:95%;">
            <tr>
                <td class="tdleft">用户名：</td>
                <td> 
                  <el-form-item label="用户名：" prop="username">
                    <el-input v-model="integraladdform.username" class="itemInput"></el-input>
                  </el-form-item>
                </td>
                <td class="tdleft">用户编号：</td>
                <td>
                  <el-form-item label="用户编号：" prop="usercode">
                    <el-input v-model="integraladdform.usercode" class="itemInput"></el-input>
                  </el-form-item>
                </td>
            </tr>
      </table>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="integraladdform.username" class="itemInput"></el-input>
      </el-form-item>
      <el-form-item label="用户编号：" prop="usercode">
        <el-input v-model="integraladdform.usercode" class="itemInput"></el-input>
      </el-form-item>
      <el-form-item label="总积分数：" prop="sumIngeral">
        <el-input type="number" max="100" min="30" v-model="integraladdform.sumIngeral" class="itemInput"></el-input>
      </el-form-item>
      <el-form-item label="积分分配次数：" prop="timenum">
        <el-input v-model="integraladdform.timenum" type="number" max="2" min="1" class="itemInput"></el-input>
      </el-form-item>
      <el-form-item label="积分处分：" prop="surplus">
        <el-input v-model="integraladdform.surplus" type="number" max="100" min="0" class="itemInput"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('integraladdform')" type="primary">保存</el-button>
        <router-link to="/project/integral">
          <el-button >返回</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      integraladdform: {
        username: "",
        usercode:'',
        sumIngeral:'',
        timenum:'',
        surplus:''
      },
      integralrule:{
        username:[{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        usercode:[{ required: true, message: '请输入用户编号', trigger: 'blur' }],
        sumIngeral:[{ required: true, message: '请输入总积分数', trigger: 'blur' }],
        timenum:[{ required: true, message: '请输入积分分配次数', trigger: 'blur' }],
        surplus:[{ required: true, message: '请输入积分处分', trigger: 'blur' }],
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.addintegral{
  width: 90%;
  margin: 40px auto;
  .itemInput{
    width: 280px;
  }
}

</style>
