<template>
  <div class="addcompany">
    <el-scrollbar style="height:100%;">
      <el-form :model="addinfo" ref="addinfo" :rules="rule">
          <table border="1" class="tableinsert" style="width:90%;">
                <tr>
                    <td class="tdleft" >组织机构代码：</td>
                    <td>
                       <el-form-item prop="corpCode">
                            <el-input v-model.trim="addinfo.corpCode" placeholder="组织机构代码" class="itemadd"></el-input>
                        </el-form-item>
                    </td>
                    <td class="tdleft" >企业名称：</td>
                    <td>
                       <el-form-item  prop="corpName" >
                            <el-input v-model.trim="addinfo.corpName" class="itemadd" placeholder="企业名称"></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="tdleft" >企业注册地区编码：</td>
                    <td>
                        <el-form-item prop="areaCode">
                            <el-cascader :options="areaCodeoption" v-model="addinfo.areaCode" @change="handleItemChange"  class="itemadd" :props="props"></el-cascader>
                        </el-form-item>
                    </td>
                    <td class="tdleft" >银行编码：</td>
                    <td>
                        <el-form-item prop="bankCode">
                            <el-select v-model="addinfo.bankCode" style="width:280px">
                                <el-option v-for="(item,index) in bankoption" :key="index" :value="item.banktype" :label="item.bank"> 
                                </el-option>
                            </el-select>
                            <!-- <el-input v-model.trim="addinfo.bankCode" class="itemadd" placeholder="企业名称"></el-input> -->
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="tdleft" >支行名称：</td>
                    <td>
                        <el-form-item prop="bankName">
                            <el-input v-model.trim="addinfo.bankName" class="itemadd" placeholder="支行名称"></el-input>
                        </el-form-item>
                    </td>
                    <td class="tdleft" >银行卡号：</td>
                    <td>
                        <el-form-item prop="bankNumber">
                            <el-input v-model.trim="addinfo.bankNumber" class="itemadd" placeholder="银行卡号"></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td class="tdleft" >银行联号：</td>
                    <td>
                        <el-form-item prop="bankLinkNumber">
                            <el-input v-model.trim="addinfo.bankLinkNumber" class="itemadd" placeholder="银行联号"></el-input>
                        </el-form-item>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <el-form-item style="text-align:center;">
                <el-button type="primary" @click="submitForm('addinfo')">提交</el-button>
                <el-button @click="resetForm()">返回</el-button>
            </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>

<script>
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
        return{
             addinfo:{
                 areaCode:[],
                 corpName:'',
                 corpCode:'',
                 corpType:'',
                 bankName:'',
                 bankCode:'',
                 bankNumber:'',
                bankLinkNumber:'',                 
             },
             bankoption:[],
             props: {
                value: 'code',
                label: 'name',
                children: 'child'
            },
             rule:{
                corpName:[
                    { required: true, message: '请输入企业名称', trigger: 'blur' },
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                ],
                corpCode:[
                    { required: true, message: '请输入组织机构代码', trigger: 'blur' },
                    {pattern:/[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/,message:'格式错误'},
                ],
                areaCode:[
                    { required: true, message: '请选择企业注册地区编码', trigger: 'change' },
                ],
                bankCode:[{required: true,message: "请选择银行名称",trigger: "change"}],
                bankName:[{required: true,message: "请输入供应商地址",trigger: "blur"},{pattern:/^[\u4e00-\u9fa5_a-zA-Z]{7,20}$/,message:'请输入7~20个字符的供应商地址'}],
                bankLinkNumber:[{required: true,message: "请输入银行账号",trigger: "blur"},{pattern:/^[1-9]{1}[0-9]{15,18}$/,message:'请输入正确的银行卡号'}],
                bankNumber:[{required: true,message: "请输入银行账号",trigger: "blur"},{pattern:/^[1-9]{1}[0-9]{15,18}$/,message:'请输入正确的银行卡号'}],
                // bankCode:[{required: true,message: "请输入银行账号",trigger: "blur"},{pattern:/^[1-9]{1}[0-9]{15,18}$/,message:'请输入正确的银行卡号'}],
             },
             areaCodeoption:[],
             NewId:''
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                var that=this;
                if (valid) {
                    if(that.NewId==1){
                        // var that=this;
                        let data={
                            corpCode:that.addinfo.corpCode,
                            bankCode:that.addinfo.bankCode,
                            bankNumber:that.addinfo.bankNumber,
                            bankName:that.addinfo.bankName,
                            bankLinkNumber:that.addinfo.bankLinkNumber,
                            corpName:that.addinfo.corpName,
                            areaCode:that.addinfo.areaCode[2],
                            entId:this.NewId,
                        }
                        that.$http.get('/api/ent/ent_insert_info',{params:data}).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                            that.$router.push({path:'/project/company'});
                            }
                        })
                    }else{
                        console.log("我是编辑哦~");
                        let data={
                            corpCode:that.addinfo.corpCode,
                            corpName:that.addinfo.corpName,
                            areaCode:that.addinfo.areaCode[2],
                            entId:this.NewId
                        }
                        that.$http.get('/api/ent/ent_update_info',{params:data}).then(res=>{
                            console.log(res);
                            if(res.data.result=='success'){
                                that.$router.push({path:'/project/company'});
                            }
                        })
                    }
                    
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$router.push({path:'/project/company'})
        },
        handleItemChange(val) {
            this.addinfo.areaCode=val;
            console.log(this.addinfo.areaCode[2]);
        },
        //银行
        bankdict(){
            this.$http.get(dictapi.bank).then(res=>{
                // console.log(res);
                this.bankoption=res.data;
            })
        },
    },
  mounted() {
      this.bankdict();
    //   行政区的三级联动接口
    this.$http.post("/api/dict/regioncode_level").then(res => {
      console.log(res);
      this.areaCodeoption = res.data;
    });
    this.NewId=this.$route.query.id;
        // console.log(this.NewId);
    if(this.NewId==0){
    // 编辑带着数据的接口
        this.$http.post('/api/ent/ent_select_forupdate?entId='+this.NewId).then(res=>{
            console.log(res);
            this.addinfo=res.data;
        })
    }
    
  }
  
};
</script>

<style lang="scss">
.addcompany {
  width: 95%;
  margin: 20px auto;
  height: calc(100vh - 85px);
  .el-collapse-item__header {
    font-weight: bold;
    font-size: 14px;
  }
  .itemadd {
    width: 280px;
  }
}
</style>
<style >
.addcompany .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>