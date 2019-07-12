/*********************************************
 * @function: 文件管理---发布功能
 * @filename: 刘新红 
 * @Date: 2019-03-11 
 *********************************************/
<template>
  <div>
    <p class="persontop" style="margin-bottom:15px;">文件管理列表</p>
    <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item>
       <span>文件名称：</span> <el-input v-model="sousou.fileName" placeholder="请输入文件名称" style="width:200px;margin-right:20px;"></el-input>
      </el-form-item>
      <el-form-item>
       <span>文件编号：</span> <el-input v-model="sousou.code" placeholder="请输入文件编号" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item>
       <span>日期：</span> <el-date-picker v-model="sousou.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item style="height:0px;width:0px;">
        <el-input v-model="sousou.id" type="hidden" style="width:250px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="addfile" type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="adverData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
      <el-table-column type="index" label="编号" width="100"></el-table-column>
      <el-table-column label="发布人" prop="issuser" sortable></el-table-column>
      <el-table-column label="文件名称" prop="fileName" >
        <template slot-scope="scope">
          <a :href="'/api/took/user_get_photo?fileName='+scope.row.address">{{scope.row.fileName }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="size"  label="大小" show-overflow-tooltip sortable></el-table-column>
      <el-table-column label="日期" sortable>
        <template slot-scope="scope">{{ scope.row.date | formatDate}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" style="padding: 3px 5px;color:#ebb563" @click="deletefile(scope.row.id)"><i class="iconfont iconcancle"></i> 移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemnum"
        layout="prev, pager, next, jumper"
        :total="totalnum"
      ></el-pagination>
    </div>
    <el-dialog title="文件详情" :visible.sync="fileVisible" center width="45%">
      <el-form :model="fileform" :rules="rules" ref="fileform" @submit.native.prevent>
        <table border="1" class="tableinsert" >
            <tr>
                <td class="tdleft">文件编号：</td>
                <td>
                  <el-form-item prop="code" >
                    <el-input v-model="fileform.code" placeholder="请输入文件编号"></el-input>
                  </el-form-item>
                </td>
                <td class="tdleft">发布人：</td>
                <td> 
                  <el-form-item prop="issuser" >
                    <el-select v-model="fileform.issuser">
                        <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                        </el-option>
                    </el-select>
                  </el-form-item>
                </td>
            </tr>
            <tr>
                <td class="tdleft">发布时间：</td>
                <td>
                  <el-form-item prop="time" >
                    <el-date-picker v-model="fileform.time" type="datetime" placeholder="选择日期时间" format="yyyy 年 MM 月 dd 日" style="width:100%;" value-format="timestamp"></el-date-picker>
                  </el-form-item>
                </td>
                <td class="tdleft">选取文件：</td>
                <td> 
                  <el-form-item prop="issuser" >
                      <el-upload class="upload-demo" action="" :limit="1" :auto-upload="true" :show-file-list="true" :http-request="handleDoIt">
                        <el-button slot="trigger" size="small" :limit="1" type="primary"><i class="el-icon-upload" style="font-size:20px;margin:0 5px 0 0;"></i>选取文件</el-button>
                      </el-upload>
                  </el-form-item>
                </td>
            </tr>
        </table>
        <el-form-item style="text-align:center;">
          <el-button type="primary" native-type="submit" @click="submitForm('fileform')">确定</el-button>
          <el-button @click="fileVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import formatDate from '@/filter/date.js';
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      fileVisible:false,
      personoption:[],//人员信息
      //文件弹框
      fileform:{
          code:'',
          issuser:'',
          time:'',
          filepath:'',
      },
      rules:{
          code:[{required: true,message: "请输入文件编号",trigger: "blur"},{pattern:/^[0-9a-zA-Z]{5,20}$/,message:'请输入正确的文件编号（5~20位）'}],
          issuser:[{required: true,message: "请输入文件编号",trigger: "blur"}],
          time:[{required: true,message: "请选择时间",trigger: "change"}],
      },
      currentPage: 1,
      itemnum:10,
      totalnum:1,
      sousou: {
        fileName: "",
        code:'',
        id:'',
      },
      adverData: []
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        id:this.sousou.id,
        code:this.sousou.code,
        fileName:this.sousou.fileName,
      }
      this.$http.get('/api/file/selectBy',{params:data}).then(res=>{
        console.log(res);
        this.adverData=res.data.list;
        this.totalnum=res.data.count;
        // if(res.data.result=='error'){
        //   this.$message.error('添加文件失败');
        // }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addfile(){
      this.fileVisible=true;
      // this.$router.push({path:'/project/doitfile?id=0'});
    },
    sousoubtn() {
      console.log(11);
      this.dataAll();
    },
    // 删除
    deletefile(id) {
      console.log(id);
      this.$confirm('确定要移除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/file/remove?id='+id).then(res=>{
          console.log(res);
          if(res.data.result="success"){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.dataAll()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 分享
    share(id) {
      console.log(id);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.dataAll();
    },
    getperson(){
        this.$http.get('/api/user/user_select').then(res=>{
            console.log(res);
            this.personoption=res.data.list;
        })
    },
    // 新增文件
    handleDoIt(param){
      console.log(param);
      this.fileform.file=param.file;//获取文件的信息
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            var form=new FormData();
            form.append('filepath',this.fileform.file);
            // form.append('code',this.fileform.code);
            form.append('issuser',this.fileform.issuser);
            // form.append('time',this.fileform.time);
            this.$http.post('/api/file/insert',form,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                console.log(res);
                if(res.data.result=='success'){
                  this.fileVisible=false;
                    // this.$router.push({path:'/project/filemanage'});
                }else if(res.data.result=='error'){
                    this.$message.error('添加文件失败');
                }
            })
        } else {
            console.log('error submit!!');
            return false;
        }
      });
    },
  },
  mounted(){
    this.dataAll();
    this.getperson();
  }
};
</script>
<style lang="scss">
  .searchfrom {
    width: 90%;
    margin: auto;
    margin-top: 20px;
  }
.fileupload {
  width: 90%;
  margin: 10px auto;
  // padding: 10px 0;
  margin-bottom: 20px;
  // border: 1px solid #ccc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
