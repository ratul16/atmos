import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

require('@/assets/scss/main.scss');

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
