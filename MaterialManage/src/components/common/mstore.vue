<template>
    <div class="mstore">
        
        <div class="mstoreleft">
            <!-- 材料 -->
            <el-tree
                :data="mconfig"
                show-checkbox
                node-key="id"
                :check-strictly="true"
                @check-change="filterNode"
                :props="treeProps">
            </el-tree>
            <!-- 位置 -->
            <el-tree
                :data="localconfig"
                show-checkbox
                node-key="id"
                :check-strictly="true"
                @check-change="localgettree"
                :props="treeloc">
            </el-tree>
        </div>
        <div class="mstoreright">
            <el-form class="topform"  @submit.native.prevent :inline="true">
                <el-form-item label="选取物名称：" style="margin-bottom:0px;">
                    <el-input v-model="searchtop"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" native-type="submit" @click="sousuo">查询</el-button>
                </el-form-item>
            </el-form>
            <p class="choosed">已选择数据</p>
            <ul style="padding: 10px 15px 0px 15px;" v-if="mdata.length>0">
                <!-- 材料 -->
                <li  v-for='(item,index) in mdata' :key="index" style="height:30px;">
                    <i class="el-icon-menu"></i> <span style="margin:0 5px;"> {{item.mname}} </span>
                </li>
            </ul>
            <ul style="padding: 0 15px 10px 15px" v-if="localdata.length>0">
                <!-- 仓库位置 -->
                <li v-for='(item,index) in localdata' :key="index" style="height:40px;">
                    <i class="el-icon-menu"></i> <span style="margin:0 5px;"> {{item.repoloc}} </span>
                </li>
            </ul>
            <div class="bottombtn" v-if='this.localdata.length>0 || this.mdata.length>0'>
                <el-button type="primary" @click="suredata">确定</el-button>
                <el-button >取消</el-button>
            </div>
            <input type="text" v-model="inputName">
            <!-- <input type="hidden" :value="inputName" class="inputname"> -->
        
        </div>
    </div>
</template>

<script>
import * as material from '@/api/material.js'
export default {
    // props:[
    //     'totaldata'
    // ],
    props: {
          inputName: Array,
          required: true
        },
    data(){
        return{
            detail:[],
            // inputName:[],
            // childsta:false,
            searchtop:'',
             mconfig: [{  mname: '材料',disabled: true, children: [] }],
            localconfig:[ { repoloc:'仓库位置',disabled: true, child:[] }],
            //材料
            treeProps:{
                children: 'children',
                label: 'mname',
            },
            mobj:{},

            //仓库位置
            treeloc:{
                children:'child',
                label:'repoloc'
            },
            locobj:{},

            // 右边的数据
            mdata:[],
            localdata:[],
        }
    },
    methods:{
        //右边搜索
        sousuo(){
            let storedata={};
            // console.log(this.searchtop);            
            for(let i in this.mdata){
                    // console.log(this.mdata[i].mname);                
                if(this.searchtop==this.mdata[i].mname){
                    storedata=this.mdata[i];
                    this.mdata.push(storedata);
                    // console.log(this.mdata)
                    this.localdata=[];
                }
            }
        },
        //材料配置
        filterNode(val, checked, nodechoose){
            // console.log(nodechoose);
            if(checked){
                this.mobj=val;
                this.mdata.push(this.mobj);
                // console.log(this.mdata);
            }else{
                for(let item in this.mdata){
                    if(val.mname==this.mdata[item].mname){
                        this.mdata.splice(item,1);
                        // console.log(this.mdata);
                    }
                }
            }
        },
        //仓库位置
        localgettree(type,checked,indeterminate){
            // console.log(checked);
            if(checked){
                this.locobj=type;
                this.localdata.push(this.locobj);
                // console.log(this.localdata)
            }else{
                // console.log(type);
                for(let item in this.localdata){
                    if(type.repoloc==this.localdata[item].repoloc){
                        this.localdata.splice(item,1);
                        // console.log(this.localdata);
                    }
                }
            }
        },
        suredata(){
            
            let totaldata=[];
            totaldata.push(this.localdata);
            totaldata.push(this.mdata);
            if(this.inputName==''){
                this.$emit('childByValue',totaldata);
            }else if(this.inputName.length==2){
                // console.log(this.inputName.length);
                // console.log(this.inputName);
                let detail=[];
                detail.push(this.inputName);
                detail.push(totaldata);
                // console.log(detail);
                this.$emit('childByValue',detail);
            }else{
                let ddd=[]
                for(let i in this.inputName){
                    ddd.push(this.inputName[i])
                }
                    ddd.push(totaldata);
                    // console.log(ddd)
                    this.$emit('childByValue',ddd);
            }
        },
        //材料配置
        materconfig(){
            this.$http.get(material.mmaterials).then(res=>{
                // console.log(res);
                this.mconfig[0].children=res.data.list;
            })
        },
        //仓库位置
        modellocaton(){
            this.$http.get(material.mrepo).then(res=>{
                // console.log(res);
                this.localconfig[0].child=res.data.list;
            })
        }
    },
    mounted(){
        this.materconfig();
        this.modellocaton();
    }
}
</script>

<style lang="scss">
.mstore{
    width: 90%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .mstoreleft{
        width: 49%;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 10px 15px;
    }
    .mstoreright{
        width: 49%;
        border: 1px solid #ccc;
        border-radius: 3px;
        .topform{
            padding: 0 15px;
            margin-top: 15px;
        }
        .choosed{
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            font-weight: bold;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
        }
        .bottombtn{
            width: 100%;
            height: 40px;
            text-align: center;
            margin-bottom: 20px;
        }
    }
}
</style>
