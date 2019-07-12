/*
 * @Author: 谢莹
 * @Date: 2019-05-07 10:53:27 
 * @funtion 材料合同 
 */
<template>
  <div>
    <p class="toptext">合同管理列表</p>
    <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item>
        <span>项目ID：</span>
        <el-select v-model="planform.prjId">
          <el-option
            v-for="(item,index) in categoryoption"
            :key="index"
            :label="item.builderLicensesName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span>供应商：</span>
          <el-select v-model="planform.prId">
              <el-option v-for="(item,index) in personoption" :key="index" :value="item.pid" :label="item.pname"> 
              </el-option>
          </el-select>
          </el-form-item>
      <el-form-item>
        <span>状态：</span>
            <el-select v-model="planform.state">
                <el-option value="0" label="未提交"></el-option>
                <el-option value="1" label="审批未结束"></el-option>
                <el-option value="2" label="审批结束"></el-option>
            </el-select>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button @click="addfile"  type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="adverData" tooltip-effect="dark" border style="width: 90%;margin:auto;" >
      <el-table-column label="合同名称" sortable prop="ctname" width="200"></el-table-column>
      <el-table-column label="供应商" sortable prop="prIdName"></el-table-column>
      <el-table-column label="项目名称" sortable prop="prjIdName"></el-table-column>
      <el-table-column label="合同类型" sortable prop="cttypeName" width="120"></el-table-column>
      <el-table-column label="状态" sortable >
        <template
          slot-scope="scope"
        >{{scope.row.state == 0 ? '未提交' : scope.row.state == 1 ? '正在审批' : "审批结束"}}</template>
      </el-table-column>
      <el-table-column label="主要条款">
        <template slot-scope="scope">
          <el-tooltip trigger="hover" placement="top">
            <div slot="content">{{ scope.row.remark }}</div>
            <div class="boxInput">{{ scope.row.remark }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="modify(scope.row.ctid)"><i class="iconfont icon-edit"></i> 编辑</el-button>
          <el-button type="text" @click="addmater(scope.row.ctid)" icon="el-icon-info">详情</el-button>
        </template>
      </el-table-column> -->
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
    <!-- 新增计划物资弹框 -->
    <el-dialog title="计划物资" :visible.sync="planMVisible" width="40%" center>
      <el-form :model="modelplan" @submit.native.prevent ref="modelplan" :rules="modlerules">
        <table border="1" class="tableinsert" style="width:100%;">
          <tr>
              <td class="tdleft">材料名称：</td>
              <td>
                <el-form-item prop="mid">
                  <el-select v-model="modelplan.mid" placeholder="请选择材料名称" style="width:220px;">
                    <el-option v-for="(item,index) in materoption" :key="index" :label="item.mname" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td class="tdleft">总计划使用量：</td>
              <td>
                <el-form-item prop="mnum">
                  <el-input v-model="modelplan.mnum" style="width:220px;"></el-input>
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td class="tdleft">使用位置：</td>
              <td colspan="3">
                <el-form-item prop="useLoc">
                  <el-input v-model="modelplan.useLoc" style="width:220px;"></el-input>                
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td class="tdleft">备注：</td>
              <td colspan="3">
                <el-form-item>
                  <el-input v-model="modelplan.remark" type="textarea" :rows="2"></el-input>                
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td class="tdleft" colspan="2"><el-button type="primary" @click="modlesubmit('modelplan')" native-type="submit">确 定</el-button></td>
              <td colspan="2"><el-button @click="planMVisible = false">取 消</el-button></td>
          </tr>
        </table>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import * as material from "@/api/material.js";
import * as dictapi from "@/api/dictapi.js";
export default {
  data() {
    return {
      personoption:[],
      // 计划物资表单
      modelplan:{
        planid:'',
        mnum:'',
        useLoc:'',
        remark:'',
        mid:'',
      },
      modlerules:{
        mnum:[{required: true,message: "请输入总计划使用量",trigger: "blur"}],
        useLoc:[{required: true,message: "请输入使用位置",trigger: "blur"}],
        mid:[{required: true,message: "请选择材料",trigger: "change"}],
      },
      modeloption:[],
      materoption:[],
      planMVisible:false,
      categoryoption: [],
      currentPage: 1,
      itemnum: 12,
      totalnum: 1,
      planform: {
        prId: "",
        planname: "",
        prjId: "",
        state: ""
      },
      adverData: [],
      stateoption: [
        { name: "审批中", type: "0" },
        { name: "审批通过", type: "1" },
        { name: "审批失败", type: "2" }
      ]
    };
  },
  methods: {
    //获取全部的数据
    dataAll() {
      let data = {
        page: this.currentPage,
        num: this.itemnum,
        prId: this.planform.prId,
        planname: this.planform.planname,
        prjId: this.planform.prjId,
        state: this.planform.state
      };
      this.$http.get(material.mcontractselect, { params: data }).then(res => {
        console.log(res);
        this.adverData = res.data.list;
        this.modeloption=res.data.list;
        this.totalnum = res.data.count;
        if (res.data.result == "error") {
          this.$message.error("添加文件失败");
        }
      });
    },
    // 供应商
    uploadperson(){
            this.$http.get(material.applay).then(res=>{
                console.log(res);
                this.personoption=res.data.list;
            })
        },
    // 添加计划
    addfile() {
      this.$router.push({ path: "/materialmanage/dopactmanage?id=0" });
    },
    // 根据条件搜索
    plansearch() {
      this.dataAll();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.dataAll();
    },
    // 列表的修改
    modify(id) {
      this.$router.push({ path: "/materialmanage/dopactmanage?id=" + id });
    },
    // 获取项目ID
    category() {
      this.$http.get("/api/sub_prj/selectAll").then(res => {
        // console.log(res);
        this.categoryoption = res.data.list;
      });
    },
    //新增计划物资  
    addmaterial(id){
      this.planMVisible=true;
      this.modelplan.planid=id;
    },
    addmater(id){
      this.$router.push('/materialmanage/dopactpactdetail?id='+id)
    },
    modlesubmit(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    //materoption材料配置
    materconfig(){
      this.$http.get(material.mmaterials).then(res=>{
        // console.log(res);
        this.materoption=res.data.list;
      })
    }
  },
  mounted() {
    this.uploadperson();
    this.dataAll();
    this.category();
    this.materconfig();
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
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.boxInput {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
