import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import order from '@/views/order'
import person from '@/views/person'
import search from '@/components/search/search'
import hoteldetail from '@/components/hoteldetail/hoteldetail'
import login from '@/components/login/login'
import notLogin from '@/components/login/notLogin'
import isLogin from '@/components/login/isLogin'
import booking from '@/components/booking/booking'
import register from '@/components/register/register'
import router from '../main'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'home',
    meta: {
      title: '首页',
      scrollToTop: true
    }
  },
  {
    path: '/home',
    component: home,
    meta: {
      title: '首页',
      index: 0,
      scrollToTop: true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    meta: {
      title: '订单',
      index: 7,
      requireAuth: true
    }
  },
  {
    path: '/person',
    name: 'person',
    component: person,
    meta: {
      title: '个人中心',
      index: 6
    }
  },
  {
    path: '/search',
    name: 'search',
    component: search,
    meta: {
      title: '搜索',
      index: 1,
      scrollToTop: true
    }
  },
  {
    path: '/hoteldetail',
    name: 'hoteldetail',
    component: hoteldetail,
    meta: {
      title: '酒店详情',
      index: 2,
      scrollToTop: true
    }
  },
  {
    path: '/booking',
    name: 'booking',
    component: booking,
    meta: {
      title: '预订',
      index: 3,
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录',
      index: 4
    }
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {
      title: '注册',
      index: 5,
    }
  }
];


export default new Router({
  mode: 'history',
  linkActiveClass: 'ele-active',
  routes,
  scrollBehavior(to, from, saveTop) {
    if (saveTop) {
      return saveTop
    } else {
      return { x: 0, y: 0 }
    }
  }
})
