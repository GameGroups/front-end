import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Confirm from '@/components/Confirm';
import LoggedIn from '@/components/LoggedIn';
import NotFound from '@/components/NotFound';
import store from '../store';
import cognitoAuth from '../cognito';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/confirm', component: Confirm },
    { path: '/logged-in', component: LoggedIn },
    { path: '/reset_password', component: NotFound }, // Change me
    { path: '/confirm_reset_password', component: NotFound }, // Change me
    {
      // 404 for all routes that don't match
      path: '*',
      component: NotFound
    },
    {
      path: '/logout',
      beforeEnter (to, from, next) {
        cognitoAuth.logout();
        store.dispatch('logout');
        next('/');
      }
    }
  ]
});
