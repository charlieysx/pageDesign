import axios from 'axios'
// import Qs from 'qs'
// import store from 'STORE/index'

import {
  getAccessToken,
  removeAccessToken,
  cachedUserInfo
} from 'API/cacheService'

// import {
//   SET_LOGIN_STATUS,
//   SET_LOGIN_MASK_STATUS,
//   SHOW_TOKEN_ERROR
// } from 'STORE/mutation-types'

const API_ROOT = 'https://api.yijian.codebear.cn/index.php/'

axios.defaults.baseURL = API_ROOT
axios.defaults.headers.Accept = 'application/json'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers['accessToken'] = 'U2FsdGVkX1+WnwvVCyoBbsyu4oQixnr611fhc9/nCxM='
  if (getAccessToken()) {
    config.headers['accessToken'] = getAccessToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    // 清空登录信息;
    removeAccessToken()
    cachedUserInfo.delete()
    // store.commit(SET_LOGIN_STATUS, false)
    // // 弹出提示信息
    // store.commit(SHOW_TOKEN_ERROR, true)
    // // 弹出登录窗口
    // store.commit(SET_LOGIN_MASK_STATUS, { show: true, view: 'login' })
  }
  return Promise.reject(error)
})

export default {
  // /**
  //  * 用户登录
  //  */
  // login (params) {
  //   return axios.post('u/login', Qs.stringify(params))
  // },
  // /**
  // * 用户登录
  // */
  // register (params) {
  //   return axios.post('u/register', Qs.stringify(params))
  // },
  // /**
  //  * 获取按字母排序的城市
  //  */
  // getCitySort () {
  //   return axios.get('c/city/sort')
  // },
  // /**
  //  * 获取热门的城市
  //  */
  // getHotCity (count) {
  //   return axios.get('c/city/hot', {
  //     params: {
  //       count: count
  //     }
  //   })
  // }
  getQiniuToken () {
    return axios.get('a/qiniu/token')
  }
}
