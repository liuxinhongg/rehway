
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import * as personapi from '@/api/usercenter.js'
import Cookies from 'js-cookie'

export default {
  name: "app",
  components: {},
  props: {},
  data() {
    return {
      setcookie:'',
    };
  },
  methods:{
    getcookie(){
      this.setcookie = Cookies.get('sessionid')
      if(Cookies.get('sessionid')){
        this.$router.push('/home')
      }
    },
    jituichu(){
      this.$http.get(personapi.loginsessionAlive).then(res=>{
            console.log(res);
            if( res.data.reLogin == null || res.data.reLogin == '' ){
              this.$router.push('/login')
            }
        })
    }
  },
  watch:{
    
  },
  mounted(){
    // let a = Cookies.get('sessionid')
    // console.log(a)
    this.getcookie()
     setInterval(this.jituichu,3000);
     window.addEventListener('beforeunload', e => {
        this.$http.get(personapi.logout).then(res=>{
            console.log(res)
        })
      });
     

  }
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
  a{
    text-decoration:none;    
  }
  a:hover{
    text-decoration:none;
  }
  #app {
    width: 100%;
    height: calc(100vh);
    overflow: hidden;
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
    bottom: 25px;
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
  .el-table__header .has-gutter tr .is-leaf{
    padding:0px;
  }
  .el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid #ccc;
    padding: 5px 0px;
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
    text-align: left;
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
.el-table th, .el-table tr{
  background: none;
}
 .el-table .el-table__row:nth-child(2n) {
    /* background: rgb(232, 232, 230); */
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
  /* 表格套表单 */
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
    color:#000;
    font-family: SimHei
  }
  .persontop{
    width: 90%;
    height:40px;
    line-height: 40px;
    /* text-align: left; */
    font-size: 20px;
    margin:0 auto;
    margin-bottom:20px;
    font-family: '楷体';
  }
  .boxInput {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-table__column-filter-trigger i{
    color:#e4e4e4;
  }
  .yd-list-theme4 .yd-list-item .yd-list-img{
    width: 0rem;
  }
  .toptext{
    width: 100%;
    font-size: 22px;
    text-align: center;
    font-family: '楷体';
  }
  label{
    font-weight: 100;
  }
</style>

