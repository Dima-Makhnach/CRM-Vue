import * as fb from '../firebaseconfig'

const record = {
  namespaced: true,
  mutations: {},
  actions: {
    async getRecords ({ dispatch }) {
      try {
        const uid = await dispatch('_getUserId', null, { root: true })

        return fb.db.ref(`users/${uid}/records`).once('value')
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async addRecord ({ dispatch }, data) {
      try {
        const uid = await dispatch('_getUserId', null, { root: true })
        const autoGenKeyRef = await fb.db.ref(`users/${uid}/records`).push()

        return autoGenKeyRef.set({ ...data, date: new Date().getTime() })
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  }
}

export default record
