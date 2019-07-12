<template>
  <div class="detail">
    <div class="panel">
      <el-form ref="data" :model="data" label-width="80px" style="width:50%;">
        <el-form-item label="名称">
          <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="data.id"></el-input>
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
.detail {
  width: 90%;
  margin: 20px auto;
}
</style>
