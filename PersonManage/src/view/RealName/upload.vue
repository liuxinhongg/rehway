<template>
    <div>
        <div class="loadname">
            <div class="navTab">
                <div :class="nav==0 ? class2:class1" @click="NavTab(0)"><el-button type="primary">实名制上传</el-button></div>
                <div :class="nav==1 ? class2:class1" @click="NavTab(1)"><el-button>上传历史</el-button></div>
            </div>
            <div v-if="nav==0" class="usermain">
                <!-- <new-appear></new-appear> -->
            </div>
            <div v-if="nav==1" class="usermain">
                <!-- <photo-avatar></photo-avatar> -->
            </div>
        </div>
    </div>
</template>

<script>
import NewAppear from './appear'
import PhotoAvatar from './photoavatar'
export default {
    components:{
        NewAppear,
        PhotoAvatar
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
.loadname{
    width: 100%;
    margin: 20px auto;
    .navTab{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:350px;
        height: 50px;
        padding: 10px 40px;
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
        margin: 10px auto;
        // border-top: 1px solid #ccc;
        padding: 10px 20px;
    }
}
</style>
