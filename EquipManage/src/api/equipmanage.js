//注册设备
export const regequip=`/api/devreginfo/insert`
// 查询所有祖册设备数据
export const equipreginsert=`/api/devreginfo/selectBy`
// 编辑所有祖册设备数据
export const equipregupdate=`/api/devreginfo/update`
//设备需求查询明细
export const devreqplandetailselectBy=`/api/devreqplandetail/selectBy`
export const devreqplandetailupdate=`/api/devreqplandetail/update`  //明细  修改

export const devreqplansubmit=`/zjl/devreqplan/submit`  //提交
export const devreqplansave=`/zjl/devreqplan/save`  //保存

// 需求查询
export const devreqplanselectBy=`/api/devreqplan/selectBy` //查询 
export const devreqplaninsert=`/api/devreqplan/insert` //新增
export const devreqplanupdate=`/api/devreqplan/update` //新增


// 操作员
export const devoperatorinsert=`/api/devoperator/insert` //新增
export const devoperatorupdate=`/api/devoperator/update` //修改
export const devoperatorselectBy=`/api/devoperator/selectBy` //查询

//  设备管理
export const devmangeinsert=`/api/devmange/insert` //新增
export const devmangeselectBy=`/api/devmange/selectBy` //查询 
export const devmangeupdate=`/api/devmange/update` //修改  

// 设备保养计划
export const devmantplaninsert=`/api/devmantplan/insert` //新增
export const devmantplanselectBy=`/api/devmantplan/selectBy` //查询 
export const devmantplanupdate=`/api/devmantplan/update` //修改

export const devmantplansubmit=`/zjl/devmantplan/submit` //提交
export const devmantplansave=`/zjl/devmantplan/save` //保存



// 当日保养
export const devmanittodayselectBy=`/api/dev/manit/today/selectBy` //查询 
export const devmanittodayupdate=`/api/dev/manit/today/update` //修改

// 保养历史
export const devchkhistoryselectBy=`/api/dev/chk/history/selectBy` //查询
// 维修
export const devrepairedupdate=`/api/dev/repaired/update` //修改
export const devrepairedselectBy=`/api/dev/repaired/selectBy` //查询

// 添加设备运营计划
export const devbusinessplaninsert=`/api/dev/businessplan/insert` //新增
export const devbusinessplanselectBy=`/api/dev/businessplan/selectBy` //查询
export const devbusinessplanupdate=`/api/dev/businessplan/update` //修改
export const devbusinessplandetaildelete=`/zjl/dev/businessplan/detail/delete` //删除


export const devbusinessplansubmit=`/zjl/dev/businessplan/submit` //提交
export const devbusinessplansave=`/zjl/dev/businessplan/save` //保存



// 修改设备运营计划明细
export const devbusinessplandetailupdate=`/api/dev/businessplan/detail/update` //xiugai
export const devbusinessplandetailinsert=`/api/dev/businessplan/detail/insert` //添加
export const devbusinessplandetailselectBy=`/api/dev/businessplan/detail/selectBy` //添加

// 耗油
export const devoilinsert=`/api/dev/oil/insert` //添加
export const devoilselectBy=`/api/dev/oil/selectBy` //添加
export const devoilupdate=`/api/dev/oil/update` //修改

// 运营数据
export const devbusinessrealselectBy=`/api/dev/businessreal/selectBy` //查询


// 根据条件查询可运营设备
export const devreginfoselectCanPlan=`/api/devreginfo/selectCanPlan` //查询


// 生成运营结算
export const devruncreate=`/api/dev/run/create` //生成
export const devrunselectBy=`/api/dev/run/selectBy` //查询
