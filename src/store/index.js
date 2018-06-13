import Vue from 'vue'
import Vuex from 'vuex'

import pageDesign from './modules/pageDesign'

Vue.use(Vuex)

const modules = { pageDesign }

const store = new Vuex.Store({
  modules
})

export default store
