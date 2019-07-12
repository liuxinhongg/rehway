<template>
    <div class="basebank">
        <p class="toptext">基础物资配置表</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="storehouseform" :rules="useryz" @submit.native.prevent  ref="storehouseform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">物资类别：</td>
                        <td>
                            <el-form-item prop="mtype">
                                <el-select v-model="storehouseform.mtype" style="width:280px">
                                    <el-option v-for="(item,index) in typeoption" :key="index" :value="item.id" :label="item.materials"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">物资名称：</td>
                        <td>
                           <el-form-item prop="mname">
                                <el-input v-model.trim="storehouseform.mname" style="width:280px" placeholder="请输入物资名称"></el-input>
                            </el-form-item>
                        </td> 
                    </tr>
                    <tr>
                        <td class="tdleft">物品编码：</td>
                        <td>
                            <el-form-item prop="mcode">
                                <el-input v-model.trim="storehouseform.mcode" style="width:280px" placeholder="请输入物品编码"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">物品单位：</td>
                        <td>
                           <el-form-item prop="munit">
                                <el-input v-model.trim="storehouseform.munit" style="width:280px" placeholder="请输入物品单位"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">材料照片：</td>
                        <td colspan="3">
                            <el-form-item>
                                <el-upload action=""
                                    list-type="picture-card"
                                    :file-list="fileList"
                                    :multiple=true
                                    :http-request="handlePicture"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </el-form-item>
                        </td>
                        
                    </tr>
                    <tr>
                        <td class="tdleft">备注：</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input v-model.trim="storehouseform.remark" type="textarea" :rows="3" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item style="text-align:center;">
                    <el-button type="primary" native-type="submit" @click="saftplansubmit('storehouseform')">提交</el-button>
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
        var checkcode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('编码不能为空'));
            } else {
                const reg = /[0-9]|[a-z][A-Z]{3,10}/
                console.log(reg.test(value));
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('编码只能是数字和字母'));
                }
            }
        };
        return{
            typeoption:[],
            personoption:[],
            fileList:[],
            storeform:new FormData(),
            storehouseform:{
                mtype:'',
                mname:'',
                filepaths:'',
                remark:'',
                mcode:'',
                model:'',
                munit:'',
            },
            useryz:{          
                mtype:[{required: true,message: "请选择物资类别",trigger: "change"}],
                mname:[{required: true,message: "请输入物资名称",trigger: "blur"},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{5,20}$/,message:'请输入5~20个字符的物资名称'}],
                mcode:[{validator:checkcode,trigger: "blur"}],
                munit:[{required: true,message: "请输入物品单位",trigger: "blur"},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{5,20}$/,message:'请输入5~20个字符的物品单位'}],
            },
            storeId:0,
        }
    },
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePicture(param){
            this.storeform.append('filepaths',param.file);
        },
        saftplansubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.storeform.append('mtype',this.storehouseform.mtype)
                    this.storeform.append('mname',this.storehouseform.mname)
                    this.storeform.append('reman',this.storehouseform.reman)
                    this.storeform.append('remark',this.storehouseform.remark)
                    this.storeform.append('mcode',this.storehouseform.mcode)
                    this.storeform.append('munit',this.storehouseform.munit)
                    this.$http.post(material.mmaterialsinsert,this.storeform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                        console.log(res);
                        if(res.data.result=='success'){
                            this.$message.success('添加成功~');
                            this.$router.push('/materialmanage/basicgoodsbank');
                        }else if(res.data.result=='error'){
                            this.$message.error('添加失败');
                        }
                    })
                } else {
                    this.$message.error('提交数据失败')
                    return false;
                }
            });
        },
        returncancle(){
            this.$router.push({path:'/materialmanage/basicgoodsbank'});
        },
        uploadperson(){
            this.$http.get('/api/user/user_select').then(res=>{
                this.personoption=res.data.list;
            })
        },
        materialtype(){
            this.$http.get('/api/materialsType/selectBy').then(res=>{
                this.typeoption=res.data.list
            })
        }
    },
    created(){},
    mounted(){
        let storeform=new FormData();
        this.uploadperson();
        this.materialtype();
    }
}
</script>

<style>
.basebank{
    height:calc(100vh - 80px);
}
.basebank .el-scrollbar__wrap{
    overflow-x: hidden;
}
.basebank .el-upload--picture-card{
    width: 120px;
    height: 120px;
    line-height: 120px;
    margin-left: 10px;
}
.basebank .el-upload-list--picture-card .el-upload-list__item{
    width: 120px;
    height: 120px;
    margin: 0px 0px 0px 5px;
}
</style>
