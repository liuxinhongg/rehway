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
                    </el-form-item>
                </el-form>
                <div class="pull-left btn-group" role="group">
                    <button class="btn btn-default a-insert" @click="newbuild()">新建</button>
                    <button class="btn btn-default a-remove" @click="table.removeAll()">删除</button>
                    <button class="btn btn-default a-export" @click="table.exportExcel()">导出</button>
                </div>
            </div>
            <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column label="SMTP服务器" width="400">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="yesno" label="需要认证" width="180">
                </el-table-column>
                <el-table-column prop="count" label="账号" width="400"> </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="info" @click="handlecheck(scope.$index, scope.row)">测试</el-button>
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
                date: 'mail.rhway.com',
                name: '王小虎',
                yesno: '是',
                count:'bot@yhway.com'
                }, {
                date: 'mail.rhway.com',
                name: '王小虎',
                yesno: '否',
                count:'bot@yhway.com'
                }, {
                date: 'mail.rhway.com',
                name: '王小虎',
                yesno: '是',
                count:'bot@yhway.com'
                }, {
                date: 'mail.rhway.com',
                name: '王小虎',
                yesno: '是',
                count:'bot@yhway.com'
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
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        newbuild(){
            this.$router.push({path:'/project/edit-add-input'});
        },
        handleEdit(){
            this.$router.push({path:'/project/edit-add-input?id=11'});
        },
        handlecheck(){
            this.$router.push({path:'/project/test-input'});
        }
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
