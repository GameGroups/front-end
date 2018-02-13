<template>
  <div id="app">
    <nav-bar></nav-bar>

    <div class="container-fluid root">
      <router-view/>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import 'popper.js';
import 'jquery';
import 'bootstrap';
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
    NavBar
  }
}
</script>

<style lang="scss" type="text/scss">
  @import "../node_modules/bootstrap/scss/bootstrap.scss";

  // Global CSS goes here

  // Button focus border looks bad imo
  .btn:focus,.btn:active {
    outline: none !important;
    box-shadow: none;
  }

  .root {
    min-height: 97.5vh;
  }
</style>
