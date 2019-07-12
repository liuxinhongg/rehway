<template>
    <div>
        <div class="userInfo">
            <div class="navTab">
                <div :class="nav==0 ? class2:class1" @click="NavTab(0)"><i class="el-icon-menu"></i>个人信息</div>
                <!-- <div :class="nav==1 ? class2:class1" @click="NavTab(1)"><i class="el-icon-menu"></i>修改头像</div> -->
                <div :class="nav==2 ? class2:class1" @click="NavTab(2)"><i class="el-icon-menu"></i>修改密码</div>
            </div>
            <!-- <div v-if="nav==0" class="usermain">
                <info-input></info-input>
            </div>
            <div v-if="nav==1" class="usermain">
                <avatar-input></avatar-input>
            </div> -->
            <div v-if="nav==2" class="usermain">
                <pass-input></pass-input>
            </div> 
            <div v-if="nav==0" class="usermain">
                <el-form class="form-horizontal" ref="userinfoform"  @submit.native.prevent :model="userinfoform" :rules="userrules">
                    <table border="1" class="tableinsert" style="width:90%;">
                        <tr>
                            <td class="tdleft">头像：</td>
                            <td colspan="3">
                                <div style="display:flex;justify-content:flex-start;padding:5px;">
                                    <img :src="'data:image/jpeg;base64,'+userinfoform.headImage" v-show="!ariseavater" alt="" srcset="" style="width:90px;height:90px;margin-right:10px;">
                                    <p class="modify" @click="modifyavatar" v-show="Imagemodify">修改头像</p>                                    
                                    <el-upload action=" " accept="image/*" :limit="1" v-show="ariseavater"
                                        list-type="picture-card"
                                        :before-upload="beforeAvatarUpload"
                                        :http-request="AvatarUpload">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft">姓名：</td>
                            <td>
                               <p v-show="truefalse">{{userinfoform.workerName}}</p> 
                                <el-form-item v-show="!truefalse">
                                    <el-input v-model.trim="userinfoform.workerName" style="width:280px;" placeholder="请输入设备名称"></el-input>
                                </el-form-item>
                            </td>
                            <td class="tdleft">性别：</td>
                            <td> 
                               <p v-show="truefalse">{{userinfoform.gender==0?'男':'女'}} </p>
                               <el-form-item required v-show="!truefalse">
                                    <el-select v-model="userinfoform.gender" placeholder="请选性别" style="width:280px">
                                        <el-option label="男" value="0"></el-option>
                                        <el-option label="女" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft">电话：</td>
                            <td>
                                <p v-show="truefalse">{{userinfoform.cellPhone}}</p>
                                <el-form-item v-show="!truefalse">
                                 <el-input v-model.trim="userinfoform.cellPhone" style="width:280px;" placeholder="请输入设备名称"></el-input>
                                </el-form-item>
                            </td>
                            <td class="tdleft">地址：</td>
                            <td>
                                <p v-show="truefalse"> {{userinfoform.address}} </p>
                                <el-form-item v-show="!truefalse" prop="address">
                                 <el-input v-model.trim="userinfoform.address" style="width:280px;"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft">民族：</td>
                            <td>
                                <p v-show="truefalse">{{userinfoform.nation}}</p>
                                <el-form-item v-show="!truefalse">
                                    <el-form-item required prop="nation">
                                        <el-select v-model="userinfoform.nation" style="width:280px">
                                            <el-option v-for="(item,index) in nationoption" :key="index" :value="item.nation">{{item.nation}}</el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form-item>
                            </td>
                            <td class="tdleft">出生日期：</td>
                            <td>
                                <p v-show="truefalse"> {{userinfoform.birthday|formatDate}} </p>
                                <el-form-item v-show="!truefalse" prop="birthday">
                                    <el-date-picker v-model="userinfoform.birthday" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp" style="width:280px;"></el-date-picker>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr >
                            <td class="tdleft" >工资银行联号：</td>
                            <td >
                                <p v-show="truefalse"> {{userinfoform.bankLinkNumber}} </p>
                                <el-form-item v-show="!truefalse" prop="bankLinkNumber">
                                    <el-input v-model.trim="userinfoform.bankLinkNumber" style="width:280px" placeholder="请输入工资银行联号"></el-input>
                                </el-form-item>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr >
                            <td class="tdleft">发放工资银行卡号：</td>
                            <td>
                                <p v-show="truefalse"> {{userinfoform.payRollBankCardNumber}} </p>
                                <el-form-item v-show="!truefalse" prop="payRollBankCardNumber">
                                    <el-input v-model="userinfoform.payRollBankCardNumber" style="width:280px;"></el-input>
                                </el-form-item>
                            </td>
                            <td class="tdleft">支行名称：</td>
                            <td>
                                <p v-show="truefalse"> {{userinfoform.payRollBankName}} </p>
                                <el-form-item v-show="!truefalse" prop="payRollBankName">
                                    <el-input v-model.trim="userinfoform.payRollBankName" style="width:280px" placeholder="请输入支行名称"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft">工种：</td>
                            <td>
                                <p v-show="truefalse">{{userinfoform.workTypeName}}</p>
                                <el-form-item v-show="!truefalse">
                                    <el-select v-model="userinfoform.workType" style="width:280px">
                                        <el-option  v-for="(item,index) in workT" :key="index" :label="item.roleName"  :value="item.roleId"></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td class="tdleft">工人类型：</td>
                            <td>
                                <p v-show="truefalse"> {{userinfoform.workRole=='10'? '管理人员':'建筑工人'}} </p>
                                <el-form-item v-show="!truefalse">
                                    <el-select v-model="userinfoform.workRole" placeholder="请选是否" style="width:280px">
                                        <el-option label="管理人员" value="10"></el-option>
                                        <el-option label="建筑工人" value="20"></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                        </tr>
                    </table> 
                    <el-form-item style="text-align:center;" v-show="ariseavater">
                        <el-button type="primary" @click="modify()">修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
// import InfoInput from './my-info-input'
// import AvatarInput from './my-avatar-input'
import formatDate from '@/filter/date.js';
import PassInput from './my-password-input'
export default {
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    components:{
        // InfoInput,
        // AvatarInput,
        PassInput
    },
    data(){
        return{
            nav:0,
            class1:'norstyle',
            class2:'norstyle activestyle',
            userinfo:'',
            userinfoform:{},
            imageUrl: '',
            userrules:{
                address:[{ required: true, message: '请输入地址', trigger: 'blur'},
                    { pattern:/^[\u4e00-\u9fa5_0-9]{7,20}$/,message:'请输入正确的地址' } ],
                bankLinkNumber:[
                    { required: false, message: '请输入银行卡号', trigger: 'blur' },
                    { pattern:/^[1-9]{1}[0-9]{15,18}$/,message:'请输入银行卡号' }
                ],
                payRollBankCardNumber:[
                    { required: false, message: '请输入银行卡号', trigger: 'blur' },
                    { pattern:/^[1-9]{1}[0-9]{15,18}$/,message:'请输入银行卡号' }
                ],
                payRollBankName:[{ required: true, message: "请输入支行名称", trigger: "blur" },
                { pattern:/^[\u4e00-\u9fa5]{4,40}$/,message:'请输入正确的支行名称' }
                ], 
            },
            ariseavater:false,
            Imagemodify:true,
            truefalse:true,
            nationoption:[],
            workT: [],
            modifyform:new FormData()
        }
    },
    created(){
        this.userinfo=sessionStorage.getItem('userId');
        this.getuser();
    },
    methods:{
        NavTab(n){
            this.nav=n;
        },
        modifyavatar(){
            this.ariseavater=true;
            this.Imagemodify=false;
            this.truefalse=false;
        },
        getuser(){
            this.$http.get('/api/user/select',{params:{workerId:this.userinfo}}).then(res=>{
                console.log(res);
                this.userinfoform=res.data.list[0];
                if(typeof(res.data.list[0].gender)=='number'){
                    this.userinfoform.gender=res.data.list[0].gender.toString(); 
                }
                if(typeof(res.data.list[0]).workRole=='number'){
                    this.userinfoform.workRole=res.data.list[0].workRole.toString()
                }
            })
        },
        modify(){
            console.log(this.userinfoform.birthday)
            this.modifyform.append('birthday',this.userinfoform.birthday)
            this.modifyform.append('address',this.userinfoform.address)
            this.modifyform.append('bankLinkNumber',this.userinfoform.bankLinkNumber)
            this.modifyform.append('grantOrg',this.userinfoform.grantOrg)
            this.modifyform.append('password','000000')
            this.modifyform.append('workRole',this.userinfoform.workRole)
            this.modifyform.append('payRollTopBankCode',this.userinfoform.payRollTopBankCode)
            this.modifyform.append('payRollBankName',this.userinfoform.payRollBankName)
            this.modifyform.append('payRollBankCardNumber',this.userinfoform.payRollBankCardNumber)
            this.modifyform.append('workerName',this.userinfoform.workerName)
            this.modifyform.append('gender',this.userinfoform.gender)
            this.modifyform.append('birthPlaceCode',this.userinfoform.birthPlaceCode)
            this.modifyform.append('isJoined',this.userinfoform.isJoined)
            this.modifyform.append('idCardType',this.userinfoform.idCardType)
            this.modifyform.append('idCardNumber',this.userinfoform.idCardNumber)
            this.modifyform.append('nation',this.userinfoform.nation)
            this.modifyform.append('politicsType',this.userinfoform.politicsType)
            this.modifyform.append('cellPhone',this.userinfoform.cellPhone)
            this.modifyform.append('cultureLevelType',this.userinfoform.cultureLevelType)
            this.modifyform.append('stateType',this.userinfoform.stateType)
            this.modifyform.append('isTeamLeader',this.userinfoform.isTeamLeader)
            this.modifyform.append('workType',this.userinfoform.workType)
            this.$http.post('/api/user/user_update_info',this.modifyform).then(res=>{
                console.log(res);
            })
        },
        AvatarUpload(params){
            console.log(params);
            this.modifyform.append('headImagePhoto',params.file)
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        nationdata(){
            this.$http.get('/api/dict/nation').then(res=>{
                console.log(res)
                this.nationoption = res.data
            })
        },
    },
    mounted(){
        this. getuser();
        this.nationdata();
        this.$http.get("/api/dict/work_type").then(res => {
            this.workT = res.data;
        });
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
        // margin: 40px auto;
        border-top: 1px solid #ccc;
        padding: 10px 20px;
    }
}
.modify{
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #337ab7;
    color: #fff;
    border-radius: 3px;
    margin-top: 30px;
    margin-right: 10px;
    cursor: pointer;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .el-upload--picture-card {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 90px;
    height: 90px;
  }
</style>
