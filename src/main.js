import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import currencyFilter from './filters/currency'
import './plugins/axios'
import './plugins/bootstrap-vue'
import './plugins/clipboard'
import './plugins/vee-validate'
import './plugins/vue-material-design-icons'
import './plugins/vue-moment'
import './plugins/vue-loading-overlay'
import './plugins/vuetify'
import './components/index'
import './utils/products-filter'

Vue.filter('currency', currencyFilter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
