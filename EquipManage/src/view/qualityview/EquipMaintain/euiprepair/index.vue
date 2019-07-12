<template>
  <div class="qualitycheck">
    <el-scrollbar style="height:100%;">
      <el-form :model="sousou" class="searchfrom" :inline="true" @submit.native.prevent>
        <el-form-item>
          <span>维修人:</span>
            <el-select v-model="sousou.repairmMan" >
                <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click="sousoubtn" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
          <!-- <el-button  @click="addfile" type="success">+新增</el-button> -->
          <el-button><a :href="'/api/quality_plan/selectBy_?proId='+sousou.proId+'&chkArea='+sousou.chkArea">导出</a></el-button>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="hiddenpageData" tooltip-effect="dark" border style="width: 90%;margin:auto;">
        <el-table-column label="编号" type="index" width="100"></el-table-column>
        <el-table-column label="设备名" prop="chkIdInfo[0].maintIdInfo[0].devcodeMname" ></el-table-column>
        <el-table-column label="保养名" prop="chkIdInfo[0].maintIdInfo[0].maintainName" ></el-table-column>
        <el-table-column label="维修人" prop="repairManName" ></el-table-column>
        <el-table-column label="人力费用" prop="humanMoney"></el-table-column>
        <el-table-column label="材料费用" prop="materialMoney"></el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyfile(scope.row.id)"><i class="iconfont icon-edit"></i>编辑</el-button>
            <!-- <el-button type="text" @click="modifyfile(scope.row.id)" style="color:#E6A23C;">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>

<el-dialog :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="useryz" @submit.native.prevent  ref="form">
    <table border="1" class="tableinsert">
                    <tr>
                        
                        <td class="tdleft">维修人：</td>
                        <td>
                            <el-form-item prop="repairMan">
                                <el-select v-model="form.repairMan" >
                                    <el-option v-for="(item,index) in personoption" :key="index" :value="item.workerId" :label="item.workerName"> 
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="tdleft">材料费用：</td>
                        <td>
                            <el-form-item prop="humanMoney">
                                <el-input v-model="form.humanMoney"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdleft">人力费用：</td>
                        <td colspan="3">
                            <el-form-item prop="materialMoney">
                                 <el-input v-model="form.materialMoney"  type="number"></el-input>
                            </el-form-item>
                        </td>
                       
                    </tr>
                    <tr>
                      <td class="tdleft">附件文件</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-upload action="" :file-list="fileList" :multiple=true :http-request="handlefile">
                                    <el-button size="small" type="primary">选取文件</el-button>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="tdleft">
                            <el-form-item>
                                <el-button type="primary"  native-type="submit" @click="prsubForm('form')" >提交</el-button>
                            </el-form-item>
                        </td>
                        <td colspan="2">
                            <el-form-item>
                                <el-button @click="dialogFormVisible = false">返回</el-button>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
  </el-form>
  <!-- <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary"  native-type="submit" @click="prsubForm('form')" >确 定</el-button>
  </div> -->
</el-dialog>

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
import * as qualitymanage from '@/api/qualityapi.js'
import * as dictapi from '@/api/dictapi.js'
import * as equipmanage from '@/api/equipmanage.js'
export default {
  filters: {
    formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  data() {
    return {
      id:0,
      dialogFormVisible: false,
        form: {
          repairMan:'',
          humanMoney: '',
          materialMoney: ''
        },
        useryz:{
           repairMan:[{required: true,message: "请选择维修人",trigger: "change"}],
        },
        formLabelWidth: '120px',
      ProOption:[],
      personoption:[],
      currentPage: 1,
      itemnum:15,
      totalnum:1,
            fileList:[],
      sousou: {
        repairmMan:'',
      },
      hiddenpageData: [],
      checkform : new FormData()
    };
  },
  methods: {
    dataAll(){
      let data={
        page:this.currentPage,
        num:this.itemnum,
        repairMan:this.sousou.repairmMan
      }
      this.$http.get(equipmanage.devrepairedselectBy,{params:data}).then(res=>{
        console.log(res);
        this.hiddenpageData=res.data.list;
        this.totalnum=res.data.count;
        if(res.data.result=='error'){
          this.$message.error('添加文件失败');
        }
      })
    },
    uploadperson(){
            this.$http.get(dictapi.user).then(res=>{
                this.personoption=res.data.list;

            })
        },
    handlefile(par){
            this.checkform.append('filepaths',par.file);
        },
    prsubForm(formName) {
      //  console.log(this.form);
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.checkform.append('materialMoney',this.form.materialMoney)
                this.checkform.append('humanMoney',this.form.humanMoney)
                this.checkform.append('chkId',this.form.chkId)
                this.checkform.append('repairMan',this.form.repairMan)
                this.checkform.append('id',this.form.id)
                    console.log(this.form);
                    this.$http.post(equipmanage.devrepairedupdate,this.checkform).then(res=>{
                        // console.log(res);
                        if(res.data.result=='success'){
                            this.$message.success('添加成功~');
                            this.dialogFormVisible = false
                            this.dataAll()
                            // this.$router.push('/equipmanage/euiprepair');
                        }else if(res.data.result=='error'){
                            this.$message.error('添加失败');
                        }
                    })
                }
        });
    },
    // 表格中的修改
    modifyfile(id){
      this.id = id
      this.dialogFormVisible = true
      this.$http.get(equipmanage.devrepairedselectBy,{params:{id:id}}).then(res=>{
          console.log(res);
          this.form=res.data.list[0];
      })
    },
    sousoubtn() {
      this.dataAll();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.dataAll();
    },
    // 检查项目
    Protype(){
      this.$http.get(dictapi.subprj).then(res=>{
          this.ProOption=res.data.list;
      })
    },
  },
  mounted(){
    this.Protype();
    this.dataAll();
    this.uploadperson()
  }
};
</script>
<style lang="scss">
.qualitycheck{
  width:100%;
  height: calc(100vh - 115px);
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
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
