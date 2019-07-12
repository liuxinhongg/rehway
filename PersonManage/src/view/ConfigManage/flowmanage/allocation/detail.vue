
<template>
  <div class="allocationdetail">
    <div class="panel">
      <el-form ref="data" :model="data" label-width="120px" style="width:50%;">
        <el-form-item label="名称">
          <el-input v-model="data.name"></el-input>
        </el-form-item>

        <el-form-item label="流程分类">
          <el-select v-model="data.region" placeholder="请选择活动区域">
            <el-option label="行政" value="shanghai"></el-option>
            <el-option label="人事" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="配置任务负责人" prop="resource">
          <el-radio-group v-model="data.resource" style="width:100%;">
            <el-radio label="开启"></el-radio>
            <el-radio label="关闭"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="data.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">保存</el-button>
          <el-button @click="resetForm()">返回</el-button>
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
      data: {
        region: "",
        resource: "",
        id: 1,
        check: true,
        name: "超级管理员"
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSubmit() {
      console.log(111);
    },
    resetForm() {
      this.$router.go(-1);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.allocationdetail {
  width: 90%;
  margin: 20px auto;
}
</style>
