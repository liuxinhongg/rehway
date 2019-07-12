import Vue from 'vue'
import Router from 'vue-router'
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
// 已完成检查
import finishedtask from '../view/qualityview/QualityCheck/qualitycheck/finishedtask/index'
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
// 金额转换
import money from '../components/common/require'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: 'qualitymanage'},
    //任务
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
        { path: 'finishedtask',name: 'finishedtask',component: finishedtask},
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
    { path:'/money',name:'money',component:money }
  ]
})
