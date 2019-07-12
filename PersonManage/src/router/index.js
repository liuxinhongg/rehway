import Vue from 'vue'
import Router from 'vue-router'
// 项目的首页
import HomePage from '../view/HomePage'
// 另一个首页
import otherpage from '../components/otherpage'
// 登录页面
import login from '../components/Login'
// 会议查询
import Search from '../view/MeetingManage/search'
// 会议发起表单
import searchinput from '../view/MeetingManage/searchinput'
// 会议预定表单
import resinput from '../view/MeetingManage/resinput'
//公告管理
import AnnounceManage from "../view/AnnounceManage/advertise/index"
//公告新增
import annadd from "../view/AnnounceManage/advertise/annadd"
//公告管理
import newsmanage from "../view/AnnounceManage/news/index"
//新闻新增
import newsadd from "../view/AnnounceManage/news/annadd"
// 人事管理--查询工人工资
import searchsalary from '../view/salary/index'
// 人事管理--工人工资上报
import addsalary from '../view/salary/addsalary'
//会议预定
import reservation from '../view/MeetingManage/reservation'
//审批 发起
import startflow from '../view/ApprovalProcess/startflow/index'
//资产申请
import asset from '../view/ApprovalProcess/startflow/asset'
//印章申请
import seal from '../view/ApprovalProcess/startflow/seal'
//请假
import leave from '../view/ApprovalProcess/startflow/leave'
//差旅
import travelling from '../view/ApprovalProcess/startflow/travelling'
//报销
import reimbursement from '../view/ApprovalProcess/startflow/reimbursement'
//费用申请
import cost from '../view/ApprovalProcess/startflow/cost'
//发文申请
import dispatch from '../view/ApprovalProcess/startflow/dispatch'
//权限申请
import jurisdiction from '../view/ApprovalProcess/startflow/jurisdiction'
//发起流程
import sponsor from '../view/ApprovalProcess/startflow/sponsor'
//审批 未结
import undided from '../view/ApprovalProcess/undided/index'
// 审批详情页面
import detailapprove from '../view/ApprovalProcess/undided/detail'
//审批 办理
import dealwith from '../view/ApprovalProcess/dealwith/index'
// 办结详情
import dealwithend from '../view/ApprovalProcess/dealwith/detail'
// 审批 草稿箱
import draftbox from '../view/ApprovalProcess/draftbox/index'
// 审批 草稿箱  编辑
import draftcompile from '../view/ApprovalProcess/draftbox/draftcompile'
// 新建任务
import taskstart from '../view/MyTask/newbuilde/index'
//资产申请
import taskasset from '../view/MyTask/newbuilde/asset'
//印章申请
import taskseal from '../view/MyTask/newbuilde/seal'
//请假
import taskleave from '../view/MyTask/newbuilde/leave'
//报销
import taskbx from '../view/MyTask/newbuilde/reimbursement'
//费用申请
import taskcost from '../view/MyTask/newbuilde/cost'
//未完成的任务
import UnFinished from '../view/MyTask/unfinished/index'
// 未完成任务的处理事件
import taskdealwidth from '../view/MyTask/unfinished/dealwidth'
// 未完成任务的暂存事件
import TS from '../view/MyTask/unfinished/ts'
//未完成的任务的详情
import UnFinisheddetail from '../view/MyTask/unfinished/detail'
//代领任务
// import acting from '../view/MyTask/acting/index'
//带领-认领
// import actclaim from '../view/MyTask/acting/claim'
//带领-历史
// import acthistory from '../view/MyTask/acting/history'
// 已办任务
import finishedtask from '../view/MyTask/finished/index'
// 已办任务详情
import finisheddetail from '../view/MyTask/finished/detail'
//发送的任务
import MySend from '../view/MyTask/MySend'
// 经手任务
import handletask from '../view/MyTask/handletask/index'
// 经手任务的详情
import handledetail from '../view/MyTask/handletask/detail'
// 抄送我的CopyMe
import CopyMe from '../view/MyTask/CopyMe'
// 考勤管理
import AttendanceManage from '../view/AttendanceManage/index'
// 在场人员
import persons from '../view/AttendanceManage/persons/index'
// 考勤添加
import Attinput from '../view/AttendanceManage/attinput.vue'
// 报表中心
import formcenter from '../view/AttendanceManage/formcenter/index'
// 报表中心的新增和编辑页面
import formaddedit from '../view/AttendanceManage/formcenter/addedit'
// 制度管理
import SystemManage from '../view/SystemManage/index'
// 添加制度
import AddSystem from '../view/SystemManage/addsystem'
// 文件管理 全部文件FileManage
import FileManage from '../view/FileManage/index'
// 新增文件
import doitfile from '../view/FileManage/doitfile'
// 文件管理 我的分享
import myshare from '../view/FileManage/myshare'
// 文件管理 回收站
import recycle from '../view/FileManage/recycle'
// 文件管理的详情页面
import filedetail from '../view/FileManage/filedetail'
// 实名制
import autonym from '../view/autonym'
// 配置管理-角色管理
import rolemanagement from '../view/ConfigManage/role/rolemanagement'
// 配置管理-角色编辑
import compile from '../view/ConfigManage/role/compile'
// 配置管理-角色 设置权限
import permission from '../view/ConfigManage/role/permission'
// 我的任务--任务管理
import taskmanage from '../view/ConfigManage/taskmanage/index'
// 我的任务--任务管理
import rebuild from '../view/ConfigManage/taskmanage/addedit'
//实名制
import realname from '../view/RealName/index'
import uploadname from '../view/RealName/upload'
// 配置管理--企业信息管理
import company from '../view/ConfigManage/companymanage/index'
//配置管理--企业管理--添加其他
import addcompany from '../view/ConfigManage/companymanage/addcompany'
// 企业管理--分包商
import overallbusiness from '../view/ConfigManage/overallbusiness/index'
// 分包商-新增分包商
import addoverall from '../view/ConfigManage/overallbusiness/addoverall'
// 配置管理--项目管理
import projectconfig from '../view/ConfigManage/projectconfig/index'
// 配置管理--项目增加和修改
import projectadd from '../view/ConfigManage/projectconfig/addedit'
// 项目管理--分包管理
import subpackage from '../view/ConfigManage/SubPackage/index'
// 新增分包
import addsubpage from '../view/ConfigManage/SubPackage/addsubpage'
// 配置管理--流程管理--分类管理
import flowsort from '../view/ConfigManage/flowmanage/index'
// 配置管理--流程管理--分类
import dispose from '../view/ConfigManage/flowmanage/sort/index'
// 配置管理--流程管理--配置管理 新建  编辑
import disposedetail from '../view/ConfigManage/flowmanage/sort/detail'
// 配置管理--流程管理--配置
import allocation from '../view/ConfigManage/flowmanage/allocation/detail'
// 配置管理-修改管理
import modify from '../view/ConfigManage/modify'
// 配置管理-用户管理
import usercontrol from '../view/ConfigManage/user/usercontrol'
// 权限管理--考勤配置
import kqconfig from '../view/ConfigManage/menu/userattan/index'
// 权限管理--考勤配置(新增)
import userattan from '../view/ConfigManage/menu/userattan/userattan'
// 配置管理-用户 设置权限
import setpermission from '../view/ConfigManage/user/setpermission'
// 配置管理-授权分类
import equiplist from '../view/ConfigManage/equipmanage/equiplist'
// 配置管理-授权详情
import equipdetail from '../view/ConfigManage/equipmanage/equipdetail'
// 配置管理-授权管理
import equipinfo from '../view/ConfigManage/equipmanage/equipconfig/equipinfo'
// 配置管理-授权管理详情
import equipinfodetail from '../view/ConfigManage/equipmanage/equipconfig/equipinfodetail'
// 配置管理-菜单管理
import menu from '../view/ConfigManage/menu/index'
import menumanage from '../view/ConfigManage/menu/menumanage'
// 配置管理-菜单管理 新建
import menuredact from '../view/ConfigManage/menu/menuredact'

// 配置管理--部门配置
import partconfig from '../view/ConfigManage/menu/partconfig/index'
// 配置管理--部门配置--部门
import addpartconfig from '../view/ConfigManage/menu/partconfig/addedit'
// 配置管理--班组配置
import teamconfig from '../view/ConfigManage/menu/teamconfig/index'
// 配置管理--班组管理--新增班组
import teamaddedit from '../view/ConfigManage/menu/teamconfig/addedit'
//配置管理--参建单位
import contractors from '../view/ConfigManage/contractors/index'
//配置管理--参建单位--新增和编辑
import addeditcont from '../view/ConfigManage/contractors/addeditcont'
// 图片流的问题
import Imgflow from '../components/common/Imgflow'
// 测试左边的菜单
import IndexLeft from '../components/common/IndexLeft'
// 个人信息
import userinfo from '../view/userInfo/index'
// 发送邮件
import sendemail from '../view/sendemail/index'
// 新建和编辑
import mailconfig from '../view/sendemail/emailconfig/editconfig'
// 测试
import testmail from '../view/sendemail/emailconfig/testemail'
// 邮箱模板
// 新建和编辑
import editmodel from '../view/sendemail/emailmodel/editmodel'
// 测试
import testmailmodel from '../view/sendemail/emailmodel/testemailmodel'
// 测试发送后的页面
import sendemailback from '../view/sendemail/emailmodel/sendemail'
// 历史邮件查看
import historyback from '../view/sendemail/emailhistory/historychech'
//用户管理   账号管理
import accountlist from '../view/user/account/accountlist'
// 积分管理
import integral from '../view/user/integral/index'
// 新增积分
import integraladd from '../view/user/integral/integraladd'
//积分详情
import check from '../view/user/integral/check'
//用户管理   账号新建
import accountadd from '../view/user/account/accounadd'
//用户管理   详情
import details from '../view/user/account/details'
// 工资发放
import salary from '../view/salary/index'
// 项目培训
import ProjectTrain from '../view/ProjectTrain/index'
// 添加培训
import addtrain from '../view/ProjectTrain/addtrain'
// 百度定位
import baodudingwei  from '../components/common/baidu'
// 通讯录
import addresslist from '../view/AddressList/index'



// 质量管理模块
import QualityLeft from '../components/common/qualityLeft'
// 安全教育
import safteducate from '../safetyview/SaftEducate/index'
// 新建教育
import rebuildsafteducate from '../safetyview/SaftEducate/rebuild'
// 应急救援--安全制度
import emergerescue from '../safetyview/EmergeRescue/saftsystem/index'
// 应急救援--安全制度新增
import saftsystemadd from '../safetyview/EmergeRescue/saftsystem/saftsystemadd'
// 应急救援--应急救援人员-应急救援组
import guaranteam from '../safetyview/EmergeRescue/rescueperson/guaranteam/index'
// 应急救援--应急救援人员-应急救援组新增
import guaranteamadd from '../safetyview/EmergeRescue/rescueperson/guaranteam/guaranteamadd'
// 应急救援--应急救援人员-后勤保障组
import rescueteam from '../safetyview/EmergeRescue/rescueperson/rescueteam/index'
// 应急救援--应急救援人员-后勤保障组新增
import rescueteamadd from '../safetyview/EmergeRescue/rescueperson/rescueteam/rescueteamadd'
// 系统配置--区域配置
import zone from '../safetyview/SystemConfig/hiddenytpe/zone'
// 系统配置--区域配置新增
import hiddenconfig from '../safetyview/SystemConfig/hiddenytpe/hiddenconfig'
// 安全排查--安全计划
import saftplan from '../safetyview/SaftCheck/saftplan/index'
// 安全排查--新增安全计划
import addsaftplan from '../safetyview/SaftCheck/saftplan/addsaftplan'
// 安全排查--隐患排查
import hiddencheck from '../safetyview/SaftCheck/hiddencheck/index'
// 安全排查--隐患排查--新增
import addhidden from '../safetyview/SaftCheck/hiddencheck/addhidden'
// 过滤
import gl from '../view/AttendanceManage/text'
Vue.use(Router)
export default new Router({
  // mode: 'hash',
  routes: [{
      path: '/',
      redirect: 'home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/gl',
      name: 'gl',
      component: gl
    },
    {
      path: '/otherpage',
      name: 'otherpage',
      component: otherpage
    },
    {
      path:'/baodudingwei',
      name:'baodudingwei',
      component:baodudingwei
    },
    //任务
    {
      path: '/project',
      name: 'IndexLeft',
      component: IndexLeft,
      children: [
        //待办任务
        { path: 'unfinished', name: 'unfinished', component: UnFinished, },
        // 待办任务处理
        { path: 'taskdealwidth', name: 'taskdealwidth', component: taskdealwidth },
        // 待办任务暂存
        { path: 'ts', name: 'TS', component: TS },
        // 待办任务详情
        { path: 'UnFinisheddetail',name: 'UnFinisheddetail',component: UnFinisheddetail},
        // 认领任务
        // { path: 'acting',name: 'acting',component: acting},
        // 创办任务
        { path: 'taskstart', name: 'taskstart', component: taskstart,
          children: [
            { path: '', redirect: 'taskasset' },
            //资产申请  
            { path: 'taskasset', name: 'taskasset', component: taskasset },
            //请假
            { path: 'taskleave', name: 'taskleave', component: taskleave },
            // 个人报销
            { path: 'taskbx', name: 'taskbx', component: taskbx },
            //费用申请
            { path: 'taskcost', name: 'taskcost', component: taskcost },
            //审批 未结
            // { path: 'undided', name: 'undided', component: undided },
          ]
      },
        // l历史
        // { path: 'acthistory', name: 'acthistory', component: acthistory },
        // 我的任务--任务管理
        { path: 'taskmanage', name: 'taskmanage', component: taskmanage },
        // 我的任务--任务管理--新建
        { path:'rebuild', name:'rebuild', component:rebuild },
        // 已办任务
        { path: 'finishedtask', name: 'finishedtask', component: finishedtask },
        // 已办任务详情
        { path: 'finisheddetail', name: 'finisheddetail', component: finisheddetail },
        // 我发送的
        { path: 'mysend', name: 'MySend', component: MySend },
        // 经手任务
        { path: 'handletask', name: 'handletask', component: handletask },
        // 经手任务的详情
        { path: 'handledetail', name: 'handledetail', component: handledetail },
        // 抄送我的CopyMe
        { path: 'copyme', name: 'CopyMe', component: CopyMe },
        // 考勤管理AttendanceManage
        { path: 'attendancemanage', name: 'AttendanceManage', component: AttendanceManage },
        // 报表中心
        { path:'formcenter',name:'formcenter',component:formcenter},
        // 新增报表
        { path:'formaddedit',name:'formaddedit',component:formaddedit},
        // 在场人员
        { path:'persons',name:'persons',component:persons},
        // 考勤添加
        { path: 'attinput', name: 'attinput', component: Attinput },
        //人事管理--查询工人工资
        { path: 'searchsalary', name: 'searchsalary', component: searchsalary },
        //人事管理--人员工资上报
        { path: 'addsalary', name: 'addsalary', component: addsalary },
        //发起流程
        { path: 'sponsor', name: 'sponsor', component: sponsor },
        //审批 发起
        { path: 'startflow', name: 'startflow', component: startflow ,
          children: [
            { path: '', redirect: 'leave' },
            //资产申请  
            { path: 'asset', name: 'asset', component: asset },
            //请假
            { path: 'leave', name: 'leave', component: leave },
            // 个人报销
            { path: 'reimbursement', name: 'reimbursement', component: reimbursement },
            //费用申请
            { path: 'cost', name: 'cost', component: cost },
            //审批 未结
            // { path: 'undided', name: 'undided', component: undided },
          ]
        },
        //审批 未结
        { path: 'undided', name: 'undided', component: undided },
        // 审批未结详情
        { path: 'detailapprove', name: 'detailapprove', component: detailapprove },
        //审批 办结
        { path: 'dealwith', name: 'dealwith', component: dealwith },
        //审批 办结详情
        { path: 'dealwithend', name: 'dealwithend', component: dealwithend },
        //审批 草稿箱
        { path: 'draftbox', name: 'draftbox', component: draftbox }, 
        //审批 草稿箱 编辑
        { path: 'draftcompile', name: 'draftcompile', component: draftcompile },
        //资产申请  
        // { path: 'asset', name: 'asset', component: asset },
        //印章申请
        { path: 'seal', name: 'seal', component: seal },
        //差旅
        { path: 'travelling', name: 'travelling', component: travelling },
        //权限
        { path: 'jurisdiction', name: 'jurisdiction', component: jurisdiction },
        //费用申请
        // { path: 'cost', name: 'cost', component: cost },
        //发文
        { path: 'dispatch', name: 'dispatch', component: dispatch },
        // { path: 'reimbursement', name: 'reimbursement', component: reimbursement },
        //请假
        // { path: 'leave', name: 'leave', component: leave },
        // 制度管理SystemManage
        { path: 'systemmanage', name: 'SystemManage', component: SystemManage },
        // 添加制度
        { path:'addsystem',name:'AddSystem',component:AddSystem},
        //文件管理 全部文件FileManage
        { path: 'filemanage', name: 'FileManage', component: FileManage },
        // 文件管理--新增文件
        { path:'doitfile',name:'doitfile',component:doitfile },
        //文件管理 我的分享myshare
        { path: 'myshare', name: 'myshare', component: myshare },
        //文件管理 回收站recycle 
        { path: 'recycle', name: 'recycle', component: recycle },
        // 文件详情页面
        { path: 'filedetail', name: 'filedetail', component: filedetail },
        // 实名制
        { path: 'autonym', name: 'autonym', component: autonym },
        //会议查询 
        { path: 'search', name: 'Search', component: Search },
        //会议发起 
        { path: 'searchinput', name: 'searchinput', component: searchinput },
        //会议预定
        { path: 'reservation', name: 'reservation', component: reservation },
        //会议预定
        { path: 'resinput', name: 'resinput', component: resinput },
        //内容管理 公告管理
        { path: 'announcemanage', name: 'AnnounceManage', component: AnnounceManage },
        //内容管理 公告新增
        { path: 'annadd', name: 'annadd', component: annadd },
        //内容管理 新闻管理
        { path: 'newsmanage', name: 'newsmanage', component: newsmanage },
        //内容管理 新闻新增
        { path: 'newsadd', name: 'newsadd', component: newsadd },
        // 实名制管理
        { path:'realname',name:'realname',component:realname},
        //上传
        { path:'uploadname',name:'uploadname',component:uploadname},
        // 配置管理-修改管理  
        { path: 'modify', name: 'modify', component: modify },
        // 配置管理--企业信息companymanage
        { path:'company', name:'company', component:company, },
        // 配置管理--项目信息
        { path:'projectconfig',name:'projectconfig',component:projectconfig},
        // 配置管理--项目配置--项目添加和编辑
        { path:'projectadd',name:'projectadd',component:projectadd},
        // 项目管理--分包项目
        { path:'subpackage',name:'subpackage',component:subpackage },
        //新增分包
        { path:'addsubpage',name:'addsubpage',component:addsubpage},
        //配置管理--公司信息--新增公司
        { path:'addcompany',name:'addcompany',component:addcompany},
        //企业管理--分包商
        { path:'overallbusiness',name:'overallbusiness',component:overallbusiness },
        // 新增分包商
        { path:'addoverall',name:'addoverall',component:addoverall},
        //配置管理--流程管理--分类管理
        { path:'flowsort', name:'flowsort', component:flowsort},
        //配置管理--流程管理--配置管理
        { path:'dispose', name:'dispose', component:dispose },
        //配置管理--流程管理--分类 新建 编辑
        { path:'disposedetail', name:'disposedetail', component:disposedetail },
        //配置管理--流程管理--配置 新建 编辑
        { path:'allocation', name:'allocation', component:allocation },
        // 配置管理-用户管理  
        // { path: 'usercontrol', name: 'usercontrol', component: usercontrol },
        // 考勤配置
        // { path: 'kqconfig', name: 'kqconfig', component: kqconfig },
        // // 考勤配置操作
        // { path: 'userattan', name: 'userattan', component: userattan },
        // 配置管理-设置权限  
        { path: 'setpermission', name: 'setpermission', component: setpermission },
        // 配置管理-菜单管理  
        { path: 'menu', name: 'menu', component: menu, 
          children: [
            { path: '', redirect: 'usercontrol' },
            { path:'partconfig',name:'partconfig',component:partconfig },
            //配置管理--新增部门配置
            { path:'addpartconfig',name:'addpartconfig',component:addpartconfig },
            //配置管理--班组配置
            { path:'teamconfig',name:'teamconfig',component:teamconfig },
            // 配置管理--班组配置--新增和编辑页面
            { path:'teamaddedit',name:'teamaddedit',component:teamaddedit},
             // 配置管理-角色管理 
            { path: 'rolemanagement', name: 'rolemanagement', component: rolemanagement },
            // 配置管理-角色编辑 
            { path: 'compile', name: 'compile', component: compile },
            // 配置管理-用户管理  
            { path: 'usercontrol', name: 'usercontrol', component: usercontrol },
            // 配置管理-菜单管理
            { path:'menumanage',name:'menumanage',component:menumanage },
            // 考勤配置
            { path: 'kqconfig', name: 'kqconfig', component: kqconfig },
            // 考勤配置操作
            { path: 'userattan', name: 'userattan', component: userattan },
          ]
        },
        // 配置管理-菜单管理  新建
        { path: 'menuredact', name: 'menuredact', component: menuredact },
        // // 配置管理-角色管理 
        // { path: 'rolemanagement', name: 'rolemanagement', component: rolemanagement },
        // // 配置管理-角色编辑 
        // { path: 'compile', name: 'compile', component: compile },
        // // 配置管理-角色 设置权限
        { path: 'permission', name: 'permission', component: permission },
        // 配置管理-设备管理
        { path: 'equiplist', name: 'equiplist', component: equiplist },
        // 配置管理-设备管理新增和修改
        { path: 'equipdetail', name: 'equipdetail', component: equipdetail },
        // 配置管理-授权管理
        { path: 'equipinfo', name: 'equipinfo', component: equipinfo },
        // 配置管理-授权管理详情
        { path: 'equipinfodetail', name: 'equipinfodetail', component: equipinfodetail },
        //配置管理--部门配置
        // { path:'partconfig',name:'partconfig',component:partconfig },
        // //配置管理--新增部门配置
        // { path:'addpartconfig',name:'addpartconfig',component:addpartconfig },
        // //配置管理--班组配置
        // { path:'teamconfig',name:'teamconfig',component:teamconfig },
        // // 配置管理--班组配置--新增和编辑页面
        // { path:'teamaddedit',name:'teamaddedit',component:teamaddedit},
        // 配置管理--参建单位
        { path:'contractors',name:'contractors',component:contractors},
        //配置管理--参建单位--新增和编辑页面
        { path:'addeditcont',name:'addeditcont',component:addeditcont },
        // 用户管理  账号列表
        { path: 'accountlist', name: 'accountlist', component: accountlist },
        // 积分管理
        { path:'integral',name:'integral',component:integral },
        // 积分管理--新增积分
        { path:'integraladd',name:'integraladd',component:integraladd},
        // 积分管理--查看积分
        { path:'check',name:'check',component:check},
        // 用户管理  账号添加
        { path: 'accountadd', name: 'accountadd', component: accountadd },

        // 用户管理  详情
        { path: 'details', name: 'details', component: details },
        { path: '', redirect: 'unfinished' },
        // 个人信息
        { path: 'userinfo', name: 'userinfo', component: userinfo },
        // 发送邮件
        { path: 'sendemail', name: 'sendemail', component: sendemail },
        { path: 'edit-add-input', name: 'mailconfig', component: mailconfig },
        // 邮箱配置测试
        { path: 'test-input', name: 'testmail', component: testmail },
        // 邮箱模板
        // 编辑和新建
        { path: 'edit-add-model', name: 'editmodel', component: editmodel },
        // 邮箱配置测试
        { path: 'test-mail-model', name: 'testmailmodel', component: testmailmodel },
        // 测试发送后的页面
        { path: 'test-send-back', name: 'sendemailback', component: sendemailback },
        // 历史邮件的查看 
        { path: 'history-send-email', name: 'historyback', component: historyback },
        // 工资发放
        { path:'salary', name:'salary', component:salary },
        // 项目培训
        {path:'projecttrain',name:'ProjectTrain',component:ProjectTrain},
        // 添加培训
        {path:'addtrain',name:'addtrain',component:addtrain},
        // 通讯录
        { path:'addresslist',name:'addresslist',component:addresslist}
      ]
    },
    // 处理图片流的问题
    { path: '/imgflow', name: 'Imgflow', component: Imgflow },
    // 项目的首页
    { path: '/home', name: 'otherpage', component: otherpage },
    // 质量管理模块
    {
      path: '/saftmanage',
      name: 'QualityLeft',
      component: QualityLeft,
      children: [
        // 安全教育
        { path: '', redirect: 'safteducate' },
        // 新建安全教育
        { path:'rebuildsafteducate',name:'rebuildsafteducate',component:rebuildsafteducate},
        // 安全教育
        { path: 'safteducate', name: 'safteducate', component: safteducate },
        // 应急救援--安全制度
        { path: 'emergerescue', name: 'emergerescue', component: emergerescue },
        // 应急救援--安全制度新增
        { path: 'saftsystemadd', name: 'saftsystemadd', component: saftsystemadd },
        // 应急救援--应急救援人员-后勤保障组
        { path: 'rescueteam',name: 'rescueteam',component: rescueteam},
        // 应急救援--应急救援人员-后勤保障组新增
        { path: 'rescueteamadd',name: 'rescueteamadd',component: rescueteamadd},
        // 应急救援--应急救援人员-应急救援组
        { path: 'guaranteam',name: 'guaranteam',component: guaranteam},
        // 应急救援--应急救援人员-应急救援组新增
        { path: 'guaranteamadd',name: 'guaranteamadd',component: guaranteamadd},
        // 系统配置--区域配置
        { path: 'zone', name: 'zone', component: zone },
        // 系统配置--区域配置新增
        { path: 'hiddenconfig', name: 'hiddenconfig', component: hiddenconfig },
        // 安全排查--安全计划
        { path: 'saftplan', name: 'saftplan', component: saftplan },
        //安全排查--新增安全计划
        { path:'addsaftplan',name:'addsaftplan',component:addsaftplan },
        // 安全排查--隐患排查
        { path: 'hiddencheck', name: 'hiddencheck', component: hiddencheck },
        // 新增隐患排查
        { path:'addhidden',name:'addhidden',component:addhidden },
        // 个人信息管理
        { path: 'userinfo', name: 'userinfo', component: userinfo },
        // 通讯录
        { path:'addresslist',name:'addresslist',component:addresslist}
      ]
    },
  ]
})
