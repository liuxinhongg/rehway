<template>
  <div class="wrapper" style="height:100%;">
    <div style="height:100%;width:90%;margin:0 auto;">
      <el-scrollbar style="height:100%;overflow-x: hidden;">
        <el-form ref="form" :model="form" label-width="140px" :rules="rules"  @submit.native.prevent>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item>
              <template slot="title">
                <i class="el-icon-menu"></i>
                &nbsp; 基本信息
              </template>
              <el-form-item label="工人姓名1" required>
                <el-input v-model="form.workerName" class="formInput"></el-input>
              </el-form-item>
              <el-form-item label="性别" required>
                <el-select v-model="form.gender" placeholder="请选性别" class="formInput">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期" required>
                <el-date-picker
                  class="formInput"
                  required
                  type="date"
                  placeholder="选择日期"
                  v-model="form.birthday"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="证件号码" required>
                <el-input v-model="form.idCardNumber" class="formInput"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" required>
                <el-input v-model="form.cellPhone" class="formInput"></el-input>
              </el-form-item>

              <el-form-item label="民族" required>
                <el-input v-model="form.nation" class="formInput"></el-input>
              </el-form-item>
              <el-form-item label="住址" required>
                <el-input v-model="form.address" class="formInput"></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <i class="el-icon-menu"></i>
                &nbsp; 详细信息
              </template>
              <el-form-item label="籍贯">
                <el-cascader
                  :options="sjhq"
                  v-model="form.birthPlaceCode"
                  @change="handleItemChange"
                  :props="props"
                  style="width:280px;"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="证件类型" required>
                <el-select v-model="form.idCardType" class="formInput">
                  <el-option
                    v-for="(item,index) in categoryType"
                    :key="index"
                    :label="item.idcard"
                    :value="item.idcardtype"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="政治面貌" required>
                <el-select v-model="form.politicstype" class="formInput">
                  <el-option
                    v-for="item in politicsd"
                    :key="item.index"
                    :label="item.politics"
                    :value="item.politicstype"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文化程度" prop="cultureLevelType" required>
                <!-- <el-input name="cultureLevelType"></el-input> -->
                <el-select v-model="form.cultureLevelType" class="formInput">
                  <el-option
                    v-for="(item,index) in cultureLevel"
                    :key="index"
                    :label="item.cultureleve"
                    :value="item.cultureleveltype"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" required>
                <el-input v-model="form.stateType" class="formInput"></el-input>
              </el-form-item>
              <el-form-item label="是否班长" required>
                <el-select v-model="form.isTeamLeader" placeholder="请选是否" class="formInput">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="当前工种" required>
                <el-select v-model="form.workType" class="formInput">
                  <el-option
                    v-for="(item,index) in workT"
                    :key="index"
                    :label="item.worker"
                    :value="item.workertype"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工人类型" required>
                <el-select v-model="form.workRole" placeholder="请选工人类型" class="formInput">
                  <el-option label="管理人员" value="10"></el-option>
                  <el-option label="建筑工人" value="20"></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <i class="el-icon-menu"></i>
                &nbsp; 内部信息
              </template>
              <el-form-item label="有效证件发证机关" required>
                <el-input v-model="form.grantOrg" class="formInput"></el-input>
              </el-form-item>
              <el-form-item label="是否加入公会">
                <el-select v-model="form.isJoined" placeholder="请选是否" class="formInput">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='加入公会时间' required>
                <el-date-picker
                  class="formInput"
                  required
                  type="date"
                  placeholder="选择日期"
                  v-model="form.joinedTime"
                ></el-date-picker>
              </el-form-item>
              <!-- <el-form-item label="头像资源地址" required>
                <el-input v-model="form.headImageUrl" class="formInput"></el-input>
              </el-form-item>-->
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <i class="el-icon-menu"></i>
                &nbsp; 图片信息
              </template>
              <div style="margin:10px 20px;">
                <el-button @click="show(0)">本地头像</el-button>
                <el-button @click="show(1)">人脸识别</el-button>
                <el-button @click="show(2)">摄像头</el-button>
              </div>
              <br>
              <el-form-item label="本地选头像" class="photo" style="width:20%" v-if="showhidden==0">
                <el-upload
                  accept=".jpg, .jpeg, .png"
                  action
                  :on-change="getFile"
                  :limit="1"
                  list-type="picture"
                  :auto-upload="false"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" id="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="人脸识别" class="photo" style="width:20%" v-if="showhidden==1">
                <!-- <el-input v-model="form.headImage"></el-input>  -->
                <el-button>开启人脸识别机</el-button>
              </el-form-item>
              <el-form-item label="摄像头" class="photo" style="width:50%" v-if="showhidden==2">
                <el-button onclick="getMedia()">开启摄像头</el-button>
                <el-button id="snap" onclick="takePhoto()" action @click="pic(2)">拍照</el-button>
                <br>
                <video id="video" width="250px" height="250px" autoplay="autoplay"></video>
                <canvas id="canvas" width="250px" height="250px"></canvas>
                <div id="pic" v-show="false">
                  <img src id="picimages">
                </div>
              </el-form-item>
              <br>
            </el-collapse-item>
          </el-collapse>
          <el-form-item style="margin-top:20px;">
            <el-button @click="onSubmit" >保存</el-button>
            <router-link to="/project/accountlist">
              <el-button style="border:none">返回</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
  </div>
</template>

<script >
export default {
  components: {},
  data() {
    return {
      sjhq: [],
      showhidden: 0,
      xb: [],
      activeName: "1",
      imageUrl: "",
      categoryType: [],
      zjlx: [],
      form: {
        gender:'',
        workerName: "",
        birthday: "",
        birthPlaceCode: [],
        ImageUrl: "",
        isJoined: "",
        idCardType: "",
        idCardNumber: "",
        nation: "",
        address: "",
        politicstype: "",
        cellPhone: "",
        cultureLevelType: "",
        grantOrg: "",
        stateType: "",
        isTeamLeader: "",
        workType: "",
        workRole: "",
        joinedTime:''
      },
      headImage: "",
      politicsd: [],
      cultureLevel: [],
      workT: [],
      workR: [],
      value: "",
      GetId: "",
      props: {
        value: "code",
        label: "name",
        children: "child"
      },
       rules: {
          idCardNumber: [
            // { required: true, message: '请输入身份证号', trigger: 'blur' },
            // { min: 16, max: 16, message: '长度在16字符', trigger: 'blur' }
          ],
        }
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleItemChange(val) {
      // console.log(val);
      this.form.birthPlaceCode = val;
      // console.log(this.form.birthPlaceCode[2]);
    },
    show(n) {
      this.showhidden = n;
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    pic(a) {
      let img = document.querySelector("#picimages");
      console.log(img.src);
      this.form.ImageUrl = img.src;
      console.log(img.src)
    },
    getFile(file, fileList) {
      this.getBase64(file.raw).then(res => {
        console.log(res);
        this.form.ImageUrl = res;
      });
    },
    onSubmit() {
      let data = {
        workerName: this.form.workerName,
        birTime: this.form.birthday.getTime(),
        birthPlaceCode: this.form.birthPlaceCode[2],
        headImagePhoto: this.form.ImageUrl,
        isJoined: this.form.isJoined,
        joinedTime:this.form.joinedTime.getTime(),
        idCardType: this.form.idCardType,
        idCardNumber: this.form.idCardNumber,
        nation: this.form.nation,
        address: this.form.address,
        politicsType: this.form.politicstype,
        cellPhone: this.form.cellPhone,
        cultureLevelType: this.form.cultureLevelType,
        grantOrg: this.form.grantOrg,
        stateType: this.form.stateType,
        isTeamLeader: this.form.isTeamLeader,
        workType: this.form.workType,
        workRole: this.form.workRole,
        gender:this.form.gender
      };
      console.log(data);
      this.$http.get('/api/user/user_insert_info',{params:data}).then(res=>{
        console.log(res);
         if(res.data.result=='success'){
             this.$router.push("/project/accountlist");
          }else{
              alert('用户添加失败');
          }
      })

      // this.$http.get("/api/user/user_insert_info",{params:data})
      //   .then(res => {
      //     console.log(res);
      //     if(res.data.result=='success'){
      //        this.$router.push("/project/accountlist");
      //     }else{
      //         alert('用户添加失败');
      //     }
      //   });
    },
    categoryChange(val) {},
    politicsChange(val) {
      // console.log(val);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(file);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 < 500;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 500KB!");
      }
      return isLt2M;
    },
  },
  created() {
    
  },
  mounted() {
    // this.$http.get('/api/user/user_insert_info',{params:this.data}).then(res=>{
    //     console.log(res);
    // })
    let GetId = this.$route.query.id;
    this.$http.get("/api/dict/id_type").then(res => {
      this.categoryType = res.data;
    });
    this.$http.get("/api/dict/politics").then(res => {
      this.politicsd = res.data;
    });
    this.$http.get("/api/dict/culture").then(res => {
      this.cultureLevel = res.data;
    });
    this.$http.get("/api/dict/work_type").then(res => {
      this.workT = res.data;
    });
    // 行政区的三级联动接口
    this.$http.post("/api/dict/regioncode_level").then(res => {
      // console.log(res);
      this.sjhq = res.data;
      // console.log(this.sjhq);
    });
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  width: 100%;
  height: calc(100% - 20px);
}
.formInput {
  width: 280px;
}
.photo {
  float: left;
}
</style>
<style>

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
/* .avatar {
  width: 100px;
  height: 100px;
  display: block;
} */
.avatar-uploader-icon{
  border:1px dotted #8c939d;
}
.el-upload-list--picture .el-upload-list__item{
  border: none
}
</style>
<style>

</style>