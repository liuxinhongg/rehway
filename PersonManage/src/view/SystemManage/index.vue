/*********************************************
 * @function: 制度管理---发布功能
 * @Author: 刘新红 
 * @Date: 2019-03-11 
 *********************************************/
<template>
  <div>
    <p class="persontop" style="margin-bottom:15px;">制度管理列表</p>
    <el-form class="searchTop" :inline="true"  @submit.native.prevent>
      <el-form-item>
        <span>发布人：</span> <el-input v-model="issuser" style="width:200px;" placeholder="发布人"></el-input>
      </el-form-item>
      <el-form-item>
       <span>制度标题：</span> <el-input v-model="title" style="width:200px;" placeholder="制度标题"></el-input>
      </el-form-item>
      <el-form-item>
       <span>发布时间：</span> <el-date-picker type="datetime" v-model="date" style="width:200px;" placeholder="选择时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="searchsystem" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="success" @click="sendAd" >+添加</el-button>
        <el-button  @click="exportexcel" >导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="adverData" border style="width: 90%;margin:0 auto;">
      <el-table-column type="index" label="编号" width="100"></el-table-column>
      <el-table-column prop="issuser" label="发布人" sortable width="200"></el-table-column>
      <el-table-column label="发布时间" width="300" sortable>
        <template slot-scope="scope">{{scope.row.date | formatDate}}</template>
      </el-table-column>
      <el-table-column label="制度标题"  width="300">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.titleName }}</div>
            <div class="boxInput">{{ scope.row.titleName }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="制度文件">
        <template slot-scope="scope">
          <a :href="downurl+scope.row.detailsUrl">{{scope.row.detailsType }}</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="itemsize"
        layout="prev, pager, next, jumper"
        :total="totlenum"
      ></el-pagination>
    </div>
    <!-- 新增公告 -->
    <el-dialog title="新增制度" :visible.sync="visiblecheck" width="45%" center>
      <el-form :model="adform" :rules="rules" ref="adform" class="admanage"  @submit.native.prevent>
        <table border="1" class="tableinsert" style="width:95%;">
            <tr>
                <td class="tdleft">制度编号：</td>
                <td> 
                  <el-form-item prop="systemcode" >
                      <el-input v-model="adform.systemcode" placeholder="制度编号"></el-input>
                  </el-form-item>
                </td>
                <td class="tdleft">发布人：</td>
                <td>{{username}}</td>
                
            </tr>
            <tr>
                <td class="tdleft">制度标题：</td>
                <td>
                  <el-form-item prop="title" >
                    <el-input v-model="adform.title" placeholder="制度标题"></el-input>
                  </el-form-item> 
                </td>
                <td class="tdleft">发布时间：</td>
                <td>
                  <el-form-item prop="sendtime" >
                    <el-date-picker v-model="adform.sendtime" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" style="width:100%;"></el-date-picker>
                  </el-form-item>
                </td>
            </tr>
            <tr>
              <td class="tdleft">制度文件：</td>
              <td colspan="3">
                <el-upload ref="upload" class="upload-demo" accept="application/pdf" action=" "  multiple 
                    :auto-upload="true" :show-file-list="true" :http-request="uploadUserImg">
                    <el-button size="small" type="primary" style="margin-right:20px;">点击上传</el-button>
                    <span slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过500kb</span>
                </el-upload>
              </td>
            </tr>
            <tr>
              <td class="tdleft">备注：</td>
              <td colspan="3">
                <el-form-item prop="remark" >
                  <el-input v-model="adform.remark" type="textarea" :rows="4" ></el-input>
                </el-form-item>
              </td>
            </tr>
        </table>
        <el-form-item style="text-align:center;">
          <el-button type="primary" native-type="submit" @click="submitForm('adform')">确定</el-button>
          <el-button @click="addAnnounce=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import formatDate from '@/filter/date.js';
import * as systemInfo from '@/api/personmanage'
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      username:'',
      totlenum:1,
      itemsize:12,
      currentPage: 1,
      searchId:'',
      date:'',
      issuser:'',
      title:'',
      downurl:systemInfo.downfile,
      visiblecheck: false,
      adverData: [],
      // 新增文件表单
      param: new FormData(),
      adform: {
          systemcode:'',
          title: "",
          author: "",
          desc: "",
          sendtime:'',
          remark:'',
          file:'',
      },
      rules: {
          systemcode:[{required: true,message: "请输入制度编号",}],
          author: [
              { required: true, message: "请输入作者名称", trigger: "blur" },
              { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ],
          sendtime: [
          { required: true, message: "请选择发布时间", trigger: "change" }
          ],
          title: [
              { required: true, message: "请输入广告标题", trigger: "blur" },
              { min: 3, max: 20, message: "长度在 3 到 30 个字符", trigger: "blur" }
          ],
          remark:[{required:true,message:'请输入备注内容',trigger:'blur'}]
      },
    };
  },
  methods: {
    urldetaol(filename){
      this.$http.post('/api/took/user_get_photo?fileName='+filename).then(res=>{
        console.log(res);
      })
    },
    sendAd() {
      this.visiblecheck=true;
      // this.$router.push({path:'/project/addsystem'})
    },
    handleClick(id) {
      this.$router.push({path:'/project/addsystem?id='+id})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.DataAll();
    },
    // 表格导出
    exportexcel(){},
    // 所以的列表数据
    DataAll() {
      let data={
        page:this.currentPage,
        num:this.itemsize,
        title:this.title,
        id:this.searchId
      }
      this.$http.get(systemInfo.sysAlldata,{params:data}).then(res => {
        console.log(res);
        this.adverData = res.data.list;
        let leng = res.data.count;
         this.totlenum = leng;
      });
    },
    searchsystem() {
      this.DataAll();
    },
    // 新增文件的事件
    uploadUserImg(param){
        this.adform.file = param.file;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            var form = new FormData();
            form.append('filepath',this.adform.file);
            form.append('titleName',this.adform.title);
            form.append('time',this.adform.time);
            form.append('issuser',this.adform.issuser);
            this.$http.post('/api/regime/insert',form,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then(res=>{
                console.log(res);
                if(res.data.result=='success'){
                    this.$router.push({path:'/project/systemmanage'});
                }
            })
        } else {
            console.log('error submit!!');
            return false;
        }
      });
    },
  },
  mounted() {
    this.DataAll();
    this.username=localStorage.getItem('username');
    // let data={
    //     page:this.currentPage,
    //     num:this.itemsize,
    //     title:this.title,
    //     id:this.searchId
    //   }
    //   this.$http.get("/api/regime/selectBy",{params:data}).then(res => {
    //      this.urldetail = res.data.list.detailsUrl;
    //   });
  }
};
</script>
<style lang="scss">
.sendAd {
  margin: 10px 20px;
}
.searchTop {
  width: 90%;
  margin: auto;
}
.boxInput {
  cursor: pointer;
  // width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.checkout {
  width: 80%;
  height: auto;
  margin: 10px auto;
  margin-bottom: 20px;
  .chechlist {
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
    font-size: 15px;
    p:nth-child(1) {
      width: 100px;
      color: #5e5e5e;
      font-weight: bold;
    }
    p:nth-child(2) {
      color: #808080;
      font-weight: bold;
    }
  }
}
.sortable{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
</style>