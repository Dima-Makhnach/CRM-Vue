import * as fb from '../firebaseconfig'

const user = {
  state: {
    user: {}
  },
  namespaced: true,
  mutations: {
    setUser (state, data) {
      state.user = data
    },
    clearData (state) {
      state.user = {}
    }
  },
  actions: {
    getUser({ commit } )
    addUser ({ commit }, { id, name }) {
      return fb.db.ref(`users/${id}/info`).set({
        bill: 100000,
        image: 'https://imgholder.ru/40x40/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson',
        name
      })
    }
  }
}

export default user
