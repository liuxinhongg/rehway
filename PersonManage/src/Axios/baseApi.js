import axios from 'axios';
import {Message} from 'element-ui';

// axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://192.168.1.103:9080';
// import router from "../router";


// //http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('token')
//         config.data = JSON.stringify(config.data);
//         config.headers = {
//             'Content-Type': 'application/json; charset=utf-8'
//         }
//         config.headers.token = token
//         return config;
//     },
//     error => {
//         return Promise.reject(err);
//     }
// );


//http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 返回 401 清除token信息并跳转到登录页面
//                     localStorage.removeItem('isLogin');
//                     localStorage.removeItem('userInfo');
//                     localStorage.removeItem('hx_name');
//                     localStorage.removeItem('hx_pwd');
//                     localStorage.removeItem('token')
//                     if (router.currentRoute.fullPath.indexOf('login') === -1) {
//                         Message({
//                             showClose: true,
//                             message: '您的登录状态已过期，请重新登录',
//                             type: 'warning'
//                         });
//                         router.replace({
//                             path: '/login',
//                             query: {redirect: router.currentRoute.fullPath}
//                         })
//                     }
//             }
//         }
//         return Promise.reject(error)
//     }
// )


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
