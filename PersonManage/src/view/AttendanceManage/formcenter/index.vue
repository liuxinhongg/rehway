<template>
    <div class="formcenter">
        <el-form :inline="true" :model="formcenter" >
            <el-form-item>
              <span>报表名称：</span><el-input v-model="formcenter.formname" style="width:180px;"></el-input>
            </el-form-item>
            <el-form-item>
               <span>类型：</span> <el-input v-model="formcenter.formname" style="width:180px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button @click="newform" type="success">+新建</el-button>
                <el-button>导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="formData" style="width: 100%" border>
            <el-table-column type="index" width="120" label="序号"></el-table-column>  
            <el-table-column prop="name" label="名称" sortable>
                <template slot-scope="scope">
                    <el-tooltip trigger="hover" placement="top">
                        <div slot="content">{{ scope.row.name }}</div>
                        <div class="boxInput">{{ scope.row.name }}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="150" sortable></el-table-column>
            <!-- <el-table-column label="排序" width="150">
                <template slot-scope="scope">
                    {{scope.row.sort == 1 ? '升序' : '倒序'}}
                </template>
            </el-table-column> -->
            <el-table-column prop="remark" label="备注" >
                <template slot-scope="scope">
                    <el-tooltip trigger="hover" placement="top">
                        <div slot="content">{{ scope.row.remark }}</div>
                        <div class="boxInput">{{ scope.row.remark }}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="warning" size="mini" @click="edithandle(scope.row.id)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deletehandle(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formcenter:{
                formname:'',
            },
            formData:[
                {
                    code:'mostActiveProcess',
                    name:'最活跃流程陕西睿合易股科技有限公司技术部',
                    type:'pie',
                    sort:'1',
                    theme:'关于oa系统的操作完成计划',
                    remark:'这次的报表中有很多的漏洞，经过查找后，现在以完善，请查收',
                    id:12
                },
                {
                    code:'mostActiveProcess',
                    name:'最活跃流程陕西睿合易股科技有限公司技术部',
                    type:'pie',
                    sort:'0',
                    theme:'关于oa系统的操作完成计划',
                    remark:'这次的报表中有很多的漏洞，经过查找后，现在以完善，请查收',
                    id:11
                },
                {
                    code:'mostActiveProcess',
                    name:'最活跃流程陕西睿合易股科技有限公司技术部',
                    type:'pie',
                    sort:'0',
                    theme:'关于oa系统的操作完成计划',
                    remark:'这次的报表中有很多的漏洞，经过查找后，现在以完善，请查收',
                    id:23
                },
            ]
        }
    },
    methods:{
        edithandle(id){},
        deletehandle(id){},
        newform(){
            this.$router.push({path:'/project/formaddedit?id=0'});
        }
    }
}
</script>

<style lang="scss">
.formcenter{
    width: 95%;
    margin: 20px auto;
    .boxInput{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
}
</style>
