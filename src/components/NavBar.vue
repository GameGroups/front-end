<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">Navbar</a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link class="nav-item" tag="li" to="/">
          <a class="nav-link">Home</a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/logged-in" v-if="$store.state.loggedIn">
          <a class="nav-link">Dashboard</a>
        </router-link>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <router-link class="btn btn-outline-danger" tag="button" to="/logout" v-if="this.$store.state.loggedIn">Logout</router-link>
        <router-link class="btn btn-outline-success" tag="button" to="/login" v-else>Login</router-link>
      </form>
    </div>
  </nav>
</template>

<script>
import store from '../store';

export default {
  name: 'NavBar',
  data () {
    return {};
  },
  beforeMount: function () {
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      if (err) {
        console.err("Login: Couldn't get the session:", err, err.stack);
      } else {
        this.loggedIn = loggedIn;
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
  .login {
    padding-top: 2rem;
  }

  .form-inline button {
    margin: 0 .5rem 0 .5rem;
  }

  p.error {
    margin: 0;
  }

  .marketing {
    margin-top: 1.5rem;
  }
</style>
