<template>
  <div class="userwrapper">
    <div class="usermain" >
      <el-scrollbar style="height:100%;">
        <el-form ref="form" :model="form" :rules="usersrules"  @submit.native.prevent style="margin-top:50px;">
            <p class="persontop">新增人员信息</p>
            <div v-if="nextnumber == 1" >
                <table border="1" class="tableinsert">
                    <tr>
                        <td class="tdleft" >工人姓名：</td>
                        <td>
                            <el-form-item required prop="workerName">
                                <el-input v-model.trim="form.workerName" style="width:280px" placeholder="工人姓名"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft" >性别：</td>
                        <td>
                            <el-form-item required prop="gender">
                                <el-select v-model="form.gender" placeholder="请选性别" style="width:280px">
                                <el-option label="男" value="0"></el-option>
                                <el-option label="女" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">出生日期：</td>
                        <td>
                            <el-form-item required prop="birthday">
                                <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp" style="width:280px;"></el-date-picker>
                                <!-- <el-date-picker  style="width:280px"   required  type="date"  placeholder="选择日期"  v-model="form.birthday"  ></el-date-picker> -->
                            </el-form-item>
                        </td>
                        <td class="tdleft">手机号码：</td>
                        <td>
                            <el-form-item prop="cellPhone">
                                <el-input v-model.trim="form.cellPhone" style="width:280px" placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">籍贯：</td>
                        <td>
                            <el-form-item prop="birthPlaceCode">
                                <el-cascader  :options="sjhq"  v-model="form.birthPlaceCode"   @change="handleItemChange"  :props="props"   style="width:280px;" ></el-cascader>
                            </el-form-item>
                        </td>
                        <td class="tdleft">民族：</td>
                        <td>
                            <el-form-item required prop="nation">
                                <el-select v-model="form.nation" style="width:280px">
                                    <el-option v-for="(item,index) in nationoption" :key="index" :value="item.nation">{{item.nation}}</el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">证件类型：</td>
                        <td>
                             <el-form-item prop="idCardType">
                                <el-select v-model="form.idCardType" style="width:280px">
                                    <el-option v-for="(item,index) in categoryType" :key="index" :label="item.idcard" :value="item.idcardtype" ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                          <td class="tdleft">证件号码：</td>
                        <td>
                            <el-form-item prop="idCardNumber" >
                                <el-input v-model.trim="form.idCardNumber" style="width:280px" placeholder="请输入证件号码"></el-input>
                            </el-form-item>
                        </td>
                       
                    </tr>
                    <tr>
                         <td class="tdleft">工资银行卡号：</td>
                        <td>
                            <el-form-item prop="payRollBankCardNumber">
                                <el-input v-model.trim="form.payRollBankCardNumber" style="width:280px" placeholder="工资银行卡号"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">支行名称：</td>
                        <td>
                            <el-form-item prop="payRollBankName">
                                <el-input v-model.trim="form.payRollBankName" style="width:280px" placeholder="请输入支行名称"></el-input>
                            </el-form-item>
                        </td>
                    </tr> 
                    <tr>
                        <td class="tdleft">发放工资银行</td>
                        <td>
                             <el-form-item prop="payRollTopBankCode">
                                <el-select v-model="form.payRollTopBankCode" style="width:280px">
                                    <el-option v-for="(item,index) in bankoption" :key="index" :label="item.bank" :value="item.banktype" ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">紧急联系人：</td>
                        <td>
                            <el-form-item prop="urgentLinkMan">
                                <el-input v-model.trim="form.urgentLinkMan" style="width:280px" placeholder="请输入紧急联系人"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        
                        <td class="tdleft">紧急联系人电话：</td>
                        <td>
                            <el-form-item prop="urgentLinkManPhone">
                                <el-input v-model.trim="form.urgentLinkManPhone" style="width:280px" placeholder="请输入紧急联系人电话"></el-input>
                            </el-form-item>
                        </td>
                         <td class="tdleft">是否有重大疾病历史：</td>
                        <td>
                            <el-form-item prop="hasBadMedicalHistory">
                                <el-select v-model="form.hasBadMedicalHistory" style="width:280px">
                                <el-option label="是" value="0"></el-option>
                                <el-option label="否" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                     <tr>
                       
                        <td class="tdleft">工资银行联号：</td>
                        <td>
                            <el-form-item prop="bankLinkNumber">
                                <el-input v-model.trim="form.bankLinkNumber" style="width:280px" placeholder="请输入工资银行联号"></el-input>
                            </el-form-item>
                        </td>
                         <td class="tdleft">住址：</td>
                        <td>
                             <el-form-item prop="address">
                                <el-input v-model.trim="form.address" style="width:280px" placeholder="请输入住址"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">政治面貌：</td>
                        <td>
                            <el-form-item prop="politicstype">
                                <el-select v-model.trim="form.politicstype" style="width:280px">
                                <el-option
                                    v-for="item in politicsd"
                                    :key="item.index"
                                    :label="item.politics"
                                    :value="item.politicstype"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">文化程度：</td>
                        <td>
                            <el-form-item prop="cultureLevelType">
                                <el-select v-model="form.cultureLevelType" style="width:280px">
                                    <el-option  v-for="(item,index) in cultureLevel"   :key="index"   :label="item.cultureleve" :value="item.cultureleveltype"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        
                        <td class="tdleft">状态：</td>
                        <td>
                            <el-form-item prop="stateType">
                                <el-select v-model="form.stateType" style="width:280px">
                                    <el-option value="0" label="禁用"></el-option>
                                    <el-option value="1" label="启用"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">是否班长：</td>
                        <td>
                            <el-form-item prop="isTeamLeader">
                                <el-select v-model="form.isTeamLeader" placeholder="请选是否" style="width:280px">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        
                        <td class="tdleft">当前工种：</td>
                        <td>
                            <el-form-item prop="workType">
                                <el-select v-model="form.workType" style="width:280px">
                                <el-option   v-for="(item,index) in workT"  :key="index"  :label="item.roleName"  :value="item.role"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                         <td class="tdleft">部门：</td>
                        <td>
                            <el-form-item prop="depId">
                                <el-select v-model="form.depId" style="width:280px">
                                <el-option   v-for="(item,index) in departdata"  :key="index"  :label="item.departmentName"  :value="item.departmentId"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                       
                          <td class="tdleft">管理员类型：</td>
                        <td>
                            <el-form-item prop="manType">
                                <el-select v-model="form.manType" style="width:280px">
                                <el-option   v-for="(item,index) in mantype"  :key="index"  :label="item.roleName"  :value="item.role"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">工人类型：</td>
                        <td>
                            <el-form-item prop="workRole">
                                <el-select v-model="form.workRole" placeholder="请选工人类型" style="width:280px">
                                <el-option label="管理人员" value="10"></el-option>
                                <el-option label="建筑工人" value="20"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">有效证件发证机关：</td>
                        <td>
                            <el-form-item prop="grantOrg">
                                <el-input v-model.trim="form.grantOrg" style="width:280px" placeholder="请输入发证机关"></el-input>
                            </el-form-item>
                        </td>
                        <td class="tdleft">是否加入公会：</td>
                        <td>
                            <el-form-item prop="isJoined">
                                <el-select v-model="form.isJoined" placeholder="请选是否" style="width:280px" @change="isjointime">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        
                         <td class="tdleft">班组：</td>
                        <td>
                             <el-form-item prop="teamId">
                                <el-select v-model="form.teamId" style="width:280px">
                                    <el-option v-for="(item,index) in teamdetail" :key="index" :label="item.teamName" :value="item.teamId" ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft"><p v-if="isselect==true">加入公会时间：</p></td>
                        <td>
                            <el-form-item prop='joinedTime' v-if="isselect==true">
                                <el-date-picker v-model="form.joinedTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="timestamp" style="width:280px;"></el-date-picker>
                                <!-- <el-date-picker
                                style="width:280px"
                                type="date"
                                placeholder="选择日期"
                                v-model="form.joinedTime"
                                ></el-date-picker> -->
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div style="margin:10px 20px;">
                                <!-- <el-button type="text" style="color:#aaa;float:left;margin-left:30%">三者任选一</el-button> -->
                                <el-button @click="show(0)">本地头像</el-button>
                                <!-- <el-button @click="show(1)">人脸识别</el-button> -->
                                <el-button @click="show(2)">摄像头</el-button>
                            </div>
                        </td>
                         <td colspan="2">
                             <el-form-item label="本地选头像" class="photo" style="width:20%" v-if="showhidden==0">
                                    <el-upload  accept=".jpg, .jpeg, .png" action :on-change="getFile" :limit="1"  list-type="picture" :auto-upload="false" >
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar" id="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <!-- <el-form-item label="人脸识别" class="photo" style="width:20%" v-if="showhidden==1">
                                    <el-button @click="faceperson()">开启人脸识别机</el-button>
                                    <img :src="this.equipImg" alt="" style="width:100px;height:100px;" @click="Imgface()" id="equipgetpic">
                                </el-form-item> -->
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
                         </td>
                    </tr>
                </table> 
            </div>
                <br>
            <div style="position: relative; bottom:10%;left:45%">
                <el-form-item style="margin-top:20px;">
                    <el-button @click="onSubmit('form')" type="primary" native-type="submit">保存</el-button>
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
        equipImg:'',
        nextnumber:1,
        sjhq: [],
        showhidden: 0,
        xb: [],
        activeName: "1",
        imageUrl: "",
        categoryType: [],
        zjlx: [],
        form: {
            payRollTopBankCode:'',
            payRollBankName:'',
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
            bankLinkNumber:'',
            payRollBankCardNumber:'',
            stateType: "",
            isTeamLeader: "",
            workType: "",
            depId:'',
            manType:'',
            workRole: "",
            joinedTime:''
        },
        nationoption:[],
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
        bankoption:[],
        isselect:false,
        detail:null,
        usersrules: {
            workerName: [{  required: true, message: '请输入工人姓名', trigger: 'blur' },{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/,message:'请输入2~10个字符的工人姓名'}],
            gender: [{ required: true, message: "请选择工人性别", trigger: "change" }], 
            birthday:[{ required: true, message: "请选择出生日期", trigger: "change" }],
            payRollTopBankCode:[{ required: false, message: "请选择银行", trigger: "change" }], 
            idCardNumber: [
                { required: true, message: '请输入身份证号', trigger: 'blur' },
                { pattern:/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,message:'请输入正确的身份证号' }
            ],
            birthPlaceCode:[{ required: true, message: "请选择籍贯", trigger: "change" }], 
            nation:[{ required: true, message: "请选择民族", trigger: "change" }], 
            idCardType:[{ required: true, message: "请选择证件类型", trigger: "change" }], 
            cellPhone:[
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { pattern:/^[1][3,4,5,7,8][0-9]{9}$|^[0][0-9]{2}[/-][0-9]{8}$/,message:'请输入正确的手机号码' }
            ],
            urgentLinkManPhone:[
                { required: false, message: '请输入紧急人手机号码', trigger: 'blur' },
                { pattern:/^[1][3,4,5,7,8][0-9]{9}$|^[0][0-9]{2}[/-][0-9]{8}$/,message:'请输入正确的手机号码' }
            ],
            hasBadMedicalHistory:[{ required: false, message: '请选择是否有重大疾病历史', trigger: 'blur'} ],
            urgentLinkMan:[{ required: false, message: '请输入紧急联系人', trigger: 'blur'} ],
            bankLinkNumber:[
                { required: false, message: '请输入银行卡号', trigger: 'blur' },
                { pattern:/^[1-9]{1}[0-9]{15,18}$/,message:'请输入银行卡号' }
            ],
            payRollBankCardNumber:[
                { required: false, message: '请输入银行卡号', trigger: 'blur' },
                { pattern:/^[1-9]{1}[0-9]{15,18}$/,message:'请输入银行卡号' }
            ],
            payRollBankName:[{ required: true, message: "请输入支行名称", trigger: "blur" },
            { pattern:/^[\u4e00-\u9fa5]{4,40}$/,message:'请输入正确的支行名称' }
            ], 
            address:[{ required: true, message: '请输入地址', trigger: 'blur'},{ pattern:/^[\u4e00-\u9fa5_0-9]{7,20}$/,message:'请输入正确的地址' } ],
            politicstype:[{ required: true, message: "请选择政治面貌", trigger: "change" }], 
            cultureLevelType:[{ required: true, message: "请选择文化程度", trigger: "change" }], 
            stateType:[{ required: true, message: "请选择状态", trigger: "change" }], 
            workType:[{ required: true, message: "请选择工种", trigger: "change" }], 
            isTeamLeader:[{ required: true, message: "请选择是否是班长", trigger: "change" }], 
            manType:[{ required: true, message: "请选择管理员类型", trigger: "change" }], 
            depId:[{ required: false, message: "请选择部门", trigger: "change" }], 
            workRole:[{ required: true, message: "请选择工人类型", trigger: "change" }], 
            teamId:[{ required: false, message: "请选择班组", trigger: "change" }], 
            isJoined:[{ required: true, message: "请选择是否加入工会", trigger: "change" }], 
            grantOrg:[{ required: true, message: "请输入发证机关", trigger: "blur" },{ pattern:/^[\u4e00-\u9fa5_a-zA-Z]{4,20}$/,message:'请输入正确的发证机关' }], 
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
      },
    handleItemChange(val) {
      this.form.birthPlaceCode = val;
      // console.log(this.form.birthPlaceCode[2]);
    },
    show(n) {
      this.showhidden = n;
    },
    Imgface(event){
        console.log(event)
    },
    getBase64(file) {
        console.log(file);
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
                    console.log(this.form.birthday)
                     formbut.append('password',this.password) ,
                        formbut.append('workerName',this.form.workerName) ,
                        formbut.append('birTime', this.form.birthday),
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
                        formbut.append('urgentLinkMan', this.form.urgentLinkMan) ,
                        formbut.append('urgentLinkManPhone', this.form.urgentLinkManPhone) ,
                        formbut.append('isTeamLeader', this.form.isTeamLeader) ,
                        formbut.append('depId', this.form.depId) ,
                        formbut.append('workType', this.form.workType) ,
                        formbut.append('workRole', this.form.workRole) ,
                        formbut.append('gender',this.form.gender) ,
                        formbut.append('bankLinkNumber',this.form.bankLinkNumber) ,
                        formbut.append('payRollTopBankCode',this.form.payRollTopBankCode) ,
                        formbut.append('payRollBankName',this.form.payRollBankName) ,
                        formbut.append('payRollBankCardNumber',this.form.payRollBankCardNumber) 
                        console.log(typeof this.form.isJoined,this.form.isJoined)
                        if(this.form.isJoined == 1){
                            console.log(this.form.isJoined)
                            if(this.form.joinedTime ==''){
                                alert('如果加入公会，则加入公会时间必填')
                            }else{
                                //  console.log(1)
                                formbut.append('joinedTimeTime',this.form.joinedTime) 
                                this.$http.post(personapi.useradd,formbut).then(res=>{
                                console.log(res);
                                if(res.data.result=='success'){
                                    this.$router.push("/project/accountlist");
                                }else{
                                    alert('用户添加失败');
                                }
                            })
                            }
                        }else{
                            console.log(this.form.isJoined)
                            this.$http.post(personapi.useradd,formbut).then(res=>{
                                console.log(res);
                                if(res.data.result=='success'){
                                    this.$router.push("/project/accountlist");
                                }else{
                                    alert('用户添加失败');
                                }
                            })   
                        }
                        
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
    },
    onnext(){
            this.backbutton = true;
        if(this.nextnumber<3){
            this.nextnumber++
        }
        if(this.nextnumber==3){
            this.nextbutton = false
        }
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
        this.$http.get('/api/team/team_select_bycode').then(res=>{
            // console.log(res);
            this.teamdetail = res.data.list;
        })
    },
    depart(){
        this.$http.get('/api/dep/selectBy').then(res=>{
            // console.log(res)
            this.departdata = res.data.list
        })
    },
    mantypedata(){
        this.$http.get('/api/dict/man_type').then(res=>{
            // console.log(res),
            this.mantype = res.data
        })
    },
    nationdata(){
        this.$http.get('/api/dict/nation').then(res=>{
            // console.log(res),
            this.nationoption = res.data
        })
    },
  },
  created() {
      // 设备信息调用注册人员信息
    // this.$http.get('/equip/person/find',{params:{id:'10001'}}).then(res=>{
    //   console.log(res);
    //   if(res.data.msg=="获取成功"){
    //     this.form.workerName=res.data.data.name;
    //   }
    // })
    
  },
  mounted() {
    // this.$http.get('/api/user/user_insert_info',{params:this.data}).then(res=>{
    //     console.log(res);
    // })
    this.password = md5('000000');
    // console.log(password)
    this.mantypedata();
    this.depart();
    this.teamdata();
    this.nationdata();
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
        // console.log(res);
      this.workT = res.data;
    });
    // 银行
    this.$http.get('/api/dict/bank').then(res=>{
        // console.log(res);
        this.bankoption=res.data;
    })
    // 行政区的三级联动接口
    this.$http.post("/api/dict/regioncode_level").then(res => {
      // console.log(res);
      this.sjhq = res.data;
      // console.log(this.sjhq);
    });
  }
  
};
</script>
<style lang="scss">
.userwrapper {
  width: 100%;
  .usermain{
    height: calc(100vh - 100px);
  }
}
.formInput {
  width: 280px;
}
.photo {
  float: left;
}
.usermain .el-scrollbar__wrap{
    overflow-x: hidden
}
.el-scrollbar__bar.is-horizontal{
    display: none
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