import * as fb from '../firebaseconfig'
import arrFromObj from '../utils/arrFromObj'

const category = {
  state: {
    categories: [],
    loading: true,
    error: null
  },
  mutations: {
    addCategories (state, data) {
      state.categories = data
    },
    addCategory (state, item) {
      state.categories.push(item)
    },
    toggleLoading (state, flag) {
      state.loading = flag
    },
    addError (state, err) {
      state.error = err
    },
    changeCategory (state, data) {
      state.categories.map(category => {
        if (category.id === data.id) {
          category.name = data.name
          category.limit = data.limit
        }
      })
    },
    clearData (state) {
      state.categories = []
      state.error = null
    }
  },
  namespaced: true,
  actions: {
    async getCategories ({ commit, dispatch }) {
      try {
        const id = await dispatch('_getUserId', null, { root: true })

        fb.db.ref(`users/${id}/categories`).once('value')
          .then(res => {
            if (res.val()) {
              commit('addCategories', arrFromObj(res.val()))
            }
            commit('toggleLoading', false)
          })
          .catch(err => {
            commit('addError', err)
            commit('toggleLoading', false)
          })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async addCategory ({ commit, dispatch }, data) {
      try {
        const id = await dispatch('_getUserId', null, { root: true })
        const autoGenKey = fb.db.ref(`users/${id}/categories`).push()

        return new Promise((resolve, reject) => {
          autoGenKey.set({ ...data })
            .then(res => {
              commit('addCategory', {
                ...data,
                id: autoGenKey.key
              })
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async changeCategory ({ commit, dispatch }, data) {
      try {
        const id = await dispatch('_getUserId', null, { root: true })

        return new Promise((resolve, reject) => {
          fb.db.ref(`users/${id}/categories/${data.id}`)
            .update({
              name: data.name,
              limit: data.limit
            }).then(() => {
              commit('changeCategory', data)
              resolve()
            }).catch(err => {
              commit('addError', err)
              reject(err)
            })
        })
      } catch (e) {
      }
    }
  }
}

export default category
