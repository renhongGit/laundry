import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "@/assets/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
Vue.prototype.$L = L;

import VeeValidate, { Validator } from "vee-validate"; //匯入檔案
import TW from "vee-validate/dist/locale/zh_TW"; //匯入語言包
Vue.use(VeeValidate); //啟用API
Validator.localize("zh-TW", TW); //啟用語言包


import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");


VeeValidate.Validator.extend('lastfive', {
  getMessage: () => '請其供手機末五碼',
  validate: value => {
    return value.length === 5 
  }
});