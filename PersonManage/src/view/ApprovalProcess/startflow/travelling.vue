<template>
  <div class="travelling">
    <h2 style="margin: 0 20px;">发起申请</h2>
    <el-scrollbar style="height:100%;">
      <div class="travelform">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
          <el-form-item label="出差事由：" prop="cause">
            <el-input v-model="ruleForm.cause" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="交通工具：" prop="vehicle">
            <el-input v-model="ruleForm.vehicle" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="单程往返：" prop="arrive">
            <el-input v-model="ruleForm.arrive" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="出发城市：" prop="departure">
            <el-input v-model="ruleForm.departure" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="目的城市：" prop="destination">
            <el-input v-model="ruleForm.destination" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="开始时间：" prop="date1">
            <el-date-picker v-model="ruleForm.date1" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：" prop="date2">
            <el-date-picker v-model="ruleForm.date2" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="出差天数：" prop="travel">
            <el-input v-model="ruleForm.travel" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="同行人：" prop="partner">
            <el-input v-model="ruleForm.partner" style="width:100%"></el-input>
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
    </el-scrollbar>
  </div>
</template>

<script >
export default {
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        partner: "",
        remarks: "",
        travel: "",
        destination: "",
        departure: "",
        arrive: "",
        vehicle: "",
        cause: "",
        date1: "",
        date2: ""
      },
      rules: {
        partner: [
          { required: true, message: "请输入同行人", trigger: "change" }
        ],
        travel: [
          { required: true, message: "请输入出差天数", trigger: "change" }
        ],
        destination: [
          { required: true, message: "请输入目的城市", trigger: "change" }
        ],
        departure: [
          { required: true, message: "请输入出发城市", trigger: "change" }
        ],
        arrive: [
          { required: true, message: "请输入单程往返", trigger: "change" }
        ],
        vehicle: [
          { required: true, message: "请输入交通工具", trigger: "change" }
        ],
        cause: [
          { required: true, message: "请输入出差事由", trigger: "change" }
        ],
        date1: [
          { type: "date",required: true, message: "请选择日期",trigger: "change"}
        ],
        date2: [
          { type: "date", required: true, message: "请选择时间",trigger: "change"}
        ],
        type: [
          {type: "array",required: true, message: "请至少选择一个活动性质",trigger: "change"}
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
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
.travelling {
  width: 100%;
  height: calc(100vh - 128px);
  .travelform{
    width: 90%;
    margin: 20px auto;
  }
}
.demo-ruleForm {
  width: 50%;
}
</style>
