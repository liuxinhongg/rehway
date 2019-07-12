
<template>
  <div class="equipsearch">
    <p class="persontop">运营计划详情</p>
    <el-scrollbar style="height:100%;overflow-x: hidden;">
      <div>
        <el-scrollbar style="height:100%;">
          <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent ref="saftplanform">
            <table border="1" class="tableinsert">
               <tr>
                <td class="tdleft" colspan="2">上传人：</td>
                <td colspan="8">
                  <el-form-item prop="cmtMan">
                    <el-select v-model="saftplanform.cmtMan" style="width:280px">
                      <el-option
                        v-for="(item,index) in personoption"
                        :key="index"
                        :value="item.workerId"
                        :label="item.workerName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft" colspan="2">审批人：</td>
                <td colspan="8">
                  <el-form-item prop="leaderNext">
                    <el-select v-model="saftplanform.leaderNext" style="width:280px">
                      <el-option
                        v-for="(item,index) in personoption"
                        :key="index"
                        :value="item.workerId"
                        :label="item.workerName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="2">项目：</td>
                <td colspan="8">
                  <el-form-item prop="prjId">
                    <el-select v-model="saftplanform.prjId" style="width:280px">
                      <el-option
                        v-for="(item,index) in categoryoption"
                        :key="index"
                        :value="item.id"
                        :label="item.builderLicensesName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft" colspan="2">计划名称：</td>
                <td colspan="8">
                  <el-form-item prop="bname">
                    <el-input v-model="saftplanform.bname"  style="width:280px"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="2">开始时间：</td>
                <td colspan="8">
                  <el-form-item prop="beginTime" >
                    <el-date-picker  style="width:280px"
                      v-model="saftplanform.beginTime"
                      type="datetime"
                      placeholder="选择日期时间"
                    ></el-date-picker>
                  </el-form-item>
                </td>
                <td class="tdleft" colspan="2">结束时间：</td>
                <td colspan="8">
                  <el-form-item prop="endTime">
                    <el-date-picker  style="width:280px"
                      v-model="saftplanform.endTime"
                      type="datetime"
                      placeholder="选择日期时间"
                    ></el-date-picker>
                  </el-form-item>
                </td>
              </tr>
             
              <tr>
                <td colspan="20">
                  <span style="margin:0 40%;font-size:18px;font-family: '楷体';">设备明细列表</span>
                  <el-button
                    style="text-align:right;margin-right:10px;"
                    type="primary"
                    @click="addmaterial()"
                  >+设备</el-button>
                </td>
              </tr>
              <tr v-if="doubledata.length>0">
                <td colspan="5" style="text-align:center;">序号</td>
                <td colspan="7" style="text-align:center;">设备名称</td>
                <td colspan="5" style="text-align:center;">价格</td>
                <td colspan="3">操作</td>
              </tr>
              <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                <td colspan="5">{{index+1}}</td>
                <td colspan="7" v-if='item.devcode'>{{ item.devcode  }}</td>
                <td colspan="5" v-if='item.price'>{{ item.price }}</td>
                <td colspan="3">
                  <el-button type="text" @click="doubmodify(item.id)">修改</el-button>
                  <el-button type="text" @click="deletedata(item.id)">删除</el-button>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="1">备注：</td>
                <td colspan="19">
                  <el-form-item>
                    <el-input v-model="saftplanform.remark" type="textarea" :rows="2"></el-input>
                  </el-form-item>
                </td>
              </tr>
             
            </table>
            <el-form-item style="text-align:center;">
              <el-button
                type="primary"
                native-type="submit"
                @click="saftplansubmit('saftplanform')"
              >提交</el-button>
              <el-button @click="modelV">保存</el-button>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <el-dialog title="设备" :visible.sync="modelVisible" center :close="closevisible">
                <el-form :model="equipdetialform" ref="equipdetialform" :rules="modelrules" @submit.native.prevent>
                    <table border="1" class="tableinsert" style="width:95%;">
                        <tr>
                            <td class="tdleft">设备：</td>
                            <td>
                                <el-form-item prop="devcode">
                                    <el-select v-model="equipdetialform.devcode" style="width:280px">
                                        <el-option v-for="(item,index) in wzdetail" :key="index" :value="item.devcode" :label="item.mname"> 
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td class="tdleft">价格：</td>
                            <td>
                                <el-form-item prop="price">
                                    <el-input v-model="equipdetialform.price" style="width:280px" type="number"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                    </table>
                    <el-form-item style="text-align:center;">
                        <el-button type="primary" native-type="submit" @click="modelesubmit(equipdetialform)">提交</el-button>
                        <el-button @click="modelVisible=false" >返回</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
    </el-scrollbar>
  </div>
</template>
<script>
import * as material from "@/api/material.js";
import * as dictapi from "@/api/dictapi.js";
import * as equipmanage from "@/api/equipmanage.js";
import formatDate from "@/filter/date.js";
import * as personapi from '@/api/usercenter.js'

export default {
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  //  components: {
  //   child
  // },
  data() {
    return {
        multipleSelection: [],
        tableData:[],
      wzdetail: [],
      fileList: [],
      equipdetialform: {
        devcode: "",
        price: "",
      },
      statusoption: [
        { name: "确认", type: "1" },
        { name: "未确认", type: "0" }
      ],
      modId: 1,
      // 传值   数组
      doubledata: [],
      modelVisible: false,
      num: 0,
      modelrules: {
        devcode: [
          { required: true, message: "请选择设备", trigger: "change" }
        ],
        price: [ 
          { required: true, message: "请输入参考价格", trigger: "blur" },
          { pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,message:'请输入正确的参考价格，小数点不超过两位' } 
        ],
       
      },
      modeloption: [],
      materoption: [],
      localoption: [],
      planMVisible: false,
      ajform: new FormData(),
      // 传值
      saftplanform: {
        bname:'',
        cmtMan: "",
        prjId: "",
        beginTime: "",
        remark: "",
        endTime: "",
        leaderNext:''
      },
      personoption: [],
      categoryoption: [],
      stateoption: [
        { name: "审批中", type: "0" },
        { name: "审批通过", type: "1" },
        { name: "审批失败", type: "2" }
      ],
      useryz: {
        cmtMan: [
          { required: true, message: "请选择上传员工", trigger: "change" }
        ],
        prjId: [{ required: true, message: "请选择项目ID", trigger: "change" }],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        planName: [
          { required: true, message: "请输入设备需求计划名称", trigger: "blur" }
        ]
      },
      saftplanId: 0,
      modleId: 0,
      childValue: [],
      place: [],
      materialname: [],
      form: [],
      fileid: 0,
      devcode:[],
    };
  },
  methods: {
    // 文件上传
    // needfile(per) {
    //   this.ajform.append("filepaths", per.file);
    // },
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
    //修改和添加的公共方法
    saftplansubmit(formName) {
          this.ajform.append("businessId", this.id);
          this.ajform.append("cmtMan", this.saftplanform.cmtMan);
          this.ajform.append("bname", this.saftplanform.bname);
          this.ajform.append("prjId", this.saftplanform.prjId);
          this.ajform.append("remark", this.saftplanform.remark);
          this.ajform.append("leaderNext", this.saftplanform.leaderNext);
          let a = JSON.stringify(this.doubledata);
          this.ajform.append("devBusinessPlanDetails", a);
              if(typeof(this.saftplanform.beginTime) =='number'){
                  this.ajform.append("beginTimeTime", this.saftplanform.beginTime);
              }else{
                this.ajform.append("beginTimeTime", this.saftplanform.beginTime.getTime());
              }
              if(typeof(this.saftplanform.endTime) =='number'){
                  this.ajform.append("endTimeTime", this.saftplanform.endTime);
              }else{
                this.ajform.append("endTimeTime", this.saftplanform.endTime.getTime());
              }
            this.$http
              .post(equipmanage.devbusinessplansubmit, this.ajform)
              .then(res => {
                if (res.data.result == "success") {
                  this.$message.success("添加成功~");
                  this.$router.push("/equipmanage/plansearch");
                } else if (res.data.result == "error") {
                  this.$message.error("添加失败");
                }
              });
        
    },
    // 上传人员
    uploadperson() {
      this.$http.get(dictapi.user).then(res => {
        this.personoption = res.data.list;
      });
    },
    // 分包项目
    category() {
      this.$http.get("/api/sub_prj/selectAll").then(res => {
        this.categoryoption = res.data.list;
      });
    },
    //弹框右上角的x按钮
    closevisible() {
      this.modelVisible = false;
      this.equipdetialform = {};
    },
    //新增计划物资
    addmaterial() {
      this.equipdetialform = {};
      this.modId = 0;
      // 设备查询
      if(this.saftplanform.beginTime == '' || this.saftplanform.endTime == ''){
        alert('开始时间结束时间不能为空')
      }else{
        let data 
        if(typeof(this.saftplanform.beginTime) == 'number' && typeof(this.saftplanform.endTime) == 'number'){
            data = {
              bDateTime:this.saftplanform.beginTime,
              eDateTime:this.saftplanform.endTime
            }
        }
        if(typeof(this.saftplanform.beginTime) != 'number' && typeof(this.saftplanform.endTime) == 'number'){
            data = {
              bDateTime:this.saftplanform.beginTime.getTime(),
              eDateTime:this.saftplanform.endTime
            }
        }
        if(typeof(this.saftplanform.beginTime) == 'number' && typeof(this.saftplanform.endTime) != 'number'){
            data = {
              bDateTime:this.saftplanform.beginTime,
              eDateTime:this.saftplanform.endTime.getTime()
            }
        }
        if(typeof(this.saftplanform.beginTime) != 'number' && typeof(this.saftplanform.endTime) != 'number'){
            data = {
              bDateTime:this.saftplanform.beginTime.getTime(),
              eDateTime:this.saftplanform.endTime.getTime()
            }
        }
         this.$http.get(equipmanage.devreginfoselectCanPlan,{params:data}).then(res=>{
            if(res.data.result == 'null'){
              alert('时间错误')
            }else if(res.data.result == 'error'){
              alert('时间错误')
            }else{
               this.modelVisible = true;
              this.wzdetail = res.data.list
            }
        })

      }
     
    },
    // 弹框的提交事件
    modelesubmit(Fname) {
                if(this.modId==0){
                  let data= {
                        bId:this.id,
                        devcode:this.equipdetialform.devcode,
                        price:this.equipdetialform.price
                      }
                  this.$http.get(equipmanage.devbusinessplandetailinsert,{params:data}).then(res=>{
                      if(res.data.result == 'success'){
                        
                        this.dataall()
                        alert('添加成功')
                      }
                  })
                }else{
                    this.equipdetialform.id=this.modId;
                    for(let val in this.doubledata){
                        if(this.doubledata[val].id==this.modId){
                            this.doubledata[val]=this.equipdetialform;
                        }
                    }
                     for(let item in this.wzdetail){
                            if(this.wzdetail[item].devcode==this.equipdetialform.devcode){
                                this.equipdetialform.mname= this.wzdetail[item].mname;
                            }
                        }
                    this.modelVisible=false;
                }
            
    },
    // 物资计划的修改事件
    doubmodify(id) {
        this.modId = id;
        this.modelVisible = true;
        for (let i in this.doubledata) {
          if (this.doubledata[i].id == id) {
            this.equipdetialform = this.doubledata[i];
          }
        }
    },
    deletedata(id){
         this.$confirm('是否要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.get(equipmanage.devbusinessplandetaildelete,{params:{id:id}}).then(res=>{
              if(res.data.result == 'success'){
                this.dataall()
              }
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
    //材料配置
    materconfig() {
      this.$http.get("/api/mmaterials/selectBy").then(res => {
        this.materoption = res.data.list;
      });
    },
    //仓库位置
    modellocaton() {
      this.$http.get(dictapi.location).then(res => {
        this.localoption = res.data.list;
      });
    },
    modelV() {
          this.ajform.append("businessId", this.id);
          this.ajform.append("cmtMan", this.saftplanform.cmtMan);
          this.ajform.append("bname", this.saftplanform.bname);
          this.ajform.append("prjId", this.saftplanform.prjId);
          this.ajform.append("remark", this.saftplanform.remark);
          let a = JSON.stringify(this.doubledata);
          this.ajform.append("devBusinessPlanDetails", a);
          if(typeof(this.saftplanform.beginTime) =='number'){
              this.ajform.append("beginTimeTime", this.saftplanform.beginTime);
          }else{
            this.ajform.append("beginTimeTime", this.saftplanform.beginTime.getTime());
          }
          if(typeof(this.saftplanform.endTime) =='number'){
              this.ajform.append("endTimeTime", this.saftplanform.endTime);
          }else{
            this.ajform.append("endTimeTime", this.saftplanform.endTime.getTime());
          }
          this.$http
            .post(equipmanage.devbusinessplansave, this.ajform)
            .then(res => {
              if (res.data.result == "success") {
                this.$message.success("添加成功~");
                this.$router.push("/equipmanage/plansearch");
              } else if (res.data.result == "error") {
                this.$message.error("添加失败");
              }
            });
    },
     dataall(){
          let data={
            id:this.id,
            flowType:this.type
          }
          this.$http.get(personapi.draftde,{params:data}).then(res=>{
            if(res.data.result == "error: 参数 [id] 或 [flowType] 不能为空！"){
              alert('查询错误')
            }
                this.saftplanform = res.data.bill
                this.doubledata = res.data.details
                for(let i in this.doubledata){
                    this.doubledata[i].mBeginDateTime = this.doubledata[i].mBeginDate                    
                }
          })
        },




  },
  mounted() {
    // this.wzdata();
    this.uploadperson();
    this.category();
    this.materconfig();
    this.modellocaton();
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.dataall()
    
  }
};
</script>

<style lang="scss">
.equipsearch {
  height: calc(100vh - 100px);
}
.equipsearch .el-scrollbar__wrap {
  overflow-x: hidden;
}
.equipsearch .textOinput {
  outline: none;
  border: none;
}
</style>