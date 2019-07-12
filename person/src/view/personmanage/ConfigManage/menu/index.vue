<template>
    <div>
        <div class="menuInfo">
            <div class="navTab">
                <router-link to="/project/menu/usercontrol">
                    <div :class="nav==0 ? class2:class1" @click="NavTab(0)"><i class="el-icon-menu"></i>用户配置</div>
                </router-link>
                <router-link to="/project/menu/rolemanagement">
                    <div :class="nav==1 ? class2:class1" @click="NavTab(1)"><i class="el-icon-menu"></i>角色配置</div>
                </router-link>
                <router-link to="/project/menu/rolejurisdiction">
                    <div :class="nav==6 ? class2:class1" @click="NavTab(6)"><i class="el-icon-menu"></i>权限配置</div>
                </router-link>
                <!-- <router-link to="/project/menu/menumanage">
                    <div :class="nav==2 ? class2:class1" @click="NavTab(2)"><i class="el-icon-menu"></i>菜单配置</div> 
                </router-link> -->
                <router-link to="/project/menu/partconfig">
                    <div :class="nav==3 ? class2:class1" @click="NavTab(3)"><i class="el-icon-menu"></i>部门配置</div>
                </router-link>
                <router-link to="/project/menu/teamconfig">
                    <div :class="nav==4 ? class2:class1" @click="NavTab(4)"><i class="el-icon-menu"></i>班组配置</div>
                </router-link>
                <router-link to="/project/menu/kqconfig">
                    <div :class="nav==5 ? class2:class1" @click="NavTab(5)"><i class="el-icon-menu"></i>考勤时间配置</div>
                </router-link>
            </div>
            <br>
            <div class="listtwomenu">
                <router-view></router-view>
            </div>
            <!-- <div v-if="nav==0" class="usermain">
                <integral></integral>
            </div>
            <div v-if="nav==1" class="usermain">
                <role-management></role-management>
            </div>
            <div v-if="nav==2" class="usermain">
                <menu-manage></menu-manage>
            </div>
            <div v-if="nav==3" class="usermain">
                <router-view></router-view>
                <part-config></part-config>
            </div>
            <div v-if="nav==4" class="usermain">
                <team-config></team-config>
            </div>
            <div v-if="nav==5" class="usermain">
                <kq-config></kq-config>
            </div> -->
        </div>
    </div>
</template>

<script>
// import InfoInput from './my-info-input'
import integral from '@/view/personmanage/ConfigManage/user/usercontrol'
import RoleManagement from '@/view/personmanage/ConfigManage/role/rolemanagement'
import MenuManage from './menumanage'
import TeamConfig from '@/view/personmanage/ConfigManage/menu/teamconfig/index'
import PartConfig from '@/view/personmanage/ConfigManage/menu/partconfig/index'
import KqConfig from './userattan/index'
export default {
    components:{
        integral,
        RoleManagement,
        MenuManage,
        TeamConfig,
        KqConfig,
        PartConfig
    },
    data(){
        return{
            nav:0,
            class1:'norstyle',
            class2:'norstyle activestyle'
        }
    },
    methods:{
        NavTab(n){
            this.nav=n;
            // if(this.nav==3){
            //     this.$router.push('/project/partconfig')
            // }
        }
    }
  
}
</script>

<style lang="scss">
.menuInfo{
    width: 100%;
    margin: 20px auto;
    .navTab{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:700px;
        height: 50px;
        padding: 20px;
        .norstyle{
            font-size: 14px;
            height: 40px;
            color:#000;
            line-height: 40px;
            cursor: pointer;
            text-decoration:none;
            i{
                margin-right:10px;
                font-size: 16px;
            }
        }
        .activestyle{
            color: #337ab7;
        }
    }
    .listtwomenu{
        width: 95%;
        margin: auto;
    }
    .usermain{
        margin: auto;
        border-top: 1px solid #ccc;
        padding: 10px 20px;
    }
}
</style>
