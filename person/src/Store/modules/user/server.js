// 登录时，将用户信息存入sessionStorage里面
let initData = JSON.parse(sessionStorage.getItem('userRole'))
const status={
    userRole:initData | {}
}
const getter={
    userRole: (state) => { return state.userRole },
}
const action={
    // 登录时所带的登录参数
    login({ commit, state, dispatch }, data) {
        commit('changeLoginStatu', data);
    },
    // 当页面登录时候回去用户的信息
    getCarList({ commit, state, dispatch }, params) {
        get(`/api/cart/list`, params).then(res => {
            if (res.success) {
                commit('setCarList', res.data.cats);
            }
        })
    },
}
const mutations={
    changeLoginStatu(state, data) {
        state.userRole = data;
        let info = JSON.stringify(state.userRole)
        sessionStorage.setItem('userRole', info);
    },
    setCarList(state, result) {
        state.carList = result;
    },
}
export default {
    status,
    getter,
    action,
    mutations
}
