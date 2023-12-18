import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import { BootstrapVue } from 'bootstrap-vue';

import App from './App.vue';
import router from './router';

// Css Import
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import './assets/main.css';

// Plugin Use
Vue.use(BootstrapVue);
Vue.use(PiniaVuePlugin);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app');
