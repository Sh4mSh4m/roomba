import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/change_new",
    name: "change_new",
    component: () =>
      import(/* webpackChunkName: "changeNew" */ "../views/ChangeNew.vue"),
    props: true
  },
  {
    path: "/change/:changeid",
    name: "change",
    component: () =>
      import(/* webpackChunkName: "change" */ "../views/ChangeShow.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
