/*
* 隐患类型配置
*/
<template>
    <div class="hiddenconfig">
        <p class="toptext">隐患类型配置列表</p>
        <el-form :model="integral" style="margin:auto;width:95%;"  :inline="true" @submit.native.prevent>
            <el-form-item>
              <span>隐患名称：</span>  <el-input v-model="integral.name" placeholder="请输入隐患名称" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" icon="el-icon-search" @click="seach">搜索</el-button>
            </el-form-item>
            <el-form-item style="float:right;">
                <el-button @click="addhiddenconfig" type="success">+ 新建</el-button>
            </el-form-item>
        </el-form>
        <div class="tablehidden">
            <el-scrollbar style="height:100%;">    
                <el-table :data="hiddendata" style="width: 95%;margin:auto" border>
                    <el-table-column prop="id" label="编号" width="150" sortable></el-table-column>
                    <el-table-column prop="riskType" label="隐患类型名称"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                        <el-button type="text" small @click="deletehandle(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
        </div>
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
        <el-dialog title="新增" :visible.sync="localVisible" center>
            <el-form :model="hiddenform" ref="hiddenform">
                <table border="1" class="tableinsert" style="width:60%;">
                    <tr>
                        <td colspan="2" class="tdleft" style="width:50%;">姓名：</td>
                        <td colspan="2">
                            <el-form-item prop="riskType" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' },{ pattern: /^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/,message: '输入中午或者英文，不能超过10个字符'}]">
                                <el-input v-model="hiddenform.riskType" style="width:280px" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-button type="primary" @click="submitForm('hiddenform')">提交</el-button>
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
            hiddenform:{
                riskType:'',
            },
            localVisible:false,
            currentPage:1,
            itemnum:19,
            countnum:1,
            integral:{
                name:'',
            },
            hiddendata:[],
        }
    },
    methods:{
        // 新增区域图的提交事件
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let subhiddenform=new FormData();
                    subhiddenform.append('riskType',this.hiddenform.riskType)
                    this.$http.post(security.risktypeinsert,subhiddenform).then(res=>{
                        console.log(res);
                        if(res.data.result="success"){
                            this.localVisible=false;
                            this.localdata();
                            this.$refs[formName].resetFields();
                        }
                    })
                } else {
                console.log("error submit!!");
                return false;
                }
            });
        },
        seach(){
            this.localdata();
        },
        addhiddenconfig(){
            this.localVisible=true;
        },
        // 删除
        deletehandle(id){
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(security.risktypedelete,{params:{code:id}}).then(res=>{
                    console.log(res);
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
                riskType:this.integral.name
            }
            this.$http.get(dictapi.risttype,{params:data}).then(res=>{
                console.log(res);
                this.hiddendata=res.data.list;
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
.hiddenconfig{
    .tablehidden{
        height:calc(100vh - 220px);
        .el-scrollbar__wrap{
            overflow-x: hidden;
        }
    }
}
</style>
