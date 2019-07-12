<template>
  <div>
    <top></top>
    <div class="containerpage">
      <div class="mainLeft">
        <el-scrollbar style="height:100%;">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu  default-active="1" background-color="#5e5e5e" text-color="#fff" menu-trigger="click" active-text-color="red" :unique-opened="true" >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="iconfont icon-check" style="font-size:20px;"></i>
                    <span style="margin-left:9px;">质量检查</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/qualitymanage/qualityplan">
                      <el-menu-item :class="menu==1 ? class1:class2" @click="mytask(1)">
                        <i class="el-icon-menu" style="font-size:18px;margin-right: 11px;"></i>
                        <span slot="title" >质量检查计划</span>
                      </el-menu-item>
                    </router-link>
                    <el-submenu index="2">
                      <template slot="title"> 
                        <i class="el-icon-menu" style="font-size:19px;"></i>
                        <span style="margin-left:10px;">质量检查</span>
                      </template>
                      <el-menu-item-group>
                        <router-link to="/qualitymanage/currentTask">
                          <el-menu-item :class="menu==2 ? class1:class2" @click="mytask(2)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">当日检查任务</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <router-link to="/qualitymanage/unfinishtask">
                          <el-menu-item :class="menu==3 ? class1:class2" @click="mytask(3)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">未完成检查</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <router-link to="/qualitymanage/qualityfinished">
                          <el-menu-item :class="menu==4 ? class1:class2" @click="mytask(4)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">已完成检查</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                      <template slot="title"> 
                        <i class="el-icon-menu" style="font-size:19px;"></i>
                        <span style="margin-left:10px;">质量整改</span>
                      </template>
                      <el-menu-item-group>
                        <router-link to="/qualitymanage/projectsearch">
                          <el-menu-item :class="menu==5 ? class1:class2" @click="mytask(5)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">整改项目查询</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <router-link to="/qualitymanage/rectifyapplay">
                          <el-menu-item :class="menu==6 ? class1:class2" @click="mytask(6)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">整改申请</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <router-link to="/qualitymanage/rectifyapprove">
                          <el-menu-item :class="menu==7 ? class1:class2" @click="mytask(7)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">整改审批</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                      <template slot="title"> 
                        <i class="el-icon-menu" style="font-size:19px;"></i>
                        <span style="margin-left:10px;">质量报表</span>
                      </template>
                      <el-menu-item-group>
                        <router-link to="/qualitymanage/reportpassed">
                          <el-menu-item :class="menu==8 ? class1:class2" @click="mytask(8)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">已通过的质量问题</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <router-link to="/qualitymanage/reportunpassed">
                          <el-menu-item :class="menu==9 ? class1:class2" @click="mytask(9)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">存在问题的质量检查</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                    </el-submenu>
                  </el-menu-item-group>
                </el-submenu>
                <router-link to="/qualitymanage/qualityreceive">
                  <el-menu-item :class="menu==10 ? class1:class2" @click="mytask(10)">
                    <i class="iconfont icon-ys" style="font-size:22px;"></i>
                    <span slot="title" style="margin-left:10px;">质量验收</span>
                  </el-menu-item>
                </router-link>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="iconfont icon-measure" style="font-size:22px;"></i>
                    <span style="margin-left:8px;">实测实量管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/qualitymanage/prostandard">
                      <el-menu-item :class="menu==11 ? class1:class2" @click="mytask(11)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">项目标准</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/qualitymanage/measuredata">
                      <el-menu-item :class="menu==12 ? class1:class2" @click="mytask(12)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">测量数据管理</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <router-link to="/qualitymanage/qualityconfig">
                  <el-menu-item :class="menu==13 ? class1:class2" @click="mytask(13)">
                    <i class="iconfont icon-manage" style="font-size:22px;"></i>
                    <span slot="title" style="margin-left:10px;">质量管理配置</span>
                  </el-menu-item>
                </router-link>
                <!-- <el-submenu index="4">
                  <template slot="title">
                    <i class="iconfont icon-xtpz" style="font-size:22px;"></i>
                    <span style="margin-left:6px;">质量管理配置</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/qualitymanage/zone">
                      <el-menu-item :class="menu==5 ? class1:class2" @click="mytask(5)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">区域配置</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/qualitymanage/hiddenconfig">
                      <el-menu-item :class="menu==6 ? class1:class2" @click="mytask(6)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">隐患类型配置</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu> -->
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
    this.roleType = this.$route.query.role;
    this.routedata();
    //   console.log(this.roleType);
    this.sessiondata();
  },
  methods: {
    routedata(){
      let title = document.getElementById('titledata')
      console.log(title)
      title.innerHTML = '质量管理'
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


