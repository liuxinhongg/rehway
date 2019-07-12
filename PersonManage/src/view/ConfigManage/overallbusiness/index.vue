<template>
    <div class="overall">
        <!-- 搜索 -->
        <el-form :inline="true" :model="projectform" class="demo-form-inline" @submit.native.prevent>
            <el-form-item label="分包商编码：">
                <el-input v-model="projectform.projectCode" placeholder="分包商编码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit"  @click="search" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button @click="addtrain">+新增分包商</el-button>
            </el-form-item>
        </el-form>
        <!-- 列表显示信息 -->
        <div class="alltable">
            <el-scrollbar style="height:100%;">
                <el-table :data="trainData" border  style="width: 100%">
                    <el-table-column type="index" width="80" label="序号"></el-table-column>      
                    <!-- 项目名称 -->
                    <el-table-column prop="name" label="项目名称" width="180">
                        <template slot-scope="scope">
                            <el-tooltip trigger="hover" placement="top">
                                <div slot="content">{{ scope.row.name }}</div>
                                <div class="boxInput">{{ scope.row.name }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="编码" prop="projectCode" width="180">45454</el-table-column>
                    <el-table-column prop="contractorCorpName" label="组织机构代码证" >
                        <template slot-scope="scope">
                            <el-tooltip trigger="hover" placement="top">
                                <div slot="content">{{ scope.row.contractorCorpName }}</div>
                                <div class="boxInput">{{ scope.row.contractorCorpName }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="category" label="项目分类" width="180"></el-table-column>
                    <el-table-column prop="builderLicenses" label="施工许可证" width="200"> </el-table-column>
                    <el-table-column prop="areaCode" label="项目所在地"></el-table-column>
                    <el-table-column prop="prjStatus" label="项目状态" width="120"> </el-table-column>
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
            projectform:{
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
            // this.dataAll();
        },
        search(){
            // this.$http.get('/api/team/team_select_bycode',{params:{prj_code:this.projectform.projectCode,page:this.currentPage,num:this.itemnum}}).then(res=>{
            //     console.log(res);
            //     this.trainData=res.data.list;
            //     let leng = res.data.count;
            //     this.countnum=leng;
            // })
        },
        addtrain(){
            this.$router.push({path:'/project/addoverall?id=0'});
        },
        // 编辑
        handleClick(id){
            this.$router.push({path:'/project/addoverall?id='+id});
        },
        // 删除
        deleteClick(id){
            console.log(id);
        },
        // 查询数据列表的接口
        dataAll(){
            this.$http.get('/api/prj_base/prj_base_list',{params:{page:this.currentPage,num:this.itemnum}}).then(res=>{
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
.overall{
    width: 95%;
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
.overall .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>