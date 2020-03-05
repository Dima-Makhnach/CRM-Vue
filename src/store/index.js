import Vue from 'vue'
import Vuex from 'vuex'

import * as fb from '../firebaseconfig'

import auth from './auth'
import user from './user'
import post from './post'
import record from './record'
import category from './category'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    _getUserId () {
      return fb.auth.currentUser.uid
    }
  },
  modules: {
    auth,
    user,
    post,
    record,
    category
  }
})
