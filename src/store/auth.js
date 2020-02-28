import * as fb from '../firebaseconfig'

const auth = {
  namespaced: true,
  actions: {
    login ({ commit, dispatch }, { email, password }) {
      return fb.auth.signInWithEmailAndPassword(email, password)
    },
    register ({ commit, dispatch }, { email, password }) {
      return fb.auth.createUserWithEmailAndPassword(email, password)
    },
    logout () {
      return fb.auth.signOut()
    }
  }
}

export default auth
