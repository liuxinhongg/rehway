<template>
  <div class="endWrap">
    <div class="endTop">
     <ul class="endUl1">
        <li class="endItem">睿合易谷产品</li>
        <li class="endItem">系统管理</li>
        <li class="endItem">OA系统</li>
        <li class="endItem">设施系统</li>
        <li class="endItem">材料系统</li>
        <li class="endItem">关于我们</li>
      </ul>
    </div>
    <div class="bottom">
      <ul class="endUl">
        <li class="endItem">数据查询</li>
        <li class="endItem">数据查询</li>
      </ul>
      <ul class="endUl">
        <li class="endItem">数据查询</li>
        <li class="endItem">数据查询</li>
      </ul><ul class="endUl">
        <li class="endItem">数据查询</li>
        <li class="endItem">数据查询</li>
      </ul><ul class="endUl">
        <li class="endItem">数据查询</li>
        <li class="endItem">数据查询</li>
      </ul>
      <ul class="endUl">
        <li class="endItem">数据查询</li>
        <li class="endItem">数据查询</li>
      </ul>
      <ul class="endUl">
        <li class="endItem">数据查询</li>
        <li class="endItem">数据查询</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data () {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.endWrap{
  width: 100%;
  height: 200px;
  background-color: #666;
  color: #ddd;
  padding: 30px 0px 0px 0px;
  // margin: 0 auto;
  .endTop{
    overflow: hidden;
    width: 80%;
    line-height: 50px;
    margin: 0 auto;
    // padding: 20px 50px 0px 50px;
    .endUl1{
      width: 80%;
      margin: 0 auto;
       .endItem{
        float: left;
        list-style: none;
        width: 120px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        line-height: 35px;
        text-align: center;
        margin-right:20px;
      }
    }
  }
  .bottom{
    width: 70%;
    margin: 0 auto;
    .endUl{
      padding-left: 5px;
        float: left;
        list-style: none;
        width: 120px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        line-height: 35px;
        text-align: center;
        margin-right:14px;
        &:nth-of-type(1){
          padding-left: 80px;
        }
    }
    
  }
}
</style>
