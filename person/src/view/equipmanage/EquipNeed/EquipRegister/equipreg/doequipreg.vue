
<template>
    <div class="equipreg">
        <p class="persontop">设备注册</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="eqregform" :rules="useryz" @submit.native.prevent  ref="eqregform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">设备唯一编码：</td>
                        <td style="height:40px; ">
                            <el-form-item prop="devcode">
                                <el-input v-model.trim="eqregform.devcode" style="width:280px;" placeholder="设备唯一编码"></el-input>
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
                                <el-input v-model.trim="eqregform.mcode" style="width:280px" placeholder="请输入车牌号码"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">设备名称：</td>
                        <td>
                            <el-form-item prop="mname">
                                <el-input v-model.trim="eqregform.mname" style="width:280px" placeholder="请输入设备名称"></el-input>
                            </el-form-item>
                        </td>
                        
                    </tr>
                    <tr>
                        <td class="tdleft">设备产权单位：</td>
                        <td>
                            <el-form-item prop="devRight">
                                <el-input v-model.trim="eqregform.devRight" style="width:280px" placeholder="请输入备产权单位"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">产权备案号：</td>
                        <td>
                            <el-form-item prop="devBackNo">
                                <el-input v-model.trim="eqregform.devBackNo" style="width:280px" placeholder="请输入产权备案号"></el-input>
                            </el-form-item>
                        </td>
                        
                    </tr>
                    <tr>
                        <td class="tdleft">设备租赁单位或者个人：</td>
                        <td>
                            <el-form-item prop="devRent">
                                <el-input v-model.trim="eqregform.devRent" style="width:280px" placeholder="请输入设备的租赁单位或个人名称"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">单位识别码或者身份证号：</td>
                        <td>
                             <el-form-item prop="devRentNo">
                                <el-input v-model.trim="eqregform.devRentNo" style="width:280px" placeholder="请输入单位识别码或者身份证号"></el-input>
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
                                <el-select v-model="eqregform.ifmine" style="width:280px" placeholder="请选择">
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
                                <el-input v-model.trim="eqregform.devProd" style="width:280px" placeholder="请选择设备生产厂家"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">设备出厂日期：</td>
                        <td>
                            <el-form-item prop="devProdDate">
                                 <el-date-picker  v-model.trim="eqregform.devProdDate"  type="date"  placeholder="选择日期">  </el-date-picker>
                            </el-form-item>
                        </td>
                       
                    </tr>
                    
                    <tr>
                        <td class="tdleft">是否安装智能读取设备：</td>
                        <td>
                            <el-form-item prop="ifread" >
                                <el-select v-model="eqregform.ifread" style="width:280px" placeholder="请选择是否是安装智能读取设备">
                                    <el-option label="是" value="0"></el-option>
                                    <el-option label="否" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft" v-if="eqregform.ifread==0">智能识别码：</td>
                        <td v-if="eqregform.ifread==0">
                             <el-form-item prop="addrno">
                                <el-input v-model.trim="eqregform.addrno" style="width:280px" placeholder="请输入智能识别码"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                         <td class="tdleft">设备出厂编号：</td>
                        <td>
                            <el-form-item prop="devProdCode">
                                <el-input v-model.trim="eqregform.devProdCode" style="width:280px" placeholder="请选择产权备案号"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">设备状态：</td>
                        <td>
                            <el-form-item prop="devState">
                                <el-select v-model="eqregform.devState" style="width:280px" placeholder="请选择设备状态">
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
       
        // var carnum = (rule, value, callback) => {
        //     if (!value) {
        //         return callback(new Error('车牌号不能为空'));
        //     }else{
        //         let carnumber=new RegExp('^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$').test(value);
        //         if(!carnumber){
        //             return callback(new Error('请输入正确的车牌号'));
        //             value='';
        //         }
        //         callback();

        //     }
        // };
        // 设备编号
        // var equipcode=(rule,value,callback)=>{
        //     if(!value){
        //         return callback(new Error('设备编号不能为空'))
        //     }else{
        //         let  equipnum=new RegExp('^[A-Z0-9]{10,30}$').test(value);
        //         if(!equipnum){
        //             return callback(new Error('请输入正确的设备编码(10~30数字与大写字母组合)'));
        //             value='';
        //         }
        //         callback();

        //     }
        // };
        // // 产权备案号  devBackNo
        // var devcode=(rule,value,callback)=>{
        //     if(!value){
        //         return callback(new Error('产权备案号不能为空'))
        //     }else{
        //         let  cqnum=new RegExp('^[A-Z0-9]{10,30}$').test(value);
        //         if(!cqnum){
        //             return callback(new Error('请输入正确的产权备案号(10~30数字与大写字母组合)'));
        //             value='';
        //         }
        //         callback();
        //     }
        // };
        // 智能识别码  addrno
        var intellcode=(rule,value,callback)=>{
            if(!value){
                return callback(new Error('智能识别码不能为空'))
            }else{
                let  intellnum=new RegExp('^[A-Z0-9]{10,30}$').test(value);
                if(!intellnum){
                    return callback(new Error('请输入正确的智能识别码(10~30数字与大写字母组合)'));
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
                mname:[{required: true,message: "输入设备名称",trigger: "blur"},
                    { pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,40}$/,message:'请输入正确的设备名称' }
                ],
                mcode:[{required: true,trigger: 'blur' },
                    { pattern:/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
                    ,message:'请输入正确的车牌号' }                
                ],
                devcode:[{ required: true,trigger: "blur" },{pattern:/[A-Za-z0-9]{5,30}/,message:'编码长度5~30'}],
                devRight:[{required: true,message: "请输入设备产权单位",trigger: "blur"},
                    { pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,20}$/,message:'请输入正确的产权单位' }
                ],
                devBackNo:[{ required: true,trigger: "blur"},{pattern:/[A-Za-z0-9]{5,30}/,message:'编码长度5~30'}],
                devBackDate:[{required: true,message: "请选择备案时间",trigger: "change"}],
                mtype:[{ required: true,message: "请选择设备类型",trigger: "change" }],
                devRent:[{required: true,message: "设备租租赁单位或者本人", trigger: 'blur'},
                    { pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,40}$/,message:'请输入正确的租赁名称' }
                ],
                devRentNo:[
                    {required: true,message: "请输入单位识别码",trigger: "blur"},
                    { pattern:/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,message:'请输入正确的识别码' }
                
                ],
                ifmine:[{required: true,message: "请选择是本单位",trigger: "change"}],
                devProdDate:[{required: true,message: "请选择出厂日期",trigger: "change"}],
                devProd:[{required: true,message: "请输入成产厂家",trigger: "blur"},
                    { pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,40}$/,message:'请输入正确的成产厂家' }
                ],
                devProdCode:[{required: true,trigger: "blur"},
                    { pattern:/^[A-Za-z0-9]{2,40}$/,message:'请输入正确的产权备案号' }                
                ],
                addrno:[{ validator: intellcode,trigger: "blur"}],
                ifread:[{required: true,message: "请选择是否是安装智能",trigger: "change"}],
                devState:[{required: true,message: "请选择设备状态",trigger: "change"}],
            },
            eduId:0,
        }
    },
    methods:{
        equipregsub(eqregform) {
            console.log(1)
            this.$refs[eqregform].validate((valid) => {
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
                    console.log(1)
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
