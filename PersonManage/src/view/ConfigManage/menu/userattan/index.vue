
<template>
  <div class="KqConfig">
    <el-form :inline="true" :model="undidsearch" class="demo-form-inline" style="margin-top:20px;" @submit.native.prevent >
      <el-form-item>
          <el-button @click="newdouble()" v-show="newbuild">+新建</el-button>
          <el-button @click="modify(timeId)" v-show="!newbuild">修改</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="timeform" border class="unfindTable">
      <el-table-column type="index" width="120" label="序号"></el-table-column>      
      <el-table-column label="配置时间" width="200">
        <template slot-scope="scope">{{ scope.row.timeLength=='' ? '' : scope.row.timeLength.substring(3) }}</template>
      </el-table-column>
      <el-table-column label="上班时间" >
        <template slot-scope="scope">{{ scope.row.clockDate}}</template>
      </el-table-column>
      <el-table-column label="时间误差">
        <template slot-scope="scope">{{ scope.row.closeDate}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120">
          <template slot-scope="scope">
              <el-button type="text" @click="deletanum(scope.row.id)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-dialog title="增加配置时间" :visible.sync="addtimevisible" width="40%" center>
        <el-form :model="kqform" label-width="120px" ref="kqform" :rules="tiomkq">
            <el-form-item label="开始时间：" style="margin-left:40px;" prop="startTime">
                <el-time-select placeholder="起始时间" v-model="kqform.startTime" 
                    :picker-options="{ start: '08:30', step: '01:00', end: '18:30' }">
                </el-time-select> <span style="margin:0 15px;">至</span>
                <el-time-select placeholder="结束时间" v-model="kqform.endTime"
                    :picker-options="{ start: '09:00',  step: '01:00', end: '24:00', minTime: kqform.startTime }">
                </el-time-select>
            </el-form-item>
            <el-form-item label="时间误差：" style="margin-left:40px;" prop="timelength" >
                <el-select type="text" v-model="kqform.timelength" style="width:80%;">
                    <el-option v-for="(item,index) in timeoption" :key="index" :label="item.timeat" :value="item.timeat"></el-option>
                </el-select><span style="margin-left: 15px;">(分钟)</span>
            </el-form-item>
            <el-form-item style="text-align:center;">
            <el-button type="primary" @click="suretime('kqform')">确定</el-button>
            <el-button @click="addtimevisible=false">取消</el-button>
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
      newbuild:true,
      timeform: [],
      currentPage: 1,
      undidsearch: {
          ywlc: ""
      },
      kqform:{
          startTime:'',
          endTime:'',
          timelength:'',
      },
      addtimevisible:false,
      tiomkq:{
          startTime:[ { required: true, message: '请选择开始时间', trigger: 'change' }],
          timelength:[ {  required: true, message: '请选择误差时间', trigger: 'change'}],
      },
      kqrouterId:0,
      timeoption:[
          {timeat:'00:00'},
          {timeat:'10:00'},
          {timeat:'15:00'},
          {timeat:'20:00'},
          {timeat:'30:00'},
      ],
      timeId:'',
    };
  },
  watch: {},
  computed: {},
  methods: {
    newdouble(){
      this.addtimevisible=true;
    },
    modify(id){
      console.log(id);
      this.addtimevisible=true;
      this.$http.get('/api/clockConfig/select_list').then(res=>{
          console.log(res);
          this.kqform.startTime=res.data.list[0].closeDate.substr(3);
          this.kqform.endTime=res.data.list[0].clockDate.substr(3);
          this.kqform.timelength=res.data.list[0].timeLength.substr(3);
      });
    },
    deletanum(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.get('/api/clockConfig/delete?id='+id).then(res=>{
                console.log(res);
                this.getAlltime();
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    searchSubmit() {},
    suretime(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.timeId!=''||this.timeId!=null){
                console.log('我是编辑');
                let modifytime=new FormData();
                modifytime.append('clockTime',this.kqform.startTime),
                modifytime.append('closeTime',this.kqform.endTime),
                modifytime.append('timeLength',this.kqform.timelength),
                modifytime.append('id',this.timeId);
                this.$http.post('/api/clockConfig/update',modifytime).then(res=>{
                  console.log(res);
                  if(res.data.result="success"){
                      this.$message.success('修改成功');
                      this.addtimevisible=false;
                      this.getAlltime();
                  }else{
                      this.$message.error('新增考勤时间失败');
                  }
                })
              }else{
                let kqtime=new FormData();
                kqtime.append('clockTime',this.kqform.startTime),
                kqtime.append('closeTime',this.kqform.endTime),
                kqtime.append('timeLength',this.kqform.timelength)
                this.$http.post('/api/clockConfig/insert',kqtime).then(res=>{
                    console.log(res);
                    if(res.data.result="success"){
                        this.addtimevisible=false;
                        this.getAlltime();
                    }else{
                        this.$message.error('新增考勤时间失败');
                    }
                })
              }
                
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
    getAlltime(){
        this.$http.get('/api/clockConfig/select_list').then(res=>{
            console.log(res);
            if(res.data.list.length>0){
              this.newbuild=false;              
            }
            this.timeform=res.data.list;
            this.timeId=res.data.list[0].id;
        });
    }
  },
  created() {},
  mounted() {
      this.getAlltime()
  },
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.KqConfig {
  width: 95%;
  margin: 0 auto;
}
</style>
