import Vue from "vue";
import VueRouter from "vue-router";
import FrontDeskTemplate from "@/components/reception/FrontDeskTemplate.vue";
import Home from "@/components/reception/Home.vue";
import LaundrySupplies from "@/components/reception/LaundrySupplies.vue";
import Clean from "@/components/reception/Clean.vue";
import Articles from "@/components/reception/Articles.vue";
import Shopping from "@/components/reception/Shopping.vue";
import ShoppingEnd from "@/components/reception/ShoppingEnd.vue";
import Product from "@/components/reception/Product.vue";
import QA from "@/components/reception/QA.vue";
import WashingStatus from "@/components/reception/WashingStatus.vue";

import Signin from "@/components/rearend/Signin.vue"
import RearTemplate from "@/components/rearend/RearTemplate.vue";
import Registration from "@/components/rearend/Registration.vue";
import ProgressQuery from "@/components/rearend/ProgressQuery.vue";
import Commodity from "@/components/rearend/Commodity.vue";
import CustomerOrders from "@/components/rearend/CustomerOrders.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect:'home'
  },
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
        path: "laundrysupplies",
        name: "LaundrySupplies",
        component: LaundrySupplies,
        children: [
          {
            path: "clean",
            name: "Clean",
            component: Clean,
          },
          {
            path: "articles",
            name: "Articles",
            component: Articles,
          },
        ],
      },
      {
        path: "washingstatus",
        name: "WashingStatus",
        component: WashingStatus,
      },
      {
        path: "shopping",
        name: "Shopping",
        component: Shopping,
      },
      {
        path: "shoppingend",
        name: "ShoppingEnd",
        component: ShoppingEnd,
      },
      {
        path: "/product/:id",
        name: "product",
        component: Product,
      },
      {
        path: "/QA",
        name: "QA",
        component: QA,
      },
    ],
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
 
  {
    path: "/admin",
    name: "RearTemplate",
    component: RearTemplate,
    meta: { requiresAuth: true },
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
      {
        path: "commodity",
        name: "Commodity",
        component: Commodity,
      },
      {
        path: "customerorders",
        name: "CustomerOrders",
        component: CustomerOrders,
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
