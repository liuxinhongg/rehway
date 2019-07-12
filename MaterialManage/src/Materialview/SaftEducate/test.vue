<template>
    <div>
         <video 
            v-show="!haserror"
            class="video-player" 
            autoplay="autoplay" 
            :src="videoURL" 
            controls="controls" 
            ref="video"
            :poster="vodeoImg"
            @timeupdate="onPlayerTimeupdate($event)"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            @statechanged="playerStateChanged($event)"
            @canplay="onPlayerCanplay($event)"
            @error="onError($event)"      
            />
        <div class="video-control">
            <a name="pause" @click="play">
                <img v-if="playState === 'play'" src="../../assets/images/xj.svg"/>
                <img v-else-if="playState === 'pause'" src="../../assets/images/xj.svg"/>
                <img v-else-if="playState === 'replay'" src="../../assets/images/xj.svg"/>
            </a>
            <span class="progress" name="progress">
                <Slider v-model="percentage"  @on-change="progressChange"></Slider>
                <label class="play-time">{{currentPos}}</label>
                <label class="video-time">{{maxduration}}</label>
            </span>
            <a class="fullscreen" @click="fullScreen">
                <img v-if="screenState === 'nofull'" src="../../assets/images/xj.svg"/>
                <img v-else  src="../../assets/images/xj.svg"/>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    methods:{
        play(){
            if(this.playState === 'play' || this.playState === 'replay'){
                this.$refs.video.play();
                this.startTimeBar();
                }else{
                this.$refs.video.pause();
                this.stopTimeBar();
                }
        },
        setVolume(){
            if(this.volumeState === 'volume'){
                this.volumeState='muted';  
                this.$refs.video.muted=true;   //静音         
            }else{ 
                this.volumeState = 'volume'; 
                this.$refs.video.muted=false; //打开声音
            }
        },
        fullScreen(){                               
            this.$refs.video.webkitRequestFullScreen();
        },
        onError(e){
            this.haserror=false;
            if(this.videoURL != ''){
                this.playState='replay';
                this.haserror=true;
            }
        },
        onPlayerEnded(event){
            this.stopTimeBar();
            this.percentage=100;
            this.playState='replay';
        },
        onPlayerPlay(event){
            this.haserror=false;
            this.videoEvent=event;
            this.playState = 'pause';
            this.videoEvent.srcElement.volume=0.36;
        },
        onPlayerPause(event){
            this.playState='play';
        },
        onPlayerCanplay(event){
            this.haserror=false;
        },
        onPlayerTimeupdate(event){
            this.maxduration=this.secondToDate(event.srcElement.duration);
            this.currentPos=this.secondToDate(event.srcElement.currentTime);
        }
    }
}
</script>

<style lang="scss">
 .volume-control{
        position: absolute;
        bottom: 15px;
        right: 50px;
        z-index: 4;
        height: 150px;
        width: 20px;
        .volume-slider{
            width: 20px;
            height: 130px;
            position: absolute;
            .vue-slider-component{
                padding: 4px 0 !important; 
                .vue-slider{
                    border-radius: 0 !important; 
                    background-color: #979797 !important;
                    margin-left: 8px;
                    .vue-slider-dot{
                        border-radius: 0 !important; 
                        width: 9px !important;
                        height: 3px !important;
                        left: -3px !important;
                        bottom: 7px !important;
                        .vue-slider-tooltip{
                            font-size: 12px !important;
                            padding: 0 !important;
                            min-width: 20px !important;
                            border: 1px solid #d0a807 !important;
                            background-color: #fece09 !important;
                        }
                    }
                    .vue-slider-process{
                        background-color: #fece09  !important;
                    }
                }
            }
        }
        .volume{
            width: 100%;
            height: 20px;
            cursor: pointer;
            position: absolute;
            bottom: 0;
            right: 0;
            img{
                width: 20px;
            }
        }
    }
    .video-control{
        width:100%;
        position:absolute;
        top: 289px;
        z-index: 3;
        background-color:rgba(0, 0, 0, 0.6);
        height: 50px;
        line-height: 50px;
        a:nth-child(1){
            position: relative;
            float: left;
            img{
                width: 27px;
                margin-left: 14px;
            }
        }
        .progress{
            display: block;
            height: 20px;
            position: absolute;
            left: 57px;
            right: 93px;
            top: 20px;
            .ivu-slider{
                position: absolute !important;
                width: 100%;
                .ivu-slider-wrap{
                    margin: 0 !important;
                    background-color: #979797 !important;
                    border-radius: 0 !important;
                    .ivu-slider-bar{
                        border-radius: 0  !important;
                        background-color: #fece09  !important;
                    } 
                    .ivu-slider-button-wrap{
                        display: none;
                    }
                }
            }
            .play-time{
                position: absolute;
                left: 0;
                width: 0;
                color: #fff;
                margin-top: -10px;
            }
            .video-time{
                height: 0;
                width: 0px;
                position: absolute;
                right: 0;
                margin-right: 33px;
                color: #fff;
                margin-top: -10px;
            }
        }
        .fullscreen{
            float: right;
            width: 17px;
            height: 17px;
            margin-right: 17px;
            margin-top: 17px;
            img{
                display: block;
                width: 17px;
            }
        }
    }
    .trump-control-bottom,.trump-control-bottom-flow{display:none;}
    .vertical-center-modal{
        .ivu-modal{
            width: 600px !important;
            height: 339px;
            top:30% !important;
            .ivu-modal-content{
                background-color: rgba(255, 255, 255, 0) !important;
                .ivu-modal-body{
                    width: 600px !important;
                    height: 339px !important;
                    position: relative !important;
                    background-color: rgba(255, 255, 255, 0) !important;
                    padding:  0 !important;
                    .video-player{
                        width: 600px;
                        height: 339px;
                        position: absolute;
                        z-index: 2;
                    }
                    .close-player{
                        width: 32px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        margin-right: -40px;
                        margin-top: -35px;
                        cursor: pointer;
                    }
                }
                .ivu-modal-footer{
                    display: none;
                }
            }
        }
    } 
</style>
