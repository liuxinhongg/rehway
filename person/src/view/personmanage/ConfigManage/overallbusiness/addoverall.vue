<template>
    <div class="addoverall">
        <el-scrollbar style="height:100%;">
            <el-form :model="addtrain" ref="addtrain" label-width="165px" :rules="rule" style="width:50%;">
                <el-form-item label="编号：" prop="projectCode" >
                    <el-input v-model="addtrain.projectCode"></el-input>
                </el-form-item>
                <el-form-item label="日期：" prop="trainingDate" >
                    <el-date-picker v-model="addtrain.trainingDate" type="date" placeholder="培训日期" style="width:100%"></el-date-picker>
                </el-form-item>
                <el-form-item label="项目名称：" prop="rainingName">
                    <el-input v-model="addtrain.rainingName" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="组织机构代码：" prop="trainingTypeCode">
                    <el-input v-model="addtrain.trainingTypeCode" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="法定人：" prop="name">
                    <el-input v-model="addtrain.name" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" prop="idcard">
                    <el-input v-model="addtrain.idcard" placeholder="身份证号"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：" prop="phone">
                    <el-input v-model="addtrain.phone" placeholder="联系方式"></el-input>
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
             addtrain:{
                 projectCode:'',
                 trainingDate:'',
                 companynature:'',
                 decimal:'',
                 trainingTypeCode:'',
             },
              trainType:[
                {label:'安全教育',type:'one'},
                {label:'入场教育',type:'two'},
                {label:'退场教育',type:'three'},
                {label:'技能培训',type:'four'},
            ],
             ChooseType:[
                 {label:'居民身份证',code:'01'},
                 {label:'军官证',code:'02'},
                 {label:'武警警官证',code:'03'},
                 {label:'士兵证',code:'04'},
                 {label:'军队离退休干部证',code:'05'},
                 {label:'残疾人证',code:'06'},
                 {label:'护照',code:'07'},
                 {label:'港澳同胞回乡证',code:'08'},
                 {label:'外交官证',code:'09'},
             ],
             rule:{
                projectCode:[
                    { required: true, message: '接入编号', trigger: 'blur' },
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                ],
                trainingDate:[
                    { required: true, message: '培训日期', trigger: 'blur' },
                ],
                companynature:[
                    { required: true, message: '请选择企业性质', trigger: 'blur' },
                ],
                decimal:[
                    { required: true, message: '培训时长', trigger: 'blur' },
                ],
                rainingName:[
                    { required: true, message: '培训名称', trigger: 'blur' },
                ],
                trainingTypeCode:[
                    { required: true, message: '培训类型代码', trigger: 'blur' },
                ],
             }
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    alert('error submit!!');
                    return false;
                }
            });
        },
        resetForm(){}
    }
}
</script>

<style lang="scss">
.addoverall{
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
.addoverall .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>