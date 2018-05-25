import api from 'API/index'

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  getQiniuToken (store, bucket) {
    return api.getQiniuToken(bucket)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
