<template>
  <div class="contractors">
    <!-- 搜索 -->
    <el-form :inline="true" :model="contractform" class="demo-form-inline">
      <el-form-item label="分包项目编码：">
        <!-- <el-input v-model.trim="contractform.prjCode" placeholder="项目编码"></el-input> -->
        <el-select v-model="contractform.prjCode">
          <el-option :label="item.builderLicensesName" :value="item.id" :key="index" v-for="(item,index) in projoption"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参见单位编码：">
        <el-input v-model.trim="contractform.subId" placeholder="项目编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button @click="contraVisible=true" type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表显示信息 -->
    <div class="alltable">
      <el-scrollbar style="height:100%;">
        <el-table :data="trainData" border style="width: 100%" >
          <el-table-column type="index" width="120" label="序号"></el-table-column>  
          <el-table-column prop="corpName" label="企业名称">
            <template slot-scope="scope">
              <el-tooltip trigger="hover" placement="top">
                <div slot="content">{{ scope.row.corpName }}</div>
                <div class="boxInput">{{ scope.row.corpName }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="builderLicensesName" label="分包项目"></el-table-column>
          <el-table-column prop="corpCode" label="组织机构代码"></el-table-column>
          <el-table-column prop="corpName" label="企业名称"></el-table-column> 
          <el-table-column prop="corpTypeName" label="参建类型"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.sub_id)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemnum"
        layout="prev, pager, next, jumper"
        :total="countnum"
      ></el-pagination>
    </div>
    <el-dialog title="新增参见单位" :visible.sync="contraVisible" width="50%" center class="visiblerole">
      <el-form :model="addcontract" ref="addcontract" :rules="rule">
        <table border="1" class="tableinsert" >
          <tr>
              <td class="tdleft" >项目编码：</td>
              <td>
                <el-form-item prop="projectCode">
                      <el-select v-model="addcontract.projectCode" class="itemadd">
                        <el-option :label="item.builderLicensesName" :value="item.id" :key="index" v-for="(item,index) in projoption"></el-option>
                    </el-select>
                </el-form-item>
              </td>
              <td class="tdleft" >组织机构代码：</td>
              <td>
                <el-form-item prop="corpCode" >
                  <el-input v-model.trim="addcontract.corpCode" placeholder="组织机构代码" class="itemadd"></el-input>
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td class="tdleft" >企业名称：</td>
              <td>
                <el-form-item prop="corpName" >
                  <el-input v-model.trim="addcontract.corpName" placeholder="企业名称" class="itemadd"></el-input>
                </el-form-item>
              </td>
              <td class="tdleft" >参见类型：</td>
              <td>
                <el-form-item prop="corpType">
                  <el-select v-model="addcontract.corpType" class="itemadd">
                      <el-option :label="item.subtype" :value="item.subid" :key="index" v-for="(item,index) in contractType"></el-option>
                  </el-select>
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td class="tdleft" >银行名称：</td>
              <td>
                <el-form-item prop="bankCode">
                  <el-select v-model="addcontract.bankCode" class="itemadd">
                      <el-option :label="item.bank" :value="item.banktype" :key="index" v-for="(item,index) in bankoption"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td class="tdleft" >银行卡号：</td>
              <td>
                <el-form-item prop="bannkNumber">
                  <el-input v-model="addcontract.bannkNumber" class="itemadd" placeholder="请输入银行卡号"></el-input>
                </el-form-item>
              </td>
          </tr>
          <tr>
            <td class="tdleft" >支行名称：</td>
              <td>
                <el-form-item prop="bankName">
                  <el-input v-model="addcontract.bankName" class="itemadd" placeholder="请输入支行名称"></el-input>
                </el-form-item>
              </td>
              <td class="tdleft" >工资银行联号：</td>
              <td>
                <el-form-item prop="bankLinkNumber">
                  <el-input v-model="addcontract.bankLinkNumber" class="itemadd" placeholder="请输入银行卡号"></el-input>
                </el-form-item>
              </td>
              
          </tr>
          <tr> 
              <td class="tdleft" >证件类型：</td>
              <td>
                <el-form-item prop="pmIDCardType">
                  <el-select v-model="addcontract.pmIDCardType" class="itemadd">
                      <el-option :label="item.idcard" :value="item.idcardtype" :key="index" v-for="(item,index) in idoption"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td class="tdleft" >证件号码：</td>
              <td>
                <el-form-item prop="pmIDCardNumber">
                  <el-input v-model="addcontract.pmIDCardNumber" class="itemadd" placeholder="请输入证件号码"></el-input>
                </el-form-item>
              </td>
          </tr>
        </table>
        <el-form-item style="text-align:center;">
            <el-button type="primary" @click="submitForm('addcontract')">提交</el-button>
            <el-button @click="resetForm('addcontract')">取消</el-button>
        </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contractform: {
        prjCode: "",
        subId:"",
      },
      trainType: [
        { label: "安全教育", type: "one" },
        { label: "入场教育", type: "two" },
        { label: "退场教育", type: "three" },
        { label: "技能培训", type: "four" }
      ],
      trainData: [
      ],
      // 分页
      currentPage: 1,
      itemnum: 10,
      countnum: 1,
      editId:'',
      contraVisible:false,
      addcontract:{
        projectCode:'',
        corpCode:'',
        corpName:'',
        corpType:'',
        pmIDCardType:'',
        bankCode:'',
        bannkNumber:'',
        pmIDCardNumber:'',
        bankName:'',
        bankLinkNumber:'',
      },
      contractType:[],
      bankoption:[],
      props: {
        type: 'subid',
        label: 'subtype',
      },
      idoption:[],
      projoption:[],
      rule:{
        projectCode:[
            { required: true, message: '请选择分包项目', trigger: 'change' },
            // {pattern:/^[A-Z]{2}[/-][a-zA-Z0-9]{8,10}$/,message:'请输入正确的项目编码'}
        ],
        bannkNumber:[
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
            {pattern:/^[1-9]{1}[0-9]{15,18}$/,message:'请输入正确的银行卡号'}
        ],
        bankLinkNumber:[
          { required: true, message: '请输入银行联号', trigger: 'blur' },
            {pattern:/^[1-9]{1}[0-9]{15,18}$/,message:'请输入正确的银行联号'}
        ],
        pmIDCardNumber:[
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { pattern:/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,message:'请输入正确的身份证号' }
        ],
        corpCode:[
            { required: true, message: '请输入组织机构代码', trigger: 'blur' },
            {pattern:/[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/,message:'请输入正确格式编码'}
        ],
        bankName:[
          {  required: true, message: '请输入支行名称', trigger: 'blur' },
          {pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,40}$/,message:'请输入正确请输入支行名称'}

        ],
        corpName:[
            { required: true, message: '企业名称', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        corpType:[
            { required: true, message: '请选择参建类型', trigger: 'change' },
        ],
        pmIDCardType:[
            { required: true, message: '请选择证件类型', trigger: 'change' },
        ],
        bankCode:[
            { required: true, message: '请选择银行类型', trigger: 'change' },
        ],
      },
      newId:0,
    };
  },
  methods: {
    search() {
      this.getall();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.getall();
    },
    // addcont() {
    //   this.contraVisible=true;
    //   // this.$router.push({ path: "/project/addeditcont?id=0" });
    // },
    // 编辑
    handleClick(id) {
      console.log(id);
      this.contraVisible=true;
      this.newId=id;
      this.$http.post('/api/prj_sub/sub_select_bycode?subId=' + id).then(res=>{
          console.log(res);
          this.addcontract=res.data.list[0];
      })
    },
    getall(){
      let data={
        prjCode:this.contractform.prjCode,
        subId:this.contractform.subId,
        page:this.currentPage,
        num:this.itemnum
      }
      this.$http.get("/api/prj_sub/sub_select_bycode",{params:data}).then(res => {
        console.log(res);
        this.trainData = res.data.list;
        let leng = res.data.count;
        this.countnum=leng;
      });
    },
    // 弹框的新增
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              let contrform=new FormData();
              contrform.append('projectCode',this.addcontract.projectCode)
              contrform.append('corpCode',this.addcontract.corpCode)
              contrform.append('corpName',this.addcontract.corpName)
              contrform.append('corpType',this.addcontract.corpType)
              contrform.append('pmIDCardType',this.addcontract.pmIDCardType)
              contrform.append('bankCode',this.addcontract.bankCode)
              contrform.append('bankName',this.addcontract.bankName)
              contrform.append('bankLinkNumber',this.addcontract.bankLinkNumber)
              contrform.append('bannkNumber',this.addcontract.bannkNumber)
              
                if(this.newId==0){
                    console.log('我是新增页面')
                    this.$http.post('/api/prj_sub/sub_insert_info',contrform).then(res=>{
                        console.log(res);
                        if(res.data.result='success'){
                          this.contraVisible=false;
                          this.addcontract={};
                          this.getall();
                        }
                    });
                }else{
                    console.log('我是编辑页面');
                    contrform.append('subId',this.newId)
                    this.$http.post('/api/prj_sub/sub_update_info',contrform).then(res=>{
                        console.log(res);
                        if(res.data.result='success'){
                          this.contraVisible=false;
                          this.addcontract={};
                          this.getall();
                        }
                    })
                }
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
    // 分包项目 projoption
    prodata(){
        this.$http.get('/api/sub_prj/selectBy').then(res=>{
            // console.log(res);
            this.projoption=res.data.list;
        })
    },
    getsubtype(){
            this.$http.get('/api/dict/sub_type').then(res=>{
            this.contractType=res.data;
        });
        }
  },
  mounted() {
    this.getall()
    this.prodata();
    this.getsubtype();
     this.$http.get('/api/dict/id_type').then(res=>{
          this.idoption=res.data
      });
      // 银行代码
      this.$http.get('/api/dict/bank').then(res=>{
        // console.log(res);
        this.bankoption=res.data;
      })
  }
};
</script>
<style lang="scss">
.contractors {
  width: 95%;
  margin: 20px auto;
  .alltable {
    width: 100%;
    height: calc(100vh - 280px);
    .boxInput {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .itemadd{
        width:220px;
    }
}
</style>
<style>
.contractors .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>