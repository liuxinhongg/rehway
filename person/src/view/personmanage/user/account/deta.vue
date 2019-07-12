<template>
  <div class="wrapper">
    <div style="height:100%">
      <el-form ref="accdataform" :model="accdataform" label-width="130px"  @submit.native.prevent>
        <el-form-item label="人员编号" required>
          <el-input v-model="accdataform.workerId" style="width:100%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="工人姓名" required>
          <el-input v-model="accdataform.workerName" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="accdataform.gender" placeholder="请选性别" style="width:100%" :on-change='fan'>
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            prop="birthday"
            required
            type="date"
            placeholder="选择日期"
            v-model="accdataform.birthday"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="是否加入公会">
          <el-select v-model="accdataform.isJoined" placeholder="请选是否" style="width:100%">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select v-model="accdataform.idCardType" style="width:100%">
            <el-option
              v-for="item in zjlx"
              :key="item.value"
              :label="item.idcard"
              :value="item.idcardtype"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="accdataform.idCardNumber" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="accdataform.nation" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-cascader
            :options="sjhq"
            v-model="accdataform.bitrhPlanceCode"
            @change="handleItemChange"
            :props="props"
            style="width:100%;"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="头像">
          <img :src="'data:image/png;base64,'+accdataform.headImage" alt="" style="height:50px;">
          <!-- <el-input v-model="accdataform.headImage" style="width:100%;"></el-input> -->
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="accdataform.politicsType" style="width:100%">
            <el-option
              v-for="item in zzmm"
              :key="item.value"
              :label="item.politics"
              :value="item.politicstype"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select  v-model="accdataform.stateType">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
          </el-select>
          <!-- <el-input v-model="accdataform.stateType" style="width:100%;"></el-input> -->
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="accdataform.cellPhone" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="文化程度">
          <el-select v-model="accdataform.cultureLevelType" style="width:100%">
            <el-option
              v-for="(item,index) in wwcd"
              :key="index"
              :label="item.cultureleve"
              :value="item.cultureleveltype"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效证件发证机关">
          <el-input v-model="accdataform.grantOrg" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="当前工种">
          <el-select v-model="accdataform.workType" style="width:100%">
            <el-option
              v-for="item in grlx"
              :key="item.value"
              :label="item.worker"
              :value="item.workertype"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工人类型">
          <el-select v-model="accdataform.workRole" placeholder="请选是否" style="width:100%">
            <el-option label="管理人员" value="10"></el-option>
            <el-option label="建筑工人" value="20"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" native-type="submit" >保存</el-button>
          <router-link to="/project/accountlist">
            <el-button style="border:none">返回</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  data() {
    return {
      id: "",
      accdataform: {
        gender: "",
        workerId: "",
        workerName: "",
        birthday: "",
        bitrhPlanceCode: [],
        headImageUrl: "",
        isJoined: "",
        idCardType: "",
        idCardNumber: "",
        nation: "",
        address: "",
        headImage: "",
        politicsType: "",
        cellPhone: "",
        cultureLevel: "",
        grantOrg: "",
        stateType: "",
        isTeamLeader: "",
        worker: "",
        cultureLevelType: "",
        workRole: ""
      },
      wwcd: [],
      zzmm: [],
      zjlx: [],
      options: [],
      value: "",
      grlx: [],
      sjhq: [],
      props: {
        value: "code",
        label: "name",
        children: "child"
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    fan(){
        // if(){

        // }
    },
    handleItemChange(val) {
      // console.log(val);
      this.accdataform.bitrhPlanceCode = val;
      // console.log(this.accdataform.birthPlaceCode[2]);
    },
    onSubmit() {
      console.log(this.accdataform);
      this.$http
        .get("/api/user/user_update_info", {
          params: {
            gender: this.accdataform.gender,
            workerId: this.accdataform.workerId,
            workerName: this.accdataform.workerName,
            birthday: this.accdataform.birthday,
            birthPlaceCode: this.accdataform.bitrhPlanceCode[2],
            headImageUrl: this.accdataform.headImageUrl,
            isJoined: this.accdataform.isJoined,
            idCardType: this.accdataform.idCardType,
            idCardNumber: this.accdataform.idCardNumber,
            nation: this.accdataform.nation,
            address: this.accdataform.address,
            headImage: this.accdataform.headImage,
            politicsType: this.accdataform.politicsType,
            cellPhone: this.accdataform.cellPhone,
            cultureLevel: this.accdataform.cultureLevel,
            grantOrg: this.accdataform.grantOrg,
            stateType: this.accdataform.stateType,
            isTeamLeader: this.accdataform.isTeamLeader,
            workType: this.accdataform.workType,
            cultureLevelType: this.accdataform.cultureLevelType,
            workRole: this.accdataform.workRole
          }
        })
        .then(res => {
          // console.log(res)
          if(res.data.result=='success'){
             this.$router.push("/project/accountlist");
          }else{
              alert('用户修改失败');
          }
        });
    },
    zdjk(){
      this.$http.post("/api/dict/culture").then(res => {
      // console.log(res);
      this.wwcd = res.data;
    });
    this.$http.post("/api/dict/work_type").then(res => {
      // console.log(res);
      this.grlx = res.data;
      // console.log(this.accdataform.workertype);
    });
    //   行政区的三级联动接口
    this.$http.post("/api/dict/regioncode_level").then(res => {
      // console.log(res);
      this.sjhq = res.data;
    });
    this.$http.post("/api/dict/politics").then(res => {
      // console.log(res);
      this.zzmm = res.data;
    });
    this.$http.post("/api/dict/id_type").then(res => {
      // console.log(res);
      this.zjlx = res.data;
    });
    }
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.zdjk();
    
    this.$http
      .get("/api/user/select", { params: { workerId: this.id } })
      .then(res => {
        console.log(res);
        this.accdataform = res.data.list[0];
        if (typeof(res.data.list[0].gender) == 'number') {
          this.accdataform.gender = res.data.list[0].gender.toString();
        }
        if (typeof(res.data.list[0].isJoined) == 'number') {
          this.accdataform.isJoined = res.data.list[0].isJoined.toString();
        }
        if(typeof(res.data.list[0].stateType) == 'number'){
          this.accdataform.stateType = res.data.list[0].stateType.toString();
        }
        if(typeof(res.data.list[0].workRole) == 'number'){
          this.accdataform.workRole = res.data.list[0].workRole.toString();
        }
        // this.accdataform.bitrhPlanceCode = [res.data.list[0].bitrhPlanceCode]
      });
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  margin: 50px 0px;
  width: 40%;
}
</style>
