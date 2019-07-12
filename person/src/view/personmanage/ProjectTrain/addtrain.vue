<template>
    <div class="addcompany">
        <p class="toptext">项目培训列</p>
        <el-scrollbar style="height:100%;">
            <el-form :model="addtrain" ref="addtrain" label-width="165px" :rules="rule" style="width:50%;">
                <el-form-item label="接入编号：" prop="code" >
                    <el-input v-model="addtrain.code"></el-input>
                </el-form-item>
                <el-form-item label="主讲者：" prop="issuer">
                    <el-input v-model="addtrain.issuer" placeholder="主讲者"></el-input>
                </el-form-item>
                <el-form-item label="培训日期：" prop="trainDate" >
                    <el-date-picker v-model="addtrain.trainDate" type="datetime" placeholder="培训日期" style="width:100%"></el-date-picker>
                    <!-- <el-date-picker v-model="addtrain.trainDate" type="datetime" placeholder="培训日期" style="width:100%"></el-date-picker> -->
                </el-form-item>
                <el-form-item label="培训时长：" prop="trainTime">
                    <el-input v-model="addtrain.trainTime" placeholder="培训时长"></el-input>
                </el-form-item>
                <el-form-item label="培训类型：" prop="trainType">
                    <el-select v-model="addtrain.trainType" style="width:100%;">
                    <el-option
                        :label="item.type"
                        :value="item.code"
                        :key="index"
                        v-for="(item,index) in trainoption"
                    ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="培训名称1：" prop="trainName">
                    <el-input v-model="addtrain.trainName" placeholder="培训名称"></el-input>
                </el-form-item>
                <el-form-item label="培训地点：" prop="address">
                    <el-input v-model="addtrain.address"></el-input>
                </el-form-item>
                <el-form-item label="培训人数：" prop="number">
                    <el-input v-model="addtrain.number"></el-input>
                </el-form-item>
                <el-form-item label="附件：" prop="filepath">
                    <el-upload class="upload-demo" action=" " :http-request="handleChange">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item style="">
                    <el-button type="primary" @click="submitForm('addtrain')">提交</el-button>
                    <el-button @click="resetForm()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>
<script>
import * as personmanage from '@/api/personmanage'
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
            addtrain:{
                code:'',
                trainDate:'',
                trainTime:'',
                trainType:'',
                issuer:'',
                address:'',
                number:'',
                id:'',
                trainName:'',
                filepath:'',
                newsform:new FormData()
            },
            getId:0,
            trainoption:[],
            rule:{
                code:[
                    { required: true, message: '接入编号', trigger: 'blur' },
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                ],
                issuer:[
                    { required: true, message: '接入讲师', trigger: 'blur' },
                ],
                trainDate:[
                    { required: true, message: '培训日期', trigger: 'blur' },
                ],
                address:[
                    { required: true, message: '请输入培训地点', trigger: 'blur' },
                ],
                number:[
                    { required: true, message: '请输入培训人数', trigger: 'blur' },
                ],
                trainTime:[
                    { required: true, message: '培训时长', trigger: 'blur' },
                ],
                trainName:[
                    { required: true, message: '培训名称', trigger: 'blur' },
                ],
                trainType:[
                    { required: true, message: '培训类型代码', trigger: 'blur' },
                ],
             }
        }
    },
    methods:{
        handleChange(param){
            console.log(param.file);
            // this.addtrain.filepath=param.file;
            this.newsform.append('filepaths',param.file)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // let newsform = new FormData();
                        this.newsform.append('code',this.addtrain.code),
                        this.newsform.append('trainDate',this.addtrain.trainDate),
                        this.newsform.append('trainTime',this.addtrain.trainTime),
                        this.newsform.append('trainType',this.addtrain.trainType),
                        this.newsform.append('issuer',this.addtrain.issuer),
                        this.newsform.append('address',this.addtrain.address),
                        this.newsform.append('number',this.addtrain.number),
                        this.newsform.append('trainName',this.addtrain.trainName);
                        // this.newsform.append('filepaths',this.addtrain.filepath);
                    if(this.getId==0){
                        this.$http.post(personmanage.addtrain,this.newsform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                            console.log(res);
                            if(res.data.result='success'){
                                this.$message.success('新增培训成功');
                                // this.$router.push('/project/projecttrain')
                            }else{
                                this.$message.error('新增培训失败');
                            }
                        })
                    }else{
                        this.newsform.append('id',this.addtrain.id);
                        this.$message.warning('请重新选择时间~');
                        this.$http.post(personmanage.edittrain,this.newsform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                            console.log(res);
                            if(res.data.result='success'){
                                this.$router.push('/project/projecttrain')
                            }else{
                                this.$message.error('编辑失败');
                            }
                        })
                    }
                } else {
                    alert('error submit!!');
                    return false;
                }
            });
        },
        resetForm(){
            this.$router.push('/project/projecttrain')
        }
    },
    mounted(){
        this.getId=this.$route.query.id;
        console.log(this.getId)
        if(this.getId!=0){
            this.$http.get(personmanage.editformer,{params:{id:this.getId}}).then(res=>{
                console.log(res);
                this.addtrain=res.data.result;
                let dateTime =res.data.result.trainDate;
                this.addtrain.trainDate=formatDate(dateTime,'yyyy-MM-dd hh:mm:ss');
                console.log(this.addtrain.trainDate)
            })
        }

        this.$http.get(personmanage.traindict).then(res=>{
            // console.log(res);
            this.trainoption=res.data;
        })
    }
}
</script>

<style lang="scss">
.addcompany{
    width: 100%;
    margin: 20px auto;
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
    .addcompany .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>