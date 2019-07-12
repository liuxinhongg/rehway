<template>
    <div>
        <div class="emailcontent"> 
            <div class="doIt">
                <el-form :inline="true" :model="topsearch" class="demo-form-inline">
                    <el-form-item label="名称：">
                        <el-input v-model="topsearch.nack" name="topsearch.nick"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button @click="onSubmit">导出</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="createtime" label="创建时间" width="180"></el-table-column>
                <el-table-column label="模板" width="200" prop="model"></el-table-column>
                <el-table-column prop="receiver" label="接受者">
                </el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column label="操作"  width="250">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="handlecheck(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="1"
                    layout="prev, pager, next, jumper"
                    :total="1">
                </el-pagination>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            topsearch: {
               nack:'',
            },
            emaillist:[],
            tableData: [{
                theme: 'mail.rhway.com',
                createtime: '2019-02-01',
                model: '是',
                receiver:'bot@yhway.com',
                status:'正常'
                }, {
                theme: 'mail.rhway.com',
                createtime: '2019-02-01',
                model: '否',
                status:'正常',
                receiver:'bot@yhway.com'
                }, {
                theme: 'mail.rhway.com',
                createtime: '2019-02-01',
                model: '是',
                status:'正常',
                receiver:'bot@yhway.com'
                }, {
                theme: 'mail.rhway.com',
                createtime: '2019-02-01',
                model: '是',
                status:'正常',
                receiver:'bot@yhway.com'
            }],
            multipleSelection: [],
            currentPage: 1,
        }
    },
    methods:{
        onSubmit(){
            // this.$http.post(sendmail-config-list,{name:this.topsearch.nack}).then(res=>{
            //     console.log(res);
            // this.emaillist=res.data;
            // })
        },
        handlecheck(){
            this.$router.push({
                path:'/project/history-send-email'
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    }
}
</script>

<style lang="scss">
.emailcontent{
    margin-top: 20px;
    .doIt{
        display: flex;
        justify-content: space-between;
    }
    .optop{
        margin-left: 50px;
    }
}
</style>
