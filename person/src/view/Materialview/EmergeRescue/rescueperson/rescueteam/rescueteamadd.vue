<template>
    <div class="resucetabuild">
        <el-scrollbar style="height:100%;">    
            <el-form :model="resuetaform" :rules="useryz" @submit.native.prevent  ref="resuetaform">
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft">救援人员：</td>
                        <td>
                            <el-form-item prop="workid">
                              <el-select v-model="resuetaform.workid" style="width:280px">
                                  <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                  </el-option>
                              </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">职务：</td>
                        <td>
                            <el-form-item prop="duty">
                                <el-input v-model="resuetaform.duty" style="width:280px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">备注：</td>
                        <td colspan="3">
                            <el-form-item prop="remark">
                                <el-input v-model="resuetaform.remark" type="textarea" :rows="4" ></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-button type="primary" native-type="submit" @click="educateForm('resuetaform')">提交</el-button>
                        </td>
                        <td colspan="2">
                            <el-button @click="backForm('resuetaform')">返回</el-button>
                        </td>
                    </tr>
                </table>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    data(){
        return{
            personoption:[],
            resuetaform:{
              groupId:0,
              workid:'',
              duty:'',
              remark:'',
            },
            useryz:{
                workid:[{required: true,message: "请选择上传员工",trigger: "change"}],
                duty:[{required: true,message: "请输入标题",trigger: "blur"}],
            },
            eduId:0,
        }
        
    },
    methods:{
        educateForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                  let rescteamform=new FormData();
                  rescteamform.append('workid',this.resuetaform.workid)
                  rescteamform.append('duty',this.resuetaform.duty)
                  rescteamform.append('remark',this.resuetaform.remark)
                  rescteamform.append('groupId',this.resuetaform.groupId)
                  if(this.eduId==0){
                    this.$http.post('/api/security/insert',rescteamform).then(res=>{
                      console.log(res);
                      if(res.data.result=='success'){
                        this.$message.success('添加成功~');
                        this.$router.push('/saftmanage/rescueteam');
                      }else if(res.data.result=='error'){
                        this.$message.error('添加失败');
                      }
                    })
                  }else{
                    rescteamform.append('id',this.eduId);
                    this.$http.post('/api/security/update',rescteamform).then(res=>{
                      console.log(res);
                      if(res.data.result=='success'){
                        this.$message.success('添加成功~');
                        this.$router.push('/saftmanage/rescueteam');
                      }else if(res.data.result=='error'){
                        this.$message.error('添加失败');
                      }
                    })
                  }
                } else {
                  console.log('error submit!!');
                  return false;
                }
            });
        },
        returncancle(){
            this.$router.push({path:'/saftmanage/rescueteam'});
        },
        // 上传人员
        uploadperson(){
            this.$http.get('/api/user/user_select').then(res=>{
                this.personoption=res.data.list;
            })
        },
       
    },
    mounted(){
        this.uploadperson();
        this.eduId=this.$route.query.id;
        if(this.eduId!=0){
          this.$http.post('/api/security/selectBy?workId='+this.eduId).then(res=>{
              console.log(res);
              this.resuetaform=res.data.list[0];
          })
            console.log('编辑前请求的数据');
        }
    }
}
</script>

<style>
.resucetabuild{
    height:calc(100vh - 80px);
}
.resucetabuild .el-scrollbar__wrap{
    overflow-x: hidden;
}
</style>
