// 菜单管理   新建   编辑
<template>
  <div class="menuredact">
    <div class="panel panel-default">
      <div class="panel-heading" style='margin-bottom:20px;'>
        <i class="glyphicon glyphicon-list" ></i>
        编辑
      </div>

      <form id="menuForm" method="post" action="menu-save.do" class="form-horizontal">
        <input id="menu_id" type="hidden" name="id" value="${model.id}">

        <div class="form-group">
          <label class="control-label col-md-1" for="menu_title">名称</label>
          <div class="col-sm-5">
            <input
              id="menu_title"
              type="text"
              name="title"
              value="${model.title}"
              size="40"
              class="form-control required"
              minlength="2"
              maxlength="50"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-1" for="menu_code">编码</label>
          <div class="col-sm-5">
            <input
              id="menu_code"
              type="text"
              name="code"
              value="${model.code}"
              size="40"
              class="form-control required"
              minlength="2"
              maxlength="50"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-1" for="menu_url">URL</label>
          <div class="col-sm-5">
            <input
              id="menu_url"
              type="text"
              name="url"
              value="${model.url}"
              size="40"
              class="form-control required"
              minlength="2"
              maxlength="50"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-1" for="menu_type">类型</label>
          <div class="col-sm-5">
            <input
              id="menu_type"
              type="text"
              name="type"
              value="${model.type}"
              size="40"
              class="form-control required"
              minlength="2"
              maxlength="50"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-1" for="menu_display">状态</label>
          <div class="col-sm-5">
            <input
              id="menu_display"
              type="text"
              name="display"
              value="${model.display}"
              size="40"
              class="form-control required"
              minlength="2"
              maxlength="50"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-1" for="menu_priority">排序</label>
          <div class="col-sm-5">
            <input
              id="menu_priority"
              type="text"
              name="priority"
              value="${model.priority}"
              size="40"
              class="form-control required number"
              minlength="2"
              maxlength="50"
            >
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-1" for="menu_parentId">上级菜单</label>
          <div class="col-sm-5">
            <select id="menu_parentId" name="parentId" class="form-control">
              <option value></option>
              <option value="${item.id}">${item.title}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-1" for="menu_permId">权限</label>
          <div class="col-sm-5">
            <select id="menu_permId" name="permId" class="form-control">
              <option value></option>
              <option value="${item.id}">${item.name}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-offset-1 col-md-11">
            <button id="submitButton" class="btn btn-default">保存</button>
            &nbsp;
            <button
              type="button"
              onclick="history.back();"
              class="btn btn-link"
            >返回</button>
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
.menuredact {
    width: 90%;
    margin: 0 auto;
}
</style>
