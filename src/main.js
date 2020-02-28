import Vue from 'vue'

import router from './router'
import store from './store'
import App from './App.vue'
import * as fb from './firebaseconfig'

import './registerServiceWorker'

import './customFunctional'

Vue.config.productionTip = false

let app

fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
