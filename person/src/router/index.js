import Vue from 'vue'
import Router from 'vue-router'
// 项目的首页
// import HomePage from '../view/'

// import pmprojeqtor from '../../../projeqtor/index'

// 另一个首页
import otherpage from '../components/otherpage'
// 登录页面
import login from '../components/Login'
// 会议查询
import Search from '../view/personmanage/MeetingManage/search'
// 会议发起表单
import searchinput from '../view/personmanage/MeetingManage/searchinput'
// 会议预定表单
import resinput from '../view/personmanage/MeetingManage/resinput'
//公告管理
import AnnounceManage from "../view/personmanage/AnnounceManage/advertise/index"
//公告新增
import annadd from "../view/personmanage/AnnounceManage/advertise/annadd"
//公告管理
import newsmanage from "../view/personmanage/AnnounceManage/news/index"
//新闻新增
import newsadd from "../view/personmanage/AnnounceManage/news/annadd"
// 人事管理--查询工人工资
import searchsalary from '../view/personmanage/salary/index'
// 人事管理--查询工人工资明细
import searchsalarydetail from '../view/personmanage/salary/searchsalary'
// 人事管理--工人工资上报
import addsalary from '../view/personmanage/salary/addsalary'
//会议预定
import reservation from '../view/personmanage/MeetingManage/reservation'
//审批 发起
import startflow from '../view/personmanage/ApprovalProcess/startflow/index'

//资产申请
import asset from '../view/personmanage/ApprovalProcess/startflow/asset'


//请假
import leave from '../view/personmanage/ApprovalProcess/startflow/leave'


//报销
import reimbursement from '../view/personmanage/ApprovalProcess/startflow/reimbursement'
//审批 未结
import undided from '../view/personmanage/ApprovalProcess/undided/index'
// 审批详情页面
import detailapprove from '../view/personmanage/ApprovalProcess/undided/detail'
//审批 办结
import dealwith from '../view/personmanage/ApprovalProcess/dealwith/index'
// 办结详情
import dealwithend from '../view/personmanage/ApprovalProcess/dealwith/detail'
// 审批 草稿箱
import draftbox from '../view/personmanage/ApprovalProcess/draftbox/index'
// 审批 草稿箱  编辑请假
import draftcompile from '../view/personmanage/ApprovalProcess/draftbox/draftcompile'
// 审批 草稿箱  编辑资产
import draftcompileasset from '../view/personmanage/ApprovalProcess/draftbox/asset'
// 审批 草稿箱  编辑报销
import draftcompilecost from '../view/personmanage/ApprovalProcess/draftbox/cost'
// 审批 草稿箱  编辑运营
import draftcompileoperation from '../view/personmanage/ApprovalProcess/draftbox/operation'
// 审批 草稿箱  编辑设备需求
import draftrequirement from '../view/personmanage/ApprovalProcess/draftbox/requirement'
// 审批 草稿箱  编辑设备保养
import draftupkeep from '../view/personmanage/ApprovalProcess/draftbox/upkeep'
// 审批 草稿箱  编辑材料合同
import draftbargain from '../view/personmanage/ApprovalProcess/draftbox/bargain'
// 审批 草稿箱  编辑材料总计划
import draftsiteplan from '../view/personmanage/ApprovalProcess/draftbox/siteplan'
// 审批 草稿箱  编辑材料需求计划
import draftdemandplan from '../view/personmanage/ApprovalProcess/draftbox/demandplan'
// 新建任务
import taskstart from '../view/personmanage/MyTask/newbuilde/index'
//资产申请
import taskasset from '../view/personmanage/MyTask/newbuilde/asset'
//印章申请
import taskseal from '../view/personmanage/MyTask/newbuilde/seal'
//请假
import taskleave from '../view/personmanage/MyTask/newbuilde/leave'
//报销
import taskbx from '../view/personmanage/MyTask/newbuilde/reimbursement'
//费用申请
import taskcost from '../view/personmanage/MyTask/newbuilde/cost'
//未完成的任务
import UnFinished from '../view/personmanage/MyTask/unfinished/index'
// 未完成任务的处理事件
import taskdealwidth from '../view/personmanage/MyTask/unfinished/dealwidth'
// 未完成任务的暂存事件
import TS from '../view/personmanage/MyTask/unfinished/ts'
//未完成的任务的详情
import UnFinisheddetail from '../view/personmanage/MyTask/unfinished/detail'
//代领任务
// import acting from '../view/personmanage/MyTask/acting/index'
//带领-认领
// import actclaim from '../view/personmanage/MyTask/acting/claim'
//带领-历史
// import acthistory from '../view/personmanage/MyTask/acting/history'
// 已办任务
import finishedtask from '../view/personmanage/MyTask/finished/index'
// 已办任务详情
import finisheddetail from '../view/personmanage/MyTask/finished/detail'
//发送的任务
import MySend from '../view/personmanage/MyTask/MySend'
// 经手任务
import handletask from '../view/personmanage/MyTask/handletask/index'
// 经手任务的详情
import handledetail from '../view/personmanage/MyTask/handletask/detail'
// 抄送我的CopyMe
import CopyMe from '../view/personmanage/MyTask/CopyMe'
// 考勤管理
import AttendanceManage from '../view/personmanage/AttendanceManage/index'
// 在场人员
import persons from '../view/personmanage/AttendanceManage/persons/index'
// 考勤添加
import Attinput from '../view/personmanage/AttendanceManage/attinput.vue'
// 报表中心
import formcenter from '../view/personmanage/AttendanceManage/formcenter/index'
// 报表中心的新增和编辑页面
import formaddedit from '../view/personmanage/AttendanceManage/formcenter/addedit'
// 制度管理
import SystemManage from '../view/personmanage/SystemManage/index'
// 添加制度
import AddSystem from '../view/personmanage/SystemManage/addsystem'
// 文件管理 全部文件FileManage
import FileManage from '../view/personmanage/FileManage/index'
// 新增文件
import doitfile from '../view/personmanage/FileManage/doitfile'
// 文件管理 我的分享
import myshare from '../view/personmanage/FileManage/myshare'
// 文件管理 回收站
import recycle from '../view/personmanage/FileManage/recycle'
// 文件管理的详情页面
import filedetail from '../view/personmanage/FileManage/filedetail'
// 实名制
import autonym from '../view/personmanage/autonym'
// 配置管理-角色管理
import rolemanagement from '../view/personmanage/ConfigManage/role/rolemanagement'
// 配置管理-角色编辑
import compile from '../view/personmanage/ConfigManage/role/compile'
// 配置管理-角色 设置权限
import permission from '../view/personmanage/ConfigManage/role/permission'
// 我的任务--任务管理
import taskmanage from '../view/personmanage/ConfigManage/taskmanage/index'
// 我的任务--任务管理
import rebuild from '../view/personmanage/ConfigManage/taskmanage/addedit'
//实名制
import realname from '../view/personmanage/RealName/index'
import uploadname from '../view/personmanage/RealName/upload'
// 配置管理--企业信息管理
import company from '../view/personmanage/ConfigManage/companymanage/index'
//配置管理--企业管理--添加其他
import addcompany from '../view/personmanage/ConfigManage/companymanage/addcompany'
// 企业管理--分包商
import overallbusiness from '../view/personmanage/ConfigManage/overallbusiness/index'
// 分包商-新增分包商
import addoverall from '../view/personmanage/ConfigManage/overallbusiness/addoverall'
// 配置管理--项目管理
import projectconfig from '../view/personmanage/ConfigManage/projectconfig/index'
// 配置管理--项目增加和修改
import projectadd from '../view/personmanage/ConfigManage/projectconfig/addedit'
// 项目管理--分包管理
import subpackage from '../view/personmanage/ConfigManage/SubPackage/index'
// 新增分包
import addsubpage from '../view/personmanage/ConfigManage/SubPackage/addsubpage'
// 配置管理--流程管理--分类管理
import flowsort from '../view/personmanage/ConfigManage/flowmanage/index'
// 配置管理--流程管理--分类
import dispose from '../view/personmanage/ConfigManage/flowmanage/sort/index'
// 配置管理--流程管理--配置管理 新建  编辑
import disposedetail from '../view/personmanage/ConfigManage/flowmanage/sort/detail'
// 配置管理--流程管理--配置
import allocation from '../view/personmanage/ConfigManage/flowmanage/allocation/detail'
// 配置管理-修改管理
import modify from '../view/personmanage/ConfigManage/modify'
// 配置管理-用户管理
import usercontrol from '../view/personmanage/ConfigManage/user/usercontrol'
// 权限管理--考勤配置
import kqconfig from '../view/personmanage/ConfigManage/menu/userattan/index'
// 权限管理--考勤配置(新增)
import userattan from '../view/personmanage/ConfigManage/menu/userattan/userattan'
// 配置管理-用户 设置权限
import setpermission from '../view/personmanage/ConfigManage/user/setpermission'
// 配置管理-授权分类
import equiplist from '../view/personmanage/ConfigManage/equipmanage/equiplist'
// 配置管理-授权详情
import equipdetail from '../view/personmanage/ConfigManage/equipmanage/equipdetail'
// 配置管理-授权管理
import equipinfo from '../view/personmanage/ConfigManage/equipmanage/equipconfig/equipinfo'
// 配置管理-授权管理详情
import equipinfodetail from '../view/personmanage/ConfigManage/equipmanage/equipconfig/equipinfodetail'
// 配置管理-菜单管理
import menu from '../view/personmanage/ConfigManage/menu/index'
import menumanage from '../view/personmanage/ConfigManage/menu/menumanage'
// 配置管理-菜单管理 新建
import menuredact from '../view/personmanage/ConfigManage/menu/menuredact'

// 配置管理--权限配置
import rolejurisdiction from '../view/personmanage/ConfigManage/menu/jurisdiction/index'
// 配置管理--部门配置
import partconfig from '../view/personmanage/ConfigManage/menu/partconfig/index'
// 配置管理--部门配置--部门
import addpartconfig from '../view/personmanage/ConfigManage/menu/partconfig/addedit'
// 配置管理--班组配置
import teamconfig from '../view/personmanage/ConfigManage/menu/teamconfig/index'
// 配置管理--班组管理--新增班组
import teamaddedit from '../view/personmanage/ConfigManage/menu/teamconfig/addedit'
//配置管理--参建单位
import contractors from '../view/personmanage/ConfigManage/contractors/index'
//配置管理--参建单位--新增和编辑
import addeditcont from '../view/personmanage/ConfigManage/contractors/addeditcont'
// 图片流的问题
import Imgflow from '../components/common/Imgflow'
// 测试左边的菜单
import IndexLeft from '../components/common/IndexLeft'
// 个人信息
import userinfo from '../view/personmanage/userInfo/index'
// 发送邮件
import sendemail from '../view/personmanage/sendemail/index'
// 新建和编辑
import mailconfig from '../view/personmanage/sendemail/emailconfig/editconfig'
// 测试
import testmail from '../view/personmanage/sendemail/emailconfig/testemail'
// 邮箱模板
// 新建和编辑
import editmodel from '../view/personmanage/sendemail/emailmodel/editmodel'
// 测试
import testmailmodel from '../view/personmanage/sendemail/emailmodel/testemailmodel'
// 测试发送后的页面
import sendemailback from '../view/personmanage/sendemail/emailmodel/sendemail'
// 历史邮件查看
import historyback from '../view/personmanage/sendemail/emailhistory/historychech'
//用户管理   账号管理
import accountlist from '../view/personmanage/user/account/accountlist'
// 积分管理
import integral from '../view/personmanage/user/integral/index'
// 新增积分
import integraladd from '../view/personmanage/user/integral/integraladd'
//积分详情
import check from '../view/personmanage/user/integral/check'
//用户管理   账号新建
import accountadd from '../view/personmanage/user/account/accounadd'

//用户管理   xieying
import xieying from '../view/personmanage/user/account/xieying'

//用户管理   详情
import details from '../view/personmanage/user/account/details'
// 工资发放
import salary from '../view/personmanage/salary/index'
// 项目培训
import ProjectTrain from '../view/personmanage/ProjectTrain/index'
// 添加培训
import addtrain from '../view/personmanage/ProjectTrain/addtrain'
// 百度定位
import baodudingwei  from '../components/common/baidu'
// 通讯录
import addresslist from '../view/personmanage/AddressList/index'



// 质量管理模块
import SaftLeft from '../components/common/saftLeft'
// 安全教育
import safteducate from '../view/safetymanage/SaftEducate/index'
// 新建教育
import rebuildsafteducate from '../view/safetymanage/SaftEducate/rebuild'
// 应急救援--安全制度
import emergerescue from '../view/safetymanage/EmergeRescue/saftsystem/index'
// 应急救援--安全制度新增
import saftsystemadd from '../view/safetymanage/EmergeRescue/saftsystem/saftsystemadd'
// 应急救援--应急救援人员-应急救援组
import guaranteam from '../view/safetymanage/EmergeRescue/rescueperson/guaranteam/index'
// 应急救援--应急救援人员-应急救援组新增
// import guaranteamadd from '../view/safetymanage/EmergeRescue/rescueperson/guaranteam/guaranteamadd'
import guaranteamadd from '../view/safetymanage/EmergeRescue/rescueperson/guaranteam/guaranteamadd'
// 应急救援--应急救援人员-后勤保障组
import rescueteam from '../view/safetymanage/EmergeRescue/rescueperson/rescueteam/index'
// 应急救援--应急救援人员-后勤保障组新增
import rescueteamadd from '../view/safetymanage/EmergeRescue/rescueperson/rescueteam/rescueteamadd'
// 系统配置--区域配置
import zone from '../view/safetymanage/SystemConfig/hiddenytpe/zone'
// 系统配置--区域配置新增
import hiddenconfig from '../view/safetymanage/SystemConfig/hiddenytpe/hiddenconfig'
// 安全排查--安全计划
import saftplan from '../view/safetymanage/SaftCheck/saftplan/index'
// 安全排查--新增安全计划
import addsaftplan from '../view/safetymanage/SaftCheck/saftplan/addsaftplan'
// 安全排查--今日计划
import safttoday from '../view/safetymanage/SaftCheck/todayplan/index'
// 安全排查--今日计划 新增
import saftaddtoday from '../view/safetymanage/SaftCheck/todayplan/todayadd'
// 安全排查--今日计划 
import safthistory from '../view/safetymanage/SaftCheck/history/index'
// 安全排查--今日计划 新增
import saftaddhistory from '../view/safetymanage/SaftCheck/history/detail'
// 过滤
import gl from '../view/personmanage/AttendanceManage/text'
/*
 * 设备管理
 */
import EquipLeft from '../components/common/EquipLeft'
// 当日检查任务--计划查询
import needsearch from '../view/equipmanage/EquipNeed/needsearch/index'
// 当日检查任务--计划查询操作
import dosearch from '../view/equipmanage/EquipNeed/needsearch/dobuild'
// 设备需求--计划编制
import planning from '../view/equipmanage/EquipNeed/planning/index'
// 新增 设备需求--计划编制
import doplan from '../view/equipmanage/EquipNeed/planning/doplan'
// 设备需求--设备登记--设备注册
import equipreg from '../view/equipmanage/EquipNeed/EquipRegister/equipreg/index'
// 设备需求--设备登记--设备注册操作
import doequipreg from '../view/equipmanage/EquipNeed/EquipRegister/equipreg/doequipreg'
// 设备需求--设备登记--操作员注册
import operatorReg from '../view/equipmanage/EquipNeed/EquipRegister/operatorReg/index'
// 设备需求--设备登记--操作员注册操作
import doperatorReg from '../view/equipmanage/EquipNeed/EquipRegister/operatorReg/doperatoreg'
// 设备需求--设备登记--设备管理
import equipmanage from '../view/equipmanage/EquipNeed/EquipRegister/equipmanage/index'
// 设备需求--设备登记--设备管理操作
import doequipmanage from '../view/equipmanage/EquipNeed/EquipRegister/equipmanage/doequipm'
// 设备维护--设备保养计划
import upkeeplan from '../view/equipmanage/EquipMaintain/upkeeplan/index'
// 设备维护--设备保养计划操作
import doupkeeplan from '../view/equipmanage/EquipMaintain/upkeeplan/doupkeeplan'
// 设备维护--当日保养
import todayupkeep from '../view/equipmanage/EquipMaintain/todayupkeep/index'
// 设备维护--当日保养操作
import dotodayupkeep from '../view/equipmanage/EquipMaintain/todayupkeep/dotoday'
// 设备维护--保养历史
import upkeephistory from '../view/equipmanage/EquipMaintain/upkeephistory/index'
// 设备维护--保养历史操作
import dohistory from '../view/equipmanage/EquipMaintain/upkeephistory/dohistory'
//设备维护--设备维修
import euiprepair from '../view/equipmanage/EquipMaintain/euiprepair/index'
// 设备维护--设备维修 操作
import dorepair from '../view/equipmanage/EquipMaintain/euiprepair/dorepair'
// 设备维护--维修费用报表
import repairfree from '../view/equipmanage/EquipMaintain/repairfree/index'
// 设备运营计划--运营计划查询
import plansearch from '../view/equipmanage/EquipRunPlan/plansearch/index'
// 设备运营计划--运营计划查询操作
import doplansearch from '../view/equipmanage/EquipRunPlan/plansearch/doplansearch.vue'
// 设备运营计划--运营计划查询详情
import doplandetail from '../view/equipmanage/EquipRunPlan/plansearch/plandetail'
// 设备运营计划--设备油耗
import oilwear from '../view/equipmanage/EquipRunPlan/oilwear/index'
// 设备运营计划--设备油耗操作
import dowear from '../view/equipmanage/EquipRunPlan/oilwear/dowear'
// 设备运营计划--运营数据监控
import datamonitor from '../view/equipmanage/EquipRunPlan/datamonitor/index'
// 设备运营数据的新增
import addmonitor from '../view/equipmanage/EquipRunPlan/datamonitor/dobuild'
// 设备运营计划--运营数据
import rundata from '../view/equipmanage/EquipRunPlan/rundata/index'
// 设备运营计划--运营数据详情
import rundetail from '../view/equipmanage/EquipRunPlan/rundata/dobuild'
// 设备运营计划--设备运营结算
import equipcount from '../view/equipmanage/EquipRunPlan/equipcount/index'
// 设备运营计划--设备运营结算单
import equipcountdetail from '../view/equipmanage/EquipRunPlan/equipcount/dobuild'
// import equipdetail from '../view/personmanage/ConfigManage/equipmanage/equipdetail'
// 金额转换
// import money from '../components/common/require'
/**
 * 物资管理
 */
import matrialLeft from '../components/common/matrialLeft'
// 素材库
import mstore from '../components/common/mstore'
// 物资计划--材料总计划
import goodslplan from '../view/Materialview/GoodsPlan/totalplan/index'
// 物资计划--材料总计划操作
import dototalplan from '../view/Materialview/GoodsPlan/totalplan/dototal'
// 物资计划--材料总计划详情
import dototalplandata from '../view/Materialview/GoodsPlan/totalplan/totadetail'
// 物资计划--材料需用计划
import needplan from '../view/Materialview/GoodsPlan/needplan/index'
// 物资计划--材料需用计划操作
import doneedplan from '../view/Materialview/GoodsPlan/needplan/doneed'
// 物资计划--材料需用计划操作
import doneedplandata from '../view/Materialview/GoodsPlan/needplan/doneeddata'
// 物资计划--材料合同--合同管理
import pactmanage from '../view/Materialview/GoodsPlan/materialpact/pactmanage/index'
// 物资计划--材料合同--新增合同
import dopactmanage from '../view/Materialview/GoodsPlan/materialpact/pactmanage/dopact'
// 物资计划--材料合同--新增详情
import dopactpactdetail from '../view/Materialview/GoodsPlan/materialpact/pactmanage/pactdetail'
// 物资计划--材料合同--材料结算新增
import materialdocount from '../view/Materialview/GoodsPlan/materialpact/materialcount/docount'
// 物资计划--材料合同--材料结算
import materialcount from '../view/Materialview/GoodsPlan/materialpact/materialcount/index'
// 物资计划--材料合同--材料付款
import materialpay from '../view/Materialview/GoodsPlan/materialpact/materialpay/index'
// 材料入场--入场验收
import materialenter from '../view/Materialview/MaterialEnter/AdmissionCheck/index'
// 材料入场--入场验收新增
import materialdoadmicheck from '../view/Materialview/MaterialEnter/AdmissionCheck/doadmicheck'
// 材料出库
import materialexit from '../view/Materialview/MaterialExit/exit/index'
// 材料出库--新增
import materialdoexit from '../view/Materialview/MaterialExit/exit/doexit'
// 材料出库--新增
import materialdetail from '../view/Materialview/MaterialExit/exit/doexitdetail'
// 材料退库
import materialretreat from '../view/Materialview/MaterialExit/retreat/index'
// 材料退库--新增
import materialretdoreteat from '../view/Materialview/MaterialExit/retreat/doreteat'
//数据分析
import datafx from '../view/Materialview/DataAnalysis/index'
//材料调拨
import matericalallot from '../view/Materialview/MatericalAllot/index'
//材料盘点
import matericalcheck from '../view/Materialview/MaterialCheck/index'
//材料盘点详情
import matericalcheckdata from '../view/Materialview/MaterialCheck/materdata'
//材料配置--供应商配置
import supplyconfig from '../view/Materialview/MatericalConfig/Supplier/index'
//材料配置--供应商配置 
import dosupply from '../view/Materialview/MatericalConfig/Supplier/dosupplier'
// 材料配置--仓库配置
import packconfig from '../view/Materialview/MatericalConfig/packconfig/index'
//相关配置--基础物资库
import basicgoodsbank from '../view/Materialview/MatericalConfig/basicgoodsbank/index'
//相关配置--基础物资库
import dobasic from '../view/Materialview/MatericalConfig/basicgoodsbank/dobasic'
// 相关配置--仓库配置
import storehouse from '../view/Materialview/MatericalConfig/storehouse/index'
// 相关配置--仓库配置操作
import dostorehose from '../view/Materialview/MatericalConfig/storehouse/dostorehose'
// test
import videotest from '../view/Materialview/SaftEducate/test'
/**
 * 质量管理
 */

import QualityLeft from '../components/common/QualityLeft'
// 质量检查计划
import qualityplan from '../view/qualityview/QualityCheck/checkplan/index'
// 新增质量检查计划
import addqualityplan from '../view/qualityview/QualityCheck/checkplan/dobuild'
// 当日检查任务
import currentTask from '../view/qualityview/QualityCheck/qualitycheck/currentTask/index'
// 当日检查任务--修改
import modifycurrentTask from '../view/qualityview/QualityCheck/qualitycheck/currentTask/modify'
// 未完成检查
import unfinishtask from '../view/qualityview/QualityCheck/qualitycheck/unfinishtask/index'
// console.log()
// 已完成检查
import qualityfinished from '../view/qualityview/QualityCheck/qualitycheck/finishedtask/index'
// 质量整改--整改项目查询
import projectsearch from '../view/qualityview/QualityCheck/qualityrectify/search/index'
// 质量整改--整改项目编辑
import projectdocheck from '../view/qualityview/QualityCheck/qualityrectify/search/docheck'
// 质量整改--整改申请
import rectifyapplay from '../view/qualityview/QualityCheck/qualityrectify/applay/index'
// 质量整改--整改申请--新增
import rectifyapplayadd from '../view/qualityview/QualityCheck/qualityrectify/applay/applayadd'
// 质量整改--整改申请--审核
import verifier from '../view/qualityview/QualityCheck/qualityrectify/applay/verifier'
// 质量整改--整改审批
import rectifyapprove from '../view/qualityview/QualityCheck/qualityrectify/approve/index'
// 质量整改--质量报表--已通过
import reportpassed from '../view/qualityview/QualityCheck/reportform/passed/index'
// 质量整改--质量报表--未通过
import reportunpassed from '../view/qualityview/QualityCheck/reportform/unpassed/index'
// 质量验收
import qualityreceive from '../view/qualityview/QualityReceive/index'
// 实测实量管理--项目标准
import prostandard from '../view/qualityview/MeasureManage/standard/index'
// 实测实量管理--项目标准新增
import standardadd from '../view/qualityview/MeasureManage/standard/standardadd'
// 实测实量管理--测量数据管理
import measuredata from '../view/qualityview/MeasureManage/measuredata/index'
// 实测实量管理--测量数据管理新增
import measureadd from '../view/qualityview/MeasureManage/measuredata/measureadd'
// 质量管理配置
import qualityconfig from '../view/qualityview/QualityConfig/index'
// 质量管理配置--新增
import qualityconfigadd from '../view/qualityview/QualityConfig/qualityadd.vue'
import test from '../view/test'
import step from '../components/common/step'
// console.log(step.methods.stepchange());

Vue.use(Router)
export default new Router({
  // mode: 'hash',
  routes: [
    {
      path: '/',
      // name: 'home',
      redirect: 'login'
    }, {
          path: '/home',
          name: 'otherpage',
          component: otherpage
        }
        ,
    {
      path: '/login',
      name: 'login',
      component: login
    }
    ,{
      path: '/test',
      name: 'test',
      component: test
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
    // {
    //   path:'/pmprojeqtor',
    //   name:'pmprojeqtor',
    //   component:pmprojeqtor
    // },
    //人事管理  
    {
      path: '/project',
      name: 'IndexLeft',
      component: IndexLeft,
      children: [ 
        { path: 'step', name: 'step', component: step, },
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
        // 工资明细
        { path: 'searchsalarydetail', name: 'searchsalarydetail', component: searchsalarydetail },
        //人事管理--人员工资上报
        { path: 'addsalary', name: 'addsalary', component: addsalary },
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
            // { path: 'cost', name: 'cost', component: cost },
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
        //审批 草稿箱 编辑请假
        { path: 'draftcompile', name: 'draftcompile', component: draftcompile }, 
        //审批 草稿箱 编辑资产
        { path: 'draftcompileasset', name: 'draftcompileasset', component: draftcompileasset },  
        //审批 草稿箱 编辑报销
        { path: 'draftcompilecost', name: 'draftcompilecost', component: draftcompilecost },  
        //审批 草稿箱 编辑运营
        { path: 'draftcompileoperation', name: 'draftcompileoperation', component: draftcompileoperation }, 
        //审批 草稿箱 编辑需求
        { path: 'draftrequirement', name: 'draftrequirement', component: draftrequirement },  
        //审批 草稿箱 编辑保养
        { path: 'draftupkeep', name: 'draftupkeep', component: draftupkeep },  
        //审批 草稿箱 编辑物资合同
        { path: 'draftbargain', name: 'draftbargain', component: draftbargain },  
        //审批 草稿箱 编辑物资总计划
        { path: 'draftsiteplan', name: 'draftsiteplan', component: draftsiteplan },  
        //审批 草稿箱 编辑物资需求计划
        { path: 'draftdemandplan', name: 'draftdemandplan', component: draftdemandplan },  
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
            // 权限配置
            { path: 'rolejurisdiction', name: 'rolejurisdiction', component: rolejurisdiction },
          ]
        },
        // 配置管理-菜单管理  新建
        { path: 'menuredact', name: 'menuredact', component: menuredact },
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
        { path: 'xieying', name: 'xieying', component: xieying },

        // 用户管理  详情
        { path: 'details', name: 'details', component: details },
        { path: '', redirect: 'step' },
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
      ]
    },
    // 处理图片流的问题
    { path: '/imgflow', name: 'Imgflow', component: Imgflow },
    // 项目的首页
    { path: '/home', name: 'otherpage', component: otherpage },
    // 通讯录
    { path:'/addresslist',name:'addresslist',component:addresslist},
    // 安全管理模块
    {
      path: '/saftmanage',
      name: 'SaftLeft',
      component: SaftLeft,
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
        // 安全排查--今日检查计划
        { path: 'safttoday', name: 'safttoday', component: safttoday },
        // 安全排查--今日检查计划添加
        { path: 'saftaddtoday', name: 'saftaddtoday', component: saftaddtoday },
        // 隐患排查--历史
        { path:'safthistory',name:'safthistory',component:safthistory },
        // 隐患排查--历史 新增
        { path:'saftaddhistory',name:'saftaddhistory',component:saftaddhistory },
      ]
    },
    /*
    * 设备管理
    *  
    */
    {
    path: '/equipmanage',
    name: 'EquipLeft',
    component: EquipLeft,
    children: [
      { path: '', redirect: 'planning' },
      // 当日检查任务--计划编制
      { path: 'planning', name: 'planning', component: planning },
      // 当日检查任务--计划编制操作
      { path:'doplan',name:'doplan',component:doplan},
      // 当日检查任务--计划查询
      { path: 'needsearch', name: 'needsearch', component: needsearch },
      // 当日检查任务--计划查询--修改
      { path: 'dosearch', name: 'dosearch', component: dosearch },
      // 设备需求--设备登记--设备注册
      { path: 'equipreg', name: 'equipreg', component: equipreg },
      // 设备需求--设备登记--设备注册操作
      { path: 'doequipreg',name: 'doequipreg',component: doequipreg},
      // 设备需求--设备登记--操作员注册
      { path: 'operatorReg',name: 'operatorReg',component: operatorReg},
      // 设备需求--设备登记--操作员注册
      { path: 'doperatorReg',name: 'doperatorReg',component: doperatorReg},
      // 设备需求--设备登记--设备管理
      { path: 'equipmanage',name: 'equipmanage',component: equipmanage},
      // 设备需求--设备登记--设备管理操作
      { path: 'doequipmanage',name: 'doequipmanage',component: doequipmanage},
      // 质量整改--整改申请--审核
      { path: 'upkeeplan',name: 'upkeeplan',component: upkeeplan},
      // 设备维护--设备保养计划
      { path: 'doupkeeplan',name: 'doupkeeplan',component: doupkeeplan},
      // 设备维护--当日保养
      { path: 'todayupkeep', name: 'todayupkeep', component: todayupkeep },
      // 设备维护--当日保养操作
      { path: 'dotodayupkeep', name: 'dotodayupkeep', component: dotodayupkeep },
      // 设备维护--保养历史
      { path: 'upkeephistory', name: 'upkeephistory', component: upkeephistory },
      //设备维护--保养历史操作
      { path:'dohistory',name:'dohistory',component:dohistory },
      //设备维护--设备维修
      { path:'euiprepair',name:'euiprepair',component:euiprepair },
      // 设备维护--设备维修操作
      { path: 'dorepair', name: 'dorepair', component: dorepair },
      // 设备维护--维修费用报表
      { path: 'repairfree', name: 'repairfree', component: repairfree },
      // 设备运营计划--运营计划查询
      { path:'plansearch',name:'plansearch',component:plansearch },
      // 设备运营计划--运营计划查询操作
      { path:'doplansearch',name:'doplansearch',component:doplansearch },
      // 设备运营计划--运营计划查询操作
      { path:'doplandetail',name:'doplandetail',component:doplandetail },
      // 设备运营计划--设备油耗
      { path: 'oilwear', name: 'oilwear', component: oilwear },
      // 设备运营计划--设备油耗操作
      { path: 'dowear', name: 'dowear', component: dowear },
      // 设备运营计划--设备油耗
      { path:'plansearch',name:'plansearch',component:plansearch },
      // 设备运营计划--运营数据监控
      { path:'datamonitor',name:'datamonitor',component:datamonitor },
      // 设备运营计划--运营数据监控新增
      { path:'addmonitor',name:'addmonitor',component:addmonitor },
      // 设备运营计划--运营数据
      { path:'rundata',name:'rundata',component:rundata },
      // 设备运营计划--运营数据详情
      { path:'rundetail',name:'rundetail',component:rundetail },
      // 设备运营计划--设备运营结算
      { path:'equipcount',name:'equipcount',component:equipcount },
      // 设备运营计划--设备运营结算
      { path:'equipcountdetail',name:'equipcountdetail',component:equipcountdetail },
    ]
    },
    // { path:'/money',name:'money',component:money }
    /**
     * 物资管理
     */
    {
      path: '/materialmanage',
      name: 'matrialLeft',
      component: matrialLeft,
      children: [
        // 安全教育
        { path: '', redirect: 'goodslplan' },
        { path:'dototalplan',name:'dototalplan',component:dototalplan },
        //物资总计划详情
        { path:'dototalplandata',name:'dototalplandata',component:dototalplandata },
        // 物资计划--材料需用计划
        { path:'needplan',name:'needplan',component:needplan},
        // 物资计划--材料需用计划
        { path:'doneedplan',name:'doneedplan',component:doneedplan},
        // 物资计划--材料需用计划
        { path:'doneedplandata',name:'doneedplandata',component:doneedplandata},
        // 物资计划--材料总计划
        { path: 'goodslplan', name: 'goodslplan', component: goodslplan },
        // 物资计划--材料合同--合同查询
        { path: 'pactmanage', name: 'pactmanage', component: pactmanage },
        // 物资计划--材料合同--新增合同
        { path: 'dopactmanage', name: 'dopactmanage', component: dopactmanage },
        // 物资计划--材料合同--详情
        { path: 'dopactpactdetail', name: 'dopactpactdetail', component: dopactpactdetail },
        // 物资计划--材料合同--材料结算
        { path: 'materialcount',name: 'materialcount',component: materialcount},  
        // 物资计划--材料合同--材料结算
        { path: 'materialdocount',name: 'materialdocount',component: materialdocount},  
        // 物资计划--材料合同--材料付款
        { path: 'materialpay',name: 'materialpay',component: materialpay},
        // 材料入场--入场验收
        { path: 'materialenter',name: 'materialenter',component: materialenter},
        // 材料入场--入场验收
        { path: 'materialdoadmicheck',name: 'materialdoadmicheck',component: materialdoadmicheck},
        // 材料出库
        { path: 'materialexit',name: 'materialexit',component: materialexit},
        // 材料出库--新增
        { path: 'materialdoexit',name: 'materialdoexit',component: materialdoexit},
        // 材料出库--新增
        { path: 'materialdetail',name: 'materialdetail',component: materialdetail},
        // 材料退库
        { path: 'materialretreat', name: 'materialretreat', component: materialretreat },
        // 材料退库 materialretdoreteat
        { path: 'materialretdoreteat', name: 'materialretdoreteat', component: materialretdoreteat },
        // 数据分析
        { path: 'datafx', name: 'datafx', component: datafx },
        // 材料调拨
        { path: 'matericalallot', name: 'matericalallot', component: matericalallot },
        //材料盘点  
        { path:'matericalcheck',name:'matericalcheck',component:matericalcheck },
        //材料盘点  
        { path:'matericalcheckdata',name:'matericalcheckdata',component:matericalcheckdata },
        // 相关配置--供应商配置
        { path: 'supplyconfig', name: 'supplyconfig', component: supplyconfig },
        // 相关配置--供应商配置
        { path: 'dosupply', name: 'dosupply', component: dosupply },
        // 相关配置--合同配置
        { path: 'packconfig', name: 'packconfig', component: packconfig },
        //相关配置--基础物资库
        { path:'basicgoodsbank',name:'basicgoodsbank',component:basicgoodsbank },
        { path:'dobasic',name:'dobasic',component:dobasic },
        // 相关配置--仓库配置
        { path:'storehouse',name:'storehouse',component:storehouse },
        { path:'dostorehose',name:'dostorehose',component:dostorehose },
      ]
    },
    { path: '/videotest', name: 'videotest', component: videotest },
    /**
     * 质量管理
     */
    {
      path: '/qualitymanage',
      name: 'QualityLeft',
      component: QualityLeft,
      children: [
        // 质量检查计划
        { path: '', redirect: 'qualityplan' },
        // 质量检查计划
        { path: 'qualityplan', name: 'qualityplan', component: qualityplan },
        // 新建质量检查计划
        { path:'addqualityplan',name:'addqualityplan',component:addqualityplan},
        // 质量检查--当日检查任务
        { path: 'currentTask', name: 'currentTask', component: currentTask },
        // 质量检查--当日检查任务--修改
        { path: 'modifycurrentTask', name: 'modifycurrentTask', component: modifycurrentTask },
        // 质量检查--未完成检查
        { path: 'unfinishtask', name: 'unfinishtask', component: unfinishtask },
        // 质量检查--已完成检查
        { path: 'qualityfinished',name: 'qualityfinished',component: qualityfinished},
        // 质量整改--整改项目查询
        { path: 'projectsearch',name: 'projectsearch',component: projectsearch},
        // 质量整改--整改项目编辑
        { path: 'projectdocheck',name: 'projectdocheck',component: projectdocheck},
        // 质量整改--整改申请
        { path: 'rectifyapplay',name: 'rectifyapplay',component: rectifyapplay},
        // 质量整改--整改申请--新增
        { path: 'rectifyapplayadd',name: 'rectifyapplayadd',component: rectifyapplayadd},
        // 质量整改--整改申请--审核
        { path: 'verifier',name: 'verifier',component: verifier},
        // 质量整改--整改审批
        { path: 'rectifyapprove',name: 'rectifyapprove',component: rectifyapprove},
        // 质量整改--质量报表--已通过
        { path: 'reportpassed', name: 'reportpassed', component: reportpassed },
        // 质量整改--质量报表--未通过
        { path: 'reportunpassed', name: 'reportunpassed', component: reportunpassed },
        // 质量验收
        { path: 'qualityreceive', name: 'qualityreceive', component: qualityreceive },
        //实测实量管理--项目标准
        { path:'prostandard',name:'prostandard',component:prostandard },
        //实测实量管理--项目标准新增
        { path:'standardadd',name:'standardadd',component:standardadd },
        // 实测实量管理--测量数据管理
        { path: 'measuredata', name: 'measuredata', component: measuredata },
        // 实测实量管理--测量数据管理新增
        { path: 'measureadd', name: 'measureadd', component: measureadd },
        // 质量管理配置
        { path:'qualityconfig',name:'qualityconfig',component:qualityconfig },
        // 质量管理配置
        { path:'qualityconfigadd',name:'qualityconfigadd',component:qualityconfigadd },
      ]
    },
  ]
})
