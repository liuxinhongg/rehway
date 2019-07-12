
<template>
  <div class="allocationdetail">
    <div class="panel">
      <el-form ref="data" :model="data" >
        <p class="persontop">
            流程管理
        </p>
        <table border="1" class="tableinsert" style="width:90%;margin:0 auto">
            <tr>
                <td class="tdleft" >名称：</td>
                <td> 
                  <el-form-item>
                    <el-input v-model="data.name" style="width:280px"></el-input>
                  </el-form-item>
                </td>
                <td class="tdleft" >流程分类：</td>
                <td>
                  <el-form-item>
                    <el-select v-model="data.region" placeholder="请选择活动区域" style="width:280px">
                      <el-option label="行政" value="shanghai"></el-option>
                      <el-option label="人事" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft" >排序：</td>
                <td>
                  <el-form-item>
                    <el-input v-model="data.name" style="width:280px"></el-input>
                  </el-form-item>
                </td>
                <td class="tdleft" >配置任务负责人：</td>
                <td>
                  <el-form-item prop="resource">
                    <el-radio-group v-model="data.resource" style="width:280px">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft" >描述：</td>
                <td colspan="3">
                  <el-form-item>
                    <el-input type="textarea" v-model="data.id"></el-input>
                  </el-form-item>
                </td>
            </tr>
        </table>
        <div style=" width:12%;margin:0 auto; margin-top:20px;font-size: 14px;">
          <el-button @click="onSubmit" type="primary">保存</el-button>
          <el-button @click="resetForm()">返回</el-button>
        </div>
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
