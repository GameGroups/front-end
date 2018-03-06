<template>
  <div class="home row">
    <div class="col-md-12">
      <h3>Hello World</h3>
      <!--<router-link to="/login"><button href="#" class="btn btn-info" role="button">Login</button></router-link>-->
      <p>Please click <router-link to="/signup">here</router-link> to sign up for an account.</p>
      <!--<router-link to="/signup"><button href="#" class="btn btn-info" role="button">Sign Up</button></router-link>-->
    </div>
  </div>
</template>

<script>
import router from '../router';

export default {
  name: 'Home',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Home Page', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      loggedIn: false
    };
  },
  created: function () {
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      if (err) {
        console.err("Home: Couldn't get the session:", err, err.stack);
      } else {
        this.loggedIn = loggedIn;
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
  .home > div:first-child {
    margin-top: 1rem;
  }
</style>
