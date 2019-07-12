/*
 * @Author: 谢莹
 * @Date: 2019-05-07  
 * @function: 材料退库表--新增/修改
 */
<template>
    <div class="rebuild" >
        <p class="toptable">材料退库表</p>
        <el-scrollbar style="height:100%;overflow-x: hidden;">
            <div v-if="childsta==false">
                <el-scrollbar style="height:100%;">    
                    <el-form :model="needplamform" :rules="useryz" @submit.native.prevent  ref="needplamform">
                        <el-form-item style="text-align:center;"></el-form-item>
                            <table border="1" class="tableinsert">
                                <tr>
                                    <td class="tdleft" colspan="1">需求计划名称：</td>
                                    <td colspan="9">
                                        <el-form-item prop="mrName">
                                            <el-input v-model="needplamform.mrName" style="width:280px" placeholder="总计划名称"></el-input>
                                        </el-form-item>
                                    </td>
                                    <td class="tdleft" colspan="1">提交人：</td>
                                    <td colspan="9">
                                        <el-form-item prop="cmtId">
                                            <el-select v-model="needplamform.cmtId" style="width:280px">
                                                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdleft" colspan="1">项目ID：</td>
                                    <td  colspan="9">
                                        <el-form-item prop="prjId">
                                            <el-select v-model="needplamform.prjId" style="width:280px">
                                                <el-option v-for="(item,index) in categoryoption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                    <td class="tdleft"  colspan="1">计划执行人：</td>
                                    <td  colspan="9">
                                        <el-form-item prop="execMan">
                                            <el-select v-model="needplamform.execMan"  style="width:280px">
                                                <el-option v-for='(item,index) in stateoption' :key="index" :label="item.name" :value="item.type"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdleft"  colspan="1">附件文件：</td>
                                    <td colspan="19">
                                        <el-form-item >
                                            <el-upload action="" :file-list="fileList" :multiple=true :http-request="handlefile">
                                                <el-button size="small" type="primary">选取文件</el-button>
                                            </el-upload>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdleft"  colspan="1">备注：</td>
                                    <td colspan="19">
                                        <el-form-item>
                                            <el-input v-model="needplamform.remark" type="textarea" :rows="2"></el-input>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="20">
                                    <span style="margin:0 40%;font-size:18px;font-family: '楷体';">计划物资明细</span>
                                        <el-button style="text-align:right;margin-right:10px;" type="primary" @click="addmaterial()">+计划物资</el-button>
                                    </td>
                                </tr>
                                <tr v-if='doubledata.length>0'>
                                    <td colspan="1" style="text-align:center;">序号</td>
                                    <td colspan="4" style="text-align:center;">材料名称</td>
                                    <td colspan="4" style="text-align:center;">使用位置</td>
                                    <td colspan="3" style="text-align:center;">使用量</td>
                                    <td colspan="3" style="text-align:center;">参考价格</td>
                                    <td colspan="3" style="text-align:center;">确认状态</td>
                                    <td colspan="1" style="text-align:center;">操作</td>
                                </tr>
                                <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                                    <td colspan="1" >{{index+1}}</td>
                                    <td colspan="4">{{item.mname}}</td>
                                    <td colspan="4">{{item.reponame}}</td>
                                    <td colspan="3">{{item.mnum}}</td>
                                    <td colspan="3">{{item.mprice}}</td>
                                    <td colspan="3">{{item.provState==0 ? '未确认' : '确认'}}</td>
                                    <td colspan="1"><el-button type="text" @click="doubmodify(item.douId)">修改</el-button></td>
                                </tr>
                                <tr>
                                    <td class="tdleft"  colspan="1">项目经理审核：</td>
                                    <td colspan="19">
                                        <el-form-item>
                                            <el-input v-model="needplamform.remark" resize="none" type="textarea" :rows="2" class="textOinput"></el-input>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdleft"  colspan="1">成控部审核：</td>
                                    <td colspan="19">
                                        <el-form-item>
                                            <el-input v-model="needplamform.remark" resize="none" type="textarea" :rows="2" class="textOinput"></el-input>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdleft"  colspan="1">总经理审核：</td>
                                    <td colspan="19">
                                        <el-form-item>
                                            <el-input v-model="needplamform.remark" resize="none" type="textarea" :rows="2" class="textOinput"></el-input>
                                        </el-form-item>
                                    </td>
                                </tr>
                            </table>
                        <el-form-item style="text-align:center;">
                            <el-button type="primary" native-type="submit" @click="saftplansubmit('needplamform')">提交</el-button>
                            <el-button @click="returncancle()" style="margin:0 40px;">返回</el-button>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
            </div>
            <el-dialog title="计划物资" :visible.sync="modelVisible" center :close="closevisible">
                <el-form :model="modelform" ref="modelform" :rules="modelrules" @submit.native.prevent>
                    <table border="1" class="tableinsert" style="width:95%;">
                        <tr>
                            <td class="tdleft">材料：</td>
                            <td>
                                <el-form-item prop="mid">
                                    <el-select v-model="modelform.mid" style="width:280px">
                                        <el-option v-for="(item,index) in materoption" :key="index" :value="item.id" :label="item.mname"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td class="tdleft">使用位置：</td>
                            <td>
                                <el-form-item prop="useloc">
                                    <el-select v-model="modelform.useloc" style="width:280px">
                                        <el-option v-for="(item,index) in localoption" :key="index" :value="item.repoid" :label="item.reponame"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft">需用使用量：</td>
                            <td>
                                <el-form-item prop="mnum">
                                    <el-input v-model="modelform.mnum" style="width:280px" type="number"></el-input>
                                </el-form-item>
                            </td>
                            <td class="tdleft">参考价格：</td>
                            <td>
                                <el-form-item prop="mprice">
                                    <el-input v-model="modelform.mprice" style="width:280px" type="number"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft">供应商确认状态：</td>
                            <td>
                                <el-form-item prop="provState">
                                    <el-select v-model="modelform.provState" style="width:280px">
                                        <el-option v-for="(item,index) in statusoption" :key="index" :value="item.type" :label="item.name"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td class="tdleft">供应商确认时间：</td>
                            <td>
                                <el-form-item prop="provDate">
                                    <el-date-picker  v-model="modelform.provDate" type="datetime" placeholder="选择日期时间" style="width:280px"></el-date-picker>
                                </el-form-item>
                            </td> 
                        </tr>
                        <tr>
                            <td class="tdleft">备注：</td>
                            <td>
                                <el-form-item prop="remark">
                                    <el-input  v-model="modelform.remark" type="textarea" :rows="2"></el-input>
                                </el-form-item>
                            </td> 
                        </tr>
                    </table>
                    <el-form-item style="text-align:center;">
                        <el-button type="primary" native-type="submit" @click="modelesubmit('modelform')">提交</el-button>
                        <el-button @click="modelVisible=false" >返回</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-scrollbar>
    </div>
</template>
<script>
import MStore from '@/components/common/mstore'
import * as material from '@/api/material.js'
import * as dictapi from '@/api/dictapi.js'
import child from '@/components/common/mstore'
export default {
     components: {
      child
    },
    data(){
        return{
            modelform:{
                mid:'',
                mnum:'',
                useloc:'',
                mprice:'',
                provState:'',
                provDate:'',
                remark:'',
                mname:'',
                reponame:'',
                // planid:'JH-201905-003',
                douId:0,
            },
            statusoption:[
                {name:"确认",type:'1'},
                {name:"未确认",type:'0'},
            ],
            modId:0,
            // 传值   数组
            doubledata:[],
            modelVisible:false,
            num:0,
            childsta:false,
            modelrules:{
                mnum:[{ required: true,message: "请输入需用使用量",trigger: "blur",}],
                useLoc:[{required: true,message: "请输入使用位置",trigger: "blur"}],
                mprice:[{required: true,message: "请输入参考价格",trigger: "blur"}],
                mid:[{required: true,message: "请选择材料",trigger: "change"}],
                useloc:[{required: true,message: "请选择仓库位置",trigger: "change"}],
                provState:[{required: true,message: "请选择供应商确认状态",trigger: "change"}],
                provDate:[{required: true,message: "请选择供应商确认时间",trigger: "change"}],
            },
            modeloption:[],
            materoption:[],
            localoption:[],
            planMVisible:false,
            ajform:new FormData(),
            fileList:[],
            needplamform:{
                execMan:'',
                cmtId:'',
                mrName:'',  
                prjId:'', 
                state:'',
                files:'',
                remark:'',
                arvDate:'',
                cdate:'',
            },
            personoption:[],
            categoryoption:[],
            stateoption:[
                { name:'审批中',type:'0' },
                { name:'审批通过',type:'1' },
                { name:'审批失败',type:'2' },
            ],
            useryz:{
                cmtId:[{required: true,message: "请选择上传员工",trigger: "change"}],           
                prjId:[{required: true,message: "请选择项目ID",trigger: "change"}],           
                // state:[{required: true,message: "请选择状态",trigger: "change"}],              
                mrName:[{required: true,message: "请输入计划主题",trigger: "blur"}],
            },
            saftplanId:0,
            modleId:0,
            childValue:[],
            place:[],
            materialname:[],
            form:[],
        }
    },
    methods:{
        //上传文件 获取文件信息的方法
        handlefile(par){
            this.ajform.append('filepaths',par.file);
        },
        //修改和添加的公共方法
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let subform=new FormData();
                    subform.append('cmtId',this.needplamform.cmtId)
                    subform.append('mrName',this.needplamform.mrName)
                    subform.append('prjId',this.needplamform.prjId)
                    // subform.append('state',this.needplamform.state)
                    subformm.append('remark',this.needplamform.remark)
                    this.ajform.append('mRequirePlan',this.needplamform.remark)
                    this.ajform.append('mRequirePlanDetails',this.doubledata);
                    // 新增的方法
                    if(this.saftplanId==0){
                        this.$http.post(material.mplaninsert,this.ajform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/materialmanage/materialretreat');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        // 编辑的方法
                        this.ajform.append('planid',this.saftplanId)
                        this.$http.post(material.mplanupdate,this.ajform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/materialmanage/materialretreat');
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
        // 返回按钮的事件
        returncancle(){
            this.$router.push({path:'/materialmanage/materialretreat'});
        },
        // 上传人员
        uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                this.personoption=res.data.list;
            })
        },
        // 分包项目
        category(){
            this.$http.get('/api/sub_prj/selectAll').then(res=>{
                this.categoryoption=res.data.list;
            })
        },
        //弹框右上角的x按钮
        closevisible(){
            this.modelVisible=false;
            this.modelform={};
        },
        //新增计划物资
        addmaterial(){
            this.modelVisible=true;
            this.modelform={};
        },
        // 弹框的提交事件
        modelesubmit(Fname){
            this.$refs[Fname].validate((valid) => {
                if (valid) {
                    if(this.modId==0){
                        this.modelform.douId=Math.floor(Math.random()*200);
                        // this.modelform.mid = String(this.modelform.mid)
                        // this.modelform.useloc = String(this.modelform.useloc)
                        // this.modelform.douId = String(this.modelform.douId)
                        this.doubledata.push(this.modelform);
                        // let mPlanDetails = this.doubledata
                        // console.log(mPlanDetails);
                        // this.$http.get('/api/mplandetails/insert',{params:mPlanDetails}).then(res=>{
                        //     console.log(res);
                        // })
                        if(this.doubledata.length!=0){
                            for(let item in this.doubledata,this.materoption,this.localoption){
                                if(this.materoption[item].id==this.modelform.mid){
                                    this.modelform.mname= this.materoption[item].mname;
                                }
                                if(this.localoption[item].repoid==this.modelform.useloc){
                                    this.modelform.reponame= this.localoption[item].reponame;
                                }
                            }
                        }
                        this.modelVisible=false;
                    }else{
                        console.log('我是编辑');
                        this.modelform.douId=this.modId;
                        for(let val in this.doubledata){
                            if(this.doubledata[val].douId==this.modId){
                                console.log(12);
                                this.doubledata[val]=this.modelform;
                            }
                        }
                        this.modelVisible=false;
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 物资计划的修改事件
        doubmodify(val){
            console.log(val);
            this.modId=val;
            console.log(this.doubledata);
            this.modelVisible=true;
            for(let i in this.doubledata){
                if(this.doubledata[i].douId==val){
                    console.log(12);
                    this.modelform=this.doubledata[i];
                }
            }
        },
        //材料配置
        materconfig(){
            this.$http.get(material.mmaterials).then(res=>{
                // console.log(res);
                this.materoption=res.data.list;
            })
        },
        //仓库位置
        modellocaton(){
            this.$http.get(material.mrepo).then(res=>{
                // console.log(res);
                this.localoption=res.data.list;
            })
        },
    },
    mounted(){
        this.uploadperson();
        this.category();
        this.materconfig();
        this.modellocaton();
        this.saftplanId=this.$route.query.id;
        //列表页面编辑操作
        if(this.saftplanId!=0){
            this.$http.get(material.mplan,{params:{planid:this.saftplanId}}).then(res=>{
                // console.log(res);
                this.needplamform=res.data.list[0];
            })
            console.log('编辑前请求的数据');
        }
    }
}
</script>

<style lang="scss">
.rebuild{
    height:calc(100vh - 110px);
    
}
.rebuild .el-scrollbar__wrap{
    overflow-x: hidden;
}
.rebuild .textOinput{
    outline: none;
    border: none;
}
</style>
