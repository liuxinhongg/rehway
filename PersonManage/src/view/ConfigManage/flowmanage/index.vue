<template>
    <div>
        <div class="userInfo">
            <div class="navTab">
                <div :class="nav==1 ? class2:class1" @click="NavTab(1)"><i class="el-icon-menu"></i>流程配置</div>
                <div :class="nav==0 ? class2:class1" @click="NavTab(0)"><i class="el-icon-menu"></i>流程分类</div>
            </div>
            <div v-if="nav==0" class="usermain">
                <sort></sort>
            </div>
            <div v-if="nav==1" class="usermain">
                <allocation></allocation>
            </div>
        </div>
    </div>
</template>

<script>
import sort from './sort/index'
import allocation from './allocation/index'
export default {
    components:{
        sort,allocation
    },
    data(){
        return{
            nav:1,
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
        width:250px;
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
        // margin: 20px auto;
        border-top: 1px solid #ccc;
        padding: 10px 20px;
    }
}
</style>
