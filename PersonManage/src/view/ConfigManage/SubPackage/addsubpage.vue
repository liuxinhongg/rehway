<template>
    <div class="addsubpage">
        <el-scrollbar style="height:100%;">
            <el-form :model="addtrain" ref="addtrain" label-width="165px" :rules="rule" style="width:50%;margin:20px;">
                <el-form-item label="统一社会信用码：" prop="subCorpCode">
                    <el-select v-model="addtrain.subCorpCode" style="width:100%;">
                        <el-option :label="item.corpName" :value="item.corpCode" :key="index" v-for="(item,index) in suboption"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分包单位名称：" prop="subCorpName" >
                    <el-input v-model="addtrain.subCorpName"></el-input>
                </el-form-item>
                <el-form-item label="项目分类：" prop="categoryType">
                    <el-select v-model="addtrain.categoryType" style="width:100%;">
                        <el-option :label="item.category" :value="item.categorytype" :key="index" v-for="(item,index) in Choosecate"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工程名称：" prop="builderLicensesName">
                    <el-input v-model="addtrain.builderLicensesName" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="施工许可证编码：" prop="builderLicenses">
                    <el-input v-model="addtrain.builderLicenses" ></el-input>
                </el-form-item>
                <el-form-item label="项目所在地：" prop="address">
                    <el-input v-model="addtrain.address" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目状态：" prop="state">
                    <el-select v-model="addtrain.state" style="width:100%;">
                    <el-option
                        :label="item.status"
                        :value="item.type"
                        :key="index"
                        v-for="(item,index) in statusType"
                    ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="">
                    <el-button type="primary" @click="submitForm('addtrain')">提交</el-button>
                    <el-button @click="resetForm('addtrain')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data(){
        return{
            suboption:[],
             addtrain:{
                 subCorpCode:'',
                 subCorpName:'',
                 categoryType:'',
                 address:'',
                 builderLicenses:'',
                 builderLicensesName:'',
                 state:'',
                 id:'',
             },
             statusType:[
                {status:'筹备',type:'001'},
                {status:'立项',type:'002'},
                {status:'在建',type:'003'},
                {status:'完工',type:'004'},
                {status:'停工',type:'005'},
             ],
             Choosecate:[],
             rule:{
                subCorpCode:[
                    { required: true, message: '接入编号', trigger: 'blur' },
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                ],
                subCorpName:[
                    { required: true, message: '培训日期', trigger: 'blur' },
                ],
                categoryType:[
                    { required: true, message: '请选择项目分类', trigger: 'change' },
                ],
                builderLicenses:[
                    { required: true, message: '请输入施工许可证编码', trigger: 'blur' },
                ],
                builderLicensesName:[
                    { required: true, message: '请输入工程名称', trigger: 'change' },
                ],
                address:[
                    { required: true, message: '请输入项目所在地', trigger: 'change' },
                ],
                status:[
                    { required: true, message: '请选择项目状态', trigger: 'change' },
                ],
             },
             sub_Id:0,
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.sub_Id==0){
                        this.$http.get('/api/sub_prj/insert',{params:this.addtrain}).then(res=>{
                            // console.log(res);
                            if(res.data.result="success"){
                                this.$router.push('/project/subpackage');
                            }
                        });
                    }else{
                        this.addtrain.id=this.sub_Id;
                        this.$http.get('/api/sub_prj/update',{params:this.addtrain}).then(res=>{
                            console.log(res);
                            if(res.data.result="success"){
                                this.$router.push('/project/subpackage');
                            }
                        });
                    }
                } else {
                    alert('error submit!!');
                    return false;
                }
            });
        },
        resetForm(){},
        // 项目分类
        category(){
            this.$http.get('/api/dict/category').then(res=>{
                console.log(res);
                this.Choosecate=res.data;
            });
        },
        //统一信用码
        sub_crop(){
            this.$http.get('/api/prj_sub/sub_select_list').then(res=>{
                console.log(res);
                this.suboption=res.data.PrjSubInfos;
            });
        },
    },
    mounted(){
        this.category();//项目分类
        this.sub_crop();
        this.sub_Id=this.$route.query.id;
        console.log(this.sub_Id);
        // 编辑前根据ID查询的数据
        if(this.sub_Id!=0){
            this.$http.post('/api/sub_prj/selectBy?id='+this.sub_Id+'&page=1&num=1').then(res=>{
                console.log(res);
                this.addtrain=res.data.list[0];
            //    this.Choosecate =res.data.list[0].corpTypeName
            })
        }
    }
}
</script>

<style lang="scss">
.addsubpage{
    width: 100%;
    height: calc(100vh - 101px);
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
.addsubpage .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>