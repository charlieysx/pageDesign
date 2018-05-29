import api from 'API/index'

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  createDesignTemplate (store, data) {
    return api.createDesignTemplate(data)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch((error) => {
        if (!error.data || !error.data.msg) {
          error = {
            data: {
              msg: '请求出错'
            }
          }
        }
        return Promise.reject(error.data)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
