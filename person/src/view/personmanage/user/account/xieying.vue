<template>
  <div class="wrapper" style="height:100%;">
    <div style="height:100%;width:90%;margin:0 auto;">
      <el-scrollbar style="height:100%;overflow-x: hidden">
        <el-form ref="form" :model="form" :rules="rules"  @submit.native.prevent style="margin-top:50px;" label-width="150px">
            <p class="persontop">xieying</p>
                    <div v-if="nextnumber == 1"  style="float:left;margin-right:50px">
                            <el-form-item required label="工人姓名">
                                <el-input v-model="form.workerName" style="width:280px" placeholder="工人姓名"></el-input>
                            </el-form-item>
                            <el-form-item required label="性别">
                                <el-select v-model="form.gender" placeholder="请选性别" style="width:280px">
                                <el-option label="男" value="0"></el-option>
                                <el-option label="女" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item required label="出生日期">
                                <el-date-picker  style="width:280px"   required  type="date"  placeholder="选择日期"  v-model="form.birthday"  ></el-date-picker>
                            </el-form-item>
                            <el-form-item required label="证件号码">
                                <el-input v-model="form.idCardNumber" type="number" style="width:280px"></el-input>
                            </el-form-item>
                            <el-form-item label="籍贯">
                                <el-cascader  :options="sjhq"  v-model="form.birthPlaceCode"   @change="handleItemChange"  :props="props"   style="width:280px;" ></el-cascader>
                            </el-form-item>
                            <el-form-item label="民族" required>
                                <el-input v-model="form.nation" style="width:280px"></el-input>
                            </el-form-item>
                             <el-form-item label="证件类型" required>
                                <el-select v-model="form.idCardType" style="width:280px">
                                    <el-option v-for="(item,index) in categoryType" :key="index" :label="item.idcard" :value="item.idcardtype" ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号码" required>
                                <el-input v-model="form.cellPhone" type="number" style="width:280px"></el-input>
                            </el-form-item>
                            <el-form-item label="是否有重大疾病历史" required>
                                <el-select v-model="form.hasBadMedicalHistory" placeholder="请选工人类型" style="width:280px">
                                <el-option label="是" value="0"></el-option>
                                <el-option label="否" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            
                            <el-form-item label="紧急联系人" required>
                                <el-input v-model="form.urgentLinkMan" style="width:280px"></el-input>
                            </el-form-item>
                            <el-form-item label="紧急联系人电话" required>
                                <el-input v-model="form.urgentLinkManPhone" style="width:280px"></el-input>
                            </el-form-item>
                            
                    </div>
                    <div v-if="nextnumber == 1" style="float:left">
                        <p class="inputright">请输入姓名</p>
                        <p class="inputright">请输入性别</p>
                        <p class="inputright">请选择出生日期</p>
                        <p class="inputright">请输入的证件号码</p>
                        <p class="inputright">请选择籍贯</p>
                        <p class="inputright">请输入民族</p>
                        <p class="inputright">请选择证件类型</p>
                        <p class="inputright">请输入手机号码</p>
                        <p class="inputright">请选择是否有重大疾病史</p>
                        <p class="inputright">请输入紧急联系人</p>
                        <p class="inputright">请输入紧急联系人电话</p>

                    </div>
                    <div v-if="nextnumber == 2" style="float:left;margin-right:50px">
                        
                            <el-form-item label="工资银行联号" required>
                                <el-input v-model="form.bankLinkNumber" style="width:280px"></el-input>
                            </el-form-item>
                             <el-form-item label="住址" required>
                                <el-input v-model="form.address" style="width:280px"></el-input>
                            </el-form-item>
                            <el-form-item label="政治面貌" required>
                                <el-select v-model="form.politicstype" style="width:280px">
                                <el-option
                                    v-for="item in politicsd"
                                    :key="item.index"
                                    :label="item.politics"
                                    :value="item.politicstype"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="文化程度" required>
                                <el-select v-model="form.cultureLevelType" style="width:280px">
                                    <el-option  v-for="(item,index) in cultureLevel"   :key="index"   :label="item.cultureleve" :value="item.cultureleveltype"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态" required>
                                <el-select v-model="form.stateType" style="width:280px">
                                    <el-option value="0" label="禁用"></el-option>
                                    <el-option value="1" label="启用"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="特长" required>
                                <el-input v-model="form.Specialty" style="width:280px"></el-input>
                            </el-form-item>
                            <el-form-item label="微信" required>
                                <el-input v-model="form.wechat" style="width:280px"></el-input>
                            </el-form-item>
                            <el-form-item label="当前工种" required>
                                <el-select v-model="form.workType" style="width:280px">
                                <el-option   v-for="(item,index) in workT"  :key="index"  :label="item.worker"  :value="item.workertype"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="班组" required>
                                <el-select v-model="form.teamId" style="width:280px">
                                    <el-option v-for="(item,index) in teamdetail" :key="index" :label="item.teamName" :value="item.teamId" ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="部门" required>
                                <el-select v-model="form.depId" style="width:280px">
                                <el-option   v-for="(item,index) in departdata"  :key="index"  :label="item.departmentName"  :value="item.departmentId"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                            
                    </div>
                    <div v-if="nextnumber == 2" style="float:left">
                        <p class="inputright">请输入工资银行联号</p>
                        <p class="inputright">请输入住址</p>
                        <p class="inputright">请选择政治面貌</p>
                        <p class="inputright">请选择文化程度</p>
                        <p class="inputright">请选择该用户是否可用</p>
                        <p class="inputright">请输入特长</p>
                        <p class="inputright">请输入微信</p>
                        <p class="inputright">请选择当前工种</p>
                        <p class="inputright">请选择班组</p>
                        <p class="inputright">请选择部门</p>
                    </div>
                    <div v-if="nextnumber == 3" style="float:left;margin-right:50px">
                            <el-form-item label="是否班长" required>
                                <el-select v-model="form.isTeamLeader" placeholder="请选是否" style="width:280px">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="管理员类型" required>
                                <el-select v-model="form.manType" style="width:280px">
                                <el-option   v-for="(item,index) in mantype"  :key="index"  :label="item.mname"  :value="item.mId"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="工人类型" required>
                                <el-select v-model="form.workRole" placeholder="请选工人类型" style="width:280px">
                                <el-option label="管理人员" value="10"></el-option>
                                <el-option label="建筑工人" value="20"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="有效证件发证机关" required>
                                <el-input v-model="form.grantOrg" style="width:280px"></el-input>
                            </el-form-item>
                            <el-form-item label="是否加入公会" required>
                                <el-select v-model="form.isJoined" placeholder="请选是否" style="width:280px" @change="isjointime">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                             
                            <el-form-item label='加入公会时间' required v-if="isselect==true">
                                <el-date-picker
                                style="width:280px"
                                type="date"
                                placeholder="选择日期"
                                v-model="form.joinedTime"
                                ></el-date-picker>
                            </el-form-item>
                            <div style="margin:10px 20px;">
                                <!-- <el-button type="text" style="color:#aaa;float:left;margin-left:30%">三者任选一</el-button> -->
                                <el-button @click="show(0)">本地头像</el-button>
                                <el-button @click="show(1)">人脸识别</el-button>
                                <el-button @click="show(2)">摄像头</el-button>
                            </div>
                             <el-form-item label="本地选头像" class="photo" style="width:20%" v-if="showhidden==0">
                                    <el-upload  accept=".jpg, .jpeg, .png" action :on-change="getFile" :limit="1"  list-type="picture" :auto-upload="false" >
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar" id="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="人脸识别" class="photo" style="width:20%" v-if="showhidden==1">
                                    <el-button>开启人脸识别机</el-button>
                                </el-form-item>
                                <el-form-item label="摄像头" class="photo" style="width:50%" v-if="showhidden==2">
                                    <el-button onclick="getMedia()">开启摄像头</el-button>
                                    <el-button id="snap" onclick="takePhoto()" action @click="pic(2)">拍照</el-button>
                                    <br>
                                    <video id="video" width="250px" height="250px" autoplay="autoplay"></video><br>
                                    <canvas id="canvas" width="250px" height="250px"></canvas>
                                    <div id="pic" v-show="false">
                                    <img src id="picimages">
                                    </div>
                                </el-form-item>
            </div>
            <div v-if="nextnumber == 3" style="float:left">
                        <p class="inputright">请选择是否班长</p>
                        <p class="inputright">如果是班长则管理员类型必填</p>
                        <p class="inputright">请选择工人类型</p>
                        <p class="inputright">请输入有效证件发证机关</p>
                        <p class="inputright">请选择是否加入公会</p>
                        <p class="inputright" v-if="isselect==true">如果加入公会，则加入公会时间必填</p>
                        <p class="inputright">请选择头像 三选一即可</p>
                    </div>
                <br>
            
            <!-- <div style=" position: fixed;bottom:20%;right:35%">
                <el-button @click="onback" type="primary" v-if="backbutton == true">上一步</el-button>
                <el-button @click="onnext" type="success" v-if="nextbutton == true">下一步</el-button>                
            </div> -->
            <div style=" position: fixed;bottom:10%;left:55%">
                <el-form-item style="margin-top:20px;">
                    <el-button @click="onback" type="primary" v-if="backbutton == true">上一步</el-button>
                    <el-button @click="onnext" type="primary" v-if="nextbutton == true">下一步</el-button>                
                    <el-button @click="onSubmit('form')" type="success" native-type="submit">保存</el-button>
                    <router-link to="/project/accountlist">  <el-button style="border:none">返回</el-button> </router-link>
                </el-form-item>
            </div>

        </el-form>
      </el-scrollbar>
    </div>
  </div>
</template>

<script >
import * as personapi from '@/api/usercenter.js'
import md5 from "js-md5";

export default {
  components: {},
  data() {
    return {
      nextnumber:1,
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
        password:'',
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
        Specialty:'',
        urgentLinkMan:'',
        urgentLinkManPhone:'',
        wechat:'',
        bankLinkNumber:'',
        stateType: "",
        isTeamLeader: "",
        workType: "",
        depId:'',
        manType:'',
        workRole: "",
        joinedTime:''
      },
      nextbutton:true,
      headImage: "",
      teamdetail:[],
      politicsd: [],
      cultureLevel: [],
      departdata:[],
      workT: [],
      mantype:[],
      workR: [],
      value: "",
      GetId: "",
      backbutton:false,
      props: {
        value: "code",
        label: "name",
        children: "child"
      },
      isselect:false,
      detail:null,
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
      isjointime(){
          console.log(this.form.isJoined)
          if(this.form.isJoined == 1){
              this.isselect = true;
          }else{
              this.isselect = false;
          }
        //   console.log(1)
      },
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
    onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
                if (valid) {
                    let formbut = new FormData();
                    if(this.form.isJoined == 1){
                        console.log(this.form);
                        formbut.append('joinedTimeTime',this.form.joinedTime.getTime()) 
                    }
                        formbut.append('password',this.password) ,
                        formbut.append('workerName',this.form.workerName) ,
                        formbut.append('birTime', this.form.birthday.getTime()) ,
                        // formbut.append('password',this.form.password) ,
                        formbut.append('birthPlaceCode', this.form.birthPlaceCode[2]) ,
                        formbut.append('headImagePhoto', this.form.ImageUrl) ,
                        formbut.append('isJoined', this.form.isJoined) ,
                        formbut.append('idCardType', this.form.idCardType) ,
                        formbut.append('idCardNumber', this.form.idCardNumber) ,
                        formbut.append('nation', this.form.nation) ,
                        formbut.append('address', this.form.address) ,
                        formbut.append('politicsType', this.form.politicstype) ,
                        formbut.append('cellPhone', this.form.cellPhone) ,
                        formbut.append('manType', this.form.manType) ,
                        formbut.append('cultureLevelType', this.form.cultureLevelType) ,
                        formbut.append('grantOrg', this.form.grantOrg) ,
                        formbut.append('stateType', this.form.stateType) ,
                        formbut.append('Specialty', this.form.Specialty) ,
                        formbut.append('wechat', this.form.wechat) ,
                        formbut.append('urgentLinkMan', this.form.urgentLinkMan) ,
                        formbut.append('urgentLinkManPhone', this.form.urgentLinkManPhone) ,
                        formbut.append('isTeamLeader', this.form.isTeamLeader) ,
                        formbut.append('depId', this.form.depId) ,
                        formbut.append('workType', this.form.workType) ,
                        formbut.append('workRole', this.form.workRole) ,
                        formbut.append('gender',this.form.gender) 
                        formbut.append('bankLinkNumber',this.form.bankLinkNumber) 
                // console.log(this.detail);
                this.$http.post(personapi.useradd,formbut).then(res=>{
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
                }
        })},
    onback(){
        this.nextbutton = true
        if(this.nextnumber>1){
            this.nextnumber--
        }
        if(this.nextnumber == 1){
            this.backbutton = false
        }
        // console.log(this.nextnumber)
    },
    onnext(){
            this.backbutton = true;
        if(this.nextnumber<3){
            this.nextnumber++
        }
        if(this.nextnumber==3){
            this.nextbutton = false
        }
        // console.log(this.nextnumber);
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
    teamdata(){
        this.$http.get('/api/team/team_select_list').then(res=>{
            // console.log(res);
            this.teamdetail = res.data
        })
    },
    depart(){
        this.$http.get('/api/dep/selectBy').then(res=>{
            // console.log(res);
            this.departdata = res.data.list
        })
    },
    mantypedata(){
        this.$http.get('/api/dict/man_type').then(res=>[
            console.log(res),
            this.mantype = res.data
        ])
    },
  },
  created() {},
  mounted() {
    // this.$http.get('/api/user/user_insert_info',{params:this.data}).then(res=>{
    //     console.log(res);
    // })
    this.password = md5('000000');
    // console.log(password)
    this.mantypedata();
    this.depart();
    this.teamdata();
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
.inputright{
    height: 67px;
    color: #aaa;
    padding-top: 10px
}
.persontop{
    margin-top: 30px
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
.avatar-uploader-icon{
  border:1px dotted #8c939d;
}
.el-upload-list--picture .el-upload-list__item{
  border: none;
  
}
</style>
<style>

</style>