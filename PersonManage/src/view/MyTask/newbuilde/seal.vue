<template>
  <div class="seal">
    <h2>用印申请</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="日期：" prop="date">
        <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="文件名称：" prop="designation">
        <el-input v-model="ruleForm.designation" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="文件份数：" prop="num">
        <el-input v-model="ruleForm.num" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="文件类别：" prop="category">
        <el-input v-model="ruleForm.category" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="印章类型：" prop="type">
        <el-input v-model="ruleForm.type" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remarks">
        <el-input type="textarea" v-model="ruleForm.remarks" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')" type="primary">提交数据</el-button>
        <el-button @click="resetForm('ruleForm')">保存草稿</el-button>
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
      ruleForm: {
        designation: "",
        num: "",
        type:'',
        category: "",
        date:'',
        remarks:''
      },
      rules: {
        date: [{type:'date', required: true, message: "请输入日期", trigger: "change" }],
        designation: [
          { required: true, message: "请输入申请原因", trigger: "change" }
        ],
        num: [
          { required: true, message: "请输入资产名称", trigger: "change" }
        ],
        category: [{ required: true, message: "请输入数量", trigger: "change" }],
        type: [{ required: true, message: "请输入数量", trigger: "change" }],
        remarks: [{ required: true, message: "请输入数量", trigger: "change" }]

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
.seal {
  width: 90%;
  margin: 0 auto;
}
h2 {
  // text-align: center;
  margin-bottom: 50px;
}
.demo-ruleForm{
    width: 50%;
    // margin: 0 auto;
}
</style>
