/*
 * 后勤
 */
<template>
    <div class="rescteam">
        <el-form :model="rescteamform" :inline="true" label-width="80px;"  @submit.native.prevent>
            <el-form-item label="救援人员：">
                <el-input v-model="rescteamform.workerName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" native-type="submit" @click="search">搜索</el-button>
            </el-form-item>
            <el-form-item style="float:right;">
                <el-button @click="addrescteam" type="success">+ 添加</el-button>
                <el-button @click="exporttegral">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="rescteamdata" style="width: 100%" border>
            <el-table-column prop="id" label="编号" width="120"></el-table-column>
            <el-table-column prop="duty" label="职务" sortable></el-table-column>
            <el-table-column prop="workName" label="救援人员名称" sortable></el-table-column>
            <el-table-column prop="workerTel" label="电话"></el-table-column>
             <el-table-column label="内容" width="400">
                <template slot-scope="scope">
                <el-tooltip trigger="hover" placement="top">
                    <div slot="content">{{ scope.row.remark }}</div>
                    <div class="boxInput">{{ scope.row.remark }}</div>
                </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                   <el-button type="text" small @click="checkhandle(scope.row.id)">编辑</el-button>
                   <el-button type="text" small @click="deletehandle(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
    </div>
</template>

<script>
import * as security from '@/api/security.js'
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
        return{
            currentPage:1,
            itemnum:10,
            countnum:1,
            rescteamform:{
                group:0,
                workerName:'',
            },
            personoption:[],
            rescteamdata:[],
        }
    },
    methods:{
        search(){
            this.resudata();            
        },
        addrescteam(){
            this.$router.push({path:'/saftmanage/rescueteamadd?id=0'});
        },
        exporttegral(){},
        // 查看
        checkhandle(id){
            this.$router.push({path:'/saftmanage/rescueteamadd?id='+id});
        },
        // 删除
        deletehandle(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$http.post(security.securitydelete,{params:{id:id}}).then(res=>{
                        console.log(res);
                    })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        },
        resudata(){
            let data={
               page:this.currentPage,
               num:this.itemnum,
               group:this.rescteamform.group,
               workerName:this.rescteamform.workerName
            }
            this.$http.get(security.securityselectBy,{params:data}).then(res=>{
                console.log(res);
                this.rescteamdata=res.data.list;
                let resteamlength=res.data.count
                this.countnum=resteamlength;
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage=val;
            this. resudata();
        },
        // 上传人员
        uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                this.personoption=res.data.list;
            })
        },
    },
    mounted(){
        this.resudata();
        this.uploadperson();
    }
}
</script>

<style lang="scss">
.rescteam{
    width: 95%;
    margin: 20px auto;
    .boxInput{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
}
</style>
