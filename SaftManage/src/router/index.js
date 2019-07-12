import Vue from 'vue'
import Router from 'vue-router'
import IndexLeft from '../components/common/IndexLeft'
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
// 安全排查--今日安全计划
import todayplan from '../safetyview/SaftCheck/todayplan/index'
// 安全排查--今日安全计划详情
import todayplanadd from '../safetyview/SaftCheck/todayplan/todayadd'
// 安全排查--安全历史
import historyindex from '../safetyview/SaftCheck/history/index'
// 安全排查--隐患排查
import hiddencheck from '../safetyview/SaftCheck/hiddencheck/index'
// 安全排查--隐患排查--新增
import addhidden from '../safetyview/SaftCheck/hiddencheck/addhidden'
// 图片流的问题
import Imgflow from '../components/common/Imgflow'
// 个人信息
import userinfo from '../safetyview/userInfo/index'
// 通讯录
import addresslist from '../safetyview/AddressList/index'
// test
import videotest from '../safetyview/SaftEducate/test'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: 'saftmanage'},
    //任务
    {
      path: '/saftmanage',
      name: 'IndexLeft',
      component: IndexLeft,
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
        //安全排查--今日安全计划
        { path:'todayplan',name:'todayplan',component:todayplan },
        //安全排查--新增今日安全计划
        { path:'todayplanadd',name:'todayplanadd',component:todayplanadd },
        //安全排查--新增今日安全计划
        { path:'historyindex',name:'historyindex',component:historyindex },
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
    // 处理图片流的问题
    { path: '/imgflow', name: 'Imgflow', component: Imgflow },
    { path: '/videotest', name: 'videotest', component: videotest },
    
  ]
})
