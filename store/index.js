import auth from "./modules/auth.module"


const state = () => ({
  locale: 'en',
  notifications: []

})
const mutations = {
  CHANGE_LANGUAGE(state, locale)
  {
      state.locale = locale
  },

  PUSH_NOTIFICATION(state, notification) {
      state.notifications.push({
          ...notification,
          id: (Math.random().toString() + Date.now().toString(36)).substring(2),
      })
  },

  REMOVE_NOTIFICATION(state, notification) {
      state.notifications = state.notifications.filter(x => x.id !== notification.id)
  },
}
const actions = {
  changeLanguage({ commit }, locale)
  {
      commit('CHANGE_LANGUAGE', locale)
  },
  pushNotification({ commit }, { message, type }) {
      commit('PUSH_NOTIFICATION', { message, type })
  },

  removeNotification({ commit }, notification) {
      commit('REMOVE_NOTIFICATION', notification)
  },
}
const getters = {}


export default {
  state,
  mutations,
  getters,
  actions,
  modules: {
    auth
  },
}
