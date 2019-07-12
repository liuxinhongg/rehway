<template>
    <div>
        <div class="companymanage">
            <div class="navTab">
                <div :class="nav==0 ? class2:class1" @click="NavTab(0)"><i class="el-icon-menu"></i>企业管理</div>
                <div :class="nav==1 ? class2:class1" @click="NavTab(1)"><i class="el-icon-menu"></i>参建单位配置</div>               
            </div>
            <div v-if="nav==0" class="usermain">
                <company-double></company-double>
            </div>
            <div v-if="nav==1" class="usermain">
                <contractors></contractors>
            </div>
        </div>
    </div>
</template>

<script>
import CompanyDouble from './companydouble'
import contractors from '@/view/personmanage/ConfigManage/contractors'
export default {
    components:{
        // ProjectConfig,
        contractors,
        CompanyDouble
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
.companymanage{
    width: 100%;
    margin: 20px auto;
    .navTab{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:300px;
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
        margin: auto;
        border-top: 1px solid #ccc;
        padding: 10px 20px;
    }
}
</style>
