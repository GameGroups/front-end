import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Confirm from '@/components/Confirm';
import LoggedIn from '@/components/LoggedIn';
import NotFound from '@/components/NotFound';
import CreateGroup from '@/components/CreateGroup';
import Profile from '@/components/Profile';
import ResetPassword from '@/components/ResetPassword';
import ResetSuccess from '@/components/ResetPassword-Success';
import ResetConfrim from '@/components/ResetPassword-Confirm';
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
    { path: '/dashboard', component: LoggedIn },
    { path: '/create_group', component: CreateGroup },
    { path: '/reset_password', component: ResetPassword }, // Change me
    { path: '/reset_password_success', component: ResetSuccess }, // Change me
    { path: '/confirm_reset_password/:username', component: ResetConfrim, props: true },
    { path: '/user/:id', component: Profile },
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
