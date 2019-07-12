<template>
  <div>
    <!--金额，输入数字同步翻译成大小汉字金额-->
    <div class="mt-10">
      <span class="amountTitle">
     {{title}}
        <!---是否必填，显示红*-->
     <is-required :isRequired="isRequired"></is-required>
      </span>
      <div style="width: 80%; float: left; padding-right: 5px;">
        <input v-model="price" type="number" class="numberClass"
               @keyup="onKeyup"/>
      </div>
    </div>
    <label style="color: #959595; padding-left: 15px;font-size: 14px;">大写</label>
    <span class="chineseClass">{{simplifiedChinese}}</span>
  </div>
</template>
 
<script>
  import {TransferDom} from 'vux';
  import IsRequired from '@/components/common/require';
  
  export default {
    name: 'Amount',
    data() {
      return {
        errorShow: false,
        errorText: '',
        price: null,
        simplifiedChinese: '',
      };
    },
    methods: {
    },
  };
</script>
<style type="less">
 
  .chineseClass {
    font-size: 14px;
    color: #959595;
    text-align: right;
    display: inline-block;
    width: 80%;
  }
 
  .numberClass {
    text-align: right;
    border: 0;
    width: 100%;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    height: 1.41176471em;
    line-height: 1.41176471;
    padding-right: 20px;
  }
  .amountTitle {
    padding-left: 15px;
    display: inline-block;
    width: 20%;
    float: left;
  }
</style>