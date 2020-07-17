import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login/login'
import layout from '@/page/layout'
import user from '@/page/user'
import hotel from '@/page/hotel'
import order from '@/page/order'
import home from '@/page/home'
import consum from '@/page/consum'
import hoteledit from '@/components/hotelmanage/hoteledit'
import hoteladd from '@/components/hotelmanage/hoteladd'
import orderwait from '@/components/ordermanage/orderwait'
import orderin from '@/components/ordermanage/orderin'
import orderdone from '@/components/ordermanage/orderdone'
import ordercancel from '@/components/ordermanage/ordercancel'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: login,
      requireAuth: true
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'user',
          name: 'user',
          component: user
        },
        {
          path: 'order',
          name: 'order',
          component: order
        },
        {
          path: 'hotel',
          name: 'hotel',
          component: hotel,
        },
        {
          path: 'hoteledit',
          name: 'hoteledit',
          component: hoteledit
        },
        {
          path: 'hoteladd',
          name: 'hoteladd',
          component: hoteladd
        },
        {
          path: 'orderwait',
          name: 'orderwait',
          component: orderwait
        },
        {
          path: 'orderin',
          name: 'orderin',
          component: orderin
        },
        {
          path: 'orderdone',
          name: 'orderdone',
          component: orderdone
        },
        {
          path: 'ordercancel',
          name: 'ordercancel',
          component: ordercancel
        },
        {
          path: 'consum',
          name: 'consum',
          component: consum
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }

  ]
})
