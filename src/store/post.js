import * as fb from '../firebaseconfig'
import arrFromObj from '../utils/arrFromObj'

const post = {
  state: {
    posts: [],
    service: {
      loading: false,
      error: null
    }
  },
  mutations: {
    setPosts (state, data) {
      state.posts = data
    },
    addPost (state, post) {
      state.posts.push(post)
    },
    addError (state, err) {
      state.service.error = err
    },
    deletePost (state, id) {
      state.posts = state.posts.filter(post => post.id !== id)
    },
    toggleLoading (state, flag) {
      state.service.loading = flag
    }
  },
  namespaced: true,
  actions: {
    async setPost ({ commit, dispatch }, text) {
      try {
        const id = await dispatch('_getUserId', null, { root: true })

        const time = new Date().getTime()
        const autoGenKeyRef = fb.db.ref(`users/${id}/posts`).push()

        autoGenKeyRef.set({
          text,
          time
        })
          .then(() => {
            commit('addPost', {
              id: autoGenKeyRef.key,
              text,
              time
            })
          })
          .catch(err => console.log(err))
      } catch (e) {}
    },
    async deletePost ({ commit, dispatch }, id) {
      try {
        const userId = await dispatch('_getUserId', null, { root: true })
        fb.db.ref(`users/${userId}/posts/${id}`).remove()
          .then(() => {
            commit('deletePost', id)
          })
          .catch(err => console.log(err))
      } catch (e) {}
    },
    async getPosts ({ commit, dispatch }) {
      commit('toggleLoading', true)
      try {
        const id = await dispatch('_getUserId', null, { root: true })

        fb.db.ref(`users/${id}/posts`).once('value')
          .then(res => {
            commit('setPosts', res.val() ? arrFromObj(res.val()) : [])
            commit('toggleLoading', false)
          })
          .catch(err => {
            commit('addError', err)
            commit('toggleLoading', false)
          })
      } catch (e) {
        commit('addError', e)
        commit('toggleLoading', false)
      }
    }
  },
  getters: {
    posts: s => s.posts,
    service: s => s.service
  }
}

export default post
