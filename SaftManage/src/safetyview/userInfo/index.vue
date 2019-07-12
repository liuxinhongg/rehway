<template>
    <div>
        <div class="userInfo">
            <div class="navTab">
                <div :class="nav==0 ? class2:class1" @click="NavTab(0)"><i class="el-icon-menu"></i>个人信息</div>
                <div :class="nav==1 ? class2:class1" @click="NavTab(1)"><i class="el-icon-menu"></i>修改头像</div>
                <div :class="nav==2 ? class2:class1" @click="NavTab(2)"><i class="el-icon-menu"></i>修改密码</div>
            </div>
            <div v-if="nav==0" class="usermain">
                <info-input></info-input>
            </div>
            <div v-if="nav==1" class="usermain">
                <avatar-input></avatar-input>
            </div>
            <div v-if="nav==2" class="usermain">
                <pass-input></pass-input>
            </div>
        </div>
    </div>
</template>

<script>
import InfoInput from './my-info-input'
import AvatarInput from './my-avatar-input'
import * as security from '@/api/security.js'
import * as dictapi from '@/api/dictapi.js'
import PassInput from './my-password-input'
export default {
    components:{
        InfoInput,
        AvatarInput,
        PassInput
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
        }
    }
  
}
</script>

<style lang="scss">
.userInfo{
    width: 95%;
    margin: 20px auto;
    .navTab{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:400px;
        height: 50px;
        padding: 20px;
        .norstyle{
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            i{
                margin-right:10px;
                font-size: 16px;
            }
        }
        .activestyle{
            color: #337ab7;
        }
    }
    .usermain{
        // margin: 40px auto;
        border-top: 1px solid #ccc;
        padding: 10px 20px;
    }
}
</style>
