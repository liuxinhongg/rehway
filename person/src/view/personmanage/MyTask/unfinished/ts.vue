<template>
    <div>
        <div class="container">
            <section id="m-main" class="col-md-12" style="padding-top:65px;">
                <div class="alert alert-info" role="alert">
                    <button type="button" class="close" v-show="error" data-dismiss="alert" style="margin-right:30px;" @click="errorhide()">×</button>
                    <strong>草稿已保存</strong>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            error:true,
        }
    },
    methods:{
        errorhide(){
            this.error=false;
            this.$router.push({path:'/project/taskdealwidth'});
        }
    }
}
</script>

<style>

</style>
