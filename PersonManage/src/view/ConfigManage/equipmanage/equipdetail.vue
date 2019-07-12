<template>
  <div class="accredetail">
    <div class="panel">
      <el-form class="form-horizontal" ref="addequip"  @submit.native.prevent :model="addequip" label-width="150px" :rules="equiprule">
        <el-form-item label="设备名称：" prop="name">
           <el-input v-model="addequip.name" style="width:50%;"></el-input>
         </el-form-item>
         <el-form-item label="设备序列号：" prop="serial" >
          <el-input v-model="addequip.serial" style="width:50%;" disabled></el-input>
         </el-form-item>
         <el-form-item label="设备IP：" prop="ip" >
           <el-input v-model="addequip.ip" style="width:50%;" ></el-input>
         </el-form-item>
         <el-form-item label="设备密码" prop="password">
           <el-input v-model="addequip.password" type="password" style="width:42%;" disabled></el-input>
           <el-button @click="equipVisible = true">设置密码</el-button>
         </el-form-item>
          <el-form-item label="设备状态：">
            <el-radio-group v-model="open" @change="statusopen">
              <el-radio :label="item.id" v-for="(item,index) in quipstatus" :key="index">{{item.status}}</el-radio>
            </el-radio-group>
          </el-form-item>
         <el-form-item label="设备进出场状态：">
           <el-select v-model="addequip.state" style="width:50%;">
             <el-option v-for="item in statustype" :key="item.value" :label="item.label" :value="item.value"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item>
           <el-button  @click="submitForm('addequip')" native-type="submit" type="primary">提交</el-button>
           <el-button @click="beback">返回</el-button>
         </el-form-item>
      </el-form>
      <el-dialog title="设置设备密码" :visible.sync="equipVisible" width="30%"  @submit.native.prevent center>
        <el-form :model="equipform" ref="equipform" :rules="quiprules" label-width="70px" style="width:80%;margin:auto;">
          <el-form-item label="旧密码" prop="oldpass">
            <el-input v-model="equipform.oldpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass">
            <el-input v-model="equipform.newpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  style="text-align:center;">
            <el-button @click="equipVisible = false">取 消</el-button>
            <el-button type="primary" @click="equipsubmit('equipform')" native-type="submit">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    let ipverify=/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/;
    var checkIP = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('iP不能为空'));
      }else if(!ipverify.test(value)){
        return callback(new Error('请输入正确的IP'));
      }else{
         callback()
      }
    };
    return {
      quipstatus:[
        {status:'重启',id:0},
        {status:'开门',id:1},
      ],
      open:'',
      reset:'',
      equipVisible:false,
      equipform:{
        oldpass:'',
        newpass:'',
      },
      equipId:0,
      addequip:{
        serial:'',
        name:'',
        ip:'',
        state:'',
        password:'',
        resource:'',
      },
      timepass:'',
      statustype:[
        {label:'进场',value:'1'},
        {label:'出场',value:'2'},
      ],
      quiprules:{
        oldpass:[{ required: true, message: '输入就密码', trigger: 'blur' }],
        newpass:[{ required: true, message: '输入新密码', trigger: 'blur' }],
      },
      equiprule:{
        name:[{ required: true, message: '输入设备名称', trigger: 'blur' }],
        id:[{ required: true, message: '输入设备编号', trigger: 'blur' }],
        serial:[{ required: true, message: '输入设备序列号', trigger: 'blur' }],
        ip:[{ validator:checkIP, trigger: 'blur' }],
        state:[{ required: true, message: '请选择进出场状态', trigger: 'change' }],
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    statusopen(id){
      console.log(id);
      if(id==0){
        this.$http.post('/equip/restartDevice',{pass:this.timepass}).then(res=>{
          console.log(res);
        })
      }else if(id==1){
        this.$http.post('/equip/device/openDoorControl',{pass:this.timepass}).then(res=>{
          console.log(res);
        })
      }
    },
    // 提交数据操作
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        var that=this;
        if (valid) {
          if(that.equipId==0){
            let data={
              serial:that.addequip.serial,
              name:that.addequip.name,
              ip:that.addequip.ip,
              state:that.addequip.state,
              password:that.addequip.password
            }
            that.$http.get('/api/attendance_machine/attend_machine_insert_info',{params:data}).then(res=>{
              console.log(res);
              if(res.data.result='success'){
                that.$router.push({path:'/project/equiplist'})
              }
            })
          }else{
            let data={
              name:that.addequip.name,
              state:that.addequip.state,
              id:that.equipId
            }
            that.$http.get('/api/attendance_machine/attent_machine_update',{params:data}).then(res=>{
              console.log(res);
              if(res.data.result='success'){
                // 向设备发送时间
                var myDate = new Date().getTime();
                console.log(myDate);
                let equiptime=that.$qs.stringify({
                  pass:that.timepass,
                  timestamp:myDate
                })
                this.$http.post('/equip/setTime',equiptime,{ headers : { 'Content-Type':'application/x-www-form-urlencoded' }}).then(res=>{
                  console.log(res);
                });           
                that.$router.push({path:'/project/equiplist'});
              }else{
                this.$message.error('更新失败~');
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 设置设备的密码
    equipsubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/equip/setPassWord?oldPass='+this.equipform.oldpass+'&newPass='+this.equipform.newpass,
            {headers:{'ContentType':'application/x-www-form-urlencoded'}}).then(res=>{
            console.log(res);
            if(res.data.data.length>9){
              this.$message.success('设置密码成功');
              let passcontent=res.data.data;
              this.addequip.password=passcontent.split(':')[1];
              console.log(this.addequip.password);
              this.equipVisible=false;
            }else{
              this.$message.error('设置密码失败');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 返回操作
    beback(){
      this.$router.push("/project/equiplist");
    },
    getserial(){
      this.$http.post('/equip/getDeviceKey',{headers:{'ContentType':'application/x-www-form-urlencoded'}}).then(res=>{
        console.log(res);
        if(res.data.msg="获取成功"){
          this.addequip.serial=res.data.data;
        }
      })
    },
  },
  created() {
    this.getserial();
    console.log(this.open);
  },
  mounted() {
    this.equipId=this.$route.query.id;
    if(this.equipId!=0){
      this.$http.post('/api/attendance_machine/select_by_id?id='+this.equipId).then(res=>{
        console.log(res);
        this.addequip=res.data.list;
        this.timepass=res.data.list.password;
        console.log(this.timepass);
        if(res.data.list.state==1){
          res.data.list.state="进场";
          this.addequip.state="1"
        }else{
          res.data.list.state="出场";
          this.addequip.state="2"
        }
      })
    };
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.accredetail {
  width:95%;
  margin: 20px auto;
}
</style>
