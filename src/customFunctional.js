import Vue from 'vue'

import dateFilter from './filters/date.filter'

import Paginate from 'vuejs-paginate'
import Vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'

import Preloader from './components/Preloader'

Vue.filter('date', dateFilter)

Vue.use(Vuelidate)
Vue.use(Toasted)

Vue.component('Loader', Preloader)
Vue.component('Paginate', Paginate)

// Toasted
Vue.toasted.register('error', m => m, {
  type: 'error',
  duration: 5000
})

Vue.toasted.register('message', m => m, {
  type: 'info',
  duration: 5000
})
