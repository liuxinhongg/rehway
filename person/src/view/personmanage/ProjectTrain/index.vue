<template>
  <div class="projectTrain">
    <p class="persontop">项目培训列表</p>
    <!-- 搜索 -->
    <el-form :inline="true" :model="trainform" class="demo-form-inline">
      <!-- <el-form-item >
        <span>接入编号：</span> <el-input v-model="trainform.code" placeholder="接入编号"  style="width:200px"></el-input>
      </el-form-item> -->
      <el-form-item >
        <span>培训名称：</span> <el-input v-model.trim="trainform.trainName" placeholder="培训名称"  style="width:200px"></el-input>
      </el-form-item>
      <el-form-item>
        <span>培训日期：</span> <el-date-picker v-model="trainform.time" type="date" placeholder="培训日期" style="width:200px"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <span>培训类型：</span>
        <el-select v-model="trainform.type" style="width:200px;">
          <el-option
            :label="item.type"
            :value="item.code"
            :key="index"
            v-for="(item,index) in trainoption"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button @click="addtraindata" type="success">+新增</el-button>
        <el-button><a :href="'/api/train/selectBy_?code='+trainform.code+'&type='+trainform.type+'&time='+trainform.time">导出</a></el-button>
      </el-form-item>
    </el-form>
    <!-- 列表显示信息 -->
    <div class="alltable">
      <el-scrollbar style="height:100%;">
        <el-table :data="trainData" border style="width: 100%" >
          <el-table-column type="index" label="编号" width="100"></el-table-column>
          <!-- <el-table-column fixed label="接入编号" width="150">
            <template slot-scope="scope">
              <el-tooltip trigger="hover" placement="top">
                <div slot="content">{{ scope.row.code }}</div>
                <div class="boxInput">{{ scope.row.code }}</div>
              </el-tooltip>
            </template>
          </el-table-column> -->
          <el-table-column label="培训日期" width="140" sortable>
            <template slot-scope="scope">{{scope.row.trainDateTime|formatDate()}}</template>
          </el-table-column>
          <el-table-column prop="trainTime" label="培训时长（小时）" width="160" sortable></el-table-column>
          <el-table-column prop="trainName" label="培训名称" width="250">
            <template slot-scope="scope">
              <el-tooltip trigger="hover" placement="top">
                <div slot="content">{{ scope.row.trainName }}</div>
                <div class="boxInput">{{ scope.row.trainName }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="trainTypeName" label="培训类型" width="120"></el-table-column>
          <el-table-column prop="issuer" label="培训人" width="120"></el-table-column>
          <el-table-column label="培训地址" width="170">
            <template slot-scope="scope">
              <el-tooltip trigger="hover" placement="top">
                <div slot="content">{{ scope.row.address }}</div>
                <div class="boxInput">{{ scope.row.address }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="参与人数" width="130"></el-table-column>
          <el-table-column label="培训附件" >
            <template slot-scope="scope">
              <a v-for="(item,index) in scope.row.file" :key="index" :href="'/api/took/user_get_photo?fileName='+item.location"> {{item.fileName}} </a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.id)" type="text"><i class="iconfont icon-edit"></i> 编辑</el-button>
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
        :total="count"
      ></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="trainVisible" :before-close="DialogClose" center>
      <el-form :model="addtrain" ref="addtrain" :rules="trainrule" >
        <table border="1" class="tableinsert">
            <tr>
                <td class="tdleft">接入编号：</td>
                <td> 
                  <el-form-item prop="code" >
                      <el-input v-model.trim="addtrain.code" placeholder="接入编号" style="width:220px;"></el-input>
                  </el-form-item>
                </td>
                <td class="tdleft">主讲者：</td>
                <td>
                  <el-form-item prop="issuer">
                      <el-input v-model.trim="addtrain.issuer" placeholder="请输入主讲者" style="width:220px;"></el-input>
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">培训日期：</td>
                <td> 
                  <el-form-item prop="trainDate" >
                      <el-date-picker v-model="addtrain.trainDate" type="datetime" style="width:220px;" placeholder="培训日期"></el-date-picker>
                  </el-form-item>
                </td>
                <td class="tdleft">培训时长：</td>
                <td>
                  <el-form-item prop="trainTime">
                    <el-input v-model.trim="addtrain.trainTime" placeholder="请输入培训时长" style="width:220px;"></el-input>（小时）
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">培训类型：</td>
                <td> 
                  <el-form-item prop="trainType">
                    <el-select v-model="addtrain.trainType" style="width:220px;">
                      <el-option :key="index" v-for="(item,index) in trainoption" :label="item.type" :value="item.code" ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft">培训名称：</td>
                <td>
                  <el-form-item  prop="trainName">
                    <el-input v-model.trim="addtrain.trainName" style="width:220px;" placeholder="请输入培训名称"></el-input>
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">培训地点：</td>
                <td> 
                  <el-form-item prop="address">
                      <el-input v-model.trim="addtrain.address" placeholder="请输入培训地点" style="width:220px;"></el-input>
                  </el-form-item>
                </td>
                <td class="tdleft">培训人数：</td>
                <td>
                  <el-form-item prop="number">
                      <el-input v-model.trim="addtrain.number" placeholder="请输入培训人数" style="width:220px;"></el-input>
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">附件：</td>
                <td colspan="3"> 
                  <el-form-item  prop="filepath">
                    <el-upload class="upload-demo" action=" " :http-request="handleChange">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </td>
            </tr>
        </table>
        <el-form-item style="text-align:center;">
            <el-button type="primary" @click="submitForm('addtrain')">提交</el-button>
            <el-button @click="canclemodle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import formatDate from '@/filter/date.js';
import * as personmanage from '@/api/personmanage'
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      trainform: {
        trainName:'',
        code: "",
        time: "",
        type:'',
      },
      trainoption: [],
      trainData: [],
      // 分页
      currentPage: 1,
      itemnum: 10,
      count: 1,
      // 新增培训的弹框
      dialogTitle:'',
      trainVisible:false,
      addtrain:{
        code:'',
        trainDate:'',
        trainTime:'',
        trainType:'',
        issuer:'',
        address:'',
        number:'',
        id:'',
        trainName:'',
        filepath:'',
      },
      getId:0,
      newsform:new FormData(),
      trainrule:{
        code:[
            { required: true, message: '请输入接入编号', trigger: 'blur' },
            {pattern:/^[0-9a-zA-Z]{5,20}$/,message:'请输入正确的接入编号（范围5-29字符）'}
        ],
        issuer:[
            { required: true, message: '请输入主讲者', trigger: 'blur' },
          {pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/,message:'讲师长度不能超过10位'}
        ],
        trainDate:[
            { required: true, message: '请输入培训日期', trigger: 'blur' },
        ],
        address:[
            { required: true, message: '请输入培训地点', trigger: 'blur' },
          {pattern:/^[\u4e00-\u9fa5_a-zA-Z]{7,25}$/,message:'请输入正确培训地点（范围7~25位）'}
        ],
        number:[
            { required: true, message: '请输入培训人数', trigger: 'blur' },
            {pattern:/^[1-9]{1}[0-9]{0,2}$/,message:'培训人数不能超高三位数'}
        ],
        trainTime:[
            { required: true, message: '请输入培训时长', trigger: 'blur' },
            {pattern:/^[1-9]{1}[0-9]{0,2}$/,message:'培训时长不能超高三位数'}
        ],
        trainName:[
            { required: true, message: '请输入培训名称', trigger: 'blur' },
          {pattern:/^[\u4e00-\u9fa5_a-zA-Z]{7,25}$/,message:'培新名称（范围7~25位）'}
        ],
        trainType:[
            { required: true, message: '请选择培训类型代码', trigger: 'change' },
            // {pattern:/^[0-9a-zA-Z]{5,20}$/,message:'请输入正确的培新类型代码（范围5-29字符）'}
        ],
      }
    };
  },
  methods: {
    search(){
      this.gettrainData();
    },
    handleClick(id){
      this.trainVisible=true;
      this.dialogTitle='编辑培训';
      this.getId=id;
      this.$http.get(personmanage.editformer,{params:{id:this.getId}}).then(res=>{
          console.log(res);
          this.addtrain=res.data.list[0];
          // let dateTime =res.data.list.trainDate;
          // this.addtrain.trainDate=formatDate(dateTime,'yyyy-MM-dd hh:mm:ss');
          // console.log(this.addtrain.trainDate)
      })
      // this.$router.push({ path: "/project/addtrain?id="+id });      
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.gettrainData();
    },
    addtraindata() {
      this.trainVisible=true;
      this.dialogTitle='新增培训';
    },
    gettrainData(){
      let data={
        trainName:this.trainform.trainName,
        trainTime:this.trainform.time,
        trainType:this.trainform.type,
        num:this.itemnum,
        page:this.currentPage,
      }
      this.$http.get(personmanage.traindata,{params:data}).then(res=>{
        console.log(res);
        this.trainData=res.data.list;
        let trainlength=res.data.count;
        this.count=trainlength;
      })
    },
    // 新增培训的弹框
    canclemodle(){
      this.trainVisible=false;
      this.addtrain={};      
    },
    handleChange(param){
      console.log(param);
      this.newsform.append('filepaths',param.file)
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.newsform.append('code',this.addtrain.code),
            this.newsform.append('trainDateTime',this.addtrain.trainDate.getTime()),
            this.newsform.append('trainTime',this.addtrain.trainTime),
            this.newsform.append('trainType',this.addtrain.trainType),
            this.newsform.append('issuer',this.addtrain.issuer),
            this.newsform.append('address',this.addtrain.address),
            this.newsform.append('number',this.addtrain.number),
            this.newsform.append('trainName',this.addtrain.trainName),
            this.newsform.append('filepaths',this.addtrain.filepath);
            if(this.getId==0){
                this.$http.post(personmanage.addtrain,this.newsform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                    console.log(res);
                    if(res.data.result='success'){
                        this.$message.success('新增培训成功');
                        this.addtrain={};
                        this.trainVisible=false;
                        // this.$refs[formName].resetFields();
                        this.gettrainData();
                    }else{
                        this.$message.error('新增培训失败');
                        this.addtrain={};
                    }
                })
            }else{
                this.newsform.append('id',this.addtrain.id),
                console.log(this.addtrain.trainDate.getTime())
                // this.$message.warning('请重新选择时间~');
                this.$http.post(personmanage.edittrain,this.newsform,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                    console.log(res);
                    if(res.data.result='success'){
                        this.trainVisible=false;
                        this.addtrain={};
                        this.gettrainData();
                        // this.$refs[formName].resetFields();
                    }else{
                        this.$message.error('编辑失败');
                        this.addtrain={};
                    }
                })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(){
        this.$router.push('/project/projecttrain')
    },
    DialogClose(){
      this.addtrain={};
      this.trainVisible=false;
    }
  },
  mounted(){
    this.gettrainData();
    this.$http.get(personmanage.traindict).then(res=>{
      console.log(res);
      this.trainoption=res.data
    })
  }
};
</script>

<style lang="scss">
.projectTrain {
  width: 95%;
  margin: auto;
  .alltable {
    width: 100%;
    height: calc(100vh - 235px);
    .boxInput {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
<style>
.projectTrain .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

