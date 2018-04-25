import Vue from 'vue'
import Vuex from 'vuex'

import pageDesign from './modules/pageDesign'
import user from './modules/user'

Vue.use(Vuex)

const modules = { pageDesign, user }

const store = new Vuex.Store({
  modules
})

export default store
