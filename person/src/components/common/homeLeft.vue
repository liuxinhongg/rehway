/*********************************************
 * @function: 主页左边
 * @Author: 谢莹 
 * @Date: 2019-03-08 10:44:13 
 *********************************************/


<template>
  <div class="leftContent">
      <p class="leftState"></p>
      <div class="leftCom" v-for="(item,index) in iconImg" :key="index" @click="jumpLogin(item.id)">
        <i :class=item.icon :style="'font-size:'+item.fontsize+';'+'color:'+item.iconcolor"></i>
        <p>{{item.desc}}</p>
      </div>
  </div>
</template>

<script >
export default {
  components: {},
  props: {},
  data () {
    return {
      iconImg:[
        {icon:'iconfont icon-oacricle',id:1,desc:'人事管理',fontsize:'30px',iconcolor:'#66bf00' },
        {icon:'iconfont icon-xmjd',id:2,desc:'项目管理',fontsize:'28px',iconcolor:'#2f4554'},
        {icon:'iconfont icon-sb',id:3,desc:'设备管理',fontsize:'30px',iconcolor:'#95d0b4'},
        {icon:'iconfont icon-fjfw',id:4,desc:'质量管理',fontsize:'28px',iconcolor:'#43da92'},
        {icon:'iconfont icon-safe',id:5,desc:'安全管理',fontsize:'28px',iconcolor:'#21e2c0'},
        {icon:'iconfont icon-cl',id:6,desc:'物资管理',fontsize:'30px',iconcolor:'#d48265'},
        {icon:'iconfont iconicon-test-copy',id:7,desc:'物联网',fontsize:'30px',iconcolor:'#00a8fb'},
        {icon:'iconfont icon-spgl',id:8,desc:'视频管理',fontsize:'30px',iconcolor:'#09e1fd'},
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    jumpLogin(status){
      console.log(status);
      this.$router.push({path:'/login?id='+status});
    }
  },
  created () {},
  mounted () {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.leftContent{
  width: 345px;
  background: #5E5E5E;
  border:1px solid #333;
  box-shadow: 1px 1px 5px #333;
  padding-left: 25px;
  height:98%;   
  margin: 10px;
  .leftState{
    width: 250px;
    height: 20px;
  }
  .leftCom{
    border-radius: 15px;
    width: 100px;
    height: 100px;
    float: left;
    color: #ccc;
    text-align: center;
    text-shadow: 1px 1px 1px #ccc;
    text-align: center;
    cursor:pointer;
    margin-right: 25px;
    border:1px solid #aaa;
    border-right:none; 
    border-left:none; 
    box-shadow: #999 0px 0px 10px 1px inset;
    margin-bottom: 30px;
    overflow: hidden;
    padding: 10px;
    p{
      line-height: 30px;
    }
  }
}
</style>
