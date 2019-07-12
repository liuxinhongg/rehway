<template>
    <div class="teamconfig">
        <!-- 搜索 -->
        <el-form :inline="true" :model="teamform" class="demo-form-inline">
            <el-form-item label="项目编码：">
                <el-input v-model="teamform.projectCode" placeholder="项目编码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button @click="addtrain">+新增班组名称</el-button>
            </el-form-item>
        </el-form>
        <!-- 列表显示信息 -->
        <div class="alltable">
            <el-scrollbar style="height:100%;">
                <el-table :data="trainData" border  style="width: 100%">
                    <el-table-column type="index" width="80" label="序号"></el-table-column>      
                    <el-table-column label="项目编码" prop="projectCode"></el-table-column>
                    <el-table-column prop="projectName" label="班组所在项目名称">
                        <template slot-scope="scope">
                            <el-tooltip trigger="hover" placement="top">
                                <div slot="content">{{ scope.row.projectName }}</div>
                                <div class="boxInput">{{ scope.row.projectName }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="corpCode" label="组织机构代码"> </el-table-column>
                    <el-table-column prop="teamName" label="班组名称"> </el-table-column>
                    <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.teamId)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteClick(scope.row.teamId)" type="text" size="small">删除</el-button>
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
    </div>
</template>

<script>
export default {
    data(){
        return{
            teamform:{
                projectCode:'',
            },
            trainData:[],
            // 分页
            currentPage:1,
            itemnum:10,
            countnum:1,
        }
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage=val;
            this.dataAll();
        },
        search(){
            this.$http.get('/api/team/team_select_bycode',{params:{prj_code:this.teamform.projectCode,page:this.currentPage,num:this.itemnum}}).then(res=>{
                console.log(res);
                this.trainData=res.data.list;
                let leng = res.data.count;
                this.countnum=leng;
            })
        },
        addtrain(){
            this.$router.push({path:'/project/teamaddedit?id=0'});
        },
        // 编辑
        handleClick(id){
            this.$router.push({path:'/project/teamaddedit?id='+id});
        },
        // 删除
        deleteClick(id){
            console.log(id);
            this.$http.post('/api/team/delete_team_id?teamId='+id).then(res=>{
                console.log(res);
                if(res.data.result='success'){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.dataAll();
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

                }
            })
        },
        // 查询数据列表的接口
        dataAll(){
            this.$http.get('/api/team/team_select_all',{params:{page:this.currentPage,num:this.itemnum}}).then(res=>{
                console.log(res);
                this.trainData=res.data.list;
                let leng = res.data.count;
                this.countnum=leng;
            })
        }
    },
    mounted(){
        // 查询数据列表的接口
        this.dataAll();
    }
}
</script>

<style lang="scss">
.teamconfig{
    width: 100%;
    margin: 20px auto;
    .alltable{
        width: 100%;
        height: calc(100vh - 280px);
        .boxInput{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
<style>
.teamconfig .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>