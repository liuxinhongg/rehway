/*
 * @Author: 谢莹
 * @Date: 2019-05-07  
 * @function: 材料入场--新增/修改
 */
<template>
  <div class="rebuild">
    <el-scrollbar style="height:100%;overflow-x: hidden;">
      <div v-if="childsta==false">
        <el-scrollbar style="height:100%;">
          <el-form :model="saftplanform" :rules="useryz" @submit.native.prevent ref="saftplanform">
            <el-form-item style="text-align:center;">
              <h3>材料入场表</h3>
            </el-form-item>
            <table border="1" class="tableinsert">
              <tr>
                <td class="tdleft" colspan="1">车牌号：</td>
                <td colspan="9">
                  <el-form-item prop="vno">
                    <el-input v-model.trim="saftplanform.vno" style="width:280px" placeholder="车牌号"></el-input>
                  </el-form-item>
                </td>
                <td class="tdleft" colspan="1">验证人员：</td>
                <td colspan="9">
                  <el-form-item prop="verMan">
                    <el-select v-model="saftplanform.verMan" style="width:280px">
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
                <td class="tdleft" colspan="1">供应商ID：</td>
                <td colspan="9">
                  <el-form-item prop="proId">
                    <el-select v-model="saftplanform.proId" style="width:280px">
                      <el-option
                        v-for="(item,index) in gongyong"
                        :key="index"
                        :value="item.pid"
                        :label="item.pname"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft">合同：</td>
                <td colspan="9">
                  <el-form-item prop="mConId">
                       <el-select v-model="saftplanform.mConId" style="width:280px" @change='htchange'>
                            <el-option
                                v-for="(item,index) in heton"
                                :key="index"
                                :value="item.ctid"
                                :label="item.ctname"
                            ></el-option>
                        </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="1">材料：</td>
                <td colspan="9">
                  <el-form-item prop="aprlistId">
                    <el-select v-model="saftplanform.aprlistId" style="width:280px">
                      <el-option
                        v-for="(item,index) in categoryoption"
                        :key="index"
                        :value="item.id"
                        :label="item.materials"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="tdleft" colspan="1">状态：</td>
                <td colspan="9">
                  <el-form-item prop="ifacpt">
                    <el-select v-model="saftplanform.ifacpt" style="width:280px">
                      <el-option label="接收" value="0"></el-option>
                      <el-option label="退回" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="20">
                  <span style="margin:0 40%;font-size:18px;font-family: '楷体';">材料明细</span>
                  <el-button
                    style="text-align:right;margin-right:10px;"
                    type="primary"
                    @click="addmaterial()"
                  >+材料</el-button>
                </td>
              </tr>
              <tr v-if="doubledata.length>0">
                <td colspan="1" style="text-align:center;">序号</td>
                <td colspan="3" style="text-align:center;">物资</td>
                <td colspan="3" style="text-align:center;">物资数量</td>
                <td colspan="3" style="text-align:center;">是否存放仓库</td>
                <td colspan="3" style="text-align:center;">存放仓库</td>
                <td colspan="3" style="text-align:center;">物资合格证</td>
                <td colspan="3" style="text-align:center;">是否退回</td>
                <td colspan="1" style="text-align:center;">操作</td>
              </tr>
              <tr v-for="(item,index) in doubledata" :key="index" style="text-align:center;">
                <td colspan="1">{{index+1}}</td>
                <td colspan="3">{{item.mmidName}}</td>
                <td colspan="3">{{item.mnum}}</td>
                <td colspan="3">{{item.ifsave==0 ? "不存放":"存放"}}</td>
                <td colspan="3">{{item.repoIdName}}</td>
                <td colspan="3"><img :src="item.stdFile" alt="" style="width:50px;"></td>
                <td colspan="3">{{item.rmanver==0 ? "确认":"退回"}}</td>
                <td colspan="1">
                  <el-button type="text" @click="doubmodify(index+1)">修改</el-button>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="1">物资照片清单：</td>
                <td colspan="19">
                  <el-form-item>
                    <el-upload action :file-list="fileList" :multiple="true" :http-request="handle">
                      <el-button size="small" type="primary">选取文件</el-button>
                    </el-upload>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="1">物资进场申报表：</td>
                <td colspan="19">
                   <el-form-item>
                    <el-upload action :file-list="fileList" :multiple="true" :http-request="handlefi">
                      <el-button size="small" type="primary">选取文件</el-button>
                    </el-upload>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="tdleft" colspan="1">备注：</td>
                <td colspan="19">
                  <el-form-item>
                    <el-input v-model.trim="saftplanform.remark" type="textarea" :rows="2"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
            <el-form-item style="text-align:center;">
              <el-button type="primary" native-type="submit" @click="saftplansubmit('saftplanform')" >提交</el-button>
              <el-button @click="returncancle()" style="margin:0 40px;">返回</el-button>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <el-dialog title="计划物资" :visible.sync="modelVisible" center :close="closevisible">
        <el-form :model="modelform" ref="modelform" :rules="modelrules" @submit.native.prevent>
          <table border="1" class="tableinsert" style="width:95%;">
            <tr>
              <td class="tdleft">物资：</td>
              <td>
                <el-form-item prop="mmid">
                  <el-select v-model="modelform.mmid" style="width:280px">
                    <el-option
                      v-for="(item,index) in materoption"
                      :key="index"
                      :value="item.id"
                      :label="item.mname"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td class="tdleft">数量：</td>
              <td>
                <el-form-item prop="mnum">
                  <el-input v-model="modelform.mnum" style="width:280px" placeholder="请选择数量"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft">是否存放仓库：</td>
              <td>
                <el-form-item prop="ifsave">
                  <el-select v-model="modelform.ifsave" style="width:280px">
                    <el-option value="0" label="不存放"></el-option>
                    <el-option value="1" label="存放"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td class="tdleft">存放仓库：</td>
              <td>
                <el-form-item prop="repoId">
                  <el-select v-model="modelform.repoId" style="width:280px">
                    <el-option
                      v-for="(item,index) in localoption"
                      :key="index"
                      :value="item.repoid"
                      :label="item.reponame"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
             <tr>
              <td class="tdleft">确认</td>
              <td >
                <el-form-item prop="rmanver">
                  <el-select v-model="modelform.rmanver" style="width:280px">
                    <el-option value="0" label="确认"></el-option>
                    <el-option value="1" label="退回"></el-option>
                  </el-select>
                </el-form-item>
              </td>
               <td class="tdleft">合同明细</td>
              <td>
                <el-form-item prop="mcondeid">
                  <el-select v-model="modelform.mcondeid" style="width:280px">
                    <el-option
                      v-for="(item,index) in hdetail"
                      :key="index"
                      :value="item.ctmId"
                      :label="item.mIdName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td class="tdleft">物资合格证：</td>
              <td colspan='3'>
                <el-form-item>
                  <el-upload
                    accept=".jpg, .jpeg, .png"
                    action
                    :on-change="handlefile"
                    :limit="1"
                    list-type="picture"
                    :auto-upload="false"
                  >
                    <img :src="imageUrl" class="avatar" id="avatar">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </td>
            </tr>
           
          </table>
          <el-form-item style="text-align:center;">
            <el-button type="primary" native-type="submit" @click="modelesubmit('modelform')">提交</el-button>
            <el-button @click="modelVisible=false">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-scrollbar>
  </div>
</template>
<script>
import MStore from "@/components/common/mstore";
import * as material from "@/api/material.js";
import * as dictapi from "@/api/dictapi.js";
export default {
  watch: {
    doubledata: {
      handler(val, oldVal) {
        console.log(val);
      },
      deep: true
    }
  },
  data() {
    return {
      modelform: {
        mmid: "",
        mnum: "",
        remark: "",
        ifsave: "",
        useLocName: "",
        rmanver: "",
        repoId: "",
        id: 0,
        stdFile:'',
        stdFileName:'',
        mname: "",
        repoIdName:'',
      },
        imageUrl:'',
      statusoption: [
        { name: "确认", type: "1" },
        { name: "未确认", type: "0" }
      ],
      modId: 0,
      // 传值   数组
      doubledata: [],
      modelVisible: false,
      num: 0,
      childsta: false,
      // 计划物资表单
      modelplan: {
        mnum: "",
        remark: "",
        mmid: ""
      },
      modelrules: {
        mnum: [{ required: true, message: "请输入数量", trigger: "blur" },
          {pattern:/^[1-9]{0,1}[0-9]{0,4}$/,message:'数量范围1~5个字符'}],
        repoId: [
          { required: true, message: "请选择存放仓库", trigger: "blur" }
        ],
        mmid: [{ required: true, message: "请选择材料", trigger: "change" }],
        ifsave: [
          { required: true, message: "请选择是否存放仓库", trigger: "change" }
        ],
        rmanver: [
          { required: true, message: "请选择确认或退回", trigger: "change" }
        ],
        mcondeid: [
          // { required: true, message: "请选择合同明细", trigger: "change" }
        ],
      },
      heton:[],
      modeloption: [],
      materoption: [],
      localoption: [],
      planMVisible: false,
      ajform: new FormData(),
      fileList: [],
      // 传值
      saftplanform: {
        verMan: "",
        vno: "",
        proId: "",
        ifacpt: "",
        mConId:'',
        files: "",
        remark: "",
        arvDate: "",
        aprlistId: ""
      },
      personoption: [],
      categoryoption: [],
      stateoption: [
        { name: "审批中", type: "0" },
        { name: "审批通过", type: "1" },
        { name: "审批失败", type: "2" }
      ],
      useryz: {
        verMan: [
          { required: true, message: "请选择上传员工", trigger: "change" }
        ],
        proId: [{ required: true, message: "请选择项目ID", trigger: "change" }],
        ifacpt: [{ required: true, message: "请选择状态", trigger: "change" }],
        vno: [{ required: true, message: "请输入总计划名称", trigger: "blur" },
        {pattern:/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/,
        message:'请输入正确的车牌号'}
        ],
        mConId: [{ required: true, message: "请选择合同", trigger: "change" }],
        aprlistId: [{ required: true, message: "请选择材料", trigger: "change" }],   
      },
      saftplanId: 0,
      modleId: 0,
      childValue: [],
      place: [],
      materialname: [],
      form: [],
      gongyong: [],
      hdetail:[],
    };
  },
  methods: {
    htchange(){
      console.log(this.saftplanform.mConId);
      let data ={
        ctId:this.saftplanform.mConId,
        ctdState:0
      } 
      this.$http.get(material.mcontractselectBy,{params:data}).then(res=>{
        console.log(res);
            this.hdetail = res.data.list
        })
    },
    handle(par) {
      // 物资清单照片
      this.ajform.append("filepathsmlist", par.file);
    },
    handlefi(par) {
    //   物资入场申报表;
      this.ajform.append("filepathsdeclare", par.file);
    },
    //上传文件 获取文件信息的方法
    handlefile(file, fileList) {
      console.log(file,fileList)
        this.modelform.stdFileName = fileList[0].name
        this.getBase64(file.raw).then(res => {
            console.log(res);
            this.modelform.stdFile = res;
        });
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    //修改和添加的公共方法
    saftplansubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ajform.append("verMan", this.saftplanform.verMan);
          this.ajform.append("aprlistId", this.saftplanform.aprlistId);
          this.ajform.append("vno", this.saftplanform.vno);
          this.ajform.append("proId", this.saftplanform.proId);
          this.ajform.append("mConId", this.saftplanform.mConId);
          this.ajform.append("ifacpt", this.saftplanform.ifacpt);
          this.ajform.append("remark", this.saftplanform.remark);
          let a = JSON.stringify(this.doubledata);
          this.ajform.append("mAprLists", a);
          console.log(this.doubledata);
          console.log(this.saftplanform);
          if (this.saftplanId == 0) {
            this.$http.post(material.mappaddinsert, this.ajform).then(res => {
              console.log(res);
              if (res.data.result == "success") {
                this.$message.success("添加成功~");
                this.$router.push("/materialmanage/materialenter");
              } else if (res.data.result == "error") {
                this.$message.error("添加失败");
              }
            });
          } else {
            // 编辑的方法
            this.ajform.append("planid", this.saftplanId);
            this.$http.post(material.mplanupdate, this.ajform).then(res => {
              conssolee.log(res);
              if (res.data.result == "success") {
                this.$message.success("修改成功~");
                this.$router.push("/materialmanage/materialenter");
              } else if (res.data.result == "error") {
                this.$message.error("添加失败");
              }
            });
          }
        } else {
          this.$message.error("提交数据失败");
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5kb!');
        }
        return isJPG && isLt2M;
      },
    // 返回按钮的事件
    returncancle() {
      this.$router.push({ path: "/materialmanage/materialenter" });
    },
    // 上传人员
    uploadperson() {
      this.$http.get(dictapi.user).then(res => {
        this.personoption = res.data.list;
      });
    },
    // cailiao
    category() {
      this.$http.get(material.selectMaterialsTypes).then(res => {
        this.categoryoption = res.data;
      });
    },
    //弹框右上角的x按钮
    closevisible() {
      this.modelVisible = false;
      this.modelform = {};
    },
    //新增计划物资
    addmaterial() {
      this.modelVisible = true;
      this.modelform = {};
    },
    // 弹框的提交事件
    modelesubmit(Fname) {
      this.$refs[Fname].validate((valid) => {
        if (valid) {
          if (this.id == 0) {
            if (this.modId == 0) {
                this.modelform.id = Math.floor(Math.random() * 200);
                // console.log(this.modelform.declare);
                this.doubledata.push(this.modelform);
                console.log(this.doubledata)
                if (this.doubledata.length != 0) {
                    // for (let item in (this.doubledata,  this.materoption,  this.localoption)) {
                    //     if (this.modelform.mmid == this.materoption[item].id) {
                    //         this.modelform.mmidName = this.materoption[item].mname;
                    //     }
                    //     if(this.localoption[item].repoid==this.modelform.repoId){
                    //         this.modelform.repoIdName= this.localoption[item].reponame;
                    //     }
                    // }
                    for (let item in this.materoption) {
                        if (this.modelform.mmid == this.materoption[item].id) {
                            this.modelform.mmidName = this.materoption[item].mname;
                        }
                    }
                    for (let item in this.localoption) {
                        if(this.localoption[item].repoid==this.modelform.repoId){
                            this.modelform.repoIdName= this.localoption[item].reponame;
                        }
                    }
                }
                this.modelVisible = false;
            } else {
                console.log("我是编辑");
                for (let val in this.doubledata) {
                    if (this.doubledata[val].id == this.modId) {
                    this.doubledata[val].mname = this.modelform.mname;
                    }
                }
                // for (let item in (this.doubledata,  this.materoption,  this.localoption)) {
                //     if (this.modelform.mmid == this.materoption[item].id) {
                //         this.modelform.mmidName = this.materoption[item].mname;
                //     }
                //     if(this.localoption[item].repoid==this.modelform.repoId){
                //         this.modelform.repoIdName= this.localoption[item].reponame;
                //     }
                // }
                for (let item in this.materoption) {
                    if (this.modelform.mmid == this.materoption[item].id) {
                        this.modelform.mmidName = this.materoption[item].mname;
                    }
                }
                for (let item in this.localoption) {
                    if(this.localoption[item].repoid==this.modelform.repoId){
                        this.modelform.repoIdName= this.localoption[item].reponame;
                    }
                }
                this.modelVisible = false;
            }
          } else {
            let as = Fname
            // console.log("我是编辑");
            let formlist =  new FormData();
            Fname = JSON.stringify([Fname]);        
            formlist.append('list',Fname)
            this.$http.post(material.maprlistupdate,  formlist ).then(res => {
                  console.log(res);
                  if(res.data.result == 'success'){
                    this.$http
                      .get(material.mapproachselectBy, { params: { aprid: this.saftplanId } })
                      .then(res => {
                        console.log(res);
                        this.saftplanform = res.data.list[0];
                        this.doubledata = res.data.list[0].mAprList;//ifacpt
                        if(typeof(res.data.list[0])=='number'){
                          this.saftplanform.ifacpt = res.data.list[0].ifacpt.toString();
                        };
                      });
                  }
                
            });
            // this.modelform.id=this.id;
                this.modelVisible = false;
          }
        }
      })
    },
    // 物资计划的修改事件
    doubmodify(id) {
      if (this.id == 0) {
          console.log(id);
          this.modId = id;
          console.log(this.doubledata);
          this.modelVisible = true;
          for (let i in this.doubledata) {
            if (this.doubledata[i].id == id) {
              this.modelform = this.doubledata[i];
              
            }
        }
       
      } else {
        console.log(id);
        this.modelVisible = true;
        this.$http
          .get(material.maprlistselectBy, { params: { id: id } })
          .then(res => {
            console.log(res);
            this.modelform = res.data.list[0];  
            if(typeof(res.data.list[0].rmanver)=='number'){  
              this.modelform.rmanver = res.data.list[0].rmanver.toString()
            }
            if(typeof(res.data.list[0].ifsave)=='number'){  //
              this.modelform.ifsave = res.data.list[0].ifsave.toString()
            }

          });
      }
    },
    //材料配置
    materconfig() {
      this.$http.get(material.mmaterials).then(res => {
        this.materoption = res.data.list;
      });
    },
    // 合同明细
    htdetail(){
        
    },
    //仓库位置
    modellocaton() {
      this.$http.get(material.mrepo).then(res => {
        this.localoption = res.data.list;
      });
    },
    hetong(){
        this.$http.get(material.mcontractselect).then(res=>{
            console.log(res);
            this.heton=res.data.list;
        })
    },
    gingying() {
      this.$http.get(material.applay).then(res => {
        console.log(res);
        this.gongyong = res.data.list;
      });
    },
    updats() {
      if (this.saftplanId != 0) {
        this.$http
          .get(material.mplan, { params: { planid: this.saftplanId } })
          .then(res => {
            // console.log(res);
            this.saftplanform = res.data.list[0];
            this.doubledata = res.data.list[0].mPlanDetails;
          });
        console.log("编辑前请求的数据");
      }
    }
  },
  mounted() {
      this.htdetail();
    this.hetong();
    this.gingying();
    this.uploadperson();
    this.category();
    this.materconfig();
    this.modellocaton();
    this.saftplanId = this.$route.query.id;
    this.id = this.$route.query.id;
    //列表页面编辑操作
    if (this.saftplanId != 0) {
      this.$http
        .get(material.mapproachselectBy, { params: { aprid: this.saftplanId } })
        .then(res => {
          console.log(res);
          this.saftplanform = res.data.list[0];
          this.doubledata = res.data.list[0].mAprList;//ifacpt
          if(typeof(res.data.list[0])=='number'){
             this.saftplanform.ifacpt = res.data.list[0].ifacpt.toString();
          };
        });
      console.log("编辑前请求的数据");
    }
  }
};
</script>

<style lang="scss">
.rebuild {
  height: calc(100vh - 100px);
}
.rebuild .el-scrollbar__wrap {
  overflow-x: hidden;
}
.rebuild .textOinput {
  outline: none;
  border: none;
}
</style>
<style>
    .avatar-uploader-icon {
        font-size: 20px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #ccc;
    }

</style>    
