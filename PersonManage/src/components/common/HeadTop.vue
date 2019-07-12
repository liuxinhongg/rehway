<template>
    <div class="headtop">
        <div class="topcontent">
            <div class="detailContent"> 
                <div class="detailContent">
                    <div class="headDesc">
                        <p class="companyName">
                            <img src="../../assets/images/logo.png" style="height:40px;"/>  
                            <!-- <img src="../../assets/images/title1.svg" style="height:40px;"/>   -->
                        </p>
                        <p class="projectname">{{themtop}}</p>
                        <div class="sloga">
                            <p class="atten" @click="atten">通讯录</p>
                            <div>
                                <el-dropdown trigger="click" @command="handleCommand" >
                                    <span class="el-dropdown-link">
                                        <img src="../../assets/images/name.png" style="width:22px;height:22px;" class="img-circle">
                                        刘亦菲<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <p class="ImgRise">
                                            <img src="../../assets/images/userImg.jpg" alt="" srcset="">
                                        </p>
                                        <el-dropdown-item command="a"><i class="iconfont icon-userinfo" style="margin-right:5px;"></i> 个人信息</el-dropdown-item>
                                        <el-dropdown-item command="b"><i class="iconfont icon-pagehome" style="margin-right:10px;"></i>首页中心</el-dropdown-item>                                        
                                        <el-dropdown-item command="c"><i class="iconfont icon-outlogin" style="font-size:19px;"></i> 退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div>
                                <iframe width="250" scrolling="no" height="25" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=10&color=%23FFFFFF&icon=1&site=14"></iframe>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    components: {},
    props: {},
    data () {
        return {
            name:'username',
            themtop:'陕西睿合实业有限公司憰河工程项目部'
        };
    },
    watch: {},
    computed: {},
    methods: {
        atten(){
            this.$router.push({path:'/project/addresslist'});
        },
        handleCommand(command) {
            if(command=='a'){
                this.$router.push({path:'/project/userinfo'});
                console.log("a")
            }else if(command=="b"){
                this.$router.push('/home');
            }else if(command=="c"){
                this.$router.push({path:'/login'})
            }
        }
    },
    created () {
      let  msguser=localStorage.getItem("username");
      this.name=msguser;
    },
    mounted () {}
    };
</script>

<style lang="scss" scoped>
.headtop{
    width: 100%;
    .topcontent{
        width: 100%;
        height: 50px;
        background:#515151;
        box-shadow: 1px 1px 5px #ccc;                            
        .detailContent{
            width: 95%;
            height: 50px;
            margin: auto;
            display: flex;
            justify-content: flex-start;
            align-items: center;
           
            .headDesc{
                width:100%;
                margin:  0 auto;
                height: 50px;
                // flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .companyName{
                    font-size: 20px;
                    color: #ddd;
                    letter-spacing: 5px;
                    margin: 0;
                }
                .sloga{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .atten{
                        width: 70px;
                        height: 30px;
                        border: 1px solid #fff;
                        border-radius: 5px;
                        text-align: center;
                        line-height: 30px;
                        color: #fff;
                        font-size: 12px;
                        margin-right: 23px;
                        cursor: pointer;
                        &:hover{
                            background: #fff;
                            color: #5e5e5e;
                        }
                    }
                    .el-dropdown{
                        color:#fff;
                        height: 25px;
                        margin-right: 20px;
                    }
                    
                    .slogaImg{
                        width:40px;
                        height: 28px;
                        border-radius: 50%;
                        vertical-align:middle;
                        padding: 0 5px;
                        
                    }
                    .exit{
                        padding-left: 20px;
                        font-size: 14px;
                        cursor: pointer;
                    }
                }
                .projectname{
                    font-size: 22px;
                    color: #ddd;
                    margin: 0;

                }
            }
        }
    }
}
.ImgRise{
        width: 50px;
        height: 50px;
        margin: auto;
        img{
            width: 50px;
            height: 50px;
        }
    }
</style>
<style>
.el-dropdown-menu{
    border: 1px solid #ccc;
    width: 140px;
    margin-left: 30px;
}
</style>

