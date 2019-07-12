<template>
    <div class="teamconfig">
        <!-- 搜索 -->
        <el-form :inline="true" :model="teamform" class="demo-form-inline">
            <el-form-item label="班组名称：">
                <el-input v-model.trim="teamform.teamName" placeholder="项目编码"></el-input>
            </el-form-item>
            <el-form-item label="分包项目：" >
                <el-select v-model="teamform.prjcode" style="width:220px;">
                    <el-option :label="item.builderLicensesName" :value="item.id" :key="index" v-for="(item,index) in projoption"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="success" @click="teamvisible = true">+新增</el-button>
            </el-form-item>
        </el-form>
        <!-- 列表显示信息 -->
        <div class="alltable">
            <el-scrollbar style="height:100%;">
                <el-table :data="trainData" border  style="width: 100%">
                    <el-table-column type="index" width="80" label="序号"></el-table-column>  
                    <el-table-column prop="teamName" label="班组名称"> </el-table-column>
                    <el-table-column prop="depIdName" label="所在部门"></el-table-column>
                    <el-table-column prop="subPrjName" label="分包项目"></el-table-column>
                    <el-table-column prop="teamManName" label="负责人"> </el-table-column>
                    <el-table-column prop="remark" label="描述">
                        <template slot-scope="scope">
                            <el-tooltip trigger="hover" placement="top">
                                <div slot="content">{{ scope.row.remark }}</div>
                                <div class="boxInput">{{ scope.row.remark }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
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
        <el-dialog title="班组配置" :visible.sync="teamvisible" width="50%" center>
            <el-form :model="addteam" ref="addteam" :rules="teamrules">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft" >班组名称：</td>
                        <td>
                            <el-form-item prop="teamName">
                                <el-input v-model.trim="addteam.teamName" placeholder="班组名称" class="itemadd" style="width:220px"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft" >部门名称：</td>
                        <td>
                            <el-form-item prop="depId">
                                <el-select v-model="addteam.depId" class="itemadd" style="width:220px">
                                    <el-option :label="item.departmentName" :value="item.departmentId" :key="index" v-for="(item,index) in projectType"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft" >负责人：</td>
                        <td>
                            <el-form-item prop="teamMan">
                                <el-select v-model="addteam.teamMan" style="width:220px;">
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td ></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="tdleft">描述：</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input v-model.trim="addteam.remark" type="textarea" :rows="3" style="width:100%;"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item style="text-align:center;">
                    <el-button type="primary" @click="suresub('addteam')">确定</el-button>
                    <el-button @click="teamvisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            projectType:[],
            personoption:[],
            projoption:[],
            teamvisible:false,
            addteam:{
                 teamName:'',
                 projectCode:'',
                 teamMan:'',
                //  responsiblePersonPhone:'',
                 depId:'',
                 remark:'',
             },
             teamrules:{
                 teamName:[{ required: true, message: '请输入部门名称', trigger: 'blur' },
                    {pattern:/^[\u4e00-\u9fa5_a-zA-Z]{3,15}$/,message:'部门名称长度范围（3~15）位'}
                ],
                depId:[{ required: true, message: '请选择部门', trigger: 'change' }],
                teamMan:[{ required: true, message: '请选择责任人', trigger: 'change' }],
                // responsiblePersonPhone:[{ required: true, message: '请输入手机号码', trigger: 'blur' },
                //     {pattern:/^1[3456789]\d{9}$/,message:'请输入正确的手机号码'}
                // ],
             },
            teamform:{
                teamName:'',
                prjcode:'',
            },
            trainData:[],
            // 分页
            currentPage:1,
            itemnum:10,
            countnum:1,
            teamId:0
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
        // 编辑
        handleClick(id){
            this.teamId=id;
            this.teamvisible = true;
            this.$http.get('/api/team/team_select_id?teamId='+id).then(res=>{
                console.log(res);
                this.addteam=res.data.list[0];
            })
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
            let data={
                page:this.currentPage,
                num:this.itemnum,
                prj_code:this.teamform.prjcode,
                teamName:this.teamform.teamName
            }
            this.$http.get('/api/team/team_select_bycode',{params:data}).then(res=>{
                console.log(res);
                this.trainData=res.data.list;
                let leng = res.data.count;
                this.countnum=leng;
            })
        },
        bzdata(){
            this.$http.get('/api/dep/selectBy').then(res=>{
                console.log(res);
                this.projectType=res.data.list;
            })
        },
        suresub(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.teamId==0){
                        console.log('我是新增')
                        let data={
                            teamName:this.addteam.teamName,
                            teamMan:this.addteam.teamMan,
                            depId:this.addteam.depId,
                            remark:this.addteam.remark,
                        }
                        this.$http.get('/api/team/team_insert_info',{params:data}).then(res=>{
                            console.log(res);
                            if(res.data.result="success"){
                                this.$message.success('班组添加成功~');
                                this.dataAll();
                                this.$nextTick(() => {
                                    this.$refs[formName].resetFields();
                                });
                                this.addteam.remark='';                               
                                this.teamvisible=false;
                            }
                        })
                    }else{
                        console.log('我是修改')
                        let data={
                            teamName:this.addteam.teamName,
                            teamMan:this.addteam.teamMan,
                            depId:this.addteam.depId,
                            remark:this.addteam.remark,
                            teamId:this.teamId
                        }
                        this.$http.get('/api/team/team_update_info',{params:data}).then(res=>{
                            console.log(res);
                            if(res.data.result="success"){
                                this.$message.success('班组修改成功~');
                                this.dataAll();
                                this.$nextTick(() => {
                                    this.$refs[formName].resetFields();
                                });
                                this.addteam.remark='';                                                                                           
                                this.teamvisible=false;
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 上传人员
        uploadperson(){
            this.$http.get('/api/user/user_select').then(res=>{
                this.personoption=res.data.list;
            })
        },
    },
    mounted(){
        this.bzdata();
        this.uploadperson()
        // 查询数据列表的接口
        this.dataAll();
        // 分包项目
        this.$http.get('/api/sub_prj/selectBy').then(res=>{
            // console.log(res);
            this.projoption=res.data.list;
        })
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