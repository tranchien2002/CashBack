import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/markets',
    name: 'Markets',
    // route level code-splitting
    // this generates a separate chunk (market.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "market" */ '../views/Markets.vue');
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: function() {
      return import('../views/Account.vue');
    }
  },
  {
    path: '/my-products',
    name: 'MyProducts',
    component: function() {
      return import('../views/MyProducts.vue');
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
