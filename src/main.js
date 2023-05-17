import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "@/assets/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
Vue.prototype.$L = L;
import validators from '@/utils/validators.js';//自訂驗證規則
import VeeValidate, { Validator } from "vee-validate"; //匯入檔案

import TW from "vee-validate/dist/locale/zh_TW"; //匯入語言包
Vue.use(VeeValidate); //啟用API
Validator.localize("zh-TW", TW); //啟用語言包
Object.keys(validators).forEach((rule) => { //啟用自訂規則
  VeeValidate.Validator.extend(rule, validators[rule]);
});

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component('Loading',Loading)


import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload);

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;


// 導航守衛
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check
    `;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/signin",
        });
      }
    });
  } else {
    next();
  }
  return false;
});


new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

