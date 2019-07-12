<template>
    <div class="storehouse">
        <p class="toptext">仓库配置表</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="storehouseform" :rules="useryz" @submit.native.prevent  ref="storehouseform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">仓库名称：</td>
                        <td>
                            <el-form-item prop="reponame">
                                <el-input v-model.trim="storehouseform.reponame" style="width:280px" placeholder="请输入仓库名称"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">仓库位置：</td>
                        <td>
                           <el-form-item prop="repoloc">
                                <el-input v-model.trim="storehouseform.repoloc" style="width:280px" placeholder="请输入仓库位置"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">仓库管理员：</td>
                        <td>
                            <el-form-item prop="reman">
                                <el-select v-model="storehouseform.reman" style="width:280px">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        
                    </tr>
                    <tr>
                        <td class="tdleft">备注：</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input v-model.trim="storehouseform.remark" type="textarea" :rows="3" maxlength="300"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-button type="primary" native-type="submit" @click="saftplansubmit('storehouseform')">提交</el-button>
                        </td>
                        <td colspan="2">
                            <el-button @click="returncancle()">返回</el-button>
                        </td>
                    </tr>
                </table>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
import * as material from '@/api/material.js'
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
        return{
            personoption:[],
            storehouseform:{
                reponame:'',
                repoloc:'',
                reman:'',
                remark:'',
            },
            useryz:{          
                reponame:[{required: true,message: "请输入供应商名称",trigger: "blur"},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{5,20}$/,message:'请输入5~20个字符的供应商名称'}],
                repoloc:[{required: true,message: "请输入供应商地址",trigger: "blur"},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{5,20}$/,message:'请输入5~20个字符的供应商地址'}],
                reman:[{required: true,message: "请输入供应商负责人",trigger: "change"}],
            },
            storeId:0,
        }
    },
    methods:{
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let storeform=new FormData();
                    storeform.append('reponame',this.storehouseform.reponame)
                    storeform.append('repoloc',this.storehouseform.repoloc)
                    storeform.append('reman',this.storehouseform.reman)
                    storeform.append('remark',this.storehouseform.remark)
                    if(this.storeId==0){
                        this.$http.post(material.mrepoinsert,storeform).then(res=>{
                            // console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('添加成功~');
                                this.$router.push('/materialmanage/storehouse');
                            }else if(res.data.result=='error'){
                                this.$message.error('添加失败');
                            }
                        })
                    }else{
                        storeform.append('repoid',this.storeId);
                        this.$http.post(material.mrepoupdate,storeform).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$message.success('修改成功~');
                                this.$router.push('/materialmanage/storehouse');
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
            this.$router.push({path:'/materialmanage/storehouse'});
        },
        uploadperson(){
            this.$http.get('/api/user/user_select').then(res=>{
                this.personoption=res.data.list;
            })
        },
    },
    mounted(){
        this.uploadperson();
        this.storeId=this.$route.query.id;
        console.log(this.storeId);
        if(this.storeId!=0){
            this.$http.get(material.mrepo,{params:{id:this.storeId}}).then(res=>{
                console.log(res);
                this.storehouseform=res.data.list[0];
            })
        }
    }
}
</script>

<style>
.storehouse{
    height:calc(100vh - 120px);
}
.storehouse .el-scrollbar__wrap{
    overflow-x: hidden;
}
</style>
