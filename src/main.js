import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "@/assets/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
Vue.prototype.$L = L;

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
