// 授权管理详情
<template>
  <div class="superuserdetail">
    <div class="panel panel-default">
      <div class="panel-heading">
        <i class="glyphicon glyphicon-list"></i>
        编辑
      </div>

      <form id="permForm" method="post" action="perm-save.do" class="form-horizontal">
        <input id="perm_id" type="hidden" name="id" value="${model.id}">
        <div class="form-group">
          <label class="control-label col-md-1" for="perm_code">代码:</label>
          <div class="col-sm-5">
            <input
              id="perm_code"
              type="text"
              name="code"
              value="${model.code}"
              class="form-control"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-1" for="perm_name">名称:</label>
          <div class="col-sm-5">
            <input
              id="perm_name"
              type="text"
              name="name"
              value="${model.name}"
              class="form-control"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-1" for="access_perm">权限分类</label>
          <div class="col-sm-5">
            <select id="access_perm" name="permTypeId" class="form-control">
              <option value="${item.id}">${item.name}</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-left:50px;">
          <div class="col-sm-5">
            <button id="submitButton" class="btn a-submit">保存</button>
            &nbsp;
            <router-link to="/project/superuser">
              <button type="button" class="btn">返回</button>
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.superuserdetail {
  width: 90%;
  margin: 0 auto;
}
</style>
