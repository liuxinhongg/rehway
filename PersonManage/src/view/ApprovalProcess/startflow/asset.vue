<template>
  <div class="asset">
    <p class="persontop" style="margin-bottom:20px;">资产申请-未结流程</p>
    <el-form :inline="true" :model="atopform" class="demo-form-inline">
      <el-form-item>
        <span>资产名称：</span><el-input v-model="atopform.ywlc" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <span>申请时间：</span><el-input v-model="atopform.date" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <span>申请人：</span>
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
    <div class="alldid">
      <el-table :data="undidData" border style="width: 100%" >
        <el-table-column type="index" width="100" label="序号"></el-table-column>      
        <el-table-column label="标题">
          <template slot-scope="scope"> 
            <router-link :to="{path:'/project/detailapprove?id='+scope.row.id}">{{scope.row.name}}</router-link>              
          </template>
        </el-table-column>
        <el-table-column prop="date" label="创建时间" sortable></el-table-column>
        <el-table-column prop="num" label="数量" sortable></el-table-column>
        <el-table-column prop="status" label="状态" sortable column-key="status" :filter-method="filterHandler"
            :filters="[{text: '运行中', value: '01'}, {text: '审批中', value: '02'},]"></el-table-column>
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
    <el-dialog title="资产申请" :visible.sync="leavevisible" center width="45%">
      <el-form :model="assetform" :rules="rules" ref="assetform" class="demo-assetform">
        <table border="1" class="tableinsert" style="width:95%;">
            <tr>
                <td class="tdleft">姓名：</td>
                <td> {{username}} </td>
                <td class="tdleft">所在班组：</td>
                <td>{{ teamName }}</td>
            </tr>
            <tr>
                <td class="tdleft">领用人：</td>
                <td>
                  <el-form-item prop="name">
                      <el-select v-model="assetform.name" style="width:280px">
                        <el-option v-for="(item,index) in depoption" :key="index" :value="item.departmentId" :label="item.departmentName"> 
                        </el-option>
                      </el-select>
                    </el-form-item>
                </td>
                <td class="tdleft">资产名称：</td>
                <td>
                    <el-form-item prop="designation">
                      <el-input v-model="assetform.designation" style="width:100%"></el-input>
                    </el-form-item>
                </td> 
            </tr>
            <tr>
                <td class="tdleft">数量：</td>
                <td>
                    <el-form-item prop="num">
                      <el-input v-model="assetform.num" type="number" style="width:100%"></el-input>
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
                <td class="tdleft">负责人：</td>
                <td colspan="3">
                    <el-form-item prop="mainperson">
                        <el-select v-model="assetform.mainperson" style="width:280px">
                            <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
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
            <el-button @click="leavevisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as personapi from '@/api/usercenter.js'
export default {
  data() {
    return {
      currentPage: 1,
      leavevisible:false,
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
          num:12,
          id: 11
        },
        {
          businessKey: "364979951697920",
          name: "资产申请-临远-2019-03-19 14:28",
          processDefinitionId: "资产申请",
          date: "2019-03-20 09:22:01",
          status: "运行中",
          num:5,
          id: 12
        }
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
      this.leavevisible=true;
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
.asset {
  width: 90%;
  margin: auto;
  .alldid {
    width: 100%;
    height: calc(100vh - 235px);
    .el-table__column-filter-trigger i{
      color: #efefef;
      font-size: 17px;
    }
  }
}
</style>
<style>
.asset .el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar__wrap {
  margin-right: 0;
}
</style>
