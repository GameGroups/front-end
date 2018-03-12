<template>

  <div class="background">
  <div class="login row">
    <div class="col-sm-3 col-sm-offset-3 login-container">
      <h2>Login</h2>

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
        <div class="login-div">
          <button class="btn btn-primary">Login</button>
        </div>
      </form>

      <div class="marketing">
        <p>
          <router-link to="/signup">Create an account</router-link> or <router-link to="/reset_password">Reset password</router-link>.
        </p>
      </div>
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
  data: function () {
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
          console.log(err.code)
          this.error = err;
          if (err.code === 'UserNotFoundException') {
            this.error.message = 'Incorrect username or password.'
          }
        } else {
          store.dispatch('login');
          this.$router.replace(this.$route.query.redirect || '/dashboard');
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
          this.$router.replace(this.$route.query.redirect || '/dashboard');
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
  .login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20em;
    background: #ececece0;
    padding: 25px;
    border-radius: 5px;
    max-width: initial;
    flex: initial;
  }
  .login-div {
    text-align: center;
  }
  h2 {
    margin-bottom: 15px;
  }
  .btn {
    width: 100%;
  }
  .background {
    background: url('../assets/gw2-background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    margin-left: -15px;
    margin-right: -15px;
    overflow: hidden;
    height: 100vh;
  }

  @media only screen and (max-width: 768px)  {
    .background {
      background: none;
    }
    .login-container {
      background: #ececec;
    }
  }

  @media only screen and (max-width: 450px)  {
    .login-container {
      background: none;
      padding: 15px;
    }
  }
</style>
