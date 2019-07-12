<template>
  <div class="annadd">
    <el-scrollbar style="height:100%;overflow-x: hidden;">
      <div class="annbox">
        <el-form ref="newsaddform" :model="newsaddform" label-width="120px" :rules="annaddrules" @submit.native.prevent>
          <el-form-item label="发布人：" prop="issuer">
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
            <el-upload class="upload-demo" action=" " :http-request="handleChange" :file-list="fileList" 
            >
            <!-- accept="application/pdf application/zip" -->
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <span style="margin:0 5px;">请上传pdf格式文件</span> -->
            </el-upload>
          </el-form-item>
          <el-form-item>
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
            {required: true, message: '请输入公告', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入详细内容', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
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
            newsform.append('filepath',this.newsaddform.filepath),
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
