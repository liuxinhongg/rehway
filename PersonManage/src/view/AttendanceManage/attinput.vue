/*********************************************
 * @function: 考勤添加
 * @Author: 谢莹 
 * @Date: 2019-03-15
 *********************************************/
<template>
  <div class="wrapper">
    <div class="from">
      <el-form ref="form" :model="form" label-width="120px" style="width:50%;">
        <el-form-item label="证件号码：">
          <el-input v-model="form.idCardNumber" ></el-input>
        </el-form-item>
        <el-form-item label="证件类型：">
          <el-select v-model="form.idCardType" placeholder="请选择活动区域" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="刷卡时间：">
          <el-date-picker v-model="form.date" type="datetime" placeholder="选择日期时间" style="width:100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="刷卡进出方向：">
          <el-select v-model="form.direction" placeholder="请选择活动区域" style="width:100%;">
            <el-option label="入场" value="shanghai"></el-option>
            <el-option label="出场" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="margin-right:40px;">保存</el-button>
          <router-link to="/project/attendancemanage">
            <el-button>取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      value3: "",
      form: {
        idCardNumber: "",
        idCardType: "",
        date: "",
        direction: "",
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  width: 90%;
  margin: 0 auto;
}
.from {
  width: 100%;
  margin-top:30px;
}
</style>
