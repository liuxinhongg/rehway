import Vue from 'vue'
import Router from 'vue-router'
import EquipLeft from '../components/common/EquipLeft'
// 当日检查任务--计划查询
import needsearch from '../view/qualityview/EquipNeed/needsearch/index'
// 当日检查任务--计划查询操作
import dosearch from '../view/qualityview/EquipNeed/needsearch/dobuild'
// 设备需求--计划编制
import planning from '../view/qualityview/EquipNeed/planning/index'
// 新增 设备需求--计划编制
import doplan from '../view/qualityview/EquipNeed/planning/doplan'
// 设备需求--设备登记--设备注册
import equipreg from '../view/qualityview/EquipNeed/EquipRegister/equipreg/index'
// 设备需求--设备登记--设备注册操作
import doequipreg from '../view/qualityview/EquipNeed/EquipRegister/equipreg/doequipreg'
// 设备需求--设备登记--操作员注册
import operatorReg from '../view/qualityview/EquipNeed/EquipRegister/operatorReg/index'
// 设备需求--设备登记--操作员注册操作
import doperatorReg from '../view/qualityview/EquipNeed/EquipRegister/operatorReg/doperatoreg'
// 设备需求--设备登记--设备管理
import equipmanage from '../view/qualityview/EquipNeed/EquipRegister/equipmanage/index'
// 设备需求--设备登记--设备管理操作
import doequipmanage from '../view/qualityview/EquipNeed/EquipRegister/equipmanage/doequipm'
// 设备维护--设备保养计划
import upkeeplan from '../view/qualityview/EquipMaintain/upkeeplan/index'
// 设备维护--设备保养计划操作
import doupkeeplan from '../view/qualityview/EquipMaintain/upkeeplan/doupkeeplan'
// 设备维护--当日保养
import todayupkeep from '../view/qualityview/EquipMaintain/todayupkeep/index'
// 设备维护--当日保养操作
import dotodayupkeep from '../view/qualityview/EquipMaintain/todayupkeep/dotoday'
// 设备维护--保养历史
import upkeephistory from '../view/qualityview/EquipMaintain/upkeephistory/index'
// 设备维护--保养历史操作
import dohistory from '../view/qualityview/EquipMaintain/upkeephistory/dohistory'
//设备维护--设备维修
import euiprepair from '../view/qualityview/EquipMaintain/euiprepair/index'
// 设备维护--设备维修 操作
import dorepair from '../view/qualityview/EquipMaintain/euiprepair/dorepair'
// 设备维护--维修费用报表
import repairfree from '../view/qualityview/EquipMaintain/repairfree/index'
// 设备运营计划--运营计划查询
import plansearch from '../view/qualityview/EquipRunPlan/plansearch/index'
// 设备运营计划--运营计划查询操作
import doplansearch from '../view/qualityview/EquipRunPlan/plansearch/doplansearch.vue'
// 设备运营计划--运营计划查询详情
import doplandetail from '../view/qualityview/EquipRunPlan/plansearch/plandetail'
// 设备运营计划--设备油耗
import oilwear from '../view/qualityview/EquipRunPlan/oilwear/index'
// 设备运营计划--设备油耗操作
import dowear from '../view/qualityview/EquipRunPlan/oilwear/dowear'
// 设备运营计划--运营数据监控
import datamonitor from '../view/qualityview/EquipRunPlan/datamonitor/index'
// 设备运营计划--运营数据
import rundata from '../view/qualityview/EquipRunPlan/rundata/index'
// 设备运营计划--运营数据详情
import rundetail from '../view/qualityview/EquipRunPlan/rundata/dobuild'
// 设备运营计划--设备运营结算
import equipcount from '../view/qualityview/EquipRunPlan/equipcount/index'
// 设备运营计划--设备运营结算单
import equipdetail from '../view/qualityview/EquipRunPlan/equipcount/dobuild'

// 金额转换
import money from '../components/common/require'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: 'equipmanage'},
    //任务
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
        // 设备运营计划--运营数据
        { path:'rundata',name:'rundata',component:rundata },
        // 设备运营计划--运营数据详情
        { path:'rundetail',name:'rundetail',component:rundetail },
        // 设备运营计划--设备运营结算
        { path:'equipcount',name:'equipcount',component:equipcount },
        // 设备运营计划--设备运营结算
        { path:'equipdetail',name:'equipdetail',component:equipdetail },
      ]
    },
    { path:'/money',name:'money',component:money }
  ]
})
