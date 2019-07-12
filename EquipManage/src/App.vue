/*********************************************
 * @function: 全部样式设置
 * @Author: 刘新红 
 * @Date: 2019-05-14
 *********************************************/
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  components: {},
  props: {},
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style>
  *{
    padding: 0;
    margin: 0;
  }
  p{
    margin: 0;
  }
  a:hover{
    text-decoration:none;
  }
  #app {
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
  }
  .containerpage {
      width: 100%;
      margin: 0 auto !important;
      display: flex;
      justify-content: flex-start;
      height: calc(100vh - 70px);
  }
  .mainLeft{
    width: 300px;
    height:100%;
    background:#5E5E5E;
  }
  .mainmajor{
    height:100%;
    flex:1;
    margin: 0 10px;
    padding-top: 10px;
    border: 1px solid #c7c4c4;
  }
  .block{
    position: absolute;
    bottom: 35px;
    right: 50px;
    display: flex;
    justify-content: flex-start;
  }
  .el-menu{
    border-right: none !important;
  }
  .el-table--border{
    border: 1px solid #ccc;
  }
  .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-right: 1px solid #ccc;
  }
  .el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid #ccc;
    padding: 5px 0px;
  }
  .el-table__header .has-gutter tr .is-leaf{
    padding: 0px;
  }
  .el-table::before{
    bottom: 1px;
    background: none;
  }
  .el-table__fixed-right::before, .el-table__fixed::before{
    background: none;
  }
  .el-input__inner{
    border: 1px solid #ccc;
  }
  .el-table th>.cell{
    text-align: center;
  }
  .el-table .cell{
    text-align: center;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    background: none;
  }
  .el-textarea__inner{
    border: 1px solid #ccc;
  }
  .el-dialog--center{
  overflow: hidden;
}
.el-dialog--center .el-dialog__body {
  overflow: hidden;
}
.el-button--text {
  padding: 0px;
}
input[type=file]{
    display: none
}
.el-menu-item-group__title{
  padding: 0px;
}
/* 表头颜色 */
.el-table thead{
  background:#0092a0 !important;
  color: #fff;
}
.el-table th, .el-table tr{
  background: none;
}
 .el-table .el-table__row:nth-child(2n) {
    background: #f5f5f5;
  }
  .el-table .el-table__row:nth-child(2n+1) {
    background: #fff;
  }

  .el-table .success-row {
    background: #b4caa7;
  }
  .el-input__inner{
    height: 35px;
    line-height: 35px;
  }
  .tableinsert{
    width: 80%;
    margin: 20px auto;
    border: 1px solid #ccc;
  }
  .tableinsert  tr td{
      padding: 5px 8px;
  }
  .tableinsert  tr td  .el-form-item{
      margin-bottom: 0px;
    }
  .tableinsert  tr .tdleft{
    text-align: right;
  }
  .persontop{
    width: 100%;
    height:40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    font-family: '楷体';
  }
</style>

