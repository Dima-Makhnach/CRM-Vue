import * as fb from '../firebaseconfig'
import firebase from 'firebase'

const user = {
  namespaced: true,
  actions: {
    async getUser ({ dispatch }) {
      try {
        const id = await dispatch('_getUserId', null, { root: true })

        return fb.db.ref(`users/${id}/info`).once('value')
      } catch (e) {
        console.log(`Error in fetch user UID [actions/user/getUser]: ${e}`)
      }
    },
    addUser ({ commit }, { id, name, email }) {
      return fb.db.ref(`users/${id}/info`).set({
        bill: 100000,
        image: 'https://imgholder.ru/40x40/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson',
        name,
        email
      })
    },
    async updateUser ({ commit, dispatch }, { password, ...rest }) {
      try {
        const id = await dispatch('_getUserId', null, { root: true })
        await firebase.auth().currentUser.updatePassword(password)

        return fb.db.ref(`users/${id}/info`).update({ ...rest })
      } catch (e) {
        console.log(`Error in fetch user UID [actions/user/getUser]: ${e}`)
      }
    }
  }
}

export default user
