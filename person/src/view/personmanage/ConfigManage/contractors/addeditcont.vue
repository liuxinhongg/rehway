<template>
    <div class="addcontract">
        <el-scrollbar style="height:100%;">
            <el-form :model="addcontract" ref="addcontract" label-width="165px" :rules="rule">
                <el-form-item label="项目编码：" prop="projectCode">
                     <el-select v-model="addcontract.corpType" class="itemadd">
                        <el-option :label="item.subtype" :value="item.subid" :key="index" v-for="(item,index) in projoption"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组织机构代码：" prop="corpCode">
                    <el-input v-model="addcontract.corpCode" placeholder="组织机构代码" class="itemadd"></el-input>
                </el-form-item>
                <el-form-item label="企业名称：" prop="corpName">
                    <el-input v-model="addcontract.corpName" placeholder="企业名称" class="itemadd"></el-input>
                </el-form-item>
                <el-form-item label="参建类型：" prop="corpTypeName">
                    <el-select v-model="addcontract.corpType" class="itemadd">
                        <el-option :label="item.subtype" :value="item.subid" :key="index" v-for="(item,index) in contractType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件类型：" prop="corpTypeName">
                    <el-select v-model="addcontract.corpType" class="itemadd">
                        <el-option :label="item.subtype" :value="item.subid" :key="index" v-for="(item,index) in contractType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="">
                    <el-button type="primary" @click="submitForm('addcontract')">提交</el-button>
                    <el-button @click="resetForm('addcontract')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data(){
        return{
             addcontract:{
                 projectCode:'',
                 corpCode:'',
                 corpName:'',
                 corpType:'',
                 pmIDCardType:'',
             },
            contractType:[],
            IDtypeoption:[],
            projoption:[],
            props: {
                type: 'subid',
                label: 'subtype',
            },
            rule:{
                projectCode:[
                    { required: true, message: '请输入项目编码', trigger: 'blur' },
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                ],
                corpCode:[
                    { required: true, message: '请输入组织机构代码', trigger: 'blur' },
                    {pattern:/[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/,message:'请输入正确格式编码'}
                ],
                corpName:[
                    { required: true, message: '企业名称', trigger: 'blur' },
                ],
                corpType:[
                    { required: true, message: '请选择参建类型', trigger: 'change' },
                ],
            },
            newId:'',
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.newId==0){
                        console.log('我是新增页面')
                        this.$http.get('/api/prj_sub/sub_insert_info',{params:this.addcontract}).then(res=>{
                            console.log(res);
                            if(res.data.result='success'){
                                this.$router.push({path:'/project/contractors'});
                            }
                        });
                    }else{
                        console.log('我是编辑页面');
                        let data={
                            projectCode:this.addcontract.projectCode,
                            corpCode:this.addcontract.corpCode,
                            corpName:this.addcontract.corpName,
                            corpType:this.addcontract.corpType,
                            subId:this.newId
                        }
                        this.$http.get('/api/prj_sub/sub_update_info',{params:data}).then(res=>{
                            console.log(res);
                            if(res.data.result='success'){
                                this.$router.push({path:'/project/contractors'});
                            }
                        })
                    }
                } else {
                    alert('error submit!!');
                    return false;
                }
            });
        },
        resetForm(){},
        getall(){
            this.$http.get('/api/dict/sub_type').then(res=>{
                this.contractType=res.data;
                console.log(res.data);
            });
        },
        // 分包项目 projoption
        prodata(){
            this.$http.get('/api/sub_prj/selectBy').then(res=>{
                console.log(res);
                this.projoption=res.data.list;
            })
        }
    },
    mounted(){
        this.getall()
        this.newId=this.$route.query.id;
        console.log(this.newId);
        if(this.newId!=0){
            this.$http.post('/api/prj_sub/sub_select_id?sub_id=' + this.newId).then(res=>{
                console.log(res);
                this.addcontract=res.data.list[0];
            })
        };
        this.$http.get('/api/dict/id_type').then(res=>{
            console.log(res)
        })
        
    }
}
</script>

<style lang="scss">
.addcontract{
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
    .addcontract .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>