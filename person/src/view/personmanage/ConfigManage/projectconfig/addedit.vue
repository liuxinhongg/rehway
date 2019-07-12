<template>
    <div class="projectaddteam">
        <!-- <el-scrollbar style="height:100%;"> -->
            <p class="toptext">新增项目</p>
             <el-form :model="addteam" ref="addteam" :rules="projectrules" label-width="0px;"  @submit.native.prevent >
                <table border="1" class="tableinsert" >
                    <tr>
                        <td class="tdleft" >组织机构代码：</td>
                        <td>
                            <el-form-item prop="buildCorpCode">
                                <el-input v-model.trim="addteam.buildCorpCode" placeholder="组织机构代码" style="width:280px;margin-left:0px"></el-input>
                            </el-form-item>
                        </td>
                         <td class="tdleft" >项目编码：</td>
                        <td>
                            <el-form-item >
                                <el-input v-model.trim="addteam.projectId" placeholder="项目名称"  style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft" >项目名称：</td>
                        <td>
                            <el-form-item>
                                <el-input v-model.trim="addteam.name" placeholder="项目名称"  style="width:280px"></el-input>
                            </el-form-item>
                        </td>   
                        <td class="tdleft" >工程名称：</td>
                        <td>
                            <el-form-item >
                                <el-input v-model.trim="addteam.builderLicensesName" placeholder="工程名称"  style="width:280px"></el-input>
                            </el-form-item>
                        </td> 
                    </tr>
                    
                    <tr>
                        <td class="tdleft" >项目分类：</td>
                        <td>
                            <el-form-item >
                                <el-select v-model="addteam.category"  style="width:280px">
                                    <el-option :label="item.category" :value="item.categorytype" :key="index" v-for="(item,index) in categoryType"></el-option>                       
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft" >施工许可证：</td>
                        <td>
                            <el-form-item >
                                <el-input v-model.trim="addteam.builderLicenses" placeholder="施工许可证"  style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft" >项目所在地：</td>
                        <td>
                            <el-form-item   >
                                <el-cascader :options="areaCodeoption" v-model="addteam.areaCode" @change="handleItemChange" :props="props"  style="width:280px"></el-cascader>
                            </el-form-item>
                        </td>
                        <td class="tdleft" >项目状态：</td>
                        <td >
                            <el-form-item  >
                                <el-select v-model="addteam.prjStatus"  style="width:280px">
                                    <el-option :label="item.label" :value="item.type" :key="index" v-for="(item,index) in projectStatus"></el-option>                        
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft" >工程用途：</td>
                        <td >
                            <el-form-item prop="functionNum"  >
                                <el-select v-model="addteam.functionNum"  style="width:280px">
                                    <el-option :label="item.function" :value="item.functionnum" :key="index" v-for="(item,index) in functionoption"></el-option>                        
                                </el-select>
                            </el-form-item>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <div style="margin-top: 20px;font-size: 14px;text-align:center;" >
                    <el-button type="primary" native-type="submit" @click="submitForm('addteam')">提交</el-button>
                    <el-button @click="resetForm('addteam')">取消</el-button>
                </div>
            </el-form>
        <!-- </el-scrollbar> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            projectStatus:[
                {label:'筹备',type:'001'},
                {label:'立项',type:'002'},
                {label:'在建',type:'003'},
                {label:'完工',type:'004'},
                {label:'停工',type:'005'},
            ],
            addteam:{
                builderLicensesName:'',
                buildCorpCode:'',
                builderLicenses:'',
                name:'',
                areaCode:[],
                prjStatus:'',
                category:'',
                functionNum:'',
                companyId:0,
                projectId:'',
             },
            projectrules:{
                 buildCorpCode:[
                    { required: true, message: '请输入组织机构代码', trigger: 'blur' },
                    {pattern:/[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/,message:'请输入正确格式编码'}
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
                projectId:[
                    { required: true, message: '请输入项目编码', trigger: 'blur' },
                    {pattern:/^[A-Z]{2}[/-][a-zA-Z0-9]{8,10}$/,message:'请输入正确的项目编码'}
                ],
            },
            urlId:0,
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
            },
            
             functionoption:[],
             projectData:[],
        }
    },
    methods:{
        handleItemChange(val) {
            this.addteam.areaCode=val;
            console.log(this.addteam.areaCode[2]);
        },
        // 新增提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let teamdata = new FormData();
                    console.log(this.companyId)
                    teamdata.append('name',this.addteam.name);
                    teamdata.append('category',this.addteam.category);
                    teamdata.append('builderLicensesName',this.addteam.builderLicensesName);
                    teamdata.append('builderLicenses',this.addteam.builderLicenses);
                    teamdata.append('areaCode',this.addteam.areaCode[2]);
                    teamdata.append('prjStatus',this.addteam.prjStatus);
                    teamdata.append('functionNum',this.addteam.functionNum);
                    teamdata.append('entId',this.companyId);
                    teamdata.append('buildCorpCode',this.addteam.buildCorpCode);
                    teamdata.append('projectId',this.addteam.projectId);
                    if(this.urlId==0){
                        console.log("我是新增页面"); 
                        this.$http.post('/api/prj_base/prj_insert_info',teamdata).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                this.$router.push('/project/projectconfig')
                            }else if(res.data.result=='isexit'){
                                this.$message.warning('该公司的班组已存在，请重新添加~');
                            }
                        })
                    }else{
                        this.$http.post('/api/prj_base/prj_update_info',teamdata).then(res=>{
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
        categoryChange(val){},
        resetForm(){},
    },
    mounted(){
        this.urlId=this.$route.query.id;
        if(this.urlId!=0){
            this.$http.get('/api/prj_base/prj_base_list').then(res=>{
                console.log(res);
                this.addteam=res.data.list[0];
            })
        }
        // this.dataAll();
         //   行政区的三级联动接口
        this.$http.post("/api/dict/regioncode_level").then(res => {
        // console.log(res);
        this.areaCodeoption = res.data;
        });
        // 项目分类字典表
        // 项目分类
        this.$http.get('/api/dict/category').then(res=>{
            console.log(res);
            this.categoryType=res.data;
        });
        //企业信息
        this.$http.post('/api/ent/ent_select_list').then(res=>{
            // console.log(res);
            this.companyId=res.data.entId;
        })
        // 工程用途 dict/function
        this.$http.post('/api/dict/function').then(res=>{
            this.functionoption=res.data;
        })
    }
}
</script>
<style lang="scss">
.projectaddteam{
    width: 95%;
    margin: 20px auto;
    // height: calc(100vh - 85px);
    // .el-collapse-item__header{
    //     font-weight: bold;
    //     font-size: 14px;
    // }
    .itemadd{
        width:280px;
    }
}
// .el-form-item__content{
//      margin-left:0px !important
//   }
</style>
<style >
    /* .addteam .el-scrollbar__wrap {
        overflow-x: hidden;
    } */
</style>