// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import BaiduMap from 'vue-baidu-map'
// import $ from 'jquery'
import jquery from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $qs from 'qs'
Vue.prototype.axios = axios
Vue.prototype.$qs = $qs
import "./assets/iconfont/iconfont.css"; 
// 编辑器
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 视频的实时播放
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
// websocket
// import * as socketApi from './api/websocket.js'
// Vue.prototype.socketApi = socketApi

//全局定义eventBus页面之间的传参
window.eventBus = new Vue();

Vue.use(VueQuillEditor)
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
