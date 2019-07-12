<template>
    <div>
        <div class="projectmanage">
            <div class="navTab">
                <div :class="nav==0 ? class2:class1" @click="NavTab(0)"><i class="el-icon-menu"></i>项目管理</div>

                <div :class="nav==1 ? class2:class1" @click="NavTab(1)"><i class="el-icon-menu"></i>分包项目</div>               
            </div>
            <div v-if="nav == 0" class="usermain">
                <p style="margin-bottom:20px;">
                    <el-button type="warning" @click="modifity" v-if="isfalse == true" >修改</el-button>
                    <el-button type="primary" @click="addproject" v-if="isfalse==false">新增</el-button>
                </p>
                 <el-form :model="addteam" ref="addteam" :rules="projectrules"  @submit.native.prevent >
                    <table border="1" class="tableinsert" style="width:50%;margin: inherit;"  v-if="isfalse == true">
                        <tr>
                            <td class="tdleft" >组织机构代码：</td>
                            <td>
                                <p class="normalop" >{{addteam.buildCorpCode}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft" >项目编码：</td>
                            <td>
                                <p class="normalop" >{{addteam.projectId}}</p>
                            </td>   
                        </tr>
                        <tr>
                            <td class="tdleft" >项目名称：</td>
                            <td>
                                <p class="normalop" >{{addteam.name}}</p>
                            </td>   
                        </tr>
                        <tr>
                            <td class="tdleft" >工程名称：</td>
                            <td>
                                <p class="normalop" >{{addteam.builderLicensesName}}</p>
                            </td>   
                            
                        </tr>
                        <tr>
                            <td class="tdleft" >施工许可证：</td>
                            <td>
                                <p class="normalop" >{{addteam.builderLicenses}}</p>
                            </td>
                            
                        </tr>
                        <tr>
                            <td class="tdleft" >项目所在地：</td>
                            <td>
                                <p class="normalop" >{{addteam.areaCode}}</p>
                           </td>
                        </tr>
                        <tr>
                            <td class="tdleft" >项目状态：</td>
                            <td >
                                <p class="normalop" >{{addteam.prjStatus=='001'?'筹备':addteam.prjStatus == '002'? '立项':addteam.prjStatus == '003' ? '在建' : addteam.prjStatus == '004' ? '完工' : '停工'}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdleft" >工程用途：</td>
                            <td >
                                <p class="normalop" >{{addteam.functionNum}}</p>
                             </td>
                        </tr>
                    </table>
                </el-form>
                <empty v-if="isfalse==false">
                    <p slot="msg">
                        项目没有数据,快去新增项目吧~
                    </p>
                </empty>
            </div>
            <div v-if="nav==1" class="usermain">
                <sub-package></sub-package>
            </div>
        </div>
    </div>
</template>
<script>
// import AddProject from './addedit'
import SubPackage from '@/view/personmanage/ConfigManage/SubPackage/index'
import empty from '@/components/common/empty'
export default {
    components:{
        SubPackage,
        empty
    },
    data(){
        return{
            nav:0,
            class1:'norstyle',
            class2:'norstyle activestyle',
            projectStatus:[
                {label:'筹备',type:'001'},
                {label:'立项',type:'002'},
                {label:'在建',type:'003'},
                {label:'完工',type:'004'},
                {label:'停工',type:'005'},
            ],
            projectrules:{
                 buildCorpCode:[
                    { required: true, message: '请输入组织机构代码', trigger: 'blur' },
                    {pattern:/[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/,message:'请输入正确格式编码'}
                ],
                name:[
                    { required: true, message: '项目名称', trigger: 'blur' },
                ],
                builderLicenses:[
                    { required: true, message: '请输入施工许可证', trigger: 'blur' },
                ],
                areaCode:[
                    { required: true, message: '请选择项目所在地', trigger: 'change' },
                ],
                category:[
                    { required: true, message: '请选择项目状态', trigger: 'change' },
                ],
                projectId:[
                    { required: true, message: '请输入项目编码', trigger: 'blur' },
                    {pattern:/^[A-Z]{2}[/-][a-zA-Z0-9]{8,10}$/,message:'请输入正确的项目编码'}
                ],
            },
            urlId:0,
            areaCodeoption:[],
            categoryType:[],
            props: {
                value: 'code',
                label: 'name',
                children: 'child'
            },
            propstatus:{
                value: 'corpType',
                label: 'corp',
                children: 'child'
            },
            addteam:{
                buildCorpCode:'',
                projectId:'',
                name:'',
                builderLicensesName:'',
                builderLicenses:'',
                areaCode:'',
                prjStatus:'',
                functionNum:'',
            },
             functionoption:[],
             projectData:[],
             editId:'',
             isfalse:false,
        }
    },
    methods:{
        NavTab(n){
            this.nav=n;
        },
        handleItemChange(val) {
            this.addteam.areaCode=val;
            console.log(this.addteam.areaCode[2]);
        },
        addproject(){
            this.$router.push({path:'/project/projectadd?id=0'});
        },
        modifity(){
            this.$router.push({path:'/project/projectadd?id='+this.editId});
        },
        categoryChange(val){},
        resetForm(){},
        dataAll(){
            this.$http.get('/api/prj_base/prj_base_list').then(res=>{
                console.log(res);
                if(res.data.list[0]){
                    this.addteam=res.data.list[0];
                    this.editId=res.data.list[0].entId;
                    this.isfalse = true
                    // console.log(this.isfalse)
                }
            })
        }
    },
    mounted(){
        this.dataAll();
        //   行政区的三级联动接口
        this.$http.post("/api/dict/regioncode_level").then(res => {
        // console.log(res);
        this.areaCodeoption = res.data;
        });
        // 项目分类字典表
        // 项目分类
        this.$http.get('/api/dict/category').then(res=>{
            // console.log(res);
            this.categoryType=res.data;
        });
        //企业信息
        this.$http.post('/api/ent/ent_select_list').then(res=>{
            // console.log(res);
            this.companyId=res.data.entId;
        })
        // 工程用途 dict/function
        this.$http.post('/api/dict/function').then(res=>{
            // console.log(res);
            this.functionoption=res.data;
        })
        this.urlId=this.$route.query.id;  
        }
    
}
</script>

<style lang="scss">
.projectmanage{
    width: 100%;
    margin: 20px auto;
    .navTab{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:300px;
        height: 50px;
        padding: 20px;
        .norstyle{
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            i{
                margin-right:10px;
                font-size: 16px;
            }
        }
        .activestyle{
            color: #337ab7;
        }
    }
    .usermain{
        margin: auto;
        border-top: 1px solid #ccc;
        padding: 10px 20px;
        .normalop{
            height: 35px;
            line-height: 35px;
        }
    }
}
</style>
