<template>
    <div class="companymanage">
        <el-button @click="addcompany" v-if="companyform==''" type="success">新增企业</el-button>
        <el-button @click="modity" v-if="companyform!=''">修改企业</el-button>
        <div class="oform" v-if="companyform!=''">
            <div class="topTable" style="text-align: right;font-weight:bold;">
                <p>企业名称：</p>
                <p>企业项目编码：</p>
                <p>企业注册区域编号： </p>                
            </div>
            <div class="topTable" style="margin-left:20px;">
                <p>{{companyform.corpName}}</p>
                <p>{{companyform.corpCode}}</p>
                <p>{{companyform.areaCode}}</p>                
            </div>
        </div>
        <empty v-else>
            <p slot="msg">
                企业没有数据,快去新增企业吧~
            </p>
        </empty>
    </div>
</template>

<script>
import empty from '@/components/common/empty'
export default {
    components:{
        empty
    },
    data(){ 
        return{
            addEdit:true,
            companyform:{},
            // companyform:[],
            tableData:[],
            // 分页
            currentPage:1,
            itemnum:10,
            count:1,
            editId:''
        }
    },
    methods:{
        // handleSizeChange(val) {
        //     console.log(`每页 ${val} 条`);
        // },
        // handleCurrentChange(val) {
        //     console.log(`当前页: ${val}`);
        // },
        addcompany(){
            this.$router.push({path:'/project/addcompany?id=1'});
        },
        modity(){
            this.$router.push({path:'/project/addcompany?id='+this.editId});
        },
        handleClick(){},
    },
    mounted(){
        this.$http.post('/api/ent/ent_select_list').then(res=>{
            console.log(res);
            this.companyform=res.data;
            this.editId=res.data.entId;
        })
    }
}
</script>

<style lang="scss">
.companymanage{
    width: 100%;
    margin: 20px auto;
    .alltable{
        width: 100%;
        height: calc(100vh - 280px);
        .boxInput{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
    .oform{
        width: 100%;
        margin:20px auto;
        display: flex;
        justify-content: flex-start;
        .topTable{
            width: 150px;
            height: 80px;
            line-height: 80px;
            
        }
    }
    .companyname{
        width: 90%;
        height: 200px;
        line-height: 200px;
        text-align: center;
        font-style: italic;
        font-size: 38px;

    }
}
</style>
<style >
    .companymanage .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>
