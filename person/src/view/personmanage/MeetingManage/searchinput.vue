<template>
  <div class="searchmeet">
    <p class="persontop">会议管理</p>
    <el-form :model="addmeetform" ref="addmeetform" :rules="meetrule" @submit.native.prevent style="width: 100%;">
      <table border="1" class="tableinsert" style="width:95%;">
        <tr>
            <td class="tdleft">主讲人：</td>
            <td> 
              <el-form-item prop="compere">
                <el-input v-model.trim="addmeetform.compere" placeholder="主讲人"></el-input>
              </el-form-item>
            </td>
            <td class="tdleft">参会人数：</td>
            <td>
              <el-form-item prop="number">
                <el-input v-model.trim="addmeetform.number" placeholder="参会人数" type="number"></el-input>
              </el-form-item>
            </td>
        </tr>
        <tr>
            <td class="tdleft">开始时间：</td>
            <td> 
              <el-form-item prop="beginTime">
                <el-date-picker v-model="addmeetform.beginTime" type="datetime"  format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" placeholder="选择日期时间" @change="startTimeStatus" :picker-options="pickerOptionsStart" style="width:100%;"></el-date-picker>
              </el-form-item>
            </td>
            <td class="tdleft">结束时间：</td>
            <td>
              <el-form-item prop="endTime">
                <el-date-picker v-model="addmeetform.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" placeholder="选择日期时间" @change="endTimeStatus" :picker-options="pickerOptionsEnd" style="width:100%;"></el-date-picker>
              </el-form-item>
            </td>
        </tr>
        <tr>
          <td class="tdleft">参会文件：</td>
          <td colspan="3"> 
            <el-form-item label="" prop="fileList">
            <el-upload   ref="upload"  class="upload-demo"  accept="application/pdf"
                action=" "  :limit="1" :auto-upload="true" :show-file-list="true" :http-request="uploadUserImg">
                <el-button size="small" type="primary" style="margin-right:20px;">点击上传</el-button>
                <span slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过500kb</span>
            </el-upload>
          </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="tdleft">会议主题：</td>
          <td colspan="3"> 
            <el-form-item prop="title">
              <el-input v-model.trim="addmeetform.title" type="textarea" :rows="3" maxlength="300"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="tdleft">会议地点：</td>
          <td colspan="3"> 
            <el-form-item prop="address">
              <el-input v-model.trim="addmeetform.address" type="textarea" :rows="3" maxlength="300"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
      <el-form-item style="text-align:center;">
        <el-button type="primary" native-type="submit" @click="submitForm('addmeetform')">确 定</el-button>
        <router-link to="/project/search">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
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
      urlId:0,
      addmeetform: {
        // meetcode: "",
        beginTime: "",
        endTime: "",
        title:'',
        number:'',
        address:'',
        compere:'',
        fileList:[],
        filepath:'',
      },
      meetrule:{
        beginTime:[{required: true,message: "请输入开始时间",trigger: "change"}],
        endTime:[{required: true,message: "请输入结束时间",trigger: "change"}],
        title:[{required: true,message: "请输入会议主题",trigger: "blur"}],
        number:[{required: true, message: "请输入参会人数",trigger: "blur"},
        {pattern:/^[1-9]{1}[0-9]{0,2}$/,message:'参数人数长度不能超过3位数'}],
        address:[{required: true,message: "请输入会议地点",trigger: "blur"}],
        compere:[{required: true,message: "请输入主讲人",trigger: "blur"},
          {pattern:/^[\u4e00-\u9fa5_a-zA-Z]{2,10}$/,message:'主讲人长度不能超过10位'}],
      },
      pickerOptionsStart: {
          disabledDate: time => {
              let endDateVal = this.addmeetform.endTime;
              if (endDateVal) {
                  return time.getTime() > new Date(endDateVal).getTime();
              }
          }
      },
      pickerOptionsEnd: {
          disabledDate: time => {
              let beginDateVal = this.addmeetform.beginTime;
              if (beginDateVal) {
                  return (
                      time.getTime() <
                      new Date(beginDateVal).getTime()
                  );
              }
          },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
      //结束时间限制开始时间
    startTimeStatus:function(value){
        this.createDate = value
    },
    // 时间结束选择器
    endTimeStatus:function(value){
        this.overDate = value
    },
    uploadUserImg(params){
      this.addmeetform.file=params.file;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.urlId==0){
            let form = new FormData();
            form.append('filepath',this.addmeetform.file);
            form.append('title',this.addmeetform.title);
            form.append('beginDate',this.addmeetform.beginTime);
            form.append('endDate',this.addmeetform.endTime);
            form.append('number',this.addmeetform.number);
            form.append('address',this.addmeetform.address);
            form.append('compere',this.addmeetform.compere);
            this.$http.post('/api/meeting/insert',form,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                console.log(res);
                if(res.data.result=='success'){
                    this.$router.push({path:'/project/search'});
                }
            })
          }else{
            console.log(this.addmeetform.beginTime);
            let data={
                title:this.addmeetform.title,
                beginDate:this.addmeetform.beginTime,
                endDate:this.addmeetform.endTime,
                number:this.addmeetform.number,
                address:this.addmeetform.address,
                compere:this.addmeetform.compere,
                file:this.addmeetform.file,
                id:this.urlId,
            }
            this.$http.get('/api/meeting/update',{params:data}).then(res=>{
              console.log(res);
              if(res.data.result="success"){
                    this.$router.push({path:'/project/search'});
              }
            })
          }
        } else {
            console.log('error submit!!');
            return false;
        }
      });
    },
  },
  created() {},
  mounted() {
    this.urlId=this.$route.query.id;
    console.log(this.urlId);
    if(this.urlId!=0){
      let data={
        page:1,
        num:1,
        id:this.urlId,
        title:'',
        address:'',
        compere:'',
      };
      this.$http.get('/api/meeting/selectAll',{params:data}).then(res=>{
        console.log(res);
        let datetime=res.data.list[0].beginTime;
        let endTime=res.data.list[0].endTime;
        this.addmeetform.beginTime=formatDate(datetime,'yyyy-MM-dd hh:mm');
        this.addmeetform.endTime=formatDate(endTime,'yyyy-MM-dd hh:mm');
        this.addmeetform.title=res.data.list[0].title;
        this.addmeetform.number=res.data.list[0].number;
        this.addmeetform.address=res.data.list[0].address;
        this.addmeetform.compere=res.data.list[0].compere;
        this.addmeetform.file=res.data.list[0].file;
      })
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.searchmeet {
  width: 80%;
  margin: 20px auto;
}
</style>
