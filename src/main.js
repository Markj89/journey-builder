import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Autocomplete from 'v-autocomplete'
import VueMeta from 'vue-meta'


Vue.use(BootstrapVue)
Vue.use(Autocomplete)
Vue.use(VueMeta)

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
