<template>
    <div>
        <el-tree
  :data="data2"
  show-checkbox
  default-expand-all
  node-key="permissionId"
  ref="tree"
  highlight-current
  :props="defaultProps">
</el-tree>

<div class="buttons">
  <el-button @click="getCheckedNodes">通过 node 获取</el-button>
  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
</div>

    </div>
</template>

<script>
import * as personapi from '@/api/usercenter.js'
  export default {
    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'childList',
          label: 'permissionName',
        //   id:'permissionId'
        }
      };
    },
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
        var chkIds1 = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
        console.log(chkIds1);
      },
      treeAlldata(){
        this.$http.get(personapi.sysPermissionfindAll).then(res=>{
            console.log(res);
            this.data2=res.data.permissionList
        })
    },
    },
    mounted(){
        this.treeAlldata()
    }
  };
</script>
<style>

</style>
