import Vue from 'vue'

import dateFilter from './filters/date.filter'

import Vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'

Vue.filter('date', dateFilter)

Vue.use(Vuelidate)
Vue.use(Toasted)

// Toasted

Vue.toasted.register('error', m => `[Ошибка]: ${m}`, {
  type: 'error',
  duration: 5000
})

Vue.toasted.register('message', m => `[Сообщение]: ${m}`, {
  type: 'info',
  duration: 5000
})
