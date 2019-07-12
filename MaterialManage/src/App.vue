/*********************************************
 * @function: 全部样式设置
 * @Author: 刘新红 
 * @Date: 2019-03-07
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
<style lang="scss">
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
  li{list-style:none;}
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
      height: calc(100vh - 64px);
  }
  .mainLeft{
    width: 300px;
    height:100%;
    background:#5E5E5E;
    /* 修改样式one */
    border-radius: 4px;
    box-shadow: 3px 1px 4px #c1c1c1;
  }
  .mainmajor{
    height:99%;
    flex:1;
    margin: 8px 10px;
    padding-top: 10px;
    border: 1px solid #e2e2e2;
    box-shadow: 1px 1px 5px #afaeae;
    /* background: linear-gradient(to top right, #CDDC39, #8BC34A, #FFEB3B); */
    background: linear-gradient(to right bottom, #fff, #efefef, #fff);
    /* background-image: url("./assets/images/rb.jpg");
    background-size:100% 100%;  */
  }
  .toptext{
    width: 100%;
    font-size: 22px;
    text-align: center;
    font-family: '楷体';
  }
  .toptable{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 24px;
  }
  .block{
    position: absolute;
    bottom: 50px;
    right: 50px;
    display: flex;
    justify-content: flex-start;
  }
  .modifybtn{
  background: #E6A23C;
  color: #fff;
  width: 48px;
  text-align: center;
  padding: 7px;
  &:hover{
    background: #E6A23C;
    color: #fff;
    opacity: 0.7;
  }
}
.detelebtn{
  background: #F56C6C;
  color: #fff;
  width: 48px;
  text-align: center;
  padding: 7px;
  &:hover{
    background: #F56C6C;
    color: #fff;
    opacity: 0.7;
  }
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
    padding: 0px 0px;
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
  /* background:#999 !important; */
  background:#0d8692 !important;
  color: #fff;
  /* padding: 3px 0px; */
}
.el-table__footer-wrapper, .el-table__header-wrapper{
   background:#0d8692 !important;
    color: #fff;
}
.el-table th, .el-table tr{
  background: none;
}
.el-table th, .el-table tr{
  background: none;
}
 .el-table .el-table__row:nth-child(2n) {
    background: rgb(232, 232, 230);
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
    width: 90%;
    margin: 20px auto;
    border: 1px solid #ccc;
  }
  .tableinsert  tr td{
      padding: 5px;
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