import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  // 全局状态
  state: {
    token: '',
    username: 0,
  },
  // 相当于dao层只用来跟数据打交道
  mutations: {
    // 存储用户token
    setToken(state, n) {
      state.token = n
    },
    // 存储用户的usename
    setUser(state, n) {
      state.username = n
    },
  },
  // 处理业务逻辑的操作 相当于service层
  actions: {
    setToken(context, obj){
      context.commit('setToken',obj)
    },
    setUser(context, obj){
      context.commit('setUser',obj)
    },
 
  }
})

export default store;