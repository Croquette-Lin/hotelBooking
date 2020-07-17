// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css'
import store from './store/index'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import axios from 'axios'
// import axiosConfig from './api/axiosConfig.js'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueResource)

// Vue.http.options.root="http://localhost:8888"
Vue.http.options.emulateJSON = true;

router.beforeEach((to, from, next) => {
  // 要访问的页面需要认证的话
  const token = store.state.admintoken
  if (to.meta.requireAuth) {
    if (token) next()
    else {
      const token = window.localStorage.getItem('admintoken')
      if (token) {
        store.dispatch('setAdmin', window.localStorage.getItem('adminname'))
        store.dispatch('setToken', token)
        next()
      }
      else {
        next({
          path: '/login',
          // query: { redirect: to.fullPath }
        })
      }
    }
  } else if (to.path === '/login' && window.localStorage.getItem('adminname')) {
    next('/layout/home')
  }
  next()
})
export default router;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
