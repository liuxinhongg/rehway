/*
 * @Author: 谢莹 
 * @Date: 2019-05-07  
 * @function: 材料出库表--新增/修改
 */
<template>
    <div class="rebuild" >
        <p class="toptable">材料出库表</p>
        <el-scrollbar style="height:100%;overflow-x: hidden;">
            <div v-if="childsta==false">
                <el-scrollbar style="height:100%;">    
                    <el-form :model="needplamform" :rules="useryz" @submit.native.prevent  ref="needplamform">
                        <el-form-item style="text-align:center;"></el-form-item>
                            <table border="1" class="tableinsert">
                                <tr>
                                    <td class="tdleft" colspan="1">项目：</td>
                                    <td colspan="9">
                                        <el-form-item prop="prjid">
                                            <el-select v-model="needplamform.prjid" style="width:280px">
                                                <el-option v-for="(item,index) in categoryoption" :key="index" :value="item.id" :label="item.builderLicensesName"> 
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                    <td class="tdleft" colspan="1">录入人员：</td>
                                    <td colspan="9">
                                        <el-form-item prop="inputid">
                                            <el-select v-model="needplamform.inputid" style="width:280px">
                                                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdleft" colspan="1">录入班组：</td>
                                    <td  colspan="9">
                                        <el-form-item prop="teamid">
                                            <el-select v-model="needplamform.teamid" style="width:280px">
                                                <el-option v-for="(item,index) in banzudetail" :key="index" :value="item.teamId" :label="item.teamName"> 
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                    <td class="tdleft"  colspan="1">录入日期：</td>
                                    <td  colspan="9">
                                        <el-form-item prop="iptDate">
                                            <el-date-picker  v-model="needplamform.iptDate"  type="date"  placeholder="选择日期">  </el-date-picker>
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdleft"  colspan="1">附件文件：</td>
                                    <td colspan="9">
                                        <el-form-item >
                                            <el-upload action="" :file-list="fileList" :multiple=true :http-request="handlefile">
                                                <el-button size="small" type="primary">选取文件</el-button>
                                            </el-upload>
                                        </el-form-item>
                                    </td>
                                     <td class="tdleft"  colspan="1">出退库：</td>
                                    <td colspan="9">
                                        <el-form-item prop="state">
                                           <el-select v-model="needplamform.state">
                                               <el-option value="0" label="出库"></el-option>
                                               <el-option value="1" label="退库"></el-option>
                                           </el-select>
                                        </el-form-item>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td colspan="20">
                                    <span style="margin:0 40%;font-size:18px;font-family: '楷体';">计划物资明细</span>
                                        <!-- <el-button style="text-align:right;margin-right:10px;" type="primary" @click="addmaterial()">+计划物资</el-button> -->
                                    </td>
                                </tr>
                                <tr v-if='doubledata.length>0'>
                                    <td colspan="2" style="text-align:center;">序号</td>
                                    <td colspan="5" style="text-align:center;">材料名称</td>
                                    <td colspan="5" style="text-align:center;">使用位置</td>
                                    <td colspan="4" style="text-align:center;">使用量</td>
                                    <td colspan="4" style="text-align:center;">领用仓库</td>
                                    <!-- <td colspan="1" style="text-align:center;">操作</td> -->
                                </tr>
                                <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                                    <td colspan="2" >{{index+1}}</td>
                                    <td colspan="5">{{item.mmidName}}</td>
                                    <td colspan="5">{{item.mlocName}}</td>
                                    <td colspan="4">{{item.mnum}}</td>
                                    <td colspan="4">{{item.repoidName}}</td>
                                    <!-- <td colspan="1"><el-button type="text" @click="doubmodify(item.id)">修改</el-button></td> -->
                                </tr>
                               <tr>
                                    <td class="tdleft"  colspan="1">备注：</td>
                                    <td colspan="19">
                                        <el-form-item prop="remark">
                                            <el-input v-model="needplamform.remark" type="textarea" :rows="2"></el-input>
                                        </el-form-item>
                                    </td>
                                </tr>
                            </table>
                        <el-form-item style="text-align:center;">
                            <!-- <el-button type="primary" native-type="submit" @click="saftplansubmit('needplamform')">提交</el-button> -->
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
                                <el-form-item prop="mmid">
                                    <el-select v-model="modelform.mmid" style="width:280px">
                                        <el-option v-for="(item,index) in materoption" :key="index" :value="item.id" :label="item.mname"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td class="tdleft">使用位置：</td>
                            <td>
                                <el-form-item prop="mloc">
                                    <el-select v-model="modelform.mloc" style="width:280px">
                                        <el-option v-for="(item,index) in localoption" :key="index" :value="item.id" :label="item.locName"> 
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
                            <td class="tdleft">领用仓库：</td>
                            <td>
                                <el-form-item prop="repoid">
                                    <el-select v-model="modelform.repoid" style="width:280px">
                                        <el-option v-for="(item,index) in ckdata" :key="index" :value="item.repoid" :label="item.reponame"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft">备注：</td>
                            <td colspan="3">
                                <el-form-item prop="remark">
                                    <el-input  v-model="modelform.remark" type="textarea" :rows="2"></el-input>
                                </el-form-item>
                            </td> 
                        </tr>
                    </table>
                    <el-form-item style="text-align:center;">
                        <el-button type="primary" native-type="submit" @click="modelesubmit(modelform)">提交</el-button>
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
import child from '../../../components/common/mstore'
export default {
     components: {
      child
    },
    data(){
        return{
            modelform:{
                mmid:'',
                mnum:'',
                mloc:'',
                repoid:'',
                remark:'',
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
                // provState:[{required: true,message: "请选择供应商确认状态",trigger: "change"}],
                provDate:[{required: true,message: "请选择供应商确认时间",trigger: "change"}],
            },
            modeloption:[],
            materoption:[],
            localoption:[],
            planMVisible:false,
            ajform:new FormData(),
            fileList:[],
            needplamform:{  
                prjid:'', 
                teamid:'',
                inputid:'',
                iptDate:'',
                state:'',
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
                state:[{required: true,message: "请选择状态",trigger: "change"}],              
                mrName:[{required: true,message: "请输入计划主题",trigger: "blur"}],
            },
            saftplanId:0,
            modleId:0,
            childValue:[],
            place:[],
            materialname:[],
            form:[],
            banzudetail:[],
            ckdata:[],
            // subform:new FormDate()
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
                    // let subform=new FormData();
                    this.ajform.append('mrName',this.needplamform.mrName)
                    this.ajform.append('prjid',this.needplamform.prjid)
                    this.ajform.append('teamid',this.needplamform.teamid)
                    this.ajform.append('inputid',this.needplamform.inputid)
                    this.ajform.append('state',this.needplamform.state)
                    this.ajform.append('remark',this.needplamform.remark)
                    let a = JSON.stringify(this.doubledata);
                    this.ajform.append('mOutStockDetails',a);
                    console.log(this.doubledata);
                    console.log(this.needplamform);
                    // 新增的方法
                    if(this.saftplanId==0){
                    this.ajform.append('iptDateTime',this.needplamform.iptDate.getTime())
                        this.$http.post(material.moutstockaddinsert,this.ajform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/materialmanage/materialexit');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        // 编辑的方法
                        if(typeof(this.needplamform.iptDate)=='number'){
                            this.ajform.append('iptDateTime',this.needplamform.iptDate)
                        }else{
                            this.ajform.append('iptDateTime',this.needplamform.iptDate.getTime())
                        }
                        this.ajform.append('moutid',this.saftplanId)
                        this.$http.post(material.moutstockupdate,this.ajform).then(res=>{
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/materialmanage/materialexit');
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
            this.$router.push({path:'/materialmanage/materialexit'});
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
           if(this.id==0){
                if(this.modId==0){
                    this.modelform.ctmId=Math.floor(Math.random()*200);
                    this.doubledata.push(this.modelform);
                    console.log(this.doubledata);
                    if(this.doubledata.length!=0){
                        for(let item in this.doubledata,this.materoption,this.localoption,this.ckdata){
                            if(this.materoption[item].id==this.modelform.mmid){
                                this.modelform.mmidName= this.materoption[item].mname;
                            }
                            if(this.localoption[item].id==this.modelform.mloc){
                                console.log(1);
                                this.modelform.mlocName= this.localoption[item].locName;
                            }
                            if(this.ckdata[item].repoid==this.modelform.repoid){
                                this.modelform.repoidName= this.ckdata[item].reponame;
                            }
                        }
                    }
                    this.modelVisible=false;
                }else{
                    console.log('我是编辑');
                    for(let val in this.doubledata){
                        if(this.doubledata[val].ctmId==this.modId){
                            this.doubledata[val].mIdName=this.modelform.mIdName;
                        }
                    }
                     for(let item in this.doubledata,this.materoption,this.localoption,this.ckdata){
                            if(this.materoption[item].id==this.modelform.mmid){
                                this.modelform.mmidName= this.materoption[item].mname;
                            }
                            if(this.localoption[item].id==this.modelform.mloc){
                                console.log(1);
                                this.modelform.mlocName= this.localoption[item].locName;
                            }
                            if(this.ckdata[item].repoid==this.modelform.repoid){
                                this.modelform.repoidName= this.ckdata[item].reponame;
                            }
                        }
                    this.modelVisible=false;
                }
            }else{
                console.log('我是编辑');
                console.log(Fname)
                // Fname.id = this.id;
                this.$http.get(material.moutstockdetailupdate,{params:Fname}).then(res=>{
                    console.log(res);
                    if(res.data.result == 'success'){
                        this.$http.get(material.moutstockselectBy,{params:{moutid:this.saftplanId}}).then(res=>{
                            console.log(res);
                            this.needplamform=res.data.list[0];
                            this.doubledata = res.data.list[0].mOutStockDetails
                            if(typeof(res.data.list[0].state)=='number'){
                                this.needplamform.state = res.data.list[0].state.toString();
                            }
                        })
                    }
                    this.modelVisible=false;
                })
                // this.modelform.id=this.id;
            }
        },
        // 物资计划的修改事件
        doubmodify(val){
                this.modelVisible=true;
            if(this.id == 0){
                 console.log(val);
                this.modId=val;
                console.log(this.doubledata);
                for(let i in this.doubledata){
                    if(this.doubledata[i].id==val){
                        console.log(12);
                        this.modelform=this.doubledata[i];
                    }
                }
            }else{
                this.$http.get(material.moutstockdetailselectBy,{params:{id:val}}).then(res=>{
                    console.log(res);
                    this.modelform = res.data.list[0]
                })
            }
           
        },
        //材料配置
        materconfig(){
            this.$http.get(material.mmaterials).then(res=>{
                // console.log(res);   teamteamselectlist
                this.materoption=res.data.list;
            })
        },
         //班组
         banzu(){
             this.$http.get(material.teamteamselectlist).then(res=>{
                //  console.log(res);
                 this.banzudetail = res.data
             })
         },
        materconfig(){
            this.$http.get(material.mmaterials).then(res=>{
                // console.log(res);   teamteamselectlist
                this.materoption=res.data.list;
            })
        },
        cangku(){
            this.$http.get(material.mrepo).then(res=>{
                console.log(res);
                this.ckdata = res.data.list
            })
        },
         modellocaton(){
            this.$http.get(dictapi.location).then(res=>{
                // console.log(res);
                this.localoption=res.data.list;
            })
        },
    },
    mounted(){
        this.banzu()
        this.uploadperson();
        this.category();
        this.materconfig();
        this.modellocaton();
        this.cangku();
        this.saftplanId=this.$route.query.id;
        this.id=this.$route.query.id;
        //列表页面编辑操作
        if(this.saftplanId!=0){
            this.$http.get(material.moutstockselectBy,{params:{moutid:this.saftplanId}}).then(res=>{
                console.log(res);
                this.needplamform=res.data.list[0];
                this.doubledata = res.data.list[0].mOutStockDetails
                if(typeof(res.data.list[0].state)=='number'){
                    this.needplamform.state = res.data.list[0].state.toString();
                }
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
