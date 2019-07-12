 
 <template>
    <div class="partconfig">
        <!-- 搜索 -->
        <el-form :inline="true" :model="toppartform" class="demo-form-inline"  @submit.native.prevent>
            <el-form-item label="部门名称：">
                <el-input v-model="toppartform.departmentName" placeholder="部门名称"></el-input>
            </el-form-item>
            <el-form-item label="负责人：">
                <el-select v-model="toppartform.leaderMan" style="width:100%;">
                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" native-type="submit" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button @click="addtrain">+新增部门名称</el-button>
            </el-form-item>
        </el-form>
        <!-- 列表显示信息 -->
        <div class="alltable">
            <el-scrollbar style="height:100%;">
                <el-table :data="partData" border  style="width: 100%">
                    <el-table-column type="index" width="120" label="序号"></el-table-column>      
                    <el-table-column label="部门编码" prop="departmentId" width="150"></el-table-column>
                    <el-table-column prop="leaderManName" label="创建时间"> 
                        <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
                    </el-table-column>
                    <el-table-column prop="departmentName" label="部门名称"> </el-table-column>
                    <el-table-column prop="leaderManName" label="负责人"> </el-table-column>
                    <el-table-column label="部门描述">
                        <template slot-scope="scope">
                            <el-tooltip trigger="hover" placement="top">
                                <div slot="content">{{ scope.row.comment }}</div>
                                <div class="boxInput">{{ scope.row.comment }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.departmentId)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteClick(scope.row.departmentId)" type="text" size="small">删除</el-button>
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
        <el-dialog :title="message" :visible.sync="partVisible" width="30%" center>
            <el-form :model="doform" label-width="120px" ref="doform" :rules="partrules" @submit.native.prevent style="width:85%;margin:auto;">
                <el-form-item label="部门名称：" prop="departmentName">
                    <el-input v-model="doform.departmentName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人：" prop="leaderMan">
                    <el-select v-model="doform.leaderMan" style="width:100%;">
                        <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述：" >
                    <el-input v-model="doform.comment" type="textarea" :rows="3"></el-input>
                </el-form-item>
                <el-form-item  style="text-align:center;">
                    <el-button native-type="submit" type="primary" @click="partsubmit('doform')">确定</el-button>
                    <el-button @click="partVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import formatDate from '@/filter/date.js';
export default {
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    data(){
        return{
            //弹框
            doform:{
                leaderMan:'',
                departmentName:'',
                comment:'',
            },
            //表格查询
            toppartform:{
                leaderMan:'',
                departmentName:'',
                id:'',
            },
            partVisible:false,
            message:'新增部门',
            teamform:{
                projectCode:'',
            },
            personoption:[],
            partData:[],
            // 分页
            currentPage:1,
            itemnum:10,
            countnum:1,
            partId:0,
            partrules:{
                leaderMan:[{ required: true, message: '请选择负责人', trigger: 'change' }],
                departmentName:[{ required: true, message: '请输入部门名称', trigger: 'blur' }],
            }
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
            this.partId=0;
            this.$nextTick(() => {
                this.$refs['doform'].resetFields();
            });
            this.partVisible=true;
        },
        // 编辑
        handleClick(id){
            this.partVisible=true;
            this.partId=id;
            this.$http.get('/api/dep/selectBy?id='+id).then(res=>{
                console.log(res);
                this.doform=res.data.list[0];
            })
        },
        // 删除
        deleteClick(id){
            console.log(id);
            this.$http.post('/api/dep/delete?id='+id).then(res=>{
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
            let data={
                page:this.currentPage,
                num:this.itemnum,
                id:this.toppartform.id,
                leaderMan:this.toppartform.leaderMan,
                departmentName:this.toppartform.departmentName,
            }
            this.$http.get('/api/dep/selectBy',{params:data}).then(res=>{
                console.log(res);
                this.partData=res.data.list;
                let leng = res.data.count;
                this.countnum=leng;
            })
        },
        // 上传人员
        uploadperson(){
            this.$http.get('/api/user/user_select').then(res=>{
                this.personoption=res.data.list;
            })
        },
        // 弹框 新增和编辑
        partsubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.partId==0){
                        console.log('我是新增')
                        let data={
                            leaderMan:this.doform.leaderMan,
                            departmentName:this.doform.departmentName,
                            comment:this.doform.comment,
                        }
                        this.$http.get('/api/dep/insert',{params:data}).then(res=>{
                            console.log(res);
                            if(res.data.result="success"){
                                this.$message.success('部门添加成功~');
                                this.dataAll();
                                this.$nextTick(() => {
                                    this.$refs[formName].resetFields();
                                });
                                this.doform.comment='';                               
                                this.partVisible=false;
                            }
                        })
                    }else{
                        console.log('我是修改')
                        let data={
                            leaderMan:this.doform.leaderMan,
                            departmentName:this.doform.departmentName,
                            comment:this.doform.comment,
                            departmentId:this.partId
                        }
                        this.$http.get('/api/dep/update',{params:data}).then(res=>{
                            console.log(res);
                            if(res.data.result="success"){
                                this.$message.success('部门修改成功~');
                                this.dataAll();
                                this.$nextTick(() => {
                                    this.$refs[formName].resetFields();
                                });
                                this.doform.comment='';                               
                                this.partVisible=false;
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted(){
        // 查询数据列表的接口
        this.dataAll();
        this.uploadperson();
    }
}
</script>

<style lang="scss">
.partconfig{
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
.partconfig .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>