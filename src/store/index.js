import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

const modules = { user }

const store = new Vuex.Store({
  modules
})

export default store
