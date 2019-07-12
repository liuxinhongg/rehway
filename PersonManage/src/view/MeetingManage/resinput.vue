<template>
  <div class="wrapper">
    <el-radio-group v-model="right" size="small"></el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form
      :model="formLabelAlign"
      ref="formLabelAlign"
      label-width="120px"
      class="demo-formLabelAlign"
    >
      <el-form-item label="会议主题1" class="item-inline">
        <el-input v-model="formLabelAlign.name" autofocus></el-input>
      </el-form-item>
      <el-form-item label="会议室" class="item-inline">
        <el-input v-model="formLabelAlign.site"></el-input>
      </el-form-item>
      <el-form-item label="发起人" prop="name" required>
        <el-input v-model="formLabelAlign.login_name"></el-input>
      </el-form-item>
      <el-form-item label="与会人" prop="name" required>
        <el-input v-model="formLabelAlign.login_name"></el-input>
      </el-form-item>
      <el-form-item label="设备" class="item-inline">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="白板"></el-checkbox>
          <el-checkbox label="投影仪"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="会议人数" prop="name" required>
        <el-input v-model="formLabelAlign.login_name"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="name" required>
        <el-date-picker
          v-model="value3"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间" required>
        <el-date-picker
      v-model="value3"
      type="datetime"
      placeholder="选择日期时间"
      default-time="12:00:00">
    </el-date-picker>
      </el-form-item>
      
      <el-form-item style="margin:20px 130px;">
        <router-link to="/project/search">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </router-link>
        <el-button type="primary" @click="submitForm('formLabelAlign')">确 定</el-button>
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
      checkList: ["白板"],
      right: "right",
      formLabelAlign: {
        beginTime:'',
        number:'',
        endTime:'',
        name: "",
        id: "",
        type: "",
        site: "",
        c_id: "",
        num: ""
      },
      value3:"",
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  width: 50%;
  margin: 0 50px;
}
</style>
