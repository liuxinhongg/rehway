/*
* 区域配置
*/
<template>
    <div class="integral">
        <p class="toptext">区域配置</p>
        <el-scrollbar style="height:100%;">    
            <el-form :model="integral" :inline="true" label-width="120px;" @submit.native.prevent>
                <el-form-item>
                   <span>区域配置名称：</span> <el-input v-model="integral.name" style="width:220px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit" icon="el-icon-search" @click="seach">搜索</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button @click="addintegral" type="success">+ 新建</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="integraldata" style="width: 100%" border>
                <el-table-column type="index" label="编号" width="150"></el-table-column>
                <el-table-column prop="locName" label="名称" sortable></el-table-column>
                <el-table-column prop="sumintegral" label="区域图">
                    <template slot-scope="scope">
                        <img :src="'/api/took/user_get_photo?fileName='+scope.row.locPicPath" alt="" srcset="" style="width:80px;height:50px;">
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                    <el-button type="text" small @click="deletehandle(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="itemnum"
                layout="prev, pager, next, jumper"
                :total="countnum">
            </el-pagination>
        </div>
        
        <el-dialog title="新增" :visible.sync="localVisible">
            <el-form :model="localform" ref="localform">
                <table border="1" class="tableinsert" style="width:100%;">
                    <tr>
                        <td class="tdleft">姓名：</td>
                        <td>
                            <el-form-item prop="locName" >
                                <el-input v-model="localform.locName" style="width:280px" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">上传图片：</td>
                        <td>
                            <el-form-item>
                                <el-upload
                                    class="upload-demo"
                                    action=" "
                                    :limit="1"
                                    accept="image/png,image/jpeg"
                                    :http-request="handleChange"
                                    :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <span class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-button type="primary" @click="submitForm('localform')">提交</el-button>
                        </td>
                        <td colspan="2">
                            <el-button @click="localVisible=false">返回</el-button>
                        </td>
                    </tr>
                </table>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import * as security from '@/api/security.js'
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
        return{
            fileList:[],
            localform:{
                locName:'',
                filepath:'',
            },
            localVisible:false,
            currentPage:1,
            itemnum:10,
            countnum:1,
            integral:{
                name:'',
            },
            // localform:{
            //     locName:[{ required: true, message: '请输入姓名', trigger: 'blur' },
            //     { pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/,message: '输入中午或者英文，不能超过10个字符'}]
            // }
            integraldata:[],
        }
    },
    methods:{
        handleChange(param){
            console.log(param);
            this.localform.filepath=param.file;
        },
        // 新增区域图的提交事件
        submitForm(formName) {
            console.log(11)
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let sublocalform=new FormData();
                    sublocalform.append('locName',this.localform.locName)
                    sublocalform.append('filepaths',this.localform.filepath)
                    this.$http.post(security.locationinsert,sublocalform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                        console.log(res);
                        if(res.data.result="success"){
                            this.localVisible=false;
                            this.localdata();
                            this.$refs[formName].resetFields();
                            this.fileList=[];
                        }
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        seach(){
            this.$http.post('/api/location/selectBytitle?name='+this.integral.name).then(res=>{
                console.log(res);
                // locList
                this.integraldata=res.data.result;
                this.countnum=res.data.count;
            })
            // this.localdata();
        },
        addintegral(){
            this.localVisible=true;
        },
        // 删除
        deletehandle(id){
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(security.locationdelete,{params:{id:id}}).then(res=>{
                    console.log(res)
                    if(res.data.result='success'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.localdata();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage=val;
            this.localdata();
        },
        localdata(){
            let data={
                page:this.currentPage,
                num:this.itemnum,
                name:this.integral.name
            }
            this.$http.get(security.locationselectAll,{params:data}).then(res=>{
                console.log(res);
                // this.integraldata=res.data.result;
                this.integraldata=res.data.list;
                this.countnum=res.data.count;
            })
        }
    },
    mounted(){
        this.localdata();
    }
}
</script>

<style lang="scss">
.integral{
    width: 95%;
    margin: 20px auto;
    height: calc(100vh - 165px);
    .el-scrollbar__wrap{
        overflow-x: hidden;
    }
}
</style>
