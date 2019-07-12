<template>
    <div class="emailtotal">
        <div class="navTab">
            <div :class="email==0 ? class2:class1" @click="mailTab(0)"><i class="el-icon-menu"></i>邮件配置</div>
            <div :class="email==1 ? class2:class1" @click="mailTab(1)"><i class="el-icon-menu"></i>邮件模板</div>
            <div :class="email==2 ? class2:class1" @click="mailTab(2)"><i class="el-icon-menu"></i>邮件历史</div>
        </div>
        <div v-if="email==0" class="usermain">
            <email-config></email-config>
        </div>
        <div v-if="email==1" class="usermain">
            <email-model></email-model>
        </div>
        <div v-if="email==2" class="usermain">
            <emial-history></emial-history>
        </div>
    </div>
</template>

<script>
import EmailConfig from './emailconfig/emailconfig';
import EmailModel from './emailmodel/emailmodel'
import EmialHistory from './emailhistory/index'
export default {
     components:{
        EmailConfig,
        EmailModel,
        EmialHistory
    },
    data(){
        return{
            email:0,
            class1:'norstyle',
            class2:'norstyle activestyle'
        }
    },
     methods:{
        mailTab(n){
            this.email=n;
        }
    }
}
</script>

<style lang="scss">
.emailtotal{
    width: 95%;
    margin: auto;
    padding: 10px 20px;
    .optop{
        margin-left: 50px;
    }
    .navTab{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:400px;
        height: 50px;
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
        margin: auto;
        border-top: 1px solid #ccc;
        // padding-bottom: 20px;
    }
}
</style>
