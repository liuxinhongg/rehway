<template>
    <div class="addresslist">
        <top></top>
        <el-row :gutter="20" style="margin: 2rem auto;">
            <el-col :span="4">
                <div class="treeleft">
                    <el-tree class="treecontent" :data="linkdata" :props="defaultProps" @node-click="handleNodeClick"></el-tree>                
                </div>
            </el-col>
            <el-col :span="20">
                <div style="width: 80%;margin:auto;">
                    <div class="datalist">
                        <el-form :inline="true" :model="listform" class="listseach" @submit.native.prevent>
                            <el-form-item>
                                <span>ID：</span> <el-input v-model="listform.id" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span>用户名：</span> <el-input v-model="listform.username" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span>部门：</span> <el-input v-model="listform.username" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" native-type="submit" @click="search" icon="el-icon-search">搜索</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table :data="listData" border  >
                            <el-table-column type="index" width="100" label="序号"></el-table-column>      
                            <el-table-column width="200" label="头像"></el-table-column>      
                            <el-table-column label="用户名" prop="workerName" sortable width="200" >
                                <template slot-scope="scope">
                                    <el-tooltip effect="light" placement="right-start">
                                        <div @mouseenter="mousehover(scope.row.workerid)">{{scope.row.workerName}}</div>
                                        <div slot="content" style="width:200px;"> 
                                            <div class="infoperosn">
                                                <div class="iteminfo">
                                                    <p>姓名：</p>
                                                    <p>{{userinfo.workerName}}</p>
                                                </div>
                                                <div class="iteminfo">
                                                    <p>联系方式：</p>
                                                    <p>{{userinfo.cellPhone}}</p>
                                                </div>
                                                <div class="iteminfo">
                                                    <p>民族：</p>
                                                    <p>{{userinfo.nation}} 族</p>
                                                </div>
                                                <div class="iteminfo">
                                                    <p>联系方式：</p>
                                                    <p>{{userinfo.gender==0 ? '男':'女'}}</p>
                                                </div>
                                                <div class="iteminfo">
                                                    <p>住址：</p>
                                                    <p>{{userinfo.address}}</p>
                                                </div>
                                                <div class="iteminfo">
                                                    <p>工种类型：</p>
                                                    <p>{{userinfo.workType}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column label="电话" prop="cellPhone"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import * as dictapi from '@/api/dictapi.js'
import top from '@/components/common/HeadTop'
export default {
    data(){
        return{
            listform:{
                id:'',
                username:'',
            },
            listData:[],
            linkdata: [],
            defaultProps: {
                children: 'child',
                label: 'departmentName'
            },
            userinfo:{},
        }
    },
    components: {
        top
    },
    methods:{
        mousehover(id){
            console.log(id);
            this.$http.get('/api/user/user_select_id',{params:{workerId:id}} ).then(res=>{
                console.log(res);
                this.userinfo=res.data.user[0];
            })
        },
        search(){},
        addbuild(){},
        handleNodeClick(data){
            console.log(data.userlist);
                this.listData=data.userlist
        },
        getlinkperson(){
            this.$http.get(dictapi.linkperson).then(res=>{
                console.log(res);
                this.linkdata=res.data.date;
            })
        }
    },
    mounted(){
        this.getlinkperson();
    }
}
</script>

<style lang="scss">
.addresslist{
    width: 100%;
    .treeleft{
        height: calc(100vh - 120px);
        border: 1px solid #ccc;
        box-shadow: 1px 1px 15px #ccc;
        border-radius: 5px;
        padding: 20px 0;
    }
    .el-tree-node__expand-icon{
        font-size: 20px;
    }
}
</style>
<style>
.infoperosn{
    width: 200px;
    height: auto;
    /* border: 1px solid #ccc; */
    /* border-radius: 5px; */
}
.infoperosn .iteminfo{
    width: 100%;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: flex-start;
}
.infoperosn .iteminfo p:nth-child(1){
    width: 40%;
    text-align: right;
}
.infoperosn .iteminfo p:nth-child(2){
    width: 55%;
    text-indent: 1em;
}
.infoperosn .el-tooltip__popper{
    padding: 0px;
}
.el-tooltip__popper.is-light{
    border: 1px solid #7E7E7F
}
</style>

