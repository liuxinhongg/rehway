/*
 * @Author: 谢莹
 * @Date: 2019-05-07 10:53:27 
 * @funtion 结算查询
 */
<template>

  <div>
    <el-form :model="planform" class="searchfrom" :inline="true" @submit.native.prevent>
      <el-form-item>
        <span>合同名称：</span>
         <el-select v-model="planform.ctId">
            <el-option
              v-for="(item,index) in htdetail"
              :key="index"
              :label="item.ctname"
              :value="item.ctid"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="plansearch" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button @click="insertjs" type="success">+新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="needData"
      tooltip-effect="dark"
      border
      style="width: 90%;margin:auto;"
    >
      <el-table-column type="index" width="80" label="序号"></el-table-column>
      <el-table-column label="合同编号" sortable prop="actId" width="200"></el-table-column>
      <el-table-column label="合同名称" sortable prop="ctIdName"></el-table-column>
      <el-table-column label="生成日期" sortable>
        <template slot-scope="scope">
          {{scope.row.genDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button  type="text"  style="color:#F56C6C" icon="el-icon-delete-solid" @click="modi(scope.row.mrid)">删除</el-button>
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
  </div>
</template>
<script>
import  formatDate from '@/filter/date.js';
import * as material from "@/api/material.js";
import * as dictapi from "@/api/dictapi.js";
export default {
    filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
        id:[],
        multipleSelection: [],
        tableData:[],
        ysdlist:[],
        
        dialogFormVisible: false,
      // 计划物资表单
      modelplan: {
        planid: "",
        mnum: "",
        useLoc: "",
        remark: "",
        mid: ""
      },

      modlerules: {
        mnum: [
          { required: true, message: "请输入总计划使用量", trigger: "blur" }
        ],
        useLoc: [
          { required: true, message: "请输入使用位置", trigger: "blur" }
        ],
        mid: [{ required: true, message: "请选择材料", trigger: "change" }]
      },
     
      htdetail:[],
      modeloption: [],
      materoption: [],
      categoryoption: [],
      currentPage: 1,
      itemnum: 12,
      totalnum: 1,
      planform: {
        planid: "",
        planname: "",
        prjid: "",
        state: ""
      },
      needData: [],
      stateoption: [
        { name: "审批中", type: "0" },
        { name: "审批通过", type: "1" },
        { name: "审批失败", type: "2" }
      ],
      gydata:[],
    };

  },
  methods: {
    insertjs(){
      this.$router.push({ path: "/materialmanage/materialdocount?" });
    },
      selectpro(){
          let getDatetime
          if(this.saftplanform.getDate){
            getDatetime = this.saftplanform.getDate.getTime()
          }
          let data={
              ctdateTime:getDatetime,
              prId:this.saftplanform.ctId,
              prjId:this.saftplanform.prjId,
          }
          console.log(data);
          this.$http.get(material.mcontractselect,{params:data}).then(res=>{
              console.log(res);
              this.htdetail = res.data.list;
          });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    
    //获取全部的数据
    dataAll() {
      let data = {
        page: this.currentPage,
        num: this.itemnum,
        ctId: this.planform.ctId,
      };
      this.$http.get(material.mactMonthselectBy, { params: data }).then(res => {
        console.log(res);
        this.needData = res.data.list;
        this.modeloption = res.data.list;
        this.totalnum = res.data.count;
      });
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
    // htdetail(){
    //    this.$http.get(material.mcontractselect,{params:data}).then(res=>{
    //           console.log(res);
    //           this.htdetail = res.data.list;
    //       });
    // },
    htdata(){
        this.$http.get(material.mcontractselect).then(res=>{
            console.log(res);
            this.htdetail=res.data.list;
        })
    },
    //详情
    modi(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                     this.$http.get('#',{params:{id:id}}).then(res=>{
                          console.log(res);
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
    // 获取项目ID
    category() {
      this.$http.get("/api/sub_prj/selectAll").then(res => {
        // console.log(res);
        this.categoryoption = res.data.list;
      });
    },
    modlesubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 供应商
        gyingdata(){
            this.$http.get(material.applay).then(res=>{
                // console.log(res);
                this.gydata = res.data.list
            })
        },
        // 验收单
        // ysddata(){
        //     this.$http.get(material.mapproachselectBy).then(res=>{
        //         console.log(res);
        //         this.ysdlist = res.data.list
        //     })
        // },
    //materoption材料配置
    materconfig() {
      this.$http.get(material.mmaterials).then(res => {
        // console.log(res);
        this.materoption = res.data.list;
      });
    }
  },
  mounted() {
    this.htdata();
    this.gyingdata();
    //   this.ysddata()
    this.dataAll();
    this.category();
    this.materconfig();
    
  }
};
</script>
<style lang="scss">
// .tableinsert tr td{
//     padding: 0px;
// }
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
