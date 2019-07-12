<template>
    <div class="addteam">
        <el-scrollbar style="height:100%;">
            <el-form :model="addteam" ref="addteam" label-width="165px" :rules="rule">
                <el-form-item label="班组名称：" prop="teamName">
                    <el-input v-model="addteam.teamName" placeholder="班组名称" class="itemadd"></el-input>
                </el-form-item>
                <el-form-item label="班组所在项目名称：" prop="projectCode">
                    <el-select v-model="addteam.projectCode" class="itemadd">
                        <el-option :label="item.name" :value="item.projectId" :key="index" v-for="(item,index) in projectType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="height:0px;">
                    <el-input type="hidden" v-model="addteam.teamId"></el-input>
                </el-form-item>
                <el-form-item style="">
                    <el-button type="primary" @click="submitForm('addteam')">提交</el-button>
                    <el-button @click="resetForm('addteam')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data(){
        return{
             addteam:{
                 teamName:'',
                 projectCode:'',
                 teamId:0,
             },
              trainType:[
                {label:'安全教育',type:'one'},
                {label:'入场教育',type:'two'},
                {label:'退场教育',type:'three'},
                {label:'技能培训',type:'four'},
            ],
            rule:{
                teamName:[
                    { required: true, message: '班组名称', trigger: 'blur' },
                ],
                projectCode:[
                    { required: true, message: '请选择班组所在项目名称', trigger: 'change' },
                ],
            },
            urlId:'',
            projectType:[],
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.urlId==0){
                        console.log("我是新增页面");
                        this.$http.get('/api/team/team_insert_info',{params:this.addteam}).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$router.push({path:'/project/teamconfig'});
                            }else if(res.data.result=='isexit'){
                                this.$message.warning('该公司的班组已存在，请重新添加~');
                            }
                        })
                    }else{
                        this.$http.get('/api/team/team_update_info',{params:this.addteam}).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$router.push({path:'/project/teamconfig'})
                            }
                        })
                        console.log("我是编辑页面");
                    }
                } else {
                    alert('error submit!!');
                    return false;
                }
            });
        },
        resetForm(){}
    },
    mounted(){
        this.urlId=this.$route.query.id;
        console.log(this.urlId);
        if(this.urlId!=0){
            this.$http.get('/api/team/team_select_id?teamId='+this.urlId).then(res=>{
                console.log(res);
                this.addteam=res.data;
            })
        }
        this.$http.post('/api/team/team_inset_readey').then(res=>{
            console.log(res);
            this.projectType=res.data.prjbaseinfo;
            this.addteam.projectCode=res.data.prjbaseinfo.projectId;
            
        })
        
    }
}
</script>

<style lang="scss">
.addteam{
    width: 95%;
    margin: 20px auto;
    height: calc(100vh - 85px);
    .el-collapse-item__header{
        font-weight: bold;
        font-size: 14px;
    }
    .itemadd{
        width:280px;
    }
}
</style>
<style >
    .addteam .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>