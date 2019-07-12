<template>
  <div class="safteducate">
    <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item label="安全教育标题：">
        <el-input v-model="sousou.title" placeholder="请输入标题" style="width:250px;"></el-input>
      </el-form-item>
      <el-form-item label="教育类型：">
          <el-select v-model="sousou.eduCode" style="width:280px">
              <el-option v-for="(item,index) in edutypeoption" :key="index" :value="item.code" :label="item.type"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button  @click="addfile"  type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-row class="videoCard">
      <el-scrollbar style="height:100%;">    
        <el-col :span="4" v-for="(item, index) in adverData" :key="index" style="margin:15px 26px;">
          <el-card class="itemcard" style="padding: 0px;width: 100%; position: relative;">
            <video class="image" :src="'/api/took/user_get_photo?fileName='+item.filename" 
              controls @play="onPlayerPlay(item.id)" @pause="onPlayerPause(item.id)"></video>
            <div style="padding: 10px 14px;width:100%;">
              <p class="title">{{item.title}}</p>
              <div class="clearfix">
                <p class="time">{{item.eduTime | formatDate()}}</p>
                <el-button type="text" class="button" @click="detailInfo(item.id)" style="float:right;">点击详情</el-button>
              </div>
            </div>
            <div class="coverall" v-show="current==item.id ? true : false">
              <p class="errorIcon" @click="iconerror(index)"><i class="iconfont icon-error" style="font-size:23px;color:#fff;"></i></p>
              <p><span>发 布 人&nbsp;：</span><span>{{item.upuserName}}</span></p>
              <p><span>观看次数：</span><span>{{item.watchnum}}</span></p>
              <p><span>教育类型：</span><span>{{item.eduTypeName}}</span></p>
              <p><span>工种类别：</span><span>{{item.worktypeName}}</span></p>
              <p><span>工程类别：</span><span>{{item.proProtypeName}}</span></p>
            </div>
          </el-card>
        </el-col>
      </el-scrollbar>
    </el-row>
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
      edutypeoption:[],
      ImgIcon:false,
      allcontent:false,
      current:0,
      currentPage: 1,
      itemnum:15,
      totalnum:1,
      sousou: {
        title:'',
        eduCode:'',
      },
      adverData: [],
      worktypeoption:[
          { name:'特种作业类工种',codeId:1 },
          { name:'混凝土工',codeId:2 },
          { name:'电工',codeId:3 },
          { name:'木工',codeId:4 },
          { name:'水暖工',codeId:5 },
          { name:'瓦工',codeId:6 },
          { name:'架子工',codeId:7 },
          { name:'钢筋工',codeId:8 },
          { name:'架子工',codeId:9 },
      ],
    };
  },
  methods: {
    onPlayerPlay(id){
      this.$http.get('/api/risk_edu/look?id='+id).then(res=>{
        console.log(res);
      })
    },
    onPlayerPause(){
      console.log(12);
    },
    sousoubtn(){
      this.dataAll();
    },
    iconerror(id){
      this.current=0;
    },
    detailInfo(id){
      this.current=id;
    },
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        title:this.sousou.title,
        eduCode:this.sousou.eduCode,
      }
      this.$http.get('/api/risk_edu/selectBy',{params:data}).then(res=>{
        console.log(res);
        this.adverData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addfile(){
      this.$router.push({path:'/saftmanage/rebuildsafteducate?id=0'});
    },
    sousoubtn() {
      console.log(11);
      this.dataAll();
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
    // 教育类型
    educateType(){
        this.$http.get('/api/dict/rist_edu').then(res=>{
            this.edutypeoption=res.data;
        })
    },
  },
  mounted(){
    this.dataAll();
    this.educateType();
  }
};
</script>
<style lang="scss">
  .searchfrom {
    width: 95%;
    margin: auto;
    padding-top: 20px;
  }
.boxInput {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.videoCard{
  // width: 100%;
  height:calc(100vh - 170px);
  // margin: auto;
  .el-card__body{
    padding: 0px;
  }
  .itemcard{
    .title{
      line-height: 25px;
    }
    .image{
      width: 100%;
      height: 140px;
      display: block;
      
    }
    .opone{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: red;
      cursor: pointer;
      position: absolute;
      top: 65px;
      left: 6px;
    }
    .coverImg{
      width: 100%;
      height: 30px;
      display: flex;
      padding: 0 20px;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      position: absolute;
      bottom: 65px;
      background: #000;
      opacity: 0.6;
    }
    .clearfix{
      display: flex;
      justify-content: space-between;
    }
    .time{
      width:180px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
  }
  .coverall{
    width: 100%;
    height: 205px;
    background: #000;
    color: #fff;
    opacity: 0.7;
    margin-top: -205px;
    p{
      padding: 10px 20px;
    }
    .errorIcon{
      float: right;
      margin-top: -7px;
      margin-right: -13px;
      cursor: pointer;
    }
  }
}
.videoCard .el-scrollbar__wrap{
    overflow-x: hidden;
}
</style>
