/*********************************************
 * @function: 登录
 * @Author: 谢莹 
 * @Date: 2019-03-08 10:44:13 
 *********************************************/
<template>
  <div class="box">
    <div class="loginCon">
      <p class="logo">
        <span>让城市更美</span>
      </p>
      <div class="login">
        <h2 class="LoginIn">登录</h2>
        <br>
        <div class="loginForm-group">
          <img src="../assets/images/name.png">
          <input
            type="text"
            class="form-control"
            placeholder="用户名"
            name="username"
            v-model="username"
          >
        </div>

        <div class="loginForm-group">
          <img src="../assets/images/pd.png">
          <input
            type="password"
            class="form-control"
            placeholder="密码"
            style="outline:none;"
            name="password"
            v-model="password"
          >
        </div>
        <div class="loginForm-group col-xs-8">
          <input type="text"
            class="form-control yzm"
            placeholder="验证码"
            style="outline:none;"
            name="code"
            v-model="codeNum"
          >
        </div>
        <div class="loginForm-group col-xs-3 LoginSpan" @click="mond()">{{num}}</div>
        <br>
        <br>
        <br>
        <button type="button" class="btn btn-primary btn-block" @click="LoginHome">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import crypto from "crypto";
export default {
  components: {},
  props: {},
  data() {
    return {
      num: " ",
      username: "",
      password: "",
      codeNum: "",
      jumpId:0,
    };
  },
  watch: {},
  computed: {},
  methods: {
    mond() {
      this.num = Math.floor(Math.random() * 4000 + 1000);
    },
    LoginHome() {
      let md5 = crypto.createHash("md5");
      md5.update(this.password); //需要加密的密码
      let pass = md5.digest("hex"); //password 加密完的密码
      console.log(pass);
      if (this.username == "" || this.username == null) {
        this.$message.error("用户名不能为空");
      } else if (this.password == "" || this.password == null) {
        this.$message.error("用户密码不能为空");
      } else if ((this.codeNum = "" || this.codeNum != this.num)) {
        this.$message.error("验证码错误");
      } else {
        // this.$http.post("/api/login?loginname=" +this.username +"&password=" +this.password).then(res => {
        //     console.log(res);
        //     if (res.data.success) {
              // localStorage.setItem("token", res.data.Token);
              localStorage.setItem("token", 'dskfdk67ewejknkjncse');
              localStorage.setItem("username", this.username);
              localStorage.setItem("password", this.password);
              localStorage.setItem("userRole", 'admin');
              localStorage.setItem("teamName", '水利组');
              // this.$message.success("登录成功");
              // let role = res.data.status;
              this.$router.push({ path: "/project?id=" + this.jumpId });
          //   }
          // });
          if(this.jumpId==1){
            this.$router.push({ path: "/project"});
          }else if(this.jumpId==2){
            window.location.href="qualitymanage/qualityplan"
            this.$router.push({ path: "#"});
          }else if(this.jumpId==3){
            this.$router.push({ path: "/saftmanage"})
          }else if(this.jumpId==4){
            this.$router.push({ path: "/saftmanage"})
          }else if(this.jumpId==5){
            this.$router.push({ path: "/saftmanage"})
          }else if(this.jumpId==6){
            this.$router.push({ path: "#"})
          }else if(this.jumpId==7){
            this.$router.push({ path: "#"})
          }else if(this.jumpId==8){
            this.$router.push({ path: "#"})
          }
      }
    }
  },
  created() {},
  mounted() {
    this.mond();
    this.jumpId=this.$route.query.id;
    console.log(this.jumpId);
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.box {
  width: 100%;
  height: calc(100vh);
  background-image: url("../assets/images/login.jpg");
  .loginCon {
    width: 100%;
    height: calc(100vh);
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    box-shadow: 1px 1px 5px #3333;
    .logo {
      line-height: calc(100vh - 20px);
      font-size: 60px;
      // text-shadow:2px 2px 0px orange;
      margin-left: 100px;
      color: #ccc;
    }
    .login {
      width: 400px;
      height: 400px;
      // border-radius: 2%;
      padding: 30px 50px;
      background: #fff;
      position: absolute;
      left: 65%;
      top: 50%;
      margin-top: -200px;
      font-size: 18px;
      overflow: hidden;
      img {
        width: 33px;
        height: 34px;
        padding: 3px;
        float: left;
        display: block;
        &:nth-of-type(2) {
          padding: 10px 0px;
        }
      }
      .LoginIn {
        text-align: center;
      }
      .loginForm-group {
        margin: 10px 0px;
        border: 1px solid #ccc;
        padding: 0px;
        .form-control {
          width: 265px;
          border: none;
        }
        .yzm {
          width: 200px;
          border: 1px solid #ccc;
        }
      }
      .col-xs-8 {
        border: none;
      }
      .LoginSpan {
        width: 90px;
        line-height: 33px;
        border: 1px solid #ccc;
        margin: 10px 0px 10px 10px;
        padding: 0;
        border-radius: 5px;
        text-align: center;
      }
    }
  }
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
