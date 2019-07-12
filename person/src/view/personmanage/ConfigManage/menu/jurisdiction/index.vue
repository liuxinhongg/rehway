<template>
  <div class="wrapper">
      <div class="custom-tree-container">
            <div class="blockdiv">
              <el-tree :data="data"   default-expand-all  node-key="id"  ref="tree"  highlight-current :props="defaultProps" :expand-on-click-node="false"
>
                <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{node.label}}</span>
            <span>
              <el-button type="text" @click="statechange(data,data.available)">{{data.available == 0 ? '启用':'禁用'}}</el-button>

              <!-- <el-radio-group v-model="data.available">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">禁用</el-radio>
              </el-radio-group> -->
            </span>
          </span>
              </el-tree>
        </div>
        <!-- <div style="position: fixed; bottom:10%;left:45%">
                    <el-button @click="onSubmit()" type="primary" native-type="submit">保存</el-button>
            </div> -->
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import * as personapi from '@/api/usercenter.js'

export default {
  components: {},
  props: {},
  data () {
   return {
     resource: '',
        data: [],
        defaultProps: {
          children: 'childList',
          label: 'permissionName',
          id:'permissionId',
          // available:'available'
        },
        // detail: JSON.parse(JSON.stringify(data))
      };
    
  },
  watch: {},
  computed: {},
  methods: {
      statechange(data,a){
        // console.log(data,a)
        if(a == 1){
          data.available = 0
        }else{
          data.available = 1
        }
        console.log(data)

this.$confirm('确认要更新此权限?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.get(personapi.updatePermission,{params:data}).then(res=>{
          console.log(res)
          if(res.data.result == "success:[权限更新成功]"){
            this.getall()
          }
        })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
            this.getall()

        });


       
      },
      getall(){
        this.$http.get(personapi.sysPermissionfindAll).then(res=>{
          console.log(res)
          this.data = res.data.permissionList
          // console.log(this.data);
        })
      }
      },
  created () {},
  mounted () {
      this.getall()
  }
};
</script>
<style lang="scss">

.blockdiv{
  width: 15%;
  left: 400px;
  top: 150px
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
