<template>
    <div class="supplymaterial">
        <p class="toptext">供应商配置表</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="applayform" :rules="useryz" @submit.native.prevent  ref="applayform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">供应商名称：</td>
                        <td>
                            <el-form-item prop="pname">
                                <el-input v-model="applayform.pname" style="width:280px" placeholder="请输入供应商名称"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">供应商地区：</td>
                        <td>
                            <el-form-item prop="parea">
                                <el-cascader :options="pareaoption" :props="areaprops" v-model="applayform.parea" @change="areaChange"  style="width:280px"></el-cascader>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">供应商企业类型：</td>
                        <td>
                            <el-form-item prop="pcotype">
                                <el-select v-model="applayform.pcotype" style="width:280px">
                                    <el-option v-for="(item,index) in pcooption" :key="index" :value="item.corptype" :label="item.corp"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">供应商类别：</td>
                        <td>
                            <el-form-item prop="ptype">
                                <el-select v-model="applayform.ptype" style="width:280px">
                                    <el-option v-for="(item,index) in ptypeoption" :key="index" :value="item.type" :label="item.name"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">供应商所属行业：</td>
                        <td>
                           <el-form-item prop="pprof">
                                <el-select v-model="applayform.pprof" style="width:280px">
                                    <el-option v-for="(item,index) in pprofoption" :key="index" :value="item.type" :label="item.name"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">供应商地址：</td>
                        <td>
                           <el-form-item prop="paddr">
                                <el-input v-model="applayform.paddr" style="width:280px" placeholder="请输入供应商地址"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">供应商负责人：</td>
                        <td>
                           <el-form-item prop="leader">
                                <el-input v-model="applayform.leader" style="width:280px" placeholder="请输入供应商负责人"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">负责人身份证号码：</td>
                        <td>
                           <el-form-item prop="personid">
                                <el-input v-model="applayform.personid" style="width:280px" placeholder="请输入供应商负责人身份证号码"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">负责人电话：</td>
                        <td>
                           <el-form-item prop="telno">
                                <el-input v-model="applayform.telno" style="width:280px" placeholder="请输入供应商负责人电话"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">社会信用号：</td>
                        <td>
                           <el-form-item prop="coid">
                                <el-input v-model="applayform.coid" style="width:280px" placeholder="请输入社会信用号"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">银行名称：</td>
                        <td>
                           <el-form-item prop="bankname">
                               <el-select v-model="applayform.bankname" style="width:280px">
                                    <el-option v-for="(item,index) in bankoption" :key="index" :value="item.banktype" :label="item.bank"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">银行账号：</td>
                        <td>
                           <el-form-item prop="bankcode">
                                <el-input v-model="applayform.bankcode" style="width:280px" placeholder="请输入银行卡号"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">备注：</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input v-model.trim="applayform.remark" type="textarea" :rows="3" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item style="text-align:center;">
                    <el-button type="primary" native-type="submit" @click="saftplansubmit('applayform')">提交</el-button> 
                    <el-button @click="returncancle()">返回</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>
<script>
import * as material from '@/api/material.js'
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                console.log(reg.test(value));
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入正确的手机号'));
                }
            }
        };
        var Idcard = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('身份证号不能为空'));
            } else {
                const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
                console.log(reg.test(value));
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入正确的身份证号'));
                }
            }
        };
        return{
            pareaoption:[],
            applayform:{
                pname:'',
                parea:[],
                pcotype:'',
                ptype:'',
                pprof:'',
                paddr:'',
                leader:'',
                personid:'',
                telno:'',
                coid:'',
                bankname:'',
                bankcode:'',
                remark:'',
                pid:'',
            },
            areaprops:{
                label:'name',
                value: 'code',
                children: 'child'
            },
            pcooption:[],
            bankoption:[],
            //供应商类别
            ptypeoption:[
                { name:'分包类',type:'0' },
                { name:'材料类',type:'1' },
                { name:'机械类',type:'2' },
                { name:'劳务类',type:'3' },
                { name:'其他',type:'4' },
            ],
            //供应商所属行业
            pprofoption:[
                { name:'建筑业',type:'0' },
                { name:'批发零售业',type:'1' },
            ],
            useryz:{
                parea:[{required: true,message: "请选择供应商地区",trigger: "change"}],           
                pname:[{required: true,message: "请输入供应商名称",trigger: "blur"},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{5,20}$/,message:'请输入5~20个字符的供应商名称'}],
                pcotype:[{required: true,message: "请选择供应商企业类型",trigger: "change"}],           
                ptype:[{required: true,message: "请选择供应商类别",trigger: "change"}],           
                pprof:[{required: true,message: "请选择供应商所属行业",trigger: "change"}],           
                bankname:[{required: true,message: "请选择银行名称",trigger: "change"}],
                paddr:[{required: true,message: "请输入供应商地址",trigger: "blur"},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{7,20}$/,message:'请输入7~20个字符的供应商地址'}],
                leader:[{required: true,message: "请输入供应商负责人",trigger: "blur"},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/,message:'请输入2~20个字符的供应商负责人'}],
                personid:[{validator:Idcard,trigger: "blur"}],
                telno:[{validator: checkPhone,trigger: "blur"}],
                coid:[
                    {required: true,message: "请输入社会信用号",trigger: "blur"},
                    // B1112345ABC1234567
                    {pattern:/[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/,message:'请输入2~20个字符的供应商负责人'}],
                bankcode:[{required: true,message: "请输入银行账号",trigger: "blur"},{pattern:/^[1-9]{1}[0-9]{15,18}$/,message:'请输入正确的银行卡号'}],
            },
            saftplanId:0,
        }
    },
    methods:{
        areaChange(val){
            console.log(val);
            this.applayform.parea=val;
            console.log(this.applayform.parea[2]);
        },
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let appsubform=new FormData();
                    appsubform.append('parea',this.applayform.parea[2])
                    appsubform.append('pname',this.applayform.pname)
                    appsubform.append('pcotype',this.applayform.pcotype)
                    appsubform.append('ptype',this.applayform.ptype)
                    appsubform.append('pprof',this.applayform.pprof)
                    appsubform.append('bankname',this.applayform.bankname)
                    appsubform.append('paddr',this.applayform.paddr)
                    appsubform.append('leader',this.applayform.leader)
                    appsubform.append('personid',this.applayform.personid)
                    appsubform.append('telno',this.applayform.telno)
                    appsubform.append('coid',this.applayform.coid)
                    appsubform.append('bankcode',this.applayform.bankcode)
                    appsubform.append('remark',this.applayform.remark)
                    if(this.saftplanId==0){
                        this.$http.post(material.applayinsert,appsubform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/materialmanage/supplyconfig');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        appsubform.append('pid',this.applayform.pid);
                        this.$http.post(material.applayupdate,appsubform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/materialmanage/supplyconfig');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }
                } else {
                    this.$message.error('提交数据失败')
                    return false;
                }
            });
        },
        returncancle(){
            this.$router.push({path:'/materialmanage/supplyconfig'});
        },
        // 供应商企业类型
        pcotype(){
            this.$http.get(dictapi.corptype).then(res=>{
                this.pcooption=res.data;
            })
        },
        //供应商地区(省)
        region(){
            this.$http.get(dictapi.regioncodelevel).then(res=>{
                // console.log(res);
                this.pareaoption=res.data;
            })
        },
        //银行
        bankdict(){
            this.$http.get(dictapi.bank).then(res=>{
                // console.log(res);
                this.bankoption=res.data;
            })
        },
    },
    mounted(){
        this.pcotype();
        this.region();
        this.bankdict();
        this.saftplanId=this.$route.query.pid;
        if(this.saftplanId!=0){
            this.$http.get(material.applay,{params:{pid:this.saftplanId}}).then(res=>{
                console.log(res);
                this.applayform.parea=res.data.list[0].pareaLevel;
                res.data.list[0].parea=[];
                this.applayform=res.data.list[0];
                res.data.list[0].pprof='';
                res.data.list[0].ptype='';
            })
            console.log('编辑前请求的数据');
        }
    }
}
</script>

<style lang="scss">
.supplymaterial{
    height:calc(100vh - 110px);
}
.supplymaterial .el-scrollbar__wrap{
    overflow-x: hidden;
}
.friendtip{
    width: auto;
    height: 150px;
    line-height: 150px;
    position: absolute;
    right: 0px;
    bottom: 40px;
    display: flex;
    justify-content: flex-start;
    .warmtip{

    }
    img{
        // position: absolute;
        // right: 0px;
        width:150px;
        height: 150px;
    }
}
</style>
