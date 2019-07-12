/* 新增工资表单 */
<template>
  <div class="addsalary">
    <p class="persontop">工资发放</p>
    <el-table :data="searchResult" class="searchresule" border v-show="!twoOption">
      <el-table-column label="班组" sortable>
        <template slot-scope="scope">
          <p @click="choose(scope.row.teamSysNo)">{{scope.row.teamName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="发放月份">
        <template slot-scope="scope"> {{ scope.row.payMonth | formatDate}} </template>
      </el-table-column>
    </el-table>
    <div style="height:calc(100vh - 85px);">
      <el-scrollbar style="height:100%;">
        <el-form :model="addpersondata" ref="addpersondata" :rules="rules" @submit.native.prevent 
          class="addsalaryform">
          <table border="1" class="tableinsert" style="width:95%;">
            <tr>
                <td class="tdleft">班组编号：</td>
                <td> 
                  <el-form-item prop="teamId" v-show="!twoOption">
                    <el-input v-model="addpersondata.teamId"  disabled></el-input>
                  </el-form-item>
                  <el-form-item prop="teamId" v-show="twoOption">
                    <el-select v-model="addpersondata.teamId" style="width:100%;">
                      <el-option v-for="(item,index) in team_info" :key="index" :value="item.teamId" :label="item.teamName"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft">发放月份：</td>
                <td>
                  <el-form-item prop="payMonthTime" v-show="!twoOption">
                    <el-input v-model="addpersondata.payMonthTime"  disabled></el-input>
                  </el-form-item>
                  <el-form-item prop="payMonthTime" v-show="twoOption">
                    <el-date-picker v-model="addpersondata.payMonthTime" type="month" placeholder="选择月份" format="yyyy 年 MM 月 dd 日"  value-format="timestamp"></el-date-picker>
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">证件类型：</td>
                <td> 
                  <el-form-item prop="idCardType">
                    <el-select v-model="addpersondata.idCardType" style="width:100%;">
                      <el-option v-for="(item,index) in card_type" :key="index" :label="item.idcard" :value="item.idcardtype"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft">证件号码：</td>
                <td>
                  <el-form-item prop="idCardNumber">
                    <el-input v-model="addpersondata.idCardNumber"  ></el-input>
                  </el-form-item>
                </td>
            </tr>
            <tr>
              <td class="tdleft">工人工资卡号：</td>
              <td> 
                <el-form-item prop="payRollBankCardNumber">
                  <el-input v-model="addpersondata.payRollBankCardNumber"  ></el-input>
                </el-form-item>
              </td>
              <td class="tdleft">工人工资卡开户行名称：</td>
              <td>
                <el-form-item prop="payRollBankName">
                  <el-input v-model="addpersondata.payRollBankName" ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft">工人工资卡银行代码：</td>
              <td> 
                <el-form-item prop="payRollBankCode">
                  <el-select v-model="addpersondata.payRollBankCode" style="width:100%;">
                    <el-option v-for="(item,index) in bank_info" :key="index" :label="item.bank" :value="item.banktype"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td class="tdleft">工资代发银行代码：</td>
              <td>
                <el-form-item prop="payBankCode">
                  <el-select v-model="addpersondata.payBankCode" style="width:100%;">
                    <el-option v-for="(item,index) in bank_info" :key="index" :label="item.bank" :value="item.banktype"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft">工资代发银行卡号：</td>
              <td> 
                <el-form-item prop="payBankCardNumber">
                  <el-input v-model="addpersondata.payBankCardNumber" ></el-input>
                </el-form-item>
                
              </td>
              <td class="tdleft">工资代发开户行名称：</td>
              <td>
                <el-form-item prop="payBankName">
                  <el-input v-model="addpersondata.payBankName" ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft">应发金额：</td>
              <td> 
                <el-form-item prop="totalPayAmount">
                  <el-input v-model="addpersondata.totalPayAmount" ></el-input>          
                </el-form-item>
              </td>
              <td class="tdleft">实发金额：</td>
              <td>
                <el-form-item prop="actualAmount">
                  <el-input v-model="addpersondata.actualAmount" ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft">是否为补发：</td>
              <td> 
                <el-form-item prop="isBackPay">
                  <el-select v-model="addpersondata.isBackPay"  @change="onSelectedDrug($event)" style="width:100%;">
                    <el-option value="1" label="是"></el-option>
                    <el-option value="0" label="否"></el-option>
                  </el-select> 
                </el-form-item>
              </td>
              <td class="tdleft">发放日期：</td>
              <td>
                <el-form-item prop="balanceTime">
                  <el-date-picker v-model="addpersondata.balanceTime" type="date" style="width:100%;" placeholder="选择日期"  format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft">补发月份：</td>
              <td> 
                <el-form-item prop="backPayMonthTime" v-show="timevisible">
                  <el-date-picker v-model="addpersondata.backPayMonthTime" style="width:100%;" type="month" placeholder="选择月份"  format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
                </el-form-item>
              </td>
              <td class="tdleft">第三方工资单编号：</td>
              <td>
                <el-form-item label="" prop="thirdPayRollCode">
                  <el-input v-model="addpersondata.thirdPayRollCode" ></el-input>          
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
      passonId:0,
      searchResult:[],
      activeNames: ['1'],
      twoOption:true,
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
      addpersondata: {
        payMonthTime:'',
        teamId:'',
        idCardNumber:'',
        idCardType:'',
        payRollBankCardNumber:'',
        payRollBankName:'',
        payBankCardNumber:'',
        payBankCode:'',
        payBankName:'',
        totalPayAmount:'',
        actualAmount:'',
        balanceTime:'',
        thirdPayRollCode:'',
        payRollBankCode:'',
        backPayMonthTime:'',
        isBackPay:'',
        workerId:'',
        data:'',
        address:'',
        size:'',
      },
      rules:{
        payMonthTime:[{ required: true, message: '选择发放月份', trigger: 'change' }],
        teamId:[{ required: true, message: '请输入班组编号：', trigger: 'blur' }],
        idCardNumber:[{ required: true, message: '请输入证件号码：', trigger: 'blur' }],
        idCardType:[{ required: true, message: '请选择证件类型', trigger: 'change' }],
        payRollBankCardNumber:[{ required: true, message: '请输入工人工资卡号', trigger: 'blur' }],
        payRollBankName:[{ required: true, message: '请输入工人工资卡开户行名称', trigger: 'blur' }],
        payBankCardNumber:[{ required: true, message: '请输入工资代发银行卡号', trigger: 'blur' }],
        payBankCode:[{ required: true, message: '请选择工资代发银行代码', trigger: 'change' }],
        payBankName:[{ required: true, message: '请输入工资代发开户行名称', trigger: 'blur' }],
        totalPayAmount:[{ required: true, message: '请输入应发金额', trigger: 'blur' }],
        actualAmount:[{ required: true, message: '请输入实发金额', trigger: 'blur' }],
        balanceTime:[{ required: true,message: '请选择补发日期', trigger: 'change' }],
        thirdPayRollCode:[{ required: true, message: '请输入第三方工资单编号', trigger: 'blur' }],
        isBackPay:[{ required: true, message: '请选择是否为补发', trigger: 'change' }],
        payRollBankCode:[{ required: true, message: '请选择工人工资卡银行代码', trigger: 'change' }]
      },
      salaryId:0,
    };
  },
  watch: {},
  computed: {},
  methods: {
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
    handleDoIt(param){
      this.addpersondata.filepath=param.file;
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.salaryId==0){
            let data={
              payMonthTime:this.addpersondata.payMonthTime,
              balanceTime:this.addpersondata.balanceTime,
              teamId:this.addpersondata.teamId,
              payBankCode:this.addpersondata.payBankCode,
              payBankName:this.addpersondata.payBankName,
              payBankCardNumber:this.addpersondata.payBankCardNumber,
              payRollBankCardNumber:this.addpersondata.payRollBankCardNumber,
              payRollBankCode:this.addpersondata.payRollBankCode,
              payRollBankName:this.addpersondata.payRollBankName,
              totalPayAmount:this.addpersondata.totalPayAmount,
              actualAmount:this.addpersondata.actualAmount,
              isBackPay:this.addpersondata.isBackPay,
              thirdPayRollCode:this.addpersondata.thirdPayRollCode,
              idCardType:this.addpersondata.idCardType,
              idCardNumber:this.addpersondata.idCardNumber,
              backPayMonthTime:this.addpersondata.backPayMonthTime,
              baseId:this.passonId
            };
            this.$http.get('/api/pay/insert',{params:data}).then(res=>{
              console.log(res);
              if(res.data.result=="success"){
                this.$router.push({path:'/project/searchsalary'});
              }else if(res.data.result=="error"){
                this.$message.error('数据提交失败');
              }
            })
          }else{
            console.log('我是编辑页面~');
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
    regetdata(){
      this.$http.post('/api/pay/base/select_can_add').then(res=>{
        console.log(res);
        this.searchResult=res.data.list;
        if(res.data.list.length>0){
          this.twoOption=false;
        }else{
          this.twoOption=true;
        }
      })
    }
  },
  created() {},
  mounted() {
    this.regetdata();
    this.salaryId=this.$route.query.id;
    console.log(this.salaryId);
    if(this.salaryId!=0){
      console.log("我现在是编辑页面");
      let data={
        id:this.salaryId,
        page:1,
        itemnum:0,
        cardNumber:'',
        payMonthTime:'',
      };
      this.$http.get('/api/pay/select',{params:data}).then(res=>{
        // console.log(res);
        this.tableData=res.data.list;
        this.pagecount=res.data.count;
      })
    }
    //证件类型card_type:[],
    this.$http.post('/api/dict/id_type').then(res=>{
      // console.log(res);
      this.card_type=res.data
    });
    //班组
    this.$http.post('/api/team/team_select_list').then(res=>{
      console.log(res);
      this.team_info=res.data
    });
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
      width: 75%;
      margin: 20px 40px;
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
