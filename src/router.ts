import Vue from 'vue';
import Router from 'vue-router';
import Wrapper from './views/Wrapper.vue';
import Auth from './views/Auth.vue';

import store from '@/store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Wrapper,
      beforeEnter(to, from, next) {
        if (store.getters['profile/isLogged'] || localStorage.getItem('token')) {
          next();
        } else {
          next('/login');
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Auth,
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
});
