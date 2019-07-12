<template>
    <div class="addteam">
        <el-scrollbar style="height:100%;">
            <el-form :model="addteam" ref="addteam" label-width="165px" :rules="rule" style="width:50%;" @submit.native.prevent>
                <el-form-item label="组织机构代码：" prop="contractorCorpCode">
                    <el-input v-model="addteam.contractorCorpCode" placeholder="组织机构代码" ></el-input>
                </el-form-item>
                <el-form-item label="总承包单位名称：" prop="contractorCorpName">
                    <el-input v-model="addteam.contractorCorpName"  placeholder="总承包单位名称"></el-input>
                </el-form-item>
                <el-form-item label="项目名称：" prop="name">
                    <el-input v-model="addteam.name" placeholder="项目名称" ></el-input>
                </el-form-item>
                <el-form-item label="项目分类：" prop="category">
                    <el-cascader :options="categoryType" v-model="addteam.category" @change="categoryChange" :props="propstatus" style="width:100%;"></el-cascader>
                </el-form-item>
                <el-form-item label="施工许可证：" prop="builderLicenses">
                    <el-input v-model="addteam.builderLicenses" placeholder="施工许可证" ></el-input>
                </el-form-item>
                <!-- 项目所在地 -->
                <el-form-item label="项目所在地：" prop="areaCode">
                    <el-cascader :options="areaCodeoption" v-model="addteam.areaCode" @change="handleItemChange" :props="props" style="width:100%;"></el-cascader>
                </el-form-item>
                <!-- 项目状态 -->
                <el-form-item label="项目状态：" prop="prjStatus">
                    <el-select v-model="addteam.prjStatus" style="width:100%;">
                        <el-option :label="item.label" :value="item.type" :key="index" v-for="(item,index) in projectStatus"></el-option>                        
                    </el-select>
                </el-form-item>
                <el-form-item style="">
                    <el-button type="primary" native-type="submit" @click="submitForm('addteam')">提交</el-button>
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
                 contractorCorpName:'',
                 contractorCorpCode:'',
                 builderLicenses:'',
                 name:'',
                 teamId:0,
                 areaCode:[],
                 corpType:'',
                 prjStatus:'',
                 category:'',
             },
              projectStatus:[
                {label:'筹备',type:'001'},
                {label:'立项',type:'002'},
                {label:'在建',type:'003'},
                {label:'完工',type:'004'},
                {label:'停工',type:'005'},
            ],
            rule:{
                contractorCorpName:[
                    { required: true, message: '请输入总承包单位名称', trigger: 'blur' },
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                ],
                contractorCorpCode:[
                    { required: true, message: '请输入组织机构代码', trigger: 'blur' },
                ],
                name:[
                    { required: true, message: '项目名称', trigger: 'blur' },
                ],
                builderLicenses:[
                    { required: true, message: '请输入施工许可证', trigger: 'blur' },
                ],
                areaCode:[
                    { required: true, message: '请选择项目所在地', trigger: 'change' },
                ],
                category:[
                    { required: true, message: '请选择项目状态', trigger: 'change' },
                ],
            },

            urlId:'',
            areaCodeoption:[],
            categoryType:[],
            props: {
                value: 'code',
                label: 'name',
                children: 'child'
            },
            propstatus:{
                value: 'corpType',
                label: 'corp',
                children: 'child'
            }
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
                                this.$router.push({path:'/project/projectconfig'});
                            }else if(res.data.result=='isexit'){
                                this.$message.warning('该公司的班组已存在，请重新添加~');
                            }
                        })
                    }else{
                        this.$http.get('/api/team/team_update_info',{params:this.addteam}).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$router.push({path:'/project/projectconfig'})
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
        handleItemChange(val) {
            this.addinfo.areaCode=val;
            console.log(this.addinfo.areaCode[2]);
        },
        categoryChange(val){},
        resetForm(){}
    },
    mounted(){
        //   行政区的三级联动接口
        this.$http.post("/api/dict/regioncode_level").then(res => {
        console.log(res);
        this.areaCodeoption = res.data;
        });
        // 项目分类字典表
        this.$http.post('/api/dict/corptype_level').then(res=>{
            console.log(res);
            this.categoryType=res.data;
        })
        this.urlId=this.$route.query.id;
        console.log(this.urlId);
        if(this.urlId!=0){
            this.$http.get('/api/prj_base/prj_insert_info?teamId='+this.urlId).then(res=>{
                console.log(res);
                this.addteam=res.data;
            })
        }
        
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