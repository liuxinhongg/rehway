// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import BaiduMap from 'vue-baidu-map'
import jquery from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "./assets/iconfont/iconfont.css"; 
// echarts
// import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 编辑器
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 视频的实时播放
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(VueQuillEditor)
Vue.use(Vuex);
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.use(VueAxios, axios);
Vue.use(BaiduMap, {
  ak: 'DlDGuFzhYXsEbn2BNL4gKedzolz5rbGB'
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
