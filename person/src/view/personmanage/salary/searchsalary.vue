/*
*salary   查询工人工资 */ 
<template>
  <div class="searchsalary">
    <el-button class="btn btn-default a-insert" @click="backnext" type="text"> 
      <img src="../../../assets/images/back.png" alt="" srcset="" style="width:20px;height:20px;"> 返回</el-button>

    <el-form :inline="true" :model="form" class="listseach" label-width="100px">
      <el-form-item label="发放月份：">
        <el-date-picker v-model="form.balanceDate" type="month" placeholder="选择月"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="listtable">
      <el-table :data="tableData" border style="width: 100%" >
        <el-table-column type="index" label="编号" width="100"></el-table-column>
        <el-table-column prop="usermen" label="姓名" width="100"></el-table-column>
        <el-table-column prop="totalPayAmount" label="应发金额" width="120"></el-table-column>
        <el-table-column prop="actualAmount" label="实发金额" width="120"></el-table-column>
        <el-table-column prop="payRollBankCardNumber" label="工资卡号" width="250"></el-table-column>
        <el-table-column prop="payRollBankName" label="支行名称"></el-table-column>
        <el-table-column prop="payRollBankName" label="开户行名称"></el-table-column>
        <el-table-column prop="isBackPay" label="是否补发" >
          <template slot-scope="scope"> {{scope.row.isBackPay==1?'是':'否'}} </template>
        </el-table-column>
        <!-- <el-table-column prop="zip" label="补发月份">
          <template slot-scope="scope">{{scope.row.backPayMonthTime|formatDate}}</template>
        </el-table-column> -->
        <el-table-column prop="zip" label="发放日期" >
          <template slot-scope="scope">{{scope.row.balanceDateTime|formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemnum"
        layout="prev, pager, next, jumper"
        :total="pagecount"
      ></el-pagination>
    </div>
    <!-- 修改 -->
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
                <el-form-item prop="balanceDateTime">
                  <el-date-picker v-model="modelform.balanceDateTime" style="width:220px;" type="date" placeholder="选择日期"  format="yyyy-MM-dd HH:mm:ss" value-format="timestamp"></el-date-picker>
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

<script type="text/ecmascript-6">
import formatDate from '@/filter/date.js';
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {},
  props: {},
  data() {
    return {
      isyes:[
        {name:'是',type:1},
        {name:'否',type:0},
      ],
      personVisible:false,
      modelform:{
        workerId:'',
        totalPayAmount:'',
        actualAmount:'',
        isBackPay:'',
        balanceDateTime:'',
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
        balanceDateTime:[{ required: true,message: '请选择补发日期', trigger: 'change' }],
        thirdPayRollCode:[{ required: true, message: '请输入第三方工资单编号', trigger: 'blur' },
          {pattern:/^[0-9a-zA-Z]{5,30}$/,message:'请输入正确的第三方工资单编号（5~30个字符）'}
        ],
        isBackPay:[{ required: true, message: '请选择是否为补发', trigger: 'change' }],
        payRollBankCode:[{ required: true, message: '请选择工人工资卡银行代码', trigger: 'change' }]
      },
      itemnum: 8,
      currentPage: 1,
      pagecount: 1,
      form: {
        balanceDate:'',
      },
      personoption: [],
      tableData: [],
      detailId:'',
      timevisible:false,
      modyId:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    backnext(){
      this.$router.go(-1);
    },
    onSubmit() {},
    handleClick(id) {
      this.personVisible=true;
      console.log(id);
      this.modyId=id
      this.$http.get('/api/pay/detail/select?baseId='+this.detailId+'&id='+id,).then(res=>{
        console.log(res);
        this.modelform=res.data.list[0];
        // let leng=res.data.count
        // this.pagecount=leng;
      })
    },
    submitForm() {
      this.getdetail();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      console.log(`当前页: ${val}`);
      that.currentPage = val;
      this.getdetail();
    },
    onSelectedDrug(val){
      console.log(val);
       if(val==0){
          this.timevisible=false;
        }else if(val==1){
          this.timevisible=true;
        }
    },
    getdetail(){
      console.log(this.detailId)
      let data={
        num:this.itemnum,
        page:this.currentPage,
        balanceDate:this.balanceDate,
        baseId:this.detailId
      }
      this.$http.get('/api/pay/detail/select',{params:data}).then(res=>{
        console.log(res);
        this.tableData=res.data.list;
        let leng=res.data.count
        this.pagecount=leng;
      })
    },
    // 修改的提交
    modelesubmit(Fname) {
      this.$refs[Fname].validate((valid) => {
        if (valid) {
          let data={
            id:this.modyId,
            workerId:this.modelform.workerId,
            totalPayAmount:this.modelform.totalPayAmount,
            actualAmount:this.modelform.actualAmount,
            isBackPay:this.modelform.isBackPay,
            balanceDateTime:this.modelform.balanceDateTime,
            backPayMonthTime:this.modelform.backPayMonthTime,
            usermen:this.modelform.usermen,
            thirdPayRollCode:this.modelform.thirdPayRollCode,
            baseId:this.detailId
          }
          this.$http.get('/api/pay/roll/updateDetail',{params:data}).then(res=>{
            console.log(res);
            if(res.data.result=="success"){
              this.personVisible=false;
            }else{
              this.$message.error('修改失败~')
            }
          })
        }
      })
    }
  },
  created() {
    this.detailId=this.$route.query.id;
  },
  mounted() {
    this.getdetail();
    this.$http.get('/api/user/user_select').then(res=>{
        this.personoption=res.data.list;
    });
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.searchsalary {
  width: 95%;
  margin: 0 auto;
  padding-top: 20px;
  .boxInput{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
  }
}
</style>
