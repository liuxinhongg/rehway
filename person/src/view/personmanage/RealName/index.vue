<template>
    <div class="realname">
        <!-- 搜索 -->
        <el-form :inline="true" :model="trainform" class="demo-form-inline" label-width="140px">
            <el-form-item>
                <el-button @click="addtrain">上传实名制</el-button>
            </el-form-item>
            <el-form-item>
                <el-button>上传历史</el-button>
            </el-form-item>
        </el-form>
        <!-- 列表显示信息 -->
        <div class="alltable">
            <el-scrollbar style="height:100%;">
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            trainform:{
                projectCode:'',
                trainingDate:'',
                trainingTypeCode:'',
                trainingDuration:'',
                trainingName:'',
                trainer:'',
            },
            trainType:[
                {label:'安全教育',type:'one'},
                {label:'入场教育',type:'two'},
                {label:'退场教育',type:'three'},
                {label:'技能培训',type:'four'},
            ],
            trainData:[
                {
                    projectCode:'1231241241212',
                    realname:'谢莹',
                    skill:'钳工',
                    worktype:'操作工',
                    worklicense:'材料员',
                    jobnum:'CSA1565',
                    unit:"陕西睿合易股科技",
                    teamzu:'水利组'
                },
                {
                    projectCode:'1231241241212',
                    realname:'谢莹',
                    skill:'钳工',
                    worktype:'操作工',
                    worklicense:'材料员',
                    jobnum:'CSA1565',
                    unit:"陕西睿合易股科技",
                    teamzu:'水利组'
                },
            ],
            // 分页
            currentPage:1,
            itemnum:10,
            count:1,
        }
    },
    methods:{
        addtrain(){
            this.$router.push({path:'/project/uploadname'});
        }
    },
    mounted(){
        this.$http.post('/api/dict/work_type').then(res=>{
            console.log(res);
        })
    }
}
</script>

<style lang="scss">
.realname{
    width: 95%;
    margin: 20px auto;
    .alltable{
        width: 100%;
        height: calc(100vh - 235px);
        .boxInput{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
<style>
.projectTrain .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>

