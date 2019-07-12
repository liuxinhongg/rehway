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
                    <i class="iconfont icon-sbxq" style="font-size:26px;"></i>
                    <span style="margin-left:6px;">设备需求</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/equipmanage/needsearch">
                      <el-menu-item :class="menu==1 ? class1:class2" @click="mytask(1)">
                        <i class="iconfont icon-chaxun" style="font-size:20px;margin-right: 11px;"></i>
                        <span slot="title">设备需求计划</span>
                      </el-menu-item>
                    </router-link>
                    <!-- <router-link to="/equipmanage/planning">
                      <el-menu-item :class="menu==2 ? class1:class2" @click="mytask(2)">
                        <i class="iconfont icon-zhibiaojihua" style="font-size:20px;margin-right: 11px;"></i>
                        <span slot="title" >计划编制</span>
                      </el-menu-item>
                    </router-link> -->
                  </el-menu-item-group>
                  <el-submenu index="1-1">
                    <template slot="title"> 
                      <i class="iconfont icon-dengji" style="font-size:26px;margin-right: 5px;"></i>
                      <span slot="title">设备登记</span>
                    </template>
                    <el-menu-item-group>
                      <router-link to="/equipmanage/equipreg">
                        <el-menu-item :class="menu==3 ? class1:class2" @click="mytask(3)">
                          <i class="el-icon-menu"></i>
                          <span slot="title">设备注册</span>
                        </el-menu-item>
                      </router-link>
                    </el-menu-item-group>
                    <el-menu-item-group>
                      <router-link to="/equipmanage/operatorReg">
                        <el-menu-item :class="menu==4 ? class1:class2" @click="mytask(4)">
                          <i class="el-icon-menu"></i>
                          <span slot="title">操作员注册</span>
                        </el-menu-item>
                      </router-link>
                    </el-menu-item-group>
                    <el-menu-item-group>
                      <router-link to="/equipmanage/equipmanage">
                        <el-menu-item :class="menu==5 ? class1:class2" @click="mytask(5)">
                          <i class="el-icon-menu"></i>
                          <span slot="title">设备管理</span>
                        </el-menu-item>
                      </router-link>
                    </el-menu-item-group>
                  </el-submenu>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="iconfont icon-sbwh" style="font-size:22px;"></i>
                    <span style="margin-left:8px;">设备维护</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/equipmanage/upkeeplan">
                      <el-menu-item :class="menu==6 ? class1:class2" @click="mytask(6)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">设备保养计划</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/equipmanage/todayupkeep">
                      <el-menu-item :class="menu==7 ? class1:class2" @click="mytask(7)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">当日保养</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/equipmanage/upkeephistory">
                      <el-menu-item :class="menu==8 ? class1:class2" @click="mytask(8)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">保养历史</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/equipmanage/euiprepair">
                      <el-menu-item :class="menu==9 ? class1:class2" @click="mytask(9)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">设备维修</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/equipmanage/repairfree">
                      <el-menu-item :class="menu==10 ? class1:class2" @click="mytask(10)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">维修费用查询</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="iconfont icon-yyjh" style="font-size:20px;"></i>
                    <span style="margin-left:8px;">设备运营计划</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/equipmanage/plansearch">
                      <el-menu-item :class="menu== 11 ? class1:class2" @click="mytask(11)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">运营计划</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/equipmanage/oilwear">
                      <el-menu-item :class="menu==12 ? class1:class2" @click="mytask(12)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">设备油耗</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/equipmanage/datamonitor">
                      <el-menu-item :class="menu==13 ? class1:class2" @click="mytask(13)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">运营数据监控</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/equipmanage/rundata">
                      <el-menu-item :class="menu==14 ? class1:class2" @click="mytask(14)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">运营数据</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/equipmanage/equipcount">
                      <el-menu-item :class="menu==15 ? class1:class2" @click="mytask(15)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">设备运营结算</span>
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
    this.roleType = this.$route.query.role;
    //   console.log(this.roleType);
  },
  methods: {
    mytask(n) {
      this.menu = n;
    }
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
/* li {
  color: #fff;
} */
.mainLeft .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>


