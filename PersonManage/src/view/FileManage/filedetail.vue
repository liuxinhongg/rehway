/*********************************************
 * @Author: 刘新红 
 * @function: 文件管理---文件详情
 * @Date: 2019-03-19 14:59:13 
 *********************************************/
<template>
    <div>
       <div class="topshow">
           <p class="avatar">
               <img src="../../assets/images/userImg.jpg" alt="">
           </p>
           <p class="name">sh.exe.stackdump</p>
           <p>
               <el-button type="primary">下载</el-button>
           </p>
       </div>
        <el-table :data="tableData" class="onerow" :row-class-name="tableRowClassName">
            <el-table-column prop="type" label="文件类型" ></el-table-column>
            <el-table-column prop="size" label="文件大小"></el-table-column>
            <el-table-column prop="creator" label="创建人"></el-table-column>
            <el-table-column prop="sharetime" label="分享时间"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[
                {type:'stackdump',size:'716B',creator:'妖精仙女',sharetime:'2019-3-19 12:15:19'}
            ]
        }
    },
    methods:{
        tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    }
}
</script>

<style lang="scss">
.topshow{
    width: 200px;
    height: 180px;
    // border: 1px solid #ccc;
    margin: 30px auto;
    text-align: center;
    .avatar{
        width: 80px;
        height: 80px;
        margin: auto;
        img{
            width: 80px;
            height: 80px;
            border-radius: 5px;
            
        }
    }
    .name{
        line-height: 40px;
        font-size: 14px;
        color: #333;
    }
}
.onerow{
    width: 80%;
    margin: auto;
}
</style>
