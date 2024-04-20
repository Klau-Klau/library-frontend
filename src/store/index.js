import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = createStore({
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    updateUserNotifications (state, wantsNotifications) {
      if (state.user) {
        state.user.wants_notifications = wantsNotifications
      }
    }
  },
  actions: {
    login ({ commit }, user) {
      commit('setUser', user)
    },
    logout ({ commit }) {
      commit('setUser', null)
    },
    setUserNotifications ({ commit }, wantsNotifications) {
      commit('updateUserNotifications', wantsNotifications)
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
