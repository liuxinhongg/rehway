import Vue from 'vue'
import Router from 'vue-router'
import matrialLeft from '../components/common/matrialLeft'
// 素材库
import mstore from '../components/common/mstore'
// 物资计划--材料总计划
import goodslplan from '../Materialview/GoodsPlan/totalplan/index'
// 物资计划--材料总计划操作
import dototalplan from '../Materialview/GoodsPlan/totalplan/dototal'
// 物资计划--材料总计划详情
import dototalplandata from '../Materialview/GoodsPlan/totalplan/totadetail'
// 物资计划--材料需用计划
import needplan from '../Materialview/GoodsPlan/needplan/index'
// 物资计划--材料需用计划操作
import doneedplan from '../Materialview/GoodsPlan/needplan/doneed'
// 物资计划--材料需用计划操作
import doneedplandata from '../Materialview/GoodsPlan/needplan/doneeddata'
// 物资计划--材料合同--合同管理
import pactmanage from '../Materialview/GoodsPlan/materialpact/pactmanage/index'
// 物资计划--材料合同--新增合同
import dopactmanage from '../Materialview/GoodsPlan/materialpact/pactmanage/dopact'
// 物资计划--材料合同--新增详情
import dopactpactdetail from '../Materialview/GoodsPlan/materialpact/pactmanage/pactdetail'
// 物资计划--材料合同--材料结算新增
import materialdocount from '../Materialview/GoodsPlan/materialpact/materialcount/docount'
// 物资计划--材料合同--材料结算
import materialcount from '../Materialview/GoodsPlan/materialpact/materialcount/index'
// 物资计划--材料合同--材料付款
import materialpay from '../Materialview/GoodsPlan/materialpact/materialpay/index'
// 材料入场--入场验收
import materialenter from '../Materialview/MaterialEnter/AdmissionCheck/index'
// 材料入场--入场验收新增
import materialdoadmicheck from '../Materialview/MaterialEnter/AdmissionCheck/doadmicheck'
// 材料出库
import materialexit from '../Materialview/MaterialExit/exit/index'
// 材料出库--新增
import materialdoexit from '../Materialview/MaterialExit/exit/doexit'
// 材料出库--新增
import materialdetail from '../Materialview/MaterialExit/exit/doexitdetail'
// 材料退库
import materialretreat from '../Materialview/MaterialExit/retreat/index'
// 材料退库--新增
import materialretdoreteat from '../Materialview/MaterialExit/retreat/doreteat'
//数据分析
import datafx from '../Materialview/DataAnalysis/index'
//材料调拨
import matericalallot from '../Materialview/MatericalAllot/index'
//材料盘点
import matericalcheck from '../Materialview/MaterialCheck/index'
//材料盘点详情
import matericalcheckdata from '../Materialview/MaterialCheck/materdata'
//材料配置--供应商配置
import supplyconfig from '../Materialview/MatericalConfig/Supplier/index'
//材料配置--供应商配置 
import dosupply from '../Materialview/MatericalConfig/Supplier/dosupplier'
// 材料配置--仓库配置
import packconfig from '../Materialview/MatericalConfig/packconfig/index'
//相关配置--基础物资库
import basicgoodsbank from '../Materialview/MatericalConfig/basicgoodsbank/index'
//相关配置--基础物资库
import dobasic from '../Materialview/MatericalConfig/basicgoodsbank/dobasic'
// 相关配置--仓库配置
import storehouse from '../Materialview/MatericalConfig/storehouse/index'
// 相关配置--仓库配置操作
import dostorehose from '../Materialview/MatericalConfig/storehouse/dostorehose'
// 个人信息
import userinfo from '../Materialview/userInfo/index'
// 通讯录
import addresslist from '../Materialview/AddressList/index'
// test
import videotest from '../Materialview/SaftEducate/test'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    { path:'/mstore',name:'mstore',component:mstore },
    { path: '/', redirect: 'materialmanage'},
    //任务
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
        //个人信息
        { path: 'userinfo', name: 'userinfo', component: userinfo },
        // 通讯录
        { path:'addresslist',name:'addresslist',component:addresslist}
      ]
    },
    // 处理图片流的问题
    // { path: '/imgflow', name: 'Imgflow', component: Imgflow },
    { path: '/videotest', name: 'videotest', component: videotest },
    
  ]
})
