import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import VueMeta from 'vue-meta';
import Vuelidate from 'vuelidate';
import VueAnalytics from 'vue-analytics';


Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(VueMeta);

Vue.use(VueAnalytics, {
  id: 'UA-53205775-1',
  //sendHitTask: process.env.NODE_ENV === 'production',
  autoTracking: {
    screenview: true
  },
  debug: {
    enabled: true
  }
});

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
