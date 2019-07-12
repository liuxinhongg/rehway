/*  ********************************************
 * @function: 人员上报
 * @Author: 谢莹 
 * @Date: 2019-03-08 10:44:13 
 ********************************************  */
<template>
  <div class="appear">
    <el-scrollbar style="height:100%;">
      <el-form :model="formLabelAlign" ref="formLabelAlign" label-width="140px"
        class="demo-formLabelAlign" style="width:50%;">
        <el-form-item label="身份证正面照："  prop="name">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="frontImg" :src="frontImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="头像"  prop="name">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="reverseImg" :src="reverseImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script >
export default {
  components: {
    // top,
    // left
  },
  props: {},
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      formLabelAlign: {},
      // imageUrl: '',
      frontImg:'/api/user/user-photoz-info?id=52',
      reverseImg:'/api/user/user-photof-info?id=51',
      normalImg:'/api/user/user-get-photo?id=51'
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitForm(){},
    resetForm(){
      this.$router.push({path:'/project/list'})
    }
  },
  created() {},
  mounted() {
    // this.$http.get('/api/user/user-photoz-info',{params:{id:51}}).then(res=>{
    //   console.log(res);
    //   this.frontImg=res.data;
    // })
  }
};
</script>
<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
