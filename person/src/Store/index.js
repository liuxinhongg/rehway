import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './modules/user/user_module'
import server from './modules/user/server'
export default new Vuex.Store({
    modules: {
        user,
        server
    },
});