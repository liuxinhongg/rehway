/*  ********************************************
 * @function: 人员上报
 * @Author: 谢莹 
 * @Date: 2019-03-08 10:44:13 
 ********************************************  */
<template>
  <div class="appear">
    <el-scrollbar style="height:100%;">
      <el-form :model="addpersondata" ref="addpersondata" :rules="rules" label-width="190px"
        class="demo-addpersondata" style="width:26%;margin-top:15px;">
        <el-form-item label="工人姓名：" prop="user_name">
          <el-input v-model="addpersondata.user_name" name="user_name"></el-input>
        </el-form-item>
        <el-form-item label="是否班长：">
          <el-radio-group v-model="addpersondata.gender">
            <el-radio :label="item.value" :key="index" v-for="(item,index) in gendersex" >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="证件类型：" prop="address">
          <el-input v-model="addpersondata.address"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="id_card_num">
          <el-input v-model="addpersondata.id_card_num"></el-input>
        </el-form-item>
        <el-form-item label="当前工种" prop="state_id">
          <el-select v-model="addpersondata.state_id" >
            <!-- <el-option label="在职" value="val1"></el-option>
            <el-option label="离职" value="val2"></el-option> -->
            <el-option 
              v-for="item in twostatusoption" 
              :key="item.value" 
              :label="item.state_name" 
              :value="item.state_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位：">
          <el-select v-model="addpersondata.role_name" >
             <el-option 
              v-for="item in statusoption" 
              :key="item.value" 
              :label="item.role_name" 
              :value="item.role_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族：">
         <el-input v-model="addpersondata.Email"></el-input>
        </el-form-item>
        <el-form-item label="住址：" prop="Email">
          <el-input type="textarea" :rows="2" v-model="addpersondata.signature"></el-input>          
        </el-form-item>
        <el-form-item label="政治面貌" prop="wechat">
          <el-input v-model="addpersondata.wechat"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="qq_num">
          <el-input v-model="addpersondata.qq_num"></el-input>
        </el-form-item>
        <el-form-item label="文化程度" prop="signature">
          <el-input v-model="addpersondata.Email"></el-input>
        </el-form-item>
        <el-form-item label="发证机关" prop="signature">
          <el-input v-model="addpersondata.qq_num"></el-input>          
        </el-form-item>
        <el-form-item prop="user_id" style="height:0px;">
          <el-input v-model="addpersondata.user_id" type="hidden"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;width: 100%;">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="resetForm('addpersondata')">取消</el-button>
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
      gendersex:[
        {
          value: 0,
          label: '男',
        }, {
          value: 1,
          label: '女',
        }, 
      ],
      // 绑定的职位id
      person_postId:'',
      // 职位
      statusoption:[],
      // 所在部门：
      departOption:[],
      // 在职状态
      twostatusoption:[],
      dialogImageUrl: "",
      renewId:'',
      dialogVisible: false,
      addpersondata: {
        // person_name:'',
        // person_sex:'',
        // person_address:'',
        // person_Idcard:'',
        // person_status:'',
        // person_part:'',
        // person_mail:'',
        // person_wechat:'',
        // person_qq:''
      },
      rules:{
        person_name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
        person_sex:[{ required: true, message: '请输入性别：', trigger: 'blur' }],
        person_address:[{ required: true, message: '请输入地址', trigger: 'blur' }],
        person_Idcard:[{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        person_status:[{ required: true, message: '请输入在职状态', trigger: 'blur' }],
        person_part:[{ required: true, message: '请输入部门', trigger: 'blur' }],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    submitForm(){
      // console.log(this.renewId)
      if(this.renewId!==''||this.renewId!==null||this.renewId!=="undefined"){
          console.log("我是编辑")
          // console.log(this.addpersondata.role_id)
          let data={
            user_id:this.renewId,
            gender:this.addpersondata.gender,
            login_name:this.addpersondata.login_name,
            id_card_num:this.addpersondata.id_card_num,
            tel:this.addpersondata.tel,
            signature:this.addpersondata.signature,
            password:this.addpersondata.password,
            id_card_num:this.addpersondata.id_card_num,
            user_name:this.addpersondata.user_name,
            role_id:this.addpersondata.role_id,
            Email:this.addpersondata.Email,
            qq_num:this.addpersondata.qq_num,
            wechat:this.addpersondata.wechat,
            entrt_time:this.addpersondata.entrt_time,
            department_id:this.addpersondata.department_id,
            state_id:this.addpersondata.state_id,
            address:this.addpersondata.address,
            ban:this.addpersondata.ban,
          }
          this.$http.get('/api/user/id-chage-user',{params:data}).then(res=>{
              console.log(res);
              if(res.data=="成功"){
                this.$router.push({path:'/project/list'})
              }
            })
        }else if(this.renewId=="undefined"){
          console.log("我是新增页面");
          var that=this;
          let data={
            gender:this.addpersondata.gender,
            id_card_num:this.addpersondata.id_card_num,
            tel:this.addpersondata.tel,
            signature:this.addpersondata.signature,
            id_card_num:this.addpersondata.id_card_num,
            user_name:this.addpersondata.user_name,
            Email:this.addpersondata.Email,
            qq_num:this.addpersondata.qq_num,
            wechat:this.addpersondata.wechat,
            entrt_time:this.addpersondata.entrt_time,
            address:this.addpersondata.address,
          }
          that.$http.get('/api/user/user-create-info',{params:data}).then(res=>{

          })
        }
    },
    resetForm(){
      this.$router.push({path:'/project/list'})
    }
  },
  created() {},
  mounted() {
    this.renewId=this.$route.query.user_id;
    console.log(this.renewId)
    //编辑数据
    this.$http.post('/api/user/id-find-user?user_id='+this.renewId).then(res=>{
      console.log(res);
      this.addpersondata=res.data.umgbaseuser[0];
    })
    //option数据
    this.$http.post('/api/user/dep-rol').then(res=>{
      console.log(res);
      this.statusoption=res.data.role;
      this.departOption=res.data.dep;
      this.twostatusoption=res.data.state;
    })
  }
};
</script>
<style>
.appear{
  height: calc(100vh - 185px);
}
.appear .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
