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
                    <i class="iconfont icon-jihua" style="font-size:22px;"></i>
                    <span style="margin-left:9px;">物资计划</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/materialmanage/goodslplan">
                      <el-menu-item :class="menu==1 ? class1:class2" @click="mytask(1)">
                        <i class="iconfont icon-jh" style="font-size:19px;"></i>
                        <span slot="title" style="margin-left:10px;">材料总计划</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/materialmanage/needplan">
                      <el-menu-item :class="menu==2 ? class1:class2" @click="mytask(2)">
                        <i class="iconfont icon-xyjh" style="font-size:22px;"></i>
                        <span slot="title" style="margin-left:8px;">材料需用计划</span>
                      </el-menu-item>
                    </router-link>
                    <el-submenu index="9">
                      <template slot="title"> 
                        <i class="iconfont icon-ht" style="font-size:19px;"></i>
                        <span style="margin-left:10px;">材料合同</span>
                      </template>
                      <el-menu-item-group>
                        <router-link to="/materialmanage/pactmanage">
                          <el-menu-item :class="menu==3 ? class1:class2" @click="mytask(3)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">合同管理</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                      <el-menu-item-group>
                        <router-link to="/materialmanage/materialcount">
                          <el-menu-item :class="menu==4 ? class1:class2" @click="mytask(4)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">材料结算</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group>
                      <!-- <el-menu-item-group>
                        <router-link to="/materialmanage/materialpay">
                          <el-menu-item :class="menu==5 ? class1:class2" @click="mytask(5)">
                            <i class="el-icon-menu"></i>
                            <span slot="title">材料付款</span>
                          </el-menu-item>
                        </router-link>
                      </el-menu-item-group> -->
                    </el-submenu>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="iconfont icon-rc" style="font-size:22px;"></i>
                    <span style="margin-left:8px;">材料入场</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/materialmanage/materialenter">
                      <el-menu-item :class="menu==6 ? class1:class2" @click="mytask(6)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">入场验收</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="iconfont icon-cc" style="font-size:22px;"></i>
                    <span style="margin-left:6px;">材料出库</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/materialmanage/materialexit">
                      <el-menu-item :class="menu==7 ? class1:class2" @click="mytask(7)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">材料进退库</span>
                      </el-menu-item>
                    </router-link>
                    <!-- <router-link to="/materialmanage/materialretreat">
                      <el-menu-item :class="menu==8 ? class1:class2" @click="mytask(8)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">材料退库</span>
                      </el-menu-item>
                    </router-link> -->
                  </el-menu-item-group>
                </el-submenu>
                <router-link to="/materialmanage/datafx">
                  <el-menu-item :class="menu==9 ? class1:class2" @click="mytask(9)">
                    <i class="iconfont icon-sjfx" style="font-size:22px;"></i>
                    <span slot="title" style="margin-left:10px;">数据分析</span>
                  </el-menu-item>
                </router-link>
                <!-- <router-link to="/materialmanage/matericalallot">
                  <el-menu-item :class="menu==10 ? class1:class2" @click="mytask(10)">
                    <i class="iconfont icon-tb" style="font-size:18px;"></i>
                    <span slot="title" style="margin-left:10px;">材料调拨</span>
                  </el-menu-item>
                </router-link> -->
                <el-submenu index="4">
                  <template slot="title">
                    <i class="iconfont icon-pd" style="font-size:22px;"></i>
                    <span style="margin-left:8px;">材料盘点</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/materialmanage/matericalcheck">
                      <el-menu-item :class="menu==11 ? class1:class2" @click="mytask(11)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">仓库材料明细表</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <!-- class="iconfont icon-pz" -->
                    <i class="el-icon-s-tools" style="font-size:22px;"></i>
                    <span style="margin-left:2px;">材料配置</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/materialmanage/supplyconfig">
                      <el-menu-item :class="menu==12 ? class1:class2" @click="mytask(12)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">供应商配置</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/materialmanage/basicgoodsbank">
                      <el-menu-item :class="menu==13 ? class1:class2" @click="mytask(13)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">基础物资库</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/materialmanage/storehouse">
                      <el-menu-item :class="menu==14 ? class1:class2" @click="mytask(14)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">仓库配置</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/materialmanage/packconfig">
                      <el-menu-item :class="menu==15 ? class1:class2" @click="mytask(15)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">合同配置</span>
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
      title.innerHTML = '材料管理'
    },
    mytask(n) {
      this.menu = n;
    },
    sessiondata(){
      // console.log(sessionStorage.getItem('username')) 
      // if(sessionStorage.getItem('username')== '' || sessionStorage.getItem('username')==null || sessionStorage.getItem('username')==undefined){
      //   console.log(1)
      //     this.$router.push('/login')
      // }
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
  border-right: 4px solid #66bf00;
}
.mainLeft .el-scrollbar__wrap {
  overflow-x: hidden;
}
.tac{
  margin-top:10px;
}
</style>


