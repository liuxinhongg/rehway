<template>
<div>
  <p>
    <el-button type="primary" @click="getmoney()">按钮</el-button>
  </p>
</div>
</template>

<script>
import ExchangeMoney from '@/filter/money.js'
export default {
  name: 'IsRequired',
  data() {
    return {
      num:"21321.12"
    };
  },
  methods: {
    getmoney(){
      console.log(ExchangeMoney(this.num));
    }
  },
};
</script>
<style lang="scss" scoped>
 .redClass {
  color: red;
  top: 3px;
  position: relative;
 }
</style>