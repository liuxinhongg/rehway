// 用户 设置权限

<template>
  <div class="setpermission">
   <div v-for='(item,index) in permission' :key="index">
     <input type="hidden" :value="item.index">
     <input type="checkbox" :value="item.coment">{{item.mname}}
   </div>
   <el-button @click="onSubmit">提交</el-button>
   <el-button @click="rest">返回</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      permission: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSubmit() {
      console.log(this.permission);
    },
    rest(){
      this.$router.go(-1);
    }
  },
  created() {},
  mounted() {
    this.$http.post("/api/dict/man_type").then(res => {
      console.log(res);
      this.permission = res.data;
    });
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.setpermission {
  width: 90%;
  margin: 0 auto;
}
</style>
