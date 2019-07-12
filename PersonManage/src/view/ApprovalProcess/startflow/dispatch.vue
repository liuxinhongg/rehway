<template>
  <div class="dispatch">
    <h2>发文</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题：" prop="title">
        <el-input v-model="ruleForm.title" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="拟稿审批：" prop="draft">
        <el-input v-model="ruleForm.draft" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <el-input type="textarea" :row="2" v-model="ruleForm.content" style="width:100%"></el-input>
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
        draft: "",
        title: "",
        content: ""
      },
      rules: {
        draft: [
          { required: true, message: "请输入拟稿审批", trigger: "change" }
        ],
        content: [{ required: true, message: "请输入内容", trigger: "change" }],
        title: [{ required: true, message: "请输入标题", trigger: "change" }]
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
.dispatch {
  width: 90%;
  margin: 0 auto;
}
h2 {
  margin-bottom: 50px;
}
.demo-ruleForm {
  width: 50%;
}
</style>
