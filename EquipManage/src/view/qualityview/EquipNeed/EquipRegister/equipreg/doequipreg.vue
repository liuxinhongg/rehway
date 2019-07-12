
<template>
    <div class="equipreg">
        <p class="persontop">设备注册</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="eqregform" :rules="useryz" @submit.native.prevent  ref="eqregform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">设备唯一编码：</td>
                        <td>
                            <el-form-item prop="devcode">
                                <el-input v-model="eqregform.devcode" style="width:280px" placeholder="设备唯一编码"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">设备类型：</td>
                        <td>
                            <el-form-item prop="mtype">
                                <el-select v-model="eqregform.mtype" style="width:280px">
                                    <el-option v-for="(item,index) in MOption" :key="index" :value="item.id" :label="item.materials"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">车牌号码：</td>
                        <td>
                            <el-form-item prop="mcode">
                                <el-input v-model="eqregform.mcode" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">设备名称：</td>
                        <td>
                            <el-form-item prop="mname">
                                <el-input v-model="eqregform.mname" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                        
                    </tr>
                    <tr>
                        <td class="tdleft">设备产权单位：</td>
                        <td>
                            <el-form-item prop="devRight">
                                <el-input v-model="eqregform.devRight" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">产权备案号：</td>
                        <td>
                            <el-form-item prop="devBackNo">
                                <el-input v-model="eqregform.devBackNo" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                        
                    </tr>
                    <tr>
                        <td class="tdleft">设备租赁单位或者个人：</td>
                        <td>
                            <el-form-item prop="devRent">
                                <el-input v-model="eqregform.devRent" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">单位识别码或者身份证号：</td>
                        <td>
                             <el-form-item prop="devRentNo">
                                <el-input v-model="eqregform.devRentNo" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="tdleft">设备产权备案时间：</td>
                        <td>
                            <el-form-item prop="devBackDate">
                                 <el-date-picker  v-model="eqregform.devBackDate" type="date" style="width:280px" placeholder="选择日期" ></el-date-picker>
                            </el-form-item>
                        </td>
                        <td class="tdleft">是否本单位：</td>
                        <td>
                            <el-form-item prop="ifmine">
                                <el-select v-model="eqregform.ifmine" style="width:280px">
                                    <el-option label="本单位" value="0"></el-option>
                                    <el-option label="租赁" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        
                    </tr>
                     <tr>
                         <td class="tdleft">设备生产厂家：</td>
                        <td>
                             <el-form-item prop="devProd">
                                <el-input v-model="eqregform.devProd" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">设备出厂日期：</td>
                        <td>
                            <el-form-item prop="devProdDate">
                                 <el-date-picker  v-model="eqregform.devProdDate"  type="date"  placeholder="选择日期">  </el-date-picker>
                            </el-form-item>
                        </td>
                       
                    </tr>
                    
                    <tr>
                        <td class="tdleft">是否安装智能读取设备：</td>
                        <td>
                            <el-form-item prop="ifread">
                                <el-select v-model="eqregform.ifread" style="width:280px">
                                    <el-option label="是" value="0"></el-option>
                                    <el-option label="否" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft" v-if="eqregform.ifread==0">只能识别码：</td>
                        <td v-if="eqregform.ifread==0">
                             <el-form-item prop="addrno">
                                <el-input v-model="eqregform.addrno" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                         <td class="tdleft">产权备案号：</td>
                        <td>
                            <el-form-item prop="devProdCode">
                                <el-input v-model="eqregform.devProdCode" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">设备状态：</td>
                        <td>
                            <el-form-item prop="devState">
                                <el-select v-model="eqregform.devState" style="width:280px">
                                    <el-option label="正常" value="0"></el-option>
                                    <el-option label="不正常" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item style="text-align:center;">
                    <el-button type="primary" native-type="submit" @click="equipregsub('eqregform')" >提交</el-button>
                    <el-button @click="backForm()">返回</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>
<script>
import * as qualitymanage from '@/api/qualityapi.js'
import * as material from '@/api/material.js'
import * as equipmanage from '@/api/equipmanage.js'
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
        var freqNum = (rule, value, callback) => {
            if (value=== '') {
                return callback(new Error('请输入检查频率'));
            }else{
                let boolean=new RegExp('^[1-9][0-9]?$').test(value);
                if(!boolean){
                    return callback(new Error('请输入正整数,并且小于100'));
                    value='';
                }
                callback();
            }
        };
        return{
            fileList:[],
            eqregform:{
                devcode:'',
                mcode:'',
                mname:'',
                mtype:'',
                devRight:'',
                devBackNo:'',
                devBackDate:'',
                devRent:'',
                devRentNo:'',
                ifmine:'',
                devProd:'',
                devProdDate:'',
                devProdCode:'',
                ifread:'',
                addrno:'',
                devState:'',
            },
            MOption:[],
            personoption:[],
            chkLocoption:[],
            useryz:{
                mname:[{required: true,message: "输入设备名称",trigger: "blur"}],
                devcode:[{required: true,message: "设备唯一编码",trigger: "blur"}],
                devRight:[{required: true,message: "请输入设备产权单位",trigger: "blur"}],
                devBackNo:[{required: true,message: "请输入产权备案号",trigger: "blur"}],
                devBackDate:[{required: true,message: "请选择备案时间",trigger: "change"}],
                devRent:[{required: true,message: "设备租租赁单位或者本人", trigger: 'blur'}],
                devRentNo:[{required: true,message: "请输入单位识别码",trigger: "blur"}],
                ifmine:[{required: true,message: "请选择是本单位",trigger: "change"}],
                devProdDate:[{required: true,message: "请选择出厂日期",trigger: "change"}],
                devProd:[{required: true,message: "请输入成产厂家",trigger: "blur"}],
                devProdCode:[{required: true,message: "请输入出场编码",trigger: "blur"}],
                addrno:[{required: true,message: "请输入单位识别码",trigger: "blur"}],
                ifread:[{required: true,message: "请选择是否是安装智能",trigger: "change"}],
                devState:[{required: true,message: "请选择设备状态",trigger: "change"}],
            },
            eduId:0,
        }
    },
    methods:{
        equipregsub(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let checkform=new FormData();
                    checkform.append('mname',this.eqregform.mname)
                    checkform.append('devcode',this.eqregform.devcode)
                    checkform.append('mcode',this.eqregform.mcode)
                    checkform.append('mtype',this.eqregform.mtype)
                    checkform.append('devRight',this.eqregform.devRight)
                    checkform.append('devBackNo',this.eqregform.devBackNo)
                    checkform.append('devRent',this.eqregform.devRent)
                    checkform.append('devRentNo',this.eqregform.devRentNo)
                    checkform.append('ifmine',this.eqregform.ifmine)
                    checkform.append('devProd',this.eqregform.devProd)
                    checkform.append('devProdCode',this.eqregform.devProdCode)
                    checkform.append('ifread',this.eqregform.ifread)
                    checkform.append('addrno',this.eqregform.addrno)
                    checkform.append('devState',this.eqregform.devState)
                    if(this.eduId==0){
                        console.log(this.eqregform.devBackDate)
                        checkform.append('devBackDateTime',this.eqregform.devBackDate.getTime());
                        checkform.append('devProdDateTime',this.eqregform.devProdDate.getTime());
                        this.$http.post(equipmanage.regequip,checkform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/equipmanage/equipreg');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        if(typeof(this.eqregform.devBackDate)=='number'){
                          checkform.append('devBackDateTime',this.eqregform.devBackDate);
                        }else{
                          checkform.append('devBackDateTime',this.eqregform.devBackDate.getTime());
                        }
                        if(typeof(this.eqregform.devProdDate)=='number'){
                          checkform.append('devProdDateTime',this.eqregform.devProdDate);
                        }else{
                          checkform.append('devProdDateTime',this.eqregform.devProdDate.getTime());
                        }
                        checkform.append('id',this.eduId)
                        this.$http.post(equipmanage.equipregupdate,checkform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/equipmanage/equipreg');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        backForm(){
            this.$router.push('/equipmanage/equipreg');
        },
        Protype(){
            this.$http.get(material.materialselect).then(res=>{
                console.log(res);
                this.MOption=res.data.list;
            })
        },
        
    },
    mounted(){
        this.Protype();
        this.eduId=this.$route.query.id;
        console.log(this.eduId);
        if(this.eduId!=0){
            this.$http.get(equipmanage.equipreginsert,{params:{id:this.eduId}}).then(res=>{
                console.log(res);
                this.eqregform=res.data.list[0];
                if(typeof(res.data.list[0].ifmine)=='number'){
                    this.eqregform.ifmine=res.data.list[0].ifmine.toString();
                }
                if(typeof(res.data.list[0].ifread)=='number'){
                    this.eqregform.ifread=res.data.list[0].ifread.toString();
                }
                if(typeof(res.data.list[0].devState)=='number'){
                    this.eqregform.devState=res.data.list[0].devState.toString();
                }
                console.log(this.eqregform.devBackDateTime)
                
            })
            console.log('编辑前请求的数据');
        }
    }
}
</script>

<style>
.equipreg{
    width: 100%;
    height:calc(100vh - 135px);
}
.equipreg .el-scrollbar__wrap{
    overflow-x: hidden;
}
</style>
