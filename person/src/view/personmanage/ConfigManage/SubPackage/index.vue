<template>
    <div class="subpage">
        <!-- 搜索 -->
        <el-form :inline="true" :model="subform" class="demo-form-inline" @submit.native.prevent>
            <el-form-item label="分包商编码：">
                <el-input v-model="subform.corpCode" placeholder="分包商编码"></el-input>
            </el-form-item>
            <el-form-item label="工程名称：">
                <el-input v-model="subform.builderName"></el-input>
            </el-form-item>
            <el-form-item label="项目状态：">
                <el-select v-model="subform.state">
                <el-option
                    :label="item.status"
                    :value="item.type"
                    :key="index"
                    v-for="(item,index) in statusType"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit"  @click="search" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button @click="addtrain" type="success">+新增</el-button>
            </el-form-item>
        </el-form>
        <!-- 列表显示信息 -->
        <div class="alltable">
            <el-scrollbar style="height:100%;">
                <el-table :data="trainData" border  style="width: 100%">
                    <!-- 项目名称 -->
                    <el-table-column type="index" width="80" label="编号"> </el-table-column>
                    <el-table-column label="工程名称" sortable>
                        <template slot-scope="scope">
                            <el-tooltip trigger="hover" placement="top">
                                <div slot="content">{{ scope.row.builderLicensesName }}</div>
                                <div class="boxInput">{{ scope.row.builderLicensesName }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="categoryTypeName" label="项目分类" width="180" sortable></el-table-column>
                    <el-table-column label="施工许可证编码" prop="builderLicenses" ></el-table-column>
                    <el-table-column prop="address" label="项目所在地" ></el-table-column>
                    <el-table-column prop="stateType" label="项目状态" sortable > </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row.id)" type="text" ><i class="iconfont icon-edit"></i>编辑</el-button>
                            <!-- <el-button @click="deleteClick(scope.row.teamId)" type="text" size="small">删除</el-button> -->
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
            statusType:[
                {status:'筹备',type:'001'},
                {status:'立项',type:'002'},
                {status:'在建',type:'003'},
                {status:'完工',type:'004'},
                {status:'停工',type:'005'},
             ],
            subform:{
                id:'',
                corpCode:'',
                builderName:'',
                state:'',
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
            this.dataAll();
        },
        addtrain(){
            this.$router.push({path:'/project/addsubpage?id=0'});
        },
        // 编辑
        handleClick(id){
            this.$router.push({path:'/project/addsubpage?id='+id});
        },
        // 删除
        deleteClick(id){
            console.log(id);
        },
        // 查询数据列表的接口
        dataAll(){
            let data={
                page:this.currentPage,
                num:this.itemnum,
                id:this.subform.id,
                builderName:this.subform.builderName,
                state:this.subform.state,
                corpCode:this.subform.corpCode
            }
            this.$http.get('/api/sub_prj/selectBy',{params:data}).then(res=>{
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
.subpage{
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
.subpage .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>