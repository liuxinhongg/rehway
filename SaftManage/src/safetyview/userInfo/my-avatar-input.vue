<template>
    <div>
        <form id="userBaseForm" method="post" action="" class="avatar-from">
            <input id="userBase_id" type="hidden" name="id" value="">
            <div class="control-group">
                <label class="control-label" for="userBase_avatar">头像</label>
                <div class="controls">
                <div id="avatarImage">
                    <!-- <c:if test="${not empty userBase.avatar}"> -->
                    <!-- <img src="my-base-avatar.do" style="width:512px;"> -->
                    <!-- </c:if> -->
                    <img src="../../assets/images/userImg.jpg" style="width:150px;height:150px;margin-bottom:20px;"/>
                </div>
                <div id="avatarButton" class="btn btn-success fileinput-button">
                    <span>上传一个新图片</span>
                    <input type="file" name="avatar" class="fileupload"
                    data-no-uniform="true"
                    data-url="my-avatar-upload.do"
                    data-form-data='{"id":"${userBase.id}","imgId":"avatarImage","btnId":"avatarButton","viewUrl":"my-avatar-view.do"}'/>
                </div>
                <div id="progress" class="progress" style="width:200px;margin-top:5px;height:20px;margin-bottom:5px;">
                    <div class="progress-bar bar-success"></div>
                </div>
                </div>
            </div>
            <div class="control-group">
                <div class="controls">
                <button id="submitButton" class="surebtn">确认</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import * as security from '@/api/security.js'
import * as dictapi from '@/api/dictapi.js'
export default {
    data(){
        return{
             imageUrl: '',
        }
    },
    methods:{
        
    },
    mounted(){
        
    }
}
</script>

<style>
.surebtn{
    width: 70px;
    height: 40px;
    border-radius: 5px;
    background: #409EFF;
    color: #fff;
    outline: none;
}
</style>
