<template>
    <div>
        <el-button  type="primary" @click="getImg">图片</el-button>
        <img src="/apis/user/user-get-photo?id=53" alt="图片流" id="Imgflow" style="width:200px;height:200px;background:pink;">
         <!-- <img
            :src="'/apis/getphoto?id='+scope.row.user_photo"
            alt="图片流"
            id="Imgflow"
            style="width:200px;height:200px;background:pink;"
        > -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            ImgData:''
        }
    },
    methods:{
        getImg(){
            // console.log(111);
            // this.$http.post('/imgflow/imageflow?id=12&tzggid=3',{responseType: "arraybuffer"}).then(response=>{
            //     return 'data:image/png;base64,' + btoa(
            //         new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            //     );
            //     }).then(res=>{
            //         // this.ImgData = data;
            //         $('#qrCode').attr('src', data);
            //     }).catch(err=>{
            // })
            // this.$http.post('/api/getphoto?id=51').then(response=>{
            //     console.log(response.data);
            //     // this.ImgData=response.data
            // })
            // this.$http.post('/imgflow/imageflow?id=12&tzggid=3').then(response=>{
            //     console.log(response.data);
            //     this.ImgData=response.data
            // })
        }
    },
}
</script>

<style>

</style>
