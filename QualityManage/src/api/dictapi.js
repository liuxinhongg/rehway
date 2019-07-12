//项目
export const subprj=`/api/sub_prj/selectAll`;
// 检查位置
export const location=`/api/location/selectAll`;
// 用户信息
export const user=`/api/user/user_select`;
//查找全部行政区划字典信息
export const regioncodeall=`/api/dict/regioncode_all`;
//根据级别和上级地区划分查找行政区划字典信息
export const risttypeby=`/api/dict/regioncode_by`;
//三级分布查找行政区划信息
export const regioncodelevel=`/api/dict/regioncode_level`;
//获取全部银行字典信息
export const bank=`/api/dict/bank`;
//获取全部企业登记注册类型字典信息
export const corptype=`/api/dict/corptype`;
//分级获取全部企业登记注册类型字典信息
export const corptypelevel=`/api/dict/corptype_level`;
//获取全部项目分类字典信息
export const category=`/api/dict/category`;
//查询全部人员证件类型信息
export const idtype=`/api/dict/id_type`;
//查询全部工人工种信息
export const worktype=`/api/dict/work_type`;
//查询全部政治面貌信息
export const politics=`/api/dict/politics`;
// 查询全部项目状态信息
export const prjstatus=`/api/dict/prj_status`;
//查询工程用途字典表信息
export const prjfunction=`/api/dict/function`;
//查询参见单位类型字典表信息
export const subtype=`/api/dict/sub_type`;
//查询全部的工人管理人员类型
export const mantype=`/api/dict/man_type`;
//查询全部企业资质资格类型字典
export const aptitudeType=`/api/dict/aptitudeType`;
//查询培训类型字典信息
export const traintype=`/api/dict/train_type`;
//安全检查类型
export const ristverify=`/api/dict/rist_verify`;
//隐患等级类型
export const ristdanger=`/api/dict/rist_danger`;
//安全教育类型
export const ristedu=`/api/dict/rist_edu`;
//安全隐患状态
export const ristdangerstate=`/api/dict/rist_danger_state`;
//全部安全隐患类型
export const risttype=`/api/dict/rist_type`;


// 配置字典表
//管理员类型  String mname;String coment
export const manTypeinsert=`/api/manType/insert`;//添加
export const manTypedelete=`/api/manType/delete`;//删除 Integer code
//资质资格类型字典信息 String entAptitCode;String entAptitType;
export const aptitudeinsert=`/api/aptitude/insert`;//添加
export const aptitudedelete=`/api/aptitude/delete`;//删除 code
//银行类型 String banktype;String bank;
export const bankinsert=`/api/bank/insert`;//添加
export const bankdelete=`/api/bank/delete`;//删除 type
//项目类型字典表 String categorytype，String category;
export const categoryinsert=`/api/category/insert`;//添加
export const categorydelete=`/api/category/delete`;//删除 code
//企业登记注册类型 String corptype;String corp;
export const cproTypesert=`/api/cproType/insert`;//添加
export const cproTypelete=`/api/cproType/delete`;//删除 type