<template>
  <div class="logged-in row" v-if="loggedIn">
    <div class="col-md-12">
      <h2>Welcome, {{ this.token.nickname }}!</h2>
    </div>

    <div class="col-md-12">
      <ul>
        <li><p class="mb-0">Username: {{ this.token["cognito:username"] }}</p></li>
        <li><p>{{ this.token.email }}</p></li>
      </ul>
    </div>
  </div>
</template>

<script>
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
  created: function () {
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      if (err) {
        console.err("Login: Couldn't get the session:", err, err.stack);
      } else {
        this.loggedIn = loggedIn;
        if (!loggedIn) {
          this.$router.replace(this.$route.query.redirect || '/login');
        }
      }
    });
  },
  beforeMount () {
    if (this.loggedIn) {
      this.$cognitoAuth.getIdToken((err, jwtToken) => {
        if (err) {
          console.log("Dashboard: Couldn't get the session:", err, err.stack);
          return;
        }

        this.token = jwtDecode(jwtToken);
        this.user = this.$cognitoAuth.getCurrentUser();
        console.log(this.token);
      });
    } else {
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
