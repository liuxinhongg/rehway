//角色管理 编辑
<template>
  <div class="compile">
    <!-- <div class="panel panel-default"> -->
      <el-form ref="addrole" :model="addrole" label-width="80px" style="width:50%;" @submit.native.prevent> 
        <el-form-item label="名称：">
          <el-input v-model="addrole.mname"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input type="textarea" v-model="addrole.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit"  @click="onSubmit">保存</el-button>
          <router-link to="/project/rolemanagement">
            <el-button>返回</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    <!-- </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      addrole: {
        desc: '',
        mname: ''
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSubmit() {
      let data={
        mname:this.addrole.mname,
        mname:this.addrole.mname,
      }
      this.$http.get('/api/manType/insert',{params:data}).then(res=>{
        console.log(res);
        if(res.data.result="success"){

        }
      })
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.compile {
  width: 95%;
  margin: 20px auto;
}
.panel-heading {
  margin-bottom: 20px;
}
</style>
