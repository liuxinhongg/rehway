<template>
    <div class="formaddedit">
        <el-form :model="formdoIt" label-width="80px" ref="formdoIt" :rules="formDo">
            <el-form-item label="名称：" prop="formname">
                <el-input v-model="formdoIt.formname" placeholder="请输入名称" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-select v-model="formdoIt.sort" style="width:280px">
                    <el-option v-for="item in sortchoose" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：" prop="remark" >
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formdoIt.remark" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submitForm('formdoIt')" type="primary">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formdoIt:{
                formname:'',
                sort:'',
                remark:'',
            },
            formDo:{
                formname:[ { required: true, message: '请输入表单名称', trigger: 'blur' } ],
                sort:[ { required: true, message: '请选择排序顺序', trigger: 'change' } ],
                remark:[ { required: true, message: '请填写备注', trigger: 'blur' } ],
            },
            sortchoose:[
                {value:'01',label:'升序'},
                {value:'02',label:'倒序'},
            ]
        }
    },
    methods:{
        submitForm(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
        },
        cancel(){

        }
    }
}
</script>

<style lang="scss">
.formaddedit{
    width: 95%;
    margin: 20px auto;
}
</style>
