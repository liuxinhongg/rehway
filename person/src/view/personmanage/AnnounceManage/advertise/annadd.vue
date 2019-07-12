<template>
  <div class="annadd">
    <p class="toptext">发布公告</p>
    <el-scrollbar style="height:100%;overflow-x: hidden;">
      <div class="annbox">
        <el-form ref="newsaddform" :model="newsaddform" :rules="annaddrules" @submit.native.prevent>
          <table border="1" class="tableinsert" style="width:95%;">
          <tr>
              <td class="tdleft">发布人：</td>
              <td> 
                <el-form-item prop="issuer">
                  <el-input v-model.trim="newsaddform.issuer" style="width:280px;" placeholder="请输入发布人"></el-input>
                </el-form-item>
              </td>
              <td class="tdleft">标题：</td>
              <td> 
                <el-form-item prop="title">
                  <el-input v-model.trim="newsaddform.title" style="width:280px;" placeholder="请输入标题"></el-input>
                </el-form-item>
              </td>
          </tr>
          <tr>
            <td class="tdleft">发布时间：</td>
            <td> 
              <el-form-item prop="starttime">
                <el-date-picker v-model="newsaddform.starttime" style="width:280px;" type="datetime" placeholder="选择日期时间"></el-date-picker>                
              </el-form-item>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="tdleft">附件：</td>
            <td colspan="3"> 
              <el-form-item prop="filepath">
                <el-upload class="upload-demo" action=" " :http-request="handleChange" :file-list="fileList"  >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="tdleft">内容：</td>
            <td colspan="3"> 
              <el-form-item prop="content">
                <el-input v-model.trim="newsaddform.content" type="textarea" :rows="3" maxlength="300"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
          <!-- <el-form-item label="发布人：" prop="issuer">
            <el-input v-model="newsaddform.issuer"></el-input>
          </el-form-item>
          <el-form-item label="标题：" prop="title">
            <el-input v-model="newsaddform.title"></el-input>
          </el-form-item>
          <el-form-item label="内容：" prop="content">
            <quill-editor v-model="newsaddform.content" ref="myQuillEditor" :options="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
          </el-form-item>
          <el-form-item label="发布时间：" style="margin-top:80px;" prop="starttime">
            <el-date-picker v-model="newsaddform.starttime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="附件：" prop="filepath">
            <el-upload class="upload-demo" action=" " :http-request="handleChange" :file-list="fileList"  >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item> -->
          <el-form-item style="text-align:center;">
            <el-button type="primary" native-type="submit" @click="onSubmit('newsaddform')">保存</el-button>
            <el-button><router-link to="/project/announcemanage">返回</router-link></el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import * as personmanage from '@/api/personmanage'
export default {
  components: { quillEditor },
  data() {
    return {
        editorOption:{},
        newsaddform: {
          content:'',
          issuer:"",
          title: "",
          starttime:'',
          filepath:'',
        },
        annaddrules: {
          issuer: [
            {required: true, message: '请输入发布人', trigger: 'blur'},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/,message:'发布人长度不能超过10位，支持中英文'}
          ],
          content: [
            {required: true, message: '请输入详细内容', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,30}$/,message:'标题长度不能超过30位'}
          ],
          starttime: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ],
        },
        fileList: []
    };
  },
  watch: {},
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    // 编辑器
    onEditorReady(evevt){
      console.log(evevt);
    },
    handleChange(param) {
      this.newsaddform.filepath=param.file;
    },
    onSubmit(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            var form=new FormData();
            let newsform = new FormData();
            newsform.append('details',this.newsaddform.content),
            newsform.append('title',this.newsaddform.title),
            newsform.append('issuer',this.newsaddform.issuer),
            newsform.append('date',this.newsaddform.starttime),
            newsform.append('filepaths',this.newsaddform.filepath),
            this.$http.post(personmanage.addnotice,newsform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
              console.log(res);
              if(res.data.result="success"){
                this.$router.push('/project/announcemanage');
              }else if(res.data.result="error"){
                this.$message.error('添加信息失败');
              }else{
                this.$message.error('新闻标题已存在');
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.annadd {
  width: 100%;
  height:calc(100vh - 90px);
  .annbox{
    width: 80%;
    margin: 20px auto;
  }
}
.avatar-uploader .el-upload {
  border: 1px solid #aaa;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
<style>
.quill-editor{
    height: 250px;
}
.annadd .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
