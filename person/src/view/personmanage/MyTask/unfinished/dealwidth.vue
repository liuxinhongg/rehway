<template>
    <div>
        <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" class="xf-table">
            <tbody>
                <tr>
                <td width="25%" class="xf-cell xf-cell-right xf-cell-bottom xf-cell-top xf-cell-left">
                    <label style="display:block;text-align:right;margin-bottom:0px;padding-top:10px;padding-bottom:10px;">上个环节：</label>
                </td>
                <td width="25%" class="xf-cell xf-cell-right xf-cell-bottom xf-cell-top" colspan="1" rowspan="1">
                    <div id="previousStep">印章申请</div>
                </td>
                <td width="25%" class="xf-cell xf-cell-right xf-cell-bottom xf-cell-top xf-cell-left">
                    <label style="display:block;text-align:right;margin-bottom:0px;padding-top:10px;padding-bottom:10px;">下个环节：</label>
                </td>
                <td width="25%" class="xf-cell xf-cell-right xf-cell-bottom xf-cell-top" colspan="1" rowspan="1">
                    <div id="nextStep">上级审批</div>
                </td>
                </tr>
            </tbody>
        </table>
        <el-form :model="dealwidthform" status-icon ref="dealwidthform" center :inline="true" label-width="100px" class="dealwidthForm ">
            <el-form-item label="日期：" prop="pass">
                <el-date-picker  v-model="dealwidthform.date"  type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="文件名称：" prop="fliename" style="width:320px">
                <el-input type="text" v-model="dealwidthform.fliename" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="文件分数：" prop="flienum"  style="width:320px">
                <el-input type="text" v-model="dealwidthform.flienum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="文件类别：" prop="flietype"  style="width:320px">
                <el-input type="text" v-model="dealwidthform.flietype" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="印章类型：" prop="sealtype" style="width:320px">
                <el-input type="text" v-model="dealwidthform.sealtype" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark" style="width:320px">
                <el-input  type="textarea" :rows="2" v-model="dealwidthform.remark" autocomplete="off" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item style="width:175px;margin-left:285px;">
                <el-button @click="saveForm('dealwidthform')">暂存</el-button>
                <el-button type="primary" @click="submitForm('dealwidthform')">提交</el-button>
            </el-form-item>
        </el-form>
        <table style="width:90%;margin:10px auto;" cellspacing="0" cellpadding="0" border="0" align="center" class="table table-border">
            <thead>
                <tr>
                <th>环节</th>
                <th>审批人</th>
                <th>时间</th>
                <th>结果</th>
                <th>意见</th>
                </tr>
            </thead>
            <tbody v-for="(item,index) in listdata" :key="index">
                <tr>
                    <td>{{item.tache}}</td>
                    <td>{{item.approver}}</td>
                    <td>{{item.listTime}}</td>
                    <td>{{item.result}}</td>
                    <td style="width:300px;">{{item.opinon}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
export default {
    data(){
        return{
            dealwidthform:{
                date:'',
                fliename:'',
                flienum:'',
                flietype:'',
                sealtype:'',
            },
            listdata:[
                {tache:"印章申请",approver:"林园",listTime:"2019-03-22",result:"批准",opinon:"情况属实，批准内容"},
                {tache:"上级审批",approver:"林园原",listTime:"2019-03-20",result:"人工终结",opinon:" "},
            ]
        }
        
    },
    methods:{
        saveForm(){
            this.$router.push({path:'/project/ts'});
        },
        submitForm(){
            this.$router.push({path:'/project/unfinished'})
        }
    }
}
</script>

<style lang="scss">
.dealwidthForm{
    width: 43%;
    margin: 20px auto;
}
</style>
