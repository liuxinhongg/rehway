<template>
  <div style="height:100%">
      <el-scrollbar style="height:100%;overflow-x: hidden;">
      <!-- <div :class="nav==0 ? class2:class1" @click="NavTab(0)">
        <i class="el-icon-menu"></i>设备注册人员
      </div> -->
      <div :class="nav==1 ? class2:class1" @click="NavTab(1)">
        <i class="el-icon-menu"></i>详情
      </div>
      <div :class="nav==2 ? class2:class1" @click="NavTab(2)">
        <i class="el-icon-menu"></i>密码
      </div>
      <div :class="nav==3 ? class2:class1" @click="NavTab(3)">
        <i class="el-icon-menu"></i>头像
      </div>
      <div v-if="nav==1" class="usermain">
        <deta></deta>
      </div>
      <div v-if="nav==2" class="usermain">
        <pass></pass>
      </div>
      <div v-if="nav==3" class="usermain">
        <portrait></portrait>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import deta from "./deta";
import pass from "./pass";
import portrait from "./portrait";

export default {
  components: {
    deta,
    portrait,
    pass
  },
  props: {},
  data() {
    return {
      nav: 1,
      class1: "norstyle",
      class2: "norstyle activestyle"
    };
  },
  watch: {},
  computed: {},
  methods: {
    NavTab(n) {
      this.nav = n;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  margin: 10px 50px;
  overflow: hidden;
}
.norstyle {
  margin: 0px 30px;
  width: 100px;
  display: inline-block;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  i {
    margin-right: 10px;
    font-size: 16px;
  }
}
.activestyle {
  width: 100px;
  font-size: 14px;
  display: inline-block;
  color: #337ab7;
}
</style>
