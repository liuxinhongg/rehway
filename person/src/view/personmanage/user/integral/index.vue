<template>
    <div class="integral">
    <p class="persontop">积分管理列表</p>
        <el-form :model="integral" :inline="true" label-width="80px;"  @submit.native.prevent>
            <el-form-item>
               <span>用户编号：</span> <el-input v-model="integral.usercode" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item>
               <span>用户名称：</span> <el-input v-model="integral.username" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item>
               <span>积分处分：</span> <el-input v-model="integral.surplus" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item>
               <span>积分分配次数：</span> <el-input v-model="integral.itemnumber" type="number" min="1" max="2" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" native-type="submit" >搜索</el-button>
            </el-form-item>
            <el-form-item style="float:right;">
                <!-- <el-button @click="addintegral" type="success">+增加</el-button> -->
                <el-button @click="exporttegral">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="integraldata" style="width: 100%" border>
            <el-table-column type="index" width="80" label="序号"></el-table-column>
            <el-table-column prop="code" width="150" label="用户的编号"></el-table-column>
            <el-table-column prop="username" label="用户名称" sortable></el-table-column>
            <el-table-column prop="sumintegral" label="总积分" sortable></el-table-column>
            <el-table-column prop="itemnumber" label="积分分配次数" sortable></el-table-column>
            <el-table-column prop="surplus" label="积分处分"></el-table-column>
            <el-table-column label="剩余积分" >
                <template slot-scope="scope">
                    {{scope.row.sumintegral-scope.row.surplus}}
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" width="250"></el-table-column>
            <!-- <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                   <el-button type="text" icon="el-icon-info" small @click="checkhandle(scope.row.id)">详情</el-button>
                   <el-button type="text" style="color:#F56C6C" icon="el-icon-delete" @click="deletehandle(scope.row.id)">删除</el-button>
                </template>
            </el-table-column> -->
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
        <el-dialog title="新增积分" :visible.sync="integralVisible">
            <el-form :model="integraladdform" ref="integraladdform" :rules="integralrule">
                <table border="1" class="tableinsert" style="width:95%;">
                    <tr>
                        <td class="tdleft">用户名：</td>
                        <td> 
                        <el-form-item prop="username">
                            <el-input v-model="integraladdform.username" placeholder="用户名"></el-input>
                        </el-form-item>
                        </td>
                        <td class="tdleft">用户编号：</td>
                        <td>
                        <el-form-item prop="usercode">
                            <el-input v-model="integraladdform.usercode" placeholder="用户编号"></el-input>
                        </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">总积分数：</td>
                        <td> 
                            <el-form-item prop="sumIngeral">
                                <el-input type="number" max="100" min="30" v-model="integraladdform.sumIngeral" placeholder="总积分数"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">积分分配次数：</td>
                        <td>
                            <el-form-item prop="timenum">
                                <el-input v-model="integraladdform.timenum" type="number" max="2" min="1" placeholder="积分分配次数"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">积分处分：</td>
                        <td colspan="3"> 
                            <el-form-item prop="surplus">
                                <el-input v-model="integraladdform.surplus" type="number" max="100" min="0" placeholder="积分处分" style="width:39%;"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <el-form-item style="text-align:center;">
                    <el-button @click="submitForm('integraladdform')" type="primary">保存</el-button>
                    <el-button @click="integralVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            integralVisible:false,
            integraladdform: {
                username: "",
                usercode:'',
                sumIngeral:'',
                timenum:'',
                surplus:''
            },
            integralrule:{
                username:[{ required: true, message: '请输入用户名称', trigger: 'blur' }],
                usercode:[{ required: true, message: '请输入用户编号', trigger: 'blur' }],
                sumIngeral:[{ required: true, message: '请输入总积分数', trigger: 'blur' }],
                timenum:[{ required: true, message: '请输入积分分配次数', trigger: 'blur' }],
                surplus:[{ required: true, message: '请输入积分处分', trigger: 'blur' }],
            },
            currentPage:1,
            itemnum:10,
            countnum:1,
            integral:{
                itemnumber:'',
                usercode:'',
                surplus:'',
                username:'',
            },
            integraldata:[
                {
                    usercode:'5454531254',
                    username:'张三',
                    sumintegral:100,
                    itemnumber:1,
                    surplus:23,
                    remark:'表现不错',
                    id:23,
                },
                {
                    usercode:'5454531254',
                    username:'张三',
                    sumintegral:100,
                    itemnumber:1,
                    surplus:48,
                    id:23,
                    remark:'最近不在状态哦~',
                },
            ],
        }
    },
    methods:{
        //弹框的确定按钮
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        addintegral(){
            this.integralVisible=true;
            // this.$router.push({path:'/project/integraladd?id=0'});
        },
        exporttegral(){},
        // 查看
        checkhandle(id){
            this.$router.push({path:'/project/check?id='+id});
        },
        // 删除
        deletehandle(id){
            if(this.integraldata[0].itemnumber==1){
                alert("重新参加学习安全教育吧，就剩下最后一次机会了");
            }else{
                alert('删除成功');
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style lang="scss">
.integral{
    width: 95%;
    margin: auto;
}
</style>
