<template>
  <div class="addcompany">
    <el-scrollbar style="height:100%;">
      <el-form :model="addinfo" ref="addinfo" label-width="165px" :rules="rule">
                <el-form-item label="组织机构代码：" prop="corpCode">
                    <el-input v-model="addinfo.corpCode" placeholder="组织机构代码" class="itemadd"></el-input>
                </el-form-item>
                <el-form-item label="企业名称：" prop="corpName" >
                    <el-input v-model="addinfo.corpName" class="itemadd" placeholder="企业名称"></el-input>
                </el-form-item>
                <el-form-item label="企业注册地区编码：" prop="areaCode">
                    <el-cascader :options="areaCodeoption" v-model="addinfo.areaCode" @change="handleItemChange"  class="itemadd" :props="props"></el-cascader>
                </el-form-item>
                <el-form-item style="">
                    <el-button type="primary" @click="submitForm('addinfo')">提交</el-button>
                    <el-button @click="resetForm()">返回</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data(){
        return{
             addinfo:{
                 areaCode:[],
                 corpName:'',
                 corpCode:'',
                 corpType:'',
             },
             props: {
                value: 'code',
                label: 'name',
                children: 'child'
            },
             rule:{
                corpName:[
                    { required: true, message: '请输入企业名称', trigger: 'blur' },
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                ],
                corpCode:[
                    { required: true, message: '请输入组织机构代码', trigger: 'blur' },
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                ],
                areaCode:[
                    { required: true, message: '请选择企业注册地区编码', trigger: 'change' },
                ],
             },
             areaCodeoption:[],
             NewId:''
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                var that=this;
                if (valid) {
                    if(that.NewId==1){
                        // var that=this;
                        let data={
                            corpCode:that.addinfo.corpCode,
                            corpName:that.addinfo.corpName,
                            areaCode:that.addinfo.areaCode[2],
                            entId:this.NewId
                        }
                        that.$http.get('/api/ent/ent_insert_info',{params:data}).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                            that.$router.push({path:'/project/company'});
                            }
                        })
                    }else{
                        console.log("我是编辑哦~");
                        let data={
                            corpCode:that.addinfo.corpCode,
                            corpName:that.addinfo.corpName,
                            areaCode:that.addinfo.areaCode[2],
                            entId:this.NewId
                        }
                        that.$http.get('/api/ent/ent_update_info',{params:data}).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                that.$router.push({path:'/project/company'});
                            }
                        })
                    }
                    
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$router.push({path:'/project/company'})
        },
        handleItemChange(val) {
            this.addinfo.areaCode=val;
            console.log(this.addinfo.areaCode[2]);
        }
    },
  mounted() {
    //   行政区的三级联动接口
    this.$http.post("/api/dict/regioncode_level").then(res => {
      console.log(res);
      this.areaCodeoption = res.data;
    });
    this.NewId=this.$route.query.id;
        // console.log(this.NewId);
    if(this.NewId==0){
    // 编辑带着数据的接口
        this.$http.post('/api/ent/ent_select_forupdate?entId='+this.NewId).then(res=>{
            console.log(res);
            this.addinfo=res.data;
        })
    }
    
  }
  
};
</script>

<style lang="scss">
.addcompany {
  width: 95%;
  margin: 20px auto;
  height: calc(100vh - 85px);
  .el-collapse-item__header {
    font-weight: bold;
    font-size: 14px;
  }
  .itemadd {
    width: 280px;
  }
}
</style>
<style >
.addcompany .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>