import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import state from './state.js'
import actions from './actions.js'
import mutations from './mutations.js'

import app from './modules/app'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings
  },
  getters,
  mutations,
  actions,
  state
})

export default store
