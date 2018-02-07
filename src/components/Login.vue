<template>
  <div class="login row">
    <div class="col-sm-3 col-sm-offset-3">
      <h2>Log In</h2>

      <p v-if="$route.query.redirect">
        Log in to your account.
      </p>

      <div class="alert alert-danger" v-if="error">
        <p v-if="error" class="error">{{ error.message }}</p>
      </div>

      <form @submit.prevent="login">
        <div class="form-group">
          <input id="inputUsername" type="text" class="form-control" placeholder="Enter your username" v-model="username" required>
        </div>
        <div class="form-group">
          <input id="inputPassword" type="password" class="form-control" placeholder="Enter your password" v-model="pass" required>
        </div>
        <button class="btn btn-primary">Login</button>
      </form>

      <div class="marketing">
        <p>
          <router-link to="/signup">Create an account</router-link> or <router-link to="/reset_password">Reset password</router-link>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import store from '../store';

export default {
  name: 'Login',
  metaInfo: {
    title: 'GameGroups',
    titleTemplate: '%s - Login',
    htmlAttrs: {
      lang: 'en',
      amp: undefined
    }
  },
  data () {
    return {
      username: '',
      pass: '',
      error: null
    };
  },
  methods: {
    login () {
      this.$cognitoAuth.signin(this.username, this.pass, (err, result) => {
        if (err) {
          this.error = err;
        } else {
          store.dispatch('login');
          this.$router.replace(this.$route.query.redirect || '/logged-in');
        }
      });
    }
  },
  beforeCreate: function () {
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      if (err) {
        console.err("Login: Couldn't get the session:", err, err.stack);
      } else {
        this.loggedIn = loggedIn;
        if (loggedIn) {
          this.$router.replace(this.$route.query.redirect || '/logged-in');
        }
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

  p.error {
    margin: 0;
  }

  .marketing {
    margin-top: 1.5rem;
  }
</style>
