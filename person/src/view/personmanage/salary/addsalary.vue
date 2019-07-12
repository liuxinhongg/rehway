/* 新增工资表单 */
<template>
  <div class="addsalary">
    <p class="persontop">工资发放</p>
    <div style="height:calc(100vh - 85px);">
      <el-scrollbar style="height:100%;">
        <el-form :model="addpersondata" ref="addpersondata" :rules="rules" @submit.native.prevent class="addsalaryform">
          <table border="1" class="tableinsert">
            <tr>
                <td class="tdleft" colspan="1">班组编号：</td>
                <td colspan="2"> 
                  <el-form-item prop="teamSysNo" >
                    <el-select v-model="addpersondata.teamSysNo" style="width:280px;">
                      <el-option v-for="(item,index) in team_info" :key="index" :value="item.teamId" :label="item.teamName"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft" colspan="1">发放月份：</td>
                <td colspan="3">
                  <el-form-item prop="payMonthTime"  >
                    <el-date-picker v-model="addpersondata.payMonthTime" style="width:280px;" type="month" placeholder="选择月份" format="yyyy-MM-dd"  value-format="timestamp"></el-date-picker>
                  </el-form-item>
                </td>
            </tr>
            <tr v-if="salaryId==0">
              <td colspan="6" style="text-align:center;font-size:18px;font-family: '楷体';border-right: none !important;">人员工资清单</td>
              <td colspan="1" style="text-align:right;border-left: none !important;">
                <el-button style="text-align:right;margin-right:10px;" type="primary" @click="adduser()" >+员工</el-button>
              </td>
            </tr>
            <tr v-if="doubledata.length>0">
              <td style="text-align:center;" >编号</td>
              <td style="text-align:center;width:150px;">姓名</td>
              <td style="text-align:center;" >应发工资（元）</td>
              <td style="text-align:center;" >实发工资（元）</td>
              <td style="text-align:center;" >实发补发</td>
              <td style="text-align:center;">补发日期</td>
              <td style="text-align:center;">补发月份</td>
            </tr>
            <tr v-for="(item,index) in doubledata" :key='index'>
              <td style="text-align:center;" >{{index+1}}</td>
              <td style="text-align:center;" >{{item.usermen}}</td>
              <td style="text-align:center;" >{{item.totalPayAmount}}</td>
              <td style="text-align:center;" >{{item.actualAmount}}</td>
              <td style="text-align:center;" >{{item.isBackPay==1?'是':'否'}}</td>
              <td style="text-align:center;" >{{item.balanceTime | formatDate}}</td>
              <td style="text-align:center;" >{{ item.backPayMonthTime | formatDate}}</td>
            </tr>
            <tr  v-if="salaryId==0">
              <!-- <tr> -->
              <td class="tdleft" colspan='1'>附件：</td>
              <td colspan='6'>
                <el-form-item>
                  <el-upload class="upload-demo" action :http-request="getaddfile" >
                    <el-button size="small" type="primary">上传附件</el-button>
                  </el-upload>
                </el-form-item>
              </td>
            </tr>
          </table>
          <el-form-item style="text-align:center;" >
            <el-button type="primary" native-type="submit" @click="submitForm('addpersondata')">确 定</el-button>
            <el-button @click="resetForm()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <el-dialog title="人员工资表单" :visible.sync="personVisible" center>
        <el-form :model="modelform" ref="modelform" :rules="modelrules" @submit.native.prevent>
          <table border="1" class="tableinsert" style="width:95%;">
            <tr>
              <td class="tdleft">姓名：</td>
              <td>
                <el-form-item prop="workerId">
                  <el-select v-model="modelform.workerId" style="width:220px">
                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td class="tdleft">应发金额：</td>
              <td> 
                <el-form-item prop="totalPayAmount">
                  <el-input v-model.trim="modelform.totalPayAmount" style="width:220px;" placeholder="请输入应发金额"></el-input> （元）       
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft">实发金额：</td>
              <td>
                <el-form-item prop="actualAmount">
                  <el-input v-model.trim="modelform.actualAmount" style="width:220px;" placeholder="请输入实发金额"></el-input>（元）
                </el-form-item>
              </td>
              <td class="tdleft">是否为补发：</td>
              <td> 
                <el-form-item prop="isBackPay">
                  <el-select v-model="modelform.isBackPay"  @change="onSelectedDrug($event)" style="width:220px;">
                    <el-option :value="item.type" :label="item.name" v-for="(item,index) in isyes" :key="index"></el-option>
                  </el-select> 
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft">发放日期：</td>
              <td>
                <el-form-item prop="balanceTime">
                  <el-date-picker v-model="modelform.balanceTime" style="width:220px;" type="date" placeholder="选择日期"  format="yyyy-MM-dd HH:mm:ss" value-format="timestamp"></el-date-picker>
                </el-form-item>
              </td>
              <td class="tdleft">补发月份：</td>
              <td> 
                <el-form-item prop="backPayMonthTime" v-show="timevisible">
                  <el-date-picker v-model="modelform.backPayMonthTime" style="width:220px;" type="month" placeholder="选择月份"  format="yyyy-MM-dd HH:mm:ss" value-format="timestamp"></el-date-picker>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft">工资单编码：</td>
              <td>
                <el-form-item prop="thirdPayRollCode">
                  <el-input v-model.trim="modelform.thirdPayRollCode" style="width:220px;" placeholder="请输入工资单编码"></el-input>
                </el-form-item>
              </td>
              <td class="tdleft"></td>
              <td> 
              </td>
            </tr>
          </table>
          <el-form-item style="text-align:center;">
            <el-button type="primary" native-type="submit" @click="modelesubmit('modelform')">提交</el-button>
            <el-button @click="personVisible=false">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>
<script >
import formatDate from '@/filter/date.js';
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  props: {},
  data() {
    return {
    isyes:[
        {name:'是',type:1},
        {name:'否',type:0},
      ],
      fileList:{},
      passonId:0,
      personVisible:false,
      personoption:[],
      // searchResult:[],
      activeNames: ['1'],
      timevisible:true,
      card_type:[],//证件类型
      team_info:[],//班组信息
      bank_info:[],//银行卡代码
      user_info:[],//用户信息
      // 绑定的职位id
      person_postId:'',
      statusoption:[],
      departOption:[],
      twostatusoption:[],
      dialogImageUrl: "",
      renewId:'',
      modelform:{
        workerId:'',
        totalPayAmount:'',
        actualAmount:'',
        isBackPay:'',
        balanceTime:'',
        backPayMonthTime:'',
        usermen:'',
        thirdPayRollCode:'',
      },
      modelrules:{
        workerId:[{ required: true, message: '请选择员工', trigger: 'change' }],
        totalPayAmount:[{ required: true, message: '请输入应发金额', trigger: 'blur' },
          {pattern:/^[1-9]{1}[0-9]{0,10}$/,message:'请输入正确的金额数（1~11个字符）'}
        ],
        actualAmount:[{ required: true, message: '请输入实发金额', trigger: 'blur' },
          {pattern:/^[1-9]{1}[0-9]{0,10}$/,message:'请输入正确的金额数（1~11个字符）'}
        ],
        balanceTime:[{ required: true,message: '请选择补发日期', trigger: 'change' }],
        thirdPayRollCode:[{ required: true, message: '请输入第三方工资单编号', trigger: 'blur' },
          {pattern:/^[0-9a-zA-Z]{5,30}$/,message:'请输入正确的第三方工资单编号（5~30个字符）'}
        ],
        isBackPay:[{ required: true, message: '请选择是否为补发', trigger: 'change' }],
        payRollBankCode:[{ required: true, message: '请选择工人工资卡银行代码', trigger: 'change' }]
      },
      addpersondata: {
        teamSysNo:'',
        payMonthTime:'',
        teamId:'',
      },
      rules:{
        payMonthTime:[{ required: true, message: '选择发放月份', trigger: 'change' }],
        teamSysNo:[{ required: true, message: '请输入班组编号：', trigger: 'blur' }],
      },
      salaryId:0,
      userdetail:0,
      doubledata:[],
      salaryform:new FormData()
    };
  },
  watch: {},
  computed: {},
  methods: {
    adduser(){
      this.personVisible=true;
      this.modelform={};
    },
    modelesubmit(Fname) {
      this.$refs[Fname].validate((valid) => {
        if (valid) {
          if (this.userdetail == 0) {
            // if (this.modId == 0) {
                // console.log(this.modelform.declare);
                this.doubledata.push(this.modelform);
                console.log(this.doubledata)
                if (this.doubledata.length != 0) {
                  console.log(this.personoption);
                    for (let item in this.personoption) {
                      // console.log(item)
                        if (this.modelform.workerId == this.personoption[item].workerId) {
                            this.modelform.usermen = this.personoption[item].workerName;
                        }
                    }
                }
                this.personVisible = false;
            // } else {
                // console.log("我是编辑");
                // for (let val in this.doubledata) {
                //     if (this.doubledata[val].id == this.modId) {
                //     this.doubledata[val].mname = this.modelform.mname;
                //     }
                // }
                // for (let item in (this.doubledata,  this.doubledata,  this.localoption)) {
                //         if (this.modelform.mmid == this.doubledata[item].id) {
                //             this.modelform.mmidName = this.doubledata[item].mname;
                //         }
                //         if(this.localoption[item].repoid==this.modelform.repoId){
                //             this.modelform.repoIdName= this.localoption[item].reponame;
                //         }
                //     }
                // this.personVisible = false;
            // }
          } else {
            let as = Fname
            // console.log("我是编辑");
            let formlist =  new FormData();
            Fname = JSON.stringify([Fname]);        
            formlist.append('list',Fname)
            this.$http.post(material.maprlistupdate,  formlist ).then(res => {
                  console.log(res);
                  if(res.data.result == 'success'){
                    this.$http
                      .get(material.mapproachselectBy, { params: { aprid: this.saftplanId } })
                      .then(res => {
                        console.log(res);
                        this.saftplanform = res.data.list[0];
                        this.doubledata = res.data.list[0].mAprList;//ifacpt
                        if(typeof(res.data.list[0])=='number'){
                          this.saftplanform.ifacpt = res.data.list[0].ifacpt.toString();
                        };
                      });
                  }
            });
              this.personVisible = false;
          }
        }
      })
    },
    handleChange(val) {
      console.log(val);
    },
    // 工资是否发放
    onSelectedDrug(val){
      console.log(val);
       if(val==0){
          this.timevisible=false;
        }else if(val==1){
          this.timevisible=true;
        }
    },
    // 上传附件
    getaddfile(param){
      this.fileList=param;
      console.log(this.fileList)
      this.salaryform.append('filepaths',param.file)
    },
    //提交表单
    submitForm(formName) {
      let timestr='';
          timestr=this.addpersondata.payMonthTime
          console.log(timestr);
          console.log(typeof(this.addpersondata.payMonthTime));
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.salaryId==0){
            if(this.fileList==''){
              this.$message.error('文件不能为空，请传入文件，后期不可修改');
            }
            this.salaryform.append('teamSysNo',this.addpersondata.teamSysNo)
            this.salaryform.append('payMonthTime',timestr)
            this.salaryform.append('payrollDetailInfos',JSON.stringify(this.doubledata))
            this.$http.post('/api/pay/roll/insert',this.salaryform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
              console.log(res);
              if(res.data.result=="success"){
                this.$router.push({path:'/project/searchsalary'});
              }else if(res.data.result=="error"){
                this.$message.error('数据提交失败');
              }
            })
          }else{
            let data={
              id:this.salaryId,
              teamSysNo:this.addpersondata.teamSysNo,
              payMonthTime:timestr
            }
            this.$http.get('/api/pay/roll/updateBase',{params:data}).then(res=>{
              console.log(res);
              if(res.data.result=="success"){
                this.$router.push({path:'/project/searchsalary'});
              }else if(res.data.result=="error"){
                this.$message.error('数据提交失败');
              }
            })
          }
          console.log('submit!!');
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(){
      this.$router.push({path:'/project/searchsalary'})
    },
    choose(id){
      this.passonId=id;
      this.$http.get('/api/pay/base/select_by_id?id='+id).then(res=>{
        console.log(res);
        this.addpersondata.teamId=res.data.result[0].teamName;
        this.addpersondata.payMonthTime=res.data.result[0].payMonth;
      })
    },
    // 记录添加数据的接口
    // regetdata(){
    //   this.$http.post('/api/pay/base/select_can_add').then(res=>{
    //     console.log(res);
    //     this.searchResult=res.data.list;
    //     if(res.data.list.length>0){
    //       this.twoOption=false;
    //     }else{
    //       this.twoOption=true;
    //     }
    //   })
    // },

  },
  created() {},
  mounted() {
    // this.regetdata();
    this.salaryId=this.$route.query.id;
    this.$http.get('/api/user/user_select').then(res=>{
        this.personoption=res.data.list;
    })
    console.log(this.salaryId);
    if(this.salaryId!=0){
      console.log("我现在是编辑页面");
      this.$http.get('/api/pay/base/select_by_id?baseId='+this.salaryId).then(res=>{
        console.log(res);
        this.addpersondata=res.data.list[0];
      })
      // this.$http.get('/api/pay/select',{params:data}).then(res=>{
      //   // console.log(res);
      //   this.tableData=res.data.list;
      //   this.pagecount=res.data.count;
      // })
    }
    //证件类型card_type:[],
    this.$http.post('/api/dict/id_type').then(res=>{
      // console.log(res);
      this.card_type=res.data
    });
    //班组
    this.$http.get('/api/team/team_select_bycode').then(res=>{
        console.log(res);
        this.team_info=res.data.list;
    })
    // 工资卡银行代码
    this.$http.post('/api/dict/bank').then(res=>{
      this.bank_info=res.data;
      // console.log(res);
    });
    
  }
};
</script>
<style lang="scss">
.addsalary{
    height: 100%;
    .addsalaryform{
      width: 85%;
      margin: 20px auto;
      .itemInput{
        width: 50%;
      }
    }
    .searchresule{
      width:15%;
      margin:auto;
      position: absolute;
      top: 120px;
      right:3%;
      z-index: 22;
    }
}
.addsalary .el-scrollbar__wrap {
   overflow-x: hidden;
}
</style>
