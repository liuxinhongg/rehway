// 登录post
// export const login=`/api/login`
// 审批流程--请假申请 保存
export const leave=`/api/leave/save`
// 审批流程--请假申请 提交
export const leavesub=`/api/leave/submit`
// 审批流程--报销 保存
export const reimbursesave=`/api/reimburse/save`
// 审批流程--报销 提交
export const reimbursesub=`/api/reimburse/submit`
// 待办任务列表
export const inquery=`/api/flow/inquery`
// 待办任务详情
export const inqueryde=`/api/flow/inqueryDetail`
// 已结任务 历史
export const taskhistory=`/api/flow/hisInquery`
// 草稿箱列表
export const draft=`/api/flow/draftInquery`
// 草稿箱详情
export const draftde=`/api/flow/draftDetail`
// 草稿箱的删除
export const draftdete=`/api/flow/draftDelete`
//转交人
export const dispatcher=`/api/flow/dispatcher`
// 流程图
export const Image=`/api/flow/flowImage`
// 驳回
export const goback=`/api/flow/back`
// 撤回
export const gorevert=`/api/flow/revert`
// 删除
export const gorflowDelete=`/api/flow/flowDelete`
// 同意不同意
export const complete=`/api/flow/complete`
// 资产申请
export const assetssub=`/api/assets/submit`
// 资产申请保存
export const assetssave=`/api/assets/save`

// 添加用户
export const useradd = `/api/user/user_insert_info`
// 登录
export const login = `/api/login/loginUser`

export const logout = `/api/login/logOut`

// 查询全部用户
export const userall = `/api/user/user_select_all`
export const userselect = `/api/user/user_select`
export const userId = `/api/user/select`

// 重置密码
export const resetPassword = `/api/user/resetPassword`

// 角色新增
export const roleInforoleAdd = `/api/roleInfo/roleAdd`

// 角色分页列表
export const roleInforoleList = `/api/roleInfo/roleList`
export const roleInfofindByUserId = `/api/roleInfo/findByUserId`
// 角色启用禁用
export const roleInforoleUpdate = `/api/roleInfo/roleUpdate`

export const updatePermission = `/api/sysPermission/updatePermission`


export const roleInfosaveRole = `/api/roleInfo/saveRole`
// 角色列表
export const roleInforoleNameList = `/api/roleInfo/roleNameList`
// 启用
export const userupdatestart = `/api/user/start`
// 禁用
// export const userdeleteid = `/api/user/user_delete_id`
// 所有权限
export const sysPermissionfindAll = `/api/sysPermission/findAll`
// 所有权限
export const ssavePermission = `/api/roleInfo/savePermission`


export const loginsessionAlive = `/api/login/sessionAlive`
