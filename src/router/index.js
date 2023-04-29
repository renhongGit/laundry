import Vue from "vue";
import VueRouter from "vue-router";
import FrontDeskTemplate from "@/components/reception/FrontDeskTemplate.vue";
import Home from "@/components/reception/Home.vue";
import ServiceLocation from "@/components/reception/ServiceLocation.vue";
import WashingStatus from "@/components/reception/WashingStatus.vue";
import PriceList from "@/components/reception/PriceList.vue";

import RearTemplate from "@/components/rearend/RearTemplate.vue";
import Registration from "@/components/rearend/Registration.vue";
import ProgressQuery from "@/components/rearend/ProgressQuery.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "FrontDeskTemplate",
    component: FrontDeskTemplate,
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "servicelocation",
        name: "ServiceLocation",
        component: ServiceLocation,
      },
      {
        path: "washingstatus",
        name: "WashingStatus",
        component: WashingStatus,
      },
      {
        path: "pricelist",
        name: "PriceList",
        component: PriceList,
      },
    ],
  },

  {
    path: "/admin",
    name: "RearTemplate",
    component: RearTemplate,
    children: [
      {
        path: "registration",
        name: "Registration",
        component: Registration,
      },
      {
        path: "progressquery",
        name: "ProgressQuery",
        component: ProgressQuery,
      },
    ],
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
