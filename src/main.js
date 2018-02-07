// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App';
import router from './router';
import Meta from 'vue-meta';
import cognitoAuth from './cognito';
import store from './store';

Vue.use(Meta);

sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  cognitoAuth,
  store,
  components: { App },
  template: '<App/>'
});

export { app, router, store };