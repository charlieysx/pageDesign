import axios from 'axios'

const API_ROOT = ''

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
}
