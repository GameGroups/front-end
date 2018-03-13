<template>
  <div class="logged-in row" v-if="$store.state.loggedIn">
    <div class="col-md-12">
      <h2>Welcome, {{ $store.state.currentUser.nickname }}!</h2>
    </div>

    <div class="col-md-12">
      <ul>
        <li><p class="mb-0">Username: {{ $store.state.currentUser["cognito:username"] }}</p></li>
        <li><p>{{ $store.state.currentUser.email }}</p></li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '../store';
import jwtDecode from 'jwt-decode';

export default {
  name: 'LoggedIn',
  metaInfo: {
    title: 'GameGroups',
    titleTemplate: '%s - Dashboard',
    htmlAttrs: {
      lang: 'en',
      amp: undefined
    }
  },
  data: function () {
    return {
      loggedIn: false
    }
  },
  methods: {
    logout: function () {
      this.$cognitoAuth.logout();
      this.$router.replace(this.$route.query.redirect || '/');
    }
  },
  beforeMount: function () {
    if (!store.state.loggedIn) {
      this.$router.replace(this.$route.query.redirect || '/login');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
  .logged-in {
    padding-top: 2rem;
  }
</style>
