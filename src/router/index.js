import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from 'STORE/index'

import home from './modules/home'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import {
//   getAccessToken
// } from 'API/cacheService'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(VueRouter)

const routes = [
  ...home
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // if (to.meta.requireAuth) {
  //   if (!getAccessToken()) {
  //     if (from.name === null) {
  //       NProgress.start()
  //       next({ name: 'home' })
  //     } else {
  //       store.commit('SET_LOGIN_MASK_STATUS', { show: true, view: 'login' })
  //       next(false)
  //     }
  //   } else {
  //     NProgress.start()
  //     next()
  //   }
  // } else {
  //   NProgress.start()
  //   next() // 确保一定要调用 next()
  // }
  NProgress.start()
  next() // 确保一定要调用 next()
  // if (window.isMobile) {
  //   window.location.href = 'https://www.kdjz.com/m'
  //   return
  // }
  // if (to.name === 'protocol') {
  //   store.commit('SET_HEADER_SHOW', false)
  // }
  // if (getAccessToken() && cachedUserInfo.load() && cachedUserInfo.load().profileComplete === 0) {
  //   if (from.name === 'prefectInfo') {
  //     next(false)
  //   } else if (to.name !== 'prefectInfo') {
  //     NProgress.start()
  //     next({ name: 'prefectInfo' })
  //   } else {
  //     NProgress.start()
  //     next()
  //   }
  // } else if (to.matched.some(record => record.meta.requiresAuth)) {
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   if (!getAccessToken()) {
  //     if (from.name === null) {
  //       NProgress.start()
  //       next({ name: 'home' })
  //     } else {
  //       store.commit('SET_LOGIN_MASK_STATUS', { show: true, view: 'login' })
  //       next(false)
  //     }
  //   } else {
  //     NProgress.start()
  //     next()
  //   }
  // } else {
  //   NProgress.start()
  //   next() // 确保一定要调用 next()
  // }
})

router.afterEach((to, from) => {
  NProgress.done()
})
export default router
