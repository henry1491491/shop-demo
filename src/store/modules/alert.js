export default {
  namespaced: true,
  state: {
    messages: []
  },
  mutations: {
    SET_MESSAGES_ALERT (state, item) {
      state.messages.push(item)
    },
    DELETE_MESSAGES_ALERT (state, item) {
      state.messages.forEach((el, i) => {
        if (el.id === item.id) {
          state.messages.splice(i, 1)
        }
      })
    }
  },
  actions: {
    async setMsgsAlert ({ commit, dispatch }, item) {
      commit('SET_MESSAGES_ALERT', item)
      dispatch('delMsgsAlert', item)
      return { status: true }
    },
    async delMsgsAlert ({ commit }, item) {
      let duration
      if (!item.duration) {
        duration = 3000
      } else {
        duration = item.duration
      }
      window.setTimeout(() => {
        commit('DELETE_MESSAGES_ALERT', item)
      }, duration)
    }
  }
}
