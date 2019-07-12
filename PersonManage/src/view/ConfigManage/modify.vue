/*********************************************
 * @function: 项目主体
 * @Author: 刘新红 
 * @Date: 2019-03-013
 *********************************************/
<template>
  <div>
    <div class="modifymain">
      <el-scrollbar style="height:100%;" wrapStyle="overflow: auto;overflow-x:hidden">
        <div class="doTop">
          <div class="uploadImg">
            <el-upload
              class="avatar-uploader"
              v-if="is_edit"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit="1"
            >重传</el-upload>
            <img
              src="../../assets/images/userImg.jpg"
              alt
              class="avatar"
              style="width: 146px;height: 146px; position:absolute; top: 1px;left: 1px;border-radius: 5px;"
            >
          </div>
          <div class="topBtn">
            <p class="sureBtn" v-if="is_edit" @click="onSubmit">确定</p>
            <p class="modifyBtn" v-if="!is_edit" @click="modifyBtn()">修改</p>
          </div>
        </div>
        <el-form ref="form" :model="modifyform" label-width="100px">
          <el-form-item label="昵称：">
            <el-input v-model="modifyform.nickname" v-if="is_edit" style="width:180px"></el-input>
            <span v-if="!is_edit">刘新红</span>
          </el-form-item>
          <el-form-item label="签名：">
            <el-input
              v-if="is_edit"
              v-model="modifyform.autograph"
              :maxlength="32"
              placeholder="字数控制在20个之间"
              style="width:48%;"
            ></el-input>
            <span v-if="!is_edit">这个人很懒，什么也没有写</span>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-if="is_edit" v-model="modifyform.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0" checked>女</el-radio>
            </el-radio-group>
            <span v-if="!is_edit">{{modifyform.sex == 0 ? '女':'男'}}</span>
          </el-form-item>
          <el-form-item label="账号密码：">
            <el-input
              type="password"
              v-model="modifyform.pass"
              v-if="is_edit"
              style="width:180px"
              disabled="true"
            ></el-input>
            <el-button v-if="is_edit" @click="modifypass">修改密码</el-button>
            <span v-if="!is_edit">******</span>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-if="is_edit" v-model="modifyform.phone" style="width:180px;"></el-input>
            <span v-if="!is_edit">18725789547</span>
          </el-form-item>
          <el-form-item label="QQ：">
            <el-input v-if="is_edit" v-model="modifyform.qq" style="width:180px"></el-input>
            <span v-if="!is_edit">{{modifyform.qq?modifyform.qq:'暂未填写'}}</span>
          </el-form-item>
          <el-form-item label="微信：">
            <el-input v-if="is_edit" v-model="modifyform.wechat" style="width:180px"></el-input>
            <span v-if="!is_edit">{{modifyform.wechat ? modifyform.wechat:'暂未填写'}}</span>
          </el-form-item>
          <el-form-item label="所在地：">
            <span v-if="!is_edit">{{modifyform.province}}</span>
            <div v-if="is_edit">
              <el-select v-model="modifyform.province" placeholder="请选择所在地">
                <el-option
                  v-for="(item,index) in province"
                  :value="item.id"
                  :label="item.title"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-if="is_edit" v-model="modifyform.address" style="width:49.5%;"></el-input>
            <span v-if="!is_edit">I都会</span>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <el-dialog :visible.sync="passVisible" center width="30%">
        <el-form :model="passform" style="width:58%;margin:auto;" label-width="100px">
          <el-form-item label="旧密码" :label-width="formLabelWidth">
            <el-input
              v-model="passform.oldpass"
              type="password"
              autocomplete="off"
              style="width:200px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input
              v-model="passform.newpass"
              type="password"
              autocomplete="off"
              style="width:200px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth">
            <el-input
              v-model="passform.renewpass"
              type="password"
              autocomplete="off"
              style="width:200px;"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="passVisible = false">取 消</el-button>
          <el-button type="primary" @click="surepass">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import top from "@/components/common/HeadTop";
import left from "@/components/common/IndexLeft";
export default {
  components: {
    top,
    left
  },
  data() {
    return {
      Didshow: true,
      is_edit: false,
      dialogImageUrl: "",
      dialogVisible: true,
      passVisible: false,
      passform: {
        oldpass: "",
        newpass: "",
        renewpass: ""
      },
      modifyform: {
        nickname: "",
        autograph: "",
        phone: "",
        pass: "******",
        sex: "女",
        qq: "",
        wechat: "",
        address: "",
        province: "",
        city: "",
        area: ""
      },
      cities: [],
      province: [],
      area: [],
      uploadData: {}
    };
  },
  mounted() {
    //   this.roleType=this.$route.query.role;
    //   console.log(this.roleType);
  },
  computed: {},
  methods: {
    // 修改密码
    surepass() {
      if (this.passform.oldpass == "" || this.passform.oldpass == null) {
        this.$message.error("请输入正确的旧密码");
      } else if (this.passform.newpass == "" || this.passform.newpass == null) {
        this.$message.error("请输入正确的新密码");
      } else if (this.passform.newpass == "" || this.passform.newpass == null) {
        this.$message.error("请再次正确的新密码");
      } else if (this.passform.newpass !== this.passform.newpass) {
        this.$message.error("确认密码和新密码不一致，请重新输入");
      } else {
        this.passVisible = false;
      }
    },
    onSubmit() {
      if (this.modifyform.nickname == "" || this.modifyform.nickname == null) {
        this.$message.error("昵称不能为空~");
      } else if (this.modifyform.phone == "" || this.modifyform.phone == null) {
        this.$message.error("手机号码不能为空~");
      } else if (
        this.modifyform.address == "" ||
        this.modifyform.address == null
      ) {
        this.$message.error("地址不能为空~");
      } else {
        this.is_edit = false;
      }
    },
    modifypass() {
      this.passVisible = true;
    },
    modifyBtn() {
      this.is_edit = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss">
.modifymain {
  flex: 1;
  width: 95%;
  margin: 20px auto;
  // background: pink;
  height: calc(100vh - 110px);
  .doTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .uploadImg {
      width: 230px;
      height: 175px;
      // background: pink;
      position: relative;
      .avatar-uploader {
        height: 175px;
        .el-upload-list--picture-card .el-upload-list__item {
          position: absolute;
          z-index: 22;
        }
        .avatar {
          width: 120px;
          height: 120px;
          display: block;
          position: absolute;
          top: 0;
        }
        .el-upload--picture-card {
          position: absolute;
          z-index: 100;
          width: 60px;
          height: 30px;
          background: #415b76;
          color: #fff;
          text-align: center;
          line-height: 30px;
          border-radius: 5px;
          font-size: 12px;
          right: 0px;
          top: 50px;
          border: none;
        }
      }
      input[type="file"] {
        display: none;
      }
    }
    .topBtn {
      width: 100px;
      .sureBtn {
        background: rgb(64, 158, 255);
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
      }
      .modifyBtn {
        background: rgb(151, 151, 151);
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>

