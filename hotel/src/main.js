// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import VueScrollLock from 'vue-scroll-lock'
import VueLazyload from 'vue-lazyload'
import loadingImg from './assets/img/loading.gif'
import store from './store/index'
import axiosConfig from './axios'

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueScrollLock)
Vue.use(Vuex)
Vue.use(VueLazyload, {
  error: "请求错误",
  loading: loadingImg
})

router.afterEach((to, from) => {
  window.scrollTo(0,0);
  let bodySrcollTop = document.body.scrollTop
  console.log(bodySrcollTop)
  if (bodySrcollTop !== 0) {
    document.body.scrollTop = 0
    return
  }
  let docSrcollTop = document.documentElement.scrollTop
  if (docSrcollTop !== 0) {
    document.documentElement.scrollTop = 0
  }
})

router.beforeEach((to, from, next) => {
  // 要访问的页面需要认证的话
  const token = store.state.token
  if (to.meta.requireAuth) {
    if (token) next()
    else {
      const token = window.localStorage.getItem('token')
      if (token) {
        store.dispatch('setUser', window.localStorage.getItem('username'))
        store.dispatch('setToken', token)
        next()
      }
      else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }
  } else if (to.path === '/login' && window.localStorage.getItem('username')) {
    next('/')
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
