import Vue from 'vue'
import Vuex from 'vuex'

import pageDesign from './modules/pageDesign'
import user from './modules/user'
import common from './modules/common'

Vue.use(Vuex)

const modules = { pageDesign, user, common }

const store = new Vuex.Store({
  modules
})

export default store
