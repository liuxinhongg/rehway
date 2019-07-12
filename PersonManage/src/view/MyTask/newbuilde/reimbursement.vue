<template>
  <div class="reimbursement">
    <p class="persontop" style="margin-bottom:20px;">个人报销-未结流程</p>
    <el-form :inline="true" :model="atopform" style="width:90%;margin:auto;">
      <el-form-item>
        <span>负&nbsp;&nbsp;责&nbsp;&nbsp;人：</span>
        <el-form-item prop="mainperson">
            <el-select v-model="atopform.mainperson">
                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                </el-option>
            </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <span>报销人员：</span>
        <el-form-item prop="mainperson">
            <el-select v-model="atopform.mainperson">
                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                </el-option>
            </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <span>报销金额：</span><el-input v-model="atopform.money" style="width:200px;" placeholder="报销金额"></el-input>
      </el-form-item>
      <el-form-item>
        <span>申请时间：</span><el-date-picker type="datetime" v-model="atopform.date" style="width:200px;" placeholder="选择时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <span>报销类型：</span>
        <el-form-item prop="mainperson">
            <el-select v-model="atopform.mainperson">
                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                </el-option>
            </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="success" @click="adddata">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-scrollbar style="height:100%;">
      <div class="alldid">
        <el-table :data="undidData" border style="width: 100%" >
          <el-table-column type="index" width="100" label="序号"></el-table-column>      
          <el-table-column label="标题">
            <template slot-scope="scope"> 
              <router-link :to="{path:'/project/detailapprove?id='+scope.row.id}">{{scope.row.name}}</router-link>              
            </template>
          </el-table-column>
          <el-table-column prop="fzperson" label="负责人" sortable width="150"></el-table-column>
          <el-table-column prop="fzyg" label="报销人员" sortable width="150"></el-table-column>
          <el-table-column prop="date" label="创建时间" sortable></el-table-column>
          <el-table-column label="报销金额（￥）" sortable>
            <template slot-scope="scope"> {{scope.row.moneynum|NumFormat}} </template>
          </el-table-column>
          <!-- <el-table-column prop="status" label="报销类型" sortable column-key="status" :filter-method="filterHandler" width="150"
              :filters="[{text: '运行中', value: '01'}, {text: '审批中', value: '02'},]">
          </el-table-column> -->
          <el-table-column prop="status" label="报销类型" sortable width="200">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <router-link to> 
                <span style="color:#E6A23C"><i class="iconfont iconcancle"></i> 撤回</span> 
              </router-link>
              <router-link :to="{path:'/project/detailapprove?id='+scope.row.id}">
              <el-button type="text" icon="el-icon-info">详情</el-button> 
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-scrollbar>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="1"
      ></el-pagination>
    </div>
    <el-dialog title="个人报销" :visible.sync="reimbvisible" center width="45%">
      <el-form :model="assetform" :rules="rules" ref="assetform" class="demo-assetform">
        <table border="1" class="tableinsert" style="width:95%;">
            <tr>
                <td class="tdleft">姓名：</td>
                <td> {{username}} </td>
                <td class="tdleft">所在班组：</td>
                <td>{{ teamName }}</td>
            </tr>
            <tr>
                <td class="tdleft">报销人名称：</td>
                <td>
                  <el-form-item prop="name">
                      <el-select v-model="assetform.name" style="width:280px">
                        <el-option v-for="(item,index) in depoption" :key="index" :value="item.departmentId" :label="item.departmentName"> 
                        </el-option>
                      </el-select>
                    </el-form-item>
                </td>
                <td class="tdleft">报销金额：</td>
                <td>
                    <el-form-item prop="designation">
                      <el-input v-model="assetform.designation" type="number" style="width:100%"></el-input>
                    </el-form-item>
                </td> 
            </tr>
            <tr>
                <td class="tdleft">报销类型：</td>
                <td>
                    <el-form-item prop="dep">
                        <el-select v-model="assetform.dep" style="width:280px">
                            <el-option v-for="(item,index) in depoption" :key="index" :value="item.departmentId" :label="item.departmentName"> 
                            </el-option>
                        </el-select>
                    </el-form-item>
                </td>
                <td class="tdleft">所在部门：</td>
                <td>
                    <el-form-item prop="dep">
                        <el-select v-model="assetform.dep" style="width:280px">
                            <el-option v-for="(item,index) in depoption" :key="index" :value="item.departmentId" :label="item.departmentName"> 
                            </el-option>
                        </el-select>
                    </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">申请原因：</td>
                <td colspan="3">
                    <el-form-item prop="cause">
                        <el-input type="textarea" :rows="2" v-model="assetform.cause"></el-input>
                    </el-form-item>
                </td> 
            </tr>
        </table>
        <el-form-item style="text-align:center;">
            <el-button @click="submitForm('assetform')" type="primary">提交数据</el-button>
            <el-button @click="resetForm()">保存草稿</el-button>
            <el-button @click="reimbvisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as personapi from '@/api/usercenter.js'
import Vue from 'vue' 
  Vue.filter('NumFormat', function(value) {
			if(!value) return '0.00';
			/*原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1，感谢Nils指正*/
			var intPart =  Number(value)|0; //获取整数部分
			var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

			var floatPart = ".00"; //预定义小数部分
			var value2Array = value.split(".");

			//=2表示数据有小数位
			if(value2Array.length == 2) {
				floatPart = value2Array[1].toString(); //拿到小数部分

				if(floatPart.length == 1) { //补0,实际上用不着
					return intPartFormat + "." + floatPart + '0';
				} else {
					return intPartFormat + "." + floatPart;
				}
			} else {
				return intPartFormat + floatPart;
			}
	});
export default {
  data() {
    return {
      currentPage: 1,
      reimbvisible:false,
      atopform: {
        ywlc: "",
        date:'',
        mainperson:'',
      },
      undidData: [
        {
          businessKey: "366093996195840",
          name: "请假流程-临远-2019-03-20 09:22",
          processDefinitionId: "请假流程",
          date: "2019-03-20 09:22:01",
          status: "运行中",
          id: 11,
          fzperson:'小白',
          fzyg:'张三',
          moneynum:'123'
        },
        {
          businessKey: "364979951697920",
          name: "资产申请-临远-2019-03-19 14:28",
          processDefinitionId: "资产申请",
          date: "2019-03-20 09:22:01",
          status: "运行中",
          id: 12,
          fzperson:'小黑',
          fzyg:'李四',
          moneynum:'323'
        },
        {
          businessKey: "364979951697920",
          name: "资产申请-临远-2019-03-19 14:28",
          processDefinitionId: "资产申请",
          date: "2019-03-20 09:22:01",
          status: "审批中",
          id: 15,
          fzperson:'小红',
          fzyg:'王五',
          moneynum:'1321'
        },
      ],
      assetform: {
        resource: "",
        daylength: "",
        date2: "",
        cause:'',
        dep:'',
        name:'',
        num:'',
        mainperson:'',
        designation:'',
      },
      rules: {
        resource: [
             { required: true, message: "请输入请假类型", trigger: "change" }
        ],
        dep: [
            { required: true, message: '请选择部门', trigger: 'change' }
        ],
        mainperson: [
        { required: true, message: '请选择负责人', trigger: 'change' }
        ],
        daylength: [
            { type: 'date', required: true, message: '请输入时长', trigger: 'blur' }
        ],
        cause: [
           { required: true, message: "请输入请假原因", trigger: "change" }
        ], 
      },
      username:'',
      teamName:'',
      depoption:[],//部门
      personoption:[],//人员信息
    };
  },
  methods: {
    //新增
    adddata(){
      this.reimbvisible=true;
    },
    // 过滤状态
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
    },
    // 查询
    searchSubmit() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 弹框提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //未结流程
          let leaveform=new FormData();
          leaveform.append('',this.assetform.username)
          this.$http.post(usercenter.leav,leaveform).then(res=>{
            console.log(res);
          })
          // this.$router.push({path:'/project/undided',query:{id:this.assetform}});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
          this.$router.push({path:'/project/draftbox'});//草稿
    },
    // 获取部门
    getdep(){
        this.$http.get('/api/dep/selectBy').then(res=>{
            // console.log(res);
            this.depoption=res.data.list;
        })
    },
    getperson(){
        this.$http.get('/api/user/user_select').then(res=>{
            console.log(res);
            this.personoption=res.data.list;
        })
    }
    
  },
  created() {},
  mounted() {
      this.getdep();
      this.getperson();
      this.username=localStorage.getItem('username');
      this.teamName=localStorage.getItem('teamName');
  },
};
</script>

<style lang="scss">
.reimbursement {
  width: 100%;
  height: calc(100vh - 300px);  
  .alldid {
    width: 90%;
    margin: auto;
    .el-table__column-filter-trigger i{
      color: #efefef;
      font-size: 17px;
    }
  }
}
</style>
<style>
.reimbursement .el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar__wrap {
  margin-right: 0;
}
</style>
