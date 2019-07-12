<template>
  <div class="wrapper"  style="">
    <!-- buzhou  -->
    <div style="margin-top:50px" class="persontop">请先根据提示走一个流程吧</div>
    <el-scrollbar style="height:100%;overflow-x: hidden;">
        <div style="width:300px;height:600px;margin-left:100px;float:left;margin-right:50px" >
            <el-steps direction="vertical" :active="num">
                <el-step @click="jumprouter" title="步骤 1" :description="num > 0 ? '新建企业成功' : '请先新建一个企业'"></el-step>
                <el-step  title="步骤 2" :description="num > 1 ? '项目新建成功' : '接下来，新建一个项目'"></el-step>
                <el-step  title="步骤 3" :description="num > 2 ? '分包项目新建成功' : '嗯~再建分包项目'"></el-step>
                <el-step  title="步骤 4" :description="num > 3 ? '部门新建成功' : '可以新建部门了~'"></el-step>
                <el-step  title="步骤 5" :description="num > 4 ? '班组新建成功' : '哇塞，再建一个班组吧'"></el-step>
                <el-step  title="步骤 6" :description="num > 5 ? '角色新建成功' : '接下来，可以新建角色了'"></el-step>
                <el-step  title="步骤 7" :description="num > 6 ? '用户新建成功' : '最后，让我们新建员工'"></el-step>
                <!-- <el-step  title="步骤 8" :description="num > 6 ? '完成了~~~' :'完成了~~~'"></el-step> -->
            </el-steps>
        </div>
        <div style="float:left">
            <p style="height:79px;color:#999">请先新建一个企业吧，注意，企业只能新建一个哦</p>
            <p style="height:79px;color:#999">新增一个项目吧，项目也是只能新增一条</p>
            <p style="height:79px;color:#999">新建一条分包项目吧</p>
            <p style="height:79px;color:#999">新建部门</p>
            <p style="height:79px;color:#999">新建班组</p>
            <p style="height:79px;color:#999">新建角色</p>
            <p style="height:79px;color:#999">新建用户</p>
        </div>
    </el-scrollbar>

  </div>
</template>

<script type="text/ecmascript-6">
import * as personapi from '@/api/usercenter.js'

export default {
  components: {},
  props: {},
  data () {
    return {
        num:0,
        isstep:''
    };
  },
  watch: {},
  computed: {},
  methods: {
      jumprouter(){
          console.log(1)
        //   if(a==1){ console.log(a);this.$router.push('/project/company')}
      },
      dataAll(){
        //   企业
        this.$http.post('/api/ent/ent_select_list').then(res=>{
            // console.log(res);
            if(res.data.corpName){
                this.num = 1 
                // 项目
                this.$http.get('/api/prj_base/prj_base_list').then(da=>{
                    // console.log(da);
                    if(da.data.list[0]){
                        this.num = 2
                        // 分包项目
                        this.$http.get('/api/sub_prj/selectBy').then(dataall=>{
                        // console.log(dataall);
                            if(dataall.data.list[0]){
                                this.num = 3
                                // 部门
                                this.$http.get('/api/dep/selectBy').then(data4=>{
                                    // console.log(data4)
                                    if(data4.data.list[0]){
                                        this.num = 4
                                        this.$http.get('/api/team/team_select_bycode').then(data5=>{
                                            // console.log(data5)
                                            if(data5.data.list[0]){
                                                this.num = 5
                                                this.$http.get(personapi.roleInforoleList,{params:{page:1,num:10}}).then(data6=>{
                                                    if(data6.data.roleList[0]){
                                                        this.num = 6
                                                        this.$http.get("/api/user/user_select_all", { params: { page: 1, num: 10}}).then(data7 => {
                                                            // console.log(data7);
                                                            if(data7.data.list[0]){
                                                                this.num=7
                                                                this.stepchange()
                                                                console.log(this.isstep);
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
      },
      stepchange(){
          if(this.num==7){
            this.isstep  = true
            // return true
          }
      }
  },
  created () {},
  mounted () {
      this.dataAll()
  }
};
</script>
<style scoped>
.wrapper{
    
}
</style>
