<template>
  <div class="sponsor">
      <el-button @click="affirm()" v-if='affbtn'>确认发起流程</el-button>
      <div style="background:rgb(0,0,255,0.3);line-height:50px;padding:15px;border-radius: 5px;font-size:18px;" v-if="shbtn">
          <span>流程发起成功</span>
          <span style="position: relative;left:90%;color:#fff" @click="shut()">X</span></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data () {
    return {
        affbtn:true,
        shbtn:false
    };
  },
  watch: {},
  computed: {},
  methods: {
      affirm(){
          this.affbtn = false
          this.shbtn = true
      },
      shut(){
          this.shbtn = false;
          this.$router.push({path:'/project/sponsor',query:{con:this.$route.query.id}});//跳未结流程
      }
  },
  created () {},
  mounted () {
      console.log(this.$route.query.id)
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.sponsor{
    width: 90%;
    margin: 0 auto;  
}

</style>
