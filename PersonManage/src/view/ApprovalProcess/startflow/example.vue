<template>
    <div>
        <div class="startflow" >
            <!-- 行政 -->
            <div class="leaveItem">
                <div class="leaveheading">
                    <p><i class="el-icon-menu"></i>行政</p>
                </div>
                <div class="detailItem">
                    <router-link to="/project/asset" class="routerOA">
                        <p><i class="iconfont icon-zcsq" style="font-size:50px;"></i></p>
                        <p class="caption">资产申请</p>
                    </router-link>
                </div>
            </div>
            <!-- 人事 -->
            <div class="leaveItem" >
                <div class="leaveheading">
                    <p> <i class="el-icon-menu"></i> 人事 </p>
                </div>
                <div class="detailItem">
                    <router-link to="/project/leave" class="routerOA">
                        <p><i class="iconfont icon-xjsq" style="font-size:45px;"></i></p> 
                        <p class="caption">休假申请</p>
                    </router-link>
                </div>
            </div>
            <!-- 财务 -->
            <div class="leaveItem" >
                <div class="leaveheading">
                    <p> <i class="el-icon-menu"></i> 财务 </p>
                </div>
                <div style="display: flex;justify-content: flex-start;">
                    <div class="detailItem" >
                        <router-link to="/project/reimbursement" class="routerOA">
                            <p><i class="iconfont icon-grbx" style="font-size:50px;"></i></p> 
                            <p class="caption">个人报销</p>
                        </router-link>
                    </div>
                    <div class="detailItem">
                        <router-link to="/project/cost" class="routerOA">
                            <p><i class="iconfont icon-fysq" style="font-size:50px;"></i></p> 
                            <p class="caption">费用申请</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            class1:newFunction(),
            class2:'itemtype active'
        }
    }
}
</script>

<style lang="scss">
.startflow{
    // width: 100%;
    flex: 1;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .leaveItem{
        width:40%;
        margin-left:5%;
        border: 1px solid #ccc;
        margin-top: 20px;
        .leaveheading{
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-radius: 3px;
            background: #efefef;
            text-indent: 1em;
        }
        .detailItem{
            width: 40%;
            height:90px;
            display:flex;
            padding:10px;
            margin: 15px;
            margin-left: 5%;
            justify-content: flex-start;
            background:#ccc;
            align-items: center;
            border-radius: 3px;
            .routerOA{
                display:flex;
                justify-content: flex-start;
                align-items: center;
            }
            .caption{
                text-indent: 1em;
                text-align: center;
                line-height: 100px;
                font-size: 24px;
                color:#5e5e5e;
            }
        }
    }
}
.thumbnail{
    width: 40%;
    margin-bottom:0px;
    border:0px;
    margin-left: 5%;
    border: 1px solid #ccc;
    display: flex;
    justify-content: flex-start;
}
</style>
