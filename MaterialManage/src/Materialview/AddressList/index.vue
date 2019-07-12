<template>
    <div class="addresslist">
        <el-form :inline="true" :model="listform" class="listseach" @submit.native.prevent>
            <el-form-item label="ID：">
                <el-input v-model="listform.id" ></el-input>
            </el-form-item>
            <el-form-item label="用户名：">
                <el-input v-model="listform.username" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" @click="search" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item style="float:right;">
                <el-button @click="addbuild">+新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="listData" border style="width: 100%" >
            <el-table-column label="Id" prop="id"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="照片" prop="photo"></el-table-column>
            <el-table-column label="属性" prop="nature"></el-table-column>
            <el-table-column label="真实名字" prop="realname"></el-table-column>
            <el-table-column label="缩写" prop="ab"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            listform:{
                id:'',
                username:'',
            },
            listData:[],
        }
    },
    methods:{
        search(){},
        addbuild(){},
    }
}
</script>

<style lang="scss">
.addresslist{
    width: 95%;
    margin: 20px auto;
}
</style>
