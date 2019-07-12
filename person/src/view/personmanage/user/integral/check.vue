<template>
  <div>
    <div class="checkIntegral">
      <router-link to="/project/integral"><el-button type="text"><i class="el-icon-d-arrow-left"></i>返回</el-button></router-link>
      <p class="detail"> <span style="color:#0d8206">{{checkform.username}}</span> 积分详情</p>
      <el-form :model="checkform" label-width="200px" style="width:90%;margin:auto;">
        <el-form-item label="用户名："><p class="opcheck">{{checkform.username}}</p></el-form-item>
        <el-form-item label="用户编号："><p class="opcheck">{{checkform.usercheck}}</p> </el-form-item>
        <el-form-item label="总积分："><p class="opcheck">{{checkform.sumintegral}}</p></el-form-item>
        <el-form-item label="积分分配次数："><p class="opcheck">{{checkform.itemnumber}}</p></el-form-item>
        <el-form-item label="迟到："><p class="opcheck">{{checkform.tardy}}</p></el-form-item>
        <el-form-item label="打架："><p class="opcheck">{{checkform.fight}}</p></el-form-item>
        <el-form-item label="任务未完成："><p class="opcheck">{{checkform.unfinished}}</p></el-form-item>
        <el-form-item label="剩余积分："><p class="opcheck">{{checkform.sumintegral-checkform.tardy-checkform.fight-checkform.unfinished}}</p></el-form-item>
        
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      checkform: {
        username:'张三',
        usercheck:'2368721',
        sumintegral:100,
        itemnumber:1,
        tardy:5,
        fight:20,
        unfinished:9,
      }
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
.checkIntegral{
  width: 95%;
  margin: auto;
  .detail{
    width: 200px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    font-size: 18px;
  }
  .itemInput{
    width: 280px;
  }
  .opcheck{
    height: 45px;
    border-left: 1px solid #ccc;
    text-indent: 2em;
  }
}
</style>
<style>
 .checkIntegral .el-form-item{
    margin-bottom: 10px;
    border: 1px solid #ccc;
  }
</style>