<template>
  <div>
    <div class="detail-body">
        <div class="topImg">
            <img src="@/assets/images/endover.png">
        </div>
        <div class="panel panel-default">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>负责人</th>
                        <th>状态</th>
                        <th>意见</th>
                    </tr>
                </thead>
                <tbody v-for="(item,index) in detailData" :key="index">
                    <tr>
                        <td>{{item.name}}</td>
                        <td>{{item.createTime}}</td>
                        <td>{{item.endTime}}</td>
                        <td>{{item.assignee}}<b>(原执行人:{{item.owner}})</b></td>
                        <td>{{item.catalog== 1 ? "人工终止" : item.catalog== 2 ? "提交" : "跳过"}}</td>
                        <td>{{item.idea}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            detailData:[
                {
                    name:"填写请假单",
                    createTime:"2019-03-20 09:22:01",
                    endTime:"2019-03-20 09:22:01",
                    assignee:"临远",
                    owner:"金",
                    catalog:1,
                    idea:"试试事实上水库"
                },
                {
                    name:"填写请假单",
                    createTime:"2019-03-20 09:22:01",
                    endTime:"2019-03-20 09:22:01",
                    assignee:"临远",
                    owner:"金",
                    catalog:2,
                    idea:"完美告白，为爱转身"
                },
            ]
        }
    }
};
</script>

<style lang="scss">
.detail-body{
    width: 90%;
    margin: auto;
    .topImg{
        width: 35%;
        margin: auto;
        img{
            margin-bottom: 20px;
        }
    }
}

</style>
