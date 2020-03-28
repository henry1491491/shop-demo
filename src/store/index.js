import Vue from "vue"
import Vuex from "vuex"
import alertModules from "./modules/alert"
import customerModules from "./modules/customer"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    loadingAmount: 0,
    messages: []
  },
  getters: {
    isLoading: state => {
      if (state.loadingAmount > 0) {
        return true
      } else {
        return false
      }
    }
  },
  mutations: {
    SET_LOADING: (state, isLoading) => {
      isLoading ? ++state.loadingAmount : --state.loadingAmount
    }
  },
  actions: {
    setLoading({ commit }, isLoading) {
      commit("SET_LOADING", isLoading)
    }
  },
  modules: {
    customer: customerModules,
    alert: alertModules
  }
})
