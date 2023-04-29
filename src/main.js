import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "@/assets/all.scss";

import "leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
