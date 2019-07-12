/*
 * @Author: 刘新红 
 * @Date: 2019-03-21 18:57:10 
 * @function：任务管理--添加和编辑
 */
<template>
  <div class="asset">
    <h2>任务管理</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="优先级：" prop="priority">
            <el-input v-model="ruleForm.priority"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :rows="2" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="负责人：" prop="creator">
            <el-input v-model="ruleForm.creator"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="过期时间：" prop="expirationTime">
            <el-date-picker v-model="ruleForm.expirationTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        name: "",
        priority: "",
        remark: "",
        creator: ""
      },
      rules: {
        name: [{ required: true, message: "请输入领用人", trigger: "change" }],
        priority: [{ required: true, message: "请输入申请原因", trigger: "change" } ],
        remark: [ { required: true, message: "请输入资产名称",trigger: "change" } ],
        creator: [{ required: true, message: "请输入数量", trigger: "change"}],
        status:[{ required: true, message: "请输入状态", trigger: "change"}],
        expirationTime:[{required: true, message: "请输入时间", trigger: "change"}]
      },
      options: [
            {
                value: '1',
                label: '进行中'
            }, 
            {
                value: '2',
                label: '完成'
            }
        ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({path:'/project/taskmanage',query:{id:this.ruleForm}});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //返回
    resetForm(formName) {
          this.$router.push({path:'/project/taskmanage',query:{id:this.ruleForm}});

    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.asset {
  width: 90%;
  margin: 0 auto
}
h2 {
  margin-bottom: 50px;
}
.demo-ruleForm {
  width: 50%;
  // margin: 0 auto;
}
</style>
