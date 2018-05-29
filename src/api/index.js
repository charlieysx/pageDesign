import axios from 'axios'
import Qs from 'qs'
import store from 'STORE/index'

import {
  // getAccessToken
  removeAccessToken
  // cachedUserInfo
} from 'API/cacheService'

import {
  SET_LOGIN_STATUS,
  SET_LOGIN_MASK_STATUS,
  SHOW_TOKEN_ERROR
} from 'STORE/mutation-types'

const API_ROOT = 'http://api.xsxia.com/'

axios.defaults.baseURL = API_ROOT
axios.defaults.headers.Accept = 'application/json'
axios.defaults.withCredentials = true

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (response.data.code < 0) {
    if (response.data.code === -2) {
      // 清空登录信息;
      removeAccessToken()
      // cachedUserInfo.delete()
      store.commit(SET_LOGIN_STATUS, false)
      // 弹出提示信息
      store.commit(SHOW_TOKEN_ERROR, true)
      // 弹出登录窗口
      store.commit(SET_LOGIN_MASK_STATUS, { show: true, view: 'login' })
    }
    return Promise.reject(response)
  }
  return response
}, function () {
  let error = {
    data: {
      msg: '请求出错'
    }
  }
  return Promise.reject(error)
})

export default {
  /**
   * 用户登录
   */
  login (params) {
    return axios.post('admin/login', Qs.stringify(params))
  },
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
    return axios.post('api/getUpToken')
  },
  uploadToQiniu (params) {
    return axios.post('http://up-z2.qiniu.com', params, {
      headers: {
        'content-type': 'multipart/form-data'
      },
      withCredentials: false
    })
  },
  createDesignTemplate (params) {
    return axios.post('admin/template/create', Qs.stringify(params))
  }
}
