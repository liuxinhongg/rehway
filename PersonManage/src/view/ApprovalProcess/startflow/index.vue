/*********************************************
 * @function: 审批流程首页
 * @Author: 刘新红 
 * @Date: 2019-05-12
 *********************************************/
<template>
    <div>
        <div class="startflow" >
            <div class="topTab">
                <div class="navTab">
                    <router-link to="/project/startflow/leave">
                        <div :class="nav==0 ? class2:class1" @click="NavTab(0)"><i class="el-icon-menu"></i>人事-休假申请</div>
                    </router-link>
                    <router-link to="/project/startflow/asset">
                        <div :class="nav==1 ? class2:class1" @click="NavTab(1)"><i class="el-icon-menu"></i>行政-资产申请</div>
                    </router-link>
                    <router-link to="/project/startflow/reimbursement">
                        <div :class="nav==2 ? class2:class1" @click="NavTab(2)"><i class="el-icon-menu"></i>财务-个人报销</div> 
                    </router-link>
                    <router-link to="/project/startflow/cost">
                        <div :class="nav==3 ? class2:class1" @click="NavTab(3)" ><i class="el-icon-menu"></i>财务-费用申请</div>
                    </router-link>
                </div>
            </div>
            <div class="listtwomenu">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
.startflow{
    width: 100%;
    .topTab{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #efefef;
    }
    .navTab{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:600px;
        height: 50px;
        padding: 0 20px;
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
}
</style>
