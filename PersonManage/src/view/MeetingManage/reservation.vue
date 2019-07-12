<template>
  <div class="wrapper">
    <el-form :inline="true" class="conferenceTop" @submit.native.prevent>
      <el-form-item>
        <span>会议编号：</span> <el-input placeholder="请输入会议室" v-model="input10" clearable style="width:200px;margin-right:20px"></el-input>
      </el-form-item>
      <el-form-item>
        <span>发起人：</span> <el-input placeholder="请输入发起人" v-model="input10" clearable style="width:200px;margin-right:20px"></el-input>
      </el-form-item>
      <el-form-item>
        <span>会议室：</span> <el-input placeholder="请输入会议室" v-model="input10" clearable style="width:200px;margin-right:20px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="search" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button style=" margin:-13px 0px " @click="addyd" type="success">+添加</el-button>
        <el-button style=" margin:-13px 0px">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="tableData" border ref="multipleTable" >
      <el-table-column type="index" label="编号" width="100"></el-table-column>
      <el-table-column prop="theme" label="会议主题" width="350"></el-table-column>
      <el-table-column prop="name" label="发起人" sortable></el-table-column>
      <el-table-column prop="site" label="会议室"></el-table-column>
      <el-table-column prop="begintime" label="开始时间" sortable></el-table-column>
      <el-table-column prop="overtime" label="结束时间"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="centerDialogVisible = true">
            <router-link to="/project/resinput">
            <el-button type="text" style="color:#E6A23C" @click="handleEdit(scope.row.id)"><i class="iconfont icon-edit"></i> 编辑</el-button>
            </router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog title="会议预定" :visible.sync="ydVisible" center width="45%">
      <el-form :model="formLabelAlign" ref="formLabelAlign"  class="demo-formLabelAlign">
        <table border="1" class="tableinsert" style="width:95%;">
          <tr>
              <td class="tdleft">会议主题：</td>
              <td> 
                <el-form-item class="item-inline">
                  <el-input v-model="formLabelAlign.theme" autofocus></el-input>
                </el-form-item>
              </td>
              <td class="tdleft">会议室：</td>
              <td>
                <el-form-item class="item-inline">
                  <el-input v-model="formLabelAlign.site"></el-input>
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td class="tdleft">开始时间：</td>
              <td> 
                <el-form-item prop="beginTime">
                  <el-date-picker v-model="formLabelAlign.beginTime" type="datetime"  format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" placeholder="选择日期时间" @change="startTimeStatus" :picker-options="pickerOptionsStart" style="width:100%;"></el-date-picker>
                </el-form-item>
              </td>
              <td class="tdleft">结束时间：</td>
              <td>
                <el-form-item prop="endTime">
                  <el-date-picker v-model="formLabelAlign.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" placeholder="选择日期时间" @change="endTimeStatus" :picker-options="pickerOptionsEnd" style="width:100%;"></el-date-picker>
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td class="tdleft">发起人：</td>
              <td> 
                <el-form-item prop="name" required>
                  <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
              </td>
              <td class="tdleft">参会人数：</td>
              <td>
                <el-form-item prop="name" required>
                  <el-input v-model="formLabelAlign.number"></el-input>
                </el-form-item>
              </td>
          </tr>
          <tr>
            <td class="tdleft">参会文件：</td>
            <td> 
              <el-form-item label="" prop="fileList">
                <el-upload   ref="upload"  class="upload-demo"  accept="application/pdf"
                    action=" "  :limit="1" :auto-upload="true" :show-file-list="true" :http-request="uploadUserImg">
                    <el-button size="small" type="primary" style="margin-right:20px;">点击上传</el-button>
                    <span slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过500kb</span>
                </el-upload>
              </el-form-item>
            </td>
            <td class="tdleft">设备：</td>
              <td>
                <el-form-item class="item-inline">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="白板"></el-checkbox>
                    <el-checkbox label="投影仪"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </td>
          </tr>
          <tr>
            <td class="tdleft">会议地点：</td>
            <td colspan="3"> 
              <el-form-item prop="site">
                <el-input v-model="formLabelAlign.site" type="textarea" :rows="2"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <el-form-item style="text-align:center;">
          <el-button type="primary" native-type="submit" @click="submitForm('formLabelAlign')">确 定</el-button>
          <router-link to="/project/search">
            <el-button @click="ydVisible = false">取 消</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      multipleSelection: [],
      ydVisible: false,
      currentPage: 1,
      tableData: [
        {
          theme: "关于女神节的活动策划",
          name: "王小虎",
          site: "陕西省西安市雁塔区i都会",
          num: "20",
          begintime: "2019-3-6 11:26",
          overtime: "2019-3-6 11:26"
        },
        {
          theme: "关于女神节的活动策划",
          name: "王小虎",
          site: "陕西省西安市雁塔区i都会",
          num: "20",
          begintime: "2019-3-6 11:26",
          overtime: "2019-3-6 11:26"
        }
      ],
      input10: "",
      //新增弹框信息
      formLabelAlign:{
        beginTime:'',
        number:'',
        endTime:'',
        name: "",
        type: "",
        site: "",
        num: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    addyd(){
      this.ydVisible=true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    search(){},
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
  width: 90%;
  margin: 0 auto;
}
.conferenceTop {
  margin: 20px auto;
  height: 40px;
  margin-bottom: 30px;
}
</style>
