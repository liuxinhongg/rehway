/*********************************************
 * @function: 项目--左侧菜单
 * @Author: 谢莹 
 * @Date: 2019-03-15
 *********************************************/
<template>
  <div>
    <top></top>
    <div class="containerpage">
      <div class="mainLeft">
        <el-scrollbar style="height:100%;">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu default-active="1" background-color="#5e5e5e" text-color="#fff" menu-trigger="click" active-text-color="red" :unique-opened="true" >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="iconfont icon-el-prove" style="font-size:22px;"></i>
                    <span style="margin-left:10px;">我的任务</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/project/startflow">
                      <el-menu-item :class="menu==11 ? class1:class2" @click="mytask(11)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">新建任务</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/undided">
                      <el-menu-item :class="menu==13 ? class1:class2" @click="mytask(13)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">待办任务</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/dealwith">
                      <el-menu-item :class="menu==14 ? class1:class2" @click="mytask(14)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">办结任务</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/draftbox">
                      <el-menu-item :class="menu==15 ? class1:class2" @click="mytask(15)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">草稿箱</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <!-- <el-submenu index="1">
                  <template slot="title">
                    <i class="iconfont icon-el-task" style="font-size:18px;"></i>
                    <span style="margin-left:12px;">我的任务</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/project/taskstart">
                      <el-menu-item :class="menu==2 ? class1:class2" @click="mytask(2)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">创建任务</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/unfinished">
                      <el-menu-item :class="menu==0 ? class1:class2" @click="mytask(0)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">未结任务</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/acting">
                      <el-menu-item :class="menu==1 ? class1:class2" @click="mytask(1)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">办结任务</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu> -->
                <el-submenu index="2">
                  <template slot="title">
                    <i class="iconfont icon-yh" style="font-size:18px;"></i>
                    <span style="margin-left:8px;">用户管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/project/accountlist">
                      <el-menu-item :class="menu==4 ? class1:class2" @click="mytask(4)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">账号管理</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/integral">
                      <el-menu-item :class="menu==5 ? class1:class2" @click="mytask(5)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">积分管理</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/uploadname">
                      <el-menu-item :class="menu==27 ? class1:class2" @click="mytask(27)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">实名制上传</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="iconfont icon-el-kaoqin" style="font-size:22px;"></i>
                    <span style="margin-left:8px;">考勤管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/project/AttendanceManage">
                      <el-menu-item :class="menu==6 ? class1:class2" @click="mytask(6)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">考勤查询</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/persons">
                      <el-menu-item :class="menu==7 ? class1:class2" @click="mytask(7)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">在场人员</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/formcenter">
                      <el-menu-item :class="menu==8 ? class1:class2" @click="mytask(8)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">报表中心</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                
                <!-- 文件管理 -->
                <el-submenu index="6">
                  <template slot="title">
                    <i class="iconfont icon-el-file" style="font-size:19px;"></i>
                    <span style="margin-left:10px;">文件管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/project/filemanage">
                      <el-menu-item :class="menu==24 ? class1:class2" @click="mytask(24)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">全部文件</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/recycle">
                      <el-menu-item :class="menu==26 ? class1:class2" @click="mytask(26)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">回收站</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <router-link to="/project/systemmanage">
                  <el-menu-item :class="menu==16 ? class1:class2" @click="mytask(16)">
                    <i class="iconfont icon-el-system" style="font-size:22px;"></i>
                    <span slot="title" style="margin-left:10px;">制度管理</span>
                  </el-menu-item>
                </router-link>
                <el-submenu index="7">
                  <template slot="title">
                    <i class="iconfont icon-el-meeting" style="font-size:20px;"></i>
                    <span style="margin-left:10px;">会议管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/project/search">
                      <el-menu-item :class="menu==18 ? class1:class2" @click="mytask(18)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">查询</span>
                      </el-menu-item>
                    </router-link>
                    <router-link to="/project/reservation">
                      <el-menu-item :class="menu==19 ? class1:class2" @click="mytask(19)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">预定</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="8">
                  <template slot="title">
                    <i class="iconfont icon-el-adverce" style="font-size:24px;"></i>
                    <span style="margin-left:8px;">内容管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/project/announcemanage">
                      <el-menu-item :class="menu==20 ? class1:class2" @click="mytask(20)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">公告</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                  <el-menu-item-group>
                    <router-link to="/project/newsmanage">
                      <el-menu-item :class="menu==21 ? class1:class2" @click="mytask(21)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">新闻</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <router-link to="/project/searchsalary">
                  <el-menu-item :class="menu==22 ? class1:class2" @click="mytask(22)">
                    <i class="iconfont icon-salary" style="font-size:20px;"></i>
                    <span slot="title" style="margin-left: 10px;">工资发放</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/project/projecttrain">
                  <el-menu-item :class="menu==23 ? class1:class2" @click="mytask(23)">
                    <i class="iconfont icon-train" style="font-size:22px;"></i>
                    <span slot="title" style="margin-left: 10px;">项目培训</span>
                  </el-menu-item>
                </router-link>
                <el-submenu index="10">
                  <template slot="title">
                    <i class="iconfont icon-el-config" style="font-size:22px;"></i>
                    <span style="margin-left:10px;">配置管理</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/project/menu">
                      <el-menu-item :class="menu==28 ? class1:class2" @click="mytask(28)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">用户配置管理</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                  <el-menu-item-group>
                    <router-link to="/project/company">
                      <el-menu-item :class="menu==29 ? class1:class2" @click="mytask(29)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">企业管理信息</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                  <!-- <el-submenu index="11">
                    <template slot="title"> 
                      <i class="el-icon-menu"></i>
                      <span slot="title">企业管理信息</span>
                    </template>
                    <el-menu-item-group>
                      <router-link to="/project/company">
                        <el-menu-item :class="menu==29 ? class1:class2" @click="mytask(29)">
                          <i class="el-icon-menu"></i>
                          <span slot="title">企业信息</span>
                        </el-menu-item>
                      </router-link>
                    </el-menu-item-group>
                    <el-menu-item-group>
                      <router-link to="/project/overallbusiness">
                        <el-menu-item :class="menu==34 ? class1:class2" @click="mytask(34)">
                          <i class="el-icon-menu"></i>
                          <span slot="title">分包商</span>
                        </el-menu-item>
                      </router-link>
                    </el-menu-item-group>
                  </el-submenu> -->
                  <el-submenu index="12">
                    <template slot="title"> 
                      <i class="el-icon-menu"></i>
                      <span slot="title">项目管理</span>
                    </template>
                    <el-menu-item-group>
                      <router-link to="/project/projectconfig">
                        <el-menu-item :class="menu==35 ? class1:class2" @click="mytask(35)">
                          <i class="el-icon-menu"></i>
                          <span slot="title">项目信息</span>
                        </el-menu-item>
                      </router-link>
                    </el-menu-item-group>
                    <el-menu-item-group>
                      <router-link to="/project/subpackage">
                        <el-menu-item :class="menu==36 ? class1:class2" @click="mytask(36)">
                          <i class="el-icon-menu"></i>
                          <span slot="title">分包项目</span>
                        </el-menu-item>
                      </router-link>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-menu-item-group>
                    <router-link to="/project/flowsort">
                      <el-menu-item :class="menu==30 ? class1:class2" @click="mytask(30)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">流程配置</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                  <el-menu-item-group>
                  <router-link to="/project/taskmanage">
                    <el-menu-item :class="menu==31 ? class1:class2" @click="mytask(31)">
                      <i class="el-icon-menu"></i>
                      <span slot="title">任务管理(待删除)</span>
                    </el-menu-item>
                  </router-link>
                  </el-menu-item-group>
                  <el-menu-item-group>
                    <router-link to="/project/userinfo">
                      <el-menu-item :class="menu==32 ? class1:class2" @click="mytask(32)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">个人信息</span>
                      </el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                  <el-menu-item-group>
                    <router-link to="/project/equiplist">
                      <el-menu-item :class="menu==33 ? class1:class2" @click="mytask(33)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">设备信息</span>
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


