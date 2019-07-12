<template>
  <div class="jurisdiction">
    <h2>发起申请</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="申请" prop="apply">
        <el-input v-model="ruleForm.apply" name="apply"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')">提交数据</el-button>
        <el-button @click="resetForm('ruleForm')">保存草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        apply: "",
      },
      rules: {
        apply: [
          { required: true, message: "请输入申请人", trigger: "change" }
        ],
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({path:'/project/sponsor',query:{id:this.ruleForm}});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
          this.$router.push({path:'/project/',query:{id:this.ruleForm}});//草稿

    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.jurisdiction {
    width:90%;
    margin: 0 auto;
}
h2{
    margin-bottom:50px; 
}
.demo-ruleForm{
    width: 50%
}
</style>
