<template>
  <div>
    <top></top>
    <div class="containerpage">
      <div class="mainLeft">
        <el-scrollbar style="height:100%;">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu  default-active="1" background-color="#5e5e5e" text-color="#fff" menu-trigger="click" active-text-color="red" :unique-opened="true" >
                <router-link to="/saftmanage/safteducate">
                  <el-menu-item :class="menu==1 ? class1:class2" @click="mytask(1)">
                    <i class="iconfont icon-saftone" style="font-size:22px;"></i>
                    <span slot="title" style="margin-left:10px;">安全教育</span>
                  </el-menu-item>
                </router-link>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="iconfont icon-yjtwo" style="font-size:22px;"></i>
                    <span style="margin-left:9px;">应急救援</span>
                  </template>
                  <el-menu-item-group>
                    <el-submenu index="9">
                      <template slot="title"> 
                        <i class="iconfont icon-personhelp" style="font-size:19px;"></i>
                        <span style="margin-left:10px;">应急救援人员</span>
                      </template>
                      <el-menu-item-group>
                        <router-link to="/saftmanage/guaranteam">
                          <el-menu-item :class="menu==2 ? class1:class2" @click="mytask(2)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">后勤保障组</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <router-link to="/saftmanage/rescueteam">
                          <el-menu-item :class="menu==3 ? class1:class2" @click="mytask(3)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">应急救援组</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                    </el-submenu>
                    <router-link to="/saftmanage/emergerescue">
                      <el-menu-item :class="menu==4 ? class1:class2" @click="mytask(4)">
                        <i class="iconfont icon-saftzd" style="font-size:18px;margin-right: 11px;"></i>
                        <span slot="title" >安全制度</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="iconfont icon-saftpc" style="font-size:22px;"></i>
                    <span style="margin-left:8px;">安全排查</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/saftmanage/saftplan">
                      <el-menu-item :class="menu==6 ? class1:class2" @click="mytask(6)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">安全计划</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/saftmanage/safttoday">
                      <el-menu-item :class="menu==7 ? class1:class2" @click="mytask(7)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">今日检查计划</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/saftmanage/safthistory">
                      <el-menu-item :class="menu==17 ? class1:class2" @click="mytask(17)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">今日检查及历史</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="iconfont icon-xtpz" style="font-size:22px;"></i>
                    <span style="margin-left:6px;">系统配置</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/saftmanage/zone">
                      <el-menu-item :class="menu==5 ? class1:class2" @click="mytask(5)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">区域配置</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/saftmanage/hiddenconfig">
                      <el-menu-item :class="menu==6 ? class1:class2" @click="mytask(6)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">隐患类型配置</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
      <div class="mainmajor">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import top from "./HeadTop";
export default {
  components: {
    top
  },
  data() {
    return {
      menu: 0,
      class1: "normal",
      class2: "sure"
    };
  },
  mounted() {
    this.routedata()
    this.roleType = this.$route.query.role;
    //   console.log(this.roleType);
    this.sessiondata();
  },
  methods: {
    routedata(){
      let title = document.getElementById('titledata')
      console.log(title)
      title.innerHTML = '安全管理'
    },
    mytask(n) {
      this.menu = n;
    },
    sessiondata(){
      // console.log(sessionStorage.getItem('username')) 
      if(sessionStorage.getItem('username')== '' || sessionStorage.getItem('username')==null || sessionStorage.getItem('username')==undefined){
        console.log(1)
          this.$router.push('/login')
      }
    },
  }
};
</script>

<style>
.sure {
  background: #5e5e5e !important;
  color: #fff !important;
}
.normal {
  height: 50px;
  line-height: 50px;
  color: #fff !important;
  background: rgb(75, 75, 75) !important;
}
.mainLeft .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>


