import Vue from 'vue'
import Vuex from 'vuex'

import pageDesign from './modules/pageDesign'
import user from './modules/user'
import common from './modules/common'
import designTemplate from './modules/designTemplate'

Vue.use(Vuex)

const modules = { pageDesign, user, common, designTemplate }

const store = new Vuex.Store({
  modules
})

export default store
